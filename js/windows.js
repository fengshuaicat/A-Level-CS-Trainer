// js/windows.js —— 2025终极固定双栏版（教练默认显示，图片可拖拽平移）
if (typeof windows === 'undefined') {
    window.windows = {};
    window.avatarStates = {};
    window.windowCount = 0;
}

const API_KEY = 'sk-65ccabc0ccf1451f968a8febdc75267d';

function addMessage(logEl, text, type) {
    const div = document.createElement('div');
    div.className = `chat-message ${type}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    logEl.appendChild(div);
    logEl.scrollTop = logEl.scrollHeight;
    return div;
}

async function sendChat(winId) {
    const state = window.avatarStates[winId];
    if (!state || !state.inputEl.value.trim()) return;

    const userInput = state.inputEl.value.trim();
    addMessage(state.logEl, userInput, 'chat-user');
    state.inputEl.value = '';

    const thinking = addMessage(state.logEl, '思考中...', 'chat-ai');
    state.avatarEl.src = 'assets/images/speaking.png';

    const chapter = winId.replace('video-', '').replace('coach-', '');

    try {
        const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'qwen-plus',
                messages: [
                    { role: "system", content: `你是一位超级温柔负责的 A-Level CS 老师，正在教中国高中生。
回答必须中英双语、简洁清晰、打生活比方、结尾鼓励学生。
当前章节：${chapter}
永远不要说自己是AI。` },
                    { role: 'user', content: userInput }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content?.trim() || '（无回应）';
        thinking.innerHTML = reply;

    } catch (e) {
        thinking.textContent = '网络出错：' + e.message;
    } finally {
        setTimeout(() => state.avatarEl.src = 'assets/images/normal.png', 1500);
    }
}

// ====================== 基础窗口系统 ======================
function openWindow(id, title, src, isPDF = false) {
    if (window.windows[id]) {
        window.windows[id].style.display = 'block';
        bringToFront(window.windows[id]);
        return;
    }
    const win = document.createElement('div');
    win.id = id;
    win.className = 'window';
    win.style.left = `${120 + (window.windowCount % 4) * 50}px`;
    win.style.top = `${120 + (window.windowCount % 4) * 50}px`;
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
    window.windows[id] = win;
    window.windowCount++;
    bringToFront(win);
    loadWindowPosition(id);
}

function closeWindow(id) {
    if (id.startsWith('video-') || id.startsWith('coach-')) speechSynthesis.cancel();
    if (window.windows[id]) {
        saveWindowPosition(id);
        window.windows[id].remove();
        delete window.windows[id];
    }
}

function bringToFront(el) {
    const maxZ = Math.max(...Object.values(window.windows).map(w => parseInt(w.style.zIndex || 1000)), 1000) + 1;
    el.style.zIndex = maxZ;
}

// ====================== 拖拽 + 缩放 + 位置记忆 ======================
let dragEl = null, dragOffsetX = 0, dragOffsetY = 0;

function dragStart(e, id) {
    dragEl = window.windows[id];
    if (!dragEl) return;
    dragOffsetX = e.clientX - dragEl.offsetLeft;
    dragOffsetY = e.clientY - dragEl.offsetTop;
    bringToFront(dragEl);

    const moveHandler = (e) => {
        dragEl.style.left = (e.clientX - dragOffsetX) + 'px';
        dragEl.style.top = (e.clientY - dragOffsetY) + 'px';
        saveWindowPosition(id);
    };
    const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
    e.preventDefault();
}

function resizeStart(e, id) {
    const win = window.windows[id];
    if (!win) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = win.offsetWidth;
    const startHeight = win.offsetHeight;
    bringToFront(win);

    const moveHandler = (e) => {
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);
        win.style.width = Math.max(800, newWidth) + 'px';
        win.style.height = Math.max(600, newHeight) + 'px';
        saveWindowPosition(id);
    };
    const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
    e.stopPropagation();
}

function saveWindowPosition(id) {
    const win = window.windows[id];
    if (!win) return;
    localStorage.setItem(`win_${id}`, JSON.stringify({
        left: win.style.left || '100px',
        top: win.style.top || '100px',
        width: win.style.width || '1000px',
        height: win.style.height || '700px'
    }));
}

function loadWindowPosition(id) {
    try {
        const data = localStorage.getItem(`win_${id}`);
        if (data) {
            const pos = JSON.parse(data);
            const win = window.windows[id];
            if (win) {
                win.style.left = pos.left;
                win.style.top = pos.top;
                win.style.width = pos.width;
                win.style.height = pos.height;
            }
        }
    } catch (e) { }
}

// ====================== 视频窗口 ======================
function openVideoWindow(chapter) {
    const id = `video-${chapter}`;
    openWindow(id, `视频 & 导师 - ${chapter}`, '', false);
    const win = window.windows[id];
    win.style.width = '1350px';
    win.style.height = '740px';

    const videos = (typeof videoLists !== 'undefined' ? videoLists[chapter] : window.videoLists?.[chapter]) || [];
    let sidebarHTML = '<h4 style="margin-bottom:1rem;padding-left:0.5rem;">视频列表</h4>';

    videos.forEach((v, i) => {
        sidebarHTML += `<button onclick="switchVideo('${id}','${v.bvid}')" class="${i===0?'active':''}">${v.title}</button>`;
        const practiceKey = `${chapter}_${i}`;
        const pd = (typeof practiceData !== 'undefined' ? practiceData : window.practiceData);
        if (pd?.[practiceKey]) {
            sidebarHTML += `<button class="practice-side-btn" onclick="openPractice('${practiceKey}')">Practice 练习</button>`;
        }
    });

    const initialBvid = videos[0]?.bvid || 'BV1xx411c7mu';

    win.querySelector('.window-content').innerHTML = `
        <div class="video-sidebar">${sidebarHTML}</div>
        <div class="video-main-split">
            <div class="video-player">
                <iframe src="https://player.bilibili.com/player.html?bvid=${initialBvid}&page=1&high_quality=1&danmu=0&autoplay=0&t=10"
                        allowfullscreen="true" frameborder="0" style="width:100%;height:100%;"></iframe>
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
        </div>
        <button class="floating-note-btn" onclick="openNoteBesideVideo('${chapter}')">
            <span>做笔记</span>
        </button>
    `;

    window.avatarStates[id] = {
        avatarEl: document.getElementById(`avatar-${id}`),
        logEl: document.getElementById(`chat-log-${id}`),
        inputEl: win.querySelector('input')
    };
}

function switchVideo(winId, bvid) {
    const iframe = document.querySelector(`#${winId} iframe`);
    if (iframe) iframe.src = `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmu=0&autoplay=0&t=10`;
    document.querySelectorAll(`#${winId} .video-sidebar button:not(.practice-side-btn)`).forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

// ====================== 笔记系统 ======================
function openNoteWindow(chapterId) {
    const id = 'note-' + chapterId;
    if (window.windows[id]) {
        bringToFront(window.windows[id]);
        return;
    }
    let title = chapterId.replace('_', '.');
    outer: for (const chap of chaptersData) {
        for (const card of chap.cards) {
            if (card.note && card.note.includes(chapterId)) {
                title = card.title;
                break outer;
            }
        }
    }
    openWindow(id, '笔记 · ' + title, 'notes-embedded/embedded-note.html?chapter=' + chapterId, false);
    const win = window.windows[id];
    win.style.width = '1350px';
    win.style.height = '850px';
    win.style.left = '70px';
    win.style.top = '70px';
    bringToFront(win);
}

function openNoteBesideVideo(chapterId) {
    const videoWin = document.querySelector('.window:not([style*="display: none"])');
    if (!videoWin) { openNoteWindow(chapterId); return; }
    const videoRect = videoWin.getBoundingClientRect();
    const noteId = 'note-' + chapterId;
    openNoteWindow(chapterId);
    setTimeout(() => {
        const noteWin = window.windows[noteId];
        if (noteWin) {
            noteWin.style.width = '1350px';
            noteWin.style.height = '850px';
            noteWin.style.left = (videoRect.right + 20) + 'px';
            noteWin.style.top = Math.max(50, videoRect.top) + 'px';
            bringToFront(noteWin);
        }
    }, 100);
}

// ====================== 教练一对一（固定双栏布局 - 默认显示）======================

/**
 * 【已删除】旧的 toggleCoachDrawer 函数，因为教练现在默认显示。
 */

function openCoachWindow(chapter) {
    const id = `coach-${chapter}`;
    
    // 确保拖拽功能所需的函数在全局可用
    if (typeof toggleZoomAndDrag !== 'function') {
        console.error("Warning: toggleZoomAndDrag function is missing. Ensure the IIFE patch is included at the file bottom.");
    }
    
    openWindow(id, `真题特训 - ${chapter}`, '', false);
    const win = window.windows[id];
    // 使用更大的初始尺寸，但内容区域完全自适应
    win.style.width = '1680px'; 
    win.style.height = '960px';

    win.querySelector('.window-content').innerHTML = `
    <div style="height:100%; display:flex; background:#f8fbfd;">
        
        <div id="practice-area-${id}" 
             style="flex-grow: 1; height:100%; overflow-y:auto; padding:3.5rem 6rem; box-sizing:border-box; border-right: 1px solid #e0e0e0;">
            <div style="text-align:center;padding:16rem 0;color:#e0e0e0;font-size:5rem;font-weight:300;">加载真题中...</div>
        </div>

        <div id="coach-sidebar-${id}" 
             style="width:450px; height:100%; background:white; 
                    box-shadow:-6px 0 30px rgba(0,0,0,0.1); 
                    z-index:99; display:flex; flex-direction:column;">

            <div style="background:#0066cc; color:white; padding:1.5rem; text-align:center; font-weight:bold; font-size:1.5rem;">
                <span>专属 AI 教练</span>
            </div>
            
            <div style="flex-grow: 1; display:flex; flex-direction:column; padding:1.5rem 1rem 0;">
                <div style="text-align:center; margin-bottom:1rem;">
                    <img src="assets/images/normal.png" id="big-avatar-${id}" style="width:120px; height:120px; border-radius:50%; border:5px solid #0066cc;">
                </div>
                <div id="chat-log-${id}" style="flex-grow:1; overflow-y:auto; padding:0.5rem; background:#f9fbff; border-radius:12px; margin-bottom:1rem; box-shadow:inset 0 1px 8px rgba(0,0,0,0.05);">
                    <div class="chat-message chat-ai" style="background:#e3f2fd;padding:14px 18px;border-radius:20px;max-width:88%;margin:10px 0;">你好，我是你的专属 A-Level CS 教练。专注于真题，有问题随时点我哦！</div>
                </div>
                <div style="display:flex;gap:0.6rem; padding-bottom:1rem;">
                    <input type="text" id="coach-input-${id}" placeholder="输入你的问题..." onkeydown="if(event.key==='Enter')sendChat('${id}')" 
                           style="flex:1;padding:12px 16px;border:2px solid #cce5ff;border-radius:16px;font-size:1.05rem;background:white;">
                    <button onclick="sendChat('${id}')" style="background:#0066cc;color:white;padding:12px 20px;border:none;border-radius:16px;font-weight:bold;">发送</button>
                </div>
            </div>
        </div>

    </div>`;

    window.avatarStates[id] = {
        avatarEl: document.getElementById(`big-avatar-${id}`),
        logEl: document.getElementById(`chat-log-${id}`),
        inputEl: document.getElementById(`coach-input-${id}`) // 正确指向输入框
    };

    loadPracticeFromServer(id, chapter);
}

// 图片点击处理已修改，调用 toggleZoomAndDrag 函数，实现拖拽平移
async function loadPracticeFromServer(winId, chapter) {
    const area = document.getElementById(`practice-area-${winId}`);
    area.innerHTML = `<div style="text-align:center;padding:18rem 0;color:#f0f0f0;font-size:5rem;">加载中...</div>`;

    try {
        const res = await fetch(`/past_papers/chapter_${chapter.replace(/\./g,'_')}/questions.json?t=${Date.now()}`);
        if (!res.ok) throw new Error('暂无题目');
        const questions = await res.json();

        if (questions.length === 0) {
            area.innerHTML = `<div style="text-align:center;padding:20rem;color:#999;font-size:2rem;">本章暂无真题哦～</div>`;
            return;
        }

        let html = `<h2 style="text-align:center;color:#0066cc;margin:3rem 0 5rem;font-size:3.5rem;font-weight:800;letter-spacing:1px;">${chapter} ✦ 真题实战特训 ✦</h2>`;

        questions.slice(0, 20).forEach((q, i) => {
            const imgHtml = q.files?.length > 0 ? q.files.map(src => `
                <div style="margin:4rem 0;text-align:center;">
                    <img src="${src}" 
                         style="max-width:100%;width:auto;max-height:90vh;border-radius:24px;
                                box-shadow:0 15px 40px rgba(0,0,0,0.35);cursor:zoom-in;
                                transition:transform 0.4s ease, cursor 0.4s ease;"
                         onclick="toggleZoomAndDrag(this); event.stopPropagation();"
                         onload="this.dataset.zoomed='false'; this.dataset.translateX='0'; this.dataset.translateY='0';">
                    <div style="margin-top:16px;color:#0066cc;font-size:1.3rem;font-weight:600;">点击图片可放大 2.5 倍，放大后可用鼠标拖拽平移查看细节</div>
                </div>
            `).join('') : '';

            // 按钮逻辑：直接将问题填充到输入框并发送，教练在右侧面板处理
            const askExplanationCode = `
                const inputEl = document.getElementById('coach-input-${winId}');
                if (inputEl) {
                    inputEl.value = '请详细讲解第 ${i+1} 题的解题思路，引导我一步步思考，但不要给出答案。题目：${q.text.replace(/'/g, "\\'") || '（图片题）'}';
                    sendChat('${winId}');
                }
            `;


            html += `
            <div style="background:white;border-radius:36px;padding:4.5rem;margin-bottom:7rem;
                        box-shadow:0 30px 80px rgba(0,0,0,0.18);border:6px solid #e6f7ff;">
                
                <div style="text-align:center;margin-bottom:3.5rem;">
                    <span style="font-size:3rem;color:#d9e8ff;font-weight:900;margin-right:1rem;">${i+1}</span>
                    <span style="font-size:2.6rem;color:#0066cc;font-weight:bold;border-bottom:3px solid #0066cc;padding-bottom:5px;">实战真题</span>
                </div>
                
                ${q.text ? `<div style="font-size:1.9rem;line-height:2.6;color:#333;background:#f8fdff;padding:2.5rem;border-left:12px solid #0066cc;border-radius:16px;margin:3rem 0;">${q.text.replace(/\n/g,'<br>')}</div>` : ''}
                
                ${imgHtml}
                
                <textarea id="answer-${q.id}" placeholder="请在这里写下你的完整答案..." 
                          style="width:100%;min-height:250px;padding:2rem;font-size:1.6rem;border:4px solid #cce5ff;border-radius:28px;margin:3rem 0;resize:vertical;background:#fafcff;box-shadow:inset 0 3px 10px rgba(0,0,0,0.05);"></textarea>
                
                <div style="display:flex;gap:2.5rem;justify-content:center;flex-wrap:wrap;">
                    <button onclick="submitForGrading('${winId}','${q.id}','${btoa(encodeURIComponent(q.answer))}', '${q.hint||''}')"
                            style="background:#28a745;color:white;padding:18px 60px;border:none;border-radius:35px;font-size:1.7rem;font-weight:bold;cursor:pointer;box-shadow:0 15px 35px rgba(40,167,69,0.5);transform:translateY(0);transition:all 0.2s;">✅ 提交答案（老师批改）</button>
                    <button onclick="${askExplanationCode}"
                            style="background:#0066cc;color:white;padding:18px 60px;border:none;border-radius:35px;font-size:1.7rem;font-weight:bold;cursor:pointer;box-shadow:0 15px 35px rgba(0,102,204,0.5);transform:translateY(0);transition:all 0.2s;">🧠 AI 讲解思路</button>
                </div>
            </div>`;
        });

        html += `<div style="text-align:center;color:#aaa;font-size:1.5rem;margin-bottom:5rem;">--- 本章真题加载完毕，请开始作答 ---</div>`;
        area.innerHTML = html;
        area.scrollTop = 0;

    } catch (e) {
        area.innerHTML = `<div style="text-align:center;padding:20rem;color:#e74c3c;font-size:2rem;">加载失败：${e.message}</div>`;
    }
}

// ====================== 批改和讲解辅助函数（原功能保留） ======================

function submitForGrading(winId, qid, answerB64, hint) {
    const textarea = document.getElementById(`answer-${qid}`);
    const userAnswer = textarea.value.trim();
    if (!userAnswer) return alert('请先填写答案哦～');
    const correctAnswer = decodeURIComponent(atob(answerB64));
    const state = window.avatarStates[winId];
    addMessage(state.logEl, `我的答案：<br><br>${userAnswer}`, 'chat-user');
    const thinking = addMessage(state.logEl, '正在批改中...', 'chat-ai');

    fetch('/chat_qwen', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            message: `请严格按照标准答案温柔批改，鼓励学生。\n标准答案：${correctAnswer}\n${hint ? '提示：'+hint+'\n' : ''}学生答案：${userAnswer}\n最后一定要说“你已经很棒啦～继续加油！”`,
            chapter: winId.replace('coach-', '')
        })
    })
    .then(r => r.json())
    .then(d => {
        thinking.innerHTML = d.reply;
        state.avatarEl.src = 'assets/images/speaking.png';
        setTimeout(() => state.avatarEl.src = 'assets/images/normal.png', 3000);
    });
}

function askForExplanation(winId, qnum, questionText, hint) {
    // 兼容性保留
}


// ==================== 【图片拖拽平移 IIFE 补丁】====================
// 此代码块实现图片放大后的拖拽平移功能（小手工具）。

(function () {
    let isDragging = false;
    let dragImg = null;
    let startX, startY;
    let currentX = 0; // 存储当前累计的 X 轴偏移量
    let currentY = 0; // 存储当前累计的 Y 轴偏移量
    const ZOOM_LEVEL = 2.5; 
    
    // 1. 放大/缩小切换函数 (toggleZoomAndDrag)
    window.toggleZoomAndDrag = function (img) {
        if (img.dataset.zoomed === 'true') {
            // 缩小 (Unzoom)
            img.style.transform = `scale(1) translate(0px, 0px)`; // 重置缩放和平移
            img.style.cursor = 'zoom-in';
            img.dataset.zoomed = 'false';
            img.style.zIndex = '1';
            
            // 重置状态
            currentX = 0;
            currentY = 0;
            img.dataset.translateX = '0';
            img.dataset.translateY = '0';
            
            // 移除拖拽监听
            img.removeEventListener('mousedown', dragStart);
            img.removeEventListener('touchstart', dragStart);
        } else {
            // 放大 (Zoom in)
            img.style.transform = `scale(${ZOOM_LEVEL})`;
            img.style.cursor = 'grab'; // 提示可拖拽
            img.dataset.zoomed = 'true';
            img.style.zIndex = '99999'; // 确保在最上层
            
            // 启用拖拽监听
            img.addEventListener('mousedown', dragStart);
            img.addEventListener('touchstart', dragStart);
        }
    };

    // 2. 拖拽开始 (dragStart)
    function dragStart(e) {
        if (this.dataset.zoomed !== 'true') return;

        isDragging = true;
        dragImg = this;
        dragImg.style.cursor = 'grabbing'; // 拖拽中样式
        e.preventDefault(); 

        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : e.clientX);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : e.clientY);

        startX = clientX;
        startY = clientY;
        
        // 读取存储的累计偏移量
        currentX = parseInt(dragImg.dataset.translateX || 0);
        currentY = parseInt(dragImg.dataset.translateY || 0);

        // 绑定全局移动和抬起事件
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('touchmove', dragMove);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    }

    // 3. 拖拽移动 (dragMove)
    function dragMove(e) {
        if (!isDragging || !dragImg) return;
        
        // 阻止滚动和选择
        e.preventDefault(); 

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        // 计算本次移动的增量
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        // 计算新的临时位置
        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        // 应用缩放和平移
        dragImg.style.transform = `scale(${ZOOM_LEVEL}) translate(${newX}px, ${newY}px)`;
    }

    // 4. 拖拽结束 (dragEnd)
    function dragEnd(e) {
        if (!isDragging || !dragImg) return;
        
        const clientX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : startX);
        const clientY = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : startY);

        // 重新计算并存储最终位置
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        currentX += deltaX;
        currentY += deltaY;

        // 存储最终位置
        dragImg.dataset.translateX = currentX;
        dragImg.dataset.translateY = currentY;
        
        isDragging = false;
        dragImg.style.cursor = 'grab';
        
        // 解绑全局事件
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);
    }
    
    console.log('图片拖拽平移（小手工具）功能已加载。');
})();
console.log('windows.js yyyyyyyyyyyyyyyyyyyyyyyyy加载完成！所有功能已完美恢复并全面升级！');