/**
 * CLUSTER FITNESS - MAIN.JS v2
 * Navbar scroll, animations, Instagram embeds, mouse tracking, mobile menu
 */


document.addEventListener('DOMContentLoaded', function () {






    /* ============================================
       NAVBAR: transparente en top → fondo sólido al scroll
    ============================================ */
    var navbar = document.getElementById('navbar');
    var scrollThreshold = 50;

    function handleScroll() {

        if (window.innerWidth <= 900) {
            navbar.classList.add('scrolled');
            return;
        }

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

    function toggleMobileMenu(open) {
        if (open === undefined) {
            mobileMenu.classList.toggle('active');
        } else if (open) {
            mobileMenu.classList.add('active');
        } else {
            mobileMenu.classList.remove('active');
        }

        var isOpen = mobileMenu.classList.contains('active');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');
        document.documentElement.classList.toggle('no-scroll', isOpen);
    }

    if (menuToggle && mobileMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', function () {
            toggleMobileMenu();
        });

        var allMenuLinks = mobileMenu.querySelectorAll('a');
        allMenuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                toggleMobileMenu(false);
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
            if (!href || href === '#' || !href.startsWith('#')) {
                return;
            }
            var target = document.querySelector(href);
            if (!target) {
                return;
            }
            e.preventDefault();

            // Ensure mobile menu is closed before scrolling
            if (typeof toggleMobileMenu === 'function') {
                toggleMobileMenu(false);
            }

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    var navbar = document.getElementById('navbar');
                    var navbarHeight = navbar ? navbar.offsetHeight : 80;
                    var extraSpacing = 24;
                    var targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - extraSpacing;
                    var useSmooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    window.scrollTo({
                        top: targetTop,
                        behavior: useSmooth ? 'smooth' : 'auto'
                    });
                });
            });
        });
    });


    /* ============================================
       EFECTO DE PARALAJE SUAVE EN EL HERO
    ============================================ */
    var smokeEffect = document.querySelector('.smoke-effect');
    var smokeEffect2 = document.querySelector('.smoke-effect-2');

    if (
        smokeEffect &&
        smokeEffect2 &&
        window.innerWidth > 900
    ) {
        window.addEventListener('scroll', function () {
            var scrolled = window.pageYOffset;
            var rate = scrolled * 0.2;

            smokeEffect.style.transform =
                'translateY(' + rate + 'px)';

            smokeEffect2.style.transform =
                'translateY(' + (rate * 0.5) + 'px)';
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
            var focusable = getMediaLightboxFocusable();
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
        if (e.key === 'Escape') {
            if (modal && modal.classList.contains('active')) {
                closeModal();
            } else if (mediaLightbox && mediaLightbox.classList.contains('active')) {
                closeMediaLightbox();
            } else if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu(false);
            }
        }
    });


    /* ============================================
       MEDIA LIGHTBOX (IMAGES & VIDEOS)
    ============================================ */
    var mediaLightbox = document.getElementById('mediaLightbox');
    var mediaLightboxClose = document.querySelector('.media-lightbox-close');
    var mediaLightboxBody = document.querySelector('.media-lightbox-body');
    var mediaLightboxTitle = document.querySelector('.media-lightbox-title');
    var mediaExpandBtns = document.querySelectorAll('.media-expand-btn');

    var lastFocusedMediaEl = null;
    var currentMediaPlaying = null; // To keep track of video playing in lightbox
    var sourceVideoData = null; // { card, src, poster } — restore source video on close
    var communityLightboxIndex = -1; // Index of community carousel slide shown in lightbox
    var mediaLightboxPrev = document.querySelector('.media-lightbox-prev');
    var mediaLightboxNext = document.querySelector('.media-lightbox-next');

    function getMediaLightboxFocusable() {
        if (!mediaLightbox) return [];
        return mediaLightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    }

    function openMediaLightbox(src, type, title, poster = null, sourceCurrentTime = null) {
        var isAlreadyOpen = mediaLightbox.classList.contains('active');

        // Store focus only on initial open, not on navigation
        if (!isAlreadyOpen) {
            lastFocusedMediaEl = document.activeElement;
        }

        mediaLightboxBody.innerHTML = ''; // Clear previous content
        mediaLightboxTitle.textContent = title;

        if (type === 'image') {
            var img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.loading = 'lazy';
            mediaLightboxBody.appendChild(img);
        } else if (type === 'video') {
            var video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.preload = 'metadata';
            if (poster) {
                video.poster = poster;
            }
            mediaLightboxBody.appendChild(video);
            currentMediaPlaying = video; // Store reference to current video
            // Resume from where the source video was and auto-play
            if (sourceCurrentTime !== null && sourceCurrentTime > 0) {
                video.addEventListener('loadedmetadata', function () {
                    video.currentTime = sourceCurrentTime;
                });
                video.addEventListener('seeked', function onSeeked() {
                    video.play().catch(function () { });
                    video.removeEventListener('seeked', onSeeked);
                });
            } else {
                video.addEventListener('loadedmetadata', function () {
                    video.play().catch(function () { });
                });
            }
        }

        if (!isAlreadyOpen) {
            mediaLightbox.classList.add('active');
            document.documentElement.classList.add('no-scroll');
            var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');

            var focusable = getMediaLightboxFocusable();
            if (focusable.length > 0) focusable[0].focus(); // Focus close button
        }
    }

    function restoreSourceVideo() {
        if (!sourceVideoData) return;
        var mediaContainer = sourceVideoData.card.querySelector('.instagram-card-media');
        if (mediaContainer) {
            var sourceVideo = mediaContainer.querySelector('video');
            if (sourceVideo) {
                var newSource = document.createElement('source');
                newSource.src = sourceVideoData.src;
                newSource.type = 'video/mp4';
                sourceVideo.appendChild(newSource);
                sourceVideo.load();
            }
        }
        sourceVideoData = null;
    }

    function navigateMediaLightbox(direction) {
        if (communityLightboxIndex < 0) return;

        var slides = communityTrack ? communityTrack.querySelectorAll('.carousel-slide') : [];
        if (!slides || slides.length === 0) return;

        communityLightboxIndex += direction;
        if (communityLightboxIndex < 0) communityLightboxIndex = slides.length - 1;
        if (communityLightboxIndex >= slides.length) communityLightboxIndex = 0;

        communityGoToSlide(communityLightboxIndex);

        var slide = slides[communityLightboxIndex];
        if (!slide) return;

        var img = slide.querySelector('.community-media img');
        if (!img) return;

        var title = img.alt || '';
        var titleEl = slide.querySelector('.instagram-card-title');
        if (titleEl) title = titleEl.textContent;

        openMediaLightbox(img.src, 'image', title);
    }

    function closeMediaLightbox() {
        if (currentMediaPlaying && !currentMediaPlaying.paused) {
            currentMediaPlaying.pause(); // Pause video if playing
        }
        currentMediaPlaying = null; // Clear video reference

        // Restore source video before clearing lightbox content
        restoreSourceVideo();

        mediaLightbox.classList.remove('active');
        mediaLightbox.classList.remove('has-nav');
        document.documentElement.classList.remove('no-scroll');

        communityLightboxIndex = -1; // Reset community navigation

        if (lastFocusedMediaEl) {
            lastFocusedMediaEl.focus(); // Restore focus to element that opened lightbox
        }
        mediaLightboxBody.innerHTML = ''; // Clean up content
        mediaLightboxTitle.textContent = ''; // Clean up title
    }

    if (mediaLightbox) {
        mediaLightbox.addEventListener('keydown', function (e) {
            if (!mediaLightbox.classList.contains('active')) return;

            // Tab trap
            if (e.key === 'Tab') {
                var focusable = getMediaLightboxFocusable();
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
                return;
            }

            // Arrow navigation for community images
            if (communityLightboxIndex >= 0) {
                if (e.key === 'ArrowLeft') {
                    navigateMediaLightbox(-1);
                    e.preventDefault();
                } else if (e.key === 'ArrowRight') {
                    navigateMediaLightbox(1);
                    e.preventDefault();
                }
            }
        });

        // Click outside to close
        mediaLightbox.addEventListener('click', function (e) {
            if (e.target === mediaLightbox) {
                closeMediaLightbox();
            }
        });
    }

    if (mediaLightboxClose) {
        mediaLightboxClose.addEventListener('click', closeMediaLightbox);
    }

    // Lightbox prev/next button listeners
    if (mediaLightboxPrev) {
        mediaLightboxPrev.addEventListener('click', function () { navigateMediaLightbox(-1); });
    }
    if (mediaLightboxNext) {
        mediaLightboxNext.addEventListener('click', function () { navigateMediaLightbox(1); });
    }

    // Touch swipe inside lightbox for community images
    var lightboxTouchStartX = 0;
    var lightboxTouchStartY = 0;
    var lightboxIsSwiping = false;

    if (mediaLightboxBody) {
        mediaLightboxBody.addEventListener('touchstart', function (e) {
            if (communityLightboxIndex < 0) return;
            lightboxTouchStartX = e.touches[0].clientX;
            lightboxTouchStartY = e.touches[0].clientY;
            lightboxIsSwiping = false;
        }, { passive: true });

        mediaLightboxBody.addEventListener('touchmove', function (e) {
            if (e.touches.length !== 1 || communityLightboxIndex < 0) return;
            var dx = Math.abs(e.touches[0].clientX - lightboxTouchStartX);
            var dy = Math.abs(e.touches[0].clientY - lightboxTouchStartY);
            if (dx > dy && dx > 10) {
                lightboxIsSwiping = true;
                e.preventDefault();
            }
        }, { passive: false });

        mediaLightboxBody.addEventListener('touchend', function (e) {
            if (!lightboxIsSwiping || communityLightboxIndex < 0) return;
            var diff = lightboxTouchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                navigateMediaLightbox(diff > 0 ? 1 : -1);
            }
        });
    }

    // Add event listeners to expand buttons
    mediaExpandBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Restore any previously cleared source video before processing new one
            restoreSourceVideo();

            var card = btn.closest('.instagram-card'); // Parent card (community or reel)
            var mediaSrc, mediaType, mediaTitle, posterSrc = null, sourceCurrentTime = null;

            if (card.classList.contains('community-card')) {
                var img = card.querySelector('.community-media img');
                if (img) {
                    mediaSrc = img.src;
                    mediaType = 'image';
                    mediaTitle = img.alt || card.querySelector('.instagram-card-title').textContent;
                    // Track which carousel slide was opened
                    if (communityTrack) {
                        var slides = communityTrack.querySelectorAll('.carousel-slide');
                        var slideIndex = Array.prototype.indexOf.call(slides, card);
                        communityLightboxIndex = slideIndex >= 0 ? slideIndex : communityCurrentSlide;
                        mediaLightbox.classList.add('has-nav');
                    }
                }
            } else if (card.classList.contains('reel-card')) {
                var video = card.querySelector('.instagram-card-media video');
                if (video) {
                    mediaSrc = video.querySelector('source').src; // Get src from the <source> tag
                    mediaType = 'video';
                    mediaTitle = card.querySelector('.instagram-card-title').textContent;
                    posterSrc = video.poster;
                    sourceCurrentTime = video.currentTime;
                    video.pause(); // Pause the source so it doesn't keep playing in background
                    // Clear source to release browser media pipeline (prevents "two instances" bug)
                    sourceVideoData = { card: card, src: mediaSrc, poster: posterSrc };
                    video.querySelectorAll('source').forEach(function (s) { s.remove(); });
                    video.removeAttribute('src');
                    video.load();
                }
            }
            if (mediaSrc && mediaType) {
                openMediaLightbox(mediaSrc, mediaType, mediaTitle, posterSrc, sourceCurrentTime);
            }
        });
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
                faqItems.forEach(function (other) {
                    other.classList.remove('active');
                    var btn = other.querySelector('.faq-question');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                });
                // Abrir el clickeado si no estaba abierto
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
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
       CARRUSEL DE COMUNIDAD (Horizontal)
    ============================================ */
    var communityTrack = document.getElementById('communityTrack');
    var communityPrev = document.getElementById('communityPrev');
    var communityNext = document.getElementById('communityNext');
    var communityDots = document.getElementById('communityDots');
    var communityCurrentSlide = 0;
    var communityTotalSlides = 0;
    var communityInterval = null;

    if (communityTrack) {
        communityTotalSlides = communityTrack.querySelectorAll('.carousel-slide').length;

        // Crear dots
        if (communityDots) {
            for (var cd = 0; cd < communityTotalSlides; cd++) {
                var cdot = document.createElement('button');
                cdot.className = 'carousel-dot';
                cdot.setAttribute('aria-label', 'Ir a la imagen ' + (cd + 1));
                cdot.addEventListener('click', (function (index) {
                    return function () { communityGoToSlide(index); };
                })(cd));
                communityDots.appendChild(cdot);
            }
            communityUpdateDots(0);
        }

        function communityGoToSlide(index) {
            communityCurrentSlide = index;
            if (communityCurrentSlide < 0) communityCurrentSlide = communityTotalSlides - 1;
            if (communityCurrentSlide >= communityTotalSlides) communityCurrentSlide = 0;
            communityTrack.style.transform = 'translateX(-' + (communityCurrentSlide * 100) + '%)';
            communityUpdateDots(communityCurrentSlide);
            communityResetAutoplay();
        }

        function communityUpdateDots(active) {
            var dots = communityDots ? communityDots.querySelectorAll('.carousel-dot') : [];
            dots.forEach(function (dot, i) {
                if (i === active) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        function communityResetAutoplay() {
            if (communityInterval) clearInterval(communityInterval);
            communityInterval = setInterval(function () {
                communityGoToSlide(communityCurrentSlide + 1);
            }, 5000);
        }

        if (communityPrev) communityPrev.addEventListener('click', function () { communityGoToSlide(communityCurrentSlide - 1); });
        if (communityNext) communityNext.addEventListener('click', function () { communityGoToSlide(communityCurrentSlide + 1); });

        // Pause autoplay on hover/focus
        var communityCarousel = document.getElementById('communityCarousel');
        if (communityCarousel) {
            communityCarousel.addEventListener('mouseenter', function () { if (communityInterval) clearInterval(communityInterval); });
            communityCarousel.addEventListener('mouseleave', communityResetAutoplay);
            communityCarousel.addEventListener('focusin', function () { if (communityInterval) clearInterval(communityInterval); });
            communityCarousel.addEventListener('focusout', communityResetAutoplay);
        }

        // Keyboard navigation
        if (communityCarousel) {
            communityCarousel.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') { communityGoToSlide(communityCurrentSlide - 1); e.preventDefault(); }
                if (e.key === 'ArrowRight') { communityGoToSlide(communityCurrentSlide + 1); e.preventDefault(); }
            });
        }

        // Touch swipe with direction lock
        var communityTouchStartX = 0;
        var communityTouchStartY = 0;
        var communityTouchDiffX = 0;
        var communityTouchDiffY = 0;
        var communityIsSwiping = false;

        communityTrack.addEventListener('touchstart', function (e) {
            communityTouchStartX = e.touches[0].clientX;
            communityTouchStartY = e.touches[0].clientY;
            communityTouchDiffX = 0;
            communityTouchDiffY = 0;
            communityIsSwiping = false;
        }, { passive: true });

        communityTrack.addEventListener('touchmove', function (e) {
            if (e.touches.length !== 1) return;
            var dx = Math.abs(e.touches[0].clientX - communityTouchStartX);
            var dy = Math.abs(e.touches[0].clientY - communityTouchStartY);
            if (dx > dy && dx > 10) {
                communityIsSwiping = true;
                e.preventDefault();
            }
        }, { passive: false });

        communityTrack.addEventListener('touchend', function (e) {
            if (!communityIsSwiping) return;
            var diff = communityTouchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) communityGoToSlide(communityCurrentSlide + 1);
                else communityGoToSlide(communityCurrentSlide - 1);
            }
        });

        communityResetAutoplay();
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
       REELS: Click en la tarjeta → play/pause.
       Quien está reproduciendo se pausa al
       hacer click en otra tarjeta.
    ============================================ */
    var reelVideos = document.querySelectorAll('.reel-card .instagram-card-media video');

    function pauseAllReelsExcept(exceptVideo) {
        reelVideos.forEach(function (v) {
            if (v !== exceptVideo && !v.paused) {
                v.pause();
                v.currentTime = 0;
            }
        });
    }

    reelVideos.forEach(function (video) {
        var card = video.closest('.instagram-card');

        function toggleReelPlay(e) {
            if (e.target.closest('a')) return;
            if (e.target.closest('.media-expand-btn')) return;
            if (video.paused) {
                pauseAllReelsExcept(video);
                video.muted = false;
                video.play()['catch'](function () { });
            } else {
                video.pause();
            }
        }

        card.addEventListener('click', toggleReelPlay);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleReelPlay(e);
            }
        });

        video.addEventListener('ended', function () {
            video.currentTime = 0;
        });
    });

    /* Pausar todos los reels si la seccion sale del viewport */
    var reelsSection = document.getElementById('reels');
    if (reelsSection) {
        var reelsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    reelVideos.forEach(function (v) {
                        if (!v.paused) {
                            v.pause();
                        }
                    });
                }
            });
        }, { threshold: 0 });
        reelsObserver.observe(reelsSection);
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

    /* ============================================
       LAZY LOADING DE BACKGROUNDS (secciones secundarias)
       Carga box_2, box_3 solo cuando la seccion
       esta cerca del viewport
    ============================================ */
    var lazySections = document.querySelectorAll('[data-lazy-bg]');
    if (lazySections.length > 0 && 'IntersectionObserver' in window) {
        var bgObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var grad = 'linear-gradient(180deg, var(--color-bg) 0%, rgba(12,12,12,0.9) 100%)';
                    el.style.background = grad + ', ' + el.getAttribute('data-lazy-bg') + ' center/cover no-repeat';
                    el.removeAttribute('data-lazy-bg');
                    bgObserver.unobserve(el);
                }
            });
        }, { rootMargin: '200px' });
        lazySections.forEach(function (s) { bgObserver.observe(s); });
    }

});


/* ============================================
   FALLBACK: asegurar visibilidad si IntersectionObserver no está disponible
   ============================================ */
if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-animate]').forEach(function (el) {
        el.classList.add('visible');
    });
}
