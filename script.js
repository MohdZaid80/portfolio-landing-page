// 1. Auto-update Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 3. Form Handling (Simulated Submission)
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const btn = this.querySelector('button[type="submit"]');
    
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
        alert(`Thanks for reaching out, ${name}! Your message has been sent successfully.`);
        contactForm.reset();
        
        btn.textContent = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
    }, 1000);
});

// ==========================================
// THEME TOGGLE LOGIC
// ==========================================
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check saved user preference or system default on page load
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    enableLightMode();
}

themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});

function enableLightMode() {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '🌙'; // Change icon to moon
    localStorage.setItem('theme', 'light');
}

function enableDarkMode() {
    document.body.classList.remove('light-mode');
    themeIcon.textContent = '☀️'; // Change icon to sun
    localStorage.setItem('theme', 'dark');
}

// ==========================================
// INTERSECTION OBSERVER SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
    root: null,         // Uses the browser viewport
    rootMargin: '0px',  // No offset margin
    threshold: .15     // Triggers when 15% of the element is visible
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the class that triggers the CSS transition
            entry.target.classList.add('reveal');
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Attach observer to all elements with .fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(element => {
    revealOnScroll.observe(element);
});

// ==========================================
// PROJECT FILTERING LOGIC
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Manage active state on buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Filter project cards
        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (filterValue === 'all' || filterValue === cardCategory) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// ==========================================
// 1. WEB AUDIO SYNTHESIZER (No External MP3s Needed)
// ==========================================
let soundEnabled = true;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(freq = 440, type = 'sine', duration = 0.08) {
    if (!soundEnabled) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

// Sound FX Toggle
document.getElementById('soundToggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    document.getElementById('soundIcon').textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled) playBeep(880, 'triangle', 0.1);
});

// Sound on click for buttons
document.querySelectorAll('.btn, .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => playBeep(520, 'sine', 0.05));
});

// ==========================================
// 2. INTERACTIVE TERMINAL ENGINE
// ==========================================
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        playBeep(300, 'square', 0.02);
        
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';
            
            appendTerminalOutput(`guest@dev:~$ ${cmd}`, 'code-keyword');
            
            switch (cmd) {
                case 'help':
                    appendTerminalOutput('Available commands:\n- projects: View featured work\n- skills: List technical stack\n- contact: Jump to contact form\n- matrix: Toggle secret Matrix Rain\n- clear: Clear terminal output', 'code-string');
                    break;
                case 'projects':
                    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                    appendTerminalOutput('Navigating to projects...', 'code-comment');
                    break;
                case 'skills':
                    document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
                    appendTerminalOutput('Navigating to skills...', 'code-comment');
                    break;
                case 'contact':
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    appendTerminalOutput('Navigating to contact form...', 'code-comment');
                    break;
                case 'matrix':
                    toggleMatrix();
                    appendTerminalOutput('Matrix mode toggled!', 'code-string');
                    break;
                case 'clear':
                    terminalOutput.innerHTML = '';
                    break;
                default:
                    appendTerminalOutput(`Command not recognized: '${cmd}'. Type 'help' for options.`, 'code-string');
            }
        }
    });
}

function appendTerminalOutput(text, className = '') {
    const p = document.createElement('p');
    p.className = className;
    p.innerText = text;
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// ==========================================
// 3. 3D CURSOR PARALLAX / HOLOGRAM TILT
// ==========================================
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

// ==========================================
// 4. MATRIX RAIN EASTER EGG
// ==========================================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let matrixInterval = null;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(6, 17, 12, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#A31C1B'; // Matching Crimson Accent
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(draw, 33);
}

function toggleMatrix() {
    canvas.classList.toggle('active');
    if (canvas.classList.contains('active')) {
        initMatrix();
    } else {
        clearInterval(matrixInterval);
    }
}