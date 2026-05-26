
function initMobileMenu() {
    const burgerBtn = document.getElementById('burgerBtn');
    const floatBurger = document.getElementById('floatBurger');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;

    if (!sidebar || !overlay) return;

    function toggle() {
        const floatIcon = floatBurger ? floatBurger.querySelector('.burger-menu') : null;
        
        if (burgerBtn) burgerBtn.classList.toggle('active');
        if (floatIcon) floatIcon.classList.toggle('active');
        
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    if (burgerBtn) burgerBtn.onclick = (e) => { e.preventDefault(); toggle(); };
    if (floatBurger) floatBurger.onclick = (e) => { e.preventDefault(); toggle(); };
    if (overlay) overlay.onclick = toggle;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggle();
        }
    });
}

window.__updateMobileAuth = function(name, href) {
    const mobileAuthBtn = document.getElementById('mobileAuthBtn');
    if (mobileAuthBtn) {
        mobileAuthBtn.innerHTML = name;
        mobileAuthBtn.href = href;
    }
};

window.__updateMobileCart = function(count) {
    const mobileCartCount = document.getElementById('mobileCartCount');
    if (mobileCartCount) {
        mobileCartCount.innerText = count;
    }
};

document.addEventListener('DOMContentLoaded', initMobileMenu);
