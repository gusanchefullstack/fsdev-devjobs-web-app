export interface JobSection {
  content: string;
  items: string[];
}

export interface Job {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: JobSection;
  role: JobSection;
}

export interface JobFilters {
  title: string;
  location: string;
  fullTimeOnly: boolean;
}
