import NextAuth from "next-auth";
import {DefaultJWT, JWT as JWTBase} from 'next-auth/jwt'

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string | undefined;
      name: string | null | undefined;
      firstName: string | null | undefined;
      lastName: string | null | undefined;
      email: string | null | undefined;
      phoneNumber: string | null | undefined;
      image: string | null | undefined;
      idToken: string | null | undefined;
      accessToken: string | null | undefined;
    };
  }

//   interface JWT extends Record<string, unknown>, DefaultJWT {
//     token: JWTBase
//     firstName: string | null;
//     lastName: string | null;
//     phoneNumber: string | null;
//     image: string | null;
//     idToken: string | null;
//     accessToken: string | null;
//   }
}
