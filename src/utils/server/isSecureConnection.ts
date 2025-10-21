import { NextApiRequest } from 'next';

export const isSecureConnection = (req: NextApiRequest) => {
  const isSecureProtocol = req.headers['x-forwarded-proto'] === 'https';
  const isLocalhost = req.headers.host?.startsWith('localhost');
  const isSecureConnection = isSecureProtocol && !isLocalhost;

  return isSecureConnection;
};
