# 🤖 PythonChatbot

![License](https://img.shields.io/github/license/yourusername/pythonchatbot?color=blue&style=for-the-badge)
![Technologies](https://img.shields.io/badge/Technologies-FastAPI%20%7C%20OpenAI%20%7C%20Jinja2%20%7C%20Python-blue?style=for-the-badge)
![Contributions](https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge)

> A powerful and lightweight AI chatbot built with **FastAPI** and **OpenAI**, featuring real-time interaction, clean design, and environment-based configuration. Deploy-ready, developer-friendly, and easy to extend!

---

## 🌟 Features

- 🤖 **AI-Powered**: Uses OpenAI's API to generate human-like responses.
- ⚡ **FastAPI Backend**: High-performance API built with FastAPI for quick and scalable execution.
- 🧩 **Template Support**: Uses Jinja2 for server-side rendering of dynamic templates.
- 🌐 **WebSockets**: Real-time communication with the chatbot using WebSockets.
- 🔐 **Environment Variables**: Secure API keys and configuration using `.env`.
- 🚀 **Production-Ready**: Deployed via `uvicorn`, ready for local and cloud deployment.

---

## 🛠️ Technologies

| Technology         | Description                                      |
|--------------------|--------------------------------------------------|
| FastAPI            | High-performance Python web framework.           |
| OpenAI             | API for generating AI-powered responses.         |
| Jinja2             | Templating engine for rendering HTML.            |
| Uvicorn            | ASGI server for serving FastAPI apps.            |
| WebSockets         | For real-time message exchange.                  |
| Python Dotenv      | Manages environment variables securely.          |
| Python Multipart   | Handles form-data for file uploads.              |
| Certifi            | Ensures SSL certificate validation.              |

---

## 📂 Folder Structure

```plaintext
pythonchatbot/
├── app/
│   ├── main.py              # FastAPI application and routing
│   ├── templates/           # Jinja2 HTML templates
│   └── static/              # Static files (CSS/JS)
├── .env                     # Environment variables (API keys)
├── requirements.txt         # Python dependencies
├── README.md                # Project documentation
└── run.sh / start.py        # Startup scripts
```

# 🚀 Getting Started

## Prerequisites
*Make sure you have the following installed:*
- **Python 3.8+**
- **pip** 

## Installation
1. **Clone the repository**
   
```bash
   git clone git@github.com:Ryan-Athan/python_chatbot.git
 ```  
2. **Navigate to the project directory:**
```bash
   cd pythonchatbot
``` 
3. **Create a virtual environment and activate it**
   
```bash
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
```
4. **Install dependencies**
   
```bash
  pip install -r modules.txt
```
5. **Set up environment variables**
*Create a .env file in the root directory:*

```bash
  OPENAI_API_KEY=your_openai_api_key
```

   
## Running the App

**Start the server with Uvicorn:**
```bash
    uvicorn app.main:app --reload
```  
**Visit http://127.0.0.1:8000 in your browser to chat with your bot!**

## Building for Production
 **To run without --reload and in production mode:**
```bash
 uvicorn app.main:app --host 0.0.0.0 --port 8000
``` 
## Contributing

- Feel free to fork the repository and make pull requests. Contributions are always welcome! ✨

## 📝 License

- This project is licensed under the MIT License.
