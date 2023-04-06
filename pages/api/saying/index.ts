import prisma from '../../../lib/prisma/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken, JWT } from 'next-auth/jwt';
import { isAuthenticated } from '../../../lib/auth/authentication';

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });

  if (!isAuthenticated(res, token!)) {
    return res.status(401).json({ message: 'You are not logged in!' });
  }

  switch (req.method) {
    case 'POST':
      await handlePOST(res, req, token!);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// POST /api/saying
async function handlePOST(
  res: NextApiResponse,
  req: NextApiRequest,
  token: JWT
) {
  const { repliedToSayingID, text } = req.body;

  if (
    !text ||
    text.length > (process.env.SAYING_CHARACTER_LENGTH ?? 280) ||
    text.length < 1
  ) {
    return res.status(422).json({ message: 'Error: Invalid text length!' });
  }

  try {
    const saying = await prisma.saying.create({
      data: {
        creatorID: token.id,
        repliedToSayingID,
        text,
      },
      include: {
        creator: { select: { username: true } },
      },
    });

    return res.status(200).json(saying);
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Failed to create saying.' });
  }
}
