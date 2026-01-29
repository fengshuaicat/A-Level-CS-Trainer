// js/feynman.js
let recorder, cameraStream, screenStream;

async function openFeynman(chapter) {
    const id = `feynman-${chapter}`;
    openWindow(id, `费曼学习 - ${chapter}`, '', false);
    const win = windows[id];
    win.style.width = '1000px'; win.style.height = '680px';

    win.querySelector('.window-content').innerHTML = `
        <div style="padding:1rem;">
            <div style="display:flex;gap:1rem;height:100%;">
                <video id="feynman-cam" width="200" height="150" autoplay muted style="border-radius:8px;border:3px solid #0066cc;position:absolute;top:20px;right:20px;z-index:10;"></video>
                <video id="feynman-screen" width="100%" height="520" controls style="background:#000;border-radius:8px;"></video>
            </div>
            <div style="text-align:center;margin-top:1rem;">
                <button onclick="startFeynmanRecording()" id="startBtn" style="padding:12px 30px;background:#e74c3c;color:white;border:none;border-radius:8px;cursor:pointer;font-size:1rem;">开始录制</button>
                <button onclick="stopFeynmanRecording()" id="stopBtn" disabled style="padding:12px 30px;background:#7f8c8d;color:white;border:none;border-radius:8px;cursor:pointer;margin-left:1rem;">停止并下载</button>
            </div>
        </div>`;

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        document.getElementById('feynman-cam').srcObject = cameraStream;
    } catch(e) { alert('无法访问摄像头/麦克风'); }
}

async function startFeynmanRecording() {
    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
        document.getElementById('feynman-screen').srcObject = screenStream;

        const mixed = new MediaStream([...screenStream.getTracks(), ...cameraStream.getTracks()]);
        recorder = new MediaRecorder(mixed, {mimeType: 'video/webm'});
        
        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, {type: 'video/webm'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `费曼录制_${new Date().toLocaleString().replace(/[/:\\]/g,'-')}.webm`;
            a.click();
        };
        
        recorder.start();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    } catch(e) { alert('录屏被取消或权限问题'); }
}

function stopFeynmanRecording() {
    if (recorder && recorder.state !== 'inactive') recorder.stop();
    if (screenStream) screenStream.getTracks().forEach(t => t.stop());
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}