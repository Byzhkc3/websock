window.onload = function(){

    // 获取遮罩层
    var wrap = document.querySelector(".nameWrap");
    var userBtn = document.querySelector("#userBtn");

    userBtn.onclick = function (){
        var name = document.querySelector("#userName").value;

        if(name == '' || name === null){
            alert("请输入名字");
            return false;
        }
        document.querySelector("#userText").innerText = name;
        wrap.style.display = 'none';
        // 启用服务
        websock();
    }

   function websock(){
       // 连接sock
       var sock = new WebSocket("ws://www.turing.vip:5053");
       sock.onopen = function (event) {
           console.log('服务器连接成功！');
           var userName = document.querySelector("#userText").innerText;
           sock.send(JSON.stringify({
               type:'name',
               data:userName
           }));
       };

       // 捕获标签
       var log = document.querySelector('#log');
       sock.onmessage = function (event) {
           // 获取信息
           var json = JSON.parse(event.data);
           log.innerHTML += json.name + ":"+json.data + "<br/>";
       }

       // 发送信息
       var btn = document.querySelector('#btn');
       var message;

       btn.onclick = function () {
           message = document.querySelector("#message").value;
           message = message.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g,'');

           if(message == '' || message == null){
               alert('请输入文字...');
               return false;
           }

           sock.send(JSON.stringify({
               type:'message',
               data:message
           }));

           log.innerHTML += "<p class='me'>" + message + "</p>";
           document.querySelector("#message").value = '';

           log.scrollTop=log.scrollHeight;
       }
   }

}