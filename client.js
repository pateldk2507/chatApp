const socket = io('http://localhost:8000');
const form =document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('ring.mp3');


const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position=='left'){
        audio.play();
    }


}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";


})


const name = prompt("Enter your name: ");

while (name=="") {
        const name = prompt("You should Enter your name to join : ");
        if(name!="")
        {
            break;
        }
}



    socket.emit('new-user-join',name);




socket.on('user-join',name=>{
    append(`${name} join chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`, 'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`, 'left');
})

