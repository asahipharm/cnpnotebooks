document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // ヘッダーのスクロール効果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下にスクロール - ヘッダーを隠す
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール - ヘッダーを表示
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // スクロール時のヘッダー背景変更
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });

    // FAQアコーディオン
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
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
        }
    });

    // フォーム送信処理
    const generalForm = document.getElementById('general-form');
    const medicalForm = document.getElementById('medical-form');
    
    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, '一般的なお問い合わせ');
        });
    }
    
    if (medicalForm) {
        medicalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, '医療機関・薬局からのお問い合わせ');
        });
    }

    function handleFormSubmission(form, formType) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // バリデーション
        if (!validateForm(data, form)) {
            showAlert('必須項目を入力してください。', 'error');
            return;
        }
        
        // 送信ボタンを無効化
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';
        
        // 実際のフォーム送信処理（ここではシミュレーション）
        setTimeout(() => {
            showAlert(`${formType}を受け付けました。お問い合わせありがとうございます。`, 'success');
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    }

    function validateForm(data, form) {
        // 一般的なお問い合わせの場合
        if (form.id === 'general-form') {
            return data.message && data.message.trim() !== '';
        }
        // 医療機関・薬局の場合
        else if (form.id === 'medical-form') {
            const requiredFields = ['institution', 'type', 'name', 'email', 'message'];
            return requiredFields.every(field => data[field] && data[field].trim() !== '');
        }
        return true;
    }

    function showAlert(message, type) {
        // 既存のアラートを削除
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.innerHTML = `
            <div class="alert-content">
                <div class="alert-icon">
                    ${type === 'success' ? '✓' : '⚠'}
                </div>
                <span class="alert-message">${message}</span>
                <button class="alert-close">&times;</button>
            </div>
        `;
        
        // アラートのスタイルを追加
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            font-family: 'Noto Sans JP', sans-serif;
        `;
        
        alertDiv.querySelector('.alert-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
        `;

        alertDiv.querySelector('.alert-icon').style.cssText = `
            font-size: 1.2rem;
            font-weight: bold;
        `;
        
        alertDiv.querySelector('.alert-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            margin-left: auto;
        `;
        
        document.body.appendChild(alertDiv);
        
        // アニメーション
        setTimeout(() => {
            alertDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // 閉じるボタンのイベント
        alertDiv.querySelector('.alert-close').addEventListener('click', function() {
            closeAlert(alertDiv);
        });
        
        // 自動で閉じる
        setTimeout(() => {
            closeAlert(alertDiv);
        }, 5000);
    }

    function closeAlert(alertDiv) {
        alertDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 300);
    }

    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を観察
    document.querySelectorAll('.service-card, .benefit-item, .testimonial-card, .case-item, .news-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // アニメーションクラスのスタイルを動的に追加
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);

    // 紙の質感を強調するアニメーション
    const paperElements = document.querySelectorAll('.paper-notebook, .paper-sample');
    paperElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) rotateY(2deg)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        });
    });

    // CNPキャラクターのインタラクション
    const cnpCharacters = document.querySelectorAll('.cnp-char, .cnp-character, .cnp-emoji');
    cnpCharacters.forEach((char, index) => {
        char.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotateZ(10deg)';
            this.style.cursor = 'pointer';
        });
        
        char.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateZ(0deg)';
        });
        
        char.addEventListener('click', function() {
            // キャラクターをクリックした時の楽しい効果
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 1s ease';
            }, 10);
        });
    });

    // 災害シーンの動的演出
    const flashlightScene = document.querySelector('.flashlight-scene');
    if (flashlightScene) {
        setInterval(() => {
            const notebookGlow = flashlightScene.querySelector('.notebook-glow');
            if (notebookGlow) {
                notebookGlow.style.filter = 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9))';
                setTimeout(() => {
                    notebookGlow.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))';
                }, 500);
            }
        }, 2000);
    }

    // 手書き風エフェクトのシミュレーション
    const handwritingElements = document.querySelectorAll('.testimonial-content p');
    handwritingElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.fontStyle = 'italic';
            this.style.transform = 'rotate(0.5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg)';
        });
    });

    // ページ読み込み完了後の処理
    window.addEventListener('load', function() {
        console.log('CNPお薬手帳（紙媒体）サイトが読み込まれました');
        
        // ヒーローセクションの紙の手帳アニメーション開始
        const paperNotebook = document.querySelector('.paper-notebook');
        if (paperNotebook) {
            paperNotebook.style.opacity = '0';
            paperNotebook.style.transform = 'translateY(50px) rotateY(-10deg)';
            
            setTimeout(() => {
                paperNotebook.style.transition = 'all 1s ease';
                paperNotebook.style.opacity = '1';
                paperNotebook.style.transform = 'translateY(0) rotateY(0deg)';
            }, 500);
        }
    });

    // 紙のページめくり風エフェクト
    function createPageFlipEffect(element) {
        element.addEventListener('click', function() {
            this.style.transform = 'perspective(1000px) rotateY(15deg)';
            this.style.transformOrigin = 'left center';
            
            setTimeout(() => {
                this.style.transform = 'perspective(1000px) rotateY(0deg)';
            }, 300);
        });
    }

    // 薬局カウンターのシーンにページめくり効果を追加
    const notebookStack = document.querySelector('.notebook-stack');
    if (notebookStack) {
        createPageFlipEffect(notebookStack.parentElement);
    }

    // フォーム入力時の紙質感フィードバック
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.backgroundColor = '#FFF8E7';
            this.style.borderColor = '#1565C0';
            this.style.boxShadow = '0 0 0 3px rgba(21, 101, 192, 0.1), inset 0 1px 3px rgba(0,0,0,0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.backgroundColor = '#FFFFFF';
            this.style.boxShadow = 'none';
        });
    });
});