#  LingoCard

> Transform your developer profile into multilingual portfolio cards in seconds


##  What it does

- **One Profile → Many Languages**: Enter once, generate cards in 80+ languages
- **Export Ready**: Get React, HTML, or Markdown code instantly
- **Share Anywhere**: Create shareable links for your multilingual profile

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (frontend + backend)
npm start
```

**Environment Setup** (`.env`):
```env
LINGODOTDEV_API_KEY=your_api_key_here
PORT=3001
```

Get your API key: [lingo.dev](https://lingo.dev)

##  Features

### Web App
- **Live Preview**: See changes as you type
- **Multi-Template**: Modern, gradient, or classic designs
- **Auto Skills**: Extracts tech skills from your bio
- **Code Export**: Copy-paste ready components
- **QR Codes**: Auto-generated contact links

##  Tech Stack

**Frontend**: React, Vite, Tailwind CSS  
**Backend**: Express.js, Lingo.dev SDK  

##  Project Structure

```
├── src/
│   ├── components/    # React components
│   ├── pages/         # Main app pages
│   └── utils/         # Helpers & themes
├── api/
│   ├── server.js      # Express server
│   ├── translate.js   # Translation logic
│   └── share.js       # Share link handler
└── .env               # Config (gitignored)
```

##  Demo Flow

1. Fill profile form (name, bio, project, links)
2. Choose card template
3. Click **Generate** → cards appear in 6 languages
4. Export code or create share link
5. Install extension → translate anywhere



**Made for developers who code globally** 
