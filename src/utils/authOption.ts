import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { ApiCaller } from "@/utils/apiCaller";

const validateUser = async (
  email: string,
  password: string
): Promise<{ success?: boolean; message?: string; data?: any }> => {
  const res = await ApiCaller.post(`/auth/login`, { email, password });
  if (res.success) {
    const { data } = res;
    return { success: true, data, message: "Login " };
  } else {
    return { message: res.message, success: false, data: null };
  }
};

const saveGoogleUser = async (user: any) => {
  const res = await ApiCaller.post(
    `/auth/google-signin`,
    {
      name: user.name,
      email: user.email,
      image: user.image,
      googleId: user.id,
    },
    false
  );

  if (res.success) {
    return res.data;
  }
  return null;
};
const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials missing");
        }
        const { data: user, message } = await validateUser(
          credentials.email,
          credentials.password
        );
        if (!user) {
          throw new Error(message);
        }
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.accessToken = account?.access_token;
        token.sub = account.id as string;
      }
      if (account && profile) {
        if (account.provider === "google") {
          const googleUser = await saveGoogleUser({
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.image,
          });

          if (googleUser) {
            token.id = googleUser.id;
            token.name = googleUser.name;
            token.email = googleUser.email;
            token.picture = googleUser.image;
          }
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        name: token.name as string,
        email: token.email as string,
        image: token.picture as string,
      };
      session.accessToken = token.accessToken as string;
      session.id = token.sub as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default authOptions;