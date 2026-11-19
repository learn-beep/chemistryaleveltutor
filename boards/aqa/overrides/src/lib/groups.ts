// AQA Chemistry topic groups: the three areas of the specification, each split into Year 1 (AS) and Year 2 content.
export type Group = { key: string; sec: string; n: number; heading: string; as: boolean; motif: string };
export const GROUPS: Group[] = [
  { key: 'Physical chemistry: Year 1', sec: '3.1', n: 1, heading: '3.1 Physical chemistry: 3.1.1 to 3.1.7 (AS and A level)', as: true, motif: 'energy' },
  { key: 'Physical chemistry: Year 2', sec: '3.1', n: 2, heading: '3.1 Physical chemistry: 3.1.8 to 3.1.12 (A level only)', as: false, motif: 'energy' },
  { key: 'Inorganic chemistry: Year 1', sec: '3.2', n: 3, heading: '3.2 Inorganic chemistry: 3.2.1 to 3.2.3 (AS and A level)', as: true, motif: 'orbital' },
  { key: 'Inorganic chemistry: Year 2', sec: '3.2', n: 4, heading: '3.2 Inorganic chemistry: 3.2.4 to 3.2.6 (A level only)', as: false, motif: 'orbital' },
  { key: 'Organic chemistry: Year 1', sec: '3.3', n: 5, heading: '3.3 Organic chemistry: 3.3.1 to 3.3.6 (AS and A level)', as: true, motif: 'chain' },
  { key: 'Organic chemistry: Year 2', sec: '3.3', n: 6, heading: '3.3 Organic chemistry: 3.3.7 to 3.3.16 (A level only)', as: false, motif: 'chain' },
];
export const groupOf = (key: string): Group => GROUPS.find((g) => g.key === key) || GROUPS[0];
export const badgeText = (key: string) => groupOf(key).key.replace(' chemistry: Year ', ' ');
export const badgeClass = (key: string) => `badge badge-${groupOf(key).n}`;
// Which papers examine a topic, from section 2 of the specification (topic.code is the section, e.g. 3.1.5).
const P1 = ['3.1.1', '3.1.2', '3.1.3', '3.1.4', '3.1.6', '3.1.7', '3.1.8', '3.1.10', '3.1.11', '3.1.12'];
const P2 = ['3.1.2', '3.1.3', '3.1.4', '3.1.5', '3.1.6', '3.1.9'];
const AS1 = ['3.1.1', '3.1.2', '3.1.3', '3.1.4', '3.1.6', '3.1.7'];
const AS2 = ['3.1.2', '3.1.3', '3.1.4', '3.1.5', '3.1.6'];
export function whereExamined(t: { code: string; group: string }): string {
  const c = t.code, g = groupOf(t.group);
  const a: string[] = [];
  if (c.startsWith('3.2.') || P1.includes(c)) a.push('Paper 1');
  if (c.startsWith('3.3.') || P2.includes(c)) a.push('Paper 2');
  const s: string[] = [];
  if (g.as) { if (c.startsWith('3.2.') || AS1.includes(c)) s.push('Paper 1'); if (c.startsWith('3.3.') || AS2.includes(c)) s.push('Paper 2'); }
  return `A-level ${a.join(' and ')}, and Paper 3 (any content)${s.length ? `; AS ${s.join(' and ')}` : ''}`;
}
export const motifFor = (t: { slug: string; group: string }) => {
  const s = t.slug;
  if (s.includes('atomic') || s.includes('bonding') || s.includes('transition')) return 'orbital';
  if (s.includes('nmr') || s.includes('chromatography') || s.includes('organic-analysis')) return 'spectrum';
  if (s.includes('aromatic')) return 'benzene';
  if (s.includes('amount') || s.includes('acids-and-bases') || s.includes('group') || s.includes('ions')) return 'flask';
  return groupOf(t.group).motif;
};
