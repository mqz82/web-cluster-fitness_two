/**
 * CLUSTER FITNESS - MAIN.JS
 * Funcionalidades: Navbar con scroll, animaciones con IntersectionObserver, menú mobile
 */

document.addEventListener('DOMContentLoaded', function () {

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
        menuToggle.addEventListener('click', function () {
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
        contactForm.addEventListener('submit', function (e) {
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
        anchor.addEventListener('click', function (e) {
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
        window.addEventListener('scroll', function () {
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


    /* ============================================
       MODAL DE ESPECIALISTA
       Muestra info del profesional al hacer click en service-card
    ============================================ */
    const serviceCards = document.querySelectorAll('.service-card[data-specialist]');
    const modal = document.getElementById('specialistModal');
    const modalClose = document.getElementById('modalClose');

    // Datos de especialistas (genéricos - reemplazar con datos reales)
    const specialistsData = {
        nutritionist: {
            name: 'Nutricionista María González Pérez',
            whatsapp: 'https://wa.me/56912345678',
            whatsappText: '+56 9 1234 5678',
            instagram: 'https://www.instagram.com/mqz82/',
            instagramText: '@maria.gonzalez.nutricion',
            svg: `<svg viewBox="0 0 64 64" width="70" height="70">
                    <path d="M36 8 C36 8, 44 4, 48 10 C52 16, 46 22, 42 20 C38 18, 36 12, 36 12 Z" fill="var(--color-primary)" opacity="0.8"/>
                    <path d="M36 12 L34 18" stroke="var(--color-primary)" stroke-width="2" fill="none"/>
                    <path d="M34 18 C20 18, 16 30, 16 36 C16 48, 26 54, 32 54 C38 54, 48 48, 48 36 C48 30, 44 18, 34 18 Z" fill="var(--color-accent)" opacity="0.6"/>
                    <path d="M34 18 C20 18, 16 30, 16 36 C16 48, 26 54, 32 54" fill="none" stroke="var(--color-primary)" stroke-width="2.5"/>
                    <path d="M34 18 C44 18, 48 30, 48 36 C48 48, 38 54, 32 54" fill="none" stroke="var(--color-primary)" stroke-width="2.5"/>
                    <path d="M24 28 C28 24, 30 26, 28 30" fill="none" stroke="var(--color-white)" stroke-width="2" opacity="0.5"/>
                </svg>`
        },
        kinesiology: {
            name: 'Kinesiólogo Carlos Ramírez Silva',
            whatsapp: 'https://wa.me/56987654321',
            whatsappText: '+56 9 8765 4321',
            instagram: 'https://www.instagram.com/mqz82/',
            instagramText: '@carlos.ramirez.kine',
            svg: `<svg viewBox="0 0 64 64" width="70" height="70">
                    <circle cx="32" cy="12" r="8" fill="none" stroke="var(--color-primary)" stroke-width="2.5"/>
                    <path d="M32 20 L32 38" stroke="var(--color-primary)" stroke-width="2.5" fill="none"/>
                    <path d="M20 28 L32 24 L44 28" stroke="var(--color-primary)" stroke-width="2.5" fill="none"/>
                    <path d="M32 38 L24 54 M32 38 L40 54" stroke="var(--color-primary)" stroke-width="2.5" fill="none"/>
                    <circle cx="28" cy="30" r="3" fill="var(--color-accent)" opacity="0.8"/>
                    <circle cx="36" cy="30" r="3" fill="var(--color-accent)" opacity="0.8"/>
                    <circle cx="32" cy="38" r="3" fill="var(--color-accent)" opacity="0.8"/>
                </svg>`
        },
        chiropractic: {
            name: 'Quiropráctico Andrés Muñoz López',
            whatsapp: 'https://wa.me/56911223344',
            whatsappText: '+56 9 1122 3344',
            instagram: 'https://www.instagram.com/mqz82/',
            instagramText: '@andres.munoz.quiro',
            svg: `<svg viewBox="0 0 64 64" width="70" height="70">
                    <rect x="28" y="8" width="8" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>
                    <rect x="27" y="18" width="10" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>
                    <rect x="26" y="28" width="12" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>
                    <rect x="25" y="38" width="14" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>
                    <rect x="27" y="48" width="10" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>
                    <circle cx="32" cy="34" r="5" fill="var(--color-accent)" opacity="0.7"/>
                    <path d="M30 34 L34 34 M32 32 L32 36" stroke="var(--color-white)" stroke-width="1.5"/>
                </svg>`
        }
    };

    // Función para abrir modal
    function openModal(specialistType) {
        const data = specialistsData[specialistType];
        if (!data) return;

        // Obtener la card que fue clickeada para extraer su info
        const card = document.querySelector(`.service-card[data-specialist="${specialistType}"]`);
        const serviceName = card.querySelector('h3').textContent;
        const serviceDesc = card.querySelector('p').textContent;

        // Poblar modal
        document.getElementById('modalIcon').innerHTML = data.svg;
        document.getElementById('modalServiceName').textContent = serviceName;
        document.getElementById('modalServiceDesc').textContent = serviceDesc;
        document.getElementById('specialistName').textContent = data.name;

        const whatsappLink = document.getElementById('specialistWhatsapp');
        whatsappLink.href = data.whatsapp;
        document.getElementById('specialistPhone').textContent = data.whatsappText;

        const instaLink = document.getElementById('specialistInstagram');
        instaLink.href = data.instagram;
        document.getElementById('specialistInsta').textContent = data.instagramText;

        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners para abrir modal
    serviceCards.forEach(card => {
        const specialistType = card.getAttribute('data-specialist');

        // Click
        card.addEventListener('click', () => openModal(specialistType));

        // Enter/Space para accesibilidad
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(specialistType);
            }
        });
    });

    // Cerrar modal con botón X
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer click fuera del contenido
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

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