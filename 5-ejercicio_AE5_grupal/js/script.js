document.addEventListener('DOMContentLoaded', function() {
    showSectionFromUrl();
    
    setupNavigation();
    
    setupSearch();
    
    setupRegistration();
    
    setupPasswordToggle();
});

function showSectionFromUrl() {
    const hash = window.location.hash;
    
    const validSections = ['#catalogo', '#registro', '#sobre-nosotros'];
    const sectionToShow = validSections.includes(hash) ? hash : '#catalogo';
    
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    document.querySelector(sectionToShow).style.display = 'block';
}

function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('href');
            
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
            });
            
            document.querySelector(sectionId).style.display = 'block';
            
            window.location.hash = sectionId;
            
            if (window.innerWidth < 992) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
    
    window.addEventListener('hashchange', showSectionFromUrl);
}

function setupSearch() {
    const searchForm = document.getElementById('search-form');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const searchType = document.getElementById('search-type').value;
        const books = document.querySelectorAll('.book');
        let foundResults = false;
        
        books.forEach(book => {
            const title = book.getAttribute('data-title');
            const author = book.getAttribute('data-author');
            const genre = book.getAttribute('data-genre');
            let shouldShow = false;
            
            if (searchTerm === '') {
                shouldShow = true;
            } else {
                if (searchType === 'all') {
                    shouldShow = title.includes(searchTerm) || 
                                author.includes(searchTerm) || 
                                genre.includes(searchTerm);
                } else if (searchType === 'title') {
                    shouldShow = title.includes(searchTerm);
                } else if (searchType === 'author') {
                    shouldShow = author.includes(searchTerm);
                } else if (searchType === 'genre') {
                    shouldShow = genre.includes(searchTerm);
                }
            }
            
            if (shouldShow) {
                book.style.display = 'block';
                foundResults = true;
            } else {
                book.style.display = 'none';
            }
        });
        
        const noResultsMsg = document.getElementById('no-results');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
        
        if (!foundResults && searchTerm !== '') {
            const noResults = document.createElement('div');
            noResults.id = 'no-results';
            noResults.className = 'no-results';
            noResults.textContent = 'No se encontraron libros que coincidan con tu búsqueda.';
            document.getElementById('books-container').appendChild(noResults);
        }
    });
}

function setupRegistration() {
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullname');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let isValid = true;
        
        if (fullName.value.trim() === '' || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,}$/.test(fullName.value)) {
            fullName.classList.add('is-invalid');
            isValid = false;
        } else {
            fullName.classList.remove('is-invalid');
        }
        
        if (email.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
        }
        
        if (password.value === '' || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password.value)) {
            password.classList.add('is-invalid');
            isValid = false;
        } else {
            password.classList.remove('is-invalid');
        }
        
        if (isValid) {
            alert('¡Registro exitoso! Bienvenido a LibroLibre.');
            registerForm.reset();
            document.querySelector('.password-strength').style.width = '0';
        }
    });
    
    document.getElementById('fullname').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });
    
    document.getElementById('password').addEventListener('input', function() {
        const password = this.value;
        const strengthBar = document.querySelector('.password-strength');
        
        if (password.length === 0) {
            strengthBar.style.width = '0';
            return;
        }
        
        let strength = 0;
        
        if (password.length >= 8) strength++;
        
        if (/\d/.test(password)) strength++;
        
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        strengthBar.className = 'password-strength';
        if (strength <= 1) {
            strengthBar.classList.add('strength-weak');
        } else if (strength === 2) {
            strengthBar.classList.add('strength-medium');
        } else {
            strengthBar.classList.add('strength-strong');
        }
    });
}

function setupPasswordToggle() {
    const toggleBtn = document.querySelector('.toggle-password');
    const passwordField = document.getElementById('password');
    
    toggleBtn.addEventListener('click', function() {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.textContent = 'Ocultar';
        } else {
            passwordField.type = 'password';
            this.textContent = 'Mostrar';
        }
    });
}