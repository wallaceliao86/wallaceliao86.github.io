// ==========================================
// 🚀 頁面切換與網址路由 (Hash Routing) 核心邏輯
// ==========================================

// 1. 點擊導覽列按鈕時，只負責「改變網址」，不直接換畫面
function switchChannel(channelId) {
    window.location.hash = channelId;
}

// 2. 真正負責「執行淡入淡出動畫與切換」的底層函數
function renderPage(channelId) {
    let menuId = channelId.startsWith('detail-') ? 'works' : channelId;

    // 更新導航按鈕狀態
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtns = Array.from(document.querySelectorAll('.nav-btn'))
        .filter(btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(menuId));
    if (activeBtns.length > 0) activeBtns[0].classList.add('active');

    const currentVisible = document.querySelector('.channel-section.visible');
    const targetSection = document.getElementById(channelId);

    // 如果找不到目標區塊，或目標已經在畫面上，就不做任何事
    if (!targetSection || currentVisible === targetSection) return;

    // 處理頁面淡入淡出
    if (currentVisible) {
        currentVisible.classList.remove('visible'); // 先淡出舊畫面
        setTimeout(() => {
            currentVisible.classList.remove('active'); // 徹底隱藏舊畫面
            targetSection.classList.add('active'); // 顯示新畫面
            void targetSection.offsetWidth; // 強制瀏覽器重繪 (Force Reflow)
            targetSection.classList.add('visible'); // 淡入新畫面

            // 切換時平滑滾回頂部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 500); // 配合您的 CSS transition 時間
    } else {
        // 如果畫面是一開始載入 (全空狀態)，直接顯示目標區塊
        targetSection.classList.add('active', 'visible');
    }
}

// ==========================================
// 🧠 終極版：智慧路由與平滑滾動大總管
// ==========================================

function handleRouting() {
    const currentHash = window.location.hash.replace('#', '');

    // 1. 如果網址沒有 Hash，預設回到履歷首頁
    if (!currentHash) {
        renderPage('about');
        return;
    }

    const targetElement = document.getElementById(currentHash);
    if (!targetElement) return;

    // 2. 關鍵判斷：這是「主頁面」還是「內部小標題」？
    if (targetElement.classList.contains('channel-section')) {
        // 情況 A：是主頁面 -> 執行完整的淡入淡出換頁
        renderPage(currentHash);
    } else {
        // 情況 B：是專案內部的小錨點
        const parentSection = targetElement.closest('.channel-section');
        const currentVisible = document.querySelector('.channel-section.visible');

        if (parentSection && parentSection !== currentVisible) {
            // 如果是在別的頁面點擊內部連結：先切換頁面，等動畫結束後滾動
            renderPage(parentSection.id);
            setTimeout(() => {
                executeScroll(targetElement);
            }, 550);
        } else if (parentSection && parentSection === currentVisible) {
            // ✨ 手機版修復核心：如果已經在同一個頁面，強制呼叫滾動小幫手！
            executeScroll(targetElement);
        }
    }
}

// 🚀 獨立出來的滾動小幫手 (正式取代舊的 smoothScroll)
function executeScroll(target) {
    const isMobile = window.innerWidth <= 900;
    const headerOffset = isMobile ? 20 : 100; // 手機留少一點，PC留Header高

    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// 替換掉原本的 hashchange 與 DOMContentLoaded，統一交給 handleRouting 處理
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
            // 1. 移除所有目錄的 active
            document.querySelectorAll('.toc-link').forEach(link => link.classList.remove('active'));

            // 2. 幫當前區塊對應的連結加上 active
            const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');

                // 3. 手機版：自動橫向捲動目錄，讓 active 項目置中
                if (window.innerWidth <= 900) {
                    activeLink.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }
        }
    });
}, observerOptions);

// 啟動監聽所有文章段落
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

    // 如果頁面上沒有燈箱元素，就停止執行以避免報錯
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
        // 修正了原本這裡的 e.target === lightboxclose 變數未定義錯誤
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