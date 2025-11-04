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
    contactForm.addEventListener('submit', function (e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent.trim() || 'Envoyer';

        // Vérifie si Netlify gère le formulaire
        const usesNetlify = this.hasAttribute('data-netlify') || this.hasAttribute('netlify');

        if (usesNetlify) {
            // Netlify va gérer → on ne bloque pas
            // Mais on donne un feedback visuel
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Optionnel : écouter la réponse Netlify (redirection ou erreur)
            // Netlify redirige automatiquement → rien à faire
            return;
        }

        // === MODE LOCAL SANS NETLIFY (simulation) ===
        e.preventDefault();

        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Message de succès
            const formMessage = document.createElement('div');
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.';
            formMessage.style.cssText = `
                background-color: #d4edda;
                color: #155724;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
                border: 1px solid #c3e6cb;
                opacity: 1;
                transition: opacity 0.5s ease;
            `;

            contactForm.appendChild(formMessage);
            contactForm.reset();

            // Restaure le bouton
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Disparition progressive du message
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => formMessage.remove(), 500);
            }, 4000);

        }, 1500);
    });
}
// À ajouter **après** le `if (usesNetlify)`
if (usesNetlify) {
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    // Écoute les erreurs Netlify (via data-netlify-success/error)
    const handleNetlifyResponse = () => {
        const url = new URL(window.location);
        if (url.searchParams.get('success') === 'true') {
            // Optionnel : message personnalisé
            showSuccessMessage();
        } else if (url.searchParams.get('error')) {
            showErrorMessage('Erreur lors de l’envoi. Veuillez réessayer.');
        }
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    };

    window.addEventListener('load', handleNetlifyResponse);
    return;
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