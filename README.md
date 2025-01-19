<div style="height: 8px; background-color: #4a90e2;"></div>

# <img width="60" src ="./frontend/src/assets/lock1.svg" /> **SafeRoom - Real-Time Chat Room App**

A feature-rich real-time chat room application built from scratch, including both backend and frontend components.

<p align="center">

  <img src="https://img.shields.io/badge/React-18.3.1-blue" alt="React">
  <img src="https://img.shields.io/badge/TanStack%20Query-5.62.8-blue" alt="TanStack Query">
  <img src="https://img.shields.io/badge/Express-4.21.2-green" alt="Express">
  <img src="https://img.shields.io/badge/Socket.io-4.8.1-green" alt="Socket.io">
  <img src="https://img.shields.io/badge/Redis-4.7.0-green" alt="Redis">
  <img src="https://img.shields.io/badge/Docker-blue" alt="Docker">
</p>

---

## **Tech Stack**

- **Frontend**: React
- **Backend**: Express.js, Socket.io
- **Data Store**: Redis
- **Remote State Management**: TanStack Query + Axios
- **Styling**: Styled-Components
- **Containerization**: Docker

---

## **Features**

1. **Chat Room Management**

   - Create chat rooms with custom names.
   - Protect chat rooms with passwords for secure access.

2. **Real-Time Messaging**

   - Instant chat powered by Socket.io for seamless communication.

3. **Encrypted Communication**

   - Basic message encryption using `crypto.subtle` and AES-CBC for added security.

4. **Self-Destructing Rooms**

   - Chat rooms automatically self-destruct after a configurable time period.

5. **Kill Switch**

   - Each room member has access to a Kill Switch to permanently delete all messages for all users.

6. **Online Users List**

   - See real-time indications of online users and a list of participants in each room.

7. **Dockerized Environment**
   - Fully containerized application using Docker Compose for effortless deployment.

---

## **Screenshots**

<p align="center">
  <img align="center" height="500" src="./github_images/main.png" alt="Main screen"/>
  <img align="center" height="500" src="./github_images/create.png" alt="Create room screen"/>
  <img align="center" height="500" src="./github_images/chat.png" alt="Chat screen"/>
</p>

---

## **License**

This project is licensed under the [MIT License](./LICENSE).

---

## **Contributing**

If you’d like to contribute to the development of SafeRoom, feel free to fork the repository and submit pull requests. We welcome suggestions and improvements!

---

## **Project Status**

> **Note**: This project is currently under active development. Stay tuned for updates and exciting new features!
