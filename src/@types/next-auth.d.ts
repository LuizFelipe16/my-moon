import NextAuth from 'next-auth';
import 'next-auth';

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    }
  }

  interface User {
    name: string;
    email: string;
    image: string;
  }
}