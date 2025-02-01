# Doddamma's Document Writer

A modern, LLM-powered document editor with real-time style checking and writing advice.

## Features

- Rich text editing with a Google Docs-like interface
- Upload and apply style guides (PDF, TXT, DOC formats)
- Real-time writing advice powered by Claude AI
- Modern, fluid animations and interface

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your Anthropic API key:
```
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
```

3. Start the development server:
```bash
npm start
```

## Usage

1. Use the editor on the right side to write your content
2. Upload style guides and rules using the sidebar on the left
3. Receive real-time writing advice based on your content and style guides
4. Click the X button to dismiss advice you don't want to apply

## Technologies Used

- React
- TipTap Editor
- Mantine UI
- Framer Motion
- Anthropic Claude AI
- React Dropzone
