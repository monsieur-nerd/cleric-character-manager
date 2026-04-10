import { useRef, useState } from 'react';
import { Download, Upload, Check, AlertCircle } from 'lucide-react';
import { getAllStorageKeys } from '@/stores/storageKeys';
import { syncStoresAfterRestore } from '@/stores';

export function SaveLoadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = () => {
    const data: Record<string, unknown> = {};
    getAllStorageKeys().forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pretre-torm-sauvegarde-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Sauvegarde téléchargée !', 'success');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(String(event.target?.result || '{}'));

        if (typeof data !== 'object' || data === null) {
          throw new Error('Fichier invalide');
        }

        let importedCount = 0;
        getAllStorageKeys().forEach((key) => {
          if (key in data) {
            localStorage.setItem(key, JSON.stringify(data[key]));
            importedCount++;
          }
        });

        if (importedCount === 0) {
          throw new Error('Aucune donnée de jeu trouvée dans ce fichier');
        }

        showToast('Données restaurées. Synchronisation...', 'success');
        
        // Synchronise les stores après import avant le rechargement
        syncStoresAfterRestore();
        
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'Erreur lors de l\'import', 'error');
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative flex items-center gap-1">
      <button
        onClick={handleExport}
        title="Télécharger la sauvegarde"
        className="p-2 rounded-lg hover:bg-divine-gold/20 text-ink-muted hover:text-ink transition-colors"
        aria-label="Télécharger la sauvegarde"
      >
        <Download className="w-5 h-5" />
      </button>
      <button
        onClick={handleImportClick}
        title="Importer une sauvegarde"
        className="p-2 rounded-lg hover:bg-divine-gold/20 text-ink-muted hover:text-ink transition-colors"
        aria-label="Importer une sauvegarde"
      >
        <Upload className="w-5 h-5" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
      />

      {toast && (
        <div
          className={`absolute top-full right-0 mt-2 px-3 py-2 rounded-md shadow-lg text-sm font-ui whitespace-nowrap flex items-center gap-2 ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 text-emerald-50'
              : 'bg-blood-red/90 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
}
