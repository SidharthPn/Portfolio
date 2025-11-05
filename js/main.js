// ===================================
// MAIN JAVASCRIPT - UPDATED
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // ===================================
    // Resume Download - UPDATED
    // ===================================
    function downloadResume() {
        // Create a mailto link for resume request
        const mailtoLink = 'mailto:sidharthpn447@gmail.com?subject=Resume%20Request&body=Hi%20Sidharth,%0A%0AI%20would%20like%20to%20request%20your%20resume.%0A%0AThank%20you!';
        
        // Show download notification
        showNotification('📧 Opening email client to request resume...', 'info');
        
        // Open mailto link
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 500);
    }

    // Attach download function to buttons
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadBtnAbout = document.getElementById('downloadBtnAbout');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResume);
    }
    
    if (downloadBtnAbout) {
        downloadBtnAbout.addEventListener('click', downloadResume);
    }

    // ===================================
    // Smooth Scrolling
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Active Navigation on Scroll
    // ===================================
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = document.querySelectorAll('.nav-links a');

    function setActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // ===================================
    // Scroll Reveal Animation
    // ===================================
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .experience-card, .cert-card');

    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('reveal', 'active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // ===================================
    // Contact Form Handling - UPDATED
    // ===================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Create mailto link with form data
        const mailtoLink = `mailto:sidharthpn447@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showNotification('✅ Opening email client...', 'success');

        // Reset form
        contactForm.reset();
    });

    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(0, 212, 255, 0.9)'};
            color: var(--darker);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInFromRight 0.3s ease-out;
            font-weight: 600;
            max-width: 350px;
        `;

        document.body.appendChild(notification);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutToRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutToRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ===================================
    // Dynamic Year in Footer
    // ===================================
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} Sidharth P N. All rights reserved.`;
    }

    // ===================================
    // Lazy Loading Images (if any)
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // Performance: Debounce Scroll Events
    // ===================================
    function debounce(func, wait = 10) {
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

    // Apply debounce to scroll events
    window.addEventListener('scroll', debounce(() => {
        setActiveNav();
        reveal();
    }, 10));

    
    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c👋 Hello Developer!', 'color: #00ff88; font-size: 24px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub: https://github.com/SidharthPn', 'color: #00d4ff; font-size: 14px;');
    console.log('%cLet\'s build something amazing together! 🚀', 'color: #ff0080; font-size: 14px;');
    console.log('%c📧 Contact: sidharthpn447@gmail.com', 'color: #00ff88; font-size: 14px;');

    // ===================================
    // Initialize
    // ===================================
    console.log('✅ Portfolio loaded successfully!');
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('👋 Welcome to Sidharth\'s Portfolio!', 'success');
    }, 1000);
});

// ===================================
// Additional Animations for slideOut
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutToRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: var(--darker);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s;
    }

    .notification-close:hover {
        opacity: 1;
    }

    .nav-links a.active {
        color: var(--primary);
    }
`;
document.head.appendChild(style);

// ===================================
// LOADING SCREEN
// ===================================

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after everything is loaded
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000); // Adjust timing as needed (2 seconds)
});

// Optional: Change character direction randomly
document.addEventListener('DOMContentLoaded', function() {
    const character = document.querySelector('.Character_spritesheet');
    if (character) {
        const directions = ['face-down', 'face-right', 'face-up', 'face-left'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        character.classList.add(randomDirection);
    }
});