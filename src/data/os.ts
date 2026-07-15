const JOIN_DATE = new Date('2022-07-01');
const tenureYears = Math.floor((Date.now() - JOIN_DATE.getTime()) / (365.25 * 24 * 3600 * 1000));

export interface HomeStat {
  value: string;
  label: string;
  color: 'cyan' | 'pink' | 'purple';
}

export const homeStats: HomeStat[] = [
  { value: `${tenureYears}yrs`, label: 'AT C3.AI', color: 'cyan' },
  { value: '2B', label: 'SENSOR READINGS INGESTED', color: 'pink' },
  { value: '$165M', label: 'SAVINGS SURFACED', color: 'purple' },
  { value: '13', label: 'ENGINEERS LED', color: 'cyan' },
];

export const typedRoles: string[] = [
  'GenAI applications.',
  'data pipelines at 2B-reading scale.',
  'full-stack products that ship.',
  '3D spatial visualizations.',
];

export const bootLines: string[] = [
  'TIRTH.OS v4.2 — initializing kernel...',
  'loading modules: react, python, genai ✓',
  'mounting /career — 2B sensor readings found ✓',
  'establishing uplink... ACCESS GRANTED',
];

export const companionMessages: Record<string, string> = {
  home: "Hey, I'm Tirth's avatar 👋 Poke around — I'll tag along. (Psst: try the Konami code.)",
  about: 'The real Tirth is less cartoonish, but equally cheerful.',
  skills: 'Full loadout equipped. The leadership tree is maxed out too.',
  projects: 'The Amazon clone has real Stripe checkout. He went all in.',
  work: '2 billion sensor readings. I counted every one.',
  contact: 'Go on, say hi. He actually replies.',
};

export const companionQuips: string[] = [
  "Ow! Okay okay, I'm awake.",
  'Fun fact: Tirth minored in Math at Virginia Tech.',
  'He once cut an ingestion timeline from months to 2 weeks.',
  'I live by the ocean. He lives in Chicago. We cope differently.',
  'Weekly office hours, company-wide. He likes teaching.',
  "That's enough poking. Go look at the projects!",
];

export const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
