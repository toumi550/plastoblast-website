// JavaScript pour Plastoblast

document.addEventListener('DOMContentLoaded', function() {
    console.log('Plastoblast site loaded and ready.');
    // Déclaration du menu hamburger dès le début
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Smooth scroll for anchor links in navigation (if not handled by CSS scroll-behavior)
    // (Aucun code parasite ne doit écrire dans le DOM en dehors des animations prévues)
    document.querySelectorAll('header a[href^="#"], a[href^="products.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const targetId = href.substring(href.indexOf('#'));
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                 // Check if on a different page and needs to navigate first
                if (window.location.pathname.includes('products.html') || href.startsWith('products.html#')) {
                    // Already on products page or linking to it, just scroll
                    if(!window.location.pathname.includes('products.html')) {
                        // If on index.html linking to products.html#section
                        // Let the browser handle navigation first, then scroll on products.html load
                        // This part is tricky without full page reload or more complex SPA logic
                    } else {
                        e.preventDefault();
                        const headerOffset = document.querySelector('header').offsetHeight || 80; // Fallback offset
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                } else if (href.startsWith('#')) { // Same page anchor
                     e.preventDefault();
                    const headerOffset = document.querySelector('header').offsetHeight || 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Hamburger Menu Toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const iconPath = mobileMenuButton.querySelector('svg path');
            if (iconPath) {
                if (!mobileMenu.classList.contains('hidden')) {
                    // Menu is open, show X icon
                    iconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
                } else {
                    // Menu is closed, show hamburger icon
                    iconPath.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
                }
            }
        });
        // Ferme le menu mobile quand on clique sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const iconPath = mobileMenuButton.querySelector('svg path');
                if (iconPath) {
                    iconPath.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
                }
            });
        });
    }

    // Scroll-triggered animations + staggered reveal (fonctionne sur toutes les pages, sans redéclaration)
    (function() {
        const animatedElements = document.querySelectorAll('[data-animation], .scroll-initially-hidden');
        console.log('[DEBUG] Scroll reveal: éléments à animer trouvés =', animatedElements.length);
        if (animatedElements.length > 0) {
            if (!('IntersectionObserver' in window)) {
                console.error('[Scroll Reveal] IntersectionObserver non supporté sur ce navigateur.');
                return;
            }
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            let globalStagger = 0;
            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach((entry, idx) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        // staggered delay
                        let delay = el.getAttribute('data-delay') || (0.08 * idx + globalStagger) + 's';
                        el.style.setProperty('--stagger-delay', delay);
                        // Ajoute la classe d'animation spécifique si présente, sinon fadeInUp par défaut
                        const animClass = el.getAttribute('data-animation') || 'animate-fadeInUp';
                        el.classList.add(animClass, 'staggered-reveal');
                        el.classList.remove('scroll-initially-hidden');
                        observerInstance.unobserve(el);
                        globalStagger += 0.04;
                    }
                });
            }, observerOptions);
            animatedElements.forEach(el => {
                // Si déjà visible au chargement, applique l'animation immédiatement
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const animClass = el.getAttribute('data-animation') || 'animate-fadeInUp';
                    el.classList.add(animClass, 'staggered-reveal');
                    el.classList.remove('scroll-initially-hidden');
                } else {
                    observer.observe(el);
                }
            });
        }
    })();

    // Handle scrolling to section if URL has hash (e.g. from index.html to products.html#wall-supports)
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                const headerOffset = document.querySelector('header').offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100); // Timeout to ensure page is rendered
        }
    }

    // Loader animé
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 400);
        });
    }

    // Progress bar de scroll
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        if (scrollProgress) scrollProgress.style.width = progress + '%';
    });



    // Scroll-triggered animations + staggered reveal
    const animatedElements = document.querySelectorAll('[data-animation], .scroll-initially-hidden');
    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        let globalStagger = 0;
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // staggered delay
                    let delay = el.getAttribute('data-delay') || (0.08 * idx + globalStagger) + 's';
                    el.style.setProperty('--stagger-delay', delay);
                    el.classList.add('staggered-reveal');
                    el.classList.remove('scroll-initially-hidden');
                    observerInstance.unobserve(el);
                    globalStagger += 0.04;
                }
            });
        }, observerOptions);
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Parallax sur l'image principale (doit avoir la classe .parallax-img)
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            parallaxImg.style.transform = `translateY(${scrolled * 0.15}px)`;
        });
    }

    // Animation des compteurs (exemple pour les éléments avec .compteur-animé et data-target)
    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 60;
        function update() {
            current += increment;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        update();
    }
    const counters = document.querySelectorAll('.compteur-animé');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (!isNaN(target)) {
            const counterObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(counter, target);
                        obs.unobserve(counter);
                    }
                });
            }, { threshold: 0.8 });
            counterObserver.observe(counter);
        }
    });

});
