var userName;
var robinTalking = true;
var robinText = "";

var chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/chat/');

chatSocket.onopen = function(e) {
    console.log("connected");
}

chatSocket.onmessage = function(e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var itWasRobin = data['robin'];
    if(itWasRobin) {
        robinText = data["message"]
        getImage(message, "")
    }
    else {
        getImage(robinText, message)
    }
    robinTalking = !itWasRobin;
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
    chatSocket.send(JSON.stringify({
        'message': userName + " has left the room"
    }));
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function(e) {
    var messageInputDom = document.querySelector('#chat-message-input');
    var message = messageInputDom.value;

    chatSocket.send(JSON.stringify({
        'message': message,
        'robin': robinTalking
    }));

    messageInputDom.value = '';
};

var getImage = function(robinText, batmanText) {
    var request = new XMLHttpRequest();
    request.open('GET', 'chat/get_image?robinText=' + robinText + '&batmanText=' + batmanText, true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        //var data = JSON.parse(request.responseText);
        var data = request.responseText;
        document.querySelector('#chat-log').innerHTML = ("<div><img src='data:image/gif;base64," + data + "'/></div>");
    } else {
        // We reached our target server, but it returned an error

    }
    };

    request.onerror = function() {
    // There was a connection error of some sort
    };

    request.send();
}


document.querySelector('#username-input').focus();
document.querySelector('#username-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#username-submit').click();
    }
};

document.querySelector('#username-submit').onclick = function(e) {
    userName = document.querySelector('#username-input').value;
    document.querySelector('#username-div').setAttribute("style", "display: none");
    document.querySelector('#username-display').textContent = "your username is " + userName;
    chatSocket.send(JSON.stringify({
        'message': userName + " has joined the room"
    }));
};

// when chat is image
// go to websocket, and send back django endpoint
// call ajax to get image from django endpoint
// first build endpoint