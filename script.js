document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロール機能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ナビゲーションハイライト機能
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // フォーム送信処理
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 簡単なバリデーション
            if (!name || !email || !message) {
                alert('すべての項目を入力してください。');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('有効なメールアドレスを入力してください。');
                return;
            }
            
            // 送信処理（実際のアプリケーションでは、サーバーにデータを送信）
            showSuccessMessage();
            this.reset();
        });
    }

    // CTAボタンのクリック処理
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const charactersSection = document.querySelector('#characters');
            if (charactersSection) {
                charactersSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ヘルパー関数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showSuccessMessage() {
        // 成功メッセージを表示
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 9999;
                text-align: center;
                max-width: 400px;
                width: 90%;
            ">
                <h3 style="color: #ff6b6b; margin-bottom: 1rem;">送信完了</h3>
                <p style="margin-bottom: 1.5rem;">お問い合わせありがとうございます。<br>3営業日以内にご返信いたします。</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #ff6b6b;
                    color: white;
                    border: none;
                    padding: 0.5rem 1.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                ">閉じる</button>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 9998;
            " onclick="this.parentElement.remove()"></div>
        `;
        document.body.appendChild(successDiv);
    }

    function showAppDownloadModal() {
        // アプリダウンロードモーダルを表示
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 15px;
                box-shadow: 0 15px 40px rgba(0,0,0,0.3);
                z-index: 9999;
                text-align: center;
                max-width: 500px;
                width: 90%;
            ">
                <h3 style="color: #ff6b6b; margin-bottom: 1rem; font-size: 1.5rem;">CNPお薬手帳アプリ</h3>
                <div style="font-size: 3rem; margin: 1rem 0;">📱</div>
                <p style="margin-bottom: 1.5rem; line-height: 1.6;">
                    CNPお薬手帳アプリは現在開発中です。<br>
                    リリース時期につきましては、<br>
                    公式SNSでお知らせいたします。
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem;">
                    <div style="
                        padding: 0.5rem 1rem;
                        background: #f8f9fa;
                        border-radius: 8px;
                        font-size: 0.9rem;
                        color: #666;
                    ">iOS版 準備中</div>
                    <div style="
                        padding: 0.5rem 1rem;
                        background: #f8f9fa;
                        border-radius: 8px;
                        font-size: 0.9rem;
                        color: #666;
                    ">Android版 準備中</div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #ff6b6b;
                    color: white;
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                ">閉じる</button>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.6);
                z-index: 9998;
            " onclick="this.parentElement.remove()"></div>
        `;
        document.body.appendChild(modalDiv);
    }

    // スクロール時のアニメーション効果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を観察
    document.querySelectorAll('.character-card, .about-content, .artist-content, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // キャラクターカードのインタラクション
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', function() {
            const character = this.dataset.character;
            showCharacterModal(character);
        });
    });

    // モバイルメニューの実装（将来的に追加する場合）
    function initMobileMenu() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = window.scrollY;
        });
    }
    
    initMobileMenu();

    // メインアートワーク画像の読み込み処理
    const mainArtwork = document.querySelector('.artwork-main');
    if (mainArtwork) {
        mainArtwork.addEventListener('error', function() {
            // 画像が読み込めない場合、フォールバックを表示
            const fallback = document.querySelector('.artwork-fallback');
            if (fallback) {
                fallback.style.position = 'static';
                fallback.style.zIndex = '1';
            }
            this.style.display = 'none';
        });
        
        mainArtwork.addEventListener('load', function() {
            // 画像が正常に読み込まれた場合、フォールバックを隠す
            const fallback = document.querySelector('.artwork-fallback');
            if (fallback) {
                fallback.style.display = 'none';
            }
        });
    }

    // キャラクター詳細モーダル表示
    function showCharacterModal(character) {
        const characterInfo = {
            panda: {
                name: 'パンダ (Panda)',
                traits: ['優しい', 'のんびり', '食いしん坊'],
                description: '竹を食べることが大好きで、いつものんびりしているパンダ。お薬の時間もゆっくりと確実に管理してくれる、信頼できるパートナーです。食事の時間と一緒にお薬も忘れずに摂取できるよう、優しくサポートしてくれます。',
                personality: 'マイペースだけど責任感が強く、健康管理を大切にしています。'
            },
            cat: {
                name: 'ネコ (Cat)',
                traits: ['気まぐれ', '賢い', '好奇心旺盛'],
                description: '自由気ままだけど実はとても賢いネコ。お薬の管理も気分次第だけど、いざという時は頼りになる存在です。独立心が強いながらも、飼い主の健康を気にかけている愛らしいパートナーです。',
                personality: '自由を愛するけれど、愛情深く飼い主思いの性格です。'
            },
            rabbit: {
                name: 'ウサギ (Rabbit)',
                traits: ['元気', '活発', '責任感強い'],
                description: 'いつも元気いっぱいで跳ね回っているウサギ。お薬の時間も忘れずにリマインドしてくれる頼もしい存在です。活発な性格で、健康的な生活習慣を一緒に築いてくれます。',
                personality: 'エネルギッシュで前向き、時間管理が得意な真面目な性格です。'
            },
            fox: {
                name: 'キツネ (Fox)',
                traits: ['知的', '戦略的', 'ミステリアス'],
                description: 'とても頭が良くて戦略を立てるのが得意なキツネ。複雑な薬の飲み合わせもしっかりと管理してくれる、知的なパートナーです。医療知識も豊富で、最適な服薬プランを提案してくれます。',
                personality: '冷静で分析力があり、論理的思考を得意とする頭脳派です。'
            },
            dog: {
                name: 'イヌ (Dog)',
                traits: ['忠実', 'フレンドリー', '守護精神'],
                description: 'とても忠実で飼い主思いのイヌ。お薬の管理も責任を持って、最後まで寄り添ってサポートしてくれる最高のパートナーです。どんな時も側にいて、健康管理を見守ってくれます。',
                personality: '忠誠心が強く、愛情深く、いつも飼い主を第一に考えています。'
            },
            bear: {
                name: 'クマ (Bear)',
                traits: ['温厚', '力持ち', '包容力'],
                description: '大きくて温厚なクマ。どんな時も安心感を与えてくれて、お薬の管理も包容力をもってサポートしてくれます。穏やかな性格で、ストレスを和らげながら健康管理をサポートしてくれる頼もしい存在です。',
                personality: '優しく包容力があり、安心感を与えてくれる温かい性格です。'
            }
        };

        const info = characterInfo[character];
        if (!info) return;

        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                z-index: 9999;
                text-align: center;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h3 style="color: #52c41a; margin-bottom: 1rem; font-size: 1.8rem;">${info.name}</h3>
                <div style="margin-bottom: 1.5rem;">
                    ${info.traits.map(trait => `<span style="
                        background: linear-gradient(135deg, #52c41a, #73d13d);
                        color: white;
                        padding: 0.4rem 1rem;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        margin: 0.2rem;
                        display: inline-block;
                    ">${trait}</span>`).join('')}
                </div>
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: #666; text-align: left;">
                    ${info.description}
                </p>
                <p style="margin-bottom: 2rem; line-height: 1.6; color: #52c41a; font-weight: 500; text-align: left;">
                    <strong>性格：</strong>${info.personality}
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: linear-gradient(135deg, #52c41a, #73d13d);
                    color: white;
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1rem;
                ">閉じる</button>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.6);
                z-index: 9998;
            " onclick="this.parentElement.remove()"></div>
        `;
        document.body.appendChild(modalDiv);
    }

    console.log('CNPおくすり手帳サイトが読み込まれました 🎉');
});