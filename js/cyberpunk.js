document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const modules = document.querySelectorAll('.module');
    const statusText = document.getElementById('system-msg');

    // Navigation Logic
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            navBtns.forEach(b => b.classList.remove('active'));
            modules.forEach(m => m.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetModule = document.getElementById(targetId);

            if (targetModule) {
                targetModule.classList.add('active');

                // Update Status
                if (statusText) {
                    statusText.innerText = `LOADING MODULE: ${targetId.toUpperCase()}...`;
                    setTimeout(() => {
                        statusText.innerText = `SYSTEM READY // VIEWING: ${targetId.toUpperCase()}`;
                    }, 500);
                }

                // Play sound (optional, commented out for now)
                // playSound();
            }
        });
    });

    // Typewriter Effect for Hero
    const heroText = document.querySelector('.hero-glitch');
    if (heroText) {
        const text = heroText.innerText;
        heroText.innerText = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 500);
    }

    // Update Time
    setInterval(() => {
        const timeEl = document.getElementById('clock');
        if (timeEl) {
            const now = new Date();
            timeEl.innerText = now.toLocaleTimeString();
        }
    }, 1000);
});
