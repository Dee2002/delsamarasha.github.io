// script.js

// Initialize theme and scroll handlers when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Theme initialization
    initializeTheme();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Initialize project cards
    initializeProjectCards();
    
    // Navigation highlighting
    initializeNavHighlighting();
    
    // Smooth scrolling
    initializeSmoothScroll();
    
    // Initialize footer visibility
    handleFooterVisibility();
    
    // Add scroll event listener for footer
    window.addEventListener('scroll', debounce(handleFooterVisibility, 100));
    
    // Initialize logo confetti
    const logo = document.querySelector('.logo');
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'logo-confetti';
    logo.appendChild(confettiContainer);
    
    logo.addEventListener('mouseenter', createConfetti);
});

// Theme handling
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Theme toggle button handler
    document.querySelector('.theme-toggle').addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize project cards
function initializeProjectCards() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .blog-card');
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
    });
}

// Navigation highlighting
function initializeNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', debounce(() => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Smooth scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Handle footer visibility
function handleFooterVisibility() {
    const footer = document.querySelector('.footer');
    let lastScrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    // Show footer at the top
    if (window.scrollY === 0) {
        footer.classList.add('visible');
        footer.classList.remove('hidden');
        return;
    }
    
    // Show footer at the bottom
    if (window.scrollY + viewportHeight >= totalHeight - 10) {
        footer.classList.add('visible');
        footer.classList.remove('hidden');
        return;
    }
    
    // Hide footer while scrolling
    footer.classList.add('hidden');
    footer.classList.remove('visible');
}

// Add confetti effect for logo
function createConfetti(event) {
    const logo = event.target.closest('.logo');
    if (!logo) return;

    // Toggle DEV text
    logo.classList.add('dev-mode');
    setTimeout(() => logo.classList.remove('dev-mode'), 1500);

    const rect = logo.getBoundingClientRect();
    const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    const animations = ['flyTopRight', 'flyTopLeft', 'flyBottomRight', 'flyBottomLeft'];
    const colors = ['#2563eb', '#ec4899', '#60a5fa', '#8b5cf6'];

    // Create confetti in all directions
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('span');
        particle.textContent = 'dev';
        particle.className = 'confetti-particle';
        
        // Set initial position at center
        particle.style.left = `${center.x}px`;
        particle.style.top = `${center.y}px`;
        
        // Random color
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation from each direction
        const animationName = animations[i % animations.length];
        const duration = 0.8 + Math.random() * 0.4;
        particle.style.animation = `${animationName} ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => particle.remove(), duration * 1000);
    }
}

// Initialize once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', createConfetti);
    }
});