import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:3000/api/:path*',
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000', // Din backend-port
				pathname: '/uploads/**', // Matcha URL-sökvägen till dina uppladdade filer
			},
		],
	},
};

import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

export default nextConfig;
