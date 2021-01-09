 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAmEwrL_0Rz1-FDBhuYAmVrNkBbWWPHvCE",
    authDomain: "website-test-d5d01.firebaseapp.com",
    databaseURL: "https://website-test-d5d01-default-rtdb.firebaseio.com",
    projectId: "website-test-d5d01",
    storageBucket: "website-test-d5d01.appspot.com",
    messagingSenderId: "103938191841",
    appId: "1:103938191841:web:df58dad1e22c3cc7a8a2a0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  dp = localStorage.getItem("Display_Picture");
  document.getElementById("dp").src = dp;
  user_name = localStorage.getItem("user_name");
  document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";


function Logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_Name");
    localStorage.removeItem("Display_Picture");
    window.location="chat.html";
}

function addRoom(){
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room"
    });
    localStorage.setItem("room_Name", room_name);
    window.location = "Chatpage.html";
    document.getElementById("h4").innerHTML = "Room Added!"; 
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name){
console.log(name);
localStorage.setItem("room_Name", name);
window.location = "Chatpage.html";
}