/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PersonalityMode = 'assistant' | 'girlfriend';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'zoya';
  text: string;
  timestamp: Date;
  audioDuration?: number; // Simulated audio message duration in seconds if any
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string; // Name of lucide-react icon
  category: 'core' | 'automation' | 'intelligence' | 'ui' | 'system';
  badge?: string;
}

export interface AutomationAction {
  category: 'Communication' | 'Device Control' | 'Camera' | 'Navigation' | 'Apps' | 'System Info' | 'AI Features' | 'Research' | 'Text Generation';
  actions: string[];
}
