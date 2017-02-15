var server = require('ws').Server;
var ws = new server({port:5053});

ws.on('connection',function(s){
    var cli = ws.clients;
    // 获取信息
    s.on('message',function(message){

        console.log('received:' + message);
        // 解析json数据
        message = JSON.parse(message);
        if(message.type == 'name'){
            s.personName = message.data;
            return;
        }

        ws.clients.forEach(function e(client){

            if(client != s){
                client.send(JSON.stringify({
                    name:s.personName,
                    data:message.data,
                    client:cli
                }));
            }

        });

    });

    // 客户端失去连接
    s.on('close',function () {
        console.log('客户端失去连接...');
    });
    // 新连接的提示
    console.log('有新的客户端连接...');
});