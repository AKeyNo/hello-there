import { NextApiRequest, NextApiResponse } from 'next';
import * as jwt from 'next-auth/jwt';

const secret = process.env.GOOGLE_SECRET;

const Token = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await jwt.getToken({ req, secret });
  console.log(secret);
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  return res.json(token);
};

export default Token;
