import { z } from 'zod';

export const login = z.object({
  username: z.string().min(3).max(30),
  password: z.string().regex(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const register = z.object({
  username: z.string().min(3).max(30),
  password: z.string().regex(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
