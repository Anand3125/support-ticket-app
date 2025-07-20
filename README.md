


TypeScript + Vite
Tickets are rendering



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 🚀 Running with Docker

### 1. Build the Docker image

```bash
docker build -t support-ticket-app .
```

### 2. Run the Docker container (default: port 8080)

```bash
docker run -p 8080:80 support-ticket-app
```

- The app will be available at: [http://localhost:8080](http://localhost:8080)
- Example: [http://localhost:8080/login](http://localhost:8080/login)

### 3. Change the exposed port (optional)

If you want to use a different port (e.g., 3000), change the first number in the `-p` flag:

```bash
docker run -p 3000:80 support-ticket-app
```

- The app will now be available at: [http://localhost:3000](http://localhost:3000)

### 4. Stopping the container

Press `Ctrl+C` in the terminal where the container is running, or use:

```bash
docker ps  # find your container ID
# then
docker stop <container_id>
```

---

For more details, see the Dockerfile and nginx.conf in the project root.

<img width="765" height="1177" alt="Screenshot 2025-07-18 at 6 56 23 PM" src="https://github.com/user-attachments/assets/c42cb061-3970-45bb-acd6-4557e9cba0fc" /># React + TypeScript + Vite