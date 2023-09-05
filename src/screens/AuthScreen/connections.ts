import { get } from 'src/utils/unchanged';

export type SignInVars = { email: string; password: string };
export type SignInResponse = { token: string };

export const extractSignIn = (data: SignInResponse): string => get('token', data);

export type SignUpVars = { email: string; password: string };
export type SignUpResponse = { token: string };

export const extractSignUp = (data: SignUpResponse): string => get(`token`, data);
