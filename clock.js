const Music = new Audio("./カーソル移動4.mp3");
const music2 = new Audio("./owl.mp3");

let hours,CommentHours,minutes,seconds;

let MusicFlag = false;
let CommentFlag = false;

function AlertButton(){
    MusicFlag = !MusicFlag;
}

function Comments(){
    var Element = document.getElementById("comment");
    CommentFlag = !CommentFlag;
    if(CommentFlag){
        if(CommentHours >= 0 && CommentHours <= 5){
            Element.textContent = "深夜ですね"
        }else if(CommentHours >= 6 && CommentHours <= 11){
            Element.textContent = "おはようございます"
        }else if(CommentHours >= 12 && CommentHours <= 17){
            Element.textContent = "こんにちは"
        }else{
            Element.textContent = "こんばんは"
        }
    }else{
        Element.textContent = ""
    }
}

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");   
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const CenterX = canvas.width / 2;
    const CenterY = canvas.height / 2;

    function drawClock() {
        ctx.clearRect(0, 0, 500, 500); 
        ctx.arc(CenterX, CenterY, 145, 0, 2*Math.PI); 
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fill();
        const time = new Date();
        hours = time.getHours() % 12;
        CommentHours = time.getHours();
        minutes = time.getMinutes();
        seconds = time.getSeconds();
        
        AudioPlay();
        drawClockHands(hours / 12 * 360 + minutes / 60 * 30, 60, 8);
        drawClockHands(minutes / 60 * 360, 95, 6);
        drawClockHandsSeconds(seconds / 60 * 360, 120, 2);
        DrawText();
    }

    function DrawText(){
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${hours}:${minutes}:${seconds}`, CenterX, CenterY - 100);
    }

    function drawClockHands(angle, width, height) {
        ctx.save();
        ctx.translate(CenterX, CenterY);
        angle -= 90;
        const radian = angle * Math.PI / 180;
        ctx.rotate(radian);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }

    function drawClockHandsSeconds(angle, width, height) {
        ctx.save();
        ctx.translate(CenterX, CenterY);
        angle -= 90;
        const radian = angle * Math.PI / 180;
        ctx.rotate(radian);
        ctx.fillStyle = GetRandomColor();
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }

    function GetRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function AudioPlay(){
        if(MusicFlag){
            Music.currentTime = 0;
            Music.play();
            if(minutes == 0 && seconds == 0){
                music2.play();
            }
        }
    }

    setInterval(drawClock, 1000);
}