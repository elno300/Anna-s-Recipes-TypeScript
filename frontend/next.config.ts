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
				port: '3000',
				pathname: '/uploads/**',
			},
		],
	},
	webpack(config) {
		// Lägg till stöd för att hantera ttf, eot, woff, svg och bilder
		config.module.rules.push({
			test: /\.(ttf|eot|woff|woff2|svg|png|jpg|gif)$/,
			use: {
				loader: 'file-loader',
				options: {
					publicPath: '/_next/static/',
					outputPath: 'static/',
					name: '[name].[ext]',
				},
			},
		});
		return config;
	},
};

import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

export default nextConfig;
