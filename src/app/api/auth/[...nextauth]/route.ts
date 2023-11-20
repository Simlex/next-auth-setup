import prisma from "@/app/lib/prisma";
import { Account, AuthOptions, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth/next";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
import { Session } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your@email.com",
        },
        password: {
          label: "Passowrd",
          type: "password",
        },
        firstName: {
          label: "firstName",
          type: "text",
        },
        lastName: {
          label: "lastName",
          type: "text",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
          //   return Promise.resolve(null);
        }

        const { email, password, firstName, lastName } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
          //   return Promise.resolve(null);
        }

        const userPassword = user.password;
        const isValidPassword = bcrypt.compareSync(password, userPassword);

        if (!isValidPassword) {
          return null;
          //   return Promise.resolve(null);
        }

        console.log(user);

        // return Promise.resolve(user);
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: "http://localhost:3000/api/auth/callback/google", // Make sure this matches the URI in the Google Developer Console
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
    }),
    GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        authorization: {
          params: {
            redirect_uri: "http://localhost:3000/api/auth/callback/github",
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          },
        },
    })
  ],
  pages: {
    signIn: "auth/signin",
    signOut: "auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode");
      }
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to decode");
      }
      const decodedToken = jwt.verify(token, secret);
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken);
      } else {
        return decodedToken;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Would be stored for 30 days
    updateAge: 24 * 60 * 60, // How frequently the tokem would be updated -  every day
  },
  callbacks: {
    async session(params: { session: Session; token: JWT; user: User }) {
      // If session is valid
      if (params.session.user) {
        params.session.user.email = params.token.email;
        params.session.user.name = params.token.name;
        // params.session.user.firstName = params.token.firstName;
        // params.session.user.lastName = params.token.lastName;
      }
      return params.session;
    },
    async jwt(params: {
      token: JWT;
      user?: User | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (params.user) {
        params.token.email = params.user.email;
        params.token.name = params.user.name;
      }
      return params.token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
