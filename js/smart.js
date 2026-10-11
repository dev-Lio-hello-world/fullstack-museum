// 功能十六：一键复制文本
document.getElementById("copyBtn").addEventListener("click", function () {
    const input = document.getElementById("copyInput");
    const result = document.getElementById("copyResult");
    const text = input.value.trim();
    if (text === "") {
        result.textContent = "⚠️ 请输入要复制的内容";
        result.style.color = "orange";
        return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
            result.textContent = "✅ 已复制到剪贴板";
            result.style.color = "green";
        }).catch(function () {
            fallbackCopy(text, result);
        });
    } else {
        fallbackCopy(text, result);
    }
});

function fallbackCopy(text, resultElement) {
    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        resultElement.textContent = "✅ 已复制到剪贴板（降级模式）";
        resultElement.style.color = "green";
    } catch (e) {
        resultElement.textContent = "❌ 复制失败，请手动选中内容按 Ctrl+C";
        resultElement.style.color = "red";
    }
}

// 功能十七：随机名言生成器
document.getElementById("quoteBtn").addEventListener("click", function () {
    const quotes = [
        "吾日三省吾身。",
        "代码是写给人看的，顺便给机器运行。",
        "后室不是地狱，地狱有出口。",
        "地下城的建设从第一颗土豆开始。",
        "装哥的故事永远写不完。",
        "三思而后行，但不要三思而不行。",
        "没有一个bug是喝一杯胡辣汤解决不了的。"
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteDisplay").textContent = "“" + quotes[randomIndex] + "”";
});

// 功能十八：页面访问计数器
let visitCount = localStorage.getItem("museumVisitCount") || 0;
visitCount = Number(visitCount) + 1;
localStorage.setItem("museumVisitCount", visitCount);
document.getElementById("visitCount").textContent = visitCount;
document.getElementById("resetVisitBtn").addEventListener("click", function () {
    localStorage.setItem("museumVisitCount", "0");
    document.getElementById("visitCount").textContent = "0";
});

// 功能十九：猜数字游戏
let secretNumber = Math.floor(Math.random() * 100) + 1;
let guessAttempts = 0;

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessAttempts = 0;
    document.getElementById("guessResult").textContent = "🔄 新游戏已开始，猜一个 1–100 的数字";
    document.getElementById("guessResult").className = "guess-result initial";
    document.getElementById("guessInput").value = "";
}

document.getElementById("guessBtn").addEventListener("click", function () {
    const input = document.getElementById("guessInput");
    const result = document.getElementById("guessResult");
    const guess = Number(input.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        result.textContent = "⚠️ 请输入 1–100 之间的整数";
        result.style.color = "orange";
        return;
    }
    guessAttempts++;
    if (guess === secretNumber) {
        result.textContent = `🎉 猜对了！数字就是 ${secretNumber}，你用了 ${guessAttempts} 次！`;
	result.className = "guess-result correct";
    } else if (guess < secretNumber) {
        result.textContent = `📈 ${guess} 小了，再大一点（已猜 ${guessAttempts} 次）`;
        result.className = "guess-result low";
    } else {
        result.textContent = `📉 ${guess} 大了，再小一点（已猜 ${guessAttempts} 次）`;
        result.className = "guess-result high";
    }
});

document.getElementById("resetGameBtn").addEventListener("click", resetGame);
resetGame();

// 功能二十：北京实时天气
function queryWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=39.9&longitude=116.4&current_weather=true";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const weather = data.current_weather;
            document.getElementById("weatherResult").textContent =
                `北京当前温度：${weather.temperature}°C，风速：${weather.windspeed} km/h`;
        })
        .catch(err => {
            console.error("天气查询失败：", err);
            document.getElementById("weatherResult").textContent = "天气查询失败，请稍后再试。";
        });
}

// 功能二十一：学生数据展示
function deleteStudent(id) {
    const password = prompt("请输入管理员密码：");
    if (password === null) return;
    if (!confirm("确定删除学号 " + id + " 吗？")) return;
    fetch(`/api/students/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password })
    })
        .then(res => {
            if (res.status === 403) {
                alert("密码错误，你不是管理员。");
                return;
            }
            return res.json();
        })
        .then(data => {
            if (data) document.getElementById("studentsBtn").click();
        });
}

function editStudent(id, oldName, oldScore) {
    const newName = prompt("新名字：", oldName);
    if (newName === null) return;
    const newScore = prompt("新分数：", oldScore);
    if (newScore === null) return;
    fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, score: Number(newScore) })
    })
        .then(res => res.json())
        .then(() => document.getElementById("studentsBtn").click());
}

document.getElementById("studentsBtn").addEventListener("click", function () {
    // noinspection JSUnusedLocalSymbols
    fetch("/api/students")
        .then(response => response.json())
        .then(data => {
            const table = document.createElement("table");
            table.border = "1";
            table.style.borderCollapse = "collapse";

            // 表头
            const header = table.insertRow();
            ["学号", "姓名", "分数", "操作"].forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                header.appendChild(th);
            });

            // 数据行
            data.forEach(student => {
                const row = table.insertRow();
                row.insertCell().textContent = student.id;
                row.insertCell().textContent = student.name;
                row.insertCell().textContent = student.score;

                const opCell = row.insertCell();

                const delBtn = document.createElement("button");
                delBtn.textContent = "删";
                delBtn.className = "表格按钮";
                delBtn.onclick = () => deleteStudent(student.id);
                opCell.appendChild(delBtn);

                const editBtn = document.createElement("button");
                editBtn.textContent = "改";
                editBtn.className = "表格按钮";
                editBtn.onclick = () => editStudent(student.id, student.name, student.score);
                opCell.appendChild(editBtn);
            });

            const container = document.getElementById("studentsResult");
            container.innerHTML = "";
            container.appendChild(table);
        })
        .catch(error => {
            document.getElementById("studentsResult").textContent =
                "获取失败，请确认后端已启动。";
        });
});

document.getElementById("addStudentBtn").addEventListener("click", function () {
    const name = document.getElementById("newName").value.trim();
    const score = document.getElementById("newScore").value.trim();
    if (name === "" || score === "") {
        alert("姓名和分数都要填");
        return;
    }

    fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, score: Number(score) })
    })
        .then(res => res.json())
        .then(() => {
            document.getElementById("newName").value = "";
            document.getElementById("newScore").value = "";
            document.getElementById("studentsBtn").click();
        });
});

// 功能二十二：随机密码生成器
document.getElementById("pwdBtn").addEventListener("click", function () {
    const length = Number(document.getElementById("pwdLength").value);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        password += chars[index];
    }
    document.getElementById("pwdResult").textContent = password;
});