# 💖 Valentine's Day Website for Titir

A heartfelt, fully responsive multi-page Valentine's Day website built with pure HTML, CSS, and JavaScript. This is a love letter written in code.

## ✨ Features

- **6 Romantic Pages:**
  - 🏠 Landing page with animated floating hearts
  - 📖 Our Story timeline with emotional milestones
  - 💌 Love Letters with expandable cards
  - 🌹 Reasons I Choose You grid with hover effects
  - 🎵 Our Song page with audio player
  - 💍 The Question finale with reveal animation

- **Mobile-First Responsive Design:**
  - Works perfectly on phones (360px+), tablets, and desktops
  - Smooth animations and transitions
  - No horizontal scrolling at any breakpoint
  - Touch-friendly interactions

- **Beautiful Design:**
  - Romantic color palette (blush pink, lavender, cream, rose)
  - Google Fonts: Playfair Display, Inter, Dancing Script
  - Glassmorphism effects and soft shadows
  - Floating hearts background animation

## 🚀 How to Use

### Quick Start

1. **Open the website:**
   - Simply open `index.html` in your web browser
   - No server or build process required!

2. **Navigate through the pages:**
   - Click "Start the Journey ❤️" on the landing page
   - Use the navigation menu to explore all pages
   - Click on love letters to expand them
   - Click the Valentine's button on the final page for a special reveal

### Customization

#### 1. **Personalize the Content**

Edit the HTML files to add your own personal stories and messages:

- **story.html** - Update the timeline events with your real relationship milestones
- **letters.html** - Write your own love letters in the expandable cards
- **reasons.html** - Add your own reasons (currently has 12, you can add more!)
- **song.html** - Add your special song and explain why it's meaningful

#### 2. **Add Your Song**

To add an audio file:

1. Create an `assets` folder in the project directory
2. Add your MP3 file (e.g., `our-song.mp3`)
3. In `song.html`, uncomment the audio player code and update the path:

```html
<audio controls class="audio-player">
    <source src="assets/our-song.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
```

#### 3. **Add Photos (Optional)**

To add photos to the timeline or other pages:

1. Add images to the `assets` folder
2. Insert them in the HTML:

```html
<img src="assets/photo.jpg" alt="Description" style="border-radius: var(--border-radius); margin: var(--space-md) 0;">
```

#### 4. **Customize Colors**

Edit the CSS custom properties in `styles.css` (lines 8-16):

```css
:root {
  --color-blush: #FFB6C1;      /* Change to your preferred pink */
  --color-lavender: #E6E6FA;   /* Change to your preferred purple */
  --color-rose: #C71585;       /* Change to your preferred accent */
  /* ... etc */
}
```

## 📱 Testing Responsiveness

### In Browser (Chrome DevTools)

1. Open the website in Chrome
2. Press `F12` to open DevTools
3. Click the device toolbar icon (or press `Ctrl+Shift+M`)
4. Test different device sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1024px+)

### Manual Testing

Simply resize your browser window and watch the layout adapt smoothly!

## 📂 Project Structure

```
Valentine's day/
├── index.html          # Landing page
├── story.html          # Timeline page
├── letters.html        # Love letters page
├── reasons.html        # Reasons grid page
├── song.html           # Audio player page
├── question.html       # Final question page
├── styles.css          # Complete design system
├── script.js           # Interactive functionality
├── README.md           # This file
└── assets/             # (Create this folder for images/audio)
```

## 🎨 Design System

### Colors
- **Blush Pink** (#FFB6C1) - Primary accent
- **Lavender** (#E6E6FA) - Secondary accent
- **Cream** (#FFF8DC) - Background
- **Rose** (#C71585) - Interactive elements
- **Deep Rose** (#8B1A5A) - Headings

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Handwritten:** Dancing Script (cursive)

### Breakpoints
- Mobile: 480px and below
- Tablet: 768px
- Desktop: 1024px+

## 💝 Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the entire folder
3. Get instant deployment with a custom URL

### Option 3: Share Locally

Simply zip the folder and send it to Titir. She can open `index.html` in any browser!

## 🌟 Tips for Maximum Impact

1. **Timing:** Send this on Valentine's Day morning for maximum surprise
2. **Personal Touch:** Customize every piece of content to reflect your real relationship
3. **Add Photos:** Include actual photos of you two together
4. **Real Song:** Use your actual special song in the audio player
5. **Handwritten Note:** Include a physical card with the website link

## 🛠️ Browser Compatibility

Works perfectly in:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This is a personal project made with love. Feel free to use it as inspiration for your own romantic gesture! ❤️

---

**Made with 💖 for Titir**

*"This isn't just a website. It's my feelings, written in code."*
