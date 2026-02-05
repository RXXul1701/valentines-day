// Valentine's Day Website - JavaScript
// Interactive functionality and animations

// ========== Letter Card Expansion ==========
document.addEventListener('DOMContentLoaded', function () {
    // Letter cards toggle
    const letterCards = document.querySelectorAll('.letter-card');

    letterCards.forEach(card => {
        card.addEventListener('click', function () {
            // Close all other cards
            letterCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });

            // Toggle current card
            this.classList.toggle('active');
        });
    });

    // ========== Valentine's Question Buttons ==========
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const revealMessage = document.getElementById('revealMessage');
    const buttonContainer = document.querySelector('.button-container');

    if (yesBtn && noBtn && revealMessage) {
        // Yes button click handler
        yesBtn.addEventListener('click', function () {
            // Send Email Notification
            sendNotification();

            // Hide both buttons with fade out
            buttonContainer.style.opacity = '0';
            buttonContainer.style.transform = 'scale(0.8)';

            setTimeout(() => {
                buttonContainer.style.display = 'none';

                // Show reveal message
                revealMessage.classList.add('show');

                // Create heart burst effect
                createHeartBurst();
            }, 300);
        });

        // No button runaway logic - continuously moves away from cursor
        let noBtnAttempts = 0;
        let lastCursorX = 0;
        let lastCursorY = 0;
        let cursorStopTimeout = null;

        function updateNoButtonPosition(e) {
            const cursorX = e.clientX || (e.touches && e.touches[0].clientX);
            const cursorY = e.clientY || (e.touches && e.touches[0].clientY);

            if (!cursorX || !cursorY) return;

            // Check if cursor actually moved
            if (cursorX !== lastCursorX || cursorY !== lastCursorY) {
                lastCursorX = cursorX;
                lastCursorY = cursorY;

                // Clear the stop timeout
                if (cursorStopTimeout) {
                    clearTimeout(cursorStopTimeout);
                }

                // Set timeout to detect when cursor stops (not used for stopping movement, just for tracking)
                cursorStopTimeout = setTimeout(() => {
                    // Cursor stopped moving
                }, 100);

                // Move the button away from cursor
                moveNoButtonAway(cursorX, cursorY);
            }
        }

        function moveNoButtonAway(cursorX, cursorY) {
            const noRect = noBtn.getBoundingClientRect();
            const yesRect = yesBtn.getBoundingClientRect();

            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;

            // Calculate center of the button in screen coordinates
            const noCenterX = noRect.left + btnWidth / 2;
            const noCenterY = noRect.top + btnHeight / 2;

            // Calculate distance from cursor
            const dx = noCenterX - cursorX;
            const dy = noCenterY - cursorY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only move if cursor is within 220px (increased for smoother earlier reaction)
            if (distance < 220) {
                noBtnAttempts++;

                // Initialize runaway state
                if (!noBtn.classList.contains('moving')) {
                    // FLIP technique for ultra-smooth Yes button re-centering
                    const first = yesBtn.getBoundingClientRect();
                    const currentRect = noBtn.getBoundingClientRect();

                    // Move No button to body
                    document.body.appendChild(noBtn);
                    noBtn.classList.add('moving');
                    noBtn.style.margin = '0';
                    noBtn.style.left = currentRect.left + 'px';
                    noBtn.style.top = currentRect.top + 'px';

                    const last = yesBtn.getBoundingClientRect();

                    // Invert: shift Yes button back to its original visual spot
                    const dx = first.left - last.left;
                    const dy = first.top - last.top;

                    yesBtn.style.transition = 'none';
                    yesBtn.style.transform = `translate(${dx}px, ${dy}px)`;

                    // Ultra-smooth glide back to center without bounce
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            yesBtn.style.transition = 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
                            yesBtn.style.transform = 'translate(0, 0)';
                        });
                    });
                }

                // Avoidance direction
                const angle = distance < 1 ? Math.random() * Math.PI * 2 : Math.atan2(dy, dx);

                // Speed calculation - increased moveAmount for more 'glide'
                const moveAmount = Math.max(80, 240 - distance);

                let targetX = parseFloat(noBtn.style.left || 0) + Math.cos(angle) * moveAmount;
                let targetY = parseFloat(noBtn.style.top || 0) + Math.sin(angle) * moveAmount;

                // STRICT VIEWPORT CLAMPING
                const padding = 30;
                const maxX = window.innerWidth - btnWidth - padding;
                const maxY = window.innerHeight - btnHeight - padding;

                targetX = Math.max(padding, Math.min(maxX, targetX));
                targetY = Math.max(padding, Math.min(maxY, targetY));

                // Avoid Yes button
                if (checkOverlap(targetX, targetY, btnWidth, btnHeight, yesRect)) {
                    const altAngle = angle + (Math.random() > 0.5 ? 1 : -1) * Math.PI / 2;
                    targetX = parseFloat(noBtn.style.left || 0) + Math.cos(altAngle) * moveAmount;
                    targetY = parseFloat(noBtn.style.top || 0) + Math.sin(altAngle) * moveAmount;

                    targetX = Math.max(padding, Math.min(maxX, targetX));
                    targetY = Math.max(padding, Math.min(maxY, targetY));
                }

                noBtn.style.left = targetX + 'px';
                noBtn.style.top = targetY + 'px';

                // After 5 attempts, make button smaller
                if (noBtnAttempts > 5) {
                    noBtn.style.transform = 'scale(0.85)';
                }

                // After 10 attempts, show hint
                if (noBtnAttempts === 10) {
                    const hint = document.createElement('div');
                    hint.textContent = "You can't escape fate 😏";
                    hint.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; color: var(--color-rose); font-family: var(--font-handwritten); pointer-events: none; z-index: 9999; animation: fadeOut 2s forwards;';
                    document.body.appendChild(hint);
                    setTimeout(() => hint.remove(), 2000);
                }
            }
        }

        function checkOverlap(x, y, width, height, yesRect) {
            const padding = 20;
            return !(
                x + width + padding < yesRect.left ||
                x - padding > yesRect.right ||
                y + height + padding < yesRect.top ||
                y - padding > yesRect.bottom
            );
        }

        // Track mouse/touch movement continuously
        document.addEventListener('mousemove', updateNoButtonPosition);
        document.addEventListener('touchmove', updateNoButtonPosition);
    }

    // ========== Gift Box Notifications ==========
    const giftBoxes = document.querySelectorAll('.gift-box-wrapper');
    giftBoxes.forEach(box => {
        box.addEventListener('click', function () {
            // Only send notification when opening for the first time
            if (!this.classList.contains('opened')) {
                const giftTitle = this.querySelector('h4').textContent;
                sendNotification(`Titir opened the gift: ${giftTitle} 🎁`, `Gift Opened: ${giftTitle}`);
            }
            this.classList.toggle('opened');
        });
    });

    // ========== Email Notification Logic ==========
    async function sendNotification(message = 'Titir clicked "Will you be my Valentine?" ❤️', subject = 'Valentine Selection - Titir') {
        const formId = 'xvzaeygv';

        // Use FormData for better compatibility with Formspree
        const formData = new FormData();
        formData.append('message', message);
        formData.append('_subject', subject);
        formData.append('reply_to', 'rahulmajumder.1701@gmail.com');

        console.log('Attempting to send notification:', message);

        try {
            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                console.log('✅ Notification sent successfully!');
            } else {
                const data = await response.json();
                console.error('❌ Formspree error:', data);
            }
        } catch (error) {
            console.error('❌ Network error while sending notification:', error);
            console.log('Note: If you are testing locally (file://), some browsers might block this request. This is normal and will work fine once deployed!');
        }
    }

    // ========== Heart Burst Animation ==========
    function createHeartBurst() {
        const container = document.querySelector('.question-glow');
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞'];

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.position = 'absolute';
                heart.style.fontSize = '2rem';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';

                container.appendChild(heart);

                // Animate heart
                const angle = (Math.PI * 2 * i) / 20;
                const distance = 150 + Math.random() * 100;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                heart.animate([
                    {
                        transform: 'translate(-50%, -50%) scale(0)',
                        opacity: 1
                    },
                    {
                        transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`,
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                }).onfinish = () => heart.remove();
            }, i * 50);
        }
    }

    // ========== Smooth Scroll for Navigation ==========
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

    // ========== Page Transition Effect ==========
    // Add fade-in effect to body on page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // ========== Mobile Navigation Toggle (if needed) ==========
    // Add touch-friendly hover effects for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.card, .reason-card, .letter-card, .gift-box-wrapper').forEach(card => {
            card.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', function () {
                this.style.transform = '';
            });
        });
    }

    // ========== Intersection Observer for Scroll Animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with fade-in classes
    document.querySelectorAll('.fade-in, .fade-in-delay').forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        observer.observe(el);
    });

    // ========== Random Heart Position Variation ==========
    const floatingHearts = document.querySelectorAll('.heart');
    floatingHearts.forEach((heart, index) => {
        // Randomize starting position slightly
        const randomTop = Math.random() * 20;
        heart.style.top = `${100 + randomTop}%`;

        // Randomize animation duration
        const duration = 12 + Math.random() * 6;
        heart.style.animationDuration = `${duration}s`;
    });

    // ========== Vibe Meter Logic ==========
    const vibeSlider = document.getElementById('vibeSlider');
    const vibeText = document.getElementById('vibeText');
    const vibeValue = document.getElementById('vibeValue');

    if (vibeSlider && vibeText && vibeValue) {
        vibeSlider.oninput = function () {
            const val = parseInt(this.value);

            // Logic for the forced 57% display beyond 100
            if (val > 100) {
                vibeValue.textContent = "57%";
            } else {
                vibeValue.textContent = val + "%";
            }

            let message = "";
            let color = "var(--color-rose)";
            let scale = 1;

            if (val === 0) {
                message = "Thinking about ghosting again.";
                color = "#666";
            } else if (val < 50) {
                message = "Calming my senses...";
                color = "var(--color-text-light)";
            } else if (val === 50) {
                message = "Acceptable human.";
                color = "var(--color-text-dark)";
            } else if (val < 57) {
                message = "Vibe checked.";
                color = "var(--color-rose)";
            } else if (val === 57) {
                message = "57% mine? Need not explain💀.";
                color = "var(--color-rose)";
                scale = 1.1;
            } else if (val > 57 && val <= 90) {
                // Sarcasm Range
                const sarcasms = [
                    "Connection status: 3/5 (Pending Approval)",
                    "Wait, do you actually like me?",
                    "Warning: Significant lapse in judgment.",
                    "System stability reaching record highs.",
                    "Is this... a real smile?"
                ];
                message = sarcasms[Math.floor((val - 58) / (32 / sarcasms.length)) % sarcasms.length];
                color = "var(--color-rose)";
                scale = 1.05;
            } else if (val >= 90 && val <= 100) {
                message = "Aarggh... I know this isnt happening.";
                color = "var(--color-deep-rose)";
                scale = 1.2;
            } else if (val > 100) {
                message = "Ahem Ahemm💀...";
                color = "var(--color-deep-rose)";
                scale = 1.4;
            }

            // Update text and styles
            vibeText.textContent = message;
            vibeText.style.color = color;
            vibeText.style.transform = `scale(${scale})`;
            vibeValue.style.color = color;

            // Dynamic Shadow Effect
            const glowSize = Math.max(0, (val - 50) / 4);
            vibeText.style.textShadow = `0 0 ${glowSize}px ${color}`;

            // Background Pulse on high values
            if (val > 100) {
                vibeText.classList.add('pulse');
            } else {
                vibeText.classList.remove('pulse');
            }
        };

        // ========== Jira Issue Management ==========
        const issueModal = document.getElementById('issueModal');
        const openIssueBtn = document.getElementById('openIssueModal');
        const closeIssueBtn = document.getElementById('closeIssueModal');
        const issueForm = document.getElementById('issueForm');
        const container = document.getElementById('dynamicIssuesContainer');

        // Load existing issues
        const loadIssues = () => {
            const issues = JSON.parse(localStorage.getItem('jiraIssues') || '[]');
            if (container) {
                container.innerHTML = '';
                issues.forEach((issue, index) => {
                    const issueEl = document.createElement('div');
                    issueEl.className = 'jira-issue';
                    issueEl.innerHTML = `
                    <div class="issue-meta">
                        <span>${issue.type}</span>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <span class="status-badge custom">${issue.status}</span>
                            <button class="delete-issue-btn" data-index="${index}" title="Delete Log">×</button>
                        </div>
                    </div>
                    <div class="issue-title">${issue.summary}</div>
                    <div style="font-size: 0.85rem; color: #5e6c84;">${issue.desc}</div>
                `;
                    container.appendChild(issueEl);
                });

                // Add delete listeners
                document.querySelectorAll('.delete-issue-btn').forEach(btn => {
                    btn.onclick = (e) => {
                        const index = e.target.getAttribute('data-index');
                        const issues = JSON.parse(localStorage.getItem('jiraIssues') || '[]');
                        issues.splice(index, 1);
                        localStorage.setItem('jiraIssues', JSON.stringify(issues));
                        loadIssues();
                    };
                });
            }
        };

        if (openIssueBtn) {
            openIssueBtn.onclick = () => issueModal.classList.add('active');
        }

        if (closeIssueBtn) {
            closeIssueBtn.onclick = () => issueModal.classList.remove('active');
        }

        if (issueForm) {
            issueForm.onsubmit = (e) => {
                e.preventDefault();
                const newIssue = {
                    type: document.getElementById('issueType').value,
                    status: document.getElementById('issueStatus').value,
                    summary: document.getElementById('issueSummary').value,
                    desc: document.getElementById('issueDesc').value
                };

                const issues = JSON.parse(localStorage.getItem('jiraIssues') || '[]');
                issues.push(newIssue);
                localStorage.setItem('jiraIssues', JSON.stringify(issues));

                issueForm.reset();
                issueModal.classList.remove('active');
                loadIssues();
            };
        }

        // Initial load
        loadIssues();

        // Initial trigger for vibe slider
        vibeSlider.oninput();
    }
});


// ========== Prevent Horizontal Scroll ==========
window.addEventListener('load', function () {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
});

// ========== SQL Terminal Logic ==========
document.addEventListener('DOMContentLoaded', () => {
    const termInput = document.getElementById('terminalInput');
    const termBody = document.getElementById('terminalBody');

    if (termInput && termBody) {
        const addLine = (text, type = 'default') => {
            const line = document.createElement('div');
            line.className = type === 'json' ? 'json-output' : 'terminal-line';
            line.innerHTML = text;
            termBody.insertBefore(line, termInput.parentElement);
            termBody.scrollTop = termBody.scrollHeight;
        };

        const executeCommand = (cmd) => {
            const command = cmd.toLowerCase().trim();
            addLine(`<span class="terminal-prompt">titir@local:~$</span> ${cmd}`);

            if (command === 'help') {
                addLine('Available tables: feelings, history, heart, trauma');
                addLine('Bash commands: clear, help, whoami, ping titir, ls -a, top, echo $LOVE');
                addLine('Try: SELECT * FROM feelings');
            } else if (command === 'clear') {
                const lines = termBody.querySelectorAll('.terminal-line, .json-output');
                lines.forEach(line => line.remove());
            } else if (command === "whoami") {
                const json = {
                    "user": "The Devoted Developer",
                    "role": "Chief Simp Officer",
                    "id": "1",
                    "permissions": ["Love", "Protect", "Listen"]
                };
                addLine(JSON.stringify(json, null, 4), 'json');
            } else if (command === "ping titir") {
                addLine('64 bytes from titir.heart: icmp_seq=1 ttl=64 time=0.01ms');
                addLine('64 bytes from titir.heart: icmp_seq=2 ttl=64 time=0.02ms');
                addLine('Result: 0% packet loss. Connection stable and healthy. ❤️');
            } else if (command === "sudo make me a sandwich") {
                addLine('titir is not in the sudoers file. This incident will be reported to your heart.');
            } else if (command === "ls -a" || command === "ls") {
                addLine('.  ..  .future_plans.sh  .cute_photos/  dream_home.json  secrets.txt');
            } else if (command === "top") {
                addLine('Tasks: 1 total, 1 running, 0 sleeping.');
                addLine('%CPU: 99.9 Titir, 0.1 Background_Processes');
                addLine('%Mem: 95.0 Memory_of_Titir, 5.0 Coffee');
            } else if (command === "echo $love") {
                addLine('Titir');
            } else if (command === "select * from feelings") {
                const json = {
                    "status": "Maximum",
                    "intensity": "9000+",
                    "current_vibe": "Ineffable",
                    "notes": "System is currently overwhelmed by the subject 'Titir'."
                };
                addLine(JSON.stringify(json, null, 4), 'json');
            } else if (command === "select * from heart") {
                const json = {
                    "owner": "Titir",
                    "encrypted": true,
                    "access_level": "Root",
                    "storage": "Infinite",
                    "status": "Occupied"
                };
                addLine(JSON.stringify(json, null, 4), 'json');
            } else if (command === "select * from trauma") {
                addLine("Empty set (0.00 sec). <br>Notice: Automatic cleanup daemon successfully removed all negative clusters.");
            } else if (command === "select * from history") {
                const json = [
                    { "date": "2022", "event": "Initialization", "result": "Complex" },
                    { "date": "2023-2024", "event": "The Great Silence", "result": "Glitch in system" },
                    { "date": "2025", "event": "Re-connection", "result": "Stability restored" },
                    { "date": "Today", "event": "Valentine Request", "result": "Pending..." }
                ];
                addLine(JSON.stringify(json, null, 4), 'json');
            } else if (command.includes('delete from trauma')) {
                addLine('ERROR 403: Forbidden. Only positive vibes allowed in this session.');
            } else if (command.includes('update mood')) {
                addLine('SYSTEM INFO: Mood already at maximum romantic capacity. No update required.');
            } else if (command.includes('insert into heart')) {
                addLine('CONSTRAINT VIOLATION: Primary key "Titir" already exists. Duplicate entries not allowed.');
            } else if (command === "") {
                // Do nothing
            } else {
                addLine(`-bash: ${cmd}: command not found. (Try 'help' or 'SELECT * FROM feelings')`);
            }
        };

        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeCommand(termInput.value);
                termInput.value = '';
            }
        });

        // Ensure input stays focused when clicking the terminal
        termBody.addEventListener('click', () => {
            termInput.focus();
        });
    }
});


// ========== Console Easter Egg ==========
console.log('%c Made with love for Titir ', 'color: #C71585; font-size: 20px; font-weight: bold; font-family: "Dancing Script", cursive;');
console.log('%cEvery line of code written with care, every pixel placed with love.', 'color: #FFB6C1; font-size: 14px;');

// ========== Polaroid Gallery Interactions ==========
document.addEventListener('DOMContentLoaded', function () {
    const polaroids = document.querySelectorAll('.polaroid');
    let maxZIndex = 1000;

    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', function () {
            // Remove active class from all polaroids
            polaroids.forEach(p => p.classList.remove('active'));

            // Add active class to clicked polaroid
            this.classList.add('active');

            // Bring to front by increasing z-index
            maxZIndex++;
            this.style.zIndex = maxZIndex;

            // Remove active class after animation completes
            setTimeout(() => {
                this.classList.remove('active');
            }, 500);
        });

        // Optional: Add touch support for mobile
        polaroid.addEventListener('touchstart', function (e) {
            e.preventDefault();
            this.click();
        });
    });
});

