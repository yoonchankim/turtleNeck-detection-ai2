        // More API functions here:
        // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
    
        // the link to your model provided by Teachable Machine export panel
        const URL = "./my_model/";
        const good_audio=document.querySelector(".good_audio");
        const turtle_audio=document.querySelector(".turtle_audio");
        const turtle=document.getElementById("turtle");
        const start=document.getElementsByClassName("start");
        const form=document.querySelector("form");
        const numInput=form.querySelector(".num");
        const select=document.querySelector("select");
        const turtleBar_all=document.querySelector(".turtleBar_all");



        const big_all_bad=document.querySelector(".big_all_bad");
        const big_all_good=document.querySelector(".big_all_good");
        const result=document.querySelector("#result");



        let number=1;
        let all=0;
        let turtlePoze=0;
        let model, webcam, labelContainer, maxPredictions;
        // Load the image model and setup the webcam
        async function init() {
            const All=localStorage.getItem("all");
            const Turtle=localStorage.getItem("turtle");
            turtleBar_all.innerHTML=`전체 접속의 거북목 자세 비율:${Math.floor((parseInt(Turtle))/(parseInt(All))*100)}%`;
            big_all_bad.style.width=`${Math.floor((parseInt(Turtle))/(parseInt(All))*100)}%`;
            big_all_good.style.width=`${100-(Math.floor((parseInt(Turtle))/(parseInt(All))*100))}%`;
            if(Math.floor((parseInt(Turtle))/(parseInt(All))*100)>=50){
                result.innerHTML="나빠요!";
            }
            else{
                result.innerHTML="좋아요!";
            }
            const localAll=localStorage.getItem("all");
            if(localAll===null){
                localStorage.setItem("all",0);
            }
            const localTurtle=localStorage.getItem("turtle");
            if(localTurtle===null){
                localStorage.setItem("turtle",0);
            }
            window.onbeforeunload=function localstorage(){
                click=locaClick;
            };
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
            form.addEventListener("submit",handleSubmit);
            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // or files from your local hard drive
            // Note: the pose library adds "tmImage" object to your window (window.tmImage)
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            // Convenience function to setup a webcam
            webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
            await webcam.setup(); // request access to the webcam
            await webcam.play();
            window.requestAnimationFrame(loop);
    
            // append elements to the DOM
            document.getElementById("webcam-container").appendChild(webcam.canvas);
            for (let i = 0; i < maxPredictions; i++) { // and class labels
            }
        }
        async function loop() {
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(loop);
        }
        // run the webcam image through the image model
        async function predict() {
            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(webcam.canvas);
            if(prediction[0].probability.toFixed(2)>=0.50){
                turtle.innerHTML ="거북목 자세에요";
            }
            else if(prediction[0].probability.toFixed(2)<=0.50){
                turtle.innerHTML ="바른 자세에요";
            }
            //  for (let i = 0; i < maxPredictions; i++) {
            //      const classPrediction =
            //          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            //      labelContainer.childNodes[i].innerHTML = classPrediction;
            //  }
        }
        function webcamAudioAlert(){
            const All=localStorage.getItem("all");
            const Turtle=localStorage.getItem("turtle");
            if(select.options[select.selectedIndex].value==="text-mode"){
                if(turtle.innerHTML==="바른 자세에요"){
                    const All=localStorage.getItem("all");
                    const Turtle=localStorage.getItem("turtle");
                    all++;
                    localStorage.setItem("all",parseInt(All)+1);
                    turtleBar_all.innerHTML=`전체 접속의 거북목 자세 비율:${Math.floor(parseInt(Turtle)/(parseInt(All)+1)*100)}%`;
                    turtleBar_today.innerHTML=`오늘 접속의 거북목 자세 비율:${Math.floor(turtlePoze/all*100)}%`;
                    big_all_bad.style.width=`${Math.floor(parseInt(Turtle)/(parseInt(All)+1)*100)}%`;
                    big_all_good.style.width=`${100-(Math.floor(parseInt(Turtle)/(parseInt(All)+1)*100))}%`;
                    if(Math.floor(parseInt(Turtle)/(parseInt(All)+1)*100)>=50){
                        result.innerHTML="나빠요!";
                    }
                    else{
                        result.innerHTML="좋아요!";
                    }
                    alert("바른자세에요.이 자세 계속 유지해주세요.");
                }
                else if(turtle.innerHTML==="거북목 자세에요"){
                    const All=localStorage.getItem("all");
                    const Turtle=localStorage.getItem("turtle");
                    all++;
                    turtlePoze++;
                    localStorage.setItem("all",parseInt(All)+1);
                    localStorage.setItem("turtle",parseInt(Turtle)+1);
                    turtleBar_all.innerHTML=`전체 접속의 거북목 자세 비율:${Math.floor((parseInt(Turtle)+1)/(parseInt(All)+1)*100)}%`;
                    turtleBar_today.innerHTML=`오늘 접속의 거북목 자세 비율:${Math.floor(turtlePoze/all*100)}%`;
                    big_all_bad.style.width=`${Math.floor((parseInt(Turtle)+1)/(parseInt(All)+1)*100)}%`;
                    big_all_good.style.width=`${100-(Math.floor((parseInt(Turtle)+1)/(parseInt(All)+1)*100))}%`;
                    if(Math.floor((parseInt(Turtle)+1)/(parseInt(All)+1)*100)>=50){
                        result.innerHTML="나빠요!";
                    }
                    else{
                        result.innerHTML="좋아요!";
                    }
                    alert("거북목 자세에요.이 자세 바른 자세로 바꿔주세요.")
                }
            }
            if(select.options[select.selectedIndex].value==="audio-mode"){
                if(turtle.innerHTML==="바른 자세에요"){
                    const All=localStorage.getItem("all");
                    const Turtle=localStorage.getItem("turtle");
                    all++;
                    localStorage.setItem("all",parseInt(All)+1);
                    turtleBar_all.innerHTML=`전체 접속의 거북목 자세 비율:${Math.floor(parseInt(Turtle)/(parseInt(All)+1)*100)}%`;
                    turtleBar_today.innerHTML=`오늘 접속의 거북목 자세 비율:${Math.floor(turtlePoze/all*100)}%`;
                    big_all_bad.style.width=`${Math.floor(parseInt(Turtle)/(parseInt(All)+1)*100)}%`;
                    big_all_good.style.width=`${100-(Math.floor(parseInt(Turtle)/(parseInt(All)+1)*100))}%`;
                    if(Math.floor(parseInt(Turtle)/(parseInt(All)+1)*100)>=50){
                        result.innerHTML="나빠요!";
                    }
                    else{
                        result.innerHTML="좋아요!";
                    }
                    good_audio.play();
                }
                else if(turtle.innerHTML==="거북목 자세에요"){
                    const All=localStorage.getItem("all");
                    const Turtle=localStorage.getItem("turtle");
                    all++;
                    turtlePoze++;
                    localStorage.setItem("all",parseInt(All)+1);
                    localStorage.setItem("turtle",parseInt(Turtle)+1);
                    turtleBar_all.innerHTML=`전체 접속의 거북목 자세 비율:${Math.floor((parseInt(Turtle)+1)/(parseInt(All)+1)*100)}%`;
                    turtleBar_today.innerHTML=`오늘 접속의 거북목 자세 비율:${Math.floor(turtlePoze/all*100)}%`;
                    big_all_bad.style.width=`${Math.floor((parseInt(Turtle)+1)/(parseInt(All)+1)*100)}%`;
                    big_all_good.style.width=`${100-(Math.floor((parseInt(Turtle)+1)/(parseInt(All)+1)*100))}%`;
                    if(Math.floor((parseInt(Turtle)+1)/(parseInt(All)+1)*100)>=50){
                        result.innerHTML="나빠요!";
                    }
                    else{
                        result.innerHTML="좋아요!";
                    }
                    turtle_audio.play();
                }
            }
        }
        function handleSubmit(event) {
            event.preventDefault();
            number=parseInt(numInput.value);
            numInput.value="";
            setInterval(webcamAudioAlert,number*60000);
        }        
        init();