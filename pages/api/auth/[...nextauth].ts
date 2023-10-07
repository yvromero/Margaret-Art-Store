import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '@/database';

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'margaret@gmail.com' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize( credentials ) {
        // console.log({credentials});

        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password ) as any;

      }
    }),

    // ...add more providers here

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

  ],


  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },


  // Callbacks
  jwt: {

  },
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },

  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({ token, account, user});

      if ( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '' );
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {


      (session as any).accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
  }
}

export default NextAuth(authOptions)
