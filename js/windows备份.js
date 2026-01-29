// js/windows.js —— 回归最初最稳内嵌方案（本地100%播放成功版）

const windows = {};
let windowCount = 0;

// 通用打开窗口（同之前）
function openWindow(id, title, src, isPDF = false) {
    if (windows[id]) {
        windows[id].style.display = 'block';
        bringToFront(windows[id]);
        return;
    }

    const win = document.createElement('div');
    win.id = id;
    win.className = 'window';
    win.style.left = `${120 + (windowCount % 4) * 50}px`;
    win.style.top = `${120 + (windowCount % 4) * 50}px`;
    win.style.display = 'block';

    win.innerHTML = `
        <div class="window-header" onmousedown="dragStart(event,'${id}')">
            <span>${title}</span>
            <button onclick="closeWindow('${id}')">×</button>
        </div>
        <div class="window-content">
            ${isPDF ? `<embed src="${src}" type="application/pdf" width="100%" height="100%">` :
              `<iframe src="${src}" width="100%" height="100%" frameborder="0"></iframe>`}
        </div>
        <div class="resize-handle" onmousedown="resizeStart(event,'${id}')"></div>
    `;

    document.body.appendChild(win);
    windows[id] = win;
    windowCount++;
    bringToFront(win);
    loadWindowPosition(id);
}

function closeWindow(id) {
    if (id.startsWith('video-') || id.startsWith('coach-')) speechSynthesis.cancel();
    if (windows[id]) {
        saveWindowPosition(id);
        windows[id].remove();
        delete windows[id];
    }
}

function bringToFront(el) {
    const maxZ = Math.max(...Object.values(windows).map(w => parseInt(w.style.zIndex || 1000)), 1000) + 1;
    el.style.zIndex = maxZ;
}

/* 拖拽 + 缩放 + 位置记忆（同之前） */
let dragEl, dragX, dragY;
function dragStart(e, id) {
    dragEl = windows[id];
    dragX = e.clientX - dragEl.offsetLeft;
    dragY = e.clientY - dragEl.offsetTop;
    bringToFront(dragEl);
    document.onmousemove = e => {
        dragEl.style.left = (e.clientX - dragX) + 'px';
        dragEl.style.top = (e.clientY - dragY) + 'px';
        saveWindowPosition(id);
    };
    document.onmouseup = () => { document.onmousemove = document.onmouseup = null; };
    e.preventDefault();
}

function resizeStart(e, id) {
    const win = windows[id];
    const startX = e.clientX, startY = e.clientY;
    const startW = win.offsetWidth, startH = win.offsetHeight;
    document.onmousemove = e => {
        win.style.width = Math.max(400, startW + e.clientX - startX) + 'px';
        win.style.height = Math.max(300, startH + e.clientY - startY) + 'px';
        saveWindowPosition(id);
    };
    document.onmouseup = () => { document.onmousemove = document.onmouseup = null; };
    e.stopPropagation();
}

function saveWindowPosition(id) {
    const win = windows[id];
    if (!win) return;
    localStorage.setItem(`win_${id}`, JSON.stringify({
        left: win.style.left, top: win.style.top,
        width: win.style.width, height: win.style.height
    }));
}
function loadWindowPosition(id) {
    const data = localStorage.getItem(`win_${id}`);
    if (data) {
        const pos = JSON.parse(data);
        const win = windows[id];
        if (win) {
            win.style.left = pos.left;
            win.style.top = pos.top;
            win.style.width = pos.width;
            win.style.height = pos.height;
        }
    }
}

// ====================== 视频窗口（回归最初最稳内嵌方案） ======================
function openVideoWindow(chapter) {
    const id = `video-${chapter}`;
    openWindow(id, `视频 & 导师 - ${chapter}`, '', false);
    const win = windows[id];
    win.style.width = '1350px';
    win.style.height = '740px';

    const videos = videoLists[chapter] || [];
    let sidebarHTML = '<h4 style="margin-bottom:1rem;padding-left:0.5rem;">视频列表</h4>';
videos.forEach((v, i) => {
    sidebarHTML += `<button onclick="switchVideo('${id}','${v.bvid}')" class="${i===0?'active':''}">${v.title}</button>`;
    
    // 正确生成 Practice 按钮
    const practiceKey = `${chapter}_${i}`;
    if (practiceData && practiceData[practiceKey]) {
        sidebarHTML += `<button class="practice-side-btn" onclick="openPractice('${practiceKey}')">Practice 练习</button>`;
    }
});

    const initialBvid = videos[0]?.bvid || 'BV1xx411c7mu';

    win.querySelector('.window-content').innerHTML = `
        <div class="video-sidebar">${sidebarHTML}</div>
        <div class="video-main-split">
            <div class="video-player">
                <!-- 最初最稳的内嵌方式 + 强制本地播放参数 -->
                <iframe src="https://player.bilibili.com/player.html?bvid=${initialBvid}&page=1&high_quality=1&danmu=0&autoplay=0&t=10"
                        allowfullscreen="true"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation-by-user-activation"
                        frameborder="0" style="width:100%;height:100%;"></iframe>
            </div>
            <div class="coach-avatar-container">
                <div class="avatar-box">
                    <img id="avatar-${id}" src="assets/images/normal.png" alt="导师">
                    <p style="margin-top:8px;font-weight:bold;color:#0066cc;">CS 导师</p>
                </div>
                <div id="chat-log-${id}" class="chat-log">
                    <div class="chat-message chat-ai">你好！看视频时有问题随时问我哦~</div>
                </div>
                <div class="chat-input-controls">
                    <input type="text" placeholder="输入问题..." onkeydown="if(event.key==='Enter')sendChat('${id}')">
                    <button onclick="sendChat('${id}')">发送</button>
                </div>
            </div>
        </div>`;

    avatarStates[id] = {
        avatarEl: document.getElementById(`avatar-${id}`),
        logEl: document.getElementById(`chat-log-${id}`),
        inputEl: win.querySelector('input')
    };

    if (initialBvid) setTimeout(() => addPracticeButton(id, initialBvid), 3000);
}

function switchVideo(winId, bvid) {
    const iframe = document.querySelector(`#${winId} iframe`);
    iframe.src = `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmu=0&autoplay=0&t=10`;
    
    document.querySelectorAll(`#${winId} .video-sidebar button:not(.practice-side-btn)`).forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    setTimeout(() => addPracticeButton(winId, bvid), 3000);
}

// ====================== 教练一对一窗口（保持不变） ======================
function openCoachWindow(chapter) {
    const id = `coach-${chapter}`;
    openWindow(id, `教练一对一 - ${chapter}`, '', false);
    const win = windows[id];
    win.style.width = '1100px';
    win.style.height = '720px';

    win.querySelector('.window-content').innerHTML = `
        <div style="padding:2rem;display:flex;height:100%;gap:2rem;">
            <div style="flex:1;display:flex;flex-direction:column;">
                <div class="avatar-box" style="text-align:center;margin-bottom:1rem;">
                    <img src="assets/images/normal.png" id="big-avatar-${id}" style="width:180px;height:180px;border-radius:50%;border:5px solid #0066cc;">
                    <p style="font-size:1.5rem;font-weight:bold;margin-top:10px;color:#0066cc;">你的专属 CS 教练</p>
                </div>
                <div id="chat-log-${id}" class="chat-log" style="flex-grow:1;">
                    <div class="chat-message chat-ai">你好！今天想聊哪个知识点？直接问我吧~</div>
                </div>
                <div class="chat-input-controls">
                    <input type="text" placeholder="输入你的问题..." onkeydown="if(event.key==='Enter')sendChat('${id}')">
                    <button onclick="sendChat('${id}')">发送</button>
                </div>
            </div>
            <div style="flex:1;background:#f8f9fa;padding:2rem;border-radius:12px;">
                <h3>推荐练习</h3>
                <p>点右下角绿色 Practice 按钮就有专属题库啦！</p>
            </div>
        </div>`;

    avatarStates[id] = {
        avatarEl: document.getElementById(`big-avatar-${id}`),
        logEl: document.getElementById(`chat-log-${id}`),
        inputEl: win.querySelector('input')
    };
}