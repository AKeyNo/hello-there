//@ts-ignore
import { Session } from 'next-auth';
//@ts-ignore
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      name?: string;
    };
  }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    email: string;
    picture: string;
    sub: string;
    id: string;
    exp: Number;
    jti: string;
  }
}
