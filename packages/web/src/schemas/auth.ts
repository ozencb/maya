import { z } from 'zod';

export const signSchema = z.object({
  username: z.string().min(4, 'Username must contain at least 4 characters'),
  password: z.string().regex(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const register = signSchema;
export const login = signSchema;
