/**
 * Instagram Recommendation, Hook & Script Generator Engine
 */

window.Generator = {
  // Generates analytics insights based on actual Instagram post data and optional override niche
  analyzeData: function(posts, overrideNiche = null) {
    if (!posts || posts.length === 0) {
      return {
        topCategory: 'None',
        bestFormat: 'None',
        bestDay: 'None',
        avgEngagement: 0,
        insights: [],
        recommendations: []
      };
    }

    const categories = {};
    const formats = {};
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayPerformance = Array(7).fill(0).map(() => ({ views: 0, engagement: 0, count: 0 }));
    
    let totalViews = 0;
    let totalEngagement = 0;

    posts.forEach(post => {
      const views = Number(post.views) || 0;
      const likes = Number(post.likes) || 0;
      const comments = Number(post.comments) || 0;
      const shares = Number(post.shares) || 0; // saves on Instagram
      const engagement = likes + comments + shares;

      totalViews += views;
      totalEngagement += engagement;

      // Category tracking
      const cat = post.category || 'General';
      if (!categories[cat]) {
        categories[cat] = { views: 0, engagement: 0, count: 0 };
      }
      categories[cat].views += views;
      categories[cat].engagement += engagement;
      categories[cat].count += 1;

      // Format tracking
      const fmt = post.type || 'Video';
      if (!formats[fmt]) {
        formats[fmt] = { views: 0, engagement: 0, count: 0 };
      }
      formats[fmt].views += views;
      formats[fmt].engagement += engagement;
      formats[fmt].count += 1;

      // Day performance
      if (post.date) {
        const dateObj = new Date(post.date);
        if (!isNaN(dateObj.getTime())) {
          const dayIndex = dateObj.getDay();
          dayPerformance[dayIndex].views += views;
          dayPerformance[dayIndex].engagement += engagement;
          dayPerformance[dayIndex].count += 1;
        }
      }
    });

    const overallEngagementRate = totalViews > 0 ? (totalEngagement / totalViews) * 100 : 0;

    // Determine top category by engagement rate (engagement / views)
    let topCategory = 'General';
    let maxCategoryER = -1;
    Object.keys(categories).forEach(cat => {
      const data = categories[cat];
      const er = data.views > 0 ? (data.engagement / data.views) * 100 : 0;
      if (er > maxCategoryER) {
        maxCategoryER = er;
        topCategory = cat;
      }
    });

    // Determine best format by views
    let bestFormat = 'Video';
    let maxFormatViews = -1;
    Object.keys(formats).forEach(fmt => {
      const data = formats[fmt];
      if (data.views > maxFormatViews) {
        maxFormatViews = data.views;
        bestFormat = fmt;
      }
    });

    // Determine best posting day by engagement rate
    let bestDayIndex = 4; // Thursday default
    let maxDayER = -1;
    dayPerformance.forEach((day, index) => {
      const er = day.views > 0 ? (day.engagement / day.views) * 100 : 0;
      if (er > maxDayER && day.count > 0) {
        maxDayER = er;
        bestDayIndex = index;
      }
    });
    const bestDay = daysOfWeek[bestDayIndex];

    // Detect niche
    let niche = overrideNiche;
    if (!niche) {
      const titles = posts.map(p => p.title.toLowerCase()).join(' ');
      const cats = posts.map(p => (p.category || '').toLowerCase()).join(' ');
      const combined = titles + ' ' + cats;

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

    // Generate smart observations/insights
    const insights = [];

    if (maxCategoryER > overallEngagementRate) {
      const perfDiff = (((maxCategoryER - overallEngagementRate) / (overallEngagementRate || 1)) * 100).toFixed(0);
      insights.push({
        type: 'positive',
        title: `Top Performer: ${topCategory}`,
        text: `Your Reels tagged with "${topCategory}" achieve a ${perfDiff}% higher engagement rate than your profile average. Produce more content in this category.`
      });
    }

    if (formats[bestFormat] && formats[bestFormat].count > 0) {
      const formatLabel = bestFormat === 'Video' ? 'Reels' : (bestFormat === 'Image' ? 'Carousels' : 'Single Images');
      insights.push({
        type: 'info',
        title: `Format Winner: ${formatLabel}`,
        text: `Your ${formatLabel.toLowerCase()} generate the highest organic reach. We recommend prioritizing this asset format.`
      });
    }

    insights.push({
      type: 'info',
      title: `Best Posting Day: ${bestDay}`,
      text: `Posts published on ${bestDay}s achieve the highest engagement-to-view ratios. Plan your major releases for this day.`
    });

    // Detect low performing post formats/days to alert
    let worstCategory = 'General';
    let minCategoryER = 999999;
    Object.keys(categories).forEach(cat => {
      const data = categories[cat];
      const er = data.views > 0 ? (data.engagement / data.views) * 100 : 0;
      if (er < minCategoryER && data.count > 0) {
        minCategoryER = er;
        worstCategory = cat;
      }
    });

    if (worstCategory !== topCategory && minCategoryER !== 999999) {
      insights.push({
        type: 'warning',
        title: `Optimization Alert: ${worstCategory}`,
        text: `Your "${worstCategory}" posts are underperforming by ${(overallEngagementRate - minCategoryER).toFixed(1)}% in engagement. Consider changing the structure or visual hook.`
      });
    }

    // 5 priority-ranked specific Reel ideas for each of the 10 niches
    const nicheRecs = {
      tech: [
        {
          id: 'rec-tech-1',
          title: '5 VS Code Shortcuts That Feel Illegal to Know',
          category: 'Tips & Tricks',
          format: 'Video',
          priority: 'High',
          score: '9.8/10',
          reason: 'Highest conversion index for developer tools and workflow automation.',
          description: 'Show a split screen of typing slow vs using key combos. Flash key combinations on screen. Keep the pacing extremely fast (under 30s) to maximize watch time loop rates.'
        },
        {
          id: 'rec-tech-2',
          title: 'How I Build Secure Node.js APIs in 3 Steps',
          category: 'Tutorials',
          format: 'Video',
          priority: 'High',
          score: '9.4/10',
          reason: 'Actionable technical blueprints have the highest save-to-reach ratio.',
          description: 'Explain rate-limiting, helmet headers, and JWT verification. Show a snippet of your code and point to a GitHub repo. Compel saves by promising to drop the code link in caption.'
        },
        {
          id: 'rec-tech-3',
          title: 'React Server Components: The Honest Truth',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.9/10',
          reason: 'Drives high comment engagement through technical controversy.',
          description: 'Explain the trade-offs of RSC vs Client components. Be slightly opinionated. Conclude with a question: "Is this simplifying dev or making it worse?" to spur comments.'
        },
        {
          id: 'rec-tech-4',
          title: 'Inside My Minimalist Developer Setup',
          category: 'Aesthetic',
          format: 'Video',
          priority: 'Medium',
          score: '8.2/10',
          reason: 'Visual aesthetic B-roll drives maximum views and profile clicks.',
          description: 'Slow cinematic shots of your desk, keyboard sounding, and clean editor layout. Sync transitions to a lo-fi beat. Excellent for bringing in non-programmer followers.'
        },
        {
          id: 'rec-tech-5',
          title: 'Day in the Life of a Remote Startup Developer',
          category: 'Vlogs',
          format: 'Video',
          priority: 'Low',
          score: '7.5/10',
          reason: 'Builds authentic personal connection and community trust.',
          description: 'Show coffee brewing, standup call clips, coding blockers, and gym reset. Keep it highly realistic and relatable. Focus on the emotional side of remote work.'
        }
      ],
      lifestyle: [
        {
          id: 'rec-life-1',
          title: 'How to Style 1 Basic White Tee in 5 Ways',
          category: 'Fashion & Style',
          format: 'Video',
          priority: 'High',
          score: '9.7/10',
          reason: 'High-utility wardrobe curation has the highest share rate in lifestyle.',
          description: 'Transition cuts from casual to streetwear to business casual using a single base shirt. Use rapid sync cuts to music beats to make the styling look seamless.'
        },
        {
          id: 'rec-life-2',
          title: 'My Honest Sunday Reset Routine for a Calm Week',
          category: 'Morning Routine',
          format: 'Video',
          priority: 'High',
          score: '9.3/10',
          reason: 'Relatable habit curation drives maximum saves and retention.',
          description: 'Show bed tidying, wardrobe organization, journal planning, and coffee prep. Keep visual lighting warm and cozy. Share 1 planning template on screen to drive saves.'
        },
        {
          id: 'rec-life-3',
          title: 'Why You Should Stop Buying Micro-Trend Clothes',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.8/10',
          reason: 'Anti-consumerist topics trigger high conversation and sharing.',
          description: 'Critique fast-fashion cycles. Talk about capsule wardrobe alternatives. End with a question: "How long do your clothes actually last?"'
        },
        {
          id: 'rec-life-4',
          title: 'Organizing My Closet: Minimalist Edition',
          category: 'Aesthetic',
          format: 'Video',
          priority: 'Medium',
          score: '8.0/10',
          reason: 'Satisfying sorting clips have high watch time loop rates.',
          description: 'Time-lapse of closet decluttering. Show before-and-after color coordination. Use a smooth jazzy audio track.'
        },
        {
          id: 'rec-life-5',
          title: 'What I Spend in a Productive Day in My City',
          category: 'Vlogs',
          format: 'Video',
          priority: 'Low',
          score: '7.4/10',
          reason: 'Transparent spending logs build high viewer curiosity and follow indices.',
          description: 'Show coffee costs, workspace rentals, transit, and dinner. Put a running tally on screen. Keep the vlog pace snappy.'
        }
      ],
      travel: [
        {
          id: 'rec-trav-1',
          title: 'The Ultimate 3-Day Budget Itinerary for Switzerland',
          category: 'Travel Guides',
          format: 'Video',
          priority: 'High',
          score: '9.8/10',
          reason: 'Cost breakdown itineraries drive massive bookmark saves.',
          description: 'Provide exact hostel, train pass, and free view spots. Put a text overlay summary slide at the end to make it easy to screenshot.'
        },
        {
          id: 'rec-trav-2',
          title: '5 Travel Packing Hacks to Avoid Baggage Fees',
          category: 'Tips & Tricks',
          format: 'Video',
          priority: 'High',
          score: '9.5/10',
          reason: 'Solves a direct financial pain point for holiday travelers.',
          description: 'Show vacuum bags, wearing layers to airport, and rolling techniques. Use visual overlays to highlight weight savings.'
        },
        {
          id: 'rec-trav-3',
          title: 'Hyped vs Worth It: Overrated Tourist Traps Exposed',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.7/10',
          reason: 'Contrarian travel reviews drive high comment debates and reach.',
          description: 'Show a viral spot vs a lesser-known alternative. Be brutally honest about crowd density and pricing.'
        },
        {
          id: 'rec-trav-4',
          title: 'A Morning Above the Clouds: Lauterbrunnen Valley',
          category: 'Aesthetic',
          format: 'Video',
          priority: 'Medium',
          score: '8.3/10',
          reason: 'Breathtaking scenery triggers high initial algorithm boost.',
          description: 'Slow pan of mountains, steam rising from coffee cup, and waterfall backdrop. Use atmospheric ambient sound.'
        },
        {
          id: 'rec-trav-5',
          title: 'My Scariest Solo Travel Experience (What I Learned)',
          category: 'Storytelling',
          format: 'Video',
          priority: 'Low',
          score: '7.6/10',
          reason: 'Raw vulnerability captures long watch time through narrative tension.',
          description: 'Tell a story of getting lost or scammed, and how you resolved it safely. Include safety tips for solo travelers.'
        }
      ],
      finance: [
        {
          id: 'rec-fin-1',
          title: 'How to Invest Your First $1,000 (Step-by-Step)',
          category: 'Tutorials',
          format: 'Video',
          priority: 'High',
          score: '9.9/10',
          reason: 'Fundamental wealth building lessons drive the highest save rates in finance.',
          description: 'Break down Index Funds vs ETFs vs HYSA. Show simple, clear graphs of compound interest over time.'
        },
        {
          id: 'rec-fin-2',
          title: '3 Side Hustles You Can Start This Weekend with Zero Dollars',
          category: 'Side Hustles',
          format: 'Video',
          priority: 'High',
          score: '9.4/10',
          reason: 'Earn-money blueprints appeal to a very broad audience, maximizing reach.',
          description: 'Detail digital products, transcription services, and freelance copywriting. Give exact platforms to join.'
        },
        {
          id: 'rec-fin-3',
          title: 'Why Buying a Home Right Now Might Be a Trap',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.9/10',
          reason: 'Contrarian financial advice gets shared and argued in comment sections.',
          description: 'Compare renting & investing the difference vs mortgage costs. Use real numbers for interest rates.'
        },
        {
          id: 'rec-fin-4',
          title: 'How I Write Brand Pitch Emails That Make $5,000',
          category: 'Business Tips',
          format: 'Video',
          priority: 'Medium',
          score: '8.1/10',
          reason: 'High-utility template sharing drives massive bookmark saves.',
          description: 'Show your exact email pitch structure on screen. Highlight the value proposition block.'
        },
        {
          id: 'rec-fin-5',
          title: 'My Real Monthly Income Breakdown (Corporate + Side Hustles)',
          category: 'Case Studies',
          format: 'Video',
          priority: 'Low',
          score: '7.2/10',
          reason: 'Transparent income details build immense authority and follower growth.',
          description: 'Open your dashboard or spreadsheet. Show net income, expenses, and savings rate. Be fully transparent.'
        }
      ],
      gaming: [
        {
          id: 'rec-gam-1',
          title: 'How to Build a Custom Gaming PC (3-Step Beginner Guide)',
          category: 'Tutorials',
          format: 'Video',
          priority: 'High',
          score: '9.7/10',
          reason: 'Hardware building instructionals drive very high saves and shares.',
          description: 'Show motherboard assembly, RAM snap-in, and GPU installation. Use satisfying snapping sound ASMR.'
        },
        {
          id: 'rec-gam-2',
          title: 'Testing the Ultimate $200 Gaming Headset (Honest Review)',
          category: 'Reviews',
          format: 'Video',
          priority: 'High',
          score: '9.3/10',
          reason: 'Product comparisons have high conversion indexes for affiliate buying.',
          description: 'Test mic quality, sound cancellation, and comfort. Give a final score rating compared to cheaper models.'
        },
        {
          id: 'rec-gam-3',
          title: 'Why Modern AAA Games Are Getting Worse',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.8/10',
          reason: 'Passionate gamer debates drive high comment volume and algorithm push.',
          description: 'Talk about bug-ridden releases, microtransactions, and lack of innovation. Ask: "What was the last good game you bought?"'
        },
        {
          id: 'rec-gam-4',
          title: 'Cozy Desk Setup Transformation (RGB Upgrade)',
          category: 'Setups',
          format: 'Video',
          priority: 'Medium',
          score: '8.5/10',
          reason: 'Visual transitions drive high loop-rates and visual aesthetic appeal.',
          description: 'Before-and-after lighting changes. Show cable management hacks and placing decor. Sync to synthwave audio.'
        },
        {
          id: 'rec-gam-5',
          title: 'How to Improve Your Aim Speed in under 5 Minutes',
          category: 'Tutorials',
          format: 'Video',
          priority: 'Low',
          score: '7.8/10',
          reason: 'Direct mechanical game help captures high gamer audience bookmarks.',
          description: 'Explain crosshair placement and sensitivity settings. Show side-by-side clips of poor vs ideal aim.'
        }
      ],
      beauty: [
        {
          id: 'rec-beau-1',
          title: 'My Everyday 5-Minute Minimal Glowy Makeup Routine',
          category: 'Tutorials',
          format: 'Video',
          priority: 'High',
          score: '9.8/10',
          reason: 'Short-form makeup tutorials have the highest reach index in beauty.',
          description: 'Show a rapid step-by-step application using text overlays for products. Keep the look fresh and simple.'
        },
        {
          id: 'rec-beau-2',
          title: 'The Correct Order to Apply Your Skincare Ingredients',
          category: 'Tips & Tricks',
          format: 'Video',
          priority: 'High',
          score: '9.4/10',
          reason: 'Skincare education resolves a common audience confusion, boosting saves.',
          description: 'Explain toner, serum, moisturizer, and oil rules. Show product textures on skin. Keep pacing crisp.'
        },
        {
          id: 'rec-beau-3',
          title: 'Stop Buying These 3 Hyped Viral Skincare Products',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.9/10',
          reason: 'Deinfluencing posts drive high credibility and sharing.',
          description: 'Expose overpriced or pore-clogging products. Suggest cheaper, dermatologically-backed alternatives.'
        },
        {
          id: 'rec-beau-4',
          title: 'Aesthetic Skincare ASMR: Cream Swirls & Taps',
          category: 'Aesthetic',
          format: 'Video',
          priority: 'Medium',
          score: '8.4/10',
          reason: 'Sensory ASMR clips have incredibly high watch-to-end retention ratios.',
          description: 'Close-up macro shots of glass bottle taps, serum droppers, and product blending. No talking, only audio.'
        },
        {
          id: 'rec-beau-5',
          title: 'My 1-Year Journey Curing Hormonal Acne (Real Texture)',
          category: 'Storytelling',
          format: 'Video',
          priority: 'Low',
          score: '7.7/10',
          reason: 'Vulnerability and progress timelines build deep audience connection.',
          description: 'Show honest raw unfiltered skin clips from month 1 to month 12. Discuss diet and routine adjustments.'
        }
      ],
      fitness: [
        {
          id: 'rec-fit-1',
          title: 'How to Correct Your Squat Form (3 Common Mistakes)',
          category: 'Tutorials',
          format: 'Video',
          priority: 'High',
          score: '9.8/10',
          reason: 'Form correction guides have the highest save-to-view ratios in fitness.',
          description: 'Show side-by-side clips of bad form (red X) vs correct form (green check). Highlight knee and hip angles.'
        },
        {
          id: 'rec-fit-2',
          title: '3 High-Protein Meal Prep Ideas Under $5 per Serving',
          category: 'Tips & Tricks',
          format: 'Video',
          priority: 'High',
          score: '9.4/10',
          reason: 'Combines diet goals with budget saving, which broadens target reach.',
          description: 'Show prep of chicken bowl, egg bites, and protein oats. List exact macro count (calories/protein) on screen.'
        },
        {
          id: 'rec-fit-3',
          title: 'Why You Should Stop Taking Fat Burner Supplements',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.9/10',
          reason: 'Exposing fitness scams builds high authority and comment engagement.',
          description: 'Explain the science of calorie deficits vs useless supplements. Answer skeptics in comment section.'
        },
        {
          id: 'rec-fit-4',
          title: 'Cinematic Gym Motivation (Aesthetic Training Vibe)',
          category: 'Aesthetic',
          format: 'Video',
          priority: 'Medium',
          score: '8.3/10',
          reason: 'Inspirational music and high-contrast B-roll generate high shares.',
          description: 'Slow motion lift setups, sweat drops, heavy weights, and focused looks. Sync to a heavy phonk audio beat.'
        },
        {
          id: 'rec-fit-5',
          title: 'Day in the Life of a Busy Personal Trainer',
          category: 'Vlogs',
          format: 'Video',
          priority: 'Low',
          score: '7.5/10',
          reason: 'Behind-the-scenes vlogs drive trust and build client leads.',
          description: 'Show early alarm, client training sessions, packing gym bag, workout, and dinner. Keep it authentic.'
        }
      ],
      food: [
        {
          id: 'rec-food-1',
          title: 'The Easiest 15-Minute Creamy Garlic Pasta Recipe',
          category: 'Tutorials',
          format: 'Video',
          priority: 'High',
          score: '9.7/10',
          reason: 'Fast, easy recipe videos have the highest viral replication potential.',
          description: 'First 2s shows the final pulled cheesy bite. Then rapid prep cuts: garlic slicing, pan sizzling, cream pouring.'
        },
        {
          id: 'rec-food-2',
          title: 'The Secret Technique to Get Crispy Potatoes Every Time',
          category: 'Tips & Tricks',
          format: 'Video',
          priority: 'High',
          score: '9.3/10',
          reason: 'Cooking technique hacks drive massive bookmark saves.',
          description: 'Explain boiling with baking soda before roasting. Show the crunch sound by scraping a fork on potato.'
        },
        {
          id: 'rec-food-3',
          title: 'Why You Should Stop Buying Pre-Grated Cheese',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.7/10',
          reason: 'Unusual kitchen opinions provoke curiosity and comment discussions.',
          description: 'Explain anti-caking agents in pre-grated packs and why block cheese melts better. Show comparison melt.'
        },
        {
          id: 'rec-food-4',
          title: 'Aesthetic Baking ASMR: Sourdough Bread Scoring',
          category: 'Aesthetic',
          format: 'Video',
          priority: 'Medium',
          score: '8.4/10',
          reason: 'Visual baking closeups have high visual loop watch time.',
          description: 'Close up of blade cutting dough, oven rise time-lapse, and tapping the crust for hollow sound.'
        },
        {
          id: 'rec-food-5',
          title: 'My Honest Review of a Viral 3-Star Michelin Restaurant',
          category: 'Vlogs',
          format: 'Video',
          priority: 'Low',
          score: '7.6/10',
          reason: 'High-ticket culinary vlogs capture curiosity and high visual views.',
          description: 'Show course presentations, price breakdown, and taste rating. Highlight whether it is worth the hype.'
        }
      ],
      art: [
        {
          id: 'rec-art-1',
          title: 'How to Draw Figure Proportions (3-Step Guide)',
          category: 'Tutorials',
          format: 'Video',
          priority: 'High',
          score: '9.8/10',
          reason: 'Foundational drawing tutorials have the highest save rate in art.',
          description: 'Draw guidelines on screen over a photo skeleton. Highlight head ratio divisions. Keep grid clear.'
        },
        {
          id: 'rec-art-2',
          title: '5 Color Palette Combinations that Always Work',
          category: 'Tips & Tricks',
          format: 'Video',
          priority: 'High',
          score: '9.4/10',
          reason: 'Visual color guides drive high bookmark saving for designers.',
          description: 'Show swatches on screen and apply them to a simple drawing draft. List hex codes on screen.'
        },
        {
          id: 'rec-art-3',
          title: "Why Digital Art Isn't 'Cheating' (An Artist's Take)",
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.9/10',
          reason: 'Defending digital mediums triggers debate in traditional art groups.',
          description: 'Debunk the idea that undo buttons make art easy. Explain digital brush control and layers. Invite opinions.'
        },
        {
          id: 'rec-art-4',
          title: 'Satisfying Oil Paint Swirling ASMR',
          category: 'Aesthetic',
          format: 'Video',
          priority: 'Medium',
          score: '8.5/10',
          reason: 'Fluid texture mixing has extremely high loop and retention scores.',
          description: 'Extreme macro closeup of palette knife mixing thick oil paints. Focus on clean canvas scraping audio.'
        },
        {
          id: 'rec-art-5',
          title: 'Sketchbook Flip-Through: 2021 vs 2026 Progress',
          category: 'Storytelling',
          format: 'Video',
          priority: 'Low',
          score: '7.7/10',
          reason: 'Long-term progress transformations drive high follower conversions.',
          description: 'Flip through pages of an old archive notebook and compare them to your latest creations. Share mindset shifts.'
        }
      ],
      general: [
        {
          id: 'rec-gen-1',
          title: '3 Habits that Helped Me Build a Personal Brand in 1 Year',
          category: 'Advice',
          format: 'Video',
          priority: 'High',
          score: '9.6/10',
          reason: 'Generic self-improvement and creator strategies appeal to broad feeds.',
          description: 'List time-blocking, caption templates, and asset organization. Keep delivery concise under 40 seconds.'
        },
        {
          id: 'rec-gen-2',
          title: 'How to Organize Your Digital Files (Creator Setup)',
          category: 'Tips & Tricks',
          format: 'Video',
          priority: 'High',
          score: '9.2/10',
          reason: 'Productivity templates drive massive bookmark saves across all niches.',
          description: 'Show your cloud storage folder layout. Provide an exact labeling formula to keep assets clean.'
        },
        {
          id: 'rec-gen-3',
          title: 'Why You Should Stop Over-Editing Your Short Videos',
          category: 'Hot Takes',
          format: 'Video',
          priority: 'Medium',
          score: '8.6/10',
          reason: 'Contrarian video advice creates high interest among aspiring creators.',
          description: 'Discuss why overdone transitions distract from the message. Show a clean simple cut style as comparison.'
        },
        {
          id: 'rec-gen-4',
          title: 'Aesthetic Workspace Timelapsing (Morning Routine)',
          category: 'Aesthetic',
          format: 'Video',
          priority: 'Medium',
          score: '8.2/10',
          reason: 'Clean aesthetic workspaces have general cozy loop appeal.',
          description: 'Timelapse of sunrise lighting moving across your office desk as you write and code. Lo-fi soundtrack.'
        },
        {
          id: 'rec-gen-5',
          title: 'Behind the Scenes: Scripting, Filming, & Editing 1 Reel',
          category: 'Vlogs',
          format: 'Video',
          priority: 'Low',
          score: '7.5/10',
          reason: 'Process walkthroughs build deep audience appreciation and connection.',
          description: 'Document the chronological steps from raw bullet point topic to publishing. Share time investment.'
        }
      ]
    };

    const recommendations = nicheRecs[niche] || nicheRecs['general'];

    return {
      topCategory,
      bestFormat,
      bestDay,
      avgEngagement: overallEngagementRate.toFixed(2),
      insights,
      recommendations
    };
  },

  // Hook Analyzer logic: scores text & visual hooks, and generates 3 alternate templates
  analyzeHook: function(hookText, audience, options) {
    if (!hookText) {
      return { score: 0, feedback: [], rewrites: [] };
    }

    const words = hookText.trim().split(/\s+/);
    const wordCount = words.length;
    let score = 70; // Baseline
    const feedback = [];

    // 1. Length analysis
    if (wordCount < 4) {
      score -= 10;
      feedback.push({ type: 'warning', text: 'Too short. Hook may lack sufficient context to create curiosity.' });
    } else if (wordCount > 14) {
      score -= 15;
      feedback.push({ type: 'error', text: 'Too long. Reels hooks must be read under 3 seconds. Keep it under 10 words.' });
    } else if (wordCount >= 5 && wordCount <= 9) {
      score += 10;
      feedback.push({ type: 'success', text: 'Ideal length! Easily readable in under 2 seconds.' });
    } else {
      feedback.push({ type: 'info', text: 'Acceptable length, but could be tightened for faster reading.' });
    }

    // 2. Emotional / Curiosity Check (Power words)
    const powerWordsRegex = /(secret|steal|cheat|hacks|mistakes|failed|wrong|illegal|stop|delete|don't|rules|how to|percent|%|hidden|everyone|nobody)/i;
    if (powerWordsRegex.test(hookText)) {
      score += 10;
      feedback.push({ type: 'success', text: 'Strong curiosity trigger! Contains attention-grabbing keywords.' });
    } else {
      score -= 10;
      feedback.push({ type: 'warning', text: 'Weak hook friction. Lacks emotional triggers or a strong curiosity gap.' });
    }

    // 3. Question check
    if (hookText.includes('?') || /^(why|how|are you|is this|what)/i.test(hookText)) {
      score += 5;
      feedback.push({ type: 'info', text: 'Uses a direct question structure, which standardly drives comment replies.' });
    }

    // 4. Checklist options modifiers
    if (options.visualCue) {
      score += 5;
      feedback.push({ type: 'success', text: 'Visual cue active: Reels with visual action in the first 2s increase hook rates by 22%.' });
    } else {
      score -= 5;
      feedback.push({ type: 'info', text: 'Consider adding a subtle visual gesture (e.g. pointing, showing product) to reinforce hook.' });
    }

    if (options.textOverlay) {
      score += 5;
      feedback.push({ type: 'success', text: 'Text overlay active: 70%+ of users watch Reels on mute. Overlays are essential.' });
    } else {
      score -= 10;
      feedback.push({ type: 'error', text: 'No text overlay selected! Add high-contrast on-screen text to stop scrolling.' });
    }

    // Cap score
    score = Math.max(0, Math.min(100, score));

    // Generate 3 rewrites
    const cleanTopic = hookText.replace(/^(how to|why|stop|you need to|this is how to)\s+/i, '');
    const rewrites = [
      {
        type: 'Pattern Interrupt (Aggressive)',
        text: `Stop scrolling if you are still trying to figure out: ${cleanTopic}!`,
        why: 'Creates immediate negative bias and breaks scroll patterns by using a direct command.'
      },
      {
        type: 'Curiosity Gap (High Retention)',
        text: `The hidden reason why most creators fail at ${cleanTopic}...`,
        why: 'Leaves the solution open-ended, forcing the viewer to watch the next 15 seconds to resolve.'
      },
      {
        type: 'Authority & Stats (High CTR)',
        text: `I tested 10 systems for ${cleanTopic}. Here is the 1 that actually works.`,
        why: 'Builds instant authority using personal statistics, which increases follow rates.'
      }
    ];

    return {
      score,
      feedback,
      rewrites
    };
  },

  // Generates complete script based on parameters
  generateScript: function(params) {
    const { platform, category, topic, tone, hookType, duration } = params;
    const cleanTopic = topic || 'How to stay consistent with content creation';
    const cleanCategory = category || 'Education';

    // Hook Library grouped by Hook Type and Tone (Adapted for Instagram Reels)
    const hooks = {
      question: {
        professional: `Are you still struggling with ${cleanTopic}? You aren't alone. Today, we're breaking down exactly how to solve this using data-driven steps. Let's look at the facts.`,
        conversational: `Have you ever wondered why ${cleanTopic} is so incredibly hard? I used to deal with this every single day until I discovered a simple hack. Let me explain.`,
        witty: `Raise your hand if you've ever felt personally victimized by ${cleanTopic}. 🙋‍♂️ Yeah, me too. Don't worry, we are fixing that hot mess in the next 45 seconds.`,
        hype: `Stop wasting your time doing ${cleanTopic} the old way! If you want real results, you need to change your strategy immediately. Here is the secret.`,
        inspirational: `We've all been told that ${cleanTopic} is impossible without talent. But what if the only thing you're missing is a shift in perspective? Let's talk about it.`
      },
      disruption: {
        professional: `Most industry experts are giving you outdated advice about ${cleanTopic}. The reality is, the landscape has shifted, and following standard guides will cost you views. Here's why.`,
        conversational: `I'm going to say something controversial: almost everything you've heard about ${cleanTopic} is flat out wrong. Let me show you what actually works.`,
        witty: `Unpopular opinion: if you're still focusing on ${cleanTopic}, you're basically using a flip phone in 2026. Let's upgrade your setup, shall we?`,
        hype: `Delete everything you know about ${cleanTopic}! The game has officially changed and 99% of creators are getting left behind. Pay attention to this.`,
        inspirational: `The rules of ${cleanTopic} were written by people who wanted you to fit in. But growth doesn't happen in comfort zones. It's time to break the pattern.`
      },
      stat: {
        professional: `A recent study shows that over 82% of creators fail at ${cleanTopic} within their first year. The difference between success and failure comes down to one single metric.`,
        conversational: `Did you know that 9 out of 10 people completely mess up ${cleanTopic}? Here is the crazy part: it takes less than 2 minutes to correct. Let me show you.`,
        witty: `Exactly 94.7% of statistics are made up on the spot, but this is real: you are losing a massive amount of engagement by ignoring ${cleanTopic}. Here's the math.`,
        hype: `99% of people are completely ignoring this one trick about ${cleanTopic}. If you implement it today, your engagement will skyrocket overnight!`,
        inspirational: `Statistically, the odds of mastering ${cleanTopic} are stacked against us. But statistics don't define your drive. Here is how we beat the average.`
      },
      narrative: {
        professional: `Last month, our team analyzed our approach to ${cleanTopic}. The lessons we learned were unexpected, but they completely transformed our workflow. Here is the case study.`,
        conversational: `A few weeks ago, I was completely stuck trying to figure out ${cleanTopic}. I was ready to quit, but then I stumbled on a breakthrough that changed everything.`,
        witty: `So there I was at 3 AM, staring at my computer, crying over ${cleanTopic}. Classic, right? But then I had an epiphany that saved my sanity. Here it is.`,
        hype: `We just cracked the code on ${cleanTopic} and generated record-breaking traffic in under 48 hours. I'm opening up the playbook for you right now.`,
        inspirational: `Think back to when you first started. Remember the struggle with ${cleanTopic}? We've all been there. Today, we honor that journey by making it easier.`
      }
    };

    // Body/Value Library grouped by Tone
    const bodies = {
      professional: `Here is the structured breakdown:
First, establish a solid foundation. You must isolate your primary variable.
Second, optimize for retention. Streamline the delivery and remove any conversational fluff.
Finally, execute a clear test-and-iterate feedback loop. Review your metrics weekly.`,
      conversational: `Here's what you want to do:
First, start small. Don't try to build the whole thing at once. Just focus on step one.
Next, focus on consistency over intensity. Doing this for 10 minutes a day beats a weekly marathon.
Lastly, get feedback. Show it to a friend or post it online. It's the only way to grow.`,
      witty: `Here's the cheat sheet (thank me later):
Step 1: Stop overthinking it. It's really not that deep.
Step 2: Automate the boring parts. Let technology do the heavy lifting while you take all the credit.
Step 3: Keep it brief. Nobody has the attention span for a movie-length explanation anyway.`,
      hype: `Here are the 3 steps you need to execute RIGHT NOW:
1. Double down on what makes you unique. Copying others is a death sentence.
2. Build an efficient system. Speed and volume are your best friends in this market.
3. Launch before you feel ready. Speed beats perfection every single time!`,
      inspirational: `This is where the magic happens:
Begin by trusting your unique voice. Your perspective is your superpower.
Embrace the failures. Every mistake is just data pointing you towards your true path.
Finally, remember why you started. Keep that passion at the center of everything you do.`
    };

    // CTA Library grouped by Platform and Tone
    const ctas = {
      youtube: {
        professional: `If you found this analytical breakdown valuable, subscribe for more content on ${cleanCategory}. Drop a comment with your thoughts.`,
        conversational: `If this was helpful, hit that subscribe button! Let me know in the comments: what's your biggest hurdle with ${cleanTopic}?`,
        witty: `Subscribing takes exactly 1.2 seconds and makes me feel like a real adult. Smash that button and let's keep growing together.`,
        hype: `SMASH that subscribe button, hit the bell icon, and share this video with one creator who needs to hear this today! Let's go!`,
        inspirational: `Your support helps us build a community of growth. Subscribe to join us on this journey, and let's build something great together.`
      },
      tiktok: {
        professional: `Follow for data-backed tips on ${cleanCategory}. Share this with a colleague who needs to optimize their workflow.`,
        conversational: `Double tap if you agree! Hit follow for more daily tips, and save this video for the next time you're stuck.`,
        witty: `Follow me so my parents finally believe this is a real job. Favorite this so you don't forget it in 5 minutes.`,
        hype: `Drop a follow right now! Save this video, share it, and tell me in the comments what we should cover next!`,
        inspirational: `Follow to keep feeding your growth mindset. Share this video to inspire someone in your circle today.`
      },
      instagram: {
        professional: `Save this post to reference during your next planning session. Follow for more strategic insights on ${cleanCategory}.`,
        conversational: `Make sure to tap that save button so you can find this later! Share this to your story if you found it useful!`,
        witty: `Save this post because your memory isn't as good as you think it is. Follow for more daily sarcasm and tips.`,
        hype: `Tap SAVE! Share this to your story right now and tag a friend who needs to see this! Follow for daily alerts!`,
        inspirational: `Save this to your collection of inspiration. Share it with your community to spark a conversation of change.`
      },
      twitter: {
        professional: `If you appreciate this insights thread, please retweet the first tweet to share with your network. Follow @handle for more.`,
        conversational: `If this thread helped you, drop a like and retweet the top post! Follow along for more simple breakdowns.`,
        witty: `Retweet this so your followers think you read smart things. Follow for more high-value threads and memes.`,
        hype: `Retweet the first tweet right now! Let's spread this knowledge! Follow for weekly deep dives!`,
        inspirational: `Retweet to spread the light. Follow to keep connecting with ideas that elevate your perspective.`
      },
      linkedin: {
        professional: `I hope this analysis adds value to your professional toolkit. Click 'Like' and share your experience in the comments. Let's connect.`,
        conversational: `What are your thoughts on this approach? Let's start a discussion in the comments. Feel free to share this with your network.`,
        witty: `If you want to look highly intellectual to your professional network, click 'Share'. Let's connect for more insights.`,
        hype: `Like and share this post to help your network scale today! Comment below with your #1 takeaway!`,
        inspirational: `Let us elevate our industry standards together. Share this post if you believe in collaborative growth. Let's connect.`
      }
    };

    // Construct the script
    const selectedHook = hooks[hookType]?.[tone] || hooks['question'][tone];
    const selectedBody = bodies[tone];
    const selectedCTA = ctas[platform]?.[tone] || ctas['instagram'][tone];

    // Build Instagram Reels specific layout
    const scriptText = `// INSTAGRAM REELS SCRIPT WORKSPACE (60 SECONDS)
// CATEGORY: ${cleanCategory} | HOOK TYPE: ${hookType.toUpperCase()}
// TONE: ${tone.toUpperCase()}

[0:00 - 0:08] HOOK & PATTERN INTERRUPT
Visual Action: Fast transition zoom. Hold product or point directly at overlay box.
On-Screen Text: "Mastering ${cleanTopic} 💡"
Audio: (High energy) "${selectedHook}"

[0:08 - 0:45] CORE VALUES & VALUE DELIVERY
Visual Action: Quick multi-angle cuts (3s limit per cut). Display key code lines or screenshots matching audio.
On-Screen Text: Keep key words highlighted in pink/yellow.
Audio: "${selectedBody}"

[0:45 - 1:00] THE CALL-TO-ACTION (CTA)
Visual Action: Dynamic point down to the Save icon. End transition card fades in.
Audio: "${selectedCTA}"`;

    // Generate tips and checks for sidebar
    const checklists = [
      { name: 'Visual Hook Overlay', text: 'Checked. Text overlays stop scroll friction.', checked: true },
      { name: 'Pacing Check', text: 'Ideal. Multi-angle cuts keep viewer retention above 75%.', checked: true },
      { name: 'Call to Action', text: `Directly targets Instagram save/share metrics.`, checked: true },
      { name: 'Duration Fit', text: `Configured to finish in under 60 seconds (micro-content standard).`, checked: true }
    ];

    return {
      script: scriptText,
      checklists: checklists
    };
  },

  generateNicheData: function(username, platform, overrideNiche = null, profileUrl = null) {
    const nameLower = username.toLowerCase();
    let niche = overrideNiche || 'general';
    
    // Check if profileUrl is a single post link (contains /p/, /reel/, or /tv/)
    let baseProfileUrl = profileUrl || `https://www.instagram.com/${username}/`;
    let isSinglePost = false;
    let postShortcode = '';
    let postType = 'Video';

    if (baseProfileUrl && (baseProfileUrl.includes('/p/') || baseProfileUrl.includes('/reel/') || baseProfileUrl.includes('/tv/'))) {
      isSinglePost = true;
      const match = baseProfileUrl.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
      if (match) {
        postType = match[1] === 'p' ? 'Image' : 'Video';
        postShortcode = match[2];
      }
      
      // Extract username from url if available (e.g. instagram.com/username/p/abc)
      const cleanUrl = baseProfileUrl.replace(/https?:\/\/(www\.)?instagram\.com\//i, '');
      const parts = cleanUrl.split('/');
      if (parts.length > 2 && parts[0] !== 'p' && parts[0] !== 'reel' && parts[0] !== 'tv') {
        baseProfileUrl = `https://www.instagram.com/${parts[0]}/`;
      } else if (username && username !== 'creator') {
        baseProfileUrl = `https://www.instagram.com/${username}/`;
      } else {
        baseProfileUrl = 'https://www.instagram.com/creator/'; // fallback to creator profile
      }
    }

    if (!overrideNiche) {
      // Niche classification
      if (/(code|dev|tech|software|web|program|js|ts|python|html|css|data|backend|frontend)/i.test(nameLower)) {
        niche = 'tech';
      } else if (/(fit|gym|health|workout|coach|train|strong|active|runner|muscle)/i.test(nameLower)) {
        niche = 'fitness';
      } else if (/(cook|food|chef|bake|recipe|yum|kitchen|eat|bite|flavor)/i.test(nameLower)) {
        niche = 'food';
      } else if (/(art|design|paint|draw|creative|photo|vector|sketch|artist|logo)/i.test(nameLower)) {
        niche = 'art';
      } else if (/(lifestyle|fashion|outfit|style|wardrobe|shop|lookbook|getready|grwm)/i.test(nameLower)) {
        niche = 'lifestyle';
      } else if (/(travel|vlog|trip|adventure|explore|nomad|wander|backpack)/i.test(nameLower)) {
        niche = 'travel';
      } else if (/(money|finance|business|invest|hustle|scale|rich|stocks|crypto|marketing)/i.test(nameLower)) {
        niche = 'finance';
      } else if (/(game|gamer|play|setup|console|fps|xbox|ps5|pcgaming|streamer)/i.test(nameLower)) {
        niche = 'gaming';
      } else if (/(beauty|makeup|skin|glow|cosmetics|hair|salon|aesthetic)/i.test(nameLower)) {
        niche = 'beauty';
      }
    }

    const posts = [];

    // Base niches templates
    const templates = {
      tech: [
        { title: "5 Secrets to Write Clean JavaScript Code", category: "Tutorials", baseViews: 85000 },
        { title: `How @${username} builds SaaS products in 2026`, category: "Storytelling", baseViews: 195000 },
        { title: "Why you need to stop overthinking your tech stack", category: "Hot Takes", baseViews: 65000 },
        { title: `Inside @${username}'s mechanical keyboard and desk layout ⌨️`, category: "Aesthetic", baseViews: 320000 },
        { title: "My biggest coding mistake that cost me $1,500", category: "Case Studies", baseViews: 115000 },
        { title: "VS Code Extensions you need to install immediately", category: "Tips & Tricks", baseViews: 145000 }
      ],
      fitness: [
        { title: "My exact morning routine to stay energized all day", category: "Vlogs", baseViews: 75000 },
        { title: "Why your lifting routine isn't building muscle", category: "Hot Takes", baseViews: 120000 },
        { title: `How @${username} hits daily protein goals on a budget`, category: "Tips & Tricks", baseViews: 190000 },
        { title: "The truth about lifting weights vs running cardio", category: "Advice", baseViews: 85000 },
        { title: "Mastering the perfect squat form (3 step tutorial)", category: "Tutorials", baseViews: 98000 },
        { title: `What I eat in a day to stay shredded - @${username}`, category: "Aesthetic", baseViews: 240000 }
      ],
      food: [
        { title: "How to cook a restaurant-quality pasta in 15 minutes", category: "Tutorials", baseViews: 140000 },
        { title: `The secret ingredient @${username} adds to every sauce`, category: "Tips & Tricks", baseViews: 320000 },
        { title: "5 Kitchen tools that will save you hours of prep time", category: "Advice", baseViews: 65000 },
        { title: "Why your sourdough bread isn't rising properly", category: "Hot Takes", baseViews: 110000 },
        { title: `Reviewing viral dessert recipes from TikTok - @${username}`, category: "Vlogs", baseViews: 210000 },
        { title: "My absolute favorite summer comfort food", category: "Aesthetic", baseViews: 180000 }
      ],
      art: [
        { title: "My complete process designing high-end logos from scratch", category: "Tutorials", baseViews: 95000 },
        { title: "5 color palettes that will elevate your sketches", category: "Tips & Tricks", baseViews: 125000 },
        { title: `How @${username} finishes design projects under tight deadlines`, category: "Advice", baseViews: 75000 },
        { title: "Finding your art style: a 30-day workbook challenge", category: "Case Studies", baseViews: 110000 },
        { title: `Reviewing my drawings from 2016 vs 2026 - @${username}`, category: "Storytelling", baseViews: 280000 },
        { title: "Painting a custom mural in my bedroom", category: "Vlogs", baseViews: 160000 }
      ],
      lifestyle: [
        { title: "GRWM: Styling a premium minimal summer outfit", category: "Fashion & Style", baseViews: 142000 },
        { title: `My honest weekly reset routine for productivity - @${username}`, category: "Morning Routine", baseViews: 88000 },
        { title: "5 wardrobe essentials every creator needs in 2026", category: "Fashion & Style", baseViews: 92000 },
        { title: `Day in the life of a lifestyle creator - @${username}`, category: "Vlogs", baseViews: 185000 },
        { title: "We need to talk about the trend of hyper-consumption", category: "Hot Takes", baseViews: 75000 },
        { title: "How to style a basic white tee in 3 different ways", category: "Tutorials", baseViews: 110000 }
      ],
      travel: [
        { title: "How to travel Europe on a budget (5 hack guide)", category: "Travel Guides", baseViews: 215000 },
        { title: `My top 3 hidden cafes in Tokyo you must visit - @${username}`, category: "Vlogs", baseViews: 145000 },
        { title: "Why I stopped using standard hotel booking platforms", category: "Hot Takes", baseViews: 95000 },
        { title: `What it really cost to travel Bali for 1 month - @${username}`, category: "Cost Breakdowns", baseViews: 280000 },
        { title: "Packing checklist: fitting 2 weeks of gear in a carry-on", category: "Tips & Tricks", baseViews: 130000 },
        { title: "A morning hiking above the clouds in Switzerland", category: "Aesthetic", baseViews: 350000 }
      ],
      finance: [
        { title: "How to build a passive side hustle using simple tools", category: "Side Hustles", baseViews: 185000 },
        { title: `How @${username} structures monthly savings (50-30-20 rule)`, category: "Tutorials", baseViews: 125000 },
        { title: "Why your money is losing value sitting in a normal bank", category: "Hot Takes", baseViews: 92000 },
        { title: "My top 3 marketing platforms to scale a brand in 2026", category: "Business Tips", baseViews: 110000 },
        { title: `The biggest financial mistake I made in my 20s - @${username}`, category: "Case Studies", baseViews: 155000 },
        { title: "How to write email pitches that convert brands fast", category: "Tips & Tricks", baseViews: 140000 }
      ],
      gaming: [
        { title: "My complete custom PC gaming setup reveal for 2026 🎮", category: "Setups", baseViews: 310000 },
        { title: `Testing the most hyped gaming headset of the year - @${username}`, category: "Reviews", baseViews: 120000 },
        { title: "Why modern game releases feel unfinished", category: "Hot Takes", baseViews: 95000 },
        { title: `How to improve your aim speed in under 5 minutes - @${username}`, category: "Tutorials", baseViews: 185000 },
        { title: "When you finally beat the final boss after 100 tries", category: "Memes", baseViews: 520000 },
        { title: "The history of retro consoles that defined childhood", category: "Vlogs", baseViews: 140000 }
      ],
      beauty: [
        { title: "My daily 5-minute glowy makeup routine tutorial", category: "Tutorials", baseViews: 220000 },
        { title: `The secret skincare products @${username} uses every night`, category: "Tips & Tricks", baseViews: 165000 },
        { title: "Why you need to stop buying hyped viral skincare", category: "Hot Takes", baseViews: 110000 },
        { title: `Testing a trending graphic liner makeup look - @${username}`, category: "Vlogs", baseViews: 195000 },
        { title: "How to curl your hair in under 10 minutes flat", category: "Tutorials", baseViews: 280000 },
        { title: "ASMR skincare routine: textures and sounds", category: "Aesthetic", baseViews: 410000 }
      ],
      general: [
        { title: `10 life-changing lessons from @${username}'s creative journey`, category: "Storytelling", baseViews: 55000 },
        { title: "How to build a personal brand without losing your mind", category: "Advice", baseViews: 125000 },
        { title: "My top 3 productivity tools to automate admin work", category: "Tips & Tricks", baseViews: 85000 },
        { title: "A day behind the scenes planning content scripts", category: "Vlogs", baseViews: 95000 },
        { title: `What I would do if @${username} started over from 0 followers`, category: "Hot Takes", baseViews: 155000 },
        { title: "My Sunday planning system for high performance", category: "Tutorials", baseViews: 72000 }
      ]
    };

    const activeTemplates = templates[niche];
    
    // Generate dates: 1 per day going backward from yesterday
    const today = new Date();
    
    activeTemplates.forEach((t, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (i + 1));
      const dateStr = date.toISOString().split('T')[0];

      // Views and likes with random variation (+- 15%)
      const varFactor = 0.85 + Math.random() * 0.3;
      const views = Math.round(t.baseViews * varFactor);
      
      // Let's set some variation in engagement (e.g. 5% to 15%)
      const er = 0.05 + Math.random() * 0.1;
      const likes = Math.round(views * er * 0.8);
      const comments = Math.round(views * er * 0.15);
      const shares = Math.round(views * er * 0.05);

      let postUrl = baseProfileUrl;
      let postTitle = t.title;
      let type = i % 2 === 0 ? 'Image' : 'Video';

      if (isSinglePost && i === 0) {
        postUrl = profileUrl;
        const typeFolder = postType === 'Image' ? 'p' : 'reel';
        postTitle = `instagram.com/${typeFolder}/${postShortcode}/`;
        type = postType;
      } else {
        postUrl = type === 'Image' ? baseProfileUrl : (baseProfileUrl.endsWith('/') ? baseProfileUrl + 'reels/' : baseProfileUrl + '/reels/');
      }

      posts.push({
        id: `ig-scan-${i}-${Date.now()}`,
        title: postTitle,
        type: type,
        category: t.category,
        views: views,
        likes: likes,
        comments: comments,
        shares: shares,
        date: dateStr,
        url: postUrl
      });
    });

    // Inject 1 explicit "flop" post for testing "Why this flopped" tool
    const dateFlop = new Date(today);
    dateFlop.setDate(today.getDate() - 10);
    
    let flopUrl = baseProfileUrl;
    flopUrl = baseProfileUrl.endsWith('/') ? baseProfileUrl + 'reels/' : baseProfileUrl + '/reels/';

    posts.push({
      id: `ig-scan-flop-${Date.now()}`,
      title: `Quick thoughts on my creative schedule for this week`,
      type: 'Video',
      category: 'Vlogs',
      views: 3100, // Explicitly low views compared to others (normally 60k+)
      likes: 85,
      comments: 6,
      shares: 4,
      date: dateFlop.toISOString().split('T')[0],
      url: flopUrl
    });

    return posts;
  }
};
