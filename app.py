import sqlite3
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "SQL", "text.db")

# ========== Agnes AI 配置 ==========
AGNES_API_KEY = os.environ.get("AGNES_API_KEY")

AGNES_URL = "https://apihub.agnes-ai.com/v1/chat/completions"

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")

# ========== 讲解员接口 ==========
@app.route("/api/guide", methods=["POST"])
def guide():
    data = request.get_json()
    question = data.get("question", "").strip()

    if not question:
        return jsonify({"answer": "你还没问问题呢。"})

    system_prompt = """你是这个虚拟博物馆的讲解员，名字叫「小导」。

这个博物馆是用代码做的，不是实体博物馆。它由一位独立开发者开发，前端用 HTML / CSS / JavaScript，后端用 Flask + SQLite，还接入了 AI 接口。

博物馆包含以下展厅和展品：

1. 基础语法展厅：
   - 功能一：文字显示和隐藏（点击按钮，切换一段文字的显示 / 隐藏）
   - 功能二：切换背景颜色（点击按钮，页面背景随机变色）
   - 功能三：超链接（点击链接，打开 B 站主页）

2. 样式特效展厅：
   - 功能四：输入和显示（在输入框输入内容，点击按钮，文字显示在下方）
   - 功能五：图片（展示一张二进制矩阵图片）
   - 功能六：增大字体（点击按钮，全局字体变大）
   - 功能七：减小字体（点击按钮，全局字体变小）
   - 功能八：切换深色模式（本馆特色功能，点击按钮，界面在浅色 / 深色之间翻转）

3. 实用工具展厅：
   - 功能九：待办列表（输入待办事项，点击添加，点击事项即可删除）
   - 功能十：播放音频（点击按钮，播放一段音频）
   - 功能十一：回到顶部（点击按钮，页面平滑滚动到最上方）
   - 功能十二：账密登录（账号 python，密码 print，输入正确即可登录）
   - 功能二十三：密码强度检测（输入密码，实时检测强度，分 5 项打分）
   - 功能二十五：倒计时器（设置分钟数，点击开始倒计时，可暂停、重置）

4. 趣味互动展厅：
   - 功能十三：计时器（开始、暂停、重置计时）
   - 功能十四：随机选择器（输入选项，每行一个，随机抽取一个）
   - 功能十五：实时字符计数器（输入文字，实时统计字符数）
   - 功能二十四：打字速度测试（照着目标文字打字，测试 WPM 和准确率）
   - 功能二十六：随机点餐（输入候选餐厅，每行一个，随机选一个）

5. 智能应用展厅：
   - 功能十六：一键复制文本（输入内容，点击复制到剪贴板）
   - 功能十七：随机名言生成器（点击按钮，随机显示一条名言）
   - 功能十八：页面访问计数器（记录你访问这个页面的次数，存在浏览器里）
   - 功能十九：猜数字游戏（猜一个 1~100 的数字，系统提示「大了」或「小了」）
   - 功能二十：北京实时天气（点击按钮，查询北京当前天气）
   - 功能二十一：学生数据展示（从后端 API 获取学生数据，可增删改）
   - 功能二十二：随机密码生成器（选择长度，生成随机密码）

除了展厅，博物馆还有这些部分：
   - 博物馆讲解员（就是我，可以回答关于展品的问题）
   - 镇店之宝：橡皮鸭（把困难说给它听，它会随机回复一句鼓励的话）
   - 悬浮灯（右侧的圆形开关，点击可切换深色 / 浅色模式）
   - 出口区（走到最后，可以点「再见」或「回到入口」）

请用纯文本回答，不要使用 Markdown 格式（不要用 **、##、- 等符号）。
请根据以上信息回答用户的问题。如果用户问的内容不在这个范围内，就告诉用户「这个博物馆里没有这个展品」。"""

    headers = {
        "Authorization": f"Bearer {AGNES_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "agnes-2.0-flash",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    }

    try:
        res = requests.post(AGNES_URL, headers=headers, json=payload, timeout=60)

        if res.status_code == 200:
            result = res.json()
            answer = result["choices"][0]["message"]["content"]
            return jsonify({"answer": answer})
        elif res.status_code == 429:
            return jsonify({"answer": "问得太快了，稍等一下再问吧。"})
        else:
            return jsonify({"answer": f"接口出错了，状态码：{res.status_code}"})

    except Exception as e:
        return jsonify({"answer": f"请求失败：{type(e).__name__} - {str(e)}"})


# ========== 原有的学生数据接口（保持不变）==========
@app.route("/")
def index():
    html_dir = BASE_DIR
    return send_from_directory(html_dir, "index.html")

@app.route("/api/students")
def api_students():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students")
    rows = cursor.fetchall()
    conn.close()

    students = []
    for row in rows:
        students.append({"id": row[0], "name": row[1], "score": row[2]})
    return jsonify(students)


@app.route("/api/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    data = request.get_json()
    password = data.get("password")
    if password != ADMIN_PASSWORD:
        return jsonify({"message": "密码错误"}), 403

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM students WHERE id = ?", (student_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "删除成功"})


@app.route("/api/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):
    data = request.get_json()
    name = data.get("name")
    score = data.get("score")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE students SET name = ?, score = ? WHERE id = ?",
        (name, score, student_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "修改成功"})


@app.route("/api/students", methods=["POST"])
def add_student():
    data = request.get_json()
    name = data.get("name")
    score = data.get("score")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO students (name, score) VALUES (?, ?)", (name, score))
    conn.commit()
    conn.close()
    return jsonify({"message": "新增成功"})

@app.route("/xm4205.mp3")
def audio():
    html_dir = os.path.join(BASE_DIR, "..", "博物馆")
    return send_from_directory(html_dir, "xm4205.mp3")

from flask import send_from_directory

@app.route("/js/<path:filename>")
def js_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, "..", "博物馆", "js"), filename)

@app.route("/css/<path:filename>")
def css_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, "..", "博物馆", "css"), filename)

@app.route("/api/likes", methods=["GET"])
def get_likes():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT feature, count FROM likes")
    rows = cursor.fetchall()
    conn.close()
    return jsonify({row[0]: row[1] for row in rows})


@app.route("/api/likes/<feature>", methods=["POST"])
def add_like(feature):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("UPDATE likes SET count = count + 1 WHERE feature = ?", (feature,))
    conn.commit()
    conn.close()
    return jsonify({"message": "点赞成功"})

if __name__ == "__main__":
    app.run(debug=False)