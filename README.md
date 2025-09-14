
# 🔙 RAG-Powered News Chatbot — Backend

This is the **backend** of a full-stack RAG-powered chatbot built using a Retrieval-Augmented Generation (RAG) pipeline. It powers a chatbot that responds to user queries based on news articles using vector embeddings, a vector store, and Google Gemini API.

> ✅ Assignment Submission for Full Stack Developer Role @ Voosh

---

## 📸 Demo

> 🎥 [Watch Demo Video](https://your-demo-video-link.com)  
> 🌐 [Live Backend API](https://rag-powered-chatbot-backend.onrender.com/chat)

---

## ⚙️ Tech Stack

| Tech              | Purpose                                 |
|-------------------|-----------------------------------------|
| **Node.js**       | Backend runtime                         |
| **Express.js**    | REST API framework                      |
| **Embeddings**    | Generate Pure JS Function for vector embeddings              |
| **Qdrant**        | Vector similarity search                |
| **Gemini API**    | Language model for generating replies   |
| **Redis**         | Session and chat history (in-memory)    |
| **Render**        | Hosting backend                         |

---

## 📁 Project Structure

```
📦 src

├── routes
│   ├── chatRoutes.js           # Handle chat queries
├── services
│   ├── newsIngest.js    #News ingest 
│   ├── redisClient.js  # Refis setup & operations
│   ├── vectorStoret.js   # Vector DB
│   └── geminiService.js  # Gemini API call logic
├── scripts
│   └── ingestAndStore.js # News ingestion and vector storage
├── controllers
│   └── chatController.js 
├── app.js               # Express app setup
└── server.js            # App entry point
```

---

## 🧠 How the RAG Pipeline Works

1. **Ingestion Phase**:
   - Scrape or fetch ~50 news articles (e.g., RSS feeds).
   - Extract and clean the text content.
   - Generate embeddings using Jina Embeddings API.
   - Store vectors in Qdrant DB with metadata.

2. **Query Phase**:
   - Receive user query via `POST /`.
   - Generate embedding for the query.
   - Perform similarity search in Qdrant (top-k results).
   - Merge retrieved snippets into a prompt.
   - Send prompt to Gemini API.
   - Return generated response to frontend.

3. **Session & Caching**:
   - On every chat message, history is stored in Redis by session ID.
   - TTL (Time-to-Live) is set to auto-expire after 24 hours.
   - APIs to fetch chat history and reset session.

---

## 🔐 Environment Variables

Create a `.env` file with the following keys:

```env
PORT=5000
REDIS_URL=redis://default:<password>@<your-redis-host>:<port>
QDRANT_URL=http://localhost:6333
GEMINI_API_KEY=your-google-ai-api-key
```

> 🔑 Replace with your actual credentials

---

## 🚀 Running the Server

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Server

```bash
npm start
```

The server will run on `http://localhost:5000`

### 3. Run Ingestion Script

```bash
node src/scripts/ingestAndStore.js
```

> This fetches and stores news data into Qdrant.

---

## 🧪 API Endpoints

| Endpoint         | Method | Description                             |
|------------------|--------|-----------------------------------------|
| `/`           | POST   | Process user query and return response  |
| `/:sessionId`       | GET    | Fetch session chat history              |
| `/:sessionId/clear`         | DELETE   | Clear session chat history              |

---

## 📦 Deployment

Deployed via [Render](https://render.com/)

- 🌐 Live: [https://rag-powered-chatbot-backend.onrender.com/chat](https://rag-powered-chatbot-backend.onrender.com/chat)

---

## 🔗 Related Repositories

- 💬 [Frontend Repo](https://github.com/YourUsername/rag-news-chatbot-frontend)

---

## 🧑‍💻 Author

**Shivani**  
[GitHub](https://github.com/Shivani6668) | [LinkedIn](https://www.linkedin.com/in/shivani6668/)

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 Feedback

Feel free to open an issue or submit a PR for improvements!
