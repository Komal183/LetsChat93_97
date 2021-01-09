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


  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_Name");

  function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0 
      });

      document.getElementById("msg").value = "";
      document.getElementById("visible").value = "";
    
  }

 function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
         console.log(firebase_message_id);
	       console.log(message_data);
	       names = message_data['name'];
	       message = message_data['message'];
         like = message_data['like'];
         name_with_tag = "<h4> "+ names +"<img id='tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+ firebase_message_id +" value=" + like + " onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = name_with_tag + message_with_tag +like_button + span_with_tag;       
        document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes  
	 });

}

function Logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_Name");
    localStorage.removeItem("Display_Picture");
    window.location = "chat.html";
}




