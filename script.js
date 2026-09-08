const navItems = document.querySelectorAll('.nav-item');
const title = document.getElementById('sectionTitle');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const chatThread = document.getElementById('chatThread');
const chatShell = document.querySelector('.chat-shell');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const fakeInput = document.getElementById('fakeInput');
const fakeInputBar = document.querySelector('.fake-input-bar');
const themeToggle = document.getElementById('themeToggle');
const COFFEE_LINK = 'https://razorpay.me/@amirasimmadoo';

const sectionData = {
  projects: {
    messages: [],
    options: [
      { label: 'Show more', action: 'show_more_projects' },
      { label: 'View skills', action: 'navigate', target: 'skills' },
      { label: "What I'm building next", action: 'current_work' },
    ],
  },
  skills: {
    messages: [
      "Here is an overview of my technical skills categorized across software engineering, AI/ML, enterprise web, and cloud infrastructure.",
    ],
    options: [
      {
        label: 'View categorized stack',
        response: `• Languages: Python, SQL, JavaScript, HTML, CSS
• Software Engineering: FastAPI, REST APIs, PostgreSQL, Redis, Git, Linux, Docker
• AI / ML: Machine Learning, scikit-learn, PyTorch, Transformers, LLMs, RAG, Model Training & Evaluation
• Cloud: AWS, CI/CD, Application Deployment
• Enterprise: Adobe Experience Manager (AEM), Website Management, Agile / Scrum`,
      },
      {
        label: 'Where have you used these?',
        response: `• Enterprise Delivery -> Adobe Experience Manager (AEM), HTML, CSS, JavaScript, enterprise CI/CD release pipelines at Accenture.
• Backend Systems -> FastAPI REST APIs, PostgreSQL, Redis, Docker, and Linux environments.
• Applied AI/ML -> Machine Learning model training, scikit-learn, PyTorch, Transformers, and LLM RAG pipelines.
• Cloud Deployment -> Containerized deployments on AWS with automated CI/CD workflows.`,
      },
      {
        label: 'What are you focusing on next?',
        response:
          'Deepening production strength in Python backend systems, scalable FastAPI services, advanced RAG architectures, and cloud containerization on AWS.',
      },
      { label: 'View my projects', action: 'navigate', target: 'projects' },
    ],
  },
  about: {
    messages: [
      `I'm Amir Madoo, a Software Engineer based in Mumbai, India.

Currently, I serve as a Web Developer Associate at Accenture (Oct 2024 - Present), focusing on Adobe Experience Manager (AEM) for enterprise websites. My responsibilities include developing components and templates, managing digital assets, coordinating CI/CD deployments across development, staging, and production environments, and supporting live production fixes.

In parallel, I build practical backend architectures and AI/ML solutions, specializing in FastAPI REST services, machine learning model training, RAG pipelines, and cloud containerization with Docker and AWS.

I graduated with a Bachelor of Engineering in Information Technology from A.P. Shah Institute of Technology, Mumbai University in 2024.

I am looking to bring both my enterprise delivery discipline and hands-on technical skills to forward-thinking software engineering and AI/ML roles.`,
    ],
    options: [
      {
        label: 'Why hire me?',
        response:
          'I bring a proven blend of enterprise delivery experience at Accenture (AEM, enterprise CI/CD pipelines, production support, QA release validation, Agile/Scrum) and active technical capabilities in Python, FastAPI, machine learning systems, RAG pipelines, and cloud containerization.',
      },
      { label: 'View experience in resume', action: 'navigate', target: 'resume' },
      { label: 'Get in touch', action: 'navigate', target: 'contact' },
    ],
  },
  contact: {
    messages: [
      `Looking to connect regarding software engineering opportunities, AI/ML roles, or technical collaborations?

You can reach me directly via email, connect on LinkedIn, explore my GitHub repositories, or send a quick message right here.`,
    ],
    options: [
      { label: 'Start a message', action: 'start_message' },
      { label: 'Email me', action: 'email_me' },
      { label: 'View socials', action: 'view_socials' },
      { label: 'View resume', action: 'navigate', target: 'resume' },
    ],
  },
  resume: {
    messages: [
      'Here is a recruiter-ready summary of my professional experience, education, and technical competencies. You can preview or download the full PDF below.',
    ],
    options: [
      {
        label: 'View experience (Accenture)',
        response: `Accenture - Web Developer Associate
October 2024 - Present | Mumbai, India
• Worked on Adobe Experience Manager (AEM) for enterprise websites - using components, templates, and content workflows so business teams could manage pages and digital assets without needing engineering support.
• Worked with HTML, CSS, JavaScript, and AEM to support website development and content changes, adjusting layouts and styling where needed.
• Coordinated website updates and deployments across development, staging, and production environments using enterprise CI/CD pipelines.
• Investigated website issues, supported production fixes, and worked with QA and business teams through release cycles to get changes live.
• Participated in Agile / Scrum delivery, supporting development activities, testing, deployment, and post-release validation.`,
      },
      {
        label: 'View education',
        response: `Bachelor of Engineering - Information Technology
A.P. Shah Institute of Technology, Mumbai University | 2024`,
      },
      {
        label: 'Technical skills summary',
        response: `• Languages: Python, SQL, JavaScript, HTML, CSS
• Software Engineering: FastAPI, REST APIs, PostgreSQL, Redis, Git, Linux, Docker
• AI / ML: Machine Learning, scikit-learn, PyTorch, Transformers, LLMs, RAG, Model Training & Evaluation
• Cloud: AWS, CI/CD, Application Deployment
• Enterprise: Adobe Experience Manager (AEM), Website Management, Agile / Scrum`,
      },
    ],
  },
  coffee: {
    messages: [],
    options: [],
  },
};

const welcomeActions = [
  { label: 'Explore my projects', section: 'projects' },
  { label: 'Check my skills', section: 'skills' },
  { label: 'Get to know me', section: 'about' },
  { label: 'View my resume', section: 'resume' },
  { label: 'Reach out', section: 'contact' },
  { label: 'Support my work', section: 'coffee' },
];

const welcomeQuotes = [
  'Iteration beats perfection.',
  'You don’t get it right, you get it going.',
  'Version 1 builds momentum, not perfection.',
  'Start before you’re ready.',
  'Progress compounds over time.',
  'Clarity comes from action, not overthinking.',
  'Consistency builds what motivation cannot.',
  'Perfection delays, execution teaches.',
  'Make it work, then make it better.',
  'Stay in motion, results follow.',
  'Simplicity is prerequisite for reliability.',
  'First, solve the problem. Then, write the code.',
  'Experience is the name everyone gives to their mistakes.',
  'Small daily improvements over time lead to stunning results.',
  'Focus on solving real problems, not just building features.',
  'The best code is the code that delivers value reliably.',
  'Mastery is not an accident. It is the result of focused repetition.',
  'The secret of getting ahead is getting started.',
  'Quality is not an act, it is a habit.',
  'Ship early, learn faster, iterate constantly.',
  'A system that evolves is a system that survives.',
  'Clean code always looks like it was written by someone who cares.',
  'Discipline is choosing between what you want now and what you want most.',
  'Action expresses priorities.',
  'Great systems are built one solid component at a time.',
  'Measure twice, code once, test thoroughly.',
  'Curiosity is the engine of technical growth.',
  'Reliability is a feature you design from day one.',
  'What gets measured gets improved.',
  'The road to mastery has no shortcuts, only deliberate practice.',
];

let activeTimers = [];

const skillsProgress = [
  { name: 'Python, FastAPI & REST APIs', value: 92 },
  { name: 'Adobe Experience Manager (AEM)', value: 90 },
  { name: 'Machine Learning & RAG Architectures', value: 88 },
  { name: 'Enterprise Web (HTML, CSS, JavaScript)', value: 88 },
  { name: 'Git, Linux & Enterprise CI/CD', value: 86 },
  { name: 'PostgreSQL, Redis & SQL Databases', value: 84 },
  { name: 'Cloud & Containerization (Docker, AWS)', value: 82 },
  { name: 'Agile / Scrum Delivery', value: 90 },
];

const createSkillsProgressCard = () => {
  const row = document.createElement('div');
  row.className = 'message-row assistant';

  const card = document.createElement('div');
  card.className = 'message skills-message show';

  skillsProgress.forEach((skill) => {
    const item = document.createElement('div');
    item.className = 'skill-item';

    const header = document.createElement('div');
    header.className = 'skill-label';
    header.innerHTML = `<span>${skill.name}</span><span>${skill.value}%</span>`;

    const track = document.createElement('div');
    track.className = 'skill-track';

    const fill = document.createElement('div');
    fill.className = 'skill-fill';
    fill.style.setProperty('--target-width', `${skill.value}%`);

    track.appendChild(fill);
    item.appendChild(header);
    item.appendChild(track);
    card.appendChild(item);
  });

  row.appendChild(card);
  chatThread.appendChild(row);

  requestAnimationFrame(() => {
    card.querySelectorAll('.skill-fill').forEach((bar) => bar.classList.add('animate'));
  });

  chatThread.scrollTop = chatThread.scrollHeight;
};

const createResumeDownloadCard = () => {
  const row = document.createElement('div');
  row.className = 'message-row assistant';

  const card = document.createElement('div');
  card.className = 'message resume-message show';

  const frame = document.createElement('div');
  frame.className = 'modern-doc-frame';

  const headerBar = document.createElement('div');
  headerBar.className = 'doc-window-header';

  const windowControls = document.createElement('div');
  windowControls.className = 'doc-window-dots';
  windowControls.innerHTML = '<span></span><span></span><span></span>';

  const docTitle = document.createElement('div');
  docTitle.className = 'doc-window-title';
  docTitle.innerHTML = `
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
    <span>Amir-Madoo-Resume.pdf</span>
    <span class="doc-badge">Verified</span>
  `;

  const docPill = document.createElement('div');
  docPill.className = 'doc-window-pill';
  docPill.textContent = 'Accenture · 1+ Yrs Exp';

  headerBar.append(windowControls, docTitle, docPill);

  const viewerContainer = document.createElement('div');
  viewerContainer.className = 'doc-viewer-container';

  const viewer = document.createElement('iframe');
  viewer.className = 'resume-viewer';
  viewer.src = 'resume.pdf#toolbar=0&navpanes=0';
  viewer.title = 'Amir Madoo Resume Document Preview';

  viewerContainer.appendChild(viewer);

  const actions = document.createElement('div');
  actions.className = 'resume-actions';

  const downloadBtn = document.createElement('a');
  downloadBtn.className = 'resume-action-btn primary';
  downloadBtn.href = 'resume.pdf';
  downloadBtn.download = 'Amir-Madoo-Resume.pdf';
  downloadBtn.innerHTML = `
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    <span>Download Resume</span>
  `;

  const openBtn = document.createElement('a');
  openBtn.className = 'resume-action-btn secondary';
  openBtn.href = 'resume.pdf';
  openBtn.target = '_blank';
  openBtn.rel = 'noreferrer';
  openBtn.innerHTML = `
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
    <span>Open in New Tab</span>
  `;

  actions.append(downloadBtn, openBtn);
  frame.append(headerBar, viewerContainer, actions);
  card.appendChild(frame);
  row.appendChild(card);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;
};

const renderCoffeeScreen = () => {
  clearTimers();
  fakeInput.value = '';
  chatThread.innerHTML = '';

  const card = document.createElement('section');
  card.className = 'coffee-screen';

  const heading = document.createElement('h1');
  heading.className = 'coffee-title';
  heading.textContent = 'Buy me a coffee ☕';

  const subtext = document.createElement('p');
  subtext.className = 'coffee-subtext';
  subtext.textContent =
    'If you liked what I’m building or found it useful, you can support it here. No pressure - just appreciated.';

  const supportBtn = document.createElement('button');
  supportBtn.className = 'coffee-support-btn';
  supportBtn.type = 'button';
  supportBtn.textContent = 'Support my work';
  supportBtn.setAttribute('aria-label', 'Support via Razorpay');
  supportBtn.addEventListener('click', () => window.open(COFFEE_LINK, '_blank', 'noopener,noreferrer'));

  const footnote = document.createElement('p');
  footnote.className = 'coffee-note';
  footnote.textContent = 'More systems. More builds. Always evolving.';

  card.append(heading, subtext, supportBtn, footnote);
  chatThread.appendChild(card);
  fakeInputBar.classList.add('hidden');
};

const PROJECT_PLACEHOLDER_IMAGE =
  'https://placehold.co/960x540/171a24/e8ebf5?text=Project+Banner';
const PROJECT_BASE_URL = 'https://github.com/amir-madoo?tab=repositories';

const projectCatalog = [
  {
    title: 'AQUA-INTEL',
    description:
      'An end-to-end ML system predicting irrigation needs in arid climates using climate data. Focused on sustainability, water security, and AI-driven agriculture.',
    stack: 'Python • ML • Data Processing',
    link: 'https://github.com/amir-madoo/aqua-intel',
    image: './assets/images/aqua-intel.png',
  },
  {
    title: 'AI Career Coach',
    description:
      'Generates structured career plans based on user input. Built to simplify decision-making for non-technical users.',
    stack: 'Flask • AI APIs • Backend',
    link: 'https://ai-career-coach-zh2w.onrender.com',
    image: './assets/images/ai-career-coach.png',
  },
  {
    title: 'Heat Wave Prediction System',
    description:
      'A Streamlit-based app forecasting temperature trends and visualizing weather conditions across Indian cities, evolving towards heatwave prediction.',
    stack: 'Streamlit • Plotly • Python',
    link: 'https://github.com/amir-madoo/heat-wave-prediction-system',
    image: './assets/images/heat-wave-prediction.png',
  },
  {
    title: 'Personal Expense Analyzer',
    description:
      'Analyzes financial statements, categorizes transactions, and generates insights using Python and FastAPI.',
    stack: 'FastAPI • Python • Data Processing',
    link: 'https://github.com/amir-madoo/personal-expense-analyzer',
    image: './assets/images/expense-analyzer.png',
  },
  {
    title: 'Stealth Build 01',
    description: 'A new build is currently in progress and will be published soon.',
    stack: 'Coming Soon',
    comingSoon: true,
    image: PROJECT_PLACEHOLDER_IMAGE,
  },
  {
    title: 'Stealth Build 02',
    description: 'A new build is currently in progress and will be published soon.',
    stack: 'Coming Soon',
    comingSoon: true,
    image: PROJECT_PLACEHOLDER_IMAGE,
  },
  {
    title: 'Stealth Build 03',
    description: 'A new build is currently in progress and will be published soon.',
    stack: 'Coming Soon',
    comingSoon: true,
    image: PROJECT_PLACEHOLDER_IMAGE,
  },
  {
    title: 'Stealth Build 04',
    description: 'A new build is currently in progress and will be published soon.',
    stack: 'Coming Soon',
    comingSoon: true,
    image: PROJECT_PLACEHOLDER_IMAGE,
  },
];

let projectVisibleCount = 4;

const createProjectImage = ({ imageSrc, title }) => {
  const image = document.createElement('div');
  image.className = 'project-image';

  const media = document.createElement('img');
  media.className = 'project-image-media';
  media.src = imageSrc || PROJECT_PLACEHOLDER_IMAGE;
  media.alt = `${title} project banner`;
  media.loading = 'lazy';

  const overlay = document.createElement('div');
  overlay.className = 'project-image-overlay';

  image.append(media, overlay);
  return image;
};

const createProjectCards = ({ start = 0, count = 4 } = {}) => {
  const row = document.createElement('div');
  row.className = 'project-grid-row';

  const grid = document.createElement('div');
  grid.className = 'project-grid';

  projectCatalog.slice(start, start + count).forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const image = createProjectImage({ imageSrc: project.image, title: project.title });

    const title = document.createElement('h4');
    title.textContent = project.title;

    const description = document.createElement('p');
    description.textContent = project.description;

    const stack = document.createElement('small');
    stack.textContent = project.stack;

    let cta;
    if (project.comingSoon) {
      cta = document.createElement('button');
      cta.type = 'button';
      cta.className = 'project-view';
      cta.textContent = 'Coming Soon';
      cta.disabled = true;
    } else {
      cta = document.createElement('a');
      cta.className = 'project-view';
      cta.href = project.link;
      cta.target = '_blank';
      cta.rel = 'noreferrer';
      cta.textContent = 'View';
      cta.setAttribute('aria-label', `View ${project.title}`);
    }

    card.append(image, title, description, stack, cta);
    grid.appendChild(card);
  });

  row.appendChild(grid);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;
};

const createCurrentWorkCard = () => {
  const row = document.createElement('div');
  row.className = 'project-grid-row';

  const card = document.createElement('article');
  card.className = 'project-card';

  const image = createProjectImage({ imageSrc: PROJECT_PLACEHOLDER_IMAGE, title: 'In Progress' });

  const title = document.createElement('h4');
  title.textContent = 'Production Machine Learning Platform & Enterprise RAG';

  const description = document.createElement('p');
  description.textContent =
    'Building end-to-end ML training pipelines, FastAPI prediction services, and RAG architectures with LLM retrieval evaluation and AWS containerization.';

  const stack = document.createElement('small');
  stack.textContent = 'Python · FastAPI · PyTorch · Docker · AWS';

  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'project-view';
  cta.textContent = 'In Progress';
  cta.disabled = true;

  card.append(image, title, description, stack, cta);
  row.appendChild(card);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;
};

const renderInputPromptCard = ({ placeholder, onSubmit, multiline = false }) => {
  const row = document.createElement('div');
  row.className = 'message-row assistant';

  const card = document.createElement('div');
  card.className = 'message contact-form-card show';

  const field = multiline ? document.createElement('textarea') : document.createElement('input');
  if (!multiline) field.type = 'text';
  field.className = 'contact-input';
  field.placeholder = placeholder;

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'contact-submit';
  submit.textContent = 'Continue';

  const handleSubmit = () => {
    const value = field.value.trim();
    if (!value) return;
    row.remove();
    createMessageBubble(value, { immediate: true, role: 'user' });
    onSubmit(value);
  };

  submit.addEventListener('click', handleSubmit);
  field.addEventListener('keydown', (event) => {
    if (!multiline && event.key === 'Enter') {
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
  const subject = encodeURIComponent('New Contact from Portfolio Website');
  const body = encodeURIComponent(`Name: ${name}
Type: ${topic}
Message: ${details}`);
  const mailtoUrl = `mailto:amirmadoo4590@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;
};

const runContactMessageFlow = () => {
  const draft = { name: '', topic: '', details: '' };

  const askDetails = () => {
    createMessageBubble('Tell me a bit more about what you have in mind', { immediate: true });
    renderInputPromptCard({
      placeholder: 'Share a few details...',
      multiline: true,
      onSubmit: (details) => {
        draft.details = details;
        triggerContactMailto(draft);
        createMessageBubble('Your message is ready to send - your email app should open now.');
        const optionsTimer = setTimeout(() => createSuggestionChips('contact'), 620);
        activeTimers.push(optionsTimer);
      },
    });
  };

  const askTopic = () => {
    createMessageBubble("What's this about?", { immediate: true });

    const row = document.createElement('div');
    row.className = 'chip-row show';
    ['Work opportunity', 'Project idea', 'Collaboration', 'Just saying hi'].forEach((topic) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'suggestion-chip';
      btn.textContent = topic;
      btn.addEventListener('click', () => {
        row.remove();
        draft.topic = topic;
        createMessageBubble(topic, { immediate: true, role: 'user' });
        askDetails();
      });
      row.appendChild(btn);
    });

    chatThread.appendChild(row);
  };

  createMessageBubble('Your name?', { immediate: true });
  renderInputPromptCard({
    placeholder: 'Type your name',
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
  chatThread.querySelectorAll('.chip-row').forEach((row) => row.remove());
};

const renderWelcomeScreen = () => {
  clearTimers();
  fakeInput.value = '';
  chatThread.innerHTML = '';

  const welcome = document.createElement('div');
  welcome.className = 'welcome-screen';

  const statusPill = document.createElement('div');
  statusPill.className = 'status-pill';
  statusPill.innerHTML = '<span class="status-dot"></span><span>Open to Software Engineering & AI/ML Roles</span>';

  const headline = document.createElement('h2');
  headline.className = 'welcome-headline';
  headline.innerHTML = 'Welcome to my portfolio! <span class="wave-hand" aria-hidden="true">👋</span>';

  const intro = document.createElement('p');
  intro.className = 'welcome-intro';
  intro.textContent =
    "Hi, I'm Amir Madoo - Software Engineer & Web Developer Associate at Accenture with 1+ years of enterprise experience. I specialize in enterprise web solutions, Python backend development, FastAPI, and AI/ML systems. Explore my experience, technical skills, and projects below!";

  const contactCta = document.createElement('button');
  contactCta.type = 'button';
  contactCta.className = 'suggestion-chip welcome-cta';
  contactCta.textContent = 'Contact me';
  contactCta.addEventListener('click', () => setActiveSection('contact'));

  const heading = document.createElement('h3');
  heading.className = 'welcome-title';
  heading.textContent = 'How can I help you?';

  const actions = document.createElement('div');
  actions.className = 'welcome-actions';

  welcomeActions.forEach((action) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-chip welcome-chip';
    button.textContent = action.label;
    button.addEventListener('click', () => setActiveSection(action.section));
    actions.appendChild(button);
  });

  const quoteLabel = document.createElement('p');
  quoteLabel.className = 'welcome-quote-label';
  quoteLabel.textContent = 'Quote of the day';

  const quote = document.createElement('p');
  quote.className = 'welcome-quote';
  quote.textContent = `“${welcomeQuotes[Math.floor(Math.random() * welcomeQuotes.length)]}”`;

  const coffeeBtn = document.createElement('button');
  coffeeBtn.type = 'button';
  coffeeBtn.className = 'suggestion-chip coffee-btn';
  coffeeBtn.textContent = 'Buy me a coffee';
  coffeeBtn.addEventListener('click', () => setActiveSection('coffee'));

  welcome.append(statusPill, headline, intro, contactCta, heading, actions, quoteLabel, quote, coffeeBtn);
  chatThread.appendChild(welcome);
  fakeInputBar.classList.add('hidden');
};

const createMessageBubble = (text, options = {}) => {
  const { immediate = false, firstLoad = false, role = 'assistant' } = options;
  const row = document.createElement('div');
  row.className = `message-row ${role === 'user' ? 'user' : 'assistant'}`;

  const bubble = document.createElement('div');

  if (immediate) {
    bubble.className = `message show ${role === 'user' ? 'user' : ''}`.trim();
    if (firstLoad) bubble.classList.add('first-load');
    bubble.textContent = text;
  } else {
    bubble.className = 'message typing';
    bubble.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
  }

  row.appendChild(bubble);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;

  requestAnimationFrame(() => bubble.classList.add('show'));

  if (!immediate) {
    const typingDelay = setTimeout(() => {
      bubble.classList.remove('typing');
      bubble.textContent = text;
    }, 550);
    activeTimers.push(typingDelay);
  }
};

const createSuggestionChips = (sectionId) => {
  clearSuggestionChips();
  const section = sectionData[sectionId];
  if (!section?.options?.length) return;

  const row = document.createElement('div');
  row.className = 'chip-row';

  section.options.forEach((option) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'suggestion-chip';
    chip.textContent = option.label;

    chip.addEventListener('click', () => {
      clearSuggestionChips();
      createMessageBubble(option.label, { immediate: true, role: 'user' });

      if (sectionId === 'contact' && option.action === 'start_message') {
        const flowTimer = setTimeout(() => runContactMessageFlow(), 300);
        activeTimers.push(flowTimer);
        return;
      }

      if (sectionId === 'contact' && option.action === 'email_me') {
        const emailTimer = setTimeout(() => {
          createMessageBubble('Email me at: amirmadoo4590@gmail.com');
        }, 280);
        const optionsTimer = setTimeout(() => createSuggestionChips(sectionId), 760);
        activeTimers.push(emailTimer, optionsTimer);
        return;
      }

      if (sectionId === 'contact' && option.action === 'view_socials') {
        const socialsTimer = setTimeout(() => {
          createMessageBubble(`GitHub: https://github.com/amir-madoo
LinkedIn: https://www.linkedin.com/in/amir-madoo/
Email: amirmadoo4590@gmail.com`);
        }, 280);
        const optionsTimer = setTimeout(() => createSuggestionChips(sectionId), 760);
        activeTimers.push(socialsTimer, optionsTimer);
        return;
      }

      if (option.action === 'navigate' && option.target) {
        const navTimer = setTimeout(() => setActiveSection(option.target), 420);
        activeTimers.push(navTimer);
        return;
      }

      if (sectionId === 'projects' && option.action === 'show_more_projects') {
        const moreTimer = setTimeout(() => {
          const remaining = projectCatalog.length - projectVisibleCount;
          if (remaining > 0) {
            const batch = Math.min(4, remaining);
            createProjectCards({ start: projectVisibleCount, count: batch });
            projectVisibleCount += batch;
          } else {
            createMessageBubble("You've seen all featured projects. More are on the way.");
          }
        }, 280);

        const optionsTimer = setTimeout(() => createSuggestionChips(sectionId), 760);
        activeTimers.push(moreTimer, optionsTimer);
        return;
      }

      if (sectionId === 'projects' && option.action === 'current_work') {
        const workTimer = setTimeout(() => createCurrentWorkCard(), 280);
        const optionsTimer = setTimeout(() => createSuggestionChips(sectionId), 760);
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
  requestAnimationFrame(() => row.classList.add('show'));
};

const renderSectionMessages = (sectionId, options = {}) => {
  const { initialLoad = false } = options;
  clearTimers();
  fakeInput.value = '';
  chatThread.innerHTML = '';

  const messages = sectionData[sectionId]?.messages || [];

  if (sectionId === 'projects') {
    projectVisibleCount = 4;
    createProjectCards({ start: 0, count: 4 });

    const chipsTimer = setTimeout(() => {
      createSuggestionChips(sectionId);
    }, 420);

    activeTimers.push(chipsTimer);
    return;
  }

  if (sectionId === 'skills') {
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

  if (sectionId === 'resume') {
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

  if (sectionId === 'coffee') {
    renderCoffeeScreen();
    return;
  }

  if (initialLoad && messages[0]) {
    createMessageBubble(messages[0], { immediate: true, firstLoad: true });

    messages.slice(1).forEach((message, index) => {
      const timerId = setTimeout(() => createMessageBubble(message), 360 + index * 980);
      activeTimers.push(timerId);
    });

    const chipsTimer = setTimeout(() => createSuggestionChips(sectionId), 620);
    activeTimers.push(chipsTimer);
    return;
  }

  messages.forEach((message, index) => {
    const timerId = setTimeout(() => createMessageBubble(message), 240 + index * 920);
    activeTimers.push(timerId);
  });

  const chipsTimer = setTimeout(() => createSuggestionChips(sectionId), 760);
  activeTimers.push(chipsTimer);
};

const setActiveSection = (sectionId) => {
  if (sectionId === 'welcome') {
    navItems.forEach((item) => {
      const isActive = item.dataset.section === 'welcome';
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
    title.textContent = 'Welcome';
    renderWelcomeScreen();
    return;
  }

  if (sectionId !== 'coffee') {
    fakeInputBar.classList.remove('hidden');
  }

  navItems.forEach((item) => {
    const isActive = item.dataset.section === sectionId;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  const activeLabel = [...navItems].find((item) => item.dataset.section === sectionId)?.textContent;
  if (activeLabel) title.textContent = activeLabel;

  chatShell.classList.add('section-switching');
  const transitionTimer = setTimeout(() => {
    renderSectionMessages(sectionId);
    chatShell.classList.remove('section-switching');
  }, 220);
  activeTimers.push(transitionTimer);
};

const closeMobileMenu = () => {
  sidebar.classList.remove('open');
  document.body.classList.remove('menu-open');
};

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    setActiveSection(item.dataset.section);
    if (window.innerWidth <= 768) closeMobileMenu();
  });
});

menuToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
  document.body.classList.add('menu-open');
});
closeSidebar.addEventListener('click', closeMobileMenu);
sidebarBackdrop.addEventListener('click', closeMobileMenu);
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMobileMenu();
});

const applyTheme = (mode) => {
  const isLight = mode === 'light';
  document.body.classList.toggle('light-mode', isLight);
  themeToggle.textContent = isLight ? '🌙 Dark mode' : '☀️ Light mode';
};

const savedTheme = localStorage.getItem('theme-preference');
if (savedTheme === 'light' || savedTheme === 'dark') {
  applyTheme(savedTheme);
} else {
  applyTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const nextMode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
  applyTheme(nextMode);
  localStorage.setItem('theme-preference', nextMode);
});

setActiveSection('welcome');
