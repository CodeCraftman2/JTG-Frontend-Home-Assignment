// Debug and utility functions
// const DEBUG = true; // Set to false in production

// function debugLog(message, data = null) {
//     if (DEBUG) {
//         if (data) {
//             console.log(`[DEBUG] ${message}`, data);
//         } else {
//             console.log(`[DEBUG] ${message}`);
//         }
//     }
// }

// function handleError(error, context) {
//     console.error(`[ERROR] ${context}:`, error);
//     if (DEBUG) {
//         // In debug mode, show user-friendly error message
//         alert(`An error occurred: ${context}. Check console for details.`);
//     }
// }

// Performance monitoring
// const performanceMetrics = {
//     pageLoadTime: 0,
//     interactions: 0
// };

// Video functionality
document.addEventListener('DOMContentLoaded', function() {
    // debugLog('DOM Content Loaded');
    // const startTime = performance.now();
    
    // Header scroll effect
    const header = document.querySelector('.header');
    // debugLog('Header element found:', !!header);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    const video = document.getElementById('heroVideo');
    const playButton = document.getElementById('playButton');
    const thumbnail = document.querySelector('.video-thumbnail');
    
    // debugLog('Video elements found:', {
    //     video: !!video,
    //     playButton: !!playButton,
    //     thumbnail: !!thumbnail
    // });
    
    if (video && playButton && thumbnail) {
        playButton.addEventListener('click', function() {
            // try {
            //     performanceMetrics.interactions++;
            //     debugLog('Play button clicked');
                
                if (video.style.display === 'none') {
                    // Show video and hide thumbnail
                    video.style.display = 'block';
                    thumbnail.style.display = 'none';
                    video.play().catch(error => {
                        // handleError(error, 'Video play failed');
                        // console.error('Video play failed:', error);
                    });
                    playButton.classList.add('hidden');
                } else if (video.paused) {
                    video.play().catch(error => {
                        // handleError(error, 'Video play failed');
                        // console.error('Video play failed:', error);
                    });
                    playButton.classList.add('hidden');
                } else {
                    video.pause();
                    playButton.classList.remove('hidden');
                }
            // } catch (error) {
            //     handleError(error, 'Video interaction');
            // }
        });
        
        video.addEventListener('click', function() {
            // try {
            //     performanceMetrics.interactions++;
                if (video.paused) {
                    video.play().catch(error => {
                        // handleError(error, 'Video play failed');
                        // console.error('Video play failed:', error);
                    });
                    playButton.classList.add('hidden');
                } else {
                    video.pause();
                    playButton.classList.remove('hidden');
                }
            // } catch (error) {
            //     handleError(error, 'Video click interaction');
            // }
        });
        
        video.addEventListener('ended', function() {
            // debugLog('Video ended');
            playButton.classList.remove('hidden');
        });
        
        video.addEventListener('pause', function() {
            // debugLog('Video paused');
            playButton.classList.remove('hidden');
        });
        
        video.addEventListener('play', function() {
            // debugLog('Video playing');
            playButton.classList.add('hidden');
        });
        
        // Add error handling for video
        video.addEventListener('error', function(e) {
            // handleError(e, 'Video error');
            // console.error('Video error:', e);
        });
    } else {
        // debugLog('Some video elements not found');
    }
    
    // Calculate page load time
    // performanceMetrics.pageLoadTime = performance.now() - startTime;
    // debugLog('Page load time:', `${performanceMetrics.pageLoadTime.toFixed(2)}ms`);
});

// Testimonials carousel with improved error handling
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

// debugLog('Testimonial elements found:', {
//     slides: slides.length,
//     dots: dots.length
// });

function showSlide(n) {
    // try {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // debugLog('Slide changed to:', currentSlide);
    // } catch (error) {
    //     handleError(error, 'Show slide');
    // }
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function startAutoSlide() {
    // try {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(nextSlide, 5000);
        // debugLog('Auto-slide started');
    // } catch (error) {
    //     handleError(error, 'Start auto-slide');
    // }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        // debugLog('Auto-slide stopped');
    }
}

// Initialize testimonials
if (slides.length > 0) {
    showSlide(currentSlide);
    startAutoSlide();
    
    // Add click listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // try {
            //     performanceMetrics.interactions++;
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoSlide();
                startAutoSlide(); // Restart auto-slide
                // debugLog('Dot clicked:', index);
            // } catch (error) {
            //     handleError(error, 'Dot click');
            // }
        });
    });
} else {
    // debugLog('No testimonial slides found');
}

// Contact form and modal with enhanced validation
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('successModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Function to show validation errors
function showValidationErrors(errors) {
    // Clear previous error messages
    clearValidationErrors();
    
    // Show errors for each field
    errors.forEach(error => {
        if (error.includes('Name')) {
            document.getElementById('name-error').textContent = error;
            document.getElementById('name').classList.add('error');
        } else if (error.includes('Email')) {
            document.getElementById('email-error').textContent = error;
            document.getElementById('email').classList.add('error');
        } else if (error.includes('Message')) {
            document.getElementById('message-error').textContent = error;
            document.getElementById('message').classList.add('error');
        }
    });
}

// Function to clear validation errors
function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    inputElements.forEach(element => {
        element.classList.remove('error');
    });
}

// debugLog('Contact form elements found:', {
//     form: !!contactForm,
//     modal: !!modal,
//     closeModal: !!closeModal,
//     modalCloseBtn: !!modalCloseBtn
// });

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation remains the same...
        
        // Show success modal
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Reset form
        contactForm.reset();
        clearValidationErrors();
    });
}

// Modal close functionality
function closeModalFunction() {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModalFunction);
}

if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModalFunction();
    }
});

// Real-time validation for contact form
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            const errorElement = document.getElementById(this.id + '-error');
            if (errorElement) {
                errorElement.textContent = '';
            }
            this.classList.remove('error');
        });
        
        input.addEventListener('blur', function() {
            // Validate on blur
            validateField(this);
        });
    });
}

// Function to validate individual fields
function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + '-error');
    
    if (!errorElement) return;
    
    // Clear previous error
    errorElement.textContent = '';
    field.classList.remove('error');
    
    // Validate based on field type
    if (field.id === 'name') {
        if (!value) {
            errorElement.textContent = 'Name is required';
            field.classList.add('error');
        } else if (value.length < 2) {
            errorElement.textContent = 'Name must be at least 2 characters';
            field.classList.add('error');
        }
    } else if (field.id === 'email') {
        if (!value) {
            errorElement.textContent = 'Email is required';
            field.classList.add('error');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorElement.textContent = 'Please enter a valid email address';
                field.classList.add('error');
            }
        }
    } else if (field.id === 'message') {
        if (!value) {
            errorElement.textContent = 'Message is required';
            field.classList.add('error');
        } else if (value.length < 10) {
            errorElement.textContent = 'Message must be at least 10 characters';
            field.classList.add('error');
        }
    }
}

// Newsletter form with enhanced validation
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // try {
        //     performanceMetrics.interactions++;
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                // alert('Please enter your email address');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                // alert('Please enter a valid email address');
                return;
            }
            
            // alert('Thank you for subscribing!');
            this.reset();
            // debugLog('Newsletter subscription successful');
            
        // } catch (error) {
        //     handleError(error, 'Newsletter subscription');
        // }
    });
}

// Smooth scrolling for navigation links with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // try {
        //     performanceMetrics.interactions++;
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // debugLog('Smooth scroll to:', this.getAttribute('href'));
            } else {
                // debugLog('Target not found for:', this.getAttribute('href'));
            }
        // } catch (error) {
        //     handleError(error, 'Smooth scrolling');
        // }
    });
});

// Mobile menu toggle with error handling
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// debugLog('Mobile menu elements found:', {
//     hamburger: !!hamburger,
//     navMenu: !!navMenu
// });

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // try {
        //     performanceMetrics.interactions++;
            // console.log('Hamburger clicked!');
            // console.log('Nav menu before toggle:', navMenu.classList.contains('active'));
            // console.log('Nav menu display before:', window.getComputedStyle(navMenu).display);
            
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // console.log('Nav menu after toggle:', navMenu.classList.contains('active'));
            // console.log('Nav menu display after:', window.getComputedStyle(navMenu).display);
            // console.log('Nav menu visibility after:', window.getComputedStyle(navMenu).visibility);
            // console.log('Nav menu opacity after:', window.getComputedStyle(navMenu).opacity);
            
            // Force the menu to be visible
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.visibility = 'visible';
                navMenu.style.opacity = '1';
                navMenu.style.zIndex = '10000';
                navMenu.style.position = 'fixed';
                navMenu.style.top = '60px';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.maxHeight = 'calc(100vh - 60px)';
                navMenu.style.overflowY = 'auto';
                navMenu.style.overflowX = 'hidden';
                navMenu.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(37, 43, 66, 0.9) 50%, rgba(0, 0, 0, 0.85) 100%)';
                navMenu.style.backdropFilter = 'blur(25px) saturate(180%)';
                navMenu.style.webkitBackdropFilter = 'blur(25px) saturate(180%)';
                // console.log('Forced menu to be visible');
            } else {
                navMenu.style.display = 'none';
                // console.log('Hid menu');
            }
            
            // debugLog('Mobile menu toggled');
        // } catch (error) {
        //     handleError(error, 'Mobile menu toggle');
        // }
    });
    
    // Add touch event for mobile devices
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // try {
        //     performanceMetrics.interactions++;
            // console.log('Hamburger touched!');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            // debugLog('Mobile menu toggled via touch');
        // } catch (error) {
        //     handleError(error, 'Mobile menu toggle touch');
        // }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            // Reset menu styles
            navMenu.style.display = 'none';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-slide, .partner-logo').forEach(el => {
    observer.observe(el);
});

// Form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to visible elements
    const visibleElements = document.querySelectorAll('.hero-content, .section-header');
    visibleElements.forEach(el => {
        el.classList.add('loading');
    });
    
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
    
    // Add debug button for mobile menu testing
    /*
    if (window.innerWidth <= 768) {
        const debugButton = document.createElement('button');
        debugButton.textContent = 'TEST MENU';
        debugButton.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 10000;
            background: red;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        debugButton.addEventListener('click', function() {
            // console.log('Debug button clicked');
            if (navMenu && hamburger) {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                if (navMenu.classList.contains('active')) {
                    navMenu.style.display = 'flex';
                    navMenu.style.visibility = 'visible';
                    navMenu.style.opacity = '1';
                    // console.log('Menu should be visible now');
                }
            }
        });
        document.body.appendChild(debugButton);
    }
    */
});

// Performance optimization
let ticking = false;
function updateOnScroll() {
    // Add scroll-based effects here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Error handling for video
const video = document.getElementById('heroVideo');
if (video) {
    video.addEventListener('error', function() {
        // console.warn('Video failed to load, showing thumbnail');
        const thumbnail = document.querySelector('.video-thumbnail');
        const playButton = document.getElementById('playButton');
        if (thumbnail && playButton) {
            thumbnail.style.display = 'block';
            video.style.display = 'none';
            playButton.classList.remove('hidden');
        }
    });
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        currentSlide--;
        showSlide(currentSlide);
        stopAutoSlide();
        startAutoSlide();
    } else if (e.key === 'ArrowRight') {
        currentSlide++;
        showSlide(currentSlide);
        stopAutoSlide();
        startAutoSlide();
    }
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background img');
    if (hero) {
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add smooth transitions for all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Glass effect for navbar on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});