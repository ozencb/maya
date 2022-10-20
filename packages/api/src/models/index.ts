// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@Common';

export interface Log {
  id: number;
  createdAt: Date;
  createdBy: string;
  action: string;
  level: string;
  error: string | null;
  payload: JSON | null;
}
