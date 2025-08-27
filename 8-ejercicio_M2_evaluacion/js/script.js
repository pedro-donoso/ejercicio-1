function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    document.getElementById(sectionName).classList.remove('hidden');

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('bg-red-500');
        link.classList.add('hover:bg-cyan-500');
    });

    
}