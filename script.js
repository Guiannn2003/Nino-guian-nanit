document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
    setupMobileMenu();
});

// 1. Fetch and Parse XML Data
async function loadPortfolioData() {
    try {
        const response = await fetch('data.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");

        // Extract Data
        const profile = xmlDoc.querySelector('profile');
        const name = profile.querySelector('name').textContent;
        const title = profile.querySelector('title').textContent;
        const summary = profile.querySelector('summary').textContent;

        const skills = xmlDoc.querySelectorAll('skill');
        const projects = xmlDoc.querySelectorAll('project');
        const jobs = xmlDoc.querySelectorAll('job');

        // Update HTML
        document.querySelector('.hero-text h1').textContent = name;
        document.querySelector('.hero-text h2').textContent = title;
        document.querySelector('.hero-text .summary').textContent = summary;
        document.title = `Portfolio | ${name}`;

        // Populate Sections
        populateExperience(jobs);
        populateSkills(skills);
        populateProjects(projects);

    } catch (error) {
        console.error('Error loading XML data:', error);
    }
}

// 2. Populate Work Experience
function populateExperience(jobs) {
    const container = document.getElementById('experience-container');
    
    jobs.forEach(job => {
        const role = job.querySelector('role').textContent;
        const company = job.querySelector('company').textContent;
        const location = job.querySelector('location').textContent;
        const date = job.querySelector('date').textContent;
        
        const taskNodes = job.querySelectorAll('task');
        let taskHTML = '<ul>';
        taskNodes.forEach(task => {
            taskHTML += `<li>${task.textContent}</li>`;
        });
        taskHTML += '</ul>';

        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3 class="job-role">${role}</h3>
            <p class="job-company">${company}</p>
            <p class="job-location">${location}</p>
            <span class="job-date">${date}</span>
            <div class="job-tasks">${taskHTML}</div>
        `;
        
        container.appendChild(card);
    });
}

// 3. Populate Skills
function populateSkills(skills) {
    const container = document.getElementById('skills-container');
    
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill.textContent;
        container.appendChild(span);
    });
}

// 4. Populate Projects
function populateProjects(projects) {
    const container = document.getElementById('projects-container');
    
    projects.forEach(project => {
        const title = project.querySelector('title').textContent;
        const desc = project.querySelector('desc').textContent;
        const tech = project.querySelector('tech').textContent;
        
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${title}</h3>
            <p>${desc}</p>
            <span class="tech"><i class="fas fa-server"></i> ${tech}</span>
        `;
        
        container.appendChild(card);
    });
}

// 5. Mobile Menu Toggle
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav-links');
    
    btn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}