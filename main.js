async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { http } = utils;
    const { fetch, Body } = http;
    let { requestPath, voice, speed } = config;

    // 处理基础路径
    if (!requestPath) {
        requestPath = "http://localhost:8880"; // 默认与 Python 示例保持一致
    }
    requestPath = requestPath.replace(/\/$/, ''); // 移除末尾斜杠

    const endpoint = `${requestPath}/v1/audio/speech`;

    // 处理语速
    if (!speed) {
        speed = 1.0;
    }

    // 构建请求体
    const requestBody = {
        model: "kokoro",        // 固定模型名称
        input: text,
        voice: voice,
        speed: parseFloat(speed),
        response_format: "mp3"
    };

    // 发送请求
    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: Body.json(requestBody),
        responseType: 3          // 表示需要二进制响应
    });

    // 处理响应
    if (res.ok) {
        return res.data; // 直接返回二进制音频数据
    } else {
        throw `请求失败 (状态码: ${res.status})\n${JSON.stringify(res.data)}`;
    }
}