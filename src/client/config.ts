import { PUBLIC_PATH } from '../config';

export const URL = process.env.LOCAL === 'true' ? 'http://localhost:4001' : PUBLIC_PATH;
