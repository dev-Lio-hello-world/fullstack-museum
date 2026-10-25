    // 判断按下按钮显示还是隐藏
   let 是否显示 = true
   document.getElementById("toggleBtn").onclick = function(){
       const msg = document.getElementById("msg");
       const btn = document.getElementById("toggleBtn");
       if (是否显示) {
           msg.style.display = "none";
           是否显示 = false;
       } else {
           msg.style.display = "block";
           是否显示 = true;
       }
   };

   // 点击接收到按下切换背景颜色
   function changeBackground() {
       const r = Math.floor(Math.random() * 256);
       const g = Math.floor(Math.random() * 256);
       const b = Math.floor(Math.random() * 256);
       document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
   }