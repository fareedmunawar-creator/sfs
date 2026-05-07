document.addEventListener('DOMContentLoaded', () => {
    // Preloader Fade Out
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Wait for page to fully load, then fade out preloader
        window.addEventListener('load', () => {
            // Add small delay for smooth transition (2.5s minimum for animation visibility)
            setTimeout(() => {
                preloader.classList.add('fade-out');
                
                // Remove preloader from DOM after transition completes
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600); // Match CSS transition duration
            }, 2500);
        });
    }

    // Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navUl.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Keyboard support for hamburger menu
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });

        // Close menu when clicking on a link
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navUl.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navUl.contains(e.target)) {
                hamburger.classList.remove('active');
                navUl.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Sticky Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Navigation Links (only for anchor links on same page)
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Only handle anchor links (starting with #) for smooth scroll
            // Let page-to-page navigation work normally
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - (header ? header.offsetHeight : 0),
                        behavior: 'smooth'
                    });
                }
            }
            // Otherwise, let the link navigate normally to other pages
        });
    });

    // Back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '&uarr;'; // Up arrow
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is in view
    });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});