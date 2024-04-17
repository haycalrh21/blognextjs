import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { loginWithGoogle, signIn } from "@/services/auth/services";
import jwt from "jsonwebtoken";

const authOptions = {
	session: {
		strategy: "jwt",
		maxAge: 5 * 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials;
				const user = await signIn(email);
				if (user) {
					const passwordConfirm = await compare(password, user.password);
					if (passwordConfirm) {
						return user;
					} else {
						return null;
					}
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_OATH_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_OATH_CLIENT_SECRET || "",
			authorization: {
				params: {
				  prompt: "consent",
				  access_type: "offline",
				  response_type: "code"
				}
			  }
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			if (account?.provider === "credentials") {
				token.email = user.email;
				token.fullname = user.fullname;

				token.role = user.role;
			}

			if (account?.provider === "google") {
				const data = {
					email: user.email,
					fullname: user.name,
					type: "google",
				};
				await loginWithGoogle(data, (data) => {
					token.email = data.email;
					token.fullname = data.name;
					token.role = data.role;
				});
				console.log(loginWithGoogle);
			}
			return token;
		},
		async session({ session, token }) {
			session.user = session.user || {};

			if (token.email) {
				session.user.email = token.email;
			}
			if (token.fullname) {
				session.user.fullname = token.fullname;
			}
			if (token.role) {
				session.user.role = token.role;
			}

			const accessToken = jwt.sign(
				{ ...session.user },
				process.env.NEXTAUTH_SECRET || "",
				{
					algorithm: "HS256",
				}
			);
			session.accessToken = accessToken;
			console.log(session);
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
};

export default NextAuth(authOptions);
