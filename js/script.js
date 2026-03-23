// 頁面切換邏輯
function switchChannel(channelId) {
    let menuId = channelId.startsWith('detail-') ? 'works' : channelId;

    // 更新導航按鈕狀態
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtns = Array.from(document.querySelectorAll('.nav-btn'))
        .filter(btn => btn.getAttribute('onclick').includes(menuId));
    if (activeBtns.length > 0) activeBtns[0].classList.add('active');

    // 處理頁面淡入淡出
    const currentVisible = document.querySelector('.channel-section.visible');
    const targetSection = document.getElementById(channelId);

    if (currentVisible === targetSection) return;

    if (currentVisible) {
        currentVisible.classList.remove('visible');
        setTimeout(() => {
            currentVisible.classList.remove('active');
            targetSection.classList.add('active');
            void targetSection.offsetWidth; // Force Reflow
            targetSection.classList.add('visible');

            // 頁面切換時自動回到頂部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 500); // 配合 CSS transition 時間
    } else {
        targetSection.classList.add('active', 'visible');
    }
}

// 平滑捲動 (用於目錄點擊)
function smoothScroll(e, targetId) {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
        // 判斷是否為手機版 (Header 在下方，上方不需預留太多空間)
        const isMobile = window.innerWidth <= 900;
        const headerOffset = isMobile ? 20 : 100; // 手機留少一點，PC留Header高

        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

// --- ScrollSpy (捲動監聽) ---
const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -60% 0px', // 關鍵：讓判斷線位於視窗上方區域
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

// --- ★★★ 新增：燈箱 (Lightbox) 控制邏輯 ★★★ ---

document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // 1. 取得網頁上所有可以被放大的圖片 (例如專案內頁的圖片佔位符)
    // 您可以根據需求修改這個選擇器，例如改為 '.project-article img'
    const images = document.querySelectorAll('.detail-img-placeholder img, .award-img, .iteration-card img');

    images.forEach(image => {
        // 為每張圖片加上滑鼠指標樣式，提示可以點擊
        image.style.cursor = 'zoom-in';

        image.addEventListener('click', function () {
            // A. 將燈箱設為激活狀態
            lightbox.classList.add('active');

            // B. 將被點擊圖片的 src 傳給燈箱圖片
            lightboxImg.src = this.src;

            // C. 取得圖片說明文字
            // 方法一：取得圖片的 alt 屬性作為說明
            // 方法二：(推薦) 在 HTML 圖片標籤上新增 data-caption 屬性
            const captionText = this.getAttribute('data-caption') || this.alt || '圖片樣張';
            lightboxCaption.textContent = captionText;
        });
    });

    // 2. 關閉燈箱的邏輯
    // 點擊關閉按鈕
    closeBtn.addEventListener('click', closeLightbox);

    // 點擊黑色背景區域 (而非圖片本身)
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target === lightboxclose) {
            closeLightbox();
        }
    });

    // 按下鍵盤 ESC 鍵
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
    }
});