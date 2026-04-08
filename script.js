document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Sticky Navbar & Header Style Change on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .hover-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 4. Accordion Logic for Solutions
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(acc => {
                acc.classList.remove('active');
            });

            // Open clicked item if it was not active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Counters Animation for Statistics
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    const speed = 100; // Lower is faster
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });
    
    const statsSection = document.getElementById('statistics');
    if (statsSection) {
        startCounters.observe(statsSection);
    }

    // 6. Form Submission (Dummy logic)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageDiv = document.getElementById('form-message');
            messageDiv.style.color = "var(--primary-green)";
            messageDiv.innerText = "Thank you for reaching out! Together, we can make a difference.";
            contactForm.reset();
            
            setTimeout(() => {
                messageDiv.innerText = "";
            }, 5000);
        });
    }

    // Trigger hero animation on load
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});
