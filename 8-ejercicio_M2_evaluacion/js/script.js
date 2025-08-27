function showSection(sectionName, clickedElement) {
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

    if (clickedElement) {
        clickedElement.classList.add('bg-red-500');
        clickedElement.classList.remove('hover:bg-cyan-500');
    }

    document.getElementById('mobile-menu').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    });

    


});