//firebase auth 

import { initializeApp  } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {getAuth,onAuthStateChanged,signInWithPopup,  GoogleAuthProvider , createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import { getDatabase , ref ,push , query,limitToLast, set, get , onValue , onChildChanged ,onChildAdded, update} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js'


const firebaseConfig = {
    apiKey: "AIzaSyBIbRFofcWrkdjbq0y66RCFE3WZyCDrdfE",
    authDomain: "chat-23fe4.firebaseapp.com",
    projectId: "chat-23fe4",
    storageBucket: "chat-23fe4.appspot.com",
    messagingSenderId: "493468911945",
    appId: "1:493468911945:web:077e9067658640a9fcf298",
    measurementId: "G-9NH4NRGGP1",
    databaseURL:"https://chat-23fe4-default-rtdb.firebaseio.com"
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
let username = document.getElementById("username");

signout_btn.style.display = "none";
signin_btn.style.display = "none";
input_div.style.display = "none";
chat_div.style.display = "none";
img_tag.style.display = "none";
username.style.display = "none";

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
    const que = query(ref(db, "/allmessages"), limitToLast(1))
    
    onValue(que,(snapshot)=>{

        
        const div = document.createElement("p");
        const obj = snapshot.val();
        div.textContent = Object.values(obj);

        chat_div.appendChild(div);
    })

    
    
}

function display_signin(){
    signin_btn.style.display = "none";
    signout_btn.style.display = "block";
    input_div.style.display = "block";
    chat_div.style.display = "block";
    img_tag.style.display = "block";
    username.style.display = "block";

}

function display_signout(){

        signin_btn.style.display = "block";
        signout_btn.style.display = "none";
        input_div.style.display = "none";
        chat_div.style.display = "none";
        img_tag.style.display = "none";
        username.style.display = "none";
}

function display_img(user){

    var img_link = user.photoURL;
    
    img_tag.src = img_link;

    username.textContent = user.displayName;
    

    

}
//  button click sign in 
signin_btn.addEventListener("click" ,()=>{

    signInWithPopup(auth , provider)
    .then((result)=>{
        var user = auth.currentUser ;
        console.log("success");
        display_signin();
        display_img(user);
        
        
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