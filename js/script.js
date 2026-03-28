// ==========================================
// 🚀 頁面切換與網址路由 (Hash Routing) 核心邏輯
// ==========================================

function switchChannel(channelId) {
    window.location.hash = channelId;
}

function renderPage(channelId) {
    let menuId = channelId.startsWith('detail-') ? 'works' : channelId;

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtns = Array.from(document.querySelectorAll('.nav-btn'))
        .filter(btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(menuId));
    if (activeBtns.length > 0) activeBtns[0].classList.add('active');

    const currentVisible = document.querySelector('.channel-section.visible');
    const targetSection = document.getElementById(channelId);

    if (!targetSection || currentVisible === targetSection) return;

    if (currentVisible) {
        currentVisible.classList.remove('visible'); 
        setTimeout(() => {
            currentVisible.classList.remove('active'); 
            targetSection.classList.add('active'); 
            void targetSection.offsetWidth; 
            targetSection.classList.add('visible'); 

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 500); 
    } else {
        targetSection.classList.add('active', 'visible');
    }
}

// ==========================================
// 🧠 智慧路由與平滑滾動大總管
// ==========================================

function handleRouting() {
    const currentHash = window.location.hash.replace('#', '');

    if (!currentHash) {
        renderPage('about');
        return;
    }

    const targetElement = document.getElementById(currentHash);
    if (!targetElement) return;

    if (targetElement.classList.contains('channel-section')) {
        renderPage(currentHash);
    } else {
        const parentSection = targetElement.closest('.channel-section');
        const currentVisible = document.querySelector('.channel-section.visible');

        if (parentSection && parentSection !== currentVisible) {
            renderPage(parentSection.id);
            setTimeout(() => {
                executeScroll(targetElement);
            }, 550);
        } else if (parentSection && parentSection === currentVisible) {
            executeScroll(targetElement);
        }
    }
}

function executeScroll(target) {
    const isMobile = window.innerWidth <= 900;
    const headerOffset = isMobile ? 20 : 100; 

    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);

// ==========================================
// --- ScrollSpy (捲動監聽) ---
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.toc-link').forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                // 🗑️ 已移除手機版 scrollIntoView 邏輯，避免滾動死鎖
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.article-section').forEach((section) => {
    observer.observe(section);
});

// ==========================================
// --- 燈箱 (Lightbox) 控制邏輯 ---
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox || !lightboxImg) return;

    const images = document.querySelectorAll('.detail-img-placeholder img, .award-img, .iteration-card img');

    images.forEach(image => {
        image.style.cursor = 'zoom-in';
        image.addEventListener('click', function () {
            lightbox.classList.add('active');
            lightboxImg.src = this.src;
            const captionText = this.getAttribute('data-caption') || this.alt || '圖片樣張';
            lightboxCaption.textContent = captionText;
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target === closeBtn) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
    }
});