/* assets/js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Update Navbar based on LocalStorage Login state
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        const navLinks = document.querySelector('.nav-links');
        
        // Find the login button li
        const loginBtn = document.getElementById('nav-login-btn');
        if (loginBtn) {
            const li = loginBtn.parentElement;
            
            if (currentUser.role === 'admin') {
                li.innerHTML = `<a href="admin_dashboard.html" class="btn btn-primary" style="margin-right: 10px;">Admin Panel</a>
                                <a href="#" onclick="logout()" class="btn btn-outline" style="border-color: var(--danger); color: var(--danger);">Logout</a>`;
            } else {
                li.innerHTML = `<span style="margin-right: 15px; font-weight: 600;">Hi, ${currentUser.name.split(' ')[0]}</span>
                                <a href="#" onclick="logout()" class="btn btn-outline" style="border-color: var(--danger); color: var(--danger);">Logout</a>`;
            }
        }
    }
});

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}
