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
    
    // Initialize testimonial slider
    initializeTestimonialSlider();
    
    // Initialize footer visibility
    handleFooterVisibility();
    
    // Add scroll event listener for footer
    window.addEventListener('scroll', debounce(handleFooterVisibility, 100));
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

// Testimonial slider
function initializeTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.transform = i === index ? 'translateX(0)' : 'translateX(100%)';
        });
    }
    
    // Auto advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Initial slide
    showSlide(0);
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