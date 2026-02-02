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

// Colors for reference (used via Tailwind classes mostly)
const colors = {
    background: '#1a1a2e',
    primary: '#6366f1',
    secondary: '#818cf8',
    accent: '#e87b35',
    text: '#e2e8f0',
    muted: '#94a3b8',
    green: '#22c55e',
    yellow: '#eab308',
    cyan: '#06b6d4',
};

// Profile Data
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

// Skills
const skills = {
    'network': {
        title: '🌐 NÄTVERK & SÄKERHET',
        items: [
            'TCP/IP, OSI, LAN/WAN, VLAN',
            'Routing, BGP, DHCP, DNS',
            'VPN, Brandväggar, IDS',
            'Wireshark & Trafikanalys',
            'Segmentering & Cisco IOS',
        ],
    },
    'systems': {
        title: '🖥️  SYSTEM & MOLN',
        items: [
            'Linux (Ubuntu, Kali)',
            'Windows Server, Hyper-V',
            'VMware & Virtualisering',
            'Azure Cloud & Terraform',
            'Docker & Containers',
        ],
    },
    'programming': {
        title: '💻 UTVECKLING & AUTOMATION',
        items: [
            'Python (Automation, Pandas)',
            'C# .NET, Entity Framework',
            'JavaScript, TypeScript',
            'SQL, Azure SQL, MongoDB',
            'Bash & PowerShell',
        ],
    },
    'frontend': {
        title: '🎨 FRONTEND',
        items: [
            'React, Next.js',
            'HTML, CSS, Tailwind CSS',
            'WordPress',
            'Responsiv Design',
            'UI/UX & Figma',
        ],
    },
};

// Projects
const projects = [
    {
        name: 'FöreningsVärlden',
        type: 'Frilans',
        description: 'Utvecklade och underhöll digitala lösningar för föreningsadministration.',
        tech: ['Blazor', 'C# .NET', 'Administration'],
        features: [
            'Funktioner för medlemshantering',
            'Ekonomi och kommunikation',
            'Responsiva gränssnitt',
        ],
    },
    {
        name: 'Yoin Technologies AB',
        type: 'Frontend Developer',
        description: 'Drev utvecklingen av skalbara webbapplikationer med fokus på prestanda och modern React-arkitektur. Implementerade avancerade frontend-lösningar i en snabbrörlig agil miljö.',
        tech: ['React', 'TypeScript', 'Web Development', 'Modern UI'],
        features: [
            'Komponentbaserad arkitektur',
            'State Management & Hooks',
            'Prestandaoptimering',
            'Responsiv & Adaptiv Design',
        ],
    },
    {
        name: 'SWEDCON 18',
        type: 'Frontend Developer',
        description: 'Nyckelroll i utvecklingen av innovativa HealthTech-applikationer byggda med Next.js. Arbetade tvärfunktionellt med branschexperter och designers för att skapa intuitiva digitala vårdverktyg.',
        tech: ['Next.js', 'React', 'HealthTech', 'UX/UI Collaboration'],
        features: [
            'Användarcentrerat gränssnitt',
            'Tvärfunktionellt samarbete',
            'Avancerad datahantering',
            'Tillgänglighet (WCAG)',
        ],
    },
    {
        name: 'Fullstack Developer',
        type: 'Frilans',
        description: 'Byggde fullstack-applikationer med autentisering och API.',
        tech: ['Node.js', 'TypeScript', 'MongoDB'],
        features: [
            'Autentisering och säkerhet',
            'REST API utveckling',
            'Databasdesign',
        ],
    },
];

// Education
const education = [
    {
        title: 'Nätverkstekniker',
        institution: 'JENSEN Yrkeshögskola',
        courses: [
            'LAN/WAN, TCP/IP, VPN',
            'Routing & Switching',
            'Nätverksdesign & Säkra nätverk',
            'Automation med Python',
            'Projektmetodik',
        ],
    },
    {
        title: 'AI och maskininlärning',
        institution: 'NBI / Handelsakademin',
        courses: [
            'Dataanalys & Visualisering',
            'Maskininlärning med Python',
            'AI-lösningar',
            'Praktiska projekt',
        ],
    },
    {
        title: 'Frontend Developer',
        institution: 'NBI / Handelsakademin',
        courses: [
            'Modern webbutveckling',
            'JavaScript & React',
            'Agil metodik',
            'UX/UI Design',
        ],
    },
];

// Languages
const languages = [
    { name: 'Svenska', level: '████████████████████ 100%' },
    { name: 'Engelska', level: '████████████████░░░░ 85%' },
    { name: 'Arabiska', level: '████████████████████ 100%' },
    { name: 'Spanska', level: '██████░░░░░░░░░░░░░░ 30%' },
];

const strengths = ['Analytisk', 'Självständig', 'Strukturerad', 'Snabb inlärning', 'Dokumenterar tydligt'];

// --- Helper Functions ---

// Creates a typing effect for the terminal command line
function createTerminalLine(command, outputHtml, delay = 0, showCursor = false) {
    const container = document.createElement('div');
    container.className = 'mb-4';

    // Command Line
    if (command) {
        const cmdDiv = document.createElement('div');
        cmdDiv.className = 'flex items-center font-mono text-sm md:text-base';
        cmdDiv.innerHTML = `
            <span class="text-green">jacob@portfolio</span>
            <span class="text-muted">:</span>
            <span class="text-cyan">~</span>
            <span class="text-muted mr-2">$</span>
            <span class="text-text command-text"></span>
            ${showCursor ? '<span class="cursor animate-pulse text-accent ml-1">▋</span>' : ''}
        `;
        container.appendChild(cmdDiv);

        // Typing effect
        setTimeout(() => {
            const textSpan = cmdDiv.querySelector('.command-text');
            const cursorSpan = cmdDiv.querySelector('.cursor');
            let i = 0;
            const interval = setInterval(() => {
                if (i <= command.length) {
                    textSpan.textContent = command.slice(0, i);
                    i++;
                } else {
                    clearInterval(interval);
                    if (!showCursor && cursorSpan) cursorSpan.remove();
                    // Show Output
                    if (outputHtml) {
                        const outputDiv = document.createElement('div');
                        outputDiv.className = 'mt-2 pl-0 md:pl-4 opacity-0 transition-opacity duration-300';
                        outputDiv.innerHTML = outputHtml;
                        container.appendChild(outputDiv);
                        // Trigger reflow
                        void outputDiv.offsetWidth;
                        outputDiv.classList.remove('opacity-0');
                    }
                }
            }, 30);
        }, delay);
    } else if (outputHtml) {
        // Just output, no command
        setTimeout(() => {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'opacity-0 transition-opacity duration-300';
            outputDiv.innerHTML = outputHtml;
            container.appendChild(outputDiv);
            void outputDiv.offsetWidth;
            outputDiv.classList.remove('opacity-0');
        }, delay);
    }

    return container;
}

function SectionHeader(title) {
    return `<div class="font-mono text-lg md:text-xl font-bold mb-4 pb-2 border-b border-accent/40 text-accent">${title}</div>`;
}

// --- Render Functions ---

function renderHome() {
    const container = document.createElement('div');
    container.className = 'space-y-6';

    const asciiDiv = document.createElement('div');

    const preName = document.createElement('pre');
    preName.className = 'text-[8px] sm:text-[10px] md:text-sm lg:text-base leading-none text-accent transition-opacity duration-500 opacity-0';
    preName.textContent = ASCII_NAME;

    const preSub = document.createElement('pre');
    preSub.className = 'text-[6px] sm:text-[8px] md:text-xs lg:text-sm leading-none text-primary transition-opacity duration-500 delay-300 opacity-0';
    preSub.textContent = ASCII_SUBTITLE;

    asciiDiv.appendChild(preName);
    asciiDiv.appendChild(preSub);
    container.appendChild(asciiDiv);

    // Trigger animations using local references immediately after append (via timeout to allow reflow)
    setTimeout(() => {
        preName.classList.remove('opacity-0');
        preSub.classList.remove('opacity-0');
    }, 100);

    const welcomeHtml = `
        <div class="space-y-4 font-mono text-sm md:text-base">
            <div class="p-4 rounded border border-green/40 bg-green/10">
                <span class="text-green">★</span>
                <span class="text-text"> Welcome to my </span>
                <span class="text-accent">portfolio</span>
                <span class="text-text">!</span>
            </div>
            <p class="text-muted">Network Technician | Full-Stack Developer | AI Enthusiast</p>
            <p class="text-text">Use the navigation above to explore.</p>
            <div class="p-3 rounded border mt-4 border-yellow/40 bg-yellow/10">
                <span class="text-yellow">🚀 </span>
                <span class="text-text">Current Focus: </span>
                <span class="text-cyan">Secure Infrastructure</span>
                <span class="text-text"> & </span>
                <span class="text-cyan">Moderna SaaS-lösningar</span>
            </div>
        </div>
    `;

    // Ensure typing animation plays
    container.appendChild(createTerminalLine('cat welcome.txt', welcomeHtml, 800, true));
    return container;
}

function renderProfile() {
    const container = document.createElement('div');
    container.className = 'space-y-6';

    const outputHtml = `
        <div class="space-y-6 font-mono text-sm md:text-base">
            ${SectionHeader('# PROFILE')}
            
            <div class="flex flex-col md:flex-row gap-6 items-start">
                <!-- Avatar -->
                <div class="relative border border-primary w-[200px] h-[240px] overflow-hidden flex-shrink-0">
                    <img src="../images/portfolio_avatar.webp" alt="Jacob Kourieh" class="w-full h-full object-cover">
                    <!-- Scanlines effect approximated with CSS -->
                    <div class="absolute inset-0 pointer-events-none" style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px);"></div>
                    <div class="absolute inset-0 pointer-events-none bg-cyan/10 mix-blend-overlay"></div>
                </div>

                <!-- Info -->
                <div class="flex-1 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><span class="text-muted">Name: </span><span class="text-accent">${profileData.name}</span></div>
                        <div><span class="text-muted">Title: </span><span class="text-text">${profileData.title}</span></div>
                        <div><span class="text-muted">Location: </span><span class="text-text">${profileData.location}</span></div>
                        <div><span class="text-muted">Website: </span><span class="text-cyan">${profileData.website}</span></div>
                    </div>
                    <div class="p-4 rounded border border-muted/30 text-text whitespace-pre-wrap">${profileSummary}</div>
                </div>
            </div>

            ${SectionHeader('## STRENGTHS')}
            <div class="flex flex-wrap gap-2">
                ${strengths.map(s => `<span class="px-3 py-1 rounded text-sm bg-primary/20 text-secondary border border-primary/40">${s}</span>`).join('')}
            </div>

            ${SectionHeader('## LANGUAGES')}
            <div class="space-y-2">
                ${languages.map(l => `
                    <div class="flex items-center gap-4">
                        <span class="text-text w-20">${l.name}</span>
                        <span class="text-green font-mono text-xs">${l.level}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.appendChild(createTerminalLine('cat profile.md', outputHtml, 0, true));
    return container;
}

function renderSkills() {
    const container = document.createElement('div');
    container.className = 'space-y-6';

    const outputHtml = `
        <div class="space-y-8 font-mono text-sm md:text-base">
            ${SectionHeader('# TECHNICAL SKILLS')}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${Object.values(skills).map(category => `
                    <div class="p-4 rounded border border-muted/30">
                        <div class="font-bold mb-3 pb-2 border-b border-muted/20 text-secondary">${category.title}</div>
                        <ul class="space-y-1">
                            ${category.items.map(item => `<li class="flex items-center gap-2"><span class="text-green">→</span><span class="text-text">${item}</span></li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    container.appendChild(createTerminalLine('ls -la ./skills/', outputHtml, 0, true));
    return container;
}

function renderProjects() {
    const container = document.createElement('div');
    container.className = 'space-y-6';

    const outputHtml = `
        <div class="space-y-6 font-mono text-sm md:text-base">
            ${SectionHeader('# WORK EXPERIENCE')}
            ${projects.map(project => `
                <div class="p-4 rounded border border-accent/40 mb-4">
                    <div class="flex flex-wrap items-center gap-3 mb-2">
                        <span class="text-yellow">★</span>
                        <span class="font-bold text-base md:text-lg text-accent">${project.name}</span>
                        <span class="text-xs px-2 py-0.5 rounded bg-primary/20 text-secondary">${project.type}</span>
                    </div>
                    <p class="text-muted mb-3">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                        ${project.tech.map(t => `<span class="text-xs px-2 py-0.5 rounded bg-cyan/15 text-cyan border border-cyan/30">${t}</span>`).join('')}
                    </div>
                    <ul class="space-y-1">
                        ${project.features.map(f => `<li class="flex items-start gap-2"><span class="text-green">✓</span><span class="text-text">${f}</span></li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
    container.appendChild(createTerminalLine('git log --oneline experience/', outputHtml, 0, true));
    return container;
}

function renderEducation() {
    const container = document.createElement('div');
    container.className = 'space-y-6';

    // JSON view construction
    const jsonHtml = `
        <div class="p-4 rounded border border-primary/40 bg-[#0a0a0f] overflow-x-auto">
            <pre class="text-text">
<span class="text-cyan">{</span>
  <span class="text-yellow">"education"</span><span class="text-cyan">: [</span>
${education.map((edu, idx) => `    <span class="text-cyan">{</span>
      <span class="text-yellow">"title"</span><span class="text-cyan">: </span><span class="text-green">"${edu.title}"</span><span class="text-cyan">,</span>
      <span class="text-yellow">"institution"</span><span class="text-cyan">: </span><span class="text-green">"${edu.institution}"</span><span class="text-cyan">,</span>
      <span class="text-yellow">"courses"</span><span class="text-cyan">: [</span>
${edu.courses.map((c, i) => `        <span class="text-green">"${c}"</span>${i < edu.courses.length - 1 ? '<span class="text-cyan">,</span>' : ''}`).join('\n')}
      <span class="text-cyan">]</span>
    <span class="text-cyan">}</span>${idx < education.length - 1 ? '<span class="text-cyan">,</span>' : ''}`).join('\n')}
  <span class="text-cyan">]</span>
<span class="text-cyan">}</span>
            </pre>
        </div>
    `;

    const cardsHtml = `
        <div class="mt-6">
            <div class="text-muted text-xs mb-3">━━━ Visual Overview ━━━</div>
            ${education.map(edu => `
                <div class="p-4 rounded border border-primary/40 mb-4">
                    <div class="flex flex-wrap items-center gap-3 mb-2">
                        <span class="text-accent">📚</span>
                        <span class="font-bold text-text">${edu.title}</span>
                    </div>
                    <div class="mb-2"><span class="text-muted">${edu.institution}</span></div>
                    <div class="flex flex-wrap gap-2 mt-3">
                        ${edu.courses.map(c => `<span class="text-xs px-2 py-1 rounded bg-secondary/15 text-secondary">${c}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    const outputHtml = `
        <div class="space-y-6 font-mono text-sm md:text-base">
            ${SectionHeader('# EDUCATION')}
            ${jsonHtml}
            ${cardsHtml}
        </div>
    `;
    container.appendChild(createTerminalLine('cat education.json', outputHtml, 0, true));
    return container;
}

function renderContact() {
    const container = document.createElement('div');
    container.className = 'space-y-6';

    const outputHtml = `
        <div class="space-y-6 font-mono text-sm md:text-base">
            ${SectionHeader('# CONTACT')}
            <div class="p-4 rounded border border-green/40 space-y-3">
                <div class="flex items-center gap-3"><span class="text-accent">📧</span><span class="text-muted">Email:</span><a href="mailto:${profileData.email}" class="text-cyan hover:underline">${profileData.email}</a></div>
                <div class="flex items-center gap-3"><span class="text-accent">💼</span><span class="text-muted">LinkedIn:</span><a href="https://${profileData.linkedin}" target="_blank" class="text-cyan hover:underline">${profileData.linkedin}</a></div>
                <div class="flex items-center gap-3"><span class="text-accent">🐙</span><span class="text-muted">GitHub:</span><a href="https://${profileData.github}" target="_blank" class="text-cyan hover:underline">${profileData.github}</a></div>
                <div class="flex items-center gap-3"><span class="text-accent">🌐</span><span class="text-muted">Website:</span><a href="https://${profileData.website}" target="_blank" class="text-cyan hover:underline">${profileData.website}</a></div>
            </div>
            
            <div class="p-4 rounded border border-yellow/40 bg-yellow/10">
                <p class="text-yellow">💡 Open for opportunities in:</p>
                <ul class="mt-2 space-y-1 text-text">
                    <li>• Network Technician</li>
                    <li>• Full-Stack Development</li>
                    <li>• DevOps & Cloud</li>
                    <li>• AI/ML Projects</li>
                </ul>
            </div>

            <a href="../" class="inline-flex items-center gap-2 px-4 py-2 rounded transition-all hover:opacity-80 bg-primary/20 text-secondary border border-primary/40">← Back to main site</a>
        </div>
    `;
    container.appendChild(createTerminalLine('cat contact.txt', outputHtml, 0, true));
    return container;
}

// --- Main App Logic ---

const contentElement = document.getElementById('content');
const navButtons = document.querySelectorAll('.nav-btn');

function renderSection(sectionId) {
    // Update active state
    navButtons.forEach(btn => {
        if (btn.dataset.section === sectionId) {
            btn.classList.add('bg-primary/30', 'text-accent', 'border-primary/50');
            btn.classList.remove('text-muted', 'border-transparent');
        } else {
            btn.classList.remove('bg-primary/30', 'text-accent', 'border-primary/50');
            btn.classList.add('text-muted', 'border-transparent');
        }
    });

    // Clear content
    contentElement.innerHTML = '';

    let content;
    switch (sectionId) {
        case 'home': content = renderHome(); break;
        case 'profile': content = renderProfile(); break;
        case 'skills': content = renderSkills(); break;
        case 'experience': content = renderProjects(); break;
        case 'education': content = renderEducation(); break;
        case 'contact': content = renderContact(); break;
        default: content = renderHome();
    }

    contentElement.appendChild(content);
}

// Initial Render
renderSection('home');
