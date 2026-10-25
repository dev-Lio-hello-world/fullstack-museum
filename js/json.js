// 功能二十八：JSON 格式化与高亮
// noinspection UnnecessaryLocalVariableJS

document.getElementById("formatJsonBtn").addEventListener("click", function() {
    const input = document.getElementById("jsonInput").value.trim();
    const output = document.getElementById("jsonOutput");

    if (!input) {
        output.textContent = "⚠️ 请输入 JSON 数据";
        output.style.color = "orange";
        return;
    }

    try {
        // 1. 解析 JSON（如果格式不对会在这里报错）
        const parsed = JSON.parse(input);

        // 2. 转成带缩进的漂亮字符串
        const formatted = JSON.stringify(parsed, null, 4);

        // 3. 正则高亮（极客专属：给 Key、String、Number 上色）
        const highlighted = formatted
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                let cls = 'number'; // 默认数字
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key'; // 如果是键名
                    } else {
                        cls = 'string'; // 如果是字符串
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                // 给不同类别加上不同颜色的 span
                const colors = {
                    key: '#88D4FF',     // 键名：浅蓝色
                    string: '#66ff99',  // 字符串：绿色
                    number: '#ffaa66',  // 数字：橙色
                    boolean: '#e94560', // 布尔值：红色
                    null: '#999'        // null：灰色
                };
                return `<span style="color: ${colors[cls]}; font-weight: bold;">${match}</span>`;
            });

        output.innerHTML = highlighted;
    } catch (e) {
        // 如果解析失败，直接标红报错
        output.textContent = "❌ 解析失败：这不是合法的 JSON\n" + e.message;
        output.style.color = "red";
    }
});

// 清空按钮
document.getElementById("clearJsonBtn").addEventListener("click", function() {
    document.getElementById("jsonInput").value = "";
    document.getElementById("jsonOutput").innerHTML = "";
});