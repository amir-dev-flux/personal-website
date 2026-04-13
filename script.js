const navItems = document.querySelectorAll(".nav-item");
const title = document.getElementById("sectionTitle");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const chatThread = document.getElementById("chatThread");
const chatShell = document.querySelector(".chat-shell");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const fakeInput = document.getElementById("fakeInput");
const fakeInputBar = document.querySelector(".fake-input-bar");
const themeToggle = document.getElementById("themeToggle");
const COFFEE_LINK = "https://razorpay.me/@amirasimmadoo";

const sectionData = {
  flux: {
    messages: [
      `Flux started as just a name — something I used everywhere without thinking much about it.

But over time, it stuck. And eventually, it became something more.

Now, Flux is how I think about building — staying in motion, adapting fast, and improving through iteration instead of waiting for perfect conditions.

Nothing you see that works today was perfect in its first version.
It became better because it kept evolving.

“Nothing great was built in its first version.”
“Progress compounds, perfection delays.”

That’s what Flux means to me — keep moving, keep refining, and let the work shape itself over time.`,
    ],
    options: [
      {
        label: "How does this apply to development?",
        response:
          "In development, Flux means shipping early, learning from real feedback, and improving the system step by step instead of waiting for a perfect start.",
      },
      {
        label: "Why does this matter?",
        response:
          "Because real products win through adaptation. The faster you iterate, the faster your work becomes useful and resilient.",
      },
      { label: "See Flux in action", action: "navigate", target: "projects" },
      { label: "Back to welcome", action: "navigate", target: "welcome" },
      { label: "Contact me", action: "navigate", target: "contact" },
    ],
  },
  projects: {
    messages: [],
    options: [
      { label: "Show more", action: "show_more_projects" },
      { label: "View skills", action: "navigate", target: "skills" },
      { label: "What I'm building next", action: "current_work" },
    ],
  },
  skills: {
    messages: [
      "Here's a quick view of the skills I use most. The bars below show self-assessed confidence based on hands-on project work.",
    ],
    options: [
      {
        label: "Where have you used these?",
        response: `Python & ML → AQUA-INTEL, Heat Wave Prediction
Backend → Expense Analyzer, AI Career Coach
Data Processing → Expense Analyzer, AQUA-INTEL
Visualization → Heat Wave Prediction
Communication & Presentation → Accenture work and college presentations`,
      },
      {
        label: "What are you improving?",
        response:
          "Currently focused on deepening my AI/ML understanding and building more production-level systems.",
      },
      { label: "View my projects", action: "navigate", target: "projects" },
    ],
  },
  about: {
    messages: [
      `I’m Amir Madoo, from Kalyan, Maharashtra.

My interest in computers started early — somewhere between playing GTA Vice City and messing around in MS Paint. It wasn’t serious back then, just curiosity.

That curiosity stayed.

I pursued a degree in Information Technology and started my career at Accenture as a web developer. Over the last two years, I’ve worked on production delivery, team execution, and shipping under real constraints.

Somewhere along the way, I developed a strong interest in AI and ML. Not just learning it, but actually building things with it.

Right now, I’m focused on doing exactly that — learning fast, building consistently, and pushing towards real mastery over time.

No shortcuts. Just steady progress.`,
    ],
    options: [
      {
        label: "Why hire me?",
        response:
          "I don’t just learn — I build. I focus on practical systems, not just theory, and I care about getting things to actually work. If something needs to be figured out, I’ll figure it out.",
      },
    ],
  },
  contact: {
    messages: [
      `If you’re here, I’m guessing you’re looking to reach out — perfect.

You can connect with me directly through email or socials, or just start right here.`,
    ],
    options: [
      { label: "Start a message", action: "start_message" },
      { label: "Email me", action: "email_me" },
      { label: "View socials", action: "view_socials" },
      { label: "View resume", action: "navigate", target: "resume" },
    ],
  },
  resume: {
    messages: [
      "Here’s a quick look at my resume — feel free to go through it.",
    ],
    options: [
      {
        label: "View experience",
        response:
          "I have close to two years of real-world development experience at Accenture, focused on web delivery, practical systems, and execution under real constraints.",
      },
      {
        label: "View education",
        response:
          "My foundation is Information Technology, with hands-on focus areas around software engineering, system design, and applied AI/ML workflows.",
      },
      {
        label: "Skills summary",
        response:
          "Core strengths from my resume: Python, AI systems, backend architecture, API integration, and product-focused delivery.",
      },
    ],
  },
  coffee: {
    messages: [],
    options: [],
  },
};

const welcomeActions = [
  { label: "Explore my projects", section: "projects" },
  { label: "Check my skills", section: "skills" },
  { label: "Get to know me", section: "about" },
  { label: "View my resume", section: "resume" },
  { label: "Reach out", section: "contact" },
  { label: "Support my work", section: "coffee" },
];

const welcomeQuotes = [
  "Iteration beats perfection.",
  "You don’t get it right, you get it going.",
  "Version 1 builds momentum, not perfection.",
  "Start before you're ready.",
  "Progress compounds over time.",
  "Clarity comes from action, not overthinking.",
  "Consistency builds what motivation cannot.",
  "Perfection delays, execution teaches.",
  "Small steps, repeated daily, become something big.",
  "The work shapes you as much as you shape it.",
  "Focus on getting better, not getting noticed.",
  "Most things improve simply by being worked on.",
  "Discipline beats motivation every time.",
  "You don’t need more time, you need more focus.",
  "Done well beats done perfectly.",
  "Momentum is built, not found.",
  "Keep building, even when it’s messy.",
  "Growth feels slow until it isn’t.",
  "What you repeat, you become.",
  "Make it work, then make it better.",
  "Every version teaches something new.",
  "You’re closer than you think.",
  "Good work takes time. Great work takes consistency.",
  "Don’t wait for clarity — build into it.",
  "The difference is in showing up again.",
  "Ideas don’t change things, execution does.",
  "Stay in motion, results follow.",
  "What feels small today builds tomorrow.",
  "Keep going — that’s the edge.",
  "Nothing improves by staying untouched.",
];

let activeTimers = [];

const skillsProgress = [
  { name: "Python", value: 90 },
  { name: "Machine Learning", value: 84 },
  { name: "Backend Development (FastAPI, Flask)", value: 82 },
  { name: "Data Processing", value: 86 },
  { name: "Visualization (Plotly, Streamlit)", value: 80 },
  { name: "System Design Thinking", value: 78 },
  { name: "Problem Solving", value: 88 },
  { name: "Communication", value: 85 },
  { name: "Presentation", value: 83 },
];

const createSkillsProgressCard = () => {
  const row = document.createElement("div");
  row.className = "message-row assistant";

  const card = document.createElement("div");
  card.className = "message skills-message show";

  skillsProgress.forEach((skill) => {
    const item = document.createElement("div");
    item.className = "skill-item";

    const header = document.createElement("div");
    header.className = "skill-label";
    header.innerHTML = `<span>${skill.name}</span><span>${skill.value}%</span>`;

    const track = document.createElement("div");
    track.className = "skill-track";

    const fill = document.createElement("div");
    fill.className = "skill-fill";
    fill.style.setProperty("--target-width", `${skill.value}%`);

    track.appendChild(fill);
    item.appendChild(header);
    item.appendChild(track);
    card.appendChild(item);
  });

  row.appendChild(card);
  chatThread.appendChild(row);

  requestAnimationFrame(() => {
    card
      .querySelectorAll(".skill-fill")
      .forEach((bar) => bar.classList.add("animate"));
  });

  chatThread.scrollTop = chatThread.scrollHeight;
};

const createResumeDownloadCard = () => {
  const row = document.createElement("div");
  row.className = "message-row assistant";

  const card = document.createElement("div");
  card.className = "message resume-message show";

  const viewer = document.createElement("iframe");
  viewer.className = "resume-viewer";
  viewer.src = "resume.pdf";
  viewer.title = "Resume preview";

  const actions = document.createElement("div");
  actions.className = "resume-actions";

  const downloadBtn = document.createElement("a");
  downloadBtn.className = "resume-download";
  downloadBtn.href = "resume.pdf";
  downloadBtn.download = "Amir-Madoo-Resume.pdf";
  downloadBtn.textContent = "Download Resume";

  const openBtn = document.createElement("a");
  openBtn.className = "resume-download";
  openBtn.href = "resume.pdf";
  openBtn.target = "_blank";
  openBtn.rel = "noreferrer";
  openBtn.textContent = "Open in new tab";

  actions.append(downloadBtn, openBtn);
  card.append(viewer, actions);
  row.appendChild(card);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;
};

const renderCoffeeScreen = () => {
  clearTimers();
  fakeInput.value = "";
  chatThread.innerHTML = "";

  const card = document.createElement("section");
  card.className = "coffee-screen";

  const heading = document.createElement("h1");
  heading.className = "coffee-title";
  heading.textContent = "Buy me a coffee ☕";

  const subtext = document.createElement("p");
  subtext.className = "coffee-subtext";
  subtext.textContent =
    "If you liked what I’m building or found it useful, you can support it here. No pressure — just appreciated.";

  const supportBtn = document.createElement("button");
  supportBtn.className = "coffee-support-btn";
  supportBtn.type = "button";
  supportBtn.textContent = "Support my work";
  supportBtn.setAttribute("aria-label", "Support via Razorpay");
  supportBtn.addEventListener("click", () =>
    window.open(COFFEE_LINK, "_blank", "noopener,noreferrer"),
  );

  const footnote = document.createElement("p");
  footnote.className = "coffee-note";
  footnote.textContent = "More systems. More builds. Always evolving.";

  card.append(heading, subtext, supportBtn, footnote);
  chatThread.appendChild(card);
  fakeInputBar.classList.add("hidden");
};

const PROJECT_PLACEHOLDER_IMAGE =
  "https://placehold.co/960x540/171a24/e8ebf5?text=Project+Banner";
const PROJECT_BASE_URL = "https://github.com/amir-dev-flux?tab=repositories";

const projectCatalog = [
  {
    title: "AQUA-INTEL",
    description:
      "An end-to-end ML system predicting irrigation needs in arid climates using climate data. Focused on sustainability, water security, and AI-driven agriculture.",
    stack: "Python • ML • Data Processing",
    link: "https://github.com/amir-dev-flux/aqua-intel",
    image: "./assets/images/aqua-intel.png",
  },
  {
    title: "AI Career Coach",
    description:
      "Generates structured career plans based on user input. Built to simplify decision-making for non-technical users.",
    stack: "Flask • AI APIs • Backend",
    link: "https://ai-career-coach-zh2w.onrender.com",
    image: "./assets/images/ai-career-coach.png",
  },
  {
    title: "Heat Wave Prediction System",
    description:
      "A Streamlit-based app forecasting temperature trends and visualizing weather conditions across Indian cities, evolving towards heatwave prediction.",
    stack: "Streamlit • Plotly • Python",
    link: "https://github.com/amir-dev-flux/heat-wave-prediction-system",
    image: "./assets/images/heat-wave-prediction.png",
  },
  {
    title: "Personal Expense Analyzer",
    description:
      "Analyzes financial statements, categorizes transactions, and generates insights using Python and FastAPI.",
    stack: "FastAPI • Python • Data Processing",
    link: "https://github.com/amir-dev-flux/personal-expense-analyzer",
    image: "./assets/images/expense-analyzer.png",
  },
  {
    title: "Stealth Build 01",
    description:
      "A new build is currently in progress and will be published soon.",
    stack: "Coming Soon",
    comingSoon: true,
    image: PROJECT_PLACEHOLDER_IMAGE,
  },
  {
    title: "Stealth Build 02",
    description:
      "A new build is currently in progress and will be published soon.",
    stack: "Coming Soon",
    comingSoon: true,
    image: PROJECT_PLACEHOLDER_IMAGE,
  },
  {
    title: "Stealth Build 03",
    description:
      "A new build is currently in progress and will be published soon.",
    stack: "Coming Soon",
    comingSoon: true,
    image: PROJECT_PLACEHOLDER_IMAGE,
  },
  {
    title: "Stealth Build 04",
    description:
      "A new build is currently in progress and will be published soon.",
    stack: "Coming Soon",
    comingSoon: true,
    image: PROJECT_PLACEHOLDER_IMAGE,
  },
];

let projectVisibleCount = 4;

const createProjectImage = ({ imageSrc, title }) => {
  const image = document.createElement("div");
  image.className = "project-image";

  const media = document.createElement("img");
  media.className = "project-image-media";
  media.src = imageSrc || PROJECT_PLACEHOLDER_IMAGE;
  media.alt = `${title} project banner`;
  media.loading = "lazy";

  const overlay = document.createElement("div");
  overlay.className = "project-image-overlay";

  image.append(media, overlay);
  return image;
};

const createProjectCards = ({ start = 0, count = 4 } = {}) => {
  const row = document.createElement("div");
  row.className = "project-grid-row";

  const grid = document.createElement("div");
  grid.className = "project-grid";

  projectCatalog.slice(start, start + count).forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const image = createProjectImage({
      imageSrc: project.image,
      title: project.title,
    });

    const title = document.createElement("h4");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const stack = document.createElement("small");
    stack.textContent = project.stack;

    let cta;
    if (project.comingSoon) {
      cta = document.createElement("button");
      cta.type = "button";
      cta.className = "project-view";
      cta.textContent = "Coming Soon";
      cta.disabled = true;
    } else {
      cta = document.createElement("a");
      cta.className = "project-view";
      cta.href = project.link;
      cta.target = "_blank";
      cta.rel = "noreferrer";
      cta.textContent = "View";
      cta.setAttribute("aria-label", `View ${project.title}`);
    }

    card.append(image, title, description, stack, cta);
    grid.appendChild(card);
  });

  row.appendChild(grid);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;
};

const createCurrentWorkCard = () => {
  const row = document.createElement("div");
  row.className = "project-grid-row";

  const card = document.createElement("article");
  card.className = "project-card";

  const image = createProjectImage({
    imageSrc: PROJECT_PLACEHOLDER_IMAGE,
    title: "In Progress",
  });

  const title = document.createElement("h4");
  title.textContent = "Adaptive Multi-Agent Builder";

  const description = document.createElement("p");
  description.textContent =
    "A focused system for orchestrating autonomous workflows that learn from execution feedback.";

  const stack = document.createElement("small");
  stack.textContent = "Python · LLM Orchestration · FastAPI";

  const cta = document.createElement("button");
  cta.type = "button";
  cta.className = "project-view";
  cta.textContent = "Coming soon";
  cta.disabled = true;

  card.append(image, title, description, stack, cta);
  row.appendChild(card);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;
};

const renderInputPromptCard = ({
  placeholder,
  onSubmit,
  multiline = false,
}) => {
  const row = document.createElement("div");
  row.className = "message-row assistant";

  const card = document.createElement("div");
  card.className = "message contact-form-card show";

  const field = multiline
    ? document.createElement("textarea")
    : document.createElement("input");
  if (!multiline) field.type = "text";
  field.className = "contact-input";
  field.placeholder = placeholder;

  const submit = document.createElement("button");
  submit.type = "button";
  submit.className = "contact-submit";
  submit.textContent = "Continue";

  const handleSubmit = () => {
    const value = field.value.trim();
    if (!value) return;
    row.remove();
    createMessageBubble(value, { immediate: true, role: "user" });
    onSubmit(value);
  };

  submit.addEventListener("click", handleSubmit);
  field.addEventListener("keydown", (event) => {
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  });

  card.append(field, submit);
  row.appendChild(card);
  chatThread.appendChild(row);
  field.focus();
};

const triggerContactMailto = ({ name, topic, details }) => {
  const subject = encodeURIComponent("New Contact from Website");
  const body = encodeURIComponent(`Name: ${name}
Type: ${topic}
Message: ${details}`);
  const mailtoUrl = `mailto:amirmadoo4590@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;
};

const runContactMessageFlow = () => {
  const draft = { name: "", topic: "", details: "" };

  const askDetails = () => {
    createMessageBubble("Tell me a bit more", { immediate: true });
    renderInputPromptCard({
      placeholder: "Share a few details...",
      multiline: true,
      onSubmit: (details) => {
        draft.details = details;
        triggerContactMailto(draft);
        createMessageBubble(
          "Your message is ready to send — just hit send and I’ll take it from there.",
        );
        const optionsTimer = setTimeout(
          () => createSuggestionChips("contact"),
          620,
        );
        activeTimers.push(optionsTimer);
      },
    });
  };

  const askTopic = () => {
    createMessageBubble("What's this about?", { immediate: true });

    const row = document.createElement("div");
    row.className = "chip-row show";
    [
      "Work opportunity",
      "Project idea",
      "Collaboration",
      "Just saying hi",
    ].forEach((topic) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "suggestion-chip";
      btn.textContent = topic;
      btn.addEventListener("click", () => {
        row.remove();
        draft.topic = topic;
        createMessageBubble(topic, { immediate: true, role: "user" });
        askDetails();
      });
      row.appendChild(btn);
    });

    chatThread.appendChild(row);
  };

  createMessageBubble("Your name?", { immediate: true });
  renderInputPromptCard({
    placeholder: "Type your name",
    onSubmit: (name) => {
      draft.name = name;
      askTopic();
    },
  });
};

const clearTimers = () => {
  activeTimers.forEach((timerId) => clearTimeout(timerId));
  activeTimers = [];
};

const clearSuggestionChips = () => {
  chatThread.querySelectorAll(".chip-row").forEach((row) => row.remove());
};

const renderWelcomeScreen = () => {
  clearTimers();
  fakeInput.value = "";
  chatThread.innerHTML = "";

  const welcome = document.createElement("div");
  welcome.className = "welcome-screen";

  const headline = document.createElement("h2");
  headline.className = "welcome-headline";
  headline.innerHTML =
    'Nothing better than a quick chat, right? <span aria-hidden="true">☕</span>';

  const intro = document.createElement("p");
  intro.className = "welcome-intro";
  intro.textContent =
    "Hey, I’m Amir. If something here catches your attention, let’s talk — or just explore using the prompts below. I’ve kept it simple.";

  const contactCta = document.createElement("button");
  contactCta.type = "button";
  contactCta.className = "suggestion-chip welcome-cta";
  contactCta.textContent = "Contact me";
  contactCta.addEventListener("click", () => setActiveSection("contact"));

  const fluxBlock = document.createElement("section");
  fluxBlock.className = "flux-block";

  const fluxTitle = document.createElement("h2");
  fluxTitle.textContent = "Flux?";

  const fluxText = document.createElement("p");
  fluxText.textContent =
    "Flux is more than a name for me now — it’s how I build. Always evolving, never stuck, always improving.";

  const fluxButton = document.createElement("button");
  fluxButton.type = "button";
  fluxButton.className = "suggestion-chip";
  fluxButton.textContent = "Learn more";
  fluxButton.addEventListener("click", () => setActiveSection("flux"));

  fluxBlock.append(fluxTitle, fluxText, fluxButton);

  const heading = document.createElement("h3");
  heading.className = "welcome-title";
  heading.textContent = "How can I help you?";

  const actions = document.createElement("div");
  actions.className = "welcome-actions";

  welcomeActions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-chip welcome-chip";
    button.textContent = action.label;
    button.addEventListener("click", () => setActiveSection(action.section));
    actions.appendChild(button);
  });

  const quoteLabel = document.createElement("p");
  quoteLabel.className = "welcome-quote-label";
  quoteLabel.textContent = "Quote of the day";

  const quote = document.createElement("p");
  quote.className = "welcome-quote";
  quote.textContent = `“${welcomeQuotes[Math.floor(Math.random() * welcomeQuotes.length)]}”`;

  const coffeeBtn = document.createElement("button");
  coffeeBtn.type = "button";
  coffeeBtn.className = "suggestion-chip coffee-btn";
  coffeeBtn.textContent = "Buy me a coffee";
  coffeeBtn.addEventListener("click", () => setActiveSection("coffee"));

  welcome.append(
    headline,
    intro,
    contactCta,
    fluxBlock,
    heading,
    actions,
    quoteLabel,
    quote,
    coffeeBtn,
  );
  chatThread.appendChild(welcome);
  fakeInputBar.classList.add("hidden");
};

const createMessageBubble = (text, options = {}) => {
  const { immediate = false, firstLoad = false, role = "assistant" } = options;
  const row = document.createElement("div");
  row.className = `message-row ${role === "user" ? "user" : "assistant"}`;

  const bubble = document.createElement("div");

  if (immediate) {
    bubble.className = `message show ${role === "user" ? "user" : ""}`.trim();
    if (firstLoad) bubble.classList.add("first-load");
    bubble.textContent = text;
  } else {
    bubble.className = "message typing";
    bubble.innerHTML =
      '<span class="typing-dots"><span></span><span></span><span></span></span>';
  }

  row.appendChild(bubble);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;

  requestAnimationFrame(() => bubble.classList.add("show"));

  if (!immediate) {
    const typingDelay = setTimeout(() => {
      bubble.classList.remove("typing");
      bubble.textContent = text;
    }, 550);
    activeTimers.push(typingDelay);
  }
};

const createSuggestionChips = (sectionId) => {
  clearSuggestionChips();
  const section = sectionData[sectionId];
  if (!section?.options?.length) return;

  const row = document.createElement("div");
  row.className = "chip-row";

  section.options.forEach((option) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "suggestion-chip";
    chip.textContent = option.label;

    chip.addEventListener("click", () => {
      clearSuggestionChips();
      createMessageBubble(option.label, { immediate: true, role: "user" });

      if (sectionId === "contact" && option.action === "start_message") {
        const flowTimer = setTimeout(() => runContactMessageFlow(), 300);
        activeTimers.push(flowTimer);
        return;
      }

      if (sectionId === "contact" && option.action === "email_me") {
        const emailTimer = setTimeout(() => {
          createMessageBubble("Email me at: amirmadoo4590@gmail.com");
        }, 280);
        const optionsTimer = setTimeout(
          () => createSuggestionChips(sectionId),
          760,
        );
        activeTimers.push(emailTimer, optionsTimer);
        return;
      }

      if (sectionId === "contact" && option.action === "view_socials") {
        const socialsTimer = setTimeout(() => {
          createMessageBubble(`GitHub: https://github.com/amir-dev-flux
LinkedIn: https://www.linkedin.com/in/amir-dev-flux/
X: https://x.com/amirflux
Instagram: https://www.instagram.com/amir.dev.flux`);
        }, 280);
        const optionsTimer = setTimeout(
          () => createSuggestionChips(sectionId),
          760,
        );
        activeTimers.push(socialsTimer, optionsTimer);
        return;
      }

      if (option.action === "navigate" && option.target) {
        const navTimer = setTimeout(() => setActiveSection(option.target), 420);
        activeTimers.push(navTimer);
        return;
      }

      if (sectionId === "projects" && option.action === "show_more_projects") {
        const moreTimer = setTimeout(() => {
          const remaining = projectCatalog.length - projectVisibleCount;
          if (remaining > 0) {
            const batch = Math.min(4, remaining);
            createProjectCards({ start: projectVisibleCount, count: batch });
            projectVisibleCount += batch;
          } else {
            createMessageBubble(
              "You've seen all featured projects. More are on the way.",
            );
          }
        }, 280);

        const optionsTimer = setTimeout(
          () => createSuggestionChips(sectionId),
          760,
        );
        activeTimers.push(moreTimer, optionsTimer);
        return;
      }

      if (sectionId === "projects" && option.action === "current_work") {
        const workTimer = setTimeout(() => createCurrentWorkCard(), 280);
        const optionsTimer = setTimeout(
          () => createSuggestionChips(sectionId),
          760,
        );
        activeTimers.push(workTimer, optionsTimer);
        return;
      }

      const responseTimer = setTimeout(() => {
        createMessageBubble(option.response);
      }, 320);

      const optionsTimer = setTimeout(() => {
        createSuggestionChips(sectionId);
      }, 980);

      activeTimers.push(responseTimer, optionsTimer);
    });

    row.appendChild(chip);
  });

  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;
  requestAnimationFrame(() => row.classList.add("show"));
};

const renderSectionMessages = (sectionId, options = {}) => {
  const { initialLoad = false } = options;
  clearTimers();
  fakeInput.value = "";
  chatThread.innerHTML = "";

  const messages = sectionData[sectionId]?.messages || [];

  if (sectionId === "flux") {
    if (messages[0]) {
      createMessageBubble(messages[0], { immediate: true, firstLoad: true });
    }

    const chipsTimer = setTimeout(() => {
      createSuggestionChips(sectionId);
    }, 640);

    activeTimers.push(chipsTimer);
    return;
  }

  if (sectionId === "projects") {
    projectVisibleCount = 4;
    createProjectCards({ start: 0, count: 4 });

    const chipsTimer = setTimeout(() => {
      createSuggestionChips(sectionId);
    }, 420);

    activeTimers.push(chipsTimer);
    return;
  }

  if (sectionId === "skills") {
    if (messages[0]) {
      createMessageBubble(messages[0], { immediate: true, firstLoad: true });
    }

    const skillCardTimer = setTimeout(() => {
      createSkillsProgressCard();
    }, 260);

    const chipsTimer = setTimeout(() => {
      createSuggestionChips(sectionId);
    }, 720);

    activeTimers.push(skillCardTimer, chipsTimer);
    return;
  }

  if (sectionId === "resume") {
    if (messages[0]) {
      createMessageBubble(messages[0], { immediate: true, firstLoad: true });
    }

    const downloadTimer = setTimeout(() => {
      createResumeDownloadCard();
    }, 260);

    const chipsTimer = setTimeout(() => {
      createSuggestionChips(sectionId);
    }, 620);

    activeTimers.push(downloadTimer, chipsTimer);
    return;
  }

  if (sectionId === "coffee") {
    renderCoffeeScreen();
    return;
  }

  if (initialLoad && messages[0]) {
    createMessageBubble(messages[0], { immediate: true, firstLoad: true });

    messages.slice(1).forEach((message, index) => {
      const timerId = setTimeout(
        () => createMessageBubble(message),
        360 + index * 980,
      );
      activeTimers.push(timerId);
    });

    const chipsTimer = setTimeout(() => createSuggestionChips(sectionId), 620);
    activeTimers.push(chipsTimer);
    return;
  }

  messages.forEach((message, index) => {
    const timerId = setTimeout(
      () => createMessageBubble(message),
      240 + index * 920,
    );
    activeTimers.push(timerId);
  });

  const chipsTimer = setTimeout(() => createSuggestionChips(sectionId), 760);
  activeTimers.push(chipsTimer);
};

const setActiveSection = (sectionId) => {
  if (sectionId === "welcome") {
    navItems.forEach((item) => {
      const isActive = item.dataset.section === "welcome";
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-current", isActive ? "page" : "false");
    });
    title.textContent = "Welcome";
    renderWelcomeScreen();
    return;
  }

  if (sectionId !== "coffee") {
    fakeInputBar.classList.remove("hidden");
  }

  navItems.forEach((item) => {
    const isActive = item.dataset.section === sectionId;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-current", isActive ? "page" : "false");
  });

  const activeLabel = [...navItems].find(
    (item) => item.dataset.section === sectionId,
  )?.textContent;
  if (activeLabel) title.textContent = activeLabel;

  chatShell.classList.add("section-switching");
  const transitionTimer = setTimeout(() => {
    renderSectionMessages(sectionId);
    chatShell.classList.remove("section-switching");
  }, 220);
  activeTimers.push(transitionTimer);
};

const closeMobileMenu = () => {
  sidebar.classList.remove("open");
  document.body.classList.remove("menu-open");
};

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    setActiveSection(item.dataset.section);
    if (window.innerWidth <= 768) closeMobileMenu();
  });
});

menuToggle.addEventListener("click", () => {
  sidebar.classList.add("open");
  document.body.classList.add("menu-open");
});
closeSidebar.addEventListener("click", closeMobileMenu);
sidebarBackdrop.addEventListener("click", closeMobileMenu);
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeMobileMenu();
});

const applyTheme = (mode) => {
  const isLight = mode === "light";
  document.body.classList.toggle("light-mode", isLight);
  themeToggle.textContent = isLight ? "🌙 Dark mode" : "☀️ Light mode";
};

const savedTheme = localStorage.getItem("theme-preference");
if (savedTheme === "light" || savedTheme === "dark") {
  applyTheme(savedTheme);
} else {
  applyTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const nextMode = document.body.classList.contains("light-mode")
    ? "dark"
    : "light";
  applyTheme(nextMode);
  localStorage.setItem("theme-preference", nextMode);
});

setActiveSection("welcome");
