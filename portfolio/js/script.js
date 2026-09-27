/**
 * PORTFOLIO CLIENT-SIDE INTERACTIVITY
 * Author: Hoang An | Software Engineering Student
 * Features: Typewriter effect, dynamic terminal runner, navbar scroll detection,
 *           copy email to clipboard, and project modal enhancements.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. NAVBAR SCROLL EFFECT
  // =========================================================================
  const navbar = document.querySelector('.custom-navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Toggle navbar style on scroll
    if (scrollY > 30) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    // Toggle Back to Top button
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top click event
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 2. HERO SUBTITLE TYPEWRITER EFFECT
  // =========================================================================
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      'Backend Developer',
      'Java Developer',
      'Software Engineering Student'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseDelay = 1800;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = 400;
      }

      setTimeout(typeEffect, timeout);
    }

    typeEffect();
  }

  // =========================================================================
  // 3. INTERACTIVE TERMINAL SIMULATOR ("Code. Learn. Build. Repeat.")
  // =========================================================================
  const terminalBody = document.getElementById('terminal-content');
  const terminalBtns = document.querySelectorAll('.btn-terminal-cmd');

  const commandResponses = {
    'git status': [
      { text: '$ git status', class: 'cmd-prompt-line' },
      { text: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges to be committed:\n  modified:   BackendArchitecture.java\n  new file:   DatabaseSchema.sql\n\n> Building new projects with passion...', class: 'info' }
    ],
    'java Developer.java': [
      { text: '$ java Developer.java', class: 'cmd-prompt-line' },
      { text: 'Compiling Developer.java...\n[INFO] Initializing JVM 17 (Eclipse Temurin)...\n[INFO] Loading dependencies: Spring Boot 3.2, JPA, SQL Server Driver\n[SUCCESS] Hoang An initialized: Learning backend development & building clean APIs.', class: 'success' }
    ],
    'git commit -m "keep learning"': [
      { text: '$ git commit -m "keep learning"', class: 'cmd-prompt-line' },
      { text: '[main a8f3c21] keep learning\n 3 files changed, 142 insertions(+), 8 deletions(-)\n> Successfully committed to continuous self-improvement.', class: 'success' }
    ],
    'mvn test': [
      { text: '$ mvn test', class: 'cmd-prompt-line' },
      { text: '[INFO] -------------------------------------------------------\n[INFO]  T E S T S\n[INFO] -------------------------------------------------------\n[INFO] Running com.hoangan.service.ReservationServiceTest\n[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0\n[INFO] BUILD SUCCESS (Time: 1.452 s)', class: 'success' }
    ],
    'cat goals.txt': [
      { text: '$ cat goals.txt', class: 'cmd-prompt-line' },
      { text: '1. Master Spring Boot ecosystem & Microservices design.\n2. Build high-performance, well-indexed database schemas.\n3. Secure a high-impact Software Engineering Internship.\n4. Write clean, readable, self-documenting code.', class: 'info' }
    ]
  };

  terminalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd && commandResponses[cmd] && terminalBody) {
        const responseData = commandResponses[cmd];

        // Append execution to terminal
        const promptDiv = document.createElement('div');
        promptDiv.className = 'cmd-line mt-3';
        promptDiv.innerHTML = `<span class="cmd-prompt">an@fpt-se:~$</span><span class="cmd-text">${cmd}</span>`;

        const outputDiv = document.createElement('div');
        outputDiv.className = `cmd-output ${responseData[1].class}`;
        outputDiv.style.whiteSpace = 'pre-line';
        outputDiv.textContent = responseData[1].text;

        terminalBody.appendChild(promptDiv);
        terminalBody.appendChild(outputDiv);

        // Auto-scroll to bottom of terminal
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  });

  // Clear terminal button if present
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  if (clearTerminalBtn && terminalBody) {
    clearTerminalBtn.addEventListener('click', () => {
      terminalBody.innerHTML = `
        <div class="cmd-line">
          <span class="cmd-prompt">an@fpt-se:~$</span>
          <span class="cmd-text">git status</span>
        </div>
        <div class="cmd-output info">
          &gt; Building new projects...
        </div>

        <div class="cmd-line">
          <span class="cmd-prompt">an@fpt-se:~$</span>
          <span class="cmd-text">java Developer.java</span>
        </div>
        <div class="cmd-output info">
          &gt; Learning backend development...
        </div>

        <div class="cmd-line">
          <span class="cmd-prompt">an@fpt-se:~$</span>
          <span class="cmd-text">git commit -m "keep learning"</span>
        </div>
        <div class="cmd-output success">
          &gt; Successfully committed.
        </div>
      `;
    });
  }

  // =========================================================================
  // 4. COPY EMAIL TO CLIPBOARD
  // =========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const emailToCopy = 'anphan622@gmail.com';
      navigator.clipboard.writeText(emailToCopy).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="bi bi-check-lg text-success"></i> Copied!';
        copyEmailBtn.classList.add('btn-light');

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.classList.remove('btn-light');
        }, 2200);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // =========================================================================
  // 5. CONTACT FORM CLIENT-SIDE INTERACTION
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check form validity using HTML5 validation
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      // Simulate sending state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('d-none');
          // Smooth scroll to alert
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        contactForm.reset();
        contactForm.classList.remove('was-validated');

        // Hide success alert after 6 seconds
        setTimeout(() => {
          if (formSuccessAlert) {
            formSuccessAlert.classList.add('d-none');
          }
        }, 6000);
      }, 900);
    });
  }

  // =========================================================================
  // 6. AUTO-CLOSE MOBILE NAVBAR ON LINK CLICK
  // =========================================================================
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // =========================================================================
  // 7. INITIALIZE BOOTSTRAP TOOLTIPS
  // =========================================================================
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

});
