import { CorsOptions } from 'cors';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const isAllowedOrigin =
      origin === FRONTEND_URL || process.env.EXCLUDE_URL === origin;

    if (isAllowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export default function configureCors() {
  return corsOptions;
}
