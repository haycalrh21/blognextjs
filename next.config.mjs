import moment from "moment-timezone";

const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				hostname: "firebasestorage.googleapis.com",
			},
			{
				hostname: "avatars.githubusercontent.com",
			},
		],
	},
};

export default {
	...nextConfig,
	webpack: (config, { dev, isServer }) => {
		// Atur zona waktu default
		moment.tz.setDefault("Asia/Jakarta");

		return config;
	},
};
