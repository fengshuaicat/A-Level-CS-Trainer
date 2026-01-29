// js/coach-ai.js
const avatarStates = {};

function getSmartResponse(message) {
    const msg = message.toLowerCase().trim();
    
    if (msg.includes('你好') || msg.includes('hi') || msg.includes('hello')) {
        return '你好！我是你的 A-Level CS 专属导师，有任何问题随时问我哦~';
    }
    if (msg.includes('二进制') || msg.includes('binary')) {
        return '二进制是计算机的核心，只用 0 和 1 表示信息。8 位二进制最大是 11111111 = 255。你想练加法还是转换？';
    }
    if (msg.includes('十六进制') || msg.includes('hex')) {
        return '十六进制是为了方便人类阅读，每 4 位二进制 = 1 位十六进制。FF = 255，CAFÉ = 51966。你要我帮你转吗？';
    }
    if (msg.includes('ascii')) {
        return 'ASCII 用 7 位表示 128 个字符，扩展 ASCII 用 8 位。A = 65，a = 97，空格 = 32。Unicode 才是现代标准哦~';
    }
    if (msg.includes('看不懂') || msg.includes('不会') || msg.includes('难')) {
        return '没关系！我们一步步来。你先告诉我哪一步卡住了？我用最简单的话给你讲一遍~';
    }
    if (msg.includes('练习') || msg.includes('题')) {
        return '点右下角绿色的「Practice 练习」按钮就有针对当前视频的专属题库，还会自动评分哦！';
    }
    if (msg.includes('谢谢') || msg.includes('谢')) {
        return '不客气！继续加油，你离满分又近了一步！💪';
    }
    
    return '这个问题我现在还不能完美回答，但你可以看看笔记 PDF，或者直接点 Practice 练习巩固一下~';
}

function startAvatarTalking(winId) {
    const state = avatarStates[winId];
    if (!state) return;
    state.avatarEl.src = 'assets/images/talk.gif';  // 切换说话动图
}

function stopAvatarTalking(winId) {
    const state = avatarStates[winId];
    if (!state) return;
    state.avatarEl.src = 'assets/images/normal.png'; // 恢复静态图
}

function sendChat(winId) {
    const state = avatarStates[winId];
    if (!state || !state.inputEl.value.trim()) return;

    const message = state.inputEl.value.trim();
    state.logEl.innerHTML += `<div class="chat-message chat-user">${message}</div>`;
    state.logEl.scrollTop = state.logEl.scrollHeight;
    state.inputEl.value = '';

    const response = getSmartResponse(message);
    
    startAvatarTalking(winId);
    
    setTimeout(() => {
        state.logEl.innerHTML += `<div class="chat-message chat-ai">${response}</div>`;
        state.logEl.scrollTop = state.logEl.scrollHeight;

        // 语音朗读（中文）
        const utter = new SpeechSynthesisUtterance(response);
        utter.lang = 'zh-CN';
        utter.rate = 1.0;
        utter.onend = () => stopAvatarTalking(winId);
        speechSynthesis.cancel();
        speechSynthesis.speak(utter);
    }, 600);
}