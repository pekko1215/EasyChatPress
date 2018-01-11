var socket = null;
window.addEventListener('load', () => {
    const $username = document.getElementById('username');
    const $chattext = document.getElementById('chattext');
    const $send = document.getElementById('send');
    const $chatarea = document.getElementById('chatarea');
    const $connectbutton = document.getElementById('connectbutton')
    $connectbutton.addEventListener('click', () => {
        if (socket == null) { //接続されていない場合
            if ($username.value == "") {
                alert('ユーザ名を入力して下さい');
                return;
            }
            socket = io();
            socket.emit('username', $username.value);
            $username.disabled = 1;
            $chattext.disabled = 0;
            $send.disabled = 0;
            $connectbutton.innerText = "切断"
            socket.on('message', data => {
                var { user } = data;
                var { text } = data;
                var $chat = document.createElement('div');
                $chat.classList.add('chat')
                $chat.innerText = `${user}：${text}`;
                $chatarea.appendChild($chat);
            })
            socket.on('username', username => {
                var $chat = document.createElement('div');
                $chat.classList.add('joinroom')
                $chat.innerText = `${username}が参加しました。`;
                $chatarea.appendChild($chat);
            })
            socket.on('userdisconnet', username => {
                var $chat = document.createElement('div');
                $chat.classList.add('disconnect')
                $chat.innerText = `${username}が切断しました。`;
                $chatarea.appendChild($chat);
            })
        } else { //接続されている場合
            socket.emit('userdisconnet', $username.value);
            socket.disconnect();
            socket = null;
            $username.disabled = 0;
            $chattext.disabled = 1;
            $send.disabled = 1;
            $connectbutton.innerText = "接続"
        }
    })
    $send.addEventListener('click', () => {
        var text = $chattext.value;
        if (text != "") {
            socket.emit('message', { text: text, user: $username.value });
            $chattext.value = "";
        }
    })
})