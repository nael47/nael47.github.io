document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + '%';
    });

    // Smooth Scroll & Active Link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 40,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Active State & Animations
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Active Link
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Animate Children
                const cards = entry.target.querySelectorAll('.glass-card, .skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);

        // Init state for animation
        const cards = section.querySelectorAll('.glass-card, .skill-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });

    // Copy to Clipboard Functionality
    const emailBtn = document.getElementById('btn-email');
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailBtn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                const tooltip = emailBtn.querySelector('.tooltip');
                const originalText = tooltip.innerText;
                tooltip.innerText = 'Copied!';
                setTimeout(() => {
                    tooltip.innerText = originalText;
                }, 2000);
            });
        });
    }
});
