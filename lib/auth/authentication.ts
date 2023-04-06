import { JWT } from 'next-auth/jwt';

const isAuthenticated = (token: JWT) => {
  // @ts-ignore
  // check to see if the given token is expired or not
  return token && Date.now() / 1000 < token.exp;
};

const isOriginalCreator = (token: JWT, idToCheck: string) => {
  // check to see if
  // 1. they are authenticated
  // 2. they are the original creator
  return isAuthenticated(token) && token.id == idToCheck;
};

export { isAuthenticated, isOriginalCreator };
