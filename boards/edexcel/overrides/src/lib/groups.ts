// Edexcel Chemistry topic groups. The specification runs Topic 1 to Topic 19; the site groups the topics into
// physical, inorganic and organic chemistry, each split into Year 1 (Topics 1 to 10, the AS content) and Year 2.
export type Group = { key: string; sec: string; n: number; heading: string; as: boolean; motif: string };
export const GROUPS: Group[] = [
  { key: 'Physical chemistry: Year 1', sec: 'P', n: 1, heading: 'Physical chemistry, Year 1: Topics 1, 2, 3, 5, 8, 9 and 10 (AS and A level)', as: true, motif: 'energy' },
  { key: 'Inorganic chemistry: Year 1', sec: 'I', n: 3, heading: 'Inorganic chemistry, Year 1: Topic 4 (AS and A level)', as: true, motif: 'orbital' },
  { key: 'Organic chemistry: Year 1', sec: 'O', n: 5, heading: 'Organic chemistry, Year 1: Topics 6 and 7 (AS and A level)', as: true, motif: 'chain' },
  { key: 'Physical chemistry: Year 2', sec: 'P', n: 2, heading: 'Physical chemistry, Year 2: Topics 11 to 14 and 16 (A level only)', as: false, motif: 'energy' },
  { key: 'Inorganic chemistry: Year 2', sec: 'I', n: 4, heading: 'Inorganic chemistry, Year 2: Topic 15 (A level only)', as: false, motif: 'orbital' },
  { key: 'Organic chemistry: Year 2', sec: 'O', n: 6, heading: 'Organic chemistry, Year 2: Topics 17 to 19 (A level only)', as: false, motif: 'chain' },
];
export const groupOf = (key: string): Group => GROUPS.find((g) => g.key === key) || GROUPS[0];
export const badgeText = (key: string) => groupOf(key).key.replace(' chemistry: Year ', ' ');
export const badgeClass = (key: string) => `badge badge-${groupOf(key).n}`;
// Which papers examine a topic, from the assessment overview in the specification (topic.code is e.g. "Topic 13A").
const P1 = [1, 2, 3, 4, 5, 8, 10, 11, 12, 13, 14, 15];
const P2 = [2, 3, 5, 6, 7, 9, 16, 17, 18, 19];
const AS1 = [1, 2, 3, 4, 5];
const AS2 = [2, 5, 6, 7, 8, 9, 10];
export function whereExamined(t: { code: string; group: string }): string {
  const n = parseInt(t.code.replace('Topic ', ''), 10);
  const a: string[] = [];
  if (P1.includes(n)) a.push('Paper 1');
  if (P2.includes(n)) a.push('Paper 2');
  const s: string[] = [];
  if (AS1.includes(n)) s.push('Paper 1');
  if (AS2.includes(n)) s.push('Paper 2');
  return `A-level ${a.join(' and ')}, and Paper 3 (any topic)${s.length ? `; AS ${s.join(' and ')}` : ''}`;
}
export const motifFor = (t: { slug: string; group: string }) => {
  const s = t.slug;
  if (s.includes('atomic') || s === 'bonding' || s === 'structure' || s.includes('transition')) return 'orbital';
  if (s.includes('spectro') || s.includes('nmr')) return 'spectrum';
  if (s.includes('arenes')) return 'benzene';
  if (s.includes('amounts') || s.includes('acid-base') || s.includes('group') || s.includes('inorganic') || s.includes('redox')) return 'flask';
  return groupOf(t.group).motif;
};
