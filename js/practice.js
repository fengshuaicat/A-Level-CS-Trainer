// js/practice.js

// 打开 Practice 窗口
function openPractice(key) {
    const id = `practice-${key}`;
    openWindow(id, practiceData[key]?.title || "Practice", `practice.html?key=${key}`, false);
    const win = windows[id];
    win.style.width = '900px';
    win.style.height = '700px';
}

// 在 openVideoWindow 里加 Practice 按钮
// js/practice.js —— 右下角 Practice 按钮（新版，完美支持 practiceData）
function addPracticeButton(winId, bvid) {
    const player = document.querySelector(`#${winId} .video-player`);
    if (!player || player.querySelector('.practice-btn')) return;

    // 计算当前是第几个视频
    const chapter = winId.replace('video-', '');  // 如 1_1
    const videos = videoLists[chapter] || [];
    const index = videos.findIndex(v => v.bvid === bvid);
    if (index === -1) return;

    const practiceKey = `${chapter}_${index}`;
    if (!practiceData || !practiceData[practiceKey]) return;  // 没有练习就不显示按钮

    const btn = document.createElement('div');
    btn.className = 'practice-btn';
    btn.textContent = 'Practice 练习';
    btn.onclick = () => openPractice(practiceKey);
    player.appendChild(btn);
}
