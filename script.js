document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Reveal au scroll pour TOUTES les sections via IntersectionObserver
    const sections = Array.from(document.querySelectorAll('section'));
    sections.forEach(s => s.classList.add('scroll-reveal'));
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target); // animation une seule fois
            }
        });
    }, { root: null, threshold: 0.12 });
    
    sections.forEach(s => observer.observe(s));
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Si Netlify est configuré sur le formulaire, ne pas empêcher la soumission
            const usesNetlify = this.hasAttribute('data-netlify') || this.hasAttribute('netlify');
            if (usesNetlify) {
                // Laisser Netlify intercepter la requête POST et rediriger vers success.html
                return;
            }

            // Sinon, ancien comportement de simulation (environnement local sans Netlify)
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.';
                formMessage.style.cssText = 'background-color: #d4edda; color: #155724; padding: 15px; margin-top: 20px; border-radius: 5px;';

                contactForm.appendChild(formMessage);
                contactForm.reset();

                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                setTimeout(() => {
                    formMessage.style.opacity = '0';
                    formMessage.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        formMessage.remove();
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }
    
    // Header sticky au scroll
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const headerHeight = header.offsetHeight;
        heroSection.style.paddingTop = `${headerHeight + 100}px`;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'white';
            }
        });
    }
});