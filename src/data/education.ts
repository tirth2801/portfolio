export interface Semester {
  term: string;
  note?: string;
  courses: string[];
}

export const semesters: Semester[] = [
  {
    term: 'Fall 2018',
    note: 'Started in General Engineering',
    courses: ['General Chemistry + Lab', 'Principles of Economics', 'Foundations of Engineering', 'First-Year Writing', 'Calculus I'],
  },
  {
    term: 'Spring 2019',
    courses: ['Intro to ECE Concepts', 'Foundations of Engineering', 'First-Year Writing', 'Calculus II', 'Linear Algebra', 'Foundations of Physics I'],
  },
  {
    term: 'Fall 2019',
    note: 'Declared Computer Science',
    courses: ['Intro to Software Design', 'World Regions', 'Multivariable Calculus', 'Discrete Math', 'Foundations of Physics II'],
  },
  {
    term: 'Spring 2020',
    courses: ['Public Speaking', 'Intro to Problem Solving in CS', 'Software Design & Data Structures', 'Design Appreciation', 'Differential Equations', 'Applied Combinatorics'],
  },
  {
    term: 'Fall 2020',
    courses: ['Computer Organization', 'Professionalism in Computing', 'Cloud Software Development', 'Technical Writing', 'Social Problems', 'Statistics for Engineering Apps'],
  },
  {
    term: 'Spring 2021',
    courses: ['Data Structures & Algorithms', 'GUI Programming & Graphics', 'Intro to Disabilities Studies', 'Cryptography', 'Global Ethics'],
  },
  {
    term: 'Fall 2021',
    courses: ['Life in the Built Environment', 'Computer Organization II', 'Comparative Languages', 'Data & Algorithm Analysis', 'Multimedia / Hypertext'],
  },
  {
    term: 'Spring 2022',
    note: 'Graduated',
    courses: ['Computer Systems', 'Database Management Systems'],
  },
];
