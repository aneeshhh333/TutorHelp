document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');

  if (menu && links) {
    const closeMenu = () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation');
    };

    const toggleMenu = () => {
      const isOpen = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    };

    menu.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    links.querySelectorAll('a:not(.students-link)').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (links.classList.contains('open') && !links.contains(event.target) && !menu.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });

    const studentCaret = links.querySelector('.students-caret');
    const studentDropdown = links.querySelector('.nav-dropdown');

    if (studentCaret && studentDropdown) {
      studentCaret.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const collapsed = studentDropdown.classList.toggle('collapsed');
        studentCaret.setAttribute('aria-expanded', String(!collapsed));
      });
    }
  }

  // Progressive-enhancement form handling. The normal FormSubmit action remains the fallback.
  document.querySelectorAll('form[data-formsubmit]').forEach((form) => {
    const button = form.querySelector('button[type="submit"]');
    const success = form.parentElement.querySelector('.form-success');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (form.dataset.submitting === 'true') return;

      form.dataset.submitting = 'true';
      if (button) {
        button.disabled = true;
        button.classList.add('form-submit-loading');
        button.dataset.originalText = button.textContent;
        button.textContent = 'Sending…';
      }

      try {
        const ajaxUrl = form.action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');
        const response = await fetch(ajaxUrl, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error('Form submission failed');

        if (success) {
          success.style.display = 'block';
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
      } catch (error) {
        // If AJAX is blocked by the browser/network, submit normally instead.
        form.dataset.submitting = 'false';
        form.submit();
        return;
      }

      form.dataset.submitting = 'false';
      if (button) {
        button.disabled = false;
        button.classList.remove('form-submit-loading');
        button.textContent = button.dataset.originalText || 'Book a Free Assessment';
      }
    });
  });
});