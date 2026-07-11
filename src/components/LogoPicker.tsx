import { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoPickerProps {
  logo: string | null;
  onLogoChange: (logo: string | null) => void;
}

const EMOJI_OPTIONS = ['❤️', '⭐', '🔥', '✨', '🎉', '🚀', '💡', '🎵', '📷', '🍕', '🌸', '⚡', '🌈', '🐱', '🎁', '☕'];

function emojiToDataUrl(emoji: string, size = 256): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.clearRect(0, 0, size, size);
  ctx.font = `${Math.floor(size * 0.8)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, size / 2, size / 2 + size * 0.04);
  return canvas.toDataURL('image/png');
}

export function LogoPicker({ logo, onLogoChange }: LogoPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => onLogoChange(evt.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 h-14 rounded-xl border border-dashed border-border bg-background hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-foreground"
        >
          {logo ? (
            <>
              <img src={logo} alt="Logo" className="w-8 h-8 rounded object-contain" />
              <span>Change logo</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload your logo</span>
            </>
          )}
        </button>
        {logo && (
          <button
            onClick={() => onLogoChange(null)}
            className="h-14 w-14 rounded-xl bg-background border border-border hover:bg-secondary/50 transition-colors flex items-center justify-center"
            aria-label="Remove logo"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      <p className="text-xs text-muted-foreground">Or pick an emoji</p>
      <div className="grid grid-cols-8 gap-2">
        {EMOJI_OPTIONS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onLogoChange(emojiToDataUrl(emoji))}
            className={cn(
              "aspect-square rounded-lg bg-background border border-border hover:bg-secondary/50 transition-colors flex items-center justify-center text-xl"
            )}
            title={emoji}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
