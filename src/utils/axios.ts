import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { config } from 'dotenv';
config(); // Load environment variables from .env file

export const axiosInstance = axios.create({
  baseURL: process.env.TERMINAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TERMINAL_API_KEY}`,
  },
});
