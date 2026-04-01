// utils/formatters.ts

/**
 * Formate un nombre en modificateur (ex: 16 -> +3, 8 -> -1)
 */
export function formatModifier(score: number): string {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

/**
 * Formate un nombre avec signe (ex: 3 -> +3)
 */
export function formatSigned(num: number): string {
  return num >= 0 ? `+${num}` : `${num}`;
}

/**
 * Formate un prix en pièces d'or
 */
export function formatPrice(price: number): string {
  // Nettoie les erreurs de précision float en arrondissant à 2 décimales
  const cleanPrice = Number(price.toFixed(2));
  
  if (cleanPrice >= 1000) {
    const k = cleanPrice / 1000;
    // Affiche sans décimale si c'est un nombre entier, sinon max 2 décimales
    const formatted = Number.isInteger(k) ? k.toString() : Number(k.toFixed(2)).toString();
    return `${formatted}k po`;
  }
  
  // Pour les prix < 1000
  return `${cleanPrice} po`;
}

/**
 * Formate un poids avec unité
 */
export function formatWeight(weight: number | null | undefined): string {
  if (weight === null || weight === undefined) return '-';
  if (weight === 0) return '0 kg';
  if (weight < 0.1) return '< 0.1 kg';
  return `${weight.toFixed(1)} kg`;
}

/**
 * Formate un niveau de sort
 */
export function formatSpellLevel(level: number): string {
  if (level === 0) return 'Tour de magie';
  return `Niveau ${level}`;
}

/**
 * Formate un temps d'incantation en abrégé
 */
export function formatCastingTimeShort(castingTime: string): string {
  const lower = (castingTime || '').toLowerCase();
  if (lower.includes('action bonus')) return 'Action B.';
  if (lower.includes('réaction')) return 'Réaction';
  if (lower.includes('1 action')) return 'Action';
  if (lower.includes('rituel')) return 'Rituel';
  return castingTime;
}

/**
 * Tronque un texte à une longueur donnée
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Formate une date en français
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formate une durée restante
 */
export function formatDuration(minutes: number): string {
  if (minutes < 1) return '< 1 min';
  if (minutes === 1) return '1 min';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

/**
 * Capitalise la première lettre
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convertit un slug en texte lisible
 */
export function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Formate un pourcentage
 */
export function formatPercent(value: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
}

/**
 * Formate une barre de progression visuelle
 */
export function formatProgressBar(current: number, max: number, length: number = 10): string {
  if (max === 0) return '░'.repeat(length);
  const filled = Math.round((current / max) * length);
  const empty = length - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}
