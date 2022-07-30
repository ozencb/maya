export interface User {
  id: number;
  name: string;
  password: string;
}

export interface Log {
  id: number;
  createdAt: Date;
  createdBy: string;
  action: string;
  level: string;
  error: string | null;
  payload: JSON | null;
}
