    // 显示输入框的内容
   document.getElementById("showBtn").onclick = function(){
       const text = document.getElementById("userInput").value;
       document.getElementById("output").textContent = text;
   };

   let fontSize = 16;
   // 增加字体大小
   document.getElementById("fontUpBtn").onclick = function(){
       fontSize += 2;
       document.body.style.fontSize = fontSize + "px";
   };

   // 减小字体大小
   document.getElementById("fontDownBtn").onclick = function () {
       fontSize -= 2;
       document.body.style.fontSize = fontSize + "px";
   };