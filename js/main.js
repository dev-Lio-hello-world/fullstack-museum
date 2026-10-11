    const guideStyles = {
    light: {
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        borderColor: "#0f3460",
        color: "#e0e0e0",
        titleColor: "#e94560",
        descColor: "#a0a0b0",
        inputBg: "#0a0a1a",
        inputColor: "#e0e0e0",
        inputBorder: "#0f3460",
        answerBg: "#0a0a1a",
        answerColor: "#c0c0d0"
    },
    dark: {
        background: "linear-gradient(135deg, #f0f4ff, #e0e8ff)",
        borderColor: "#4a6fa5",
        color: "#1a1a2e",
        titleColor: "#c0392b",
        descColor: "#555",
        inputBg: "#ffffff",
        inputColor: "#1a1a2e",
        inputBorder: "#4a6fa5",
        answerBg: "#ffffff",
        answerColor: "#333"
    }
};
    //fetch("http://127.0.0.1:5000/api/students")
    // fetch("http://127.0.0.1:5000/api/guide")
function applyGuideStyle(mode) {
    const s = guideStyles[mode];
    const block = document.getElementById("guideBlock");

    block.style.background = s.background;
    block.style.borderColor = s.borderColor;
    block.style.color = s.color;
    block.querySelector("h3").style.color = s.titleColor;
    block.querySelector("p").style.color = s.descColor;

    const input = block.querySelector("#guideInput");
    input.style.background = s.inputBg;
    input.style.color = s.inputColor;
    input.style.borderColor = s.inputBorder;

    const answer = block.querySelector("#guideAnswer");
    answer.style.background = s.answerBg;
    answer.style.color = s.answerColor;
}

   let isDark = false;
   document.getElementById("darkBtn").onclick = function () {
       const blocks = document.querySelectorAll(".功能块");
       const links = document.querySelectorAll("a");
       const buttons = document.querySelectorAll("button");
       const duckBlock = document.getElementById("duckBlock");
       const exitBlock = document.getElementById("exitBlock");
       const navButtons = document.querySelectorAll(".导航按钮");

       if (isDark) {
           // 切回浅色
           applyGuideStyle("light");
           document.body.style.backgroundColor = "white";
           document.body.style.color = "black";
           blocks.forEach(block => {
               block.style.backgroundColor = "#f9f9f9";
           });
           links.forEach(link => {
               link.style.color = "#00A1D6";
           });
           buttons.forEach(btn => {
               btn.style.backgroundColor = "#e0e0e0";
               btn.style.color = "black";
               btn.style.border = "1px solid #ccc";
           });
           // 鸭子块恢复亮黄
           duckBlock.style.backgroundColor = "#fff8cc";
           duckBlock.style.borderColor = "#f0c000";
           //出口区变暗
           exitBlock.style.backgroundColor = "#333";
           exitBlock.style.color = "white";

           this.textContent = "切换深色模式";
           isDark = false;

           // 切回浅色时，导航按钮恢复深色
           navButtons.forEach(btn => {
               btn.style.backgroundColor = "#333";
               btn.style.color = "white";
               btn.style.border = "none";
           });

       } else {
           // 切到深色
           applyGuideStyle("dark");
           document.body.style.backgroundColor = "#1e1e1e";
           document.body.style.color = "#e0e0e0";
           blocks.forEach(block => {
               block.style.backgroundColor = "#2a2a2a";
           });
           links.forEach(link => {
               link.style.color = "#88D4FF";
           });
           buttons.forEach(btn => {
               btn.style.backgroundColor = "#7a7a7a";
               btn.style.color = "#e0e0e0";
               btn.style.border = "1px solid #666";
           });
           // 鸭子块调暗
           duckBlock.style.backgroundColor = "#4a3f1a";
           duckBlock.style.borderColor = "#8a6d00";
           //出口区变暗
           exitBlock.style.backgroundColor = "#1a1a1a";
           exitBlock.style.color = "#ccc";

           this.textContent = "切换浅色模式";
           isDark = true;

           // 切到深色时，导航按钮保持深色
                navButtons.forEach(btn => {
                     btn.style.backgroundColor = "#333";
                     btn.style.color = "white";
                     btn.style.border = "none";
                });
           }
       };

   document.getElementById("duckBtn").addEventListener("click", function() {
       const input = document.getElementById("duckInput").value.trim();
       const result = document.getElementById("duckResult");

       if (input === "") {
           result.textContent = "🦆 你还没说呢，我听着。";
           result.style.color = "orange";
           return;
       }

       const replies = [
           "你向我问出这个问题，说明你马上就要找出答案了。",
            "再仔细分析分析。",
            "我找到错误了！",
            "别急，先把问题说清楚。",
            "你已经比刚才更接近答案了。",
            "这个问题的关键，往往在你想不到的地方。",
            "要不，先喝口水？",
            "说出来，就已经解决一半了。",
            "再读一遍你自己的问题。",
            "你觉得，最可能出错的是哪一步？",
            "有时候，答案就在你刚才说过的话里。",
            "别怕试错，错了才知道哪不对。",
            "如果卡住了，就从最简单的情况开始想。",
            "你确定，你问的是真正的问题吗？",
            "换个角度，重新看一遍。",
            "这个问题，值得你多想一分钟。",
            "你已经在路上了。",
            "先别写代码，用中文把逻辑说一遍。",
            "要相信自己，你之前都解决过。",
            "继续，我听着呢。"
       ];
       const randomIndex = Math.floor(Math.random() * replies.length);
       result.textContent = "🦆 " + replies[randomIndex];
       result.style.color = "#8a6d00";
   });

    document.getElementById("guideBtn").addEventListener("click", function() {
    const question = document.getElementById("guideInput").value.trim();
    const answerBox = document.getElementById("guideAnswer");

    if (question === "") {
        answerBox.textContent = "你还没问问题呢。";
        return;
    }

    answerBox.textContent = "思考中...";

    fetch("/api/guide", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({question: question})
    })
    .then(res => res.json())
    .then(data => {
        let text = data.answer;
        text = text.trim();
        text = text.replace(/\n{2,}/g, "\n");
        text = text.replace(/^\n+/, "");
        answerBox.textContent = text;
    })
        
    .catch(err => {
        answerBox.textContent = "请求失败：" + err.message;
    });
});

// 当前展厅高亮
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.展厅');
    let current = '入口';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.id;
        }
    });
    document.getElementById('currentSection').textContent = `🏛️ 当前展厅：${current}`;
});

// 导航跳转
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function tryClose() {
    window.close();
    setTimeout(() => {
        alert("浏览器不允许脚本关闭手动打开的页面，请手动关闭标签页。");
    }, 100);
}

function toggleTheme() {
    const blocks = document.querySelectorAll(".功能块");
    const links = document.querySelectorAll("a");
    const buttons = document.querySelectorAll("button");
    const duckBlock = document.getElementById("duckBlock");
    const exitBlock = document.getElementById("exitBlock");
    const navButtons = document.querySelectorAll(".导航按钮");
    const typingTarget = document.getElementById("typingTarget");
    const themeIcon = document.getElementById("themeIcon");
    const themeToggle = document.getElementById("themeToggle");
    const darkBtn = document.getElementById("darkBtn");

    if (isDark) {
        // 切回浅色
        isDark = false;
        document.body.classList.remove("dark");

        applyGuideStyle("light");
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";

        typingTarget.style.background = "#f0f0f0";
        typingTarget.style.color = "#333";

        blocks.forEach(block => {
            if (block.classList.contains("特色块")) return;
            block.style.backgroundColor = "#f9f9f9";
        });
        links.forEach(link => {
            link.style.color = "#00A1D6";
        });
        buttons.forEach(btn => {
            if (btn.id === "duckBtn") return;
            if (btn.id === "guideBtn") return;
            btn.style.backgroundColor = "#e0e0e0";
            btn.style.color = "black";
            btn.style.border = "1px solid #ccc";
        });
        duckBlock.style.backgroundColor = "#fff8cc";
        duckBlock.style.borderColor = "#f0c000";
        exitBlock.style.backgroundColor = "#333";
        exitBlock.style.color = "white";

        navButtons.forEach(btn => {
            btn.style.backgroundColor = "#333";
            btn.style.color = "white";
            btn.style.border = "none";
        });

        if (themeIcon) themeIcon.textContent = "🌞";
        if (themeToggle) themeToggle.style.background = "#f0c000";

    } else {
        // 切到深色
        isDark = true;
        document.body.classList.add("dark");

        applyGuideStyle("dark");
        document.body.style.backgroundColor = "#1e1e1e";
        document.body.style.color = "#e0e0e0";

        typingTarget.style.background = "#2a2a2a";
        typingTarget.style.color = "#e0e0e0";

        blocks.forEach(block => {
            if (block.classList.contains("特色块")) return;
            block.style.backgroundColor = "#2a2a2a";
        });
        links.forEach(link => {
            link.style.color = "#88D4FF";
        });
        buttons.forEach(btn => {
            if (btn.id === "duckBtn") return;
            if (btn.id === "guideBtn") return;
            btn.style.backgroundColor = "#7a7a7a";
            btn.style.color = "#e0e0e0";
            btn.style.border = "1px solid #666";
        });
        duckBlock.style.backgroundColor = "#4a3f1a";
        duckBlock.style.borderColor = "#8a6d00";
        exitBlock.style.backgroundColor = "#1a1a1a";
        exitBlock.style.color = "#ccc";

        navButtons.forEach(btn => {
            btn.style.backgroundColor = "#333";
            btn.style.color = "white";
            btn.style.border = "none";
        });

        if (themeIcon) themeIcon.textContent = "🌙";
        if (themeToggle) themeToggle.style.background = "#4a3f1a";
    }

    // 更新 darkBtn 的文字
    if (darkBtn) {
        darkBtn.textContent = isDark ? "切换浅色模式" : "切换深色模式";
    }
    // 记住主题
    localStorage.setItem("museumTheme", isDark ? "dark" : "light");
}

document.getElementById("darkBtn").onclick = toggleTheme;
document.getElementById("themeToggle").onclick = toggleTheme;
applyGuideStyle("light");
document.getElementById("duckBlock").style.backgroundColor = "#fff8cc";
document.getElementById("duckBlock").style.borderColor = "#f0c000";
document.getElementById("guideBtn").style.backgroundColor = "#e94560";
document.getElementById("guideBtn").style.color = "white";
document.getElementById("duckBtn").style.backgroundColor = "#f0c000";
document.getElementById("duckBtn").style.color = "#5a4500";

// ========== 点赞功能 ==========

// 26 个功能的名字
const featureNames = [
    "功能一：文字显示和隐藏",
    "功能二：切换背景颜色",
    "功能三：超链接",
    "功能四：输入和显示",
    "功能五：图片",
    "功能六：增大字体",
    "功能七：减小字体",
    "功能八：切换深色模式",
    "功能九：待办列表",
    "功能十：播放音频",
    "功能十一：回到顶部",
    "功能十二：账密登录",
    "功能十三：计时器",
    "功能十四：随机选择器",
    "功能十五：实时字符计数器",
    "功能十六：一键复制文本",
    "功能十七：随机名言生成器",
    "功能十八：页面访问计数器",
    "功能十九：猜数字游戏",
    "功能二十：北京实时天气",
    "功能二十一：学生数据展示",
    "功能二十二：随机密码生成器",
    "功能二十三：密码强度检测",
    "功能二十四：打字速度测试",
    "功能二十五：倒计时器",
    "功能二十六：随机点餐",
];

// 点悬浮按钮，开 / 关面板
document.getElementById("likeToggle").onclick = function () {
    document.getElementById("likePanel").classList.toggle("open");
};



// 生成「点赞列表」
function buildLikeList() {
    const list = document.getElementById("likeList");
    list.innerHTML = "";

    featureNames.forEach((name, index) => {
        const featureId = "function_" + (index + 1);

        const item = document.createElement("div");
        item.className = "like-item";

        const label = document.createElement("span");
        label.textContent = name;

        const btn = document.createElement("button");
        btn.textContent = "👍 0";
        btn.dataset.feature = featureId;

        btn.onclick = function () {
            fetch(`/api/likes/${featureId}`, { method: "POST" })
                .then(res => res.json())
                .then(() => {
                    const num = Number(btn.textContent.replace("👍 ", "")) + 1;
                    btn.textContent = "👍 " + num;
                });
        };

        item.appendChild(label);
        item.appendChild(btn);
        list.appendChild(item);
    });
}

// 加载「赞数」
function loadLikes() {
    fetch("/api/likes")
        .then(res => res.json())
        .then(data => {
            document.querySelectorAll(".like-item button").forEach(btn => {
                const feature = btn.dataset.feature;
                btn.textContent = "👍 " + (data[feature] || 0);
            });
        });
}


buildLikeList();
loadLikes();

// ========== 回车提交 ==========
const enterMap = {
    // 输入框 id      : 按钮 id
    "userInput":        "showBtn",
    "copyInput":        "copyBtn",
    "loginUser":        "loginBtn",
    "loginPass":        "loginBtn",
    "todoInput":        "addTodoBtn",
    "guessInput":       "guessBtn",
    "newName":          "addStudentBtn",
    "newScore":         "addStudentBtn",
    "pwdLength":        "pwdBtn",
    "countdownInput":   "countdownStartBtn",
    "guideInput":       "guideBtn",
    "duckInput":        "duckBtn",
};

Object.keys(enterMap).forEach(inputId => {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const btn = document.getElementById(enterMap[inputId]);
            if (btn && !btn.disabled) btn.click();
        }
    });
});

(function restoreTheme() {
    const saved = localStorage.getItem("museumTheme");
    if (saved === "dark" && !isDark) {
        toggleTheme();  // 切到深色
    }
})();