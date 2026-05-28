# ViralFlow: Social Media Content Analyzer & Script Generator

ViralFlow is a premium web application designed for creators to analyze past social media posts, extract actionable performance insights, review automated content recommendations, and craft script drafts.

## 🚀 Quick Start

To run the application locally using Python:

1. Open a terminal or PowerShell.
2. Navigate to this project directory:
   ```bash
   cd "C:\Users\user\.gemini\antigravity\scratch\social-media-analyzer"
   ```
3. Run the server launcher:
   ```bash
   python server.py
   ```
4. A web browser window will open automatically pointing to the local dashboard.

---

## 🛠️ Features

1. **Platform Analytics Dashboard**: Compare metrics for YouTube, TikTok, Instagram, and Twitter.
2. **AI Recommendation System**: Dynamically calculates engagement rates and provides tailored topics to focus on.
3. **Structured Scriptwriter**: Select your platform, topic, tone, hook style, and instantly generate formatted scripts.
4. **Data Importer**: Upload your own CSV exports (or edit custom entries manually in the UI).

---

## 📂 File Structure

- [index.html](file:///C:/Users/user/.gemini/antigravity/scratch/social-media-analyzer/index.html) - Main layout layout grid, forms, navigation tabs, and script container.
- [style.css](file:///C:/Users/user/.gemini/antigravity/scratch/social-media-analyzer/style.css) - Premium dark theme design, platform branding accents, glassmorphic styling, and interactive layouts.
- [generator.js](file:///C:/Users/user/.gemini/antigravity/scratch/social-media-analyzer/generator.js) - Script generation algorithms, formatting templates, and data analytics logic.
- [app.js](file:///C:/Users/user/.gemini/antigravity/scratch/social-media-analyzer/app.js) - App controller, local storage management, table rendering, CSV parser, and Chart.js animations.
- [server.py](file:///C:/Users/user/.gemini/antigravity/scratch/social-media-analyzer/server.py) - Python serving utility.

---

## 📊 CSV Import Guidelines

When importing your own metrics data, format your CSV file with headers corresponding to:
```csv
Title, Views, Likes, Comments, Shares, Category, Type, Date
```
*Note: Column titles are case-insensitive and mapped loosely.*
