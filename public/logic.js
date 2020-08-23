let name = document.querySelector('#name');
let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let message = document.querySelector('#message');

let nameError = document.querySelector('.nameError');
let emailError = document.querySelector('.emailError');
let phoneError = document.querySelector('.phoneError');
let messageError = document.querySelector('.messageError');

let messageSentMessage = document.querySelector('.messageSent');

let formSubmitBtn = document.querySelector('.submitBtn');

formSubmitBtn.addEventListener('click', function(){
    let sendEmail = true;
    if (name.value === ''){
        nameError.style.visibility = 'visible';
        sendEmail = false;
    }
    else{
        nameError.style.visibility = 'hidden';
    }
    if (email.value === ''){
        emailError.style.visibility = 'visible';
        sendEmail = false;
    }
    else{
        emailError.style.visibility = 'hidden';
    }
    if (phone.value === ''){
        phoneError.style.visibility = 'visible';
        sendEmail = false;
    }
    else{
        phoneError.style.visibility = 'hidden';
    }
    if (message.value === ''){
        messageError.style.visibility = 'visible';
        sendEmail = false;
    }
    else{
        messageError.style.visibility = 'hidden';
    }
  
    if (sendEmail){
        let data = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            message: message.value
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/sendEmail', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(JSON.stringify(data));
    
        name.value = ""
        email.value = ""
        phone.value = ""
        message.value = ""

        messageSentMessage.style.visibility = 'visible';
    }
    else{
        messageSentMessage.style.visibility = 'hidden';
    }
})
