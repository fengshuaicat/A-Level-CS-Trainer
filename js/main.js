document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('chapters-container');
    
    chaptersData.forEach(chap => {
        const section = document.createElement('div');
        section.className = 'section';
        section.innerHTML = `
            <div class="section-header collapsed" onclick="toggleSection(this)">
                ${chap.title}
            </div>
            <div class="chapters" style="display:none;">
                ${chap.cards.map(card => `
                    <div class="card">
                        <h3>${card.title}</h3>
                        <p>${card.desc}</p>
                        <div class="card-actions">
                            <button class="btn btn-video" onclick="${card.video}">视频列表</button>
                            <button class="btn btn-note" onclick="${card.note}">笔记</button>
                            <button class="btn btn-coach" onclick="${card.coach}">教练一对一</button>
                            <button class="btn btn-game" onclick="${card.game}">游戏</button>
                            <button class="btn btn-feynman" onclick="${card.feynman}">费曼学习</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(section);
    });
});

function toggleSection(el) {
    el.classList.toggle('collapsed');
    const c = el.nextElementSibling;
    c.style.display = c.style.display === 'none' ? 'grid' : 'none';
}