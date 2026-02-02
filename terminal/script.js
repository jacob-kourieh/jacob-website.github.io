// ASCII Art
const ASCII_NAME = `
     ██╗ █████╗  ██████╗ ██████╗ ██████╗ 
     ██║██╔══██╗██╔════╝██╔═══██╗██╔══██╗
     ██║███████║██║     ██║   ██║██████╔╝
██   ██║██╔══██║██║     ██║   ██║██╔══██╗
╚█████╔╝██║  ██║╚██████╗╚██████╔╝██████╔╝
 ╚════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ 
`;

const ASCII_SUBTITLE = `
██╗  ██╗ ██████╗ ██╗   ██╗██████╗ ██╗███████╗██╗  ██╗
██║ ██╔╝██╔═══██╗██║   ██║██╔══██╗██║██╔════╝██║  ██║
█████╔╝ ██║   ██║██║   ██║██████╔╝██║█████╗  ███████║
██╔═██╗ ██║   ██║██║   ██║██╔══██╗██║██╔══╝  ██╔══██║
██║  ██╗╚██████╔╝╚██████╔╝██║  ██║██║███████╗██║  ██║
╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝
`;

// Data (Duplicated for standalone capability)
const profileData = {
    name: 'Jacob Kourieh',
    title: 'Nätverkstekniker & Full-Stack Developer',
    location: 'Göteborg',
    email: 'jacob.kourieh@gmail.com',
    linkedin: 'linkedin.com/in/jacob-kourieh',
    github: 'github.com/jacob-kourieh',
    website: 'jacob-kourieh.com/portfolio',
};

const profileSummary = `Nätverkstekniker och Full-Stack utvecklare med spetskompetens inom säker infrastruktur och automation.
Jag designar och driftar robusta nätverkslösningar samtidigt som jag utvecklar egna SaaS-tjänster och digitala plattformar som ska lanseras snart.

Med ett djupt intresse för AI och maskininlärning integrerar jag intelligenta lösningar för att modernisera och effektivisera IT-miljöer.
Målinriktad problemlösare som trivs i gränslandet mellan hårdvara, kod och verksamhetsnytta.`;

const skills = {
    'network': {
        title: '🌐 NÄTVERK & SÄKERHET',
        items: ['TCP/IP, OSI, LAN/WAN, VLAN', 'Routing, BGP, DHCP, DNS', 'VPN, Brandväggar, IDS', 'Wireshark & Trafikanalys', 'Segmentering & Cisco IOS']
    },
    'systems': {
        title: '🖥️  SYSTEM & MOLN',
        items: ['Linux (Ubuntu, Kali)', 'Windows Server, Hyper-V', 'VMware & Virtualisering', 'Azure Cloud & Terraform', 'Docker & Containers']
    },
    'programming': {
        title: '💻 UTVECKLING & AUTOMATION',
        items: ['Python (Automation, Pandas)', 'C# .NET, Entity Framework', 'JavaScript, TypeScript', 'SQL, Azure SQL, MongoDB', 'Bash & PowerShell']
    },
    'frontend': {
        title: '🎨 FRONTEND',
        items: ['React, Next.js', 'HTML, CSS, Tailwind CSS', 'WordPress', 'Responsiv Design', 'UI/UX & Figma']
    },
};

const projects = [
    { name: 'FöreningsVärlden', type: 'Frilans', description: 'Utvecklade och underhöll digitala lösningar för föreningsadministration.', tech: ['Blazor', 'C# .NET', 'Administration'], features: ['Funktioner för medlemshantering', 'Ekonomi och kommunikation', 'Responsiva gränssnitt'] },
    { name: 'Yoin Technologies AB', type: 'Frontend Developer', description: 'Drev utvecklingen av skalbara webbapplikationer med fokus på prestanda och modern React-arkitektur.', tech: ['React', 'TypeScript', 'Web Development'], features: ['Komponentbaserad arkitektur', 'Prestandaoptimering', 'Sömlös API-integration'] },
    { name: 'SWEDCON 18', type: 'Frontend Developer', description: 'Nyckelroll i utvecklingen av innovativa HealthTech-applikationer med Next.js.', tech: ['Next.js', 'React', 'HealthTech'], features: ['Användarcentrerat gränssnitt', 'Tvärfunktionellt samarbete', 'Tillgänglighet (WCAG)'] },
    { name: 'Fullstack Developer', type: 'Frilans', description: 'Byggde fullstack-applikationer med autentisering och API.', tech: ['Node.js', 'TypeScript', 'MongoDB'], features: ['Autentisering och säkerhet', 'REST API utveckling', 'Databasdesign'] },
];

const education = [
    { title: 'Nätverkstekniker', institution: 'JENSEN Yrkeshögskola', courses: ['LAN/WAN, TCP/IP, VPN', 'Routing & Switching', 'Nätverksdesign & Säkra nätverk', 'Automation med Python', 'Projektmetodik'] },
    { title: 'AI och maskininlärning', institution: 'NBI / Handelsakademin', courses: ['Dataanalys & Visualisering', 'Maskininlärning med Python', 'AI-lösningar', 'Praktiska projekt'] },
    { title: 'Frontend Developer', institution: 'NBI / Handelsakademin', courses: ['Modern webbutveckling', 'JavaScript & React', 'Agil metodik', 'UX/UI Design'] },
];

// State
let history = [];
let username = 'guest';
let currentPath = '~';
let loginStep = 'boot'; // 'boot', 'check_custom', 'ask_name', 'session'

// DOM Elements
const historyContainer = document.getElementById('history');
const inputLineContainer = document.getElementById('input-line');
const terminalEnd = document.getElementById('terminal-end');

// --- Helper Functions ---

function addToHistory(html, type = 'output') {
    const div = document.createElement('div');
    div.className = 'mb-2';
    div.innerHTML = html;
    historyContainer.appendChild(div);
    scrollToBottom();
}

function scrollToBottom() {
    terminalEnd.scrollIntoView({ behavior: 'smooth' });
}

function updateInputLine() {
    inputLineContainer.classList.remove('hidden');
    inputLineContainer.innerHTML = ''; // Clear previous

    if (loginStep === 'session') {
        const promptHtml = `
            <span class="text-promptUser font-bold">${username}@jacobportfolio</span>
            <span class="text-text">:</span>
            <span class="text-promptPath font-bold">${currentPath}</span>
            <span class="text-text">$</span>
        `;
        const inputHtml = `
            <div class="flex-1 flex items-center">
                <input type="text" id="terminal-input" class="flex-1 bg-transparent outline-none border-none text-text" autofocus autocomplete="off" spellcheck="false">
            </div>
        `;
        inputLineContainer.innerHTML = promptHtml + inputHtml;
    } else if (loginStep === 'check_custom') {
        inputLineContainer.innerHTML = `
            <div class="text-text">Log in with custom username? [y/N] </div>
            <div class="flex-1">
                <input type="text" id="terminal-input" class="w-full bg-transparent outline-none border-none text-text" autofocus autocomplete="off" spellcheck="false">
            </div>
        `;
    } else if (loginStep === 'ask_name') {
        inputLineContainer.innerHTML = `
            <div class="text-text">Enter username: </div>
             <div class="flex-1">
                <input type="text" id="terminal-input" class="w-full bg-transparent outline-none border-none text-text" autofocus autocomplete="off" spellcheck="false">
            </div>
        `;
    }

    const input = document.getElementById('terminal-input');
    if (input) {
        input.focus();
        input.addEventListener('keydown', handleInput);
    }
}

function handleInput(e) {
    if (e.key === 'Enter') {
        const inputVal = e.target.value;
        e.target.value = ''; // Clear input

        if (loginStep === 'session') {
            // Add command to history
            addToHistory(`
                <div class="flex items-start gap-2">
                    <span class="text-promptUser font-bold">${username}@jacobportfolio</span>
                    <span class="text-text">:</span>
                    <span class="text-promptPath font-bold">${currentPath}</span>
                    <span class="text-text">$</span>
                    <span class="text-text">${inputVal}</span>
                </div>
            `, 'command');

            executeCommand(inputVal);
        } else if (loginStep === 'check_custom') {
            addToHistory(`<div class="text-text">Log in with custom username? [y/N] ${inputVal}</div>`, 'output');

            const normalized = inputVal.trim().toLowerCase();
            if (normalized === 'y' || normalized === 'yes') {
                loginStep = 'ask_name';
            } else {
                addToHistory('<div class="text-text">n</div>', 'output');
                addToHistory('<div class="text-muted">Logging in as guest...</div>', 'output');
                username = 'guest';
                setTimeout(() => {
                    showWelcomeMessage('guest');
                    loginStep = 'session';
                    updateInputLine();
                }, 800);
            }
            updateInputLine();
        } else if (loginStep === 'ask_name') {
            addToHistory(`<div class="text-text">Enter username: ${inputVal}</div>`, 'output');

            const name = inputVal.trim() || 'guest';
            const cleanName = name.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
            const finalName = cleanName || 'guest';

            addToHistory(`<div class="text-muted">Logging in as ${finalName}...</div>`, 'output');
            username = finalName;
            setTimeout(() => {
                showWelcomeMessage(finalName);
                loginStep = 'session';
                updateInputLine();
            }, 800);
            updateInputLine();
        }
    }
}

function executeCommand(cmd) {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    if (command === '') return;

    switch (command) {
        case 'help':
            addToHistory(`
                <div class="text-text">
                    <div class="text-accent font-bold mb-2">Available Commands:</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div><span class="text-green">help</span> - Show this help message</div>
                        <div><span class="text-green">clear</span> - Clear terminal screen</div>
                        <div><span class="text-green">ls</span> - List directory contents</div>
                        <div><span class="text-green">pwd</span> - Print working directory</div>
                        <div><span class="text-green">whoami</span> - Display current user</div>
                        <div><span class="text-green">date</span> - Display current date/time</div>
                        <div><span class="text-green">cat [file]</span> - Display file contents</div>
                        <div><span class="text-green">profile</span> - Show profile information</div>
                        <div><span class="text-green">skills</span> - List technical skills</div>
                        <div><span class="text-green">experience</span> - Show work experience</div>
                        <div><span class="text-green">education</span> - Display education</div>
                        <div><span class="text-green">contact</span> - Show contact information</div>
                        <div><span class="text-green">about</span> - About this terminal</div>
                        <div><span class="text-green">login</span> - Restart login session</div>
                        <div><span class="text-green">exit</span> - Return to portfolio</div>
                    </div>
                </div>
            `);
            break;

        case 'clear':
            historyContainer.innerHTML = '';
            break;

        case 'login':
            historyContainer.innerHTML = '';
            username = 'guest';
            loginStep = 'boot';
            bootSequence();
            break;

        case 'exit':
        case 'quit':
            window.location.href = '../portfolio/';
            break;

        case 'ls':
            addToHistory(`
                <div class="text-text font-mono">
                    <div class="text-cyan">drwxr-xr-x  jacob  jacob  4096  Jan 31 2026  <span class="text-primary">profile/</span></div>
                    <div class="text-cyan">drwxr-xr-x  jacob  jacob  4096  Jan 31 2026  <span class="text-primary">skills/</span></div>
                    <div class="text-cyan">drwxr-xr-x  jacob  jacob  4096  Jan 31 2026  <span class="text-primary">experience/</span></div>
                    <div class="text-cyan">drwxr-xr-x  jacob  jacob  4096  Jan 31 2026  <span class="text-primary">education/</span></div>
                    <div class="text-cyan">-rw-r--r--  jacob  jacob  1024  Jan 31 2026  <span class="text-text">README.md</span></div>
                    <div class="text-cyan">-rw-r--r--  jacob  jacob  2048  Jan 31 2026  <span class="text-text">contact.txt</span></div>
                </div>
            `);
            break;

        case 'pwd':
            addToHistory(`<div class="text-text">/home/${username}/jacobportfolio${currentPath !== '~' ? `/${currentPath}` : ''}</div>`);
            break;

        case 'whoami':
            addToHistory(`<div class="text-text">${username}</div>`);
            break;

        case 'date':
            addToHistory(`<div class="text-text">${new Date().toString()}</div>`);
            break;

        case 'cat':
            if (args.length === 0) {
                addToHistory(`<div class="text-yellow">cat: missing file operand. Try 'cat README.md' or 'cat contact.txt'</div>`, 'error');
            } else if (args[0] === 'readme.md' || args[0] === 'readme') {
                addToHistory(`
                    <div class="text-text">
                        <div class="text-accent">📄 README.md</div>
                        <div class="mt-2">
                            <p>Welcome to my interactive portfolio terminal!</p>
                            <p class="mt-2">This is a fully functional terminal interface where you can explore my:</p>
                            <ul class="list-disc ml-6 mt-2">
                                <li>Professional profile and background</li>
                                <li>Technical skills and expertise</li>
                                <li>Projects and experience</li>
                                <li>Education and certifications</li>
                            </ul>
                            <p class="mt-2">Use 'help' to see all available commands.</p>
                        </div>
                    </div>
                `);
            } else if (args[0] === 'contact.txt' || args[0] === 'contact') {
                addToHistory(`
                     <div class="text-text">
                        <div class="text-accent">📧 Contact Information</div>
                        <div class="mt-2 space-y-1">
                            <p><span class="text-cyan">Name:</span> ${profileData.name}</p>
                            <p><span class="text-cyan">Email:</span> ${profileData.email}</p>
                            <p><span class="text-cyan">LinkedIn:</span> ${profileData.linkedin}</p>
                            <p><span class="text-cyan">GitHub:</span> ${profileData.github}</p>
                            <p><span class="text-cyan">Website:</span> ${profileData.website}</p>
                            <p><span class="text-cyan">Location:</span> ${profileData.location}</p>
                        </div>
                    </div>
                `);
            } else {
                addToHistory(`<div class="text-yellow">cat: ${args[0]}: No such file or directory</div>`, 'error');
            }
            break;

        case 'profile':
            addToHistory(`
                 <div class="text-text">
                    <div class="text-accent text-lg font-bold">👤 PROFILE</div>
                    <div class="mt-3 space-y-2">
                        <p><span class="text-cyan">Name:</span> ${profileData.name}</p>
                        <p><span class="text-cyan">Title:</span> ${profileData.title}</p>
                        <p><span class="text-cyan">Location:</span> ${profileData.location}</p>
                        <p><span class="text-cyan">Website:</span> ${profileData.website}</p>
                    </div>
                    <div class="mt-3 text-muted">
                        <div class="text-accent">About:</div>
                        <p class="whitespace-pre-wrap mt-1">${profileSummary}</p>
                    </div>
                </div>
            `);
            break;

        case 'skills':
            addToHistory(`
                 <div class="text-text">
                    <div class="text-accent text-lg font-bold">💻 TECHNICAL SKILLS</div>
                    <div class="mt-3 space-y-4">
                        ${Object.values(skills).map(c => `
                            <div>
                                <div class="text-cyan font-bold">${c.title}</div>
                                <ul class="list-disc ml-6 mt-1">
                                    ${c.items.map(i => `<li>${i}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `);
            break;

        case 'experience':
        case 'projects':
            addToHistory(`
                 <div class="text-text">
                    <div class="text-accent text-lg font-bold">🚀 WORK EXPERIENCE</div>
                    <div class="mt-3 space-y-4">
                         ${projects.map(p => `
                            <div class="border-l-2 pl-3 border-primary">
                                <div class="text-cyan font-bold">${p.name}</div>
                                <div class="text-muted text-sm">${p.type}</div>
                                <p class="mt-1">${p.description}</p>
                                <div class="mt-2"><span class="text-green">Tech:</span> ${p.tech.join(', ')}</div>
                                <div class="mt-2">
                                    <span class="text-yellow">Features:</span>
                                    <ul class="list-disc ml-6 mt-1 text-sm">
                                        ${p.features.map(f => `<li>${f}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `);
            break;

        case 'education':
            addToHistory(`
                 <div class="text-text">
                    <div class="text-accent text-lg font-bold">🎓 EDUCATION</div>
                    <div class="mt-3 space-y-4">
                         ${education.map(e => `
                            <div class="border-l-2 pl-3 border-primary">
                                <div class="text-cyan font-bold">${e.title}</div>
                                <div class="text-muted">${e.institution}</div>
                                <div class="mt-2">
                                     <span class="text-yellow">Courses:</span>
                                     <ul class="list-disc ml-6 mt-1 text-sm">
                                         ${e.courses.map(c => `<li>${c}</li>`).join('')}
                                     </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `);
            break;

        case 'about':
            addToHistory(`
                 <div class="text-text">
                    <div class="text-accent text-lg font-bold">ℹ️  ABOUT THIS TERMINAL</div>
                    <div class="mt-3 space-y-2">
                        <p>This is an interactive terminal interface built with React and TypeScript.</p>
                        <p class="mt-2"><span class="text-cyan">Version:</span> 2.0.0</p>
                        <p><span class="text-cyan">Built by:</span> ${profileData.name}</p>
                        <p><span class="text-cyan">Purpose:</span> Interactive portfolio exploration</p>
                        <p class="mt-2">It simulates a Linux-like terminal environment where you can explore my professional profile using familiar commands.</p>
                        <p class="mt-2" class="text-green">Type 'help' to see all available commands!</p>
                    </div>
                </div>
            `);
            break;

        case 'contact':
            executeCommand('cat contact.txt'); // Alias
            break;

        default:
            addToHistory(`
                <div>
                   <div class="text-text">Command '${command}' not found, did you mean:</div>
                   <div class="text-text ml-3">
                        command '<span class="text-green">help</span>' from deb portfolio-cli
                   </div>
                   <div class="text-text">Try: help</div>
                </div>
            `, 'error');
            break;
    }
}

function showWelcomeMessage(user) {
    addToHistory(`
        <div class="space-y-2 mt-4 mb-4">
            <div class="space-y-1 text-text">
                <p><span class="text-cyan font-bold">Welcome ${user}!</span></p>
                <p><span class="text-muted">Login time:</span> ${new Date().toLocaleString()}</p>
            </div>
            <div class="mt-2 space-y-1 text-text">
                <p><span class="text-cyan">System:</span> Jacob Portfolio OS v2.0</p>
                <p><span class="text-cyan">User:</span> ${user}</p>
                <p><span class="text-cyan">Home:</span> /home/${user}/jacobportfolio</p>
            </div>
            <div class="mt-4 p-3 rounded bg-yellow/15 border-l-[3px] border-yellow">
                <p class="text-yellow">📌 Quick Start:</p>
                <p class="text-text mt-1">Type <span class="text-accent font-bold">help</span> to see available commands</p>
                <p class="text-text">Type <span class="text-accent font-bold">exit</span> to return to portfolio view</p>
            </div>
        </div>
    `);
}

function bootSequence() {
    loginStep = 'boot';
    inputLineContainer.classList.add('hidden');

    setTimeout(() => {
        addToHistory(`
            <div class="space-y-3 mb-4">
                <pre class="text-[10px] leading-[1.2] text-accent">${ASCII_NAME}</pre>
                <pre class="text-[8px] leading-[1.2] text-primary">${ASCII_SUBTITLE}</pre>
                <div class="mt-2">
                    <div class="text-green border-y-2 border-green py-2">
                         <div class="text-center font-bold">Jacob Portfolio OS v2.0</div>
                         <div class="text-center text-sm">System initialized...</div>
                    </div>
                </div>
            </div>
        `);

        setTimeout(() => {
            loginStep = 'check_custom';
            updateInputLine();
        }, 800);
    }, 500);
}

// Initial Boot
window.onload = bootSequence;
