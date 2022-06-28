//update this with your js_form selector
var form_id_js = "form-2";

var data_js = {
    "access_token": "2txpdrqy36798dp0p70f9yj2"
};

function js_onSuccess() {
    // remove this to avoid redirect
    var thankYouMessage = document.querySelector(".register_message");
    if (thankYouMessage) {
        thankYouMessage.style.display = "block";
    }
}

function js_onError(error) {
    // remove this to avoid redirect
}

var sendButton = document.getElementById("js-submit");

function js_send() {
    sendButton.value = 'Sending…';
    sendButton.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
            if (request.readyState == 4) {
                js_onError(request.response);
            }
    };

    var name = document.querySelector("#" + form_id_js + " [name='name']").value;
    var email = document.querySelector("#" + form_id_js + " [name='email']").value;
    var phone = document.querySelector("#" + form_id_js + " [name='phone']").value;
    var message = document.querySelector("#" + form_id_js + " [name='message']").value;
    data_js['subject'] = 'New Registration';
    data_js['text'] = 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nMessage: ' + message;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for (var key in data_js) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});