export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'fab fa-react',
    items: ['HTML5/CSS3', 'JavaScript', 'TypeScript', 'React / Redux', 'Angular'],
  },
  {
    title: 'Backend & Data',
    icon: 'fas fa-database',
    items: [
      "Python / Node.js",
      "REST API's / ETL Pipelines",
      'PostgreSQL / MongoDB',
      'SQL / KQL',
      'Microsoft Fabric',
    ],
  },
  {
    title: 'Leadership & Delivery',
    icon: 'fas fa-users',
    items: [
      'Cross-Functional Team Leadership',
      'Mentorship',
      'Stakeholder & SME Management',
      'Agile / Gitflow',
      'AI-Assisted Development',
    ],
  },
];
