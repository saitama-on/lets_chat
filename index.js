//firebase auth 

import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";


import {getAuth,onAuthStateChanged,signInWithPopup,  GoogleAuthProvider , createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import { getDatabase , ref ,push , query,limitToLast, set, get , onValue , onChildChanged ,onChildAdded, update} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js'

import {apiKey , authDomain , projectId ,storageBucket , messagingSenderId, appId , measurementId ,databaseURL}  from "./info.js"


const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
    databaseURL: databaseURL,
  };
const app = initializeApp(firebaseConfig);  
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let signin_btn = document.getElementById("signin");
let signout_btn = document.getElementById("signout");
let input_field = document.getElementById("input_msg");
let send_msg_btn = document.getElementById("send_msg");
let input_div = document.getElementById("input_div");
let chat_div = document.getElementById("chat_div");
let id = "empty";
let img_tag = document.getElementById("img_tag");
//let username = document.getElementById("username");

signout_btn.style.display = "none";
signin_btn.style.display = "none";
input_div.style.display = "none";
chat_div.style.display = "none";
img_tag.style.display = "none";
//username.style.display = "none";

const db = getDatabase(app);

function chat(user ){

    const db = getDatabase(app);
    
    const newref = ref(db , "/allmessages");
    const msg = user.displayName + ": " + input_field.value;
    push(newref , msg).then((promise)=>{
        
       id = promise._path.pieces_[1];


        
    });

    


}


function trying(){

    const newref1 = ref(db, "/allmessages");
    const que = query(ref(db, "/allmessages"), limitToLast(1));
    
    
    onValue(que,(snapshot)=>{

        
        const div = document.createElement("p");
        const obj = snapshot.val();
        div.textContent = Object.values(obj);

        chat_div.appendChild(div);

        chat_div.scrollTop = chat_div.scrollHeight;
    })    
}


function load_oldmsg(){

    const newref1 = query(ref(db, "/allmessages"), limitToLast(5));
    get(newref1)
    .then((promise)=>{

        promise.forEach((promise)=>{
            const new_element = document.createElement("p");
            new_element.textContent = promise.val();
            chat_div.appendChild(new_element);
            
            chat_div.scrollTop = chat_div.scrollHeight;
        });
    })
}

function display_signin(){
    signin_btn.style.display = "none";
    signout_btn.style.display = "block";
    input_div.style.display = "block";
    chat_div.style.display = "block";
    img_tag.style.display = "block";
    //username.style.display = "block";

}

function display_signout(){

        signin_btn.style.display = "block";
        signout_btn.style.display = "none";
        input_div.style.display = "none";
        chat_div.style.display = "none";
        img_tag.style.display = "none";
        //username.style.display = "none";
}

function display_img(user){

    var img_link = user.photoURL;
    
    img_tag.src = img_link;

   // username.textContent = user.displayName;
    

    

}
//  button click sign in 
signin_btn.addEventListener("click" ,()=>{

    signInWithPopup(auth , provider)
    .then((result)=>{
        var user = auth.currentUser ;
        console.log("success");
        display_signin();
        display_img(user);

        var user_joined = document.createElement("p");

        user_joined.textContent = user.displayName + "joined the chat";

        chat_div.appendChild(user_joined);
        //console.log(result);
        
    })
    .catch((error)=>{

        alert(error);
    })

})

signout_btn.addEventListener("click" , ()=>{

    signOut(auth).then(()=>{

        console.log("signed out")

        display_signout();
    }).catch(()=>{

        alert("error in signout")
    })
})


window.onload = ()=>{

    onAuthStateChanged(auth ,(user)=>{

        if (user){
    
     
        
        display_signin();
        display_img(user);
        load_oldmsg();
        }
        else{
    
            display_signout();
        }
       })
}


send_msg_btn.addEventListener("click" ,()=>{

    if(input_field.value.trim() != ''){
        const user1 = auth.currentUser ; 
        chat(user1);
    
        input_field.value = "" ;
    }
})

trying();

// index.js
// done using chatgpt 
// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const paragraphs = document.querySelectorAll('#chat_div p');
    const input = document.getElementById("input_msg");
    input.classList.toggle('dark-mode');
    paragraphs.forEach((p) => {
        p.classList.toggle('dark-mode');
    })
  }
  
  // Add event listener to the dark mode toggle button
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', toggleDarkMode);
  