<h1 align="center" id="title">Telegram-clone</h1>

<p align="center"><img src="https://i.ibb.co/XfDcLFcf/photo-2024-11-12-20-04-09.jpg" alt="project-image"></p>

<h2>🚀 Demo</h2>

[https://telegram-clone-ixtiyor.vercel.app](https://telegram-clone-ixtiyor.vercel.app)

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Secure authentication and user management
*   Modern responsive UI with TailwindCSS and Shadcn UI components
*   Message reactions editing and deletion
*   Image uploads and user profile configuration
*   Real-time one-to-one messaging with notification and sending sounds

<h2>🛠️ Installation Steps:</h2>

<p>1. Make sure Git and NodeJS is installed.</p>

<p>2. Clone this repository to your local computer.</p>

<p>3. Create .env.local file in client directory.</p>

```
#.env.local

# public app url
NEXT_PUBLIC_SERVER_URL=http://localhost:4000

# jwt secret
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret_here

# auth secret
NEXT_AUTH_SECRET=your_next_auth_secret_here

# mongodb uri
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/telegram-clone

# uploadthing token
UPLOADTHING_TOKEN=your_upload_thing_token_here
```

<p>3. Create .env file in server directory.</p>

```
#.env

# application port
PORT = 4000

# mongodb uri
# MONGO_URI = mongodb+srv://<username>:<password>@cluster0.mongodb.net/telegram-clone

# application client url
CLIENT_URL = http://localhost:3000

# SMTP settings
SMTP_PASS = your_smtp_password
SMTP_USER = your_smtp_user_gmail
SMTP_HOST = your_smtp_host
SMTP_PORT = your_smtp_port

JWT_SECRET = your_jwt_secret_here
```
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Frontend: Next.js 15 ReactJS TailwindCSS Shadcn UI
*   Backend: Node.js Express.js MongoDB
*   Authentication: NextAuth with Gmail SMTP
*   Real-Time Messaging: Socket.IO Zustand for state management
*   Type Safety: TypeScript
