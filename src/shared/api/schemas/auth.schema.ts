import { z } from "zod";

// Request schemas
export const googleSignInRequestSchema = z.object({
  redirectTo: z.string().optional(),
});

// Response schemas
export const googleSignInResponseSchema = z.object({
  data: z.object({
    url: z.string(),
  }),
});

export const userResponseSchema = z.object({
  data: z.object({
    user: z.object({
      id: z.string(),
      email: z.string().nullish(),
      user_metadata: z.record(z.string(), z.unknown()).nullish(),
      created_at: z.string().nullish(),
    }),
  }),
});

export const messageResponseSchema = z.object({
  message: z.string(),
});

// Types
export type GoogleSignInRequest = z.infer<typeof googleSignInRequestSchema>;
export type GoogleSignInResponse = z.infer<typeof googleSignInResponseSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type User = UserResponse["data"]["user"];
