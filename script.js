document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Smooth Scrolling ---
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Offset for fixed header (80px)
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 2. Scroll-Based Fade-In Animation (Intersection Observer) ---
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animated class when the section enters the viewport
                entry.target.style.animation = 'fadeInSlideUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stop observing once it has been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly early
    });

    sections.forEach(section => {
        // Exclude the hero section from the observer since it needs to animate immediately on load
        if (section.id !== 'hero') {
            observer.observe(section);
        } else {
            // Animate the hero section immediately
            section.style.animation = 'fadeInSlideUp 1s ease-out forwards';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Custom Cursor Logic
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Grow cursor on links
document.querySelectorAll('a, .btn, .project-card').forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
});

const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (adjust the '20' to make it more or less dramatic)
        const rotateX = (y - centerY) / 10; 
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});
