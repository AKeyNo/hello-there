import prisma from '../../../lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';
import sha256 from 'crypto-js/sha256';
import { SignUpErrors } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await handlePOST(res, req);
      break;
    case 'DELETE':
      await handleDELETE(res, req);
      break;
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// POST /api/user
async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
  let errors: SignUpErrors = {} as SignUpErrors;

  if (isMissingFields(req.body)) {
    return res.status(400).json({ message: 'Missing fields.' });
  }

  const { email, username, password, firstName, lastName } = req.body;

  if (await isEmailNotUnique(email)) {
    errors.emailError = 'Email is not unique!';
  }

  if (await isUsernameNotUnique(username)) {
    errors.usernameError = 'Username is not unique!';
  }

  if (isPasswordWeak(password)) {
    errors.passwordError = 'Pass is too weak!';
  }

  if (
    errors.emailError != undefined ||
    errors.usernameError != undefined ||
    errors.passwordError != undefined
  ) {
    const { emailError, usernameError, passwordError } = errors;

    return res.status(400).json({
      emailError,
      usernameError,
      passwordError,
    });
  }

  const hashedPassword: string = hashPassword(req.body.password);
  const joinDate: Date = new Date();

  const user = await prisma.user.create({
    data: { email, username, hashedPassword, firstName, lastName, joinDate },
  });
  return res
    .status(200)
    .json({ email, username, hashedPassword, firstName, lastName, joinDate });
}

// DELETE /api/user
async function handleDELETE(res: NextApiResponse, req: NextApiRequest) {
  // TODO: Add a way to make any user not be able to delete users.
  try {
    await prisma.$queryRaw`TRUNCATE TABLE public."User" CASCADE`;
    return res
      .status(200)
      .json({ message: 'Successfully truncated User table.' });
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
}

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

const isMissingFields = (body: any) => {
  return (
    !body.email || !body.username || !body.password
    // ||
    // !body.firstName ||
    // !body.lastName
  );
};

const isEmailNotUnique = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  return user !== null;
};

const isUsernameNotUnique = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  return user !== null;
};

const isPasswordWeak = (password: string) => {
  // check character length only as of right now
  return (
    password.length < parseInt(process.env.MINIMUM_PASSWORD_LENGTH ?? '12')
  );
};
