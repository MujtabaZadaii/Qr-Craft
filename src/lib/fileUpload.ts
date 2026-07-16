import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { storage, db } from './firebase';

export type UploadableFileType = 'image' | 'pdf' | 'mp3';

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

interface UploadOptions {
  onProgress?: (progress: number) => void;
}

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'audio/mpeg',
  'audio/mp3',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const isValidMimeType = (file: File): boolean => {
  return ALLOWED_MIME_TYPES.includes(file.type);
};

// Simple client-side rate limiting tracker (Best secured with Firebase Security Rules)
const checkRateLimit = async (): Promise<boolean> => {
  try {
    let clientId = localStorage.getItem('qr_client_id');
    if (!clientId) {
      clientId = 'client_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('qr_client_id', clientId);
    }

    const limitRef = doc(db, 'upload_rate_limits', clientId);
    const limitDoc = await getDoc(limitRef);

    const now = Date.now();

    if (limitDoc.exists()) {
      const data = limitDoc.data();
      const windowStart = data.windowStart;
      
      if (now - windowStart > 3600 * 1000) {
        // Reset after 1 hour
        await updateDoc(limitRef, {
          uploadCount: 1,
          windowStart: now
        });
        return true;
      } else {
        if (data.uploadCount >= 100) {
          return false; // Limit exceeded
        }
        await updateDoc(limitRef, {
          uploadCount: data.uploadCount + 1
        });
        return true;
      }
    } else {
      await setDoc(limitRef, {
        uploadCount: 1,
        windowStart: now
      });
      return true;
    }
  } catch (error) {
    console.error('Rate limit check failed, proceeding anyway:', error);
    // If firestore is not configured or fails, we still allow upload for development
    return true; 
  }
};

export const uploadFile = async (
  file: File, 
  type: UploadableFileType,
  options?: UploadOptions
): Promise<UploadResult> => {
  if (!isValidMimeType(file)) {
    return { success: false, error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, PDF, MP3' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: 'File too large. Maximum size is 10MB.' };
  }

  if (file.size === 0) {
    return { success: false, error: 'File is empty.' };
  }

  const allowedToUpload = await checkRateLimit();
  if (!allowedToUpload) {
    return { success: false, error: 'Rate limit exceeded. Please try again later.' };
  }

  return new Promise((resolve) => {
    try {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `uploads/${uniqueSuffix}_${file.name}`;
      const storageRef = ref(storage, filename);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          if (options?.onProgress) {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            options.onProgress(progress);
          }
        }, 
        (error) => {
          console.error('Upload error:', error);
          resolve({ success: false, error: error.message || 'Upload failed' });
        }, 
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ success: true, url: downloadURL });
          } catch (error: any) {
             resolve({ success: false, error: error.message || 'Failed to get download URL' });
          }
        }
      );
    } catch (error: any) {
      console.error('Firebase setup error:', error);
      resolve({ success: false, error: 'Firebase is not properly configured.' });
    }
  });
};
