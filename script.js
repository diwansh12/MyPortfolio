// Enhanced Portfolio JavaScript with Modern Features
class PortfolioManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.changeAboutMeText();
            this.initDarkMode();
            this.initProgressBars();
            this.initMobileNav();
            this.initSmoothScroll();
            this.initScrollAnimations();
            this.initContactForm();
            this.initNavbarScroll();
            this.initScrollToTop();
            this.initParticles();
            this.addLoadingAnimation();
        });
    }

    initializeComponents() {
        // Initialize intersection observers for performance
        this.setupIntersectionObservers();
    }

    // Enhanced Typing Animation for Hero Section
    changeAboutMeText() {
        const aboutMeTexts = [
            "UI/UX Designer", 
            "Full Stack Developer", 
            "DevOps Engineer",
            "Problem Solver",
            "Tech Enthusiast"
        ];
        
        const typingSpeed = 100;
        const eraseSpeed = 50;
        const pauseTime = 2000;
        const aboutMeElement = document.querySelector('.about-me');

        if (!aboutMeElement) return;

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = aboutMeTexts[textIndex];
            
            if (!isDeleting && charIndex < currentText.length) {
                aboutMeElement.textContent += currentText[charIndex];
                charIndex++;
                setTimeout(type, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                aboutMeElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, eraseSpeed);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    textIndex = (textIndex + 1) % aboutMeTexts.length;
                }
                setTimeout(type, pauseTime);
            }
        };

        type();
    }

    // Enhanced Dark Mode Toggle
    initDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (!darkModeToggle) return;

        // Check for saved theme preference or default to system preference
        const currentTheme = localStorage.getItem('theme') || 
            (prefersDarkScheme.matches ? 'dark-mode' : 'light-mode');
        
        if (currentTheme === 'dark-mode') {
            body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            
            // Update icon with smooth transition
            const icon = darkModeToggle.querySelector('i');
            icon.style.transform = 'scale(0)';
            
            setTimeout(() => {
                if (isDarkMode) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('theme', 'dark-mode');
                } else {
                    icon.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('theme', 'light-mode');
                }
                icon.style.transform = 'scale(1)';
            }, 150);
        });

        // Listen for system theme changes
        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    body.classList.add('dark-mode');
                    darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
                } else {
                    body.classList.remove('dark-mode');
                    darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
                }
            }
        });
    }

    // Enhanced Progress Bar Animation
    initProgressBars() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    const progress = progressBar.dataset.progress;
                    
                    // Add stagger animation
                    setTimeout(() => {
                        progressBar.style.setProperty('--progress', `${progress}%`);
                        progressBar.classList.add('animated');
                    }, 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skills = document.querySelectorAll('.skill');
        skills.forEach(skill => observer.observe(skill));
    }

    // Enhanced Mobile Navigation
    initMobileNav() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const body = document.body;

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            body.classList.toggle('menu-open');

            // Update ARIA attributes for accessibility
            navToggle.setAttribute('aria-expanded', !isActive);
            navMenu.setAttribute('aria-hidden', isActive);
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideNav = navToggle.contains(e.target) || navMenu.contains(e.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Enhanced Smooth Scrolling
    initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        const navbar = document.querySelector('.navbar');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    this.updateActiveNavLink(targetId);
                }
            });
        });
    }

    // Update Active Navigation Link
    updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // Enhanced Scroll Animations
    initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add stagger animation
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Add fade-in class to elements
        const animatedElements = document.querySelectorAll(
            'section, .project-card, .skill-category, .highlight, .stat-item, .contact-method'
        );
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Enhanced Contact Form
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;

        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Add real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => this.validateField(e.target));
            input.addEventListener('input', (e) => this.clearFieldError(e.target));
        });
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.validateForm(contactForm)) {
                await this.submitForm(contactForm);
            }
        });
    }

    // Form Validation
    validateField(field) {
        const value = field.value.trim();
        
        this.clearFieldError(field);
        
        if (!value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.name === 'message' && value.length < 10) {
            this.showFieldError(field, 'Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
        field.classList.add('error');
    }

    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced Form Submission
    async submitForm(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalHTML = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateFormSubmission(new FormData(form));
            
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = 'var(--success-color)';
            
            // Show success notification
            this.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            submitBtn.style.background = 'var(--danger-color)';
            
            this.showToast('Failed to send message. Please try again or contact me directly.', 'error');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate occasional errors for demo
                if (Math.random() > 0.9) {
                    reject(new Error('Network error'));
                } else {
                    resolve('Success');
                }
            }, 2000);
        });
    }

    // Enhanced Navbar Scroll Effect
    initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNavbar = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
                
                // Hide navbar on scroll down, show on scroll up
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    // Scroll to Top Button
    initScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);
        
        let ticking = false;
        
        const updateScrollButton = () => {
            if (window.scrollY > 500) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollButton);
                ticking = true;
            }
        });
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced Toast Notification System
    showToast(message, type = 'info', duration = 5000) {
        const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconClass = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        }[type] || 'fa-info-circle';
        
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${iconClass}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Auto remove after duration
        const removeToast = () => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        };
        
        // Close button functionality
        toast.querySelector('.toast-close').addEventListener('click', removeToast);
        
        // Auto remove after specified duration
        setTimeout(removeToast, duration);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    // Hero Particles Animation
    initParticles() {
        const heroSection = document.querySelector('header');
        if (!heroSection) return;

        const particlesContainer = heroSection.querySelector('.hero-particles');
        if (!particlesContainer) return;

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning and animation delay
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            
            particlesContainer.appendChild(particle);
        }

        // Add particle float animation keyframes
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes particleFloat {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Loading Animation
    addLoadingAnimation() {
        // Add initial loading state
        document.body.classList.add('loading');
        
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="loading-text">Loading Portfolio...</div>
            </div>
        `;
        
        document.body.appendChild(loadingOverlay);
        
        // Add loading styles
        if (!document.querySelector('#loading-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-styles';
            style.textContent = `
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    transition: opacity 0.5s ease, visibility 0.5s ease;
                }
                
                .loading-spinner {
                    text-align: center;
                    color: white;
                }
                
                .spinner-ring {
                    width: 60px;
                    height: 60px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top: 3px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                .loading-text {
                    font-size: 1.1rem;
                    font-weight: 500;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .loading-overlay.fade-out {
                    opacity: 0;
                    visibility: hidden;
                }
                
                body.loading {
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove loading overlay after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.classList.add('fade-out');
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                
                setTimeout(() => {
                    if (loadingOverlay.parentNode) {
                        loadingOverlay.remove();
                    }
                }, 500);
            }, 1000);
        });
    }

    // Setup Intersection Observers for Performance
    setupIntersectionObservers() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        }

        // Update active navigation link on scroll
        const sections = document.querySelectorAll('section[id]');
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.updateActiveNavLink(`#${entry.target.id}`);
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: '-80px 0px -50% 0px'
            }
        );

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // Utility Functions
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Analytics (Optional)
    trackEvent(eventName, eventData = {}) {
        // Add your analytics tracking code here
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        // Console log for development
        console.log('Event tracked:', eventName, eventData);
    }

    // Performance Monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                this.trackEvent('page_load_time', {
                    load_time: loadTime,
                    dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
                });
            });
        }
    }

    // Error Handling
    handleErrors() {
        window.addEventListener('error', (event) => {
            console.error('JavaScript Error:', event.error);
            this.showToast('An error occurred. Please refresh the page.', 'error');
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            event.preventDefault();
        });
    }

    // Initialize Enhanced Features
    initEnhancedFeatures() {
        this.measurePerformance();
        this.handleErrors();
        
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            // Press '/' to focus search (if you add search functionality)
            if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                // Focus search input if available
            }
            
            // Press Escape to close any open modals/menus
            if (e.key === 'Escape') {
                const activeMenu = document.querySelector('.nav-menu.active');
                if (activeMenu) {
                    activeMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // Add print styles optimization
        window.addEventListener('beforeprint', () => {
            document.body.classList.add('printing');
        });

        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
        });

        // PWA support detection
        if ('serviceWorker' in navigator) {
            console.log('Service Worker support detected');
            // You can register a service worker here for PWA functionality
        }

        // Add reduced motion support
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }
}

// Initialize portfolio manager when script loads
const portfolioManager = new PortfolioManager();

// Initialize enhanced features
portfolioManager.initEnhancedFeatures();

// Export for use in other scripts (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioManager;
}
