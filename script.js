document.addEventListener('DOMContentLoaded', function () {
    function initTypewriter() {
        const typewriterText = document.getElementById('typewriter-text');
        const cursor = document.getElementById('typewriter-cursor');

        if (!typewriterText || !cursor) return;

        const fullText = [
            "I'M Muhammad Saad",
            "Nadeem"
        ].join('<br>');

        typewriterText.innerHTML = '';

        const typingSpeed = 80;
        const lineBreakDelay = 300;
        const finalCursorBlink = 2000;

        let isTyping = true;
        let currentLine = 0;
        let currentChar = 0;
        let currentText = '';

        const plainText = fullText.replace(/<br>/g, '\n');

        function typeCharacter() {
            if (!isTyping) return;

            if (currentChar >= plainText.length) {
                setTimeout(() => {
                    cursor.classList.add('hidden');
                    isTyping = false;
                    console.log('%c✓ Typewriter animation complete!', 'color: #64ffda; font-weight: bold;');
                }, finalCursorBlink);
                return;
            }

            const nextChar = plainText.charAt(currentChar);

            if (nextChar === '\n') {
                currentText += '<br>';
                currentChar++;

                typewriterText.innerHTML = currentText;

                setTimeout(typeCharacter, lineBreakDelay);
            } else {
                currentText += nextChar;
                currentChar++;

                typewriterText.innerHTML = currentText;

                setTimeout(typeCharacter, typingSpeed);
            }
        }
        setTimeout(() => {
            typeCharacter();
        }, 500);

        return function stopTyping() {
            isTyping = false;
            cursor.classList.add('hidden');
        };
    }

    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
            navbar.style.backgroundColor = '#112240';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = 'transparent';
        }

        navbar.style.transform = 'translateY(0)';
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                updateActiveNavLink(targetId);

                this.blur();
            }
        });
    });

    function updateActiveNavLink(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavLink('#' + sectionId);
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_duxqi84', 'template_qzdv6jl', this)
                .then(function () {
                    showFormMessage(`Thank you ${name}! Your message has been sent successfully.`, 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    console.log('SUCCESS!');
                }, function (error) {
                    showFormMessage('Failed to send message. Please checks console for details.', 'error');
                    console.log('FAILED...', error);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message alert alert-${type === 'error' ? 'danger' : 'success'} mt-3`;
        messageDiv.textContent = message;

        const form = document.querySelector('.contact-form');
        form.appendChild(messageDiv);

        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    function animateSkillsCounter() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
        });

        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transition = 'all 0.5s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillsCounter();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    let stopTyping = null;
    setTimeout(() => {
        stopTyping = initTypewriter();
    }, 500);

    console.log('%c👋 Hello! Welcome to Saad\'s Portfolio', 'color: #64ffda; font-size: 18px; font-weight: bold;');
    console.log('%c✨ Typewriter animation initialized', 'color: #52d4b9; font-size: 14px;');
    console.log('%c🔧 Built with HTML5, CSS3, JavaScript & Bootstrap 5', 'color: #8892b0; font-size: 14px;');
    console.log('%c💻 Software Engineering Student Portfolio', 'color: #ccd6f6; font-size: 14px;');
    console.log('%c⚡ Portfolio loaded successfully!', 'color: #64ffda; font-weight: bold;');

    let resizeTimer;
    window.addEventListener('resize', function () {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden && stopTyping) {
            stopTyping();
        }
    });

});

const globalStyles = document.createElement('style');
globalStyles.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
    
    /* Form focus state */
    .form-group.focused .form-label {
        color: #64ffda;
        transform: translateY(-5px);
        transition: all 0.3s ease;
    }
    
    /* Print styles */
    @media print {
        .navbar,
        .hero-buttons,
        .social-links,
        #contact {
            display: none !important;
        }
        
        body {
            color: #000 !important;
            background: #fff !important;
        }
        
        .card, .skill-category-card, .service-card {
            border: 1px solid #ddd !important;
            box-shadow: none !important;
        }
        
        #typewriter-cursor {
            display: none !important;
        }
    }
`;
document.head.appendChild(globalStyles);