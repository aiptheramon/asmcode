/*==================== SEMUA INISIALISASI DALAM SATU DOMCONTENTLOADED ====================*/
document.addEventListener('DOMContentLoaded', () => {
    
    /*==================== MENU TOGGLE ====================*/    
    const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

    if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
    }

    if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
    }
    /*==================== ACCORDION SKILLS ====================*/
    const skillsContent = document.querySelectorAll('.skills__content');
    const skillsHeaders = document.querySelectorAll('.skills__header');

    function toggleSkills() {
        let itemClass = this.parentNode.className;
        
        // Close all accordions first
        skillsContent.forEach((content) => {
            content.className = 'skills__content skills__close';
        });
        
        // Open clicked accordion only if it was closed
        if (itemClass.includes('skills__close')) {
            this.parentNode.className = 'skills__content skills__open';
        }
    }

    skillsHeaders.forEach((header) => {
        header.addEventListener('click', toggleSkills);
    });

    // Initialize all accordions as closed
    skillsContent.forEach((content) => {
        content.className = 'skills__content skills__close';
    });

    /*==================== ANIMATED SUBTITLE ROTATION ====================*/
    const professions = ['UI/UX Designer', 'Frontend Developer', 'Backend Developer'];
    let currentProfessionIndex = 0;
    const rotatingText = document.getElementById('rotating-text');

    if (rotatingText) {
        function rotateProfession() {
            rotatingText.classList.remove('active');
            
            setTimeout(() => {
                currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
                rotatingText.textContent = professions[currentProfessionIndex];
                
                setTimeout(() => {
                    rotatingText.classList.add('active');
                }, 50);
            }, 500);
        }

        rotatingText.classList.add('active');
        setInterval(rotateProfession, 3000);
    }

    /*==================== PERSONALITY TRAITS POPUP ====================*/
    const traitItems = document.querySelectorAll('.trait-item');
    const profileWrapper = document.querySelector('.profile-image-wrapper');

    if (profileWrapper && traitItems.length) {
        function randomizeTraits() {
            const rect = profileWrapper.getBoundingClientRect();
            const radius = rect.width / 2 + 45;
            const usedAngles = [];

            traitItems.forEach((item) => {
                let angle;
                do {
                    angle = Math.random() * Math.PI * 2;
                } while (usedAngles.some(a => Math.abs(a - angle) < 1));

                usedAngles.push(angle);

                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                item.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}rad)`;

                const scribble = item.querySelector('.scribble-arrow');
                if (scribble) {
                    scribble.style.transform = `rotate(${-angle}rad)`;
                }
            });
        }

        function showTraits() {
            traitItems.forEach(item => {
                item.classList.remove('active');
                item.classList.add('prepared');
            });

            randomizeTraits();

            requestAnimationFrame(() => {
                traitItems.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add('active');
                        item.classList.remove('prepared');

                        const path = item.querySelector('.scribble-path');
                        if (path) {
                            path.style.animation = 'none';
                            path.getBoundingClientRect();
                            path.style.animation = 'drawArrow 1.2s ease forwards';
                        }
                    }, i * 160);
                });
            });
        }

        function hideTraits() {
            traitItems.forEach(item => item.classList.remove('active'));
        }

        profileWrapper.addEventListener('mouseenter', showTraits);
        profileWrapper.addEventListener('mouseleave', hideTraits);
        profileWrapper.addEventListener('click', showTraits);
        }

    /*==================== HOVER ACTIVATE PROFILE VOICE ====================*/
    const profileVideo = document.querySelector('.profile-video');

    if (profileWrapper && profileVideo) {

        profileWrapper.addEventListener('mouseenter', () => {
            profileVideo.muted = false;
            profileVideo.play().catch(() => {});
            profileWrapper.classList.add('voice-active');
        });

        profileWrapper.addEventListener('mouseleave', () => {
            profileVideo.muted = true;
            profileWrapper.classList.remove('voice-active');
        });

    }

    /*==================== SERVICES MODAL ====================*/
    const modalButtons = document.querySelectorAll('.services__button[data-modal]');
    const modals = document.querySelectorAll('.services__modal');
    const closeButtons = document.querySelectorAll('.services__modal-close');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active-modal');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        modal.classList.remove('active-modal');
        document.body.style.overflow = '';
    }

    modalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.services__modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.services__modal.active-modal');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // Observer untuk body scroll
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('active-modal')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    });

    modals.forEach(modal => {
        observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    });

    /*==================== SWIPER INITIALIZATIONS DENGAN SCALE UP & FADE OUT ====================*/
    if (document.querySelector('.portfolio__container')) {
        const swiper = new Swiper('.portfolio__container', {
            loop: true,
            grabCursor: true,
            spaceBetween: 24,
            
            // Menggunakan efek slide dengan custom transition
            effect: 'slide',
            
            // Autoplay settings
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
            },
            
            // Navigation
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Transition speed
            speed: 800,
            
            // Responsive breakpoints
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 16
                },
                568: { 
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: { 
                    slidesPerView: 2,
                    spaceBetween: 24
                },
                1024: { 
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            },
            
            // Event listeners untuk efek custom
            on: {
                init: function() {
                    // Inisialisasi awal
                    this.slides.forEach(slide => {
                        slide.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    });
                    
                    // Tambahkan class untuk slide pertama
                    if (this.slides[this.activeIndex]) {
                        this.slides[this.activeIndex].classList.add('swiper-slide-active');
                    }
                },
                
                slideChangeTransitionStart: function() {
                    // Saat transisi dimulai
                    const previousIndex = this.previousIndex;
                    const activeIndex = this.activeIndex;
                    
                    // Tambahkan class exit untuk slide sebelumnya
                    if (this.slides[previousIndex]) {
                        this.slides[previousIndex].classList.add('slide-exit');
                    }
                    
                    // Reset class untuk slide lainnya
                    this.slides.forEach((slide, index) => {
                        if (index !== previousIndex && index !== activeIndex) {
                            slide.classList.remove('slide-exit', 'swiper-slide-active');
                        }
                    });
                },
                
                slideChangeTransitionEnd: function() {
                    // Saat transisi selesai
                    this.slides.forEach(slide => {
                        slide.classList.remove('slide-exit');
                    });
                },
                
                // Handle resize
                resize: function() {
                    this.update();
                }
            }
        });

        // Handle window resize untuk responsif
        window.addEventListener('resize', () => {
            if (swiper) {
                if (window.innerWidth <= 568) {
                    swiper.params.spaceBetween = 16;
                } else if (window.innerWidth <= 768) {
                    swiper.params.spaceBetween = 20;
                } else if (window.innerWidth <= 1024) {
                    swiper.params.spaceBetween = 24;
                } else {
                    swiper.params.spaceBetween = 30;
                }
                swiper.update();
            }
        });

        // Pause autoplay saat hover
        const portfolioContainer = document.querySelector('.portfolio__container');
        if (portfolioContainer) {
            portfolioContainer.addEventListener('mouseenter', () => {
                swiper.autoplay.stop();
            });
            
            portfolioContainer.addEventListener('mouseleave', () => {
                swiper.autoplay.start();
            });
        }

        // Optional: Manual control dengan keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                swiper.slidePrev();
            } else if (e.key === 'ArrowRight') {
                swiper.slideNext();
            }
        });

        // Touch events untuk mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        portfolioContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        portfolioContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                swiper.slideNext();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                swiper.slidePrev();
            }
        }
    }

    /*==================== SCROLL ACTIVE LINK ====================*/
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    /*==================== CHANGE BACKGROUND HEADER ====================*/
    function scrollHeader() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY >= 80) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
    }
    window.addEventListener('scroll', scrollHeader);

    /*==================== SHOW SCROLL UP ====================*/
    function scrollUp() {
        const scrollUp = document.getElementById('scroll-up');
        if (scrollUp) {
            if (window.scrollY >= 560) {
                scrollUp.classList.add('show-scroll');
            } else {
                scrollUp.classList.remove('show-scroll');
            }
        }
    }
    window.addEventListener('scroll', scrollUp);

}); // Akhir dari DOMContentLoaded