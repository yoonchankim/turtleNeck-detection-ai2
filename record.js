const turtleSpan=document.querySelector("button");
const turtleBar=document.querySelector(".turtleBar");
const turtleBar_today=document.querySelector(".turtleBar_today");
let click=0;
function intit(){
    turtleSpan.addEventListener("click",clickSpan);
}
function clickSpan(){
    click++;
    if(click%2===1){
        turtleBar.style.opacity="1";
    }
    else{
        turtleBar.style.opacity="0";
    }
}
intit();
