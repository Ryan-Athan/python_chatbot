//UI

const sendbtn = document.getElementById('send-btn');
const userinput = document.getElementById('userinput');
const displaybox = document.getElementById('displaybox');
const clearhistory = document.getElementById('clear-history');

// for localhost
// let ws = new WebSocket("ws://localhost:8000/image");

// for sever https deployment

let websocketstring = '';

if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
    websocketstring = `ws://localhost:8000/image`; //local
}else{
    websocketstring = `wss://${window.location.hostname}/image`; //https deployment
}

let ws = new WebSocket(websocketstring);

let lastmessagediv = null;
let isnewinput = true;

ws.onopen = function(){
    console.log('Websocket connections established');
};

ws.onerror = function(err){
    console.log("Websocket connection error: ", err);
    document.getElementById("loading-spineer").style.display = "none";
};

ws.onclose = function(event){
    console.log("WebSocket connections closed:",event);
    document.getElementById("loading-spinner").style.display = "none";
}

ws.onmessage = function(event){

    let message = event.data;

    // console.log(message);
    // console.log(message.data);

    let img = document.createElement("img");
    img.src = message;
    img.className = "responseimg";
    displaybox.appendChild(img);
    
    savetolocal("ai-respnse",message); // to localstorage

    document.getElementById("loading-spinner").style.display = "none";
    
}

sendbtn.addEventListener('click',function(e){
    e.preventDefault();

    let getinputval = userinput.value.trim();

    if(getinputval){

        let userinputdiv = document.createElement("div");
        userinputdiv.className = "p-3 ms-3 chat-message user-input";
        userinputdiv.textContent = getinputval;
        displaybox.appendChild(userinputdiv);

        ws.send(getinputval); // to websocket
        savetolocal("user-input",getinputval) // to localstorage
        
        userinput.value = " ";
        userinput.focus();

        document.getElementById("loading-spinner").style.display = "block";
    }
});


window.onload = function(){
    let storagedatas = JSON.parse(localStorage.getItem("imghistory") || "[]");

    if(storagedatas.length > 0){

        let currole = null;
        let curcontent = ' ';

        // console.log(storagedatas);
        storagedatas.forEach((storagedata,idx)=>{
            
            // console.log(storagedata); 
            // console.log(idx);
            if(storagedata.role === currole){
                curcontent += storagedata.content;
            }else{
                // console.log(currole); // undefine

                if(currole){

                    if(currole === "user-input"){
                        let messagediv = document.createElement("div");
                        messagediv.className = "p-3 ms-3 chat-message chat-message" + currole;
                        messagediv.textContent = curcontent;
                        displaybox.appendChild(messagediv);
                    }else if(currole === "ai-response"){
                        let img = document.createElement("img");
                        img.src = curcontent;
                        img.className = "responseimg";
                        displaybox.appendChild(img);
                    }

                }

                // start new message 
                currole = storagedata.role;
                curcontent = storagedata.content;

                // console.log(currole); // user-input, ai-response
            }   
            
            // console.log(curcontent);

            if(idx == storagedatas.length -1 ){
                let img = document.createElement("img");
                img.src = curcontent;
                img.className = "responseimg";
                displaybox.appendChild(img);
            }

        });

    }else{
        displaybox.innerHTML = ` <small class="text-muted">No image availabel! </small>`;
    }
};


// [{role:"user-input",content:'hello how are you?'},{role:"bot-res",content:'hello how are you?'}]

function savetolocal(role,content){
    let getdatas = JSON.parse(localStorage.getItem("imghistory") || "[]");
    getdatas.push({role:role,content:content});
    localStorage.setItem("imghistory",JSON.stringify(getdatas));
}

clearhistory.addEventListener('click',function(){
    localStorage.removeItem("imgthistory");
    location.reload();
});



