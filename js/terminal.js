// ===================================
// TERMINAL FUNCTIONALITY - UPDATED
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('output');
    const terminalBody = document.getElementById('terminalBody');
    const typingIndicator = document.getElementById('typingIndicator');
    const leftEye = document.getElementById('leftEye');
    const rightEye = document.getElementById('rightEye');
    const leftPupil = document.getElementById('leftPupil');
    const rightPupil = document.getElementById('rightPupil');

    let commandHistory = [];
    let historyIndex = -1;
    let typingTimeout;

    // ===================================
    // Terminal Commands - UPDATED CONTENT
    // ===================================
    const commands = {
        help: `
╔════════════════════════════════════════════════╗
║         AVAILABLE COMMANDS                     ║
╠════════════════════════════════════════════════╣
  about      - Learn about Sidharth
  education  - View educational background
  experience - Work experience & internship
  skills     - Display technical skills
  projects   - Show featured projects
  contact    - Get contact information
  social     - Social media links
  resume     - Download resume
  certifications - View certifications
  clear      - Clear terminal
  date       - Show current date and time
  whoami     - Display user info
  github     - Open GitHub profile
  linkedin   - Open LinkedIn profile
  website    - Visit portfolio website
  email      - Send an email
  joke       - Get a random developer joke
  quote      - Get an inspirational quote
  matrix     - Toggle matrix effect
  help       - Show this help message
╚════════════════════════════════════════════════╝`,

        about: `
╔════════════════════════════════════════════════╗
║         ABOUT SIDHARTH P N                     ║
╠════════════════════════════════════════════════╣
  Name:       Sidharth P N
  Role:       Android & Web Developer
  Location:   Ernakulam, Kerala, India
  Email:      sidharthpn447@gmail.com
  Website:    sidharthpn.dev
  
  🎓 M.Voc Student in Software Application
     Development at CUSAT (2024-2026)
  
  💡 Skilled in Android and web technologies.
     Passionate about clean architecture,
     Firebase, and Kotlin app development.
  
  🚀 Focused on delivering reliable, modern,
     and user-friendly software solutions!
╚════════════════════════════════════════════════╝`,

        education: `
╔════════════════════════════════════════════════╗
║         EDUCATION                              ║
╠════════════════════════════════════════════════╣
  📚 M.Voc in Software Application Development
     CUSAT, Kerala
     2024 - 2026 (Pursuing)
     Focus: Android Development, Firebase,
            Modern Web Technologies
  
  📚 Bachelor of Computer Applications (BCA)
     NSS College Rajakumary, Kerala
     2021 - 2024 (Completed)
  
  📚 Higher Secondary Education
     GHSS Peruvallur, Kerala
     2019 - 2021 (Completed)
╚════════════════════════════════════════════════╝`,

        experience: `
╔════════════════════════════════════════════════╗
║         WORK EXPERIENCE                        ║
╠════════════════════════════════════════════════╣
  💼 Android Development Intern
     BNBK Hub, Kakkanad | 2025
     
     • Built Task Management App using Kotlin
       and Firebase (Auth, Firestore, Storage)
     • Implemented CRUD features with MVVM
       architecture and role-based access
     • Collaborated using GitHub for version
       control and teamwork
     
  🤝 Volunteer
     International Conclave, CUSAT | Jan 2025
     
     • Supported event logistics and coordination
     • Session management and engagement
╚════════════════════════════════════════════════╝`,

        skills: `
╔════════════════════════════════════════════════╗
║         TECHNICAL SKILLS                       ║
╠════════════════════════════════════════════════╣
  📱 Android Development:
     Kotlin, XML, MVVM, Room DB, Firebase
  
  💻 Web Development:
     PHP, Python Django, HTML5, CSS3, JavaScript
  
  🗄️ Databases:
     Room DB, Firebase Firestore, MongoDB, SQL
  
  🛠️ Tools & Platforms:
     Firebase, Git/GitHub, Android Studio,
     VS Code, Agile Methodology
  
  💡 Soft Skills:
     Adaptability, Teamwork, Communication,
     Problem Solving, Time Management, Creativity
  
  🌍 Languages:
     English, Malayalam, Hindi (Basic),
     Tamil (Basic)
╚════════════════════════════════════════════════╝`,

        projects: `
╔════════════════════════════════════════════════╗
║         FEATURED PROJECTS                      ║
╠════════════════════════════════════════════════╣
  1. 📱 Task Management App
     Android app with Kotlin & Firebase
     Features: CRUD, MVVM, Role-based access
     Internship project at BNBK Hub
  
  2. 🚗 Car Wash Management System
     Online booking & management system
     Tech: PHP, MySQL, HTML/CSS
  
  3. 🚘 Car Rental Management System
     Full-featured rental platform
     Tech: Python Django, SQLite, Bootstrap
  
  📂 View more: github.com/SidharthPn
╚════════════════════════════════════════════════╝`,

        certifications: `
╔════════════════════════════════════════════════╗
║         CERTIFICATIONS                         ║
╠════════════════════════════════════════════════╣
  🏆 Generative AI for Everyday Life
     SWAYAM / NPTEL
     Krishna Kanta Handiqui State Open University
     
     📅 July 2025
     ⭐ Score: 97% | 4 Credits
     
  🤝 Volunteer Certificate
     International Conclave, CUSAT
     January 2025
╚════════════════════════════════════════════════╝`,

        contact: `
╔════════════════════════════════════════════════╗
║         CONTACT INFORMATION                    ║
╠════════════════════════════════════════════════╣
  📧 Email:    sidharthpn447@gmail.com
  📍 Location: Ernakulam, Kerala, India
  🌐 Website:  sidharthpn.dev
  🐙 GitHub:   github.com/SidharthPn
  💼 LinkedIn: linkedin.com/in/sidharth-pn-64aa07267
  
  💬 Feel free to reach out for collaborations,
     opportunities, or just to say hi! 👋
╚════════════════════════════════════════════════╝`,

        social: `
╔════════════════════════════════════════════════╗
║         SOCIAL MEDIA LINKS                     ║
╠════════════════════════════════════════════════╣
  🐙 GitHub:   https://github.com/SidharthPn
  💼 LinkedIn: https://linkedin.com/in/sidharth-pn-64aa07267
  🌐 Website:  https://sidharthpn.dev
  📧 Email:    sidharthpn447@gmail.com
╚════════════════════════════════════════════════╝`,

        whoami: `visitor@sidharthpn ~ You are a guest exploring Sidharth's portfolio!`,

        date: () => {
            const now = new Date();
            return `
╔════════════════════════════════════════════════╗
║         DATE & TIME                            ║
╠════════════════════════════════════════════════╣
  📅 ${now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  })}
  
  ⏰ ${now.toLocaleTimeString('en-US')}
  
  🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
╚════════════════════════════════════════════════╝`;
        },

        resume: 'Opening resume download...',
        github: 'Opening GitHub profile...',
        linkedin: 'Opening LinkedIn profile...',
        website: 'Opening portfolio website...',
        email: 'Opening email client...',
        clear: 'CLEAR',
        matrix: 'MATRIX_TOGGLE',
        joke: '',
        quote: ''
    };

    const jokes = [
        "Why do Android developers cry?\nBecause they have to deal with so many fragments! 📱😭",
        "Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛",
        "How many programmers does it take to change a light bulb?\nNone. It's a hardware problem! 💡",
        "Why do Java developers wear glasses?\nBecause they don't C#! 👓",
        "What's a programmer's favorite place to hang out?\nThe Foo Bar! 🍺",
        "Why did the developer go broke?\nBecause he used up all his cache! 💸",
        "A SQL query walks into a bar, walks up to two tables and asks...\n'Can I join you?' 🍻",
        "Why do programmers always mix up Halloween and Christmas?\nBecause Oct 31 == Dec 25! 🎃🎄",
        "What's the object-oriented way to become wealthy?\nInheritance! 💰",
        "Why did Firebase go to therapy?\nIt had too many unresolved promises! 🔥"
    ];

    const quotes = [
        '"First, solve the problem. Then, write the code."\n- John Johnson',
        '"Code is like humor. When you have to explain it, it\'s bad."\n- Cory House',
        '"Any fool can write code that a computer can understand.\nGood programmers write code that humans can understand."\n- Martin Fowler',
        '"The best error message is the one that never shows up."\n- Thomas Fuchs',
        '"Simplicity is the soul of efficiency."\n- Austin Freeman',
        '"Make it work, make it right, make it fast."\n- Kent Beck',
        '"Experience is the name everyone gives to their mistakes."\n- Oscar Wilde',
        '"Clean code always looks like it was written by someone who cares."\n- Robert C. Martin',
        '"Programming isn\'t about what you know; it\'s about what you can figure out."\n- Chris Pine',
        '"The only way to learn a new programming language is by writing programs in it."\n- Dennis Ritchie'
    ];

    // ===================================
    // Eye Tracking & Blinking
    // ===================================
    let blinkInterval;

    function blink() {
        leftEye.classList.add('closed');
        rightEye.classList.add('closed');
        leftPupil.style.display = 'none';
        rightPupil.style.display = 'none';
        
        setTimeout(() => {
            leftEye.classList.remove('closed');
            rightEye.classList.remove('closed');
            leftPupil.style.display = 'block';
            rightPupil.style.display = 'block';
        }, 150);
    }

    function startBlinking() {
        blinkInterval = setInterval(() => {
            blink();
        }, Math.random() * 3000 + 3000);
    }

    startBlinking();

    function moveEyes(x, y) {
        const leftEyeRect = leftEye.getBoundingClientRect();
        const rightEyeRect = rightEye.getBoundingClientRect();

        const leftAngle = Math.atan2(
            y - (leftEyeRect.top + leftEyeRect.height / 2),
            x - (leftEyeRect.left + leftEyeRect.width / 2)
        );

        const rightAngle = Math.atan2(
            y - (rightEyeRect.top + rightEyeRect.height / 2),
            x - (rightEyeRect.left + rightEyeRect.width / 2)
        );

        const maxMove = 4;
        leftPupil.style.transform = `translate(calc(-50% + ${Math.cos(leftAngle) * maxMove}px), calc(-50% + ${Math.sin(leftAngle) * maxMove}px))`;
        rightPupil.style.transform = `translate(calc(-50% + ${Math.cos(rightAngle) * maxMove}px), calc(-50% + ${Math.sin(rightAngle) * maxMove}px))`;
    }

    document.addEventListener('mousemove', (e) => {
        moveEyes(e.clientX, e.clientY);
    });

    // Watch typing
    input.addEventListener('input', () => {
        typingIndicator.classList.add('active');
        
        const inputRect = input.getBoundingClientRect();
        const cursorPosition = input.selectionStart;
        const charWidth = 8.4;
        const inputX = inputRect.left + (cursorPosition * charWidth);
        const inputY = inputRect.top + inputRect.height / 2;
        
        moveEyes(inputX, inputY);

        clearTimeout(typingTimeout);
        
        typingTimeout = setTimeout(() => {
            typingIndicator.classList.remove('active');
        }, 1000);
    });

    // ===================================
    // Command Processing
    // ===================================
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            
            // Add to history
            if (command !== '') {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
            }
            
            // Display command
            const commandLine = document.createElement('div');
            commandLine.className = 'command-output';
            commandLine.innerHTML = `<span style="color: var(--primary)">visitor@sidharthpn:~$</span> ${input.value}`;
            output.appendChild(commandLine);
            
            // Process command
            processCommand(command);
            
            input.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const partial = input.value.toLowerCase();
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
            if (matches.length === 1) {
                input.value = matches[0];
            }
        }
    });

    function processCommand(command) {
        const response = document.createElement('div');
        response.className = 'command-output';
        
        if (command === 'clear') {
            output.innerHTML = '';
            return;
        } else if (command === 'joke') {
            response.textContent = jokes[Math.floor(Math.random() * jokes.length)];
        } else if (command === 'quote') {
            response.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        } else if (command === 'resume') {
            response.textContent = commands[command];
            output.appendChild(response);
            setTimeout(() => {
                const mailtoLink = 'mailto:sidharthpn447@gmail.com?subject=Resume%20Request&body=Hi%20Sidharth,%0A%0AI%20would%20like%20to%20request%20your%20resume.%0A%0AThank%20you!';
                window.location.href = mailtoLink;
            }, 500);
            return;
        } else if (command === 'github') {
            response.textContent = commands[command];
            output.appendChild(response);
            setTimeout(() => window.open('https://github.com/SidharthPn', '_blank'), 500);
            return;
        } else if (command === 'linkedin') {
            response.textContent = commands[command];
            output.appendChild(response);
            setTimeout(() => window.open('https://linkedin.com/in/sidharth-pn-64aa07267', '_blank'), 500);
            return;
        } else if (command === 'website') {
            response.textContent = commands[command];
            output.appendChild(response);
            setTimeout(() => window.open('https://sidharthpn.dev', '_blank'), 500);
            return;
        } else if (command === 'email') {
            response.textContent = commands[command];
            output.appendChild(response);
            setTimeout(() => window.location.href = 'mailto:sidharthpn447@gmail.com', 500);
            return;
        } else if (command === 'matrix') {
            const canvas = document.getElementById('particles');
            const isVisible = canvas.style.opacity !== '0';
            canvas.style.opacity = isVisible ? '0' : '1';
            response.textContent = `Matrix effect ${isVisible ? 'disabled' : 'enabled'}! ✨`;
        } else if (command === 'date') {
            response.textContent = commands.date();
        } else if (commands[command]) {
            response.textContent = commands[command];
        } else if (command !== '') {
            response.innerHTML = `<span style="color: #ff5f57;">❌ Command not found:</span> '${command}'<br>Type 'help' for available commands.`;
        }
        
        output.appendChild(response);
    }

    // Keep terminal focused
    terminalBody.addEventListener('click', () => {
        input.focus();
    });

    // Focus input on load
    input.focus();
});