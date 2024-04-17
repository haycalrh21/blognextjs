import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/Footer/Footer";

const disableNavbar = ["admin", "auth"];
const disableFooter = ["admin", "auth"];

export default function App({ Component, pageProps, session }) {
	const { pathname } = useRouter();

	// Periksa apakah navbar harus dinonaktifkan berdasarkan path
	const shouldDisableNavbar = disableNavbar.some((path) =>
		pathname.startsWith(`/${path}`)
	);
	const shouldDisableFooter = disableNavbar.some((path) =>
		pathname.startsWith(`/${path}`)
	);
	return (
		<SessionProvider session={session}>
			{/* Guna split merupakan untuk admin */}
			{!shouldDisableNavbar && <Navbar />}
			<Component {...pageProps} />
			{!shouldDisableFooter && <Footer />}

			<Analytics />
			<SpeedInsights />
		</SessionProvider>
	);
}
