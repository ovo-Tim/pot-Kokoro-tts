async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { tauriFetch } = utils;
    let { requestPath, voice } = config;

    // 处理请求路径
    if (!requestPath) {
        requestPath = "http://localhost:8880"; // 默认本地服务地址
    } else if (!requestPath.startsWith('http')) {
        requestPath = 'http://' + requestPath; // 自动补全协议头
    }

    // 构造请求参数
    const payload = {
        model: "kokoro",
        input: text,
        voice: voice || "af_bella",        // 默认语音
        response_format: "mp3", // 默认格式
        speed: config?.speed || 1.0        // 默认语速
    };

    // 发送 POST 请求
    const res = await tauriFetch(`${requestPath}/v1/audio/speech`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    // 处理响应
    if (res.ok) {
        return res.data; // 直接返回二进制音频数据
    } else {
        throw `请求失败 (状态码: ${res.status})\n${JSON.stringify(res.data)}`;
    }
}