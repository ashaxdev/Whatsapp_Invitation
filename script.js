const messages = [

{type:"boy",text:"Hi ❤️ remember how we met?"},
{type:"girl",text:"Of course… that coffee shop ☕"},
{type:"boy",text:"That moment changed everything"},
{type:"photo",src:"3.jpeg"},
{type:"girl",text:"Now we have big news"},
{type:"video",src:"video.mp4"},
{type:"boy",text:"After all these years..."},
{type:"girl",text:"Our biggest day is coming ❤️"},
{type:"boy",text:"Save the date"},
{type:"girl",text:"We are getting married 💍"}

]

let index = 0

function showMessage(){

if(index >= messages.length){
setTimeout(showInvite,2000)
return
}

document.getElementById("typing").classList.remove("hidden")

setTimeout(()=>{

document.getElementById("typing").classList.add("hidden")

const chat = document.getElementById("chat")
const data = messages[index]

let msg = document.createElement("div")
msg.classList.add("message")

let isVideo = false

/* TEXT MESSAGE */

if(data.type === "boy" || data.type === "girl"){

msg.classList.add(data.type)
msg.innerHTML = data.text + "<span class='tick'>✔✔</span>"

}

/* PHOTO */

else if(data.type === "photo"){

let img = document.createElement("img")
img.src = data.src
img.classList.add("photo")

msg.appendChild(img)

}

/* VIDEO MESSAGE */

else if(data.type === "video"){

isVideo = true

let btn = document.createElement("button")
btn.innerText = "▶ Play Video"
btn.classList.add("video-btn")

msg.appendChild(btn)

btn.onclick = () => {

openVideo(data.src)

}

}

chat.appendChild(msg)
chat.scrollTop = chat.scrollHeight

let sound = document.getElementById("msgSound")

if(sound){
sound.play().catch(()=>{})
}

let tick = msg.querySelector(".tick")

if(tick){
setTimeout(()=>{
tick.classList.add("seen")
},1000)
}

index++

if(!isVideo){
setTimeout(showMessage,2000)
}

},1200)

}


/* VIDEO FULLSCREEN */

function openVideo(src){

const popup = document.getElementById("videoPopup")
const video = document.getElementById("popupVideo")
const audio = document.getElementById("msgSound")

/* STOP CHAT AUDIO */
audio.pause()

popup.style.display = "flex"
video.src = src
video.play()

/* WHEN VIDEO ENDS */

video.onended = () => {

closeVideo()

}

}


/* CLOSE VIDEO */

function closeVideo(){

const popup = document.getElementById("videoPopup")
const video = document.getElementById("popupVideo")
const audio = document.getElementById("msgSound")

video.pause()
popup.style.display = "none"

/* RESUME CHAT AUDIO */
audio.currentTime = 0
audio.play().catch(()=>{})

setTimeout(showMessage,1000)

}


/* INVITATION POPUP */

function showInvite(){

const popup = document.getElementById("invitePopup")

popup.style.display = "flex"

confetti({
particleCount:250,
spread:150,
origin:{y:0.6}
})

}


/* START CHAT */

showMessage()