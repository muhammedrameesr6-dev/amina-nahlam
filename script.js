/**
 * ENGAGEMENT CEREMONY INVITATION
 * Amina Azzah & Nahal Rasheed
 * November 21, 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const bgMusic = document.getElementById('bg-music');
  const openBtn = document.getElementById('open-btn');
  const coverOverlay = document.getElementById('cover-overlay');
  const coverCard = document.getElementById('cover-card');
  const coverParticles = document.getElementById('cover-particles');
  const blossomEffect = document.getElementById('blossom-effect');
  const musicToggle = document.getElementById('music-toggle');
  
  const countdownText = document.getElementById('countdown-text');
  
  const addToCalendarBtn = document.getElementById('add-to-calendar-btn');
  const calendarModal = document.getElementById('calendar-modal');
  const calModalCloseBtn = document.getElementById('cal-modal-close-btn');
  const btnGoogleCal = document.getElementById('btn-google-cal');
  const btnIcsDownload = document.getElementById('btn-ics-download');
  
  const rsvpTriggerBtn = document.getElementById('rsvp-trigger-btn');
  const rsvpModal = document.getElementById('rsvp-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccessView = document.getElementById('rsvp-success-view');
  const successMessage = document.getElementById('success-message');
  const successDoneBtn = document.getElementById('success-done-btn');
  const wishesList = document.getElementById('wishes-list');

  // ==================== COVER PARTICLES ====================
  function createCoverParticles() {
    if (!coverParticles) return;
    const icons = ['🌸', '✨', '💜', '✦', '❀', '⋆'];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'cover-particle';
      p.textContent = icons[Math.floor(Math.random() * icons.length)];
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${6 + Math.random() * 8}s`;
      p.style.animationDelay = `${Math.random() * 6}s`;
      p.style.fontSize = `${10 + Math.random() * 14}px`;
      coverParticles.appendChild(p);
    }
  }
  createCoverParticles();

  // ==================== OPEN INVITATION BUTTON ====================
  let isOpened = false;

  openBtn.addEventListener('click', (e) => {
    if (isOpened) return;
    isOpened = true;

    // Create blossom petal burst effect over button
    const burstSymbols = ['🌸', '💜', '✨', '❀', '🌷', '✧'];
    for (let i = 0; i < 18; i++) {
      const petal = document.createElement('span');
      petal.className = 'blossom-petal';
      petal.textContent = burstSymbols[i % burstSymbols.length];
      
      const angle = (i / 18) * Math.PI * 2;
      const distance = 60 + Math.random() * 80;
      const tx = `${Math.cos(angle) * distance}px`;
      const ty = `${Math.sin(angle) * distance}px`;
      const rot = `${(Math.random() - 0.5) * 400}deg`;
      
      petal.style.setProperty('--tx', tx);
      petal.style.setProperty('--ty', ty);
      petal.style.setProperty('--rot', rot);
      petal.style.fontSize = `${14 + Math.random() * 12}px`;
      
      blossomEffect.appendChild(petal);
    }

    // Play Background Music
    if (bgMusic) {
      bgMusic.play().then(() => {
        musicToggle.classList.remove('paused');
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    }

    // Smooth transition out of cover card
    setTimeout(() => {
      coverOverlay.classList.add('opened');
      setTimeout(() => {
        coverOverlay.style.display = 'none';
      }, 1000);
    }, 450);
  });

  // ==================== FLOATING MUSIC CONTROLLER ====================
  musicToggle.addEventListener('click', () => {
    if (!bgMusic) return;
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        musicToggle.classList.remove('paused');
      }).catch(e => console.error(e));
    } else {
      bgMusic.pause();
      musicToggle.classList.add('paused');
    }
  });

  // ==================== LIVE COUNTDOWN TIMER ====================
  // Target: Saturday, November 21, 2026, 16:00:00 (Qatar Time UTC+3)
  const targetDate = new Date('2026-11-21T16:00:00+03:00');

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      countdownText.textContent = "Today is the Blessed Engagement Day! 💜";
      return;
    }

    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / (3600 * 24));
    const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    countdownText.textContent = `${days} days ${hours} hours ${minutes} min ${seconds} sec`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==================== CALENDAR INTEGRATION ====================
  // Google Calendar URL
  const eventTitle = encodeURIComponent("Engagement Ceremony | Dr. Amina Azzah & Nahal Rasheed");
  const eventDetails = encodeURIComponent("Cordially inviting you to celebrate the blessed Engagement Ceremony of Dr. Amina Azzah & Nahal Rasheed.\n\nDress Code: Soft Lavender & Crisp White / Heather Gray.");
  const eventLocation = encodeURIComponent("Sharq Village & Spa, a Ritz-Carlton Hotel, Ras Abu Abboud Street, Doha, Qatar");
  // 2026-11-21 16:00 UTC+3 = 13:00 UTC
  const gcalDates = "20261121T130000Z/20261121T180000Z";
  btnGoogleCal.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${gcalDates}&details=${eventDetails}&location=${eventLocation}`;

  // Apple / Outlook .ics File Generator
  btnIcsDownload.addEventListener('click', () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Amina and Nahal//Engagement Ceremony//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:amina-nahal-engagement-20261121@wedding',
      'SUMMARY:Engagement Ceremony: Dr. Amina Azzah & Nahal Rasheed',
      'DESCRIPTION:Cordially inviting you to celebrate the blessed Engagement Ceremony of Dr. Amina Azzah & Nahal Rasheed.\\nDress Code: Soft Lavender & Crisp White / Heather Gray.',
      'LOCATION:Sharq Village & Spa\\, a Ritz-Carlton Hotel\\, Doha\\, Qatar',
      'DTSTART:20261121T130000Z',
      'DTEND:20261121T180000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Amina_Nahal_Engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Calendar Modal Open / Close
  addToCalendarBtn.addEventListener('click', () => {
    calendarModal.classList.add('active');
    calendarModal.setAttribute('aria-hidden', 'false');
  });

  calModalCloseBtn.addEventListener('click', () => {
    calendarModal.classList.remove('active');
    calendarModal.setAttribute('aria-hidden', 'true');
  });

  calendarModal.addEventListener('click', (e) => {
    if (e.target === calendarModal) {
      calendarModal.classList.remove('active');
      calendarModal.setAttribute('aria-hidden', 'true');
    }
  });

  // ==================== RSVP MODAL & SUBMISSION ====================
  rsvpTriggerBtn.addEventListener('click', () => {
    rsvpModal.classList.add('active');
    rsvpModal.setAttribute('aria-hidden', 'false');
  });

  modalCloseBtn.addEventListener('click', () => {
    closeRsvpModal();
  });

  rsvpModal.addEventListener('click', (e) => {
    if (e.target === rsvpModal) {
      closeRsvpModal();
    }
  });

  function closeRsvpModal() {
    rsvpModal.classList.remove('active');
    rsvpModal.setAttribute('aria-hidden', 'true');
    // Reset view
    setTimeout(() => {
      rsvpForm.classList.remove('hidden');
      rsvpSuccessView.classList.add('hidden');
    }, 300);
  }

  successDoneBtn.addEventListener('click', () => {
    closeRsvpModal();
  });

  // Default initial wishes list
  const defaultWishes = [
    {
      name: "Dr. Farooq & Family",
      attending: true,
      text: "Warmest congratulations to dearest Amina & Nahal! May Allah bless your union with eternal love, harmony, and joy. Looking forward to the ceremony! 💜"
    },
    {
      name: "Sabina & Rehan",
      attending: true,
      text: "So thrilled for both of you! You two make the most wonderful couple. Wishing you a lifetime of laughter and companionship!"
    },
    {
      name: "Adil Mansoor",
      attending: true,
      text: "Hearty congratulations to the bride and groom! Excited to celebrate with everyone in Doha!"
    }
  ];

  function loadWishes() {
    const saved = localStorage.getItem('wedding_wishes');
    const wishes = saved ? JSON.parse(saved) : defaultWishes;
    
    wishesList.innerHTML = '';
    wishes.forEach(w => {
      const card = document.createElement('div');
      card.className = 'wish-card';
      card.innerHTML = `
        <div class="wish-header">
          <span class="wish-author">${escapeHtml(w.name)}</span>
          <span class="wish-badge">${w.attending ? 'Attending ✓' : 'Sent Wishes'}</span>
        </div>
        <p class="wish-text">"${escapeHtml(w.text)}"</p>
      `;
      wishesList.appendChild(card);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  loadWishes();

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guestName = document.getElementById('guest-name').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const guestCount = document.getElementById('guest-count').value;
    const guestMessage = document.getElementById('guest-message').value.trim();

    if (!guestName) return;

    const isAttending = attendance === 'yes';

    // Save to localStorage wishes if message provided
    if (guestMessage) {
      const saved = localStorage.getItem('wedding_wishes');
      const wishes = saved ? JSON.parse(saved) : defaultWishes;
      wishes.unshift({
        name: guestName,
        attending: isAttending,
        text: guestMessage
      });
      localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
      loadWishes();
    }

    // Success text
    if (isAttending) {
      successMessage.textContent = `Thank you, ${guestName}! We are overjoyed that you will be joining us (${guestCount} guest(s)) for our engagement celebration! 💜`;
    } else {
      successMessage.textContent = `Thank you for letting us know, ${guestName}. Your warm wishes and prayers mean the world to us! 🤍`;
    }

    // Show success view
    rsvpForm.classList.add('hidden');
    rsvpSuccessView.classList.remove('hidden');

    // Trigger canvas confetti celebration
    launchCelebrationConfetti();
  });

  // ==================== AMBIENT PETALS & SPARKLING CANVAS ====================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const petalColors = [
      'rgba(216, 199, 234, 0.45)',
      'rgba(201, 182, 228, 0.4)',
      'rgba(235, 223, 247, 0.5)',
      'rgba(245, 238, 250, 0.6)'
    ];

    const PETAL_COUNT = 22;

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 50;
        this.size = 5 + Math.random() * 7;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = 0.5 + Math.random() * 1.0;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.aspect = 0.5 + Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX + Math.sin(this.angle) * 0.3;
        this.y += this.speedY;
        this.angle += this.rotationSpeed;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * this.aspect, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      const p = new Petal();
      p.y = Math.random() * height; // initial distribution
      petals.push(p);
    }

    function animatePetals() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animatePetals);
    }

    animatePetals();
  }

  // ==================== CONFETTI BURST ====================
  function launchCelebrationConfetti() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const confettiColors = ['#9d82b8', '#d4c2ee', '#ffffff', '#cfa856', '#644a7f'];
    const confs = [];

    for (let i = 0; i < 60; i++) {
      confs.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: -4 - Math.random() * 10,
        size: 4 + Math.random() * 6,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 15,
        alpha: 1
      });
    }

    let frame = 0;
    function renderConfetti() {
      if (frame > 90) return;
      confs.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.3; // gravity
        c.rotation += c.vr;
        c.alpha -= 0.01;

        ctx.save();
        ctx.globalAlpha = Math.max(0, c.alpha);
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
        ctx.restore();
      });
      frame++;
      requestAnimationFrame(renderConfetti);
    }

    renderConfetti();
  }
});
