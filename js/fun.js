// 功能十三：计时器
let timerSeconds = 0;
let timerInterval = null;
const timerDisplay = document.getElementById("timerDisplay");

function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return m + ':' + s;
}

document.getElementById("timerStartBtn").addEventListener("click", function () {
    if (timerInterval) return;
    timerInterval = setInterval(function () {
        timerSeconds++;
        timerDisplay.textContent = formatTime(timerSeconds);
    }, 1000);
});

document.getElementById("timerPauseBtn").addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById("timerResetBtn").addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 0;
    timerDisplay.textContent = "00:00";
});

// 功能十四：随机选择器
document.getElementById("抽选按钮").addEventListener("click", function () {
    const 输入 = document.getElementById("选项输入").value;
    const 选项列表 = 输入.split("\n").map(s => s.trim()).filter(s => s !== "");
    const 结果 = document.getElementById("抽选结果");
    if (选项列表.length === 0) {
        结果.textContent = "⚠️ 请至少输入一个选项";
        结果.style.color = "orange";
        return;
    }
    const 随机索引 = Math.floor(Math.random() * 选项列表.length);
    结果.textContent = "🎯 " + 选项列表[随机索引];
    结果.style.color = "#2c3e50";
});

// 功能十五：实时字符计数器
document.getElementById("charInput").addEventListener("input", function () {
    const count = this.value.length;
    document.getElementById("charCount").textContent = count;
});

// 功能二十四：打字速度测试
const typingTarget = document.getElementById("typingTarget");
const typingInput = document.getElementById("typingInput");
const typingStatus = document.getElementById("typingStatus");
const typingStats = document.getElementById("typingStats");
const typingStartBtn = document.getElementById("typingStartBtn");
const typingResetBtn = document.getElementById("typingResetBtn");

const typingTexts = [
    "代码是写给人看的，顺便给机器运行。",
    "Talk is cheap. Show me the code.",
    "变量本质上是标签，不是盒子。",
    "书要一页一页读，代码要一行一行写。",
    "能劝一个是一个。"
];

let typingStartTime = null;
let typingText = "";
let typingFinished = false;

function pickTypingText() {
    const index = Math.floor(Math.random() * typingTexts.length);
    return typingTexts[index];
}

typingStartBtn.addEventListener("click", function () {
    typingText = pickTypingText();
    typingTarget.textContent = typingText;
    typingInput.value = "";
    typingInput.disabled = false;
    typingInput.focus();
    typingStats.textContent = "";
    typingStatus.textContent = "⏳ 开始打字...";
    typingStartTime = Date.now();
    typingFinished = false;
});

typingResetBtn.addEventListener("click", function () {
    typingTarget.textContent = "";
    typingInput.value = "";
    typingInput.disabled = true;
    typingStats.textContent = "";
    typingStatus.textContent = "点击“开始测试”";
    typingStartTime = null;
    typingFinished = false;
});

let composing = false;

typingInput.addEventListener("compositionstart", () => {
    composing = true;
});

typingInput.addEventListener("compositionend", () => {
    composing = false;
});

typingInput.addEventListener("input", function () {
    if (composing) return;   // 正在打拼音，跳过
    if (typingFinished || !typingStartTime) return;

    const typed = typingInput.value;
    const target = typingText;

    if (typed.length > target.length) {
        typingInput.value = typed.slice(0, target.length);
        return;
    }

    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === target[i]) correct++;
    }
    const accuracy = Math.round((correct / target.length) * 100);
    typingStats.textContent = `准确率：${accuracy}%`;

    if (typed.length === target.length) {
        typingFinished = true;
        typingInput.disabled = true;

        const elapsedSeconds = (Date.now() - typingStartTime) / 1000;
        const minutes = elapsedSeconds / 60;
        const wpm = Math.round(target.length / minutes);

        typingStatus.textContent = "✅ 完成！";
        typingStats.textContent =
            `📊 用时 ${elapsedSeconds.toFixed(1)} 秒 · ` +
            `速度 ${wpm} 字/分钟 · ` +
            `准确率 ${accuracy}%`;
    }
});

// 功能二十六：随机点餐
document.getElementById("foodBtn").addEventListener("click", function () {
    const 输入 = document.getElementById("foodInput").value;
    const 列表 = 输入.split("\n").map(s => s.trim()).filter(s => s !== "");
    const 结果 = document.getElementById("foodResult");
    if (列表.length === 0) {
        结果.textContent = "⚠️ 请至少输入一个餐厅";
        结果.style.color = "orange";
        return;
    }
    const 随机索引 = Math.floor(Math.random() * 列表.length);
    结果.textContent = "🍜 " + 列表[随机索引];
    结果.style.color = "#2c3e50";
});