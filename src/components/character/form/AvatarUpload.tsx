import { useRef } from 'react';
import { User, Camera } from 'lucide-react';

interface AvatarUploadProps {
  currentAvatar: string | null | undefined;
  onUpload: (dataUrl: string) => void;
  maxSizeMB?: number;
}

export function AvatarUpload({ currentAvatar, onUpload, maxSizeMB = 2 }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`L'image ne doit pas dépasser ${maxSizeMB} Mo`);
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onUpload(result);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-parchment-dark border-4 border-divine-gold overflow-hidden flex items-center justify-center">
          {currentAvatar ? (
            <img 
              src={currentAvatar} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-ink-muted" />
          )}
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 w-8 h-8 bg-divine-gold rounded-full flex items-center justify-center shadow-lg hover:bg-divine-gold-light transition-colors"
          type="button"
        >
          <Camera className="w-4 h-4 text-ink" />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-xs text-ink-muted">Cliquez pour changer la photo</p>
    </div>
  );
}
