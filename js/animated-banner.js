// Script pour animer les bannières vertes avec des particules
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne toutes les bannières animées
    const banners = document.querySelectorAll('.animated-green-banner');
    
    banners.forEach(banner => {
        // Nombre de particules à créer - augmenté pour un effet plus riche
        const particleCount = 50;
        
        // Génère des particules pour chaque bannière
        for (let i = 0; i < particleCount; i++) {
            // Crée une particule
            const particle = document.createElement('div');
            particle.classList.add('animated-particle');
            
            // Taille aléatoire entre 5 et 20px
            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Position aléatoire dans la bannière
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Animation avec délai et durée aléatoires
            const delay = Math.random() * 5;
            const duration = Math.random() * 15 + 10;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // Ajout de la particule à la bannière
            banner.appendChild(particle);
        }
    });

    // Animation subtile pour les titres dans les bannières
    const titles = document.querySelectorAll('.animated-green-banner h2');
    titles.forEach(title => {
        title.classList.add('scroll-initially-hidden');
        title.setAttribute('data-animation', 'animate-fadeInUp');
    });

    // Animation pour les paragraphes dans les bannières
    const paragraphs = document.querySelectorAll('.animated-green-banner p');
    paragraphs.forEach((paragraph, index) => {
        paragraph.classList.add('scroll-initially-hidden');
        paragraph.setAttribute('data-animation', 'animate-fadeInUp');
        paragraph.style.setProperty('--stagger-delay', `${0.2 + index * 0.1}s`);
    });
});
