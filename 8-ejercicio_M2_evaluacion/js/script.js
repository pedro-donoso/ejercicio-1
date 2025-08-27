function showSection(sectionName, clickedElement) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    document.getElementById(sectionName).classList.remove('hidden');

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('bg-red-500');
    });

    if (clickedElement) {
        clickedElement.classList.add('bg-red-500');
    }

    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            let sectionName;
            const linkText = this.textContent.trim();

            if (linkText === 'Inicio') {
                sectionName = 'inicio';
            } else if (linkText === 'Amenazas Comunes') {
                sectionName = 'amenazas';
            } else if (linkText === 'Consejos de Seguridad') {
                sectionName = 'consejos';
            }

            if (sectionName) {
                showSection(sectionName, this);
            }
        });
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            let sectionName;
            const linkText = this.textContent.trim();

            if (linkText === 'Inicio') {
                sectionName = 'inicio';
            } else if (linkText === 'Amenazas Comunes') {
                sectionName = 'amenazas';
            } else if (linkText === 'Consejos de Seguridad') {
                sectionName = 'consejos';
            }

            if (sectionName) {
                showSection(sectionName, null);

                const desktopLinks = document.querySelectorAll('.nav-link');
                desktopLinks.forEach(desktopLink => {
                    if (desktopLink.textContent.trim() === linkText) {
                        desktopLink.classList.add('bg-red-500');
                    }
                });
            }
        });
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        });
    }
});

