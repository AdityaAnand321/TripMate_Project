# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment (Netlify)

This is a Single Page Application using React Router. To prevent 404s on refresh or direct-linking to client routes on Netlify, a redirect rule is included.

Already added in this repo:
- `public/_redirects` with the line: `/* /index.html 200`

How to deploy:
- Build: `npm run build`
- Netlify publish directory: `dist`
- Netlify will copy the `_redirects` file into the deploy, so browser refresh on any route will serve `index.html` and let the client router handle it.

Alternative: Instead of `public/_redirects`, you can use a `netlify.toml` with:

```
[build]
	publish = "dist"

[[redirects]]
	from = "/*"
	to = "/index.html"
	status = 200
```
