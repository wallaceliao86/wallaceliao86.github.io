// ==========================================
// 🚀 頁面切換與網址路由 (Hash Routing) 核心邏輯
// ==========================================

function switchChannel(channelId) {
  window.location.hash = channelId;
}

function renderPage(channelId) {
  let menuId = channelId.startsWith("detail-") ? "works" : channelId;

  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtns = Array.from(document.querySelectorAll(".nav-btn")).filter(
    (btn) =>
      btn.getAttribute("onclick") &&
      btn.getAttribute("onclick").includes(menuId),
  );
  if (activeBtns.length > 0) activeBtns[0].classList.add("active");

  const currentVisible = document.querySelector(".channel-section.visible");
  const targetSection = document.getElementById(channelId);

  if (!targetSection || currentVisible === targetSection) return;

  if (currentVisible) {
    currentVisible.classList.remove("visible");
    setTimeout(() => {
      currentVisible.classList.remove("active");
      targetSection.classList.add("active");
      void targetSection.offsetWidth;
      targetSection.classList.add("visible");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
  } else {
    targetSection.classList.add("active", "visible");
  }
}

// ==========================================
// 🧠 智慧路由與平滑滾動大總管
// ==========================================

function handleRouting() {
  const currentHash = window.location.hash.replace("#", "");

  if (!currentHash) {
    renderPage("about");
    return;
  }

  const targetElement = document.getElementById(currentHash);
  if (!targetElement) return;

  if (targetElement.classList.contains("channel-section")) {
    renderPage(currentHash);
  } else {
    const parentSection = targetElement.closest(".channel-section");
    const currentVisible = document.querySelector(".channel-section.visible");

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
    behavior: "smooth",
  });
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);

// ==========================================
// --- ScrollSpy (捲動監聽) ---
// ==========================================
// const observerOptions = {
//     root: null,
//     rootMargin: '-100px 0px -60% 0px',
//     threshold: 0
// };

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const id = entry.target.getAttribute('id');
//             document.querySelectorAll('.toc-link').forEach(link => link.classList.remove('active'));

//             const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
//             if (activeLink) {
//                 activeLink.classList.add('active');
//                 // 🗑️ 已移除手機版 scrollIntoView 邏輯，避免滾動死鎖
//             }
//         }
//     });
// }, observerOptions);

// document.querySelectorAll('.article-section').forEach((section) => {
//     observer.observe(section);
// });

// ==========================================
// --- ScrollSpy (捲動監聽) 更新版 ---
// ==========================================
const observerOptions = {
  root: null,
  rootMargin: "-100px 0px -60% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      // 移除所有目錄的 active (包含 PC 側邊欄 和 手機版浮動面板)
      document
        .querySelectorAll(".toc-link, .mobile-toc-list a")
        .forEach((link) => link.classList.remove("active"));

      // 幫當前區塊對應的連結加上 active
      document.querySelectorAll(`a[href="#${id}"]`).forEach((activeLink) => {
        activeLink.classList.add("active");
      });
    }
  });
}, observerOptions);

document.querySelectorAll(".article-section").forEach((section) => {
  observer.observe(section);
});

// ==========================================
// 🚀 浮動按鈕與手機版目錄邏輯 (FAB & Mobile TOC)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const fabContainer = document.getElementById("fab-container");
  const backToTopBtn = document.getElementById("back-to-top-btn");
  const mobileTocBtn = document.getElementById("mobile-toc-btn");
  const mobileTocPanel = document.getElementById("mobile-toc-panel");
  const mobileTocList = document.getElementById("mobile-toc-list");
  const closeTocBtn = document.getElementById("close-toc-btn");

  if (!fabContainer) return;

  // 1. 精準監聽：滑到 H1 標題才顯示按鈕
  window.addEventListener("scroll", () => {
    const activeSection = document.querySelector(".channel-section.visible");
    if (!activeSection) return;

    // 尋找當前畫面中的 h1 標題
    const h1 = activeSection.querySelector("h1");
    let shouldShow = false;

    if (h1) {
      // 當 H1 向上捲動，頂部碰到視窗上方 50px 處時，觸發顯示
      shouldShow = h1.getBoundingClientRect().top < 50;
    } else {
      // 如果該頁面沒有 H1 (例如首頁)，預設滾動超過 300px 就顯示
      shouldShow = window.scrollY > 300;
    }

    if (shouldShow) {
      fabContainer.classList.add("show");
    } else {
      fabContainer.classList.remove("show");
      mobileTocPanel.classList.remove("active"); // 往上滾時自動收起面板
    }
  });

  // 2. 回到頂部功能
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 3. 抓取目錄內容：自動將 PC 版目錄複製到手機版面板
  function populateMobileToc() {
    const currentToc = document.querySelector(
      ".channel-section.visible .toc-list",
    );
    mobileTocList.innerHTML = ""; // 清空舊內容

    if (currentToc) {
      const links = currentToc.querySelectorAll("a");
      links.forEach((link) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent;

        // 複製 active 狀態
        if (link.classList.contains("active")) {
          a.classList.add("active");
        }

        // 點擊選項後自動關閉面板，滾動任務交給原本的路由接管
        a.addEventListener("click", () => {
          mobileTocPanel.classList.remove("active");
        });
        li.appendChild(a);
        mobileTocList.appendChild(li);
      });
      mobileTocBtn.style.display = "flex"; // 有目錄才顯示漢堡
    } else {
      mobileTocBtn.style.display = "none"; // 沒目錄(如履歷頁)隱藏漢堡
    }
  }

  // 4. 漢堡按鈕點擊事件
  mobileTocBtn.addEventListener("click", () => {
    if (!mobileTocPanel.classList.contains("active")) {
      populateMobileToc(); // 點開瞬間抓取最新狀態
    }
    mobileTocPanel.classList.toggle("active");
  });

  // 5. 關閉按鈕與點擊外部關閉
  closeTocBtn.addEventListener("click", () => {
    mobileTocPanel.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    if (
      mobileTocPanel.classList.contains("active") &&
      !mobileTocPanel.contains(e.target) &&
      !mobileTocBtn.contains(e.target)
    ) {
      mobileTocPanel.classList.remove("active");
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const video = document.querySelectorAll("video[preload='none']");

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         video.play(); // 進入畫面才開始請求資源與播放
//         observer.unobserve(video); // 觸發後解除監聽，節省運算效能
//       }
//     });
//   });

//   observer.observe(video);
// });

// 於大螢幕上自動播放
document.addEventListener("DOMContentLoaded", function () {
  // 設定只在螢幕寬度大於 768px 時執行
  if (window.innerWidth > 768) {
    // 抓取畫面上所有帶有 lazy-video class 的影片
    const lazyVideos = document.querySelectorAll(".demo-video");

    // 使用 forEach 迴圈為每一個影片執行載入邏輯
    lazyVideos.forEach((video) => {
      const source = video.querySelector("source");

      // 確保該影片內有 source 標籤且帶有 data-src 屬性
      if (source && source.hasAttribute("data-src")) {
        // 將真正的影片網址賦予 src
        source.src = source.getAttribute("data-src");

        // 觸發影片載入與播放
        video.load();

        // 使用 Promise 確保 play() 不會報錯
        let playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("自動播放被瀏覽器阻擋", error);
          });
        }
      }
    });
  }
});

// ==========================================
// --- 燈箱 (Lightbox) 控制邏輯 (支援圖片與影片) ---
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!lightbox) return;

  const mediaElements = document.querySelectorAll(
    ".detail-img-placeholder img, .award-img, .iteration-card img, .demo-video, .feature-media img",
  );

  mediaElements.forEach((media) => {
    media.style.cursor = "zoom-in";

    media.addEventListener("click", function () {
      lightbox.classList.add("active");

      if (this.tagName.toLowerCase() === "video") {
        lightboxImg.style.display = "none";
        lightboxVideo.style.display = "block";

        const sourceTag = this.querySelector("source");

        // 💡 關鍵修正 1：優先抓取 data-src，如果沒有才退回抓 src
        let videoSrc = "";
        if (sourceTag) {
          videoSrc =
            sourceTag.getAttribute("data-src") ||
            sourceTag.getAttribute("src") ||
            sourceTag.src;
        } else {
          videoSrc =
            this.getAttribute("data-src") ||
            this.getAttribute("src") ||
            this.src;
        }

        lightboxVideo.src = videoSrc;

        // 💡 關鍵修正 2：針對 preload="none" 的影片，強制重新載入資源
        lightboxVideo.load();

        // 💡 關鍵修正 3：捕捉 play() 可能產生的錯誤 (避免瀏覽器自動播放限制報錯)
        let playPromise = lightboxVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("燈箱影片自動播放被阻擋：", error);
          });
        }
      } else {
        lightboxVideo.style.display = "none";
        lightboxImg.style.display = "block";
        lightboxImg.src = this.src;
      }

      const captionText =
        this.getAttribute("data-caption") || this.alt || "放大檢視";
      lightboxCaption.textContent = captionText;
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target === closeBtn) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove("active");

    if (lightboxVideo) {
      lightboxVideo.pause();
      // 確保影片回到起點，下次點開才不會從中間開始播
      lightboxVideo.currentTime = 0;
      lightboxVideo.src = "";
    }
  }
});

// ==========================================
// --- 聯絡信箱複製功能 ---
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const copyEmailBtn = document.getElementById("copyEmailBtn");

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", function () {
      const email = this.getAttribute("data-email");

      // 使用瀏覽器原生的剪貼簿 API
      navigator.clipboard
        .writeText(email)
        .then(() => {
          // 成功時的視覺回饋
          const originalText = this.textContent;
          this.textContent = "已複製 ✔";
          this.classList.add("copied");

          // 2 秒後恢復原狀
          setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => {
          console.error("複製失敗:", err);
          this.textContent = "複製失敗";
          setTimeout(() => {
            this.textContent = "複製";
          }, 2000);
        });
    });
  }
});
