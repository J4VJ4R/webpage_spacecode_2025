// ===========================
// PARTICLES ANIMATION
// ===========================
class ParticlesAnimation {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            this.ctx.fill();
        });
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * force * 0.2;
                    particle.vy -= Math.sin(angle) * force * 0.2;
                }
            }
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Keep in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawParticles();
        this.connectParticles();
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    new ParticlesAnimation();
});

// ===========================
// NAVIGATION
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (currentScroll > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    lastScroll = currentScroll;
});

// Back to top functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// ACTIVE NAVIGATION
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// SCROLL ANIMATIONS (AOS Alternative)
// ===========================
const animatedElements = document.querySelectorAll('[data-aos]');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, delay);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(element => {
    observer.observe(element);
});

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `Hola! Mi nombre es ${name}.%0A%0AEmail: ${email}%0ATelefono: ${phone}%0A%0AMensaje: ${message}`;
        const whatsappURL = `https://wa.me/573144495813?text=${whatsappMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('¡Gracias! Te redirigiremos a WhatsApp para continuar la conversación.');
    });
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// PARALLAX EFFECT
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// MOUSE CURSOR EFFECT (Optional)
// ===========================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #667eea;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.15s ease-out;
    display: none;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Enlarge cursor on hover
const interactiveElements = document.querySelectorAll('a, button, .service-card, .product-card, .team-member');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = '#f093fb';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#667eea';
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

// ===========================
// LOADING ANIMATION
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const firstAnimations = document.querySelectorAll('[data-aos]');
        firstAnimations.forEach((element, index) => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, index * 100);
            }
        });
    }, 100);
});

// ===========================
// PERFORMANCE OPTIMIZATIONS
// ===========================
// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c🚀 SpaceCode Technologies', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cDesarrollado con ❤️ por SpaceCode', 'font-size: 14px; color: #64748b;');
console.log('%c¿Interesado en trabajar con nosotros? Visita: https://spacecode.com.co', 'font-size: 12px; color: #94a3b8;');

// ===========================
// ANALYTICS (Optional - Add your tracking code)
// ===========================
// Example: Google Analytics, Facebook Pixel, etc.
// Add your tracking codes here

// ===========================
// SERVICE WORKER (Optional - for PWA)
// ===========================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}

// ===========================
// FOOTER CODE ANIMATION
// ===========================
class FooterCodeAnimation {
    constructor() {
        this.canvas = document.getElementById('footer-code-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.columns = [];
        this.fontSize = 14;
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]()=/+-*&|!?@#$%^';
        this.characters += 'const let var function return class import export async await if else';
        
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    init() {
        this.resize();
        this.createColumns();
    }
    
    resize() {
        const footer = this.canvas.parentElement;
        this.canvas.width = footer.offsetWidth;
        this.canvas.height = footer.offsetHeight;
        this.cols = Math.floor(this.canvas.width / this.fontSize);
        this.createColumns();
    }
    
    createColumns() {
        this.columns = [];
        for (let i = 0; i < this.cols; i++) {
            this.columns[i] = {
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 0.5 + 0.3,
                length: Math.random() * 20 + 10
            };
        }
    }
    
    drawCode() {
        // Semi-transparent black to create fade effect
        this.ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw code characters
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];
            
            // Random character
            const char = this.characters.charAt(
                Math.floor(Math.random() * this.characters.length)
            );
            
            // Color gradient based on position
            const opacity = 1 - (column.y % column.length) / column.length;
            this.ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 0.8})`;
            
            // Draw character
            this.ctx.fillText(
                char,
                i * this.fontSize,
                column.y
            );
            
            // Move column down
            column.y += column.speed * this.fontSize;
            
            // Reset column if it goes off screen
            if (column.y > this.canvas.height && Math.random() > 0.975) {
                column.y = 0;
                column.speed = Math.random() * 0.5 + 0.3;
                column.length = Math.random() * 20 + 10;
            }
        }
    }
    
    animate() {
        this.drawCode();
        requestAnimationFrame(() => this.animate());
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
}

// Initialize footer code animation
document.addEventListener('DOMContentLoaded', () => {
    new FooterCodeAnimation();
});
