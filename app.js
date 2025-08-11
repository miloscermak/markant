// Český nakupující - JavaScript funkcionalita (opravená verze)

// Data aplikace
const appData = {
  "inflace_data": {
    "2020": 3.2,
    "2021": 3.8,
    "2022": 15.1,
    "2023": 10.7,
    "2024": 2.4
  },
  "generace": {
    "rebuilders": {
      "vek": "72+ let",
      "charakteristiky": ["Velmi loajální ke značkám", "Vysoká důvěra ve značkové produkty", "Nejmenší podíl online nákupů (16%)", "Preferují klasické pokladny"],
      "obchody": ["Malé prodejny", "Specializované obchody", "Supermarkety"],
      "technologie": "Nejnižší adopce"
    },
    "baby_boomers": {
      "vek": "57-71 let", 
      "charakteristiky": ["Cíleně vyhledávají nabídky", "Poměrně loajální ke značkám", "Méně porovnávají ceny než mladší generace"],
      "obchody": ["Supermarkety", "Malé prodejny"],
      "technologie": "Střední adopce"
    },
    "generation_x": {
      "vek": "42-56 let",
      "charakteristiky": ["Nejvyšší zastoupení vysokých příjmů", "Vyhledávají nabídky a porovnávají ceny", "Nejvíce otevřeni novým produktům ze starších generací", "Utrácejí nejvíce na nákup"],
      "obchody": ["Hypermarkety", "Diskonty"],
      "technologie": "Střední až vysoká adopce"
    },
    "millennials": {
      "vek": "30-41 let",
      "charakteristiky": ["Velmi aktivní v porovnávání cen", "Silná důvěra v online nakupování", "Často si objednávají jídlo s donáškou", "Ochotni si připlatit za zdravé výrobky", "Vysoký podíl online letáků (54%)"],
      "obchody": ["Hypermarkety", "Online"],
      "technologie": "Vysoká adopce"
    },
    "ibrains": {
      "vek": "do 29 let",
      "charakteristiky": ["Nejaktivnější v porovnávání cen", "Nejvíce orientováni na online nakupování", "Podíl online letáků 62%", "Nejméně loajální ke značkám", "Nejvíce otevření novým produktům", "Nejnižší výdaje na nákup"],
      "obchody": ["Hypermarkety", "Online"],
      "technologie": "Nejvyšší adopce"
    }
  },
  "akce_data": {
    "cr_2020": 33.0,
    "cr_2024": 40.1,
    "polsko_2024": 53.0,
    "nemecko": 25.0,
    "evropsky_prumer": 35.0
  },
  "kviz_otazky": [
    {
      "otazka": "Jak často kontroluješ akční letáky?",
      "odpovedi": [
        {"text": "Každý týden důkladně", "body": 3, "typ": "promo_seeker"},
        {"text": "Občas se podívám", "body": 2, "typ": "casual"},
        {"text": "Téměř nikdy", "body": 1, "typ": "convenience"}
      ]
    },
    {
      "otazka": "Kde nejčastěji nakupuješ?",
      "odpovedi": [
        {"text": "V diskontech (Lidl, Penny)", "body": 3, "typ": "price_conscious"},
        {"text": "V hypermarketech (Kaufland, Tesco)", "body": 2, "typ": "family_shopper"}, 
        {"text": "Online nebo v menších obchodech", "body": 1, "typ": "convenience"}
      ]
    },
    {
      "otazka": "Jak se díváš na privátní značky?",
      "odpovedi": [
        {"text": "Aktivně je vyhledávám kvůli ceně", "body": 3, "typ": "price_conscious"},
        {"text": "Kupujem je občas", "body": 2, "typ": "casual"},
        {"text": "Preferuji značkové výrobky", "body": 1, "typ": "brand_loyal"}
      ]
    }
  ],
  "typy_nakupujicich": {
    "promo_seeker": {
      "nazev": "Lovec akcí",
      "popis": "Až 70% výdajů na akční zboží. Plánuješ nákupy podle letáků a nikdy nekoupíš zboží za plnou cenu.",
      "podil_populace": 15
    },
    "price_conscious": {
      "nazev": "Cenově uvědomělý", 
      "popis": "Hledáš nejlepší poměr cena/kvalita. Preferuješ diskonty a privátní značky.",
      "podil_populace": 40
    },
    "family_shopper": {
      "nazev": "Rodinný nakupující",
      "popis": "Děláš velké nákupy v hypermarketech. Kombinuješ akce se značkovými produkty.",
      "podil_populace": 30
    },
    "convenience": {
      "nazev": "Pohodlný nakupující", 
      "popis": "Preferuješ rychlé a pohodlné nakupování. Často nakupuješ online nebo v menších obchodech.",
      "podil_populace": 15
    },
    "casual": {
      "nazev": "Příležitostný nakupující", 
      "popis": "Střídáš různé přístupy podle situace. Někdy hledáš akce, jindy si vybíráš pohodlí.",
      "podil_populace": 20
    }
  }
};

// Globální proměnné
let currentSection = 'intro';
let currentQuestion = 0;
let quizAnswers = [];
let inflationChart = null;
let promoChart = null;

// Inicializace aplikace
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    setupEventListeners();
    loadGenerationContent('rebuilders');
    
    // Inicializace po krátkém zpoždění pro plynulý start
    setTimeout(() => {
        initializeCharts();
        animateCounters();
    }, 500);
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Start guide button
    const startButton = document.getElementById('start-guide');
    console.log('Start button found:', startButton);
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Start button clicked');
            showSection('inflation');
        });
    }

    // Navigation buttons - použít event delegation
    document.addEventListener('click', function(e) {
        // Navigation buttons
        if (e.target.classList.contains('nav__btn')) {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            console.log('Nav button clicked:', section);
            if (section) {
                showSection(section);
            }
        }
        
        // Section next buttons
        if (e.target.classList.contains('section__next')) {
            e.preventDefault();
            const nextSection = e.target.getAttribute('data-next');
            console.log('Next button clicked:', nextSection);
            if (nextSection) {
                showSection(nextSection);
            }
        }
        
        // Generation tabs
        if (e.target.classList.contains('generation-tab')) {
            e.preventDefault();
            const generation = e.target.getAttribute('data-generation');
            console.log('Generation tab clicked:', generation);
            if (generation) {
                loadGenerationContent(generation);
                
                // Update active tab
                const generationTabs = document.querySelectorAll('.generation-tab');
                generationTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            }
        }
        
        // Back to intro buttons
        if (e.target.getAttribute('data-section') === 'intro') {
            e.preventDefault();
            console.log('Back to intro clicked');
            showSection('intro');
        }
    });
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide current section
    const currentSectionEl = document.querySelector('.section.active');
    if (currentSectionEl) {
        currentSectionEl.classList.remove('active');
        console.log('Hiding current section:', currentSectionEl.id);
    }

    // Show new section
    const newSectionEl = document.getElementById(sectionId);
    if (newSectionEl) {
        newSectionEl.classList.add('active');
        currentSection = sectionId;
        console.log('Showing new section:', sectionId);
        
        // Show navigation for all sections except intro
        const nav = document.getElementById('navigation');
        if (sectionId === 'intro') {
            nav.classList.add('hidden');
            console.log('Hiding navigation');
        } else {
            nav.classList.remove('hidden');
            console.log('Showing navigation');
        }

        // Update active nav button
        const navButtons = document.querySelectorAll('.nav__btn');
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionId) {
                btn.classList.add('active');
                console.log('Active nav button set for:', sectionId);
            }
        });

        // Special handling for specific sections
        if (sectionId === 'quiz') {
            console.log('Initializing quiz...');
            initializeQuiz();
        }

        // Inicializace chartů když se dostaneme na příslušnou sekci
        if (sectionId === 'inflation' || sectionId === 'promos') {
            setTimeout(() => {
                initializeCharts();
            }, 300);
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error('Section not found:', sectionId);
    }
}

function loadGenerationContent(generationKey) {
    console.log('Loading generation content:', generationKey);
    const generation = appData.generace[generationKey];
    if (!generation) {
        console.error('Generation not found:', generationKey);
        return;
    }

    const contentEl = document.getElementById('generation-content');
    if (!contentEl) {
        console.error('Generation content element not found');
        return;
    }

    const generationNames = {
        'rebuilders': 'Rebuilders',
        'baby_boomers': 'Baby Boomers', 
        'generation_x': 'Generation X',
        'millennials': 'Millennials',
        'ibrains': 'iBrains'
    };

    contentEl.innerHTML = `
        <div class="generation-profile">
            <div class="generation-header">
                <h3>${generationNames[generationKey]}</h3>
                <div class="generation-age">${generation.vek}</div>
            </div>
            <div class="generation-stats">
                <div class="stat-group">
                    <h4>Charakteristiky nakupování</h4>
                    <ul>
                        ${generation.charakteristiky.map(char => `<li>${char}</li>`).join('')}
                    </ul>
                </div>
                <div class="stat-group">
                    <h4>Preferované obchody</h4>
                    <ul>
                        ${generation.obchody.map(obchod => `<li>${obchod}</li>`).join('')}
                    </ul>
                </div>
                <div class="stat-group">
                    <h4>Technologická adopce</h4>
                    <ul>
                        <li>${generation.technologie}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function initializeCharts() {
    console.log('Initializing charts...');
    if (!inflationChart) {
        createInflationChart();
    }
    if (!promoChart) {
        createPromoChart();
    }
}

function createInflationChart() {
    const ctx = document.getElementById('inflation-chart');
    if (!ctx) {
        console.log('Inflation chart canvas not found');
        return;
    }
    if (inflationChart) {
        console.log('Inflation chart already exists');
        return;
    }

    console.log('Creating inflation chart...');
    const data = appData.inflace_data;
    const years = Object.keys(data);
    const values = Object.values(data);

    inflationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Inflace (%)',
                data: values,
                borderColor: '#d7141a',
                backgroundColor: 'rgba(215, 20, 26, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#d7141a',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
    console.log('Inflation chart created successfully');
}

function createPromoChart() {
    const ctx = document.getElementById('promo-chart');
    if (!ctx) {
        console.log('Promo chart canvas not found');
        return;
    }
    if (promoChart) {
        console.log('Promo chart already exists');
        return;
    }

    console.log('Creating promo chart...');
    const data = appData.akce_data;

    promoChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Česká republika', 'Polsko', 'Německo', 'Evropský průměr'],
            datasets: [{
                label: 'Podíl akčních nákupů (%)',
                data: [data.cr_2024, data.polsko_2024, data.nemecko, data.evropsky_prumer],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 60,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
    console.log('Promo chart created successfully');
}

function animateCounters() {
    // Animace progress barů
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.impact-meter__fill, .segment-fill, .progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            if (width) {
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, 1000);
}

function initializeQuiz() {
    console.log('Initializing quiz...');
    currentQuestion = 0;
    quizAnswers = [];
    showQuestion();
    
    // Reset progress
    const progress = document.getElementById('quiz-progress');
    if (progress) {
        progress.style.width = '0%';
    }
}

function showQuestion() {
    console.log('Showing question:', currentQuestion);
    if (currentQuestion >= appData.kviz_otazky.length) {
        showQuizResult();
        return;
    }

    const question = appData.kviz_otazky[currentQuestion];
    const container = document.getElementById('quiz-container');
    const resultEl = document.getElementById('quiz-result');
    
    if (container) container.classList.remove('hidden');
    if (resultEl) resultEl.classList.add('hidden');

    const questionEl = document.getElementById('quiz-question');
    if (!questionEl) {
        console.error('Quiz question element not found');
        return;
    }

    questionEl.innerHTML = `
        <h3>${question.otazka}</h3>
        <div class="quiz-answers">
            ${question.odpovedi.map((odpoved, index) => `
                <div class="quiz-answer" data-answer="${index}">
                    ${odpoved.text}
                </div>
            `).join('')}
        </div>
    `;

    // Update progress
    updateQuizProgress();

    // Add event listeners to answers pomocí event delegation
    questionEl.addEventListener('click', function(e) {
        if (e.target.classList.contains('quiz-answer')) {
            const answers = questionEl.querySelectorAll('.quiz-answer');
            
            // Remove previous selection
            answers.forEach(a => a.classList.remove('selected'));
            
            // Select current answer
            e.target.classList.add('selected');
            
            // Store answer and proceed after delay
            const answerIndex = parseInt(e.target.getAttribute('data-answer'));
            quizAnswers.push(question.odpovedi[answerIndex]);
            
            setTimeout(() => {
                currentQuestion++;
                showQuestion();
            }, 1000);
        }
    });
}

function updateQuizProgress() {
    const progress = document.getElementById('quiz-progress');
    const currentQuestionEl = document.getElementById('current-question');
    
    if (progress) {
        const percentage = (currentQuestion / appData.kviz_otazky.length) * 100;
        progress.style.width = percentage + '%';
    }
    
    if (currentQuestionEl) {
        currentQuestionEl.textContent = currentQuestion + 1;
    }
}

function showQuizResult() {
    console.log('Showing quiz result...');
    const container = document.getElementById('quiz-container');
    const resultEl = document.getElementById('quiz-result');
    
    if (container) container.classList.add('hidden');
    if (resultEl) resultEl.classList.remove('hidden');

    // Určit typ nakupujícího na základě odpovědí
    const typeScores = {};
    quizAnswers.forEach(answer => {
        const type = answer.typ;
        typeScores[type] = (typeScores[type] || 0) + answer.body;
    });

    // Najít typ s nejvyšším skóre
    let winnerType = 'casual';
    let maxScore = 0;
    Object.entries(typeScores).forEach(([type, score]) => {
        if (score > maxScore) {
            maxScore = score;
            winnerType = type;
        }
    });

    // Pokud není typ v typy_nakupujicich, použij výchozí
    const resultType = appData.typy_nakupujicich[winnerType] || appData.typy_nakupujicich.casual;

    resultEl.innerHTML = `
        <h3>Tvůj typ nakupujícího:</h3>
        <div class="result-type">${resultType.nazev}</div>
        <div class="result-description">${resultType.popis}</div>
        <div class="result-share">
            <strong>${resultType.podil_populace}%</strong> českých nakupujících patří do této kategorie
        </div>
        <button class="btn btn--primary" onclick="initializeQuiz()">Zkusit znovu</button>
    `;
}

// Export funkcí pro globální použití
window.showSection = showSection;
window.initializeQuiz = initializeQuiz;

// Handle window resize pro charts
window.addEventListener('resize', function() {
    if (inflationChart) {
        inflationChart.resize();
    }
    if (promoChart) {
        promoChart.resize();
    }
});

// Easter egg - konami kód pro skryté statistiky
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showEasterEgg();
        konamiCode = [];
    }
});

function showEasterEgg() {
    alert('🛒 Gratulujeme! Objevili jste skrytou funkci. Víte, že průměrný Čech navštíví obchod 156x ročně? To je více než 3x týdně! 📊');
}

console.log('App.js loaded successfully');