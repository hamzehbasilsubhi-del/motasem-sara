document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-btn');
    const coverImage = document.getElementById('cover-image');
    const envelopeVideo = document.getElementById('envelope-video');
    const interactiveCover = document.getElementById('interactive-cover');
    const weddingInvitation = document.getElementById('wedding-invitation');

    /* تفعيل تأثير الظهور والتحريك عند التمرير للأسفل (Scroll Reveal / Fade In) */
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    };

    openBtn.addEventListener('click', () => {
        coverImage.style.display = 'none';
        envelopeVideo.style.display = 'block';
        openBtn.style.display = 'none';

        envelopeVideo.play();

        envelopeVideo.onended = () => {
            interactiveCover.style.transition = 'opacity 0.8s ease';
            interactiveCover.style.opacity = '0';
            
            setTimeout(() => {
                interactiveCover.style.display = 'none';
                weddingInvitation.classList.remove('hidden');
                window.scrollTo(0, 0);
                
                /* تهيئة المراقب فور فتح الدعوة */
                initScrollReveal();
            }, 800);
        };
    });

    const weddingDate = new Date('October 17, 2026 19:00:00').getTime();

    const formatNumber = (num) => {
        return num.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    };

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = formatNumber(days);
            document.getElementById('hours').innerText = formatNumber(hours);
            document.getElementById('minutes').innerText = formatNumber(minutes);
            document.getElementById('seconds').innerText = formatNumber(seconds);
        } else {
            document.getElementById('countdown').innerHTML = "<p style='font-family: Amiri; font-size: 1.2rem; color: #022C22;'>أهلاً بكم في يومنا المميز!</p>";
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* التفاعل الخاص بفتح نموذج RSVP عند النقر على الختم الشمعي */
    const waxSealTrigger = document.getElementById('wax-seal-trigger');
    const rsvpForm = document.getElementById('rsvp-form');

    waxSealTrigger.addEventListener('click', () => {
        rsvpForm.classList.toggle('active');
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً لكم! تم إرسال تأكيد الحضور بنجاح.');
        rsvpForm.reset();
        rsvpForm.classList.remove('active');
    });
});