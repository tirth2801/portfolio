export interface Stat {
  value?: number;
  raw?: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { prefix: '$', value: 165, suffix: 'M', label: 'in savings opportunities surfaced' },
  { prefix: '~', value: 2, suffix: 'B+', label: 'sensor readings ingested' },
  { raw: '150-200', label: 'engineers using a tool I shipped' },
  { value: 13, label: 'engineers & contractors led through a migration' },
  { raw: '5+', label: 'engineers mentored per cycle, 3 years running' },
];
