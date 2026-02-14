// Menu Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    if (mainNav.style.display === 'block') {
        mainNav.style.position = 'absolute';
        mainNav.style.top = '100%';
        mainNav.style.left = '0';
        mainNav.style.right = '0';
        mainNav.style.background = 'var(--primary)';
        mainNav.style.padding = '1rem';
    }
});

// Navegação Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Atualiza classe ativa
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Filtros do Calendário
const filterBtns = document.querySelectorAll('.filter-btn');
const matchItems = document.querySelectorAll('.match-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de todos
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-comp');
        
        matchItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-comp') === filter) {
                item.style.display = 'grid';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Tabs de Classificação
const tabBtns = document.querySelectorAll('.tab-btn');
const standingsTables = document.querySelectorAll('.standings-table');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const league = btn.getAttribute('data-league');
        
        // Atualiza botões
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Atualiza tabelas
        standingsTables.forEach(table => {
            table.classList.remove('active');
            if (table.id === league) {
                table.classList.add('active');
                // Animação de entrada
                table.style.opacity = '0';
                table.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    table.style.transition = 'all 0.3s ease';
                    table.style.opacity = '1';
                    table.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    });
});

// Animação de entrada dos elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplica animação em cards e seções
document.querySelectorAll('.news-card, .player-card, .match-day, .interview-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Atualização dinâmica do "AO VIVO"
const liveIndicator = document.querySelector('.live-indicator');
setInterval(() => {
    liveIndicator.style.opacity = liveIndicator.style.opacity === '0.5' ? '1' : '0.5';
}, 1000);

// Contador regressivo para próximos jogos
function updateCountdown() {
    const matchItems = document.querySelectorAll('.match-item');
    const now = new Date();
    
    matchItems.forEach(item => {
        const timeStr = item.querySelector('.match-time').textContent;
        const dateStr = item.closest('.match-day').querySelector('h4').textContent;
        
        // Parse simples para demonstração
        if (timeStr && dateStr) {
            // Aqui você implementaria a lógica real de countdown
            // Por enquanto, apenas adiciona um efeito visual
            const timeEl = item.querySelector('.match-time');
            if (!timeEl.hasAttribute('data-countdown')) {
                timeEl.setAttribute('data-countdown', 'true');
            }
        }
    });
}

// Atualiza a cada minuto
setInterval(updateCountdown, 60000);

// Efeito de hover nas estatísticas
document.querySelectorAll('.stat-item').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        stat.style.transform = 'scale(1.1)';
        stat.style.transition = 'transform 0.2s';
    });
    
    stat.addEventListener('mouseleave', () => {
        stat.style.transform = 'scale(1)';
    });
});

// Destaque na tabela ao clicar no time
document.querySelectorAll('.team-cell').forEach(cell => {
    cell.style.cursor = 'pointer';
    cell.addEventListener('click', () => {
        const row = cell.closest('tr');
        row.style.background = '#fef3c7';
        setTimeout(() => {
            row.style.background = '';
            row.style.transition = 'background 0.5s';
        }, 1000);
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('Futebol News - Portal carregado com sucesso!');
    
    // Adiciona classe de animação ao header ao scrollar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
});