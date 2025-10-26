// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessTokenCookieString } from '@/utils/auth';
import { isSecureConnection } from '@/utils/server';

type LoginData = {
  login: string;
  password: string;
};
type LoginResponse = {
  token?: string;
  error?: string;
};

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

if (!AUTH_API_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_AUTH_API_URL is not set');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { login, password } = req.body as LoginData;

  if (!login || !password) {
    return res.status(400).json({ error: 'Login and password are required' });
  }

  try {
    const response = await axios.post(process.env.AUTH_API_URL!, {
      email: login,
      password,
    });

    const { access_token, refresh_token } = response.data;

    const cookieString = getAccessTokenCookieString(
      access_token,
      isSecureConnection(req)
    );
    // TODO: Remove this console.log
    console.log('cookieString', cookieString);

    return res
      .status(200)
      .setHeader('Set-Cookie', cookieString)
      .json({ token: access_token });
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? 'Authentication failed:' + error.response?.data.error || error.message
      : 'Unexpected error:' + error;

    console.log(errorMessage);
    return res.status(401).json({ error: errorMessage });
  }
}
