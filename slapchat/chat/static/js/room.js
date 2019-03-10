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
    if(message.trim() !== "") {
        chatSocket.send(JSON.stringify({
            'message': message,
            'robin': robinTalking
        }));
    }

    messageInputDom.value = '';
};

var getImage = function(robinText, batmanText) {
    var request = new XMLHttpRequest();
    request.open('GET', 'chat/get_image?robinText=' + robinText + '&batmanText=' + batmanText, true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = request.responseText;
        setImage(data);
    } else {
        // We reached our target server, but it returned an error
    }
    };

    request.onerror = function() {
    // There was a connection error of some sort
    };

    request.send();
}


//document.querySelector('#username-input').focus();
// document.querySelector('#username-input').onkeyup = function(e) {
//     if (e.keyCode === 13) {  // enter, return
//         document.querySelector('#username-submit').click();
//     }
// };

// document.querySelector('#username-submit').onclick = function(e) {
//     userName = document.querySelector('#username-input').value;
//     document.querySelector('#username-div').setAttribute("style", "display: none");
//     // document.querySelector('#username-display').textContent = "your username is " + userName;
//     chatSocket.send(JSON.stringify({
//         'message': userName + " has joined the room"
//     }));
// };

var setImage = function(data) {
    // check if 1 is populated yet
    var chatLog1 = document.querySelector('#chat-log1');
    var chatLog2 = document.querySelector('#chat-log2');
    var chatLog3 = document.querySelector('#chat-log3');
    var imgHtml = "<div><img src='data:image/gif;base64," + data + "'/></div>"
    // If nothing there yet, fill up first square
    if(chatLog1.innerHTML === "" || (chatLog2.innerHTML === "" && robinTalking)) {
        chatLog1.innerHTML = imgHtml;
    }
    // Otherwise fill up second square
    else if(chatLog2.innerHTML === "" || (chatLog3.innerHTML === "" && robinTalking)) {
        chatLog2.innerHTML = imgHtml;
    }
    // Otherwise fill up third square
    else if(chatLog3.innerHTML === "" || robinTalking) {
        chatLog3.innerHTML = imgHtml;
    }
    // All are full, start replacing with new images and rotating back
    else {
        chatLog1.innerHTML = chatLog2.innerHTML;
        chatLog2.innerHTML = chatLog3.innerHTML;
        chatLog3.innerHTML = imgHtml;
    }    
}