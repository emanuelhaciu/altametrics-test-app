import { z } from 'zod';
import { ApiResponse } from './api-response';

// DTO for Login Request
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// DTO for Login Response
export const UserProfileDTOSchema = z.object({
  access_token: z.string().optional(),
  email: z.string().email(),
  name: z.string()
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type UserProfileDto = z.infer<typeof UserProfileDTOSchema>;

export type LoginResponse = ApiResponse<UserProfileDto>;
export type UserProfileResponse = ApiResponse<UserProfileDto>;