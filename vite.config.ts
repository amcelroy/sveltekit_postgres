import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	define: {
		'process.env.NODE_ENV': process.env.NODE_ENV === 'production' 
		? '"production"'
		: '"development"'
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.ts', 
			scope: '/',
			base: '/',	
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},	
			manifest: {
				"short_name": "sveltekit-postgres",
				"name": "sveltekit-postgres-pwa",
				"start_url": "/",
				"icons": [
				  {
					"src": "logo_512.png",
					"type": "image/png",
					"sizes": "512x512"
				  }
				],
				"background_color": "#3367D6",
				"display": "standalone",
				"scope": "/",
				"theme_color": "#3367D6",
				"shortcuts": [
				  {
					"name": "Dashboard",
					"short_name": "Dashboard",
					"description": "Dashboard",
					"url": "/dashboard",
					"icons": [{ "src": "/icons/logo_192.png", "sizes": "192x192" }]
				  }
				],
				"description": "Demo PWA manifest file"
			}	
			/* other pwa options */  
		})
	],
	server: {
		host: true,
	}
});
