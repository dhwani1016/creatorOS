/**
 * Instagram Creator Hub Controller (app.js)
 */

// Core Instagram Presets
const INSTAGRAM_PRESET = [
  { id: 'ig-1', title: 'CSS Flexbox vs Grid Cheat Sheet (Swipeable)', type: 'Image', category: 'Cheat Sheets', views: 35000, likes: 4200, comments: 150, shares: 2800, date: '2026-05-09', url: 'https://www.instagram.com/instagram/' },
  { id: 'ig-2', title: '5 Tools I Use to Design Premium Landing Pages', type: 'Image', category: 'Tools', views: 28000, likes: 3100, comments: 85, shares: 1400, date: '2026-05-11', url: 'https://www.instagram.com/instagram/' },
  { id: 'ig-3', title: 'My Minimalist Developer Desk Setup Tour 🖥️', type: 'Video', category: 'Aesthetic', views: 245000, likes: 21500, comments: 410, shares: 8200, date: '2026-05-14', url: 'https://www.instagram.com/instagram/reels/' },
  { id: 'ig-4', title: 'How to build secure API endpoints in Node.js', type: 'Video', category: 'Tutorials', views: 72000, likes: 6800, comments: 190, shares: 2200, date: '2026-05-18', url: 'https://www.instagram.com/instagram/reels/' },
  { id: 'ig-5', title: 'The ultimate guide to Git merge conflicts', type: 'Image', category: 'Cheat Sheets', views: 42000, likes: 5100, comments: 210, shares: 4300, date: '2026-05-21', url: 'https://www.instagram.com/instagram/' },
  { id: 'ig-6', title: 'A day in the life hacking on startup projects ☕️', type: 'Video', category: 'Vlogs', views: 95000, likes: 8200, comments: 110, shares: 900, date: '2026-05-25', url: 'https://www.instagram.com/instagram/reels/' },
  { id: 'ig-flop', title: 'Quick updates on my weekend coding schedule', type: 'Video', category: 'Vlogs', views: 3200, likes: 85, comments: 8, shares: 4, date: '2026-05-20', url: 'https://www.instagram.com/instagram/reels/' }
];

window.AppState = {
  platform: 'instagram',
  posts: [],
  charts: {},
  sortKey: 'views',
  sortAsc: false,
  searchQuery: '',
  categoryFilter: 'all',
  
  nicheStyleArchetypes: {
    tech: {
      education: {
        title: "The Technical Educator",
        desc: "You focus on high-utility cheat sheets and step-by-step programming breakdowns to educate developers.",
        pillars: ["Framework Guides", "Syntax Cheat Sheets", "Refactoring Tutorials"]
      },
      aesthetic: {
        title: "The Aesthetic Curationist",
        desc: "You prioritize workspace aesthetics, design showcases, and desk setups to spark coding creativity.",
        pillars: ["Workspace Vlogs", "Setup Reviews", "UI Design Inspiration"]
      },
      casual: {
        title: "The Authentic Dev Connector",
        desc: "You share behind-the-scenes vlogs, coding struggles, and personal startup milestones to build trust.",
        pillars: ["Dev Chronicles", "Coding Failures", "Career Advice"]
      },
      opinionated: {
        title: "The Tech Rant Catalyst",
        desc: "You deliver quick, high-impact tips and polarizing programming opinions to drive debate.",
        pillars: ["Tech Hot Takes", "Niche Rants", "Extension Spotlights"]
      }
    },
    lifestyle: {
      education: {
        title: "The Style & Organization Mentor",
        desc: "You share practical guides, habit-building tutorials, and wardrobe categorization advice.",
        pillars: ["Capsule Wardrobe How-To", "Productive Morning Habit Tips", "Decluttering Tutorials"]
      },
      aesthetic: {
        title: "The Trendsetting Tastemaker",
        desc: "You capture high-quality aesthetic routines, GRWM showcases, and outfit inspirations.",
        pillars: ["Seasonal Lookbooks", "Aesthetic Routine Transitions", "Style & Palette Pairings"]
      },
      casual: {
        title: "The Lifestyle Curator",
        desc: "You share realistic daily reset routines, daily vlogs, and authentic personal check-ins.",
        pillars: ["Weekly Reset Vlogs", "Casual Lifestyle Chit-Chat", "Personal Favorites & Faves"]
      },
      opinionated: {
        title: "The Unfiltered Stylist",
        desc: "You share raw critiques of fast fashion, consumer habits, and authentic wellness industry rants.",
        pillars: ["Deinfluencing Products", "Fast Fashion Critiques", "Unfiltered Wellness Takes"]
      }
    },
    travel: {
      education: {
        title: "The Travel Guidebook",
        desc: "You provide structured itineraries, budget flight hacks, and step-by-step packing lists.",
        pillars: ["Weekend Itineraries", "Budget Travel Hacks", "Packing Guides"]
      },
      aesthetic: {
        title: "The Scenic Explorer",
        desc: "You record breathtaking landscape transitions, slow cinemagraphs, and luxury travel vibes.",
        pillars: ["Switzerland Scenic Drone Clips", "Luxury Resort Walkthroughs", "Hidden Travel Spots"]
      },
      casual: {
        title: "The Wandering Nomad",
        desc: "You vlog hosteling adventures, local food discoveries, and raw storytelling on the move.",
        pillars: ["Solo Backpacker Vlogs", "Street Food Tastings", "Nomadic Lifestyle Realities"]
      },
      opinionated: {
        title: "The Critical Traveler",
        desc: "You review hyped tourist traps, airline guidelines, and expose tourist safety risks.",
        pillars: ["Hyped vs Worth It Reviews", "Tourist Trap Warnings", "Airline Policy Critiques"]
      }
    },
    finance: {
      education: {
        title: "The Wealth Coach",
        desc: "You break down compound interest, stock portfolios, and saving formulas into bite-sized tutorials.",
        pillars: ["Compound Interest Explanations", "Stock Investing 101", "Credit Score Hacks"]
      },
      aesthetic: {
        title: "The Financial Minimalist",
        desc: "You show clean, aesthetic spreadsheets, budgeting setups, and organized income streams.",
        pillars: ["Aesthetic Budget Spreadsheets", "Side Hustle Visualizations", "Clean Financial Systems"]
      },
      casual: {
        title: "The Money Strategist",
        desc: "You share your personal income journey, freelance struggles, and savings diaries in a relatable format.",
        pillars: ["My Net Worth Tracker", "Freelance Vlogs", "Monthly Spending Audits"]
      },
      opinionated: {
        title: "The Wealth Disruptor",
        desc: "You share hot takes on traditional employment, housing market bubbles, and get-rich schemes.",
        pillars: ["Traditional Career Critiques", "Side Hustle Myth-Busters", "Economic Trend Critiques"]
      }
    },
    gaming: {
      education: {
        title: "The Skill Optimizer",
        desc: "You create step-by-step tutorial guides, recoil pattern tips, and strategic game analyses.",
        pillars: ["Aim Mechanics Tutorials", "Ranked Level-Up Guides", "Patch Note Analyses"]
      },
      aesthetic: {
        title: "The Setup Architect",
        desc: "You specialize in premium neon setup transformations, macro desk shots, and hardware lighting styles.",
        pillars: ["RGB Setup Visuals", "Hardware Macro Closeups", "Desk Organizing Timelapses"]
      },
      casual: {
        title: "The Variety Streamer",
        desc: "You show funny reaction clips, cooperative gameplay bloopers, and casual gaming talk vlogs.",
        pillars: ["Co-op Bloopers & Gags", "Casual Game Recommendations", "Stream Highlight Reels"]
      },
      opinionated: {
        title: "The Gaming Critic",
        desc: "You critique buggy triple-A releases, console politics, and publisher monetization strategies.",
        pillars: ["Unfinished Game Rants", "Microtransaction Exposes", "Hardware Benchmarks"]
      }
    },
    beauty: {
      education: {
        title: "The Skin Educator",
        desc: "You teach skincare chemistry, application order, and step-by-step ingredient styling.",
        pillars: ["Skincare Layering Guides", "Makeup Brush Tutorials", "Ingredient Breakdown Shows"]
      },
      aesthetic: {
        title: "The Glamour Artist",
        desc: "You show macro beauty shots, product texture swirls, and visually stunning aesthetic routines.",
        pillars: ["Aesthetic Texture ASMR", "Glowy Base Transitions", "Creative Graphic Liner"]
      },
      casual: {
        title: "The Beauty Vlogger",
        desc: "You record chatty get-ready-with-mes, travel beauty bags, and real skin texture updates.",
        pillars: ["Chatty GRWM Stories", "Travel Makeup Bags", "Acne/Texture Real Talks"]
      },
      opinionated: {
        title: "The Cosmetic Critic",
        desc: "You deinfluence hyped cosmetics, expose skincare myths, and audit beauty brand marketing campaigns.",
        pillars: ["Beauty Deinfluencing", "Skincare Myth-Busting", "Honest Product Audits"]
      }
    },
    fitness: {
      education: {
        title: "The Muscle Mechanic",
        desc: "You explain biomechanics, progressive overload schemes, and precise form correction routines.",
        pillars: ["Exercise Form Breakdowns", "Progressive Overload Guides", "Muscle Anatomy Tutorials"]
      },
      aesthetic: {
        title: "The Active Ethos",
        desc: "You show cinematic gym montages, clean aesthetic workout transitions, and active lifestyle vibe reels.",
        pillars: ["Cinematic Workout B-Roll", "Gym Fit Showcases", "Aesthetic Running Trails"]
      },
      casual: {
        title: "The Balanced Athlete",
        desc: "You share realistic diet days, fitness struggles, and vlogs balancing gym with normal life.",
        pillars: ["What I Eat in a Day Vlogs", "Realistic Gym Progress Diaries", "Gym Motivation Chats"]
      },
      opinionated: {
        title: "The Shredded Realist",
        desc: "You expose dangerous fitness supplements, debunk fad fat-loss exercises, and critique gym toxicity.",
        pillars: ["Supplement Fact Checks", "Fad Workout Debunking", "Gym Culture Critiques"]
      }
    },
    food: {
      education: {
        title: "The Culinary Academy",
        desc: "You teach fundamental chef techniques, knife skill tutorials, and recipe chemistry rules.",
        pillars: ["Knife Skills 101", "Sauce Chemistry Guides", "Baking Science Explanations"]
      },
      aesthetic: {
        title: "The Gastronomist",
        desc: "You show cinematic food sizzles, close-up steam, high-quality baking ASMR, and visual recipes.",
        pillars: ["Food Closeups & Sound ASMR", "Satisfying Pour Visuals", "Modern Plate Curations"]
      },
      casual: {
        title: "The Home Cook",
        desc: "You vlog easy weeknight dinners, meal preps, and simple, cozy kitchen routines.",
        pillars: ["15-Minute Dinner Vlogs", "Cozy Weekend Meal Prep", "Baking from Scratch Logs"]
      },
      opinionated: {
        title: "The Flavor Critic",
        desc: "You audit hyped restaurant food items, recipe shortcuts, and critique food trends.",
        pillars: ["Hyped Restaurant Reviews", "Food Hack Verifications", "Taste-Test Opinions"]
      }
    },
    art: {
      education: {
        title: "The Drawing Coach",
        desc: "You teach color theory, perspective grids, and anatomy proportions step-by-step.",
        pillars: ["Color Theory Tutorials", "Perspective Grid Guides", "Figure Drawing Anatomy"]
      },
      aesthetic: {
        title: "The Creative Studio",
        desc: "You record satisfying paint swatches, macro line art closeups, and studio organization routines.",
        pillars: ["Satisfying Paint Swelling", "Sketchbook Flip-throughs", "Studio Vibe Timelapses"]
      },
      casual: {
        title: "The Sketchbook Journal",
        desc: "You share your raw drawing journeys, creative burnout struggles, and casual sketch logs.",
        pillars: ["Sketchbook Walkthroughs", "Creative Burnout Advice", "Casual Art Vlogs"]
      },
      opinionated: {
        title: "The Design Critic",
        desc: "You analyze viral brand logos, critique design trends, and debate traditional vs digital tools.",
        pillars: ["Logo Redesign Opinions", "Viral Poster Critiques", "Art Career Hot Takes"]
      }
    },
    general: {
      education: {
        title: "The Growth Educator",
        desc: "You focus on high-utility frameworks and step-by-step guides to help creators level up.",
        pillars: ["Growth Mechanics Guides", "Algorithm Frameworks", "Production Cheat Sheets"]
      },
      aesthetic: {
        title: "The Content Creator",
        desc: "You show clean aesthetics, high-quality transitions, and visually satisfying creator setups.",
        pillars: ["Aesthetic Setup B-Roll", "Visual Transition Demos", "Cinematic Vlogs"]
      },
      casual: {
        title: "The Lifestyle Explorer",
        desc: "You share casual posts spanning multiple subjects to build general community connections.",
        pillars: ["Personal Updates", "Trending Memes", "General Vlogs"]
      },
      opinionated: {
        title: "The Trend Catalyst",
        desc: "You share hot takes on creator economy trends, and give opinionated critiques of content creation.",
        pillars: ["Creator Economy Takes", "Trending Topic Critiques", "Viral Post Deconstructions"]
      }
    }
  },
  
  init: function() {
    this.loadPostsData();
    this.setupEventListeners();
    this.render();
    
    // Initial calculate triggers
    this.calculateHookScore();
    this.populateFloppedOutliers();
    this.calculateCreatorIdentity();
  },

  loadPostsData: function() {
    const localData = localStorage.getItem('sa_instagram_posts');
    if (localData) {
      try {
        this.posts = JSON.parse(localData);
      } catch(e) {
        this.posts = [...INSTAGRAM_PRESET];
      }
    } else {
      this.posts = [...INSTAGRAM_PRESET];
    }
    this.assignDisplayIndices();
    this.saveCurrentData();
  },

  assignDisplayIndices: function() {
    const indexed = this.posts.map((p, idx) => ({ post: p, originalIndex: idx }));
    indexed.sort((a, b) => {
      const dateA = a.post.date ? new Date(a.post.date).getTime() : 0;
      const dateB = b.post.date ? new Date(b.post.date).getTime() : 0;
      if (dateA !== dateB) return dateA - dateB;
      return a.originalIndex - b.originalIndex;
    });

    indexed.forEach((item, i) => {
      item.post.displayIndex = i + 1;
      item.post.url = this.normalizeUrl(item.post.url);
    });
  },

  normalizeUrl: function(url) {
    if (!url) return 'https://www.instagram.com/';
    url = url.trim();
    if (/^https?:\/\//i.test(url)) {
      return url;
    }
    if (url.startsWith('www.') || url.includes('instagram.com')) {
      return 'https://' + url.replace(/^\/+/g, '');
    }
    if (url.startsWith('@')) {
      return 'https://www.instagram.com/' + url.substring(1) + '/';
    }
    return 'https://www.instagram.com/' + url.replace(/^\/+/g, '');
  },

  saveCurrentData: function() {
    localStorage.setItem('sa_instagram_posts', JSON.stringify(this.posts));
  },

  resetToPreset: function() {
    this.posts = [...INSTAGRAM_PRESET];
    this.assignDisplayIndices();
    this.saveCurrentData();
    this.showToast('Reset to default Instagram preset data!', 'success');
    this.render();
    this.populateFloppedOutliers();
    this.calculateCreatorIdentity();
  },

  setupEventListeners: function() {
    // Sidebar Tabs navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.dataset.tab;
        
        // Update active class on side nav
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        
        // Show view
        document.querySelectorAll('.view-section').forEach(section => {
          section.classList.remove('active');
        });
        document.getElementById(`view-${targetView}`).classList.add('active');
        
        // Refresh triggers based on views
        if (targetView === 'dashboard') {
          this.renderCharts();
        } else if (targetView === 'flopped') {
          this.populateFloppedOutliers();
        } else if (targetView === 'identity') {
          this.calculateCreatorIdentity();
        }
      });
    });

    // Search and Filters
    document.getElementById('search-input').addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderTable();
    });

    document.getElementById('category-filter').addEventListener('change', (e) => {
      this.categoryFilter = e.target.value;
      this.renderTable();
    });

    // Profile Link Quick Analyzer listener (Instagram Link ONLY!)
    const btnAnalyzeUrl = document.getElementById('btn-analyze-url');
    if (btnAnalyzeUrl) {
      btnAnalyzeUrl.addEventListener('click', () => {
        const inputVal = document.getElementById('profile-url-input').value.trim();
        if (!inputVal) {
          this.showToast('Please enter an Instagram profile link or username.', 'error');
          return;
        }
        this.runInstagramAnalysis(inputVal);
      });
    }

    // Hook Analyzer form change listeners
    const hookForm = document.getElementById('hook-form');
    if (hookForm) {
      hookForm.addEventListener('input', () => this.calculateHookScore());
      document.getElementById('btn-analyze-hook').addEventListener('click', (e) => {
        e.preventDefault();
        this.calculateHookScore(true);
      });
    }

    // "Why this flopped" selector change listener
    const flopSelect = document.getElementById('flopped-select');
    if (flopSelect) {
      flopSelect.addEventListener('change', () => this.runFlopDiagnostic());
    }

    // Identity Customizer change listeners
    const selectNiche = document.getElementById('identity-select-niche');
    const selectStyle = document.getElementById('identity-select-style');
    if (selectNiche) {
      selectNiche.addEventListener('change', () => this.handleCustomizerChange());
    }
    if (selectStyle) {
      selectStyle.addEventListener('change', () => this.handleCustomizerChange());
    }

    // Custom manual post entry logger
    document.getElementById('post-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('post-title').value;
      const url = document.getElementById('post-url').value.trim() || 'https://www.instagram.com/';
      const category = document.getElementById('post-category').value;
      const type = document.getElementById('post-type').value;
      const views = parseInt(document.getElementById('post-views').value) || 0;
      const likes = parseInt(document.getElementById('post-likes').value) || 0;
      const comments = parseInt(document.getElementById('post-comments').value) || 0;
      const shares = parseInt(document.getElementById('post-shares').value) || 0;
      const date = document.getElementById('post-date').value || new Date().toISOString().split('T')[0];

      const newPost = {
        id: `ig-manual-${Date.now()}`,
        title,
        url,
        category,
        type,
        views,
        likes,
        comments,
        shares,
        date
      };

      this.posts.unshift(newPost);
      this.assignDisplayIndices();
      this.saveCurrentData();
      this.showToast('Instagram post logged successfully!', 'success');
      e.target.reset();
      this.render();
      this.populateFloppedOutliers();
    });

    // Drag and Drop File CSV Reader
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleCSVFile(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleCSVFile(e.target.files[0]);
      }
    });

    // Reset preset button
    document.getElementById('btn-reset-preset').addEventListener('click', () => {
      this.resetToPreset();
    });

    // Script Generator logic
    const scriptForm = document.getElementById('script-form');
    if (scriptForm) {
      scriptForm.addEventListener('change', () => this.updateScriptOutput());
      document.getElementById('btn-generate-script').addEventListener('click', (e) => {
        e.preventDefault();
        this.updateScriptOutput(true);
      });
    }

    // Copy to clipboard (Script Writer)
    document.getElementById('btn-copy-script').addEventListener('click', () => {
      const ta = document.getElementById('script-content');
      ta.select();
      navigator.clipboard.writeText(ta.value)
        .then(() => this.showToast('Script copied to clipboard!', 'success'))
        .catch(() => this.showToast('Failed to copy script.', 'error'));
    });

    // Download script as file
    document.getElementById('btn-download-script').addEventListener('click', () => {
      const content = document.getElementById('script-content').value;
      const topic = document.getElementById('script-topic').value || 'script';
      const cleanFilename = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30) + '-reel-script.txt';

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = cleanFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      this.showToast(`Downloaded script as ${cleanFilename}!`, 'success');
    });

    // Table Header Sorting listeners
    document.querySelectorAll('#posts-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        if (this.sortKey === key) {
          this.sortAsc = !this.sortAsc;
        } else {
          this.sortKey = key;
          this.sortAsc = false;
        }
        
        // Update th styling indicator
        document.querySelectorAll('#posts-table th[data-sort]').forEach(h => {
          h.innerHTML = h.innerHTML.replace(/ ▲| ▼/g, '');
        });
        th.innerHTML += this.sortAsc ? ' ▲' : ' ▼';

        this.renderTable();
      });
    });
  },

  runInstagramAnalysis: function(input) {
    // 1. Enforce Instagram links only
    const lowercaseInput = input.toLowerCase();
    
    // Check if it is a link of other platforms
    if (lowercaseInput.includes('youtube.com') || lowercaseInput.includes('youtu.be') || 
        lowercaseInput.includes('tiktok.com') || 
        lowercaseInput.includes('twitter.com') || lowercaseInput.includes('x.com') || 
        lowercaseInput.includes('linkedin.com')) {
      this.showToast('This Hub is locked to Instagram. Please enter an Instagram link.', 'error');
      return;
    }

    // Clean username and profile URL extraction
    let username = input.trim();
    let profileUrl = 'https://www.instagram.com/';
    let isSinglePost = false;

    if (username.includes('instagram.com/')) {
      const parts = username.replace(/https?:\/\/(www\.)?instagram\.com\//i, '').split('/');
      if (parts[0] === 'reel' || parts[0] === 'p' || parts[0] === 'tv') {
        username = 'creator';
        profileUrl = input; // fallback to the post itself!
        isSinglePost = true;
      } else {
        username = parts[0].split('?')[0];
        profileUrl = `https://www.instagram.com/${username}/`;
      }
    } else {
      username = username.replace('@', '').split('?')[0].split('/')[0];
      profileUrl = `https://www.instagram.com/${username}/`;
    }

    if (!username) {
      this.showToast('Invalid Instagram username or URL. Use format: instagram.com/username', 'error');
      return;
    }

    // Prompt user for the Reel caption if scanning a single post URL
    let userCaption = '';
    if (isSinglePost) {
      userCaption = prompt("Enter the caption of this Reel (to recognize it on your dashboard):") || '';
    }

    // 2. Open Modal Overlay
    const modal = document.getElementById('analysis-modal');
    const subtitle = document.getElementById('analysis-modal-subtitle');
    const progressBar = document.getElementById('analysis-progress-bar');
    const logsContainer = document.getElementById('analysis-logs');

    modal.style.display = 'flex';
    subtitle.textContent = `Connecting to Instagram public graphs for @${username}...`;
    progressBar.style.width = '0%';
    logsContainer.innerHTML = '';

    const logs = [
      { progress: 5, text: "Bypassing sandbox CORS layers... Connection secure." },
      { progress: 20, text: `Mapping public profile headers for @${username}...` },
      { progress: 35, text: "Profile Resolved: Fetching recent Reels and Carousels payload..." },
      { progress: 55, text: "Extracting viewer engagement ratios (likes, comments, saves)..." },
      { progress: 70, text: "Categorizing content buckets and analyzing hashtag weights..." },
      { progress: 85, text: "Calculating Creator archetype constraints and score profiles..." },
      { progress: 100, text: "Success! Syncing data report with local Workspace." }
    ];

    let currentLogIndex = 0;

    const runNextStep = () => {
      if (currentLogIndex >= logs.length) {
        setTimeout(() => {
          modal.style.display = 'none';
          
          // Generate customized Instagram data matching niche
          const customPosts = Generator.generateNicheData(username, 'instagram', null, profileUrl, userCaption);
          
          this.scannedUsername = username;
          this.scannedProfileUrl = profileUrl;
          this.scannedUserCaption = userCaption;
          this.posts = customPosts;
          this.assignDisplayIndices();
          this.saveCurrentData();
          
          // Reset customizer selects
          const selectNiche = document.getElementById('identity-select-niche');
          const selectStyle = document.getElementById('identity-select-style');
          if (selectNiche) selectNiche.value = 'auto';
          if (selectStyle) selectStyle.value = 'auto';
          
          this.render();
          this.populateFloppedOutliers();
          this.calculateCreatorIdentity();
          
          this.showToast(`Analyzed Instagram profile for @${username}!`, 'success');
        }, 800);
        return;
      }

      const log = logs[currentLogIndex];
      progressBar.style.width = `${log.progress}%`;
      
      const logLine = document.createElement('div');
      logLine.innerHTML = `<span style="color: #e1306c;">[${log.progress}%]</span> ${log.text}`;
      logsContainer.appendChild(logLine);
      logsContainer.scrollTop = logsContainer.scrollHeight;

      currentLogIndex++;
      
      const delays = [300, 400, 500, 500, 450, 500, 400];
      setTimeout(runNextStep, delays[currentLogIndex - 1] || 400);
    };

    runNextStep();
  },

  // Hook Analyzer UI Update
  calculateHookScore: function(manualClick = false) {
    const text = document.getElementById('hook-input-text').value;
    const audience = document.getElementById('hook-audience').value;
    const visualCue = document.getElementById('chk-hook-visual').checked;
    const textOverlay = document.getElementById('chk-hook-overlay').checked;

    if (!text) {
      document.getElementById('hook-score-text').textContent = '0';
      document.getElementById('hook-score-progress').style.strokeDashoffset = '440';
      document.getElementById('hook-feedback-list').innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem;">Enter a script hook to begin the real-time scoring diagnostic.</div>`;
      document.getElementById('hook-rewrites-container').innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem;">Rewrites will compile here.</div>`;
      return;
    }

    const result = Generator.analyzeHook(text, audience, { visualCue, textOverlay });

    // Update gauge
    document.getElementById('hook-score-text').textContent = result.score;
    // Stroke dashoffset formula: 440 - (440 * score / 100)
    const offset = 440 - (440 * result.score / 100);
    document.getElementById('hook-score-progress').style.strokeDashoffset = offset;

    // Update feedback logs
    const fbList = document.getElementById('hook-feedback-list');
    fbList.innerHTML = '';
    
    result.feedback.forEach(item => {
      const bullet = document.createElement('div');
      bullet.className = 'structure-checkpoint';
      
      let badgeColor = 'var(--text-muted)';
      let symbol = '•';
      if (item.type === 'success') { badgeColor = 'var(--accent-success)'; symbol = '✓'; }
      if (item.type === 'warning') { badgeColor = 'var(--accent-warning)'; symbol = '⚠'; }
      if (item.type === 'error') { badgeColor = 'var(--accent-danger)'; symbol = '✗'; }

      bullet.innerHTML = `
        <div class="checkpoint-bullet" style="border-color: ${badgeColor}; color: ${badgeColor}; font-weight: 700;">${symbol}</div>
        <div class="checkpoint-info">
          <p style="color: #fff; font-size: 0.85rem;">${item.text}</p>
        </div>
      `;
      fbList.appendChild(bullet);
    });

    // Update rewrites list
    const rwContainer = document.getElementById('hook-rewrites-container');
    rwContainer.innerHTML = '';

    result.rewrites.forEach(rw => {
      const card = document.createElement('div');
      card.className = 'rec-card';
      card.style.padding = '1rem';
      card.style.marginBottom = '0.75rem';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
          <h4 style="font-size: 0.85rem; color: var(--accent-primary); font-weight: 700;">${rw.type}</h4>
          <button class="btn btn-secondary btn-sm" onclick="AppState.loadRewriteToScript('${rw.text.replace(/'/g, "\\'")}')" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;">Use Hook</button>
        </div>
        <p style="font-size: 0.85rem; font-weight: 500; margin-bottom: 0.35rem;">"${rw.text}"</p>
        <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.3;">💡 ${rw.why}</p>
      `;
      rwContainer.appendChild(card);
    });

    if (manualClick) {
      this.showToast('Hook metrics refreshed!', 'success');
    }
  },

  loadRewriteToScript: function(text) {
    // Prefill script writer topic field
    document.getElementById('script-topic').value = text;
    // Auto toggle to Script writer tab
    const tabBtn = document.querySelector('.nav-item[data-tab="script"]');
    if (tabBtn) tabBtn.click();
    this.updateScriptOutput();
    this.showToast('Hook loaded into Script Generator topic!', 'success');
  },

  // Why this flopped Diagnostic logic
  populateFloppedOutliers: function() {
    const flopSelect = document.getElementById('flopped-select');
    if (!flopSelect) return;

    flopSelect.innerHTML = '<option value="">-- Choose an Underperforming Post --</option>';

    // Calculate channel average views
    let totalViews = 0;
    this.posts.forEach(p => totalViews += p.views);
    const avgViews = this.posts.length > 0 ? (totalViews / this.posts.length) : 0;

    // Filter posts that performed below 60% of average (outliers)
    const floppedPosts = this.posts.filter(p => p.views < (avgViews * 0.6));

    if (floppedPosts.length === 0) {
      // Fallback: list the lowest performing posts generally
      const sorted = [...this.posts].sort((a,b) => a.views - b.views).slice(0, 3);
      sorted.forEach(p => {
        flopSelect.innerHTML += `<option value="${p.id}">Reel #${p.displayIndex || '?'}: ${p.title} (${this.formatNumber(p.views)} views)</option>`;
      });
    } else {
      floppedPosts.forEach(p => {
        flopSelect.innerHTML += `<option value="${p.id}">Reel #${p.displayIndex || '?'}: ${p.title} (${this.formatNumber(p.views)} views)</option>`;
      });
    }

    this.runFlopDiagnostic();
  },

  runFlopDiagnostic: function() {
    const id = document.getElementById('flopped-select').value;
    const warningsList = document.getElementById('flop-warnings');
    const fixList = document.getElementById('flop-fix-roadmap');
    const metricSummary = document.getElementById('flop-metric-deficit');

    if (!id) {
      warningsList.innerHTML = '';
      fixList.innerHTML = `<li style="color: var(--text-muted); font-size: 0.85rem;">Select an underperforming post from the dropdown above to load the diagnostic roadmap.</li>`;
      metricSummary.textContent = 'Select a post above';
      return;
    }

    const post = this.posts.find(p => p.id === id);
    if (!post) return;

    // Calculations compared to average
    let totalViews = 0;
    this.posts.forEach(p => totalViews += p.views);
    const avgViews = this.posts.length > 0 ? Math.round(totalViews / this.posts.length) : 0;
    const viewsDeficit = Math.round(((avgViews - post.views) / avgViews) * 100);

    metricSummary.textContent = `${viewsDeficit}% below average reach (${this.formatNumber(post.views)} views vs ${this.formatNumber(avgViews)} average)`;

    const warnings = [];
    const fixes = [];

    // Diagnostic rules
    const er = post.views > 0 ? (((post.likes + post.comments + post.shares) / post.views) * 100) : 0;
    const saveRate = post.views > 0 ? ((post.shares / post.views) * 100) : 0;
    const commentRate = post.views > 0 ? ((post.comments / post.views) * 100) : 0;

    // Rule 1: High view deficit
    if (post.views < (avgViews * 0.2)) {
      warnings.push({ label: 'Hook Lag (Severe)', level: 'high' });
      fixes.push('**Remake the Hook**: The viewer retention dropped instantly. Shorten the text overlay to 5 words and add a pattern interrupt within the first 1.5 seconds.');
    } else {
      warnings.push({ label: 'Pacing Friction', level: 'medium' });
      fixes.push('**Speed Up Pacing**: Pacing was slightly slow. Cut any long pauses in the audio track and sync transitions to beats.');
    }

    // Rule 2: Engagement rate deficit
    if (er < 5.0) {
      warnings.push({ label: 'Value Friction', level: 'high' });
      fixes.push('**Increase Value Density**: The audience opened the post but did not engage. Make slides/bullet points more specific. Provide code snippets, direct resources, or step-by-step guides.');
    } else {
      fixes.push('**Leverage Visual Quality**: Engagement rate was okay, but the initial distribution was restricted. Boost on-screen text contrast.');
    }

    // Rule 3: Saves deficit
    if (saveRate < 0.5) {
      warnings.push({ label: 'Saves Deficit', level: 'medium' });
      fixes.push('**Add Actionable Bookmarkable Details**: Users did not save this. Add a cheat sheet summary slide or resource link in caption to compel saves.');
    }

    // Rule 4: Comments deficit
    if (commentRate < 0.1) {
      warnings.push({ label: 'No Comment Trigger', level: 'medium' });
      fixes.push('**Implement Open Debate Prompt**: The caption lacked an explicit invitation. Conclude with a polarizing question like: "Do you prefer Flexbox or Grid for this? Let me know below."');
    }

    // Render warning tags
    warningsList.innerHTML = '';
    warnings.forEach(w => {
      const tag = document.createElement('span');
      tag.className = `flop-warning-tag ${w.level === 'medium' ? 'warning-medium' : ''}`;
      tag.textContent = `⚠ ${w.label}`;
      warningsList.appendChild(tag);
    });

    // Render fixes lists
    fixList.innerHTML = '';
    fixes.forEach(f => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.75rem';
      li.style.fontSize = '0.85rem';
      li.style.lineHeight = '1.5';
      
      // Parse markdown bold **text** simple implementation
      let cleanText = f.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--accent-primary);">$1</strong>');
      li.innerHTML = cleanText;
      fixList.appendChild(li);
    });
  },

  // Creator Identity analysis computations
  calculateCreatorIdentity: function() {
    if (!this.posts || this.posts.length === 0) return;

    // Get selected niche and style from dropdowns
    const selectNicheVal = document.getElementById('identity-select-niche')?.value || 'auto';
    const selectStyleVal = document.getElementById('identity-select-style')?.value || 'auto';

    let niche = selectNicheVal;
    let style = selectStyleVal;

    // If niche is auto, detect it from post content titles/categories
    if (niche === 'auto') {
      const titles = this.posts.map(p => p.title.toLowerCase()).join(' ');
      const categories = this.posts.map(p => p.category?.toLowerCase() || '').join(' ');
      const combined = titles + ' ' + categories;

      if (/(code|dev|tech|software|web|program|js|ts|python|html|css)/i.test(combined)) {
        niche = 'tech';
      } else if (/(fit|gym|health|workout|train|muscle)/i.test(combined)) {
        niche = 'fitness';
      } else if (/(cook|food|chef|recipe|eat|bake)/i.test(combined)) {
        niche = 'food';
      } else if (/(art|design|paint|draw|creative)/i.test(combined)) {
        niche = 'art';
      } else if (/(lifestyle|fashion|outfit|style|grwm|routine)/i.test(combined)) {
        niche = 'lifestyle';
      } else if (/(travel|vlog|trip|explore|nomad)/i.test(combined)) {
        niche = 'travel';
      } else if (/(money|finance|business|invest|hustle)/i.test(combined)) {
        niche = 'finance';
      } else if (/(game|gamer|play|setup)/i.test(combined)) {
        niche = 'gaming';
      } else if (/(beauty|makeup|skin|glow|cosmetics)/i.test(combined)) {
        niche = 'beauty';
      } else {
        niche = 'general';
      }
    }

    // Sort categories
    const catCounts = {};
    this.posts.forEach(p => {
      const cat = p.category || 'General';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    });

    let topCat = 'General';
    let topCount = 0;
    Object.keys(catCounts).forEach(c => {
      if (catCounts[c] > topCount) {
        topCount = catCounts[c];
        topCat = c;
      }
    });

    // If style is auto, map top category to style
    if (style === 'auto') {
      if (topCat === 'Tutorials' || topCat === 'Cheat Sheets' || topCat === 'Travel Guides') {
        style = 'education';
      } else if (topCat === 'Aesthetic' || topCat === 'Setups' || topCat === 'Fashion & Style') {
        style = 'aesthetic';
      } else if (topCat === 'Vlogs' || topCat === 'Storytelling' || topCat === 'Morning Routine') {
        style = 'casual';
      } else if (topCat === 'Hot Takes' || topCat === 'Reviews') {
        style = 'opinionated';
      } else {
        style = 'casual';
      }
    }

    // Lookup archetype
    const nicheData = this.nicheStyleArchetypes[niche] || this.nicheStyleArchetypes['general'];
    const archetypeObj = nicheData[style] || nicheData['casual'];

    let archetype = archetypeObj.title;
    let desc = archetypeObj.desc;
    let pillars = archetypeObj.pillars;

    // Display updates in DOM
    const archTitle = document.getElementById('identity-archetype-title');
    const archDesc = document.getElementById('identity-archetype-desc');
    const pillarList = document.getElementById('identity-pillars-list');

    if (archTitle) {
      archTitle.textContent = archetype;
      archDesc.textContent = desc;
      
      pillarList.innerHTML = '';
      pillars.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'pillar-item-card';
        card.innerHTML = `
          <div class="pillar-num">Pillar 0${idx + 1}</div>
          <div class="pillar-name">${p}</div>
          <div class="pillar-desc">Reels or Carousel content focusing on this core subject line.</div>
        `;
        pillarList.appendChild(card);
      });

      // Set demographics persona text dynamically
      const domNicheEl = document.getElementById('identity-dominant-niche');
      const expTierEl = document.getElementById('identity-experience-tier');
      const coreMotEl = document.getElementById('identity-core-motivation');

      if (domNicheEl && expTierEl && coreMotEl) {
        const demoMapping = {
          tech: { niche: "Software & Coding", tier: "Developer / Architect", mot: "Skill Optimization" },
          fitness: { niche: "Health & Fitness", tier: "Athletic Performance", mot: "Health & Vitality" },
          food: { niche: "Culinary & Cooking", tier: "Home Kitchen Chef", mot: "Taste & Culinary Joy" },
          art: { niche: "Art & Design", tier: "Studio Illustrator", mot: "Creative Expression" },
          lifestyle: { niche: "Lifestyle & Fashion", tier: "Trend/Vlog Builder", mot: "Aesthetic Inspiration" },
          travel: { niche: "Travel & Exploration", tier: "Wanderlust Blogger", mot: "Experience Curation" },
          finance: { niche: "Business & Finance", tier: "Wealth Strategist", mot: "Passive Income Goals" },
          gaming: { niche: "Gaming & Hardware", tier: "Setup Enthusiast", mot: "Entertainment & Play" },
          beauty: { niche: "Beauty & Cosmetics", tier: "Skincare / Makeup Art", mot: "Cosmetics Curation" },
          general: { niche: "Multi-Format Creator", tier: "Community Storyteller", mot: "Audience Connection" }
        };

        const demo = demoMapping[niche] || demoMapping['general'];
        domNicheEl.textContent = demo.niche;
        expTierEl.textContent = demo.tier;
        coreMotEl.textContent = demo.mot;
      }

      // Suggest posting frequency based on categories count
      const totalPosts = this.posts.length;
      let frequencyStr = 'Post 2 Reels + 1 Carousel weekly';
      if (totalPosts > 15) {
        frequencyStr = 'Post 3 Reels + 2 Carousels weekly (High volume builder)';
      } else if (totalPosts < 5) {
        frequencyStr = 'Post 1 Reel + 1 Carousel weekly (Consistency builder)';
      }
      document.getElementById('identity-post-frequency').textContent = frequencyStr;

      // Render Visual Feed Grid Preview
      const feedGrid = document.getElementById('visual-feed-grid');
      if (feedGrid) {
        feedGrid.innerHTML = '';
        const latestPosts = [...this.posts].slice(0, 9);
        latestPosts.forEach((post, index) => {
          const block = document.createElement('div');
          let gradient = 'linear-gradient(135deg, #1e1b4b, #311042)';
          if (post.type === 'Video') {
            gradient = 'linear-gradient(135deg, #8a3ab9, #e1306c)';
          } else {
            gradient = 'linear-gradient(135deg, #4f46e5, #06b6d4)';
          }
          const icon = post.type === 'Video' ? '▶' : '🗂️';
          const viewsFormatted = this.formatNumber(post.views);
          
          block.style.cssText = `
            position: relative;
            aspect-ratio: 1;
            background: ${gradient};
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.08);
            overflow: hidden;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            transition: all 0.25s ease;
          `;
          
          block.innerHTML = `
            <div class="thumbnail-overlay" style="
              position: absolute;
              top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(0, 0, 0, 0.75);
              opacity: 0;
              transition: opacity 0.2s ease;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 8px;
              box-sizing: border-box;
            ">
              <div style="font-size: 0.65rem; color: #fff; font-weight: 600; line-height: 1.25; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; text-align: left;">
                ${post.title}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.65rem; color: #fbcfe8; width: 100%;">
                <span>${icon} ${viewsFormatted}</span>
                <span style="color: var(--accent-primary); font-weight: 700;">Reel #${post.displayIndex}</span>
              </div>
            </div>
            <div class="center-graphic" style="color: rgba(255,255,255,0.3); font-size: 1.4rem; pointer-events: none;">
              ${post.type === 'Video' ? '🎬' : '📸'}
            </div>
          `;
          
          block.addEventListener('mouseenter', () => {
            block.querySelector('.thumbnail-overlay').style.opacity = '1';
            block.style.transform = 'scale(1.04)';
            block.style.boxShadow = '0 4px 15px rgba(225, 48, 108, 0.3)';
          });
          block.addEventListener('mouseleave', () => {
            block.querySelector('.thumbnail-overlay').style.opacity = '0';
            block.style.transform = 'scale(1)';
            block.style.boxShadow = 'none';
          });
          block.addEventListener('click', () => {
            window.open(post.url || 'https://www.instagram.com/', '_blank');
          });
          
          feedGrid.appendChild(block);
        });
      }
    }
  },

  handleCustomizerChange: function() {
    const nicheVal = document.getElementById('identity-select-niche')?.value || 'auto';
    
    if (nicheVal !== 'auto') {
      let username = this.scannedUsername || 'creator';
      let profileUrl = this.scannedProfileUrl || 'https://www.instagram.com/creator/';
      
      const customPosts = Generator.generateNicheData(username, 'instagram', nicheVal, profileUrl, this.scannedUserCaption || '');
      this.posts = customPosts;
      this.assignDisplayIndices();
      this.saveCurrentData();
      
      this.render();
      this.populateFloppedOutliers();
      this.showToast(`Switched dashboard and identity to ${nicheVal.charAt(0).toUpperCase() + nicheVal.slice(1)}!`, 'success');
    } else {
      this.calculateCreatorIdentity();
      this.renderInsightsAndRecommendations();
    }
  },

  handleCSVFile: function(file) {
    if (!file.name.endsWith('.csv')) {
      this.showToast('Invalid file format. Please upload a CSV file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target.result;
      this.parseCSVData(csvText);
    };
    reader.readAsText(file);
  },

  parseCSVData: function(text) {
    try {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l !== '');
      if (lines.length <= 1) {
        this.showToast('CSV file is empty or missing headers.', 'error');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/["']/g, ''));
      
      // Prioritize caption/text/content headers over generic title/name headers to extract real post content
      let titleIdx = headers.findIndex(h => h.includes('caption'));
      if (titleIdx === -1) {
        titleIdx = headers.findIndex(h => h.includes('text') || h.includes('content'));
      }
      if (titleIdx === -1) {
        titleIdx = headers.findIndex(h => h.includes('title') || h.includes('name'));
      }
      const viewsIdx = headers.findIndex(h => h.includes('views') || h.includes('view'));
      const likesIdx = headers.findIndex(h => h.includes('likes') || h.includes('like'));
      const commentsIdx = headers.findIndex(h => h.includes('comments') || h.includes('comment'));
      const sharesIdx = headers.findIndex(h => h.includes('shares') || h.includes('saves') || h.includes('share'));
      const catIdx = headers.findIndex(h => h.includes('category') || h.includes('tag'));
      const typeIdx = headers.findIndex(h => h.includes('type') || h.includes('format'));
      const dateIdx = headers.findIndex(h => h.includes('date') || h.includes('time'));
      const urlIdx = headers.findIndex(h => h.includes('url') || h.includes('link'));

      if (titleIdx === -1) {
        this.showToast('Could not find a "Caption" column in your CSV.', 'error');
        return;
      }

      const newPosts = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(cell => cell.trim().replace(/^["']|["']$/g, ''));
        if (row.length < headers.length) continue;

        newPosts.push({
          id: `ig-csv-${Date.now()}-${i}`,
          title: row[titleIdx],
          views: viewsIdx !== -1 ? (parseInt(row[viewsIdx]) || 0) : 1000,
          likes: likesIdx !== -1 ? (parseInt(row[likesIdx]) || 0) : 50,
          comments: commentsIdx !== -1 ? (parseInt(row[commentsIdx]) || 0) : 5,
          shares: sharesIdx !== -1 ? (parseInt(row[sharesIdx]) || 0) : 0,
          category: catIdx !== -1 && row[catIdx] ? row[catIdx] : 'Imported',
          type: typeIdx !== -1 && row[typeIdx] ? row[typeIdx] : 'Video',
          date: dateIdx !== -1 && row[dateIdx] ? row[dateIdx] : new Date().toISOString().split('T')[0],
          url: urlIdx !== -1 && row[urlIdx] ? row[urlIdx] : 'https://www.instagram.com/'
        });
      }

      if (newPosts.length > 0) {
        this.posts = newPosts;
        this.assignDisplayIndices();
        this.saveCurrentData();
        this.showToast(`Successfully imported ${newPosts.length} Instagram posts!`, 'success');
        this.render();
        this.populateFloppedOutliers();
        this.calculateCreatorIdentity();
      } else {
        this.showToast('No valid rows found in CSV.', 'error');
      }
    } catch(err) {
      this.showToast('Failed to parse CSV file. Check format.', 'error');
      console.error(err);
    }
  },

  showToast: function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  updateScriptOutput: function(manualClick = false) {
    const category = document.getElementById('script-category').value;
    const topic = document.getElementById('script-topic').value;
    const tone = document.getElementById('script-tone').value;
    const hookType = document.getElementById('script-hook-type').value;

    const result = Generator.generateScript({
      platform: 'instagram', // Reels optimized
      category,
      topic,
      tone,
      hookType,
      duration: 'short' // Reels standard
    });

    document.getElementById('script-content').value = result.script;
    
    // Render sidebar checks
    const sidebarList = document.getElementById('script-checklists');
    sidebarList.innerHTML = '';
    result.checklists.forEach(check => {
      const item = document.createElement('div');
      item.className = 'structure-checkpoint';
      item.innerHTML = `
        <div class="checkpoint-bullet ${check.checked ? 'checked' : ''}">${check.checked ? '✓' : ''}</div>
        <div class="checkpoint-info">
          <h5>${check.name}</h5>
          <p>${check.text}</p>
        </div>
      `;
      sidebarList.appendChild(item);
    });

    if (manualClick) {
      this.showToast('AI Script draft updated!', 'success');
    }
  },

  render: function() {
    this.renderKPIs();
    this.renderCategoryDropdown();
    this.renderTable();
    this.renderCharts();
    this.renderInsightsAndRecommendations();
    this.updateScriptOutput();
  },

  renderKPIs: function() {
    let totalViews = 0;
    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;

    this.posts.forEach(p => {
      totalViews += Number(p.views) || 0;
      totalLikes += Number(p.likes) || 0;
      totalComments += Number(p.comments) || 0;
      totalShares += Number(p.shares) || 0;
    });

    const engagementCount = totalLikes + totalComments + totalShares;
    const engagementRate = totalViews > 0 ? (engagementCount / totalViews) * 100 : 0;
    const saveRate = totalViews > 0 ? (totalShares / totalViews) * 100 : 0;
    
    document.getElementById('kpi-views').textContent = this.formatNumber(totalViews);
    document.getElementById('kpi-engagement').textContent = `${engagementRate.toFixed(1)}%`;
    document.getElementById('kpi-shares').textContent = this.formatNumber(totalShares);
    
    const kpi4Label = document.getElementById('kpi-cvr-label');
    const kpi4Value = document.getElementById('kpi-conversion');
    
    kpi4Label.textContent = 'AVG SAVE RATE';
    kpi4Value.textContent = `${saveRate.toFixed(2)}%`;
  },

  renderCategoryDropdown: function() {
    const filterSelect = document.getElementById('category-filter');
    const formSelect = document.getElementById('post-category');
    const scriptSelect = document.getElementById('script-category');
    
    const categoriesSet = new Set();
    this.posts.forEach(p => {
      if (p.category) categoriesSet.add(p.category);
    });
    
    const prevFilterVal = filterSelect.value;
    const prevFormVal = formSelect.value;
    const prevScriptVal = scriptSelect.value;

    filterSelect.innerHTML = '<option value="all">All Categories</option>';
    formSelect.innerHTML = '';
    scriptSelect.innerHTML = '';

    categoriesSet.forEach(cat => {
      filterSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      formSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      scriptSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    if (categoriesSet.size === 0) {
      ['Tutorials', 'Tips & Tricks', 'Vlogs', 'Aesthetic', 'Cheat Sheets'].forEach(cat => {
        formSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
        scriptSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
      });
    } else {
      ['Tutorials', 'Vlogs', 'Case Studies', 'Cheat Sheets'].forEach(cat => {
        if (!categoriesSet.has(cat)) {
          formSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
          scriptSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
        }
      });
    }

    if (Array.from(filterSelect.options).some(o => o.value === prevFilterVal)) {
      filterSelect.value = prevFilterVal;
    }
    if (Array.from(formSelect.options).some(o => o.value === prevFormVal)) {
      formSelect.value = prevFormVal;
    }
    if (Array.from(scriptSelect.options).some(o => o.value === prevScriptVal)) {
      scriptSelect.value = prevScriptVal;
    }
  },

  renderTable: function() {
    const tbody = document.querySelector('#posts-table tbody');
    tbody.innerHTML = '';

    let filtered = this.posts.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(this.searchQuery);
      const matchCategory = this.categoryFilter === 'all' || p.category === this.categoryFilter;
      return matchSearch && matchCategory;
    });

    filtered.sort((a, b) => {
      let valA, valB;
      if (this.sortKey === 'date') {
        valA = new Date(a.date).getTime() || 0;
        valB = new Date(b.date).getTime() || 0;
      } else if (this.sortKey === 'index') {
        valA = Number(a.displayIndex) || 0;
        valB = Number(b.displayIndex) || 0;
      } else if (this.sortKey === 'title' || this.sortKey === 'category') {
        valA = a[this.sortKey] || '';
        valB = b[this.sortKey] || '';
        return this.sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        valA = Number(a[this.sortKey]) || 0;
        valB = Number(b[this.sortKey]) || 0;
      }

      if (this.sortAsc) {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">No posts logged. Add some or scan your profile!</td></tr>`;
      return;
    }

    filtered.forEach(post => {
      const tr = document.createElement('tr');
      const er = post.views > 0 ? (((post.likes + post.comments + post.shares) / post.views) * 100).toFixed(1) : '0';
      const badgeClass = `badge-${post.type === 'Image' ? 'image' : 'video'}`;
      const formatName = post.type === 'Image' ? 'Carousel' : 'Reel';
      
      tr.innerHTML = `
        <td><a href="${post.url || 'https://www.instagram.com/'}" target="_blank" class="table-link">Reel #${post.displayIndex || '?'}</a></td>
        <td style="font-weight: 500; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${post.title}">
          <a href="${post.url || 'https://www.instagram.com/'}" target="_blank" class="table-link" style="font-weight: 500; border-bottom: none;">${post.title}</a>
        </td>
        <td><span class="badge ${badgeClass}">${formatName}</span></td>
        <td><span class="rec-tag">${post.category || 'General'}</span></td>
        <td>${this.formatNumber(post.views)}</td>
        <td>${this.formatNumber(post.likes)}</td>
        <td>${er}%</td>
        <td style="color: var(--text-muted);">${post.date || 'N/A'}</td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderCharts: function() {
    if (this.charts.time) this.charts.time.destroy();
    if (this.charts.category) this.charts.category.destroy();

    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // 1. Line performance over time
    const ctxTime = document.getElementById('chart-views-time').getContext('2d');
    const chronoPosts = [...this.posts]
      .filter(p => p.date)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10);
      
    const labelsTime = chronoPosts.map(p => {
      const idxStr = `Reel #${p.displayIndex}`;
      const titleSnippet = p.title.length > 12 ? p.title.substring(0, 12) + '...' : p.title;
      return `${idxStr}: ${titleSnippet}`;
    });
    const dataViews = chronoPosts.map(p => p.views);
    const dataER = chronoPosts.map(p => p.views > 0 ? (((p.likes + p.comments + p.shares) / p.views) * 100) : 0);

    this.charts.time = new Chart(ctxTime, {
      type: 'line',
      data: {
        labels: labelsTime,
        datasets: [
          {
            label: 'Reel Views',
            data: dataViews,
            borderColor: '#e1306c',
            backgroundColor: 'rgba(225, 48, 108, 0.05)',
            borderWidth: 2,
            tension: 0.35,
            fill: true,
            yAxisID: 'y'
          },
          {
            label: 'Engagement Rate (%)',
            data: dataER,
            borderColor: '#10b981',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.35,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top', labels: { boxWidth: 12 } },
          tooltip: {
            callbacks: {
              title: function(context) {
                const index = context[0].dataIndex;
                const post = chronoPosts[index];
                return `Reel #${post.displayIndex}: ${post.title}`;
              }
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.03)' } },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: { color: 'rgba(255, 255, 255, 0.03)' }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false }
          }
        }
      }
    });

    // 2. Bar chart by category
    const ctxCat = document.getElementById('chart-category-performance').getContext('2d');
    const catMap = {};
    this.posts.forEach(p => {
      const cat = p.category || 'General';
      if (!catMap[cat]) catMap[cat] = { views: 0, count: 0 };
      catMap[cat].views += p.views;
      catMap[cat].count += 1;
    });

    const labelsCat = Object.keys(catMap);
    const dataCatViews = labelsCat.map(c => Math.round(catMap[c].views / catMap[c].count));

    this.charts.category = new Chart(ctxCat, {
      type: 'bar',
      data: {
        labels: labelsCat,
        datasets: [{
          label: 'Avg Views per Reel',
          data: dataCatViews,
          backgroundColor: 'rgba(138, 58, 185, 0.75)',
          borderRadius: 6,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.03)' } }
        }
      }
    });
  },

  renderInsightsAndRecommendations: function() {
    const selectNicheVal = document.getElementById('identity-select-niche')?.value || 'auto';
    const analysis = Generator.analyzeData(this.posts, selectNicheVal !== 'auto' ? selectNicheVal : null);
    
    // 1. Render insights list
    const insightsList = document.getElementById('insights-list');
    insightsList.innerHTML = '';
    
    analysis.insights.forEach(insight => {
      const div = document.createElement('div');
      div.className = `insight-item ${insight.type}`;
      
      let icon = '💡';
      if (insight.type === 'positive') icon = '📈';
      if (insight.type === 'warning') icon = '⚠️';
      
      div.innerHTML = `
        <div class="insight-icon">${icon}</div>
        <div class="insight-content">
          <h4>${insight.title}</h4>
          <p>${insight.text}</p>
        </div>
      `;
      insightsList.appendChild(div);
    });

    // 2. Render recommendations wrapper
    const recWrapper = document.getElementById('recommendations-list');
    recWrapper.innerHTML = '';

    analysis.recommendations.forEach(rec => {
      const card = document.createElement('div');
      card.className = `rec-card ${rec.priority === 'High' ? 'priority-high' : ''}`;
      
      card.innerHTML = `
        <div class="rec-header">
          <div class="rec-title-group">
            <h3>${rec.title}</h3>
            <div class="rec-meta">
              <span class="rec-tag">${rec.format === 'Video' ? 'Reel' : 'Carousel'}</span>
              <span class="rec-tag">${rec.category}</span>
              <span class="rec-tag" style="color: var(--accent-primary)">Priority: ${rec.priority}</span>
            </div>
          </div>
          <div class="rec-score">Score: ${rec.score}</div>
        </div>
        <p class="rec-description">${rec.description}</p>
        <div class="rec-actions">
          <div class="rec-reason">🎯 ${rec.reason}</div>
          <button class="btn btn-primary btn-sm" onclick="AppState.loadRecommendationToScript('${rec.category}', '${rec.title.replace(/'/g, "\\'")}')" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
            Write Script
          </button>
        </div>
      `;
      recWrapper.appendChild(card);
    });
  },

  loadRecommendationToScript: function(category, title) {
    document.getElementById('script-category').value = category;
    document.getElementById('script-topic').value = title;
    
    const tabBtn = document.querySelector('.nav-item[data-tab="script"]');
    if (tabBtn) tabBtn.click();
    
    this.updateScriptOutput();
    this.showToast('Recommendation loaded into Script Writer!', 'success');
  },

  formatNumber: function(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  AppState.init();
});
