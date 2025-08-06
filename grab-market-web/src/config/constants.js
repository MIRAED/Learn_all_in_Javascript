const BACKEND_URL_PROD = 'http://ec2-54-145-218-142.compute-1.amazonaws.com:8080';
const BACKEND_URL_DEV = 'http://localhost:8080';

export const API_URL = 
    process.env.NODE_ENV === "production"
        ? BACKEND_URL_PROD
        : BACKEND_URL_DEV;

