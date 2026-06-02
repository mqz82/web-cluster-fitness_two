/**
 * CLUSTER FITNESS - MAIN.JS v2
 * Navbar scroll, animations, Instagram embeds, mouse tracking, mobile menu
 */

/* ============================================
   INSTAGRAM CONFIG
   ⚠️ REEMPLAZA estos shortcodes con los códigos reales de tus posts
   Puedes obtenerlos de la URL de cada post/reel de Instagram:
   https://www.instagram.com/reel/SHORTCODE/
   https://www.instagram.com/p/SHORTCODE/
   ============================================ */
var INSTAGRAM_CONFIG = {
    // Videos en la sección "Míranos en Acción" (reels o posts con video)
    // type: 'reel' para reels, 'post' para publicaciones con video
    reels: [
        { type: 'post', shortcode: 'DXZqTwkDlHE', caption: 'WOD del dia' },
        { type: 'reel', shortcode: 'DYAqZt-OiBy', caption: 'Nueva clase GAP' },
        { type: 'reel', shortcode: '' }
    ].filter(function (s) { return s.shortcode.length > 0; }),

    // Posts del feed - aparecen en la sección "Nuestra Comunidad"
    posts: [
        'DXZqTwkDlHE',  // Post 1
        'DVqva_dET5f',             // Reemplazar con shortcode del post 2
        'DVoITMwDksd',             // Reemplazar con shortcode del post 3
        '',             // Reemplazar con shortcode del post 4
        '',             // Reemplazar con shortcode del post 5
        ''              // Reemplazar con shortcode del post 6
    ].filter(function (s) { return s.length > 0; }),
};

document.addEventListener('DOMContentLoaded', function () {

    /* ============================================
       GENERAR VIDEO CARDS DE INSTAGRAM (nativas)
       Sin iframes: cards con icono play + click a Instagram
    ============================================ */
    var reelsGrid = document.getElementById('reelsGrid');

    function buildReelCard(item) {
        var urlBase = item.type === 'reel' ? 'https://www.instagram.com/reel/' : 'https://www.instagram.com/p/';
        var instagramUrl = urlBase + item.shortcode + '/';
        var isReel = item.type === 'reel';
        var caption = item.caption || '';

        var card = document.createElement('a');
        card.className = 'reel-card';
        card.setAttribute('data-animate', '');
        card.href = instagramUrl;
        card.target = '_blank';
        card.rel = 'noopener';
        card.setAttribute('aria-label', (isReel ? 'Ver reel' : 'Ver video') + ' en Instagram');

        card.innerHTML =
            '<div class="reel-play-btn">' +
                '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>' +
            '</div>' +
            '<div class="reel-card-info">' +
                '<span class="reel-card-badge' + (isReel ? ' reel-badge-reel' : '') + '">' + (isReel ? 'Reel' : 'Video') + '</span>' +
                (caption ? '<p class="reel-card-caption">' + caption + '</p>' : '') +
            '</div>';

        reelsGrid.appendChild(card);
    }

    if (reelsGrid && INSTAGRAM_CONFIG.reels.length > 0) {
        INSTAGRAM_CONFIG.reels.forEach(function (item) {
            buildReelCard(item);
        });
    } else if (reelsGrid) {
        for (var r = 0; r < 3; r++) {
            var card = document.createElement('div');
            card.className = 'reel-card';
            card.setAttribute('data-animate', '');
            card.innerHTML = '<div class="reel-play-btn">' +
                '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>' +
                '</div>' +
                '<div class="reel-card-info">' +
                    '<span class="reel-card-badge">Video</span>' +
                    '<p class="reel-card-caption">Agrega tus reels en main.js</p>' +
                '</div>';
            reelsGrid.appendChild(card);
        }
    }

    /* ============================================
       GENERAR EMBEDS DE INSTAGRAM GRID (lazy)
       Solo cargan cuando el usuario scrollea cerca
    ============================================ */
    var instagramGrid = document.getElementById('instagramGrid');
    var gridLoaded = false;

    function createGridPlaceholders() {
        if (!instagramGrid) return;
        var count = INSTAGRAM_CONFIG.posts.length > 0 ? INSTAGRAM_CONFIG.posts.length : 6;
        for (var p = 0; p < count; p++) {
            var item = document.createElement('div');
            item.className = 'insta-item';
            item.setAttribute('data-animate', '');
            item.setAttribute('data-post-index', p);
            item.innerHTML = '<div class="insta-placeholder">' +
                '<svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" width="42" height="42">' +
                '<rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>' +
                '<circle cx="32" cy="28" r="8" fill="none" stroke="currentColor" stroke-width="2"/>' +
                '<circle cx="32" cy="48" r="1.5" fill="currentColor"/>' +
                '</svg>' +
                '</div>';
            instagramGrid.appendChild(item);
        }
    }

    function loadGridIframes() {
        if (gridLoaded || !instagramGrid) return;
        gridLoaded = true;

        if (INSTAGRAM_CONFIG.posts.length > 0) {
            var items = instagramGrid.querySelectorAll('.insta-item[data-post-index]');
            INSTAGRAM_CONFIG.posts.forEach(function (shortcode, i) {
                if (items[i]) {
                    var iframe = document.createElement('iframe');
                    iframe.src = 'https://www.instagram.com/p/' + shortcode + '/embed/';
                    iframe.allow = 'autoplay; encrypted-media';
                    iframe.allowFullscreen = true;
                    iframe.loading = 'lazy';
                    iframe.title = 'Instagram Post';
                    items[i].innerHTML = '';
                    items[i].appendChild(iframe);
                }
            });
        } else {
            var items = instagramGrid.querySelectorAll('.insta-item[data-post-index]');
            items.forEach(function (item) {
                item.innerHTML = '<div class="insta-placeholder">' +
                    '<svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" width="42" height="42">' +
                    '<rect x="8" y="8" width="48" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>' +
                    '<circle cx="32" cy="28" r="8" fill="none" stroke="currentColor" stroke-width="2"/>' +
                    '<circle cx="32" cy="48" r="1.5" fill="currentColor"/>' +
                    '</svg>' +
                    '</div>';
            });
        }
    }

    createGridPlaceholders();

    /* ============================================
       INTERSECTION OBSERVER PARA LAZY LOAD
       Carga los iframes cuando la sección se acerca
    ============================================ */
    var sectionsToWatch = [];
    if (instagramGrid) sectionsToWatch.push({ el: instagramGrid.closest('section'), loader: loadGridIframes });

    if (sectionsToWatch.length > 0) {
        var lazyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var section = entry.target;
                    sectionsToWatch.forEach(function (s) {
                        if (s.el === section && typeof s.loader === 'function') {
                            s.loader();
                        }
                    });
                    lazyObserver.unobserve(section);
                }
            });
        }, { rootMargin: '300px' });

        sectionsToWatch.forEach(function (s) {
            if (s.el) lazyObserver.observe(s.el);
        });
    }

    /* ============================================
       MOUSE TRACKING PARA EFECTOS EN CARDS
       Seguimiento del cursor para glow effects
    ============================================ */
    var trackedCards = document.querySelectorAll('.service-card, .discipline-card');
    trackedCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });


    /* ============================================
       NAVBAR: transparente en top → fondo sólido al scroll
    ============================================ */
    var navbar = document.getElementById('navbar');
    var scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    /* ============================================
       MENÚ HAMBURGUESA
    ============================================ */
    var menuToggle = document.getElementById('menuToggle');
    var mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');

            var spans = menuToggle.querySelectorAll('span');
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

        var mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                var spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }


    /* ============================================
       ANIMACIONES DE SCROLL
       IntersectionObserver con stagger
    ============================================ */
    var animatedElements = document.querySelectorAll('[data-animate]');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    });

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });


    /* ============================================
       FORMULARIO DE CONTACTO
    ============================================ */
    var contactForm = document.getElementById('contactForm');
    var formFeedback = document.getElementById('formFeedback');
    var formModified = false;

    window.addEventListener('beforeunload', function (e) {
        if (formModified) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    if (contactForm) {
        contactForm.addEventListener('input', function () { formModified = true; });
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var nameInput = document.getElementById('name');
            var emailInput = document.getElementById('email');
            var phoneInput = document.getElementById('phone');
            var disciplineSelect = document.getElementById('discipline');
            var messageInput = document.getElementById('message');

            var nameError = document.getElementById('name-error');
            var emailError = document.getElementById('email-error');
            var phoneError = document.getElementById('phone-error');
            var disciplineError = document.getElementById('discipline-error');
            var messageError = document.getElementById('message-error');

            var fields = [
                { input: nameInput, error: nameError, test: function () { return nameInput.value.trim().length > 0; }, msg: 'Ingresa tu nombre' },
                { input: emailInput, error: emailError, test: function () { return emailInput.value.trim().length > 0; }, msg: 'Ingresa tu email' },
                { input: disciplineSelect, error: disciplineError, test: function () { return disciplineSelect.value !== ''; }, msg: 'Selecciona una disciplina' }
            ];

            var firstError = null;
            fields.forEach(function (f) {
                if (!f.test()) {
                    f.error.textContent = f.msg;
                    if (!firstError) firstError = f.input;
                } else {
                    f.error.textContent = '';
                }
            });
            phoneError.textContent = '';
            messageError.textContent = '';

            if (formFeedback) formFeedback.textContent = '';

            if (firstError) {
                firstError.focus();
                return;
            }

            var disciplineText = disciplineSelect.value ? disciplineSelect.options[disciplineSelect.selectedIndex].text : 'nuestras disciplinas';
            var name = nameInput.value.trim();

            if (formFeedback) {
                formFeedback.textContent = '¡Gracias ' + name + '! Tu mensaje sobre ' + disciplineText + ' ha sido enviado. Te contactaremos pronto.';
            }
            formModified = false;
            contactForm.reset();
        });
    }


    /* ============================================
       SUAVIZADO DE SCROLL PARA ANCLAS
    ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                var target = document.querySelector(href);
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
       EFECTO DE PARALAJE SUAVE EN EL HERO
    ============================================ */
    var smokeEffect = document.querySelector('.smoke-effect');
    var smokeEffect2 = document.querySelector('.smoke-effect-2');

    if (smokeEffect && smokeEffect2) {
        window.addEventListener('scroll', function () {
            var scrolled = window.pageYOffset;
            var rate = scrolled * 0.2;
            smokeEffect.style.transform = 'translateY(' + rate + 'px)';
            smokeEffect2.style.transform = 'translateY(' + (rate * 0.5) + 'px)';
        }, { passive: true });
    }

    /* ============================================
       PARALLAX: diagonal stripe on .hero::after
    ============================================ */
    var heroEl = document.querySelector('.hero');
    if (heroEl) {
        window.addEventListener('scroll', function () {
            var scrolled = window.pageYOffset;
            var stripeRate = scrolled * 0.15;
            heroEl.style.setProperty('--stripe-offset', stripeRate + 'px');
        }, { passive: true });
    }


    /* ============================================
       LAZY LOADING PARA IFRAMES (MAPA)
    ============================================ */
    var mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe) {
        mapIframe.setAttribute('loading', 'lazy');
    }


    /* ============================================
       MODAL DE ESPECIALISTA
    ============================================ */
    var serviceCards = document.querySelectorAll('.service-card[data-specialist]');
    var modal = document.getElementById('specialistModal');
    var modalClose = document.getElementById('modalClose');

    var specialistsData = {
        nutritionist: {
            name: 'Nutricionista María González Pérez',
            whatsapp: 'https://wa.me/56912345678',
            whatsappText: '+56 9 1234 5678',
            instagram: 'https://www.instagram.com/mqz82/',
            instagramText: '@maria.gonzalez.nutricion',
            svg: '<svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" width="70" height="70">' +
                '<path d="M36 8 C36 8, 44 4, 48 10 C52 16, 46 22, 42 20 C38 18, 36 12, 36 12 Z" fill="var(--color-primary)" opacity="0.8"/>' +
                '<path d="M36 12 L34 18" stroke="var(--color-primary)" stroke-width="2" fill="none"/>' +
                '<path d="M34 18 C20 18, 16 30, 16 36 C16 48, 26 54, 32 54 C38 54, 48 48, 48 36 C48 30, 44 18, 34 18 Z" fill="var(--color-accent)" opacity="0.6"/>' +
                '<path d="M34 18 C20 18, 16 30, 16 36 C16 48, 26 54, 32 54" fill="none" stroke="var(--color-primary)" stroke-width="2.5"/>' +
                '<path d="M34 18 C44 18, 48 30, 48 36 C48 48, 38 54, 32 54" fill="none" stroke="var(--color-primary)" stroke-width="2.5"/>' +
                '<path d="M24 28 C28 24, 30 26, 28 30" fill="none" stroke="var(--color-white)" stroke-width="2" opacity="0.5"/>' +
                '</svg>'
        },
        kinesiology: {
            name: 'Kinesiólogo Carlos Ramírez Silva',
            whatsapp: 'https://wa.me/56987654321',
            whatsappText: '+56 9 8765 4321',
            instagram: 'https://www.instagram.com/mqz82/',
            instagramText: '@carlos.ramirez.kine',
            svg: '<svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" width="70" height="70">' +
                '<circle cx="32" cy="12" r="8" fill="none" stroke="var(--color-primary)" stroke-width="2.5"/>' +
                '<path d="M32 20 L32 38" stroke="var(--color-primary)" stroke-width="2.5" fill="none"/>' +
                '<path d="M20 28 L32 24 L44 28" stroke="var(--color-primary)" stroke-width="2.5" fill="none"/>' +
                '<path d="M32 38 L24 54 M32 38 L40 54" stroke="var(--color-primary)" stroke-width="2.5" fill="none"/>' +
                '<circle cx="28" cy="30" r="3" fill="var(--color-accent)" opacity="0.8"/>' +
                '<circle cx="36" cy="30" r="3" fill="var(--color-accent)" opacity="0.8"/>' +
                '<circle cx="32" cy="38" r="3" fill="var(--color-accent)" opacity="0.8"/>' +
                '</svg>'
        },
        chiropractic: {
            name: 'Quiropráctico Andrés Muñoz López',
            whatsapp: 'https://wa.me/56911223344',
            whatsappText: '+56 9 1122 3344',
            instagram: 'https://www.instagram.com/mqz82/',
            instagramText: '@andres.munoz.quiro',
            svg: '<svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" width="70" height="70">' +
                '<rect x="28" y="8" width="8" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>' +
                '<rect x="27" y="18" width="10" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>' +
                '<rect x="26" y="28" width="12" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>' +
                '<rect x="25" y="38" width="14" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>' +
                '<rect x="27" y="48" width="10" height="6" rx="2" fill="var(--color-primary)" opacity="0.8"/>' +
                '<circle cx="32" cy="34" r="5" fill="var(--color-accent)" opacity="0.7"/>' +
                '<path d="M30 34 L34 34 M32 32 L32 36" stroke="var(--color-white)" stroke-width="1.5"/>' +
                '</svg>'
        }
    };

    var lastFocusedEl = null;

    function getModalFocusable() {
        if (!modal) return [];
        return modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    }

    function openModal(specialistType) {
        var data = specialistsData[specialistType];
        if (!data) return;

        lastFocusedEl = document.activeElement;

        var card = document.querySelector('.service-card[data-specialist="' + specialistType + '"]');
        var serviceName = card.querySelector('h3').textContent;
        var serviceDesc = card.querySelector('p').textContent;

        document.getElementById('modalIcon').innerHTML = data.svg;
        document.getElementById('modalServiceName').textContent = serviceName;
        document.getElementById('modalServiceDesc').textContent = serviceDesc;
        document.getElementById('specialistName').textContent = data.name;

        var whatsappLink = document.getElementById('specialistWhatsapp');
        whatsappLink.href = data.whatsapp;
        document.getElementById('specialistPhone').textContent = data.whatsappText;

        var instaLink = document.getElementById('specialistInstagram');
        instaLink.href = data.instagram;
        document.getElementById('specialistInsta').textContent = data.instagramText;

        modal.classList.add('active');
        document.documentElement.classList.add('no-scroll');
        var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');

        var focusable = getModalFocusable();
        if (focusable.length > 0) focusable[0].focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
        if (lastFocusedEl) lastFocusedEl.focus();
    }

    if (modal) {
        modal.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
            var focusable = getModalFocusable();
            if (focusable.length === 0) return;
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    serviceCards.forEach(function (card) {
        var specialistType = card.getAttribute('data-specialist');
        card.addEventListener('click', function () { openModal(specialistType); });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });


    /* ============================================
       FAQ ACORDEÓN
    ============================================ */
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function () {
                var isActive = item.classList.contains('active');
                // Cerrar todos
                faqItems.forEach(function (other) { other.classList.remove('active'); });
                // Abrir el clickeado si no estaba abierto
                if (!isActive) item.classList.add('active');
            });
        }
    });


    /* ============================================
       CARRUSEL DE TESTIMONIOS
    ============================================ */
    var testimonialTrack = document.getElementById('testimonialTrack');
    var testimonialPrev = document.getElementById('testimonialPrev');
    var testimonialNext = document.getElementById('testimonialNext');
    var testimonialDots = document.getElementById('testimonialDots');
    var currentSlide = 0;
    var totalSlides = 0;
    var testimonialInterval = null;

    if (testimonialTrack) {
        totalSlides = testimonialTrack.querySelectorAll('.testimonial-slide').length;

        // Crear dots
        if (testimonialDots) {
            for (var d = 0; d < totalSlides; d++) {
                var dot = document.createElement('button');
                dot.className = 'testimonial-dot';
                dot.setAttribute('aria-label', 'Ir al testimonio ' + (d + 1));
                dot.addEventListener('click', (function (index) {
                    return function () { goToSlide(index); };
                })(d));
                testimonialDots.appendChild(dot);
            }
            updateDots(0);
        }

        function goToSlide(index) {
            currentSlide = index;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            if (currentSlide >= totalSlides) currentSlide = 0;
            testimonialTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
            updateDots(currentSlide);
            resetAutoplay();
        }

        function updateDots(active) {
            var dots = testimonialDots ? testimonialDots.querySelectorAll('.testimonial-dot') : [];
            dots.forEach(function (dot, i) {
                if (i === active) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        function resetAutoplay() {
            if (testimonialInterval) clearInterval(testimonialInterval);
            testimonialInterval = setInterval(function () {
                goToSlide(currentSlide + 1);
            }, 5000);
        }

        if (testimonialPrev) testimonialPrev.addEventListener('click', function () { goToSlide(currentSlide - 1); });
        if (testimonialNext) testimonialNext.addEventListener('click', function () { goToSlide(currentSlide + 1); });

        // Pause autoplay on hover/focus
        var carousel = document.getElementById('testimonialCarousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', function () { if (testimonialInterval) clearInterval(testimonialInterval); });
            carousel.addEventListener('mouseleave', resetAutoplay);
            carousel.addEventListener('focusin', function () { if (testimonialInterval) clearInterval(testimonialInterval); });
            carousel.addEventListener('focusout', resetAutoplay);
        }

        // Touch swipe
        var touchStartX = 0;
        testimonialTrack.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        testimonialTrack.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goToSlide(currentSlide + 1);
                else goToSlide(currentSlide - 1);
            }
        });

        resetAutoplay();
    }


    /* ============================================
       CONTADORES ANIMADOS (Hero Stats)
    ============================================ */
    var statNumbers = document.querySelectorAll('.stat-number');
    var statsAnimated = false;

    function animateCounters() {
        if (statsAnimated) return;
        statsAnimated = true;
        statNumbers.forEach(function (el) {
            var text = el.textContent;
            var match = text.match(/^(\d+)(\+?)/);
            if (match) {
                var target = parseInt(match[1], 10);
                var suffix = match[2] || '';
                var count = 0;
                var duration = 1500;
                var step = Math.ceil(target / (duration / 20));
                var timer = setInterval(function () {
                    count += step;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    el.textContent = count + suffix;
                }, 20);
            }
        });
    }

    // Disparar animación al hacer scroll sobre el hero
    var heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }


    /* ============================================
       WHATSAPP FLOAT: ocultar al llegar al footer
    ============================================ */
    var whatsappFloatBtn = document.getElementById('whatsappFloatBtn');
    var footer = document.querySelector('.footer');
    if (whatsappFloatBtn && footer) {
        var waObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    whatsappFloatBtn.style.opacity = '0';
                    whatsappFloatBtn.style.pointerEvents = 'none';
                } else {
                    whatsappFloatBtn.style.opacity = '1';
                    whatsappFloatBtn.style.pointerEvents = 'auto';
                }
            });
        }, { rootMargin: '0px 0px 60px 0px' });
        waObserver.observe(footer);
    }

});


/* ============================================
   POLYFILL PARA IntersectionObserver
   Solo si el navegador no lo soporta
   ============================================ */
if (!('IntersectionObserver' in window)) {
    var script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    script.async = true;
    document.head.appendChild(script);
}
