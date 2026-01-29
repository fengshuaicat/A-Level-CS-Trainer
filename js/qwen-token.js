// js/qwen-token.js —— 纯前端版（用 API Key 直接生成 token，自动续期）
let cachedToken = null;
let tokenExpireTime = 0;

async function getQwenToken() {
    const now = Date.now();

    // 如果 token 还没过期（提前 5 分钟续），直接返回
    if (cachedToken && now < tokenExpireTime - 5 * 60 * 1000) {
        return cachedToken;
    }

    // 否则用 API Key 生成新 token
    try {
        const apiKey = 'sk-65ccabc0ccf1451f968a8febdc75267d';  // ← 改成你的真实 API Key (sk-xxx...)
        
        const response = await fetch('https://dashscope.aliyuncs.com/api/v1/token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,  // 用你的 API Key 直接认证
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})  // 空 body，生成临时 token
        });

        if (!response.ok) {
            throw new Error(`Token 生成失败: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        cachedToken = data.token;  // token 就是响应里的 token 字段
        tokenExpireTime = now + 23.5 * 60 * 60 * 1000;  // 23.5 小时保险
        console.log('千问 token 已生成，将在 ~24h 后过期');
        return cachedToken;
    } catch (e) {
        console.error('获取 token 失败', e);
        alert('大模型连接失败！检查 API Key 是否正确，或刷新页面重试~');
        throw e;
    }
}