export enum RiskLevel {
  NONE,
  SAFE,
  MEDIUM_RISK,
  HIGH_RISK,
}

export interface AnswerOption {
  text: string;
  score: number;
}

export interface Question {
  id: string;
  section: string;
  text: string;
  options: AnswerOption[];
}

export interface User {
    role: 'student' | 'admin';
    name: string;
    class?: string;
    school?: string;
    province?: string;
}

export interface StudentResult {
    id: string; // unique id for each submission
    name: string;
    class: string;
    school: string;
    province: string;
    score: number;
    riskLevel: RiskLevel;
    timestamp: number;
}
