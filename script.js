const navItems = document.querySelectorAll(".nav-item");
const title = document.getElementById("sectionTitle");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const chatThread = document.getElementById("chatThread");
const chatShell = document.querySelector(".chat-shell");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const fakeInput = document.getElementById("fakeInput");

const sectionData = {
  contact: {
    messages: [
      "Hey — I’m Amir. If you want to build something that ships, reach me at your@email.com.",
    ],
    options: [
      {
        label: "Hire me",
        response:
          "Great call — I turn ideas into usable products fast. Share your scope and timeline, and I’ll send a clear plan.",
      },
      {
        label: "See my work",
        response:
          "Absolutely. I can walk you through the work that delivered real outcomes — not just polished demos.",
      },
      {
        label: "Ask about skills",
        response:
          "My strengths are AI product engineering, clean front-end architecture, reliable APIs, and production-ready deployment.",
      },
    ],
  },
  about: {
    messages: [
      "I build systems that actually work — not projects that disappear on GitHub.",
    ],
    options: [
      {
        label: "Current focus",
        response:
          "Right now, I’m focused on production-grade AI assistants and automation that saves real time.",
      },
      {
        label: "Learning goals",
        response:
          "I’m sharpening LLM evaluation, backend reliability, and cloud deployment so what I build scales with confidence.",
      },
      {
        label: "Collaboration style",
        response:
          "I work with high clarity, fast feedback loops, and early shipping so momentum never stalls.",
      },
    ],
  },
  projects: {
    messages: [
      "Project 1: AI Career Coach — a practical guide that turns career goals into action.",
      "More high-impact builds are on the way.",
    ],
    options: [
      {
        label: "Project details",
        response:
          "AI Career Coach helps people define goals, practice interviews, and execute a focused plan that actually moves careers forward.",
      },
      {
        label: "Tech stack",
        response:
          "My stack is pragmatic: JavaScript, strong API design, and deployment workflows built for stability.",
      },
      {
        label: "Upcoming ideas",
        response:
          "Next: a smart portfolio assistant and a productivity co-pilot built for students, creators, and teams.",
      },
    ],
  },
};

let activeTimers = [];

const clearTimers = () => {
  activeTimers.forEach((timerId) => clearTimeout(timerId));
  activeTimers = [];
};

const clearSuggestionChips = () => {
  const chipRows = chatThread.querySelectorAll(".chip-row");
  chipRows.forEach((row) => row.remove());
};

const animateInputText = (textValue, onComplete) => {
  clearTimers();
  fakeInput.value = "";

  let i = 0;
  const typeNext = () => {
    if (i < textValue.length) {
      fakeInput.value += textValue[i];
      i += 1;
      const timerId = setTimeout(typeNext, 22);
      activeTimers.push(timerId);
      return;
    }

    const pauseTimer = setTimeout(() => {
      fakeInput.value = "";
      onComplete();
    }, 320);

    activeTimers.push(pauseTimer);
  };

  typeNext();
};

const welcomeActions = [
  { label: "View my projects", section: "projects" },
  { label: "Know about me", section: "about" },
  { label: "Hire me", section: "contact" },
];

const renderWelcomeScreen = () => {
  clearTimers();
  fakeInput.value = "";
  chatThread.innerHTML = "";

  const welcome = document.createElement("div");
  welcome.className = "welcome-screen";

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
    button.addEventListener("click", () => {
      animateInputText(action.label, () => {
        setActiveSection(action.section);
      });
    });
    actions.appendChild(button);
  });

  welcome.appendChild(heading);
  welcome.appendChild(actions);
  chatThread.appendChild(welcome);
};

const createMessageBubble = (text, options = {}) => {
  const { immediate = false, firstLoad = false } = options;
  const row = document.createElement("div");
  row.className = "message-row";

  const bubble = document.createElement("div");

  if (immediate) {
    bubble.className = "message show";
    if (firstLoad) {
      bubble.classList.add("first-load");
    }
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
  if (!section?.options?.length) {
    return;
  }

  const row = document.createElement("div");
  row.className = "chip-row";

  section.options.forEach((option) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "suggestion-chip";
    chip.textContent = option.label;

    chip.addEventListener("click", () => {
      animateInputText(option.label, () => {
        createMessageBubble(option.response);
      });
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

  if (initialLoad && messages[0]) {
    createMessageBubble(messages[0], { immediate: true, firstLoad: true });

    messages.slice(1).forEach((message, index) => {
      const timerId = setTimeout(
        () => {
          createMessageBubble(message);
        },
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
      () => {
        createMessageBubble(message);
      },
      240 + index * 920,
    );

    activeTimers.push(timerId);
  });

  const chipsTimer = setTimeout(() => createSuggestionChips(sectionId), 760);

  activeTimers.push(chipsTimer);
};

const switchSectionWithTransition = (sectionId) => {
  chatShell.classList.add("section-switching");

  const transitionTimer = setTimeout(() => {
    renderSectionMessages(sectionId);
    chatShell.classList.remove("section-switching");
  }, 220);

  activeTimers.push(transitionTimer);
};

const setActiveSection = (sectionId) => {
  navItems.forEach((item) => {
    const isActive = item.dataset.section === sectionId;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-current", isActive ? "page" : "false");
  });

  const activeLabel = [...navItems].find(
    (item) => item.dataset.section === sectionId,
  )?.textContent;

  if (activeLabel) {
    title.textContent = activeLabel;
  }

  switchSectionWithTransition(sectionId);
};

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const sectionId = item.dataset.section;
    setActiveSection(sectionId);

    if (window.innerWidth <= 768) {
      closeMobileMenu();
    }
  });
});

const closeMobileMenu = () => {
  sidebar.classList.remove("open");
  document.body.classList.remove("menu-open");
};

menuToggle.addEventListener("click", () => {
  sidebar.classList.add("open");
  document.body.classList.add("menu-open");
});

closeSidebar.addEventListener("click", () => {
  closeMobileMenu();
});

sidebarBackdrop.addEventListener("click", () => {
  closeMobileMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

navItems.forEach((item) => {
  item.classList.remove("active");
  item.setAttribute("aria-current", "false");
});

title.textContent = "Welcome";
renderWelcomeScreen();
