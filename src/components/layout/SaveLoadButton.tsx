import { useRef, useState, useCallback, useEffect } from 'react';
import { Download, Upload, Check, AlertCircle, X } from 'lucide-react';
import { getAllStorageKeys, STORAGE_VERSION } from '@/stores/storageKeys';
import { syncStoresAfterRestore } from '@/stores';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning';
}

interface ImportConfirm {
  fileName: string;
  data: Record<string, unknown>;
  keys: string[];
}

export function SaveLoadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [importConfirm, setImportConfirm] = useState<ImportConfirm | null>(null);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success', duration = 3000) => {
    // Clear previous timeout if exists
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    setToast({ message, type });
    
    if (duration > 0) {
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
        toastTimeoutRef.current = null;
      }, duration);
    }
  }, []);

  // Export avec métadonnées
  const handleExport = () => {
    try {
      const data: Record<string, unknown> = {
        _metadata: {
          version: STORAGE_VERSION,
          exportedAt: new Date().toISOString(),
          app: 'cleric-character-manager',
        },
      };

      getAllStorageKeys().forEach((key) => {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            // Essayer de parser comme JSON
            data[key] = JSON.parse(value);
          } catch {
            // Si ce n'est pas du JSON, stocker comme chaîne
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

      showToast('✓ Sauvegarde téléchargée avec succès !', 'success');
    } catch (err) {
      console.error('Export error:', err);
      showToast('Erreur lors de la sauvegarde', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Validation des données importées
  const validateImportData = (data: unknown): { valid: boolean; error?: string; keys: string[] } => {
    if (typeof data !== 'object' || data === null) {
      return { valid: false, error: 'Le fichier ne contient pas de données valides', keys: [] };
    }

    const dataObj = data as Record<string, unknown>;
    
    // Vérifier qu'il y a au moins une clé de stockage
    const storageKeys = getAllStorageKeys();
    const foundKeys = storageKeys.filter(key => key in dataObj);
    
    if (foundKeys.length === 0) {
      return { valid: false, error: 'Aucune donnée de jeu trouvée dans ce fichier', keys: [] };
    }

    // Vérifier la version si présente
    const metadata = dataObj._metadata as Record<string, string> | undefined;
    if (metadata?.version && metadata.version !== STORAGE_VERSION) {
      console.warn(`Version mismatch: file=${metadata.version}, current=${STORAGE_VERSION}`);
      // On accepte mais on avertit
    }

    return { valid: true, keys: foundKeys };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = String(event.target?.result || '{}');
        const data = JSON.parse(content);

        const validation = validateImportData(data);
        
        if (!validation.valid) {
          showToast(validation.error || 'Fichier invalide', 'error');
          return;
        }

        // Demander confirmation avant d'écraser
        setImportConfirm({
          fileName: file.name,
          data,
          keys: validation.keys,
        });

      } catch (err) {
        console.error('Import error:', err);
        showToast(err instanceof Error ? err.message : 'Erreur lors de l\'import', 'error');
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      showToast('Erreur de lecture du fichier', 'error');
    };

    reader.readAsText(file);
  };

  // Effectuer l'import après confirmation
  const executeImport = () => {
    if (!importConfirm) return;

    try {
      const { data, keys } = importConfirm;

      // Sauvegarde de secours avant import (précaution)
      const backup: Record<string, string | null> = {};
      keys.forEach(key => {
        backup[key] = localStorage.getItem(key);
      });

      // Restaurer les données
      let importedCount = 0;
      keys.forEach((key) => {
        const value = data[key];
        if (value !== undefined) {
          try {
            // Stocker comme JSON si c'est un objet, sinon comme chaîne
            if (typeof value === 'string') {
              localStorage.setItem(key, value);
            } else {
              localStorage.setItem(key, JSON.stringify(value));
            }
            importedCount++;
          } catch (storageErr) {
            console.error(`Failed to store key ${key}:`, storageErr);
          }
        }
      });

      // Synchroniser les stores
      syncStoresAfterRestore();

      showToast(`✓ ${importedCount} données importées. Rechargement...`, 'success', 0);
      setImportConfirm(null);

      // Recharger après un court délai pour laisser le toast s'afficher
      setTimeout(() => {
        window.location.reload();
      }, 1200);

    } catch (err) {
      console.error('Execute import error:', err);
      showToast('Erreur lors de la restauration', 'error');
      setImportConfirm(null);
    }
  };

  const cancelImport = () => {
    setImportConfirm(null);
    showToast('Import annulé', 'warning');
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

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

      {/* Toast notification */}
      {toast && (
        <div
          className={`absolute top-full right-0 mt-2 px-3 py-2 rounded-md shadow-lg text-sm font-ui whitespace-nowrap flex items-center gap-2 z-50 ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 text-emerald-50'
              : toast.type === 'warning'
              ? 'bg-amber-700/90 text-amber-50'
              : 'bg-blood-red/90 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : toast.type === 'warning' ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {toast.message}
        </div>
      )}

      {/* Modal de confirmation d'import */}
      {importConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm">
          <div className="bg-parchment-light rounded-xl shadow-2xl border border-parchment-dark max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg text-ink">Confirmer l'import</h3>
              <button
                onClick={cancelImport}
                className="p-1 hover:bg-parchment-dark rounded-lg text-ink-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 text-sm text-ink-light">
              <p>
                Vous êtes sur le point d'importer : <strong className="text-ink">{importConfirm.fileName}</strong>
              </p>
              <p>
                Cela remplacera <strong className="text-ink">{importConfirm.keys.length}</strong> données existantes :
              </p>
              <ul className="list-disc list-inside bg-parchment-dark/30 rounded-lg p-3 max-h-32 overflow-y-auto">
                {importConfirm.keys.map(key => (
                  <li key={key} className="text-xs font-mono text-ink-muted">
                    {key}
                  </li>
                ))}
              </ul>
              <p className="text-blood-red font-medium">
                ⚠️ Les données actuelles seront écrasées. Cette action est irréversible.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={cancelImport}
                className="flex-1 btn-secondary"
              >
                Annuler
              </button>
              <button
                onClick={executeImport}
                className="flex-1 btn-primary"
              >
                Confirmer l'import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
