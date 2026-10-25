// 功能九：待办列表
document.getElementById("addTodoBtn").onclick = function () {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (text === "") return;
    const li = document.createElement("li");
    li.textContent = text;
    li.style.padding = "4px 0";
    li.style.cursor = "pointer";
    li.onclick = function () {
        this.remove();
    };
    document.getElementById("todoList").appendChild(li);
    input.value = "";
};

// 功能十：播放音频
function playAudio() {
    const audio = document.getElementById('myAudio');
    audio.play();
}

// 功能十一：回到顶部
document.getElementById("goTopBtn").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 功能十二：账密登录
document.getElementById("loginBtn").addEventListener("click", function () {
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();
    const result = document.getElementById("loginResult");
    if (user === "python" && pass === "print") {
        result.textContent = "✅ 成功登录！欢迎回来，程序员。";
        result.style.color = "green";
    } else {
        result.textContent = "❌ 账号或密码错误";
        result.style.color = "red";
    }
});

// 功能二十三：密码强度检测
const pwdStrengthInput = document.getElementById("pwdStrengthInput");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const strengthAdvice = document.getElementById("strengthAdvice");
const checkLength = document.getElementById("checkLength");
const checkUpper = document.getElementById("checkUpper");
const checkLower = document.getElementById("checkLower");
const checkDigit = document.getElementById("checkDigit");
const checkSymbol = document.getElementById("checkSymbol");

document.getElementById("togglePwdBtn").addEventListener("click", function () {
    if (pwdStrengthInput.type === "password") {
        pwdStrengthInput.type = "text";
        this.textContent = "🙈 隐藏";
    } else {
        pwdStrengthInput.type = "password";
        this.textContent = "👁 显示";
    }
});

pwdStrengthInput.addEventListener("input", function () {
    const pwd = this.value;
    const hasLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);

    checkLength.textContent = (hasLength ? "✅" : "❌") + " 长度 ≥ 8";
    checkUpper.textContent = (hasUpper ? "✅" : "❌") + " 包含大写字母";
    checkLower.textContent = (hasLower ? "✅" : "❌") + " 包含小写字母";
    checkDigit.textContent = (hasDigit ? "✅" : "❌") + " 包含数字";
    checkSymbol.textContent = (hasSymbol ? "✅" : "❌") + " 包含符号";

    let score = 0;
    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasDigit) score++;
    if (hasSymbol) score++;

    if (pwd.length === 0) {
        strengthBar.style.width = "0%";
        strengthBar.style.background = "#ccc";
        strengthText.textContent = "强度：—";
        strengthText.style.color = "#666";
        strengthAdvice.textContent = "";
        return;
    }

    let level, color, advice;
    if (score <= 1) {
        level = "弱"; color = "#e74c3c";
        advice = "建议：增加长度，混合大小写、数字和符号。";
    } else if (score === 2) {
        level = "较弱"; color = "#e67e22";
        advice = "建议：再增加一些字符类型。";
    } else if (score === 3) {
        level = "中等"; color = "#f1c40f";
        advice = "建议：加符号或加长度。";
    } else if (score === 4) {
        level = "强"; color = "#2ecc71";
        advice = "不错，再加一个符号就满了。";
    } else {
        level = "极强"; color = "#27ae60";
        advice = "很好，这个密码很强。";
    }

    strengthBar.style.width = (score / 5 * 100) + "%";
    strengthBar.style.background = color;
    strengthText.textContent = "强度：" + level;
    strengthText.style.color = color;
    strengthAdvice.textContent = advice;
});

// 功能二十五：倒计时器
let countdownSeconds = 5 * 60;
let countdownInterval = null;
let countdownRunning = false;

const countdownDisplay = document.getElementById("countdownDisplay");
const countdownInput = document.getElementById("countdownInput");

function updateCountdownDisplay() {
    const m = String(Math.floor(countdownSeconds / 60)).padStart(2, '0');
    const s = String(countdownSeconds % 60).padStart(2, '0');
    countdownDisplay.textContent = m + ':' + s;
}

document.getElementById("countdownStartBtn").addEventListener("click", function () {
    if (countdownRunning) return;
    if (countdownInterval) return;
    if (countdownSeconds <= 0 || countdownDisplay.textContent === "00:00") {
        countdownSeconds = Number(countdownInput.value) * 60;
        updateCountdownDisplay();
    }
    countdownRunning = true;
    countdownInterval = setInterval(function () {
        if (countdownSeconds <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            countdownRunning = false;
            countdownDisplay.textContent = "⏰ 时间到！";
            return;
        }
        countdownSeconds--;
        updateCountdownDisplay();
    }, 1000);
});

document.getElementById("countdownPauseBtn").addEventListener("click", function () {
    clearInterval(countdownInterval);
    countdownInterval = null;
    countdownRunning = false;
});

document.getElementById("countdownResetBtn").addEventListener("click", function () {
    clearInterval(countdownInterval);
    countdownInterval = null;
    countdownRunning = false;
    countdownSeconds = Number(countdownInput.value) * 60;
    updateCountdownDisplay();
});

countdownInput.addEventListener("input", function () {
    if (!countdownRunning && !countdownInterval) {
        countdownSeconds = Number(countdownInput.value) * 60;
        updateCountdownDisplay();
    }
});

updateCountdownDisplay();

// 功能二十七：键盘按键监听器
let isMonitoring = false;
let keyHistoryList = [];
const keyDisplay = document.getElementById("keyDisplay");
const keyHistory = document.getElementById("keyHistory");
const keyToggleBtn = document.getElementById("keyToggleBtn");

keyToggleBtn.addEventListener("click", function () {
    isMonitoring = !isMonitoring;
    if (isMonitoring) {
        this.textContent = "⏹ 停止监听";
        keyDisplay.textContent = "监听中...";
    } else {
        this.textContent = "▶ 启动监听";
        keyDisplay.textContent = "已停止";
    }
});

document.addEventListener("keydown", function (e) {
    if (!isMonitoring) return;
    // 防止在输入框打字触发
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    // 显示按键
    keyDisplay.textContent = e.key === " " ? "Space" : e.key;

    // 记录历史
    keyHistoryList.push(e.key === " " ? "Space" : e.key);
    if (keyHistoryList.length > 10) {
        keyHistoryList.shift();
    }

    keyHistory.textContent = "历史按键：" + keyHistoryList.join(" → ");
});