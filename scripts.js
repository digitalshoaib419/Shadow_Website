// ========== SHADOW Digital Marketing - scripts.js ==========

document.addEventListener('DOMContentLoaded', () => {

    // ========== HAMBURGER MENU ==========
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
            const spans = hamburger.querySelectorAll('span');
            if (nav.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }

    // ========== ACTIVE NAV LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ========== SCROLL ANIMATIONS ==========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // ========== CONTACT FORM SUBMISSION ==========
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '✓ Message Sent!';
                btn.style.background = '#22c55e';
                setTimeout(() => {
                    btn.textContent = original;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ========== STAT COUNTER ANIMATION ==========
    function animateCounter(el) {
        const target = el.textContent;
        const isPercent = target.includes('%');
        const isPlus = target.includes('+');
        const num = parseInt(target);
        let current = 0;
        const duration = 1500;
        const step = num / (duration / 16);

        const interval = setInterval(() => {
            current += step;
            if (current >= num) {
                current = num;
                clearInterval(interval);
            }
            el.textContent = Math.floor(current) + (isPlus ? '+' : '') + (isPercent ? '%' : '');
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h2s = entry.target.querySelectorAll('h2');
                h2s.forEach(h2 => animateCounter(h2));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats, .results-grid').forEach(el => statsObserver.observe(el));

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // WhatsApp Float Button
            document.body.insertAdjacentHTML('beforeend', `
  <a href="https://wa.me/917860346828" 
     class="whatsapp-float" 
     target="_blank" 
     aria-label="Chat on WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>
`);
        });
    });

});