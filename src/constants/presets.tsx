import { 
  Star, Heart, Sword, Flame, Skull, Compass, Shield, Scroll, 
  CloudLightning, Droplets, Snowflake, Zap, Sun, Leaf, BookOpen, 
  Ghost, Hammer, Coffee, Users, Edit3, Sparkles 
} from 'lucide-react';
import type { ReactNode } from 'react';

export const PRESET_ICONS: Record<string, ReactNode> = {
  'kimi-optimal': <Star className="w-5 h-5 text-divine-gold fill-divine-gold" />,
  'survie': <Heart className="w-5 h-5 text-blood-red" />,
  'combat-agressif': <Sword className="w-5 h-5 text-bronze" />,
  'vs-fire': <Flame className="w-5 h-5 text-orange-500" />,
  'vs-cold': <Snowflake className="w-5 h-5 text-blue-400" />,
  'vs-lightning': <Zap className="w-5 h-5 text-yellow-400" />,
  'vs-acid': <Droplets className="w-5 h-5 text-green-500" />,
  'vs-thunder': <CloudLightning className="w-5 h-5 text-purple-400" />,
  'vs-poison': <Skull className="w-5 h-5 text-lime-600" />,
  'vs-elements': <Shield className="w-5 h-5 text-teal-500" />,
  'vs-undead': <Skull className="w-5 h-5 text-gray-600" />,
  'support': <Shield className="w-5 h-5 text-forest" />,
  'exploration': <Compass className="w-5 h-5 text-royal-purple" />,
  'anti-mage': <Scroll className="w-5 h-5 text-steel-blue" />,
  // Domain-specific preset icons
  'war-tactician': <Sword className="w-5 h-5 text-red-500" />,
  'war-divine-striker': <Hammer className="w-5 h-5 text-orange-600" />,
  'life-divine-healer': <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />,
  'life-restoration': <Sparkles className="w-5 h-5 text-cyan-400" />,
  'light-radiant-damage': <Sun className="w-5 h-5 text-yellow-500 fill-yellow-500" />,
  'light-destroy-undead': <Skull className="w-5 h-5 text-yellow-700" />,
  'nature-elemental-control': <Leaf className="w-5 h-5 text-green-600" />,
  'nature-explorer': <Compass className="w-5 h-5 text-emerald-600" />,
  'tempest-storm-master': <CloudLightning className="w-5 h-5 text-purple-600" />,
  'tempest-fury': <Zap className="w-5 h-5 text-indigo-500 fill-indigo-500" />,
  'trickery-shadow': <Ghost className="w-5 h-5 text-slate-500" />,
  'trickery-deceiver': <Ghost className="w-5 h-5 text-purple-800" />,
  'knowledge-seeker': <BookOpen className="w-5 h-5 text-amber-600" />,
  'knowledge-strategist': <BookOpen className="w-5 h-5 text-blue-600" />,
  'forge-master': <Hammer className="w-5 h-5 text-red-700" />,
  'forge-fire-warrior': <Flame className="w-5 h-5 text-red-600 fill-red-600" />,
  'grave-keeper': <Coffee className="w-5 h-5 text-stone-600" />,
  'grave-death-watcher': <Skull className="w-5 h-5 text-stone-800" />,
  'social-investigation': <Users className="w-5 h-5 text-indigo-500" />,
  'custom-user': <Edit3 className="w-5 h-5 text-pink-500" />,
};

export const PRESET_COLORS: Record<string, string> = {
  'kimi-optimal': 'border-divine-gold bg-divine-gold/10',
  'survie': 'border-blood-red bg-blood-red/5',
  'combat-agressif': 'border-bronze bg-bronze/5',
  'vs-fire': 'border-orange-500 bg-orange-500/5',
  'vs-cold': 'border-blue-400 bg-blue-400/5',
  'vs-lightning': 'border-yellow-400 bg-yellow-400/5',
  'vs-acid': 'border-green-500 bg-green-500/5',
  'vs-thunder': 'border-purple-400 bg-purple-400/5',
  'vs-poison': 'border-lime-600 bg-lime-600/5',
  'vs-elements': 'border-teal-500 bg-teal-500/5',
  'vs-undead': 'border-gray-500 bg-gray-500/5',
  'support': 'border-forest bg-forest/5',
  'exploration': 'border-royal-purple bg-royal-purple/5',
  'anti-mage': 'border-steel-blue bg-steel-blue/5',
  // Domain-specific preset colors
  'war-tactician': 'border-red-500 bg-red-500/10',
  'war-divine-striker': 'border-orange-600 bg-orange-600/10',
  'life-divine-healer': 'border-pink-500 bg-pink-500/10',
  'life-restoration': 'border-cyan-400 bg-cyan-400/10',
  'light-radiant-damage': 'border-yellow-500 bg-yellow-500/10',
  'light-destroy-undead': 'border-yellow-700 bg-yellow-700/10',
  'nature-elemental-control': 'border-green-600 bg-green-600/10',
  'nature-explorer': 'border-emerald-600 bg-emerald-600/10',
  'tempest-storm-master': 'border-purple-600 bg-purple-600/10',
  'tempest-fury': 'border-indigo-500 bg-indigo-500/10',
  'trickery-shadow': 'border-slate-500 bg-slate-500/10',
  'trickery-deceiver': 'border-purple-800 bg-purple-800/10',
  'knowledge-seeker': 'border-amber-600 bg-amber-600/10',
  'knowledge-strategist': 'border-blue-600 bg-blue-600/10',
  'forge-master': 'border-red-700 bg-red-700/10',
  'forge-fire-warrior': 'border-red-600 bg-red-600/10',
  'grave-keeper': 'border-stone-600 bg-stone-600/10',
  'grave-death-watcher': 'border-stone-800 bg-stone-800/10',
  'social-investigation': 'border-indigo-500 bg-indigo-500/10',
  'custom-user': 'border-pink-500 bg-pink-500/10',
};

export function getPresetIcon(presetId: string): ReactNode {
  return PRESET_ICONS[presetId] || <Shield className="w-5 h-5" />;
}

export function getPresetColors(presetId: string): string {
  return PRESET_COLORS[presetId] || 'border-parchment-dark hover:bg-parchment-light';
}
