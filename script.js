document.addEventListener('DOMContentLoaded', () => {
    // --- عناصر فتح الغلاف والفيديو والموسيقى ---
    const openBtn = document.getElementById('open-btn');
    const coverImage = document.getElementById('cover-image');
    const envelopeVideo = document.getElementById('envelope-video');
    const interactiveCover = document.getElementById('interactive-cover');
    const mainContent = document.getElementById('wedding-invitation');
    const bgMusic = document.getElementById('bg-music');

    // تجهيز الفيديو في الخلفية لمنع ظهور أي شاشة خضراء أو تأخير
    if (envelopeVideo) {
        envelopeVideo.load();
    }

    // معالجة خطأ تحميل صورة الغلاف
    if (coverImage) {
        coverImage.addEventListener('error', function handleCoverError() {
            if (this.src.endsWith('.png')) {
                this.src = 'cover.jpg';
            } else if (this.src.endsWith('.jpg')) {
                this.src = 'cover.jpeg';
            } else if (this.src.endsWith('.jpeg')) {
                this.src = 'cover.png';
                this.removeEventListener('error', handleCoverError);
            }
        });
    }

    let isOpened = false;

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            if (isOpened) return;
            isOpened = true;

            // 1. تشغيل الموسيقى
            if (bgMusic) {
                bgMusic.play().catch(error => {
                    console.log("إذن تشغيل الصوت يتطلب تفاعل المستخدم الأول:", error);
                });
            }

            // 2. تشغيل الفيديو في الخلفية والانتظار حتى يبدأ الدوران فعلياً
            if (envelopeVideo) {
                const playPromise = envelopeVideo.play();

                const showVideoSmoothly = () => {
                    if (coverImage) {
                        coverImage.classList.add('fade-out');
                    }
                };

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        envelopeVideo.addEventListener('timeupdate', showVideoSmoothly, { once: true });
                    }).catch(() => {
                        finishCoverAnimation();
                    });
                } else {
                    showVideoSmoothly();
                }

                envelopeVideo.onended = () => {
                    finishCoverAnimation();
                };
            } else {
                finishCoverAnimation();
            }
        });
    }

    function finishCoverAnimation() {
        if (interactiveCover) {
            interactiveCover.style.opacity = '0';
            setTimeout(() => {
                interactiveCover.style.display = 'none';
                if (mainContent) mainContent.classList.remove('hidden');
            }, 800);
        }
    }

    // --- العداد التنازلي لحفل الزفاف ---
    const weddingDate = new Date('October 17, 2026 19:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const dEl = document.getElementById('days');
            const hEl = document.getElementById('hours');
            const mEl = document.getElementById('minutes');
            const sEl = document.getElementById('seconds');

            if (dEl) dEl.innerText = String(days).padStart(2, '0');
            if (hEl) hEl.innerText = String(hours).padStart(2, '0');
            if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
            if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
        } else {
            const countdownDisplay = document.getElementById('countdown-display');
            if (countdownDisplay) {
                countdownDisplay.innerHTML = '<p style="font-size:1.5rem; color:#E8E3D5; font-family:\'Amiri\', serif;">أهلاً وسهلاً بكم في حفل زفافنا اليوم!</p>';
            }
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});