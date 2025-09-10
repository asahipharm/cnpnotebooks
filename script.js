// CNPおくすり手帳 公式サイト - JavaScript

// 配布プランへのスクロール関数
function scrollToPlans() {
    if (event) event.preventDefault();
    
    // 少し遅延を入れて確実に要素を取得
    setTimeout(() => {
        const target = document.querySelector('.distribution-plans');
        if (target) {
            const rect = target.getBoundingClientRect();
            const targetPosition = window.pageYOffset + rect.top;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
    
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== スムーススクロール =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 50; // ヘッダー分の調整
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== FAQアコーディオン機能 =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // すべてのFAQアイテムを閉じる
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // クリックされたアイテムが閉じていた場合は開く
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== スクロールアニメーション =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を観察
    const animatedElements = document.querySelectorAll(
        '.feature-card-compact, .character-card, .benefit-card, .step, .partner-card, .testimonial-card, .news-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ===== ヒーローセクションの特別なアニメーション =====
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        // ふわふわ浮く アニメーション
        heroImage.style.animation = 'float 6s ease-in-out infinite';
        
        // ホバー時の拡大効果
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // ===== ボタンのインタラクション強化 =====
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // クリック時のripple効果
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== キャラクターカードのインタラクション =====
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.character-img');
            if (image) {
                image.style.transform = 'scale(1.1) rotate(5deg)';
                image.style.filter = 'brightness(1.1) saturate(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.character-img');
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
                image.style.filter = 'brightness(1) saturate(1)';
            }
        });
    });

    // ===== パララックス効果（軽微） =====
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const speed = 0.3;
            heroBackground.style.transform = `translateY(${scrolled * speed}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ===== スクロール時のアニメーション効果 =====
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // ヘッダーがないため、この部分は削除
        // 代わりに、スクロール方向に応じた演出を追加
        if (scrollTop > lastScrollTop) {
            // 下にスクロール
            document.body.style.setProperty('--scroll-direction', '1');
        } else {
            // 上にスクロール
            document.body.style.setProperty('--scroll-direction', '-1');
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== 数値カウンターアニメーション =====
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }

    // ===== 画像の遅延読み込み =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ===== ツールチップ機能 =====
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });

    // ===== 動的CSSアニメーションの追加 =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes ripple {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .character-img {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);

    // ===== エラーハンドリング =====
    window.addEventListener('error', function(e) {
        console.error('CNPおくすり手帳サイトでエラーが発生しました:', e);
    });

    // ===== パフォーマンス監視 =====
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`CNPおくすり手帳サイトの読み込み時間: ${loadTime}ms`);
        });
    }

    // ===== アクセシビリティ強化 =====
    // フォーカス可能な要素のフォーカス表示を強化
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--primary-blue)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // ===== ダークモード検出 =====
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // ダークモードの場合の処理（必要に応じて）
        console.log('ダークモードが検出されました');
    }

    // ===== サンプルページタブ機能 =====
    const sampleBtns = document.querySelectorAll('.sample-btn');
    const samplePages = document.querySelectorAll('.sample-page');
    
    sampleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // すべてのボタンとページを非アクティブにする
            sampleBtns.forEach(b => b.classList.remove('active'));
            samplePages.forEach(p => p.classList.remove('active'));
            
            // クリックされたボタンと対応するページをアクティブにする
            this.classList.add('active');
            document.getElementById(`sample-${targetPage}`).classList.add('active');
        });
    });

    // ===== 初期化完了ログ =====
    console.log('🌟 CNPおくすり手帳 公式サイトが正常に読み込まれました！');
    console.log('💊 健康な毎日を、CNPと一緒に！');
});

// ===== ユーティリティ関数 =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== モバイルデバイス検出 =====
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ===== 画面サイズ変更時の処理 =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // リサイズ後の処理
        console.log('画面サイズが変更されました:', window.innerWidth, 'x', window.innerHeight);
    }, 250);
});

// ===== ページ離脱時の処理 =====
window.addEventListener('beforeunload', function() {
    console.log('CNPおくすり手帳サイトをご利用いただき、ありがとうございました！');
});

// ===== 感想カルーセル機能 =====
let currentSlide = 0;
let totalSlides = 0;
let slidesPerView = 1;

function initCarousel() {
    const container = document.querySelector('.testimonials-container');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!container || !slides.length) return;
    
    totalSlides = slides.length;
    updateSlidesPerView();
    updateCarousel();
    
    // 自動再生機能
    let autoSlideInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000); // 5秒ごとに次のスライドへ
    
    // マウスオーバー時は自動再生を停止
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                moveCarousel(1);
            }, 5000);
        });
    }
    
    // タッチスワイプ対応
    let startX = 0;
    let isDragging = false;
    
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    }, { passive: false });
    
    container.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // 50px以上のスワイプで反応
            if (diffX > 0) {
                moveCarousel(1); // 左スワイプ：次へ
            } else {
                moveCarousel(-1); // 右スワイプ：前へ
            }
        }
    }, { passive: true });
    
    // 画面サイズ変更時の対応
    window.addEventListener('resize', debounce(() => {
        updateSlidesPerView();
        updateCarousel();
    }, 250));
}

function updateSlidesPerView() {
    const width = window.innerWidth;
    if (width >= 1024) {
        slidesPerView = 3;
    } else if (width >= 768) {
        slidesPerView = 2;
    } else {
        slidesPerView = 1;
    }
}

function moveCarousel(direction) {
    const maxSlide = Math.max(0, totalSlides - slidesPerView);
    
    currentSlide += direction;
    
    if (currentSlide > maxSlide) {
        currentSlide = 0; // 最後まで行ったら最初に戻る
    } else if (currentSlide < 0) {
        currentSlide = maxSlide; // 最初より前に行ったら最後に移動
    }
    
    updateCarousel();
}

function updateCarousel() {
    const container = document.querySelector('.testimonials-container');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!container) return;
    
    const slideWidth = 100 / slidesPerView;
    const translateX = -currentSlide * slideWidth;
    
    container.style.transform = `translateX(${translateX}%)`;
    
    // ボタンの状態更新（無限ループなので常に有効）
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
}

// ===== テスティモニアルスクロール管理 =====
function initTestimonialScroll() {
    const container = document.getElementById('testimonials-scroll');
    
    if (!container) return;
    
    // 単純に横スクロール可能なコンテナとして機能
    console.log('Testimonial scroll container initialized');
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', function() {
    // 少し遅延を入れて確実に要素が読み込まれてから初期化
    setTimeout(initCarousel, 100);
    setTimeout(initTestimonialScroll, 500); // テスティモニアルスクロール初期化
});