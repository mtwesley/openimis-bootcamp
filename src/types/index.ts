export interface Platform {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
  group: string;
  group_title: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string[];
  platform: string;
  duration: number;
  difficulty: number;
  url: string;
  format: string;
}

export interface Step {
  rank: number;
  title: string;
  categories: string[];
}

export interface Path {
  id: string;
  title: string;
  description: string;
  totalDuration: number;
  steps: Step[];
}

export interface AppData {
  platforms: Platform[];
  categories: Category[];
  resources: Resource[];
  paths: Path[];
}
