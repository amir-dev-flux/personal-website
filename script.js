const navItems = document.querySelectorAll('.nav-item');
const title = document.getElementById('sectionTitle');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const chatThread = document.getElementById('chatThread');
const chatShell = document.querySelector('.chat-shell');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

const sectionMessages = {
  contact: ["Hey, I'm Amir. You can reach me at: your@email.com"],
  about: [
    "I'm an IT engineering student building real-world AI systems and products.",
  ],
  projects: ['Project 1: AI Career Coach', 'More projects coming soon...'],
};

let activeTimers = [];

const clearTimers = () => {
  activeTimers.forEach((timerId) => clearTimeout(timerId));
  activeTimers = [];
};

const createMessageBubble = (text, options = {}) => {
  const { immediate = false, firstLoad = false } = options;
  const row = document.createElement('div');
  row.className = 'message-row';

  const bubble = document.createElement('div');

  if (immediate) {
    bubble.className = 'message show';
    if (firstLoad) {
      bubble.classList.add('first-load');
    }
    bubble.textContent = text;
  } else {
    bubble.className = 'message typing';
    bubble.textContent = '•••';
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

const renderSectionMessages = (sectionId, options = {}) => {
  const { initialLoad = false } = options;
  clearTimers();
  chatThread.innerHTML = '';

  const messages = sectionMessages[sectionId] || [];

  if (initialLoad && messages[0]) {
    createMessageBubble(messages[0], { immediate: true, firstLoad: true });

    messages.slice(1).forEach((message, index) => {
      const timerId = setTimeout(() => {
        createMessageBubble(message);
      }, 360 + index * 980);

      activeTimers.push(timerId);
    });

    return;
  }

  messages.forEach((message, index) => {
    const timerId = setTimeout(() => {
      createMessageBubble(message);
    }, 240 + index * 920);

    activeTimers.push(timerId);
  });
};

const switchSectionWithTransition = (sectionId) => {
  chatShell.classList.add('section-switching');

  const transitionTimer = setTimeout(() => {
    renderSectionMessages(sectionId);
    chatShell.classList.remove('section-switching');
  }, 220);

  activeTimers.push(transitionTimer);
};

const setActiveSection = (sectionId) => {
  navItems.forEach((item) => {
    const isActive = item.dataset.section === sectionId;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-current', isActive ? 'page' : 'false');
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
  item.addEventListener('click', () => {
    const sectionId = item.dataset.section;
    setActiveSection(sectionId);

    if (window.innerWidth <= 768) {
      closeMobileMenu();
    }
  });
});

const closeMobileMenu = () => {
  sidebar.classList.remove('open');
  document.body.classList.remove('menu-open');
};

menuToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
  document.body.classList.add('menu-open');
});

closeSidebar.addEventListener('click', () => {
  closeMobileMenu();
});

sidebarBackdrop.addEventListener('click', () => {
  closeMobileMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

navItems.forEach((item) => {
  const isContact = item.dataset.section === 'contact';
  item.classList.toggle('active', isContact);
  item.setAttribute('aria-current', isContact ? 'page' : 'false');
});

title.textContent = 'Contact';
renderSectionMessages('contact', { initialLoad: true });
