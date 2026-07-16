import React from 'react';
import { Heart, QrCode } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <QrCode className="w-4 h-4" />
            <span className="text-sm">QRCraft &mdash; Create beautiful QR codes instantly</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made by Mujtaba Hyder with help of AI <Heart className="w-3.5 h-3.5 text-destructive fill-destructive mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
