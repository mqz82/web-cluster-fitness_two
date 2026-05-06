/**
 * CLUSTER FITNESS - MAIN.JS
 * Funcionalidades: Navbar con scroll, animaciones con IntersectionObserver, menú mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================
       NAVBAR: transparente en top → fondo sólido al hacer scroll
       Scroll event listener
    ============================================ */
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 50;
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Verificar estado inicial
    
    
    /* ============================================
       MENÚ HAMBURGUESA
    ============================================ */
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Animar las líneas del menú
            const spans = menuToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    
    /* ============================================
       ANIMACIONES DE SCROLL
       IntersectionObserver nativo - cada sección entra con fade+slide
    ============================================ */
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Activa cuando el 10% del elemento es visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Agregar delay progresivo para efecto cascada
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    
    /* ============================================
       FORMULARIO DE CONTACTO
       Validación básica y simulación de envío
    ============================================ */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const discipline = document.getElementById('discipline').value;
            
            // Validación básica
            if (!name || !email) {
                alert('Por favor completa los campos obligatorios');
                return;
            }
            
            // Simular envío (aquí conectarías con un backend real)
            alert(`¡Gracias ${name}! Tu mensaje sobre ${discipline || 'nuestras disciplinas'} ha sido enviado. Te contactaremos pronto.`);
            
            // Limpiar formulario
            contactForm.reset();
        });
    }
    
    
    /* ============================================
       SUAVIZADO DE SCROLL PARA ANCLAS
       Compatibilidad con Safari
    ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    
    /* ============================================
       EFECTO DE PARALLAJE SUAVE EN EL HERO
       Solo en dispositivos que soporten transform
    ============================================ */
    const smokeEffect = document.querySelector('.smoke-effect');
    const smokeEffect2 = document.querySelector('.smoke-effect-2');
    
    if (smokeEffect && smokeEffect2) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            smokeEffect.style.transform = `translateY(${rate}px)`;
            smokeEffect2.style.transform = `translateY(${rate * 0.5}px)`;
        }, { passive: true });
    }
    
    
    /* ============================================
       Lazy loading para iframes (mapa)
       Mejorar rendimiento
    ============================================ */
    const mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe) {
        mapIframe.setAttribute('loading', 'lazy');
    }
    
});


/* ============================================
   POLYFILL PARA IntersectionObserver
   Solo si el navegador no lo soporta (muy antiguo)
============================================ */
if (!('IntersectionObserver' in window)) {
    // Cargar script externo de polyfill
    var script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    script.async = true;
    document.head.appendChild(script);
}