// JavaScript Document
document.addEventListener('DOMContentLoaded', () => {
    console.log("Gaming Hero Section loaded successfully!");

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Tutup menu saat link diklik (opsional, bagus untuk UX)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Logika Login Global (Modal & Page) ---
    const loginForm = document.getElementById('mainLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const usernameInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const btn = loginForm.querySelector('button[type="submit"]');
            
            const username = usernameInput.value.trim(); // Hapus spasi tidak sengaja
            const password = passwordInput.value.trim(); // Hapus spasi tidak sengaja
            const originalText = btn.textContent;

            btn.textContent = 'Memproses...';
            btn.disabled = true;

            try {
                const response = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (data.success) {
                    localStorage.setItem('admin_token', data.token);
                    window.location.href = 'admin-dashboard.html';
                } else {
                    alert(data.message || 'Login gagal. Periksa username/password Anda.');
                }
            } catch (error) {
                console.error('Login Error:', error);
                alert('Gagal terhubung ke server backend.');
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // --- Fitur Show/Hide Password ---
    const toggleBtn = document.getElementById('togglePasswordBtn');
    const passwordInput = document.getElementById('login-password');

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Ganti Icon Mata (Terbuka/Tertutup)
            if (type === 'text') {
                toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>`;
            } else {
                toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;height:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;
            }
        });
    }
});

function showComingSoon() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeComingSoon() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Login Modal Functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Menutup modal jika area luar diklik
window.onclick = function(event) {
    const modal = document.getElementById('comingSoonModal');
    const loginModal = document.getElementById('loginModal');
    
    if (event.target == modal) {
        closeComingSoon();
    }
    if (event.target == loginModal) {
        closeLoginModal();
    }
}