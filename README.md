



TypeScript + Vite

<img width="765" height="1177" alt="Screenshot 2025-07-18 at 6 56 23 PM" src="https://github.com/user-attachments/assets/c42cb061-3970-45bb-acd6-4557e9cba0fc" /># React + TypeScript + Vite

Tickets are rendering




==
on Docker this image is running-
<img width="1303" height="740" alt="Screenshot 2025-07-21 at 5 01 25 AM" src="https://github.com/user-attachments/assets/a16e2e58-4a5f-49c0-bcac-a1f89d7e2d37" />


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

<<<<<<< HEAD
<img width="765" height="1177" alt="Screenshot 2025-07-18 at 6 56 23 PM" src="https://github.com/user-attachments/assets/c42cb061-3970-45bb-acd6-4557e9cba0fc" /># React + TypeScript + Vite
=======

