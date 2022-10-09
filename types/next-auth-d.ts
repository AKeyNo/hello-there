import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    foo: string;
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
