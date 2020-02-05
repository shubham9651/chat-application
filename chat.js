var user_email;
var div1 = document.querySelector('#users_container1');
//const taker = document.querySelector('#take_message');
const divv = document.querySelector('#users_container');

function users(){
    console.log('users() function called');

    document.getElementById('take_message').style.display = "none";

    user_email = document.getElementById('inp_mesg').value;
    console.log(user_email);
    //document.innerHTML += "<center style = background-color:green;font-size:50px; >"+"hello "+message+" start chatting with the users"+"</center>";
    db.collection("Users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id);
        document.querySelector('#users_container').innerHTML += `<br><br><button class = "open-button" id="`+doc.data().Email+`" onclick = "openForm(this.id)"><div id="btn_container"><img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLCS6-5wuSQfTjJD-14JTI3gl-FQNHpDm7mecBTFonS7HdDbaH&s" width="30" height="30"/></div><span>`+doc.id+`</span></button>`;
    });
});
}
let to_user;
function openForm(button_id) {
    console.log(button_id);
    to_user = button_id;
    document.getElementById("myForm").style.display = "block";
    message_(button_id);
    console.log('history');
    
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("users_container1").style.display = "none";

}


function message_(button_id){
    document.getElementById("users_container1").style.display = "block";
    console.log(user_email+":"+button_id)
    db.collection("messages").orderBy('time').onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {
                    if (change.doc.data().from == user_email && change.doc.data().to == button_id) {
                        console.log("true");
                        console.log(user_email+":"+button_id)
                        document.querySelector('#chat_table').innerHTML+=`<tr><td></td><td></td><td>`+change.doc.data().mesg+`</td></tr>`;
                    }
                   else if(change.doc.data().from == button_id && change.doc.data().to == user_email){
                        document.querySelector('#chat_table').innerHTML+=`<tr><td>`+change.doc.data().mesg+`</td></td><td></td><td></tr>`;
                    }
                }
                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed city: ", change.doc.data());
                }
            });
        });

 /*       db.collection("messages").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            //list2.push(doc.data())
            //console.log(list2)
            // doc.data() is never undefined for query doc snapshots
            console.log( " => ", doc.data());
            if (doc.data().from == user_email) {
                console.log("true");
                document.querySelector('#chat_table').innerHTML+=`<tr><td></td><td></td><td>`+doc.data().mesg+`</td></tr>`;
            }
            if(doc.data().from == button_id){
                document.querySelector('#chat_table').innerHTML+=`<tr><td>`+doc.data().mesg+`</td></td><td></td><td></tr>`;
            }
            });
        
                   // document.write("<br><br>")
                    //document.write(x+":"+y)                            
                    //console.log(x+":"+y)

        });
     */

      //  div3.innerHTML+=`<input type="text" id = "input_message" required;>`;
        //div3.innerHTML+=`<button type="button"  onclick = 'send_messg()'>--->>></button>`;

    
}













var message ;
var from_user;
function send_messg(){
   // var user_email = document.querySelector('take_message').getElementById('inp_message').value;
    console.log(user_email);
    message   = document.getElementById('msg').value;
    from_user = document.getElementById('inp_mesg').value;
    console.log(message);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
   // var time_ = firebase.firestore.FieldValue.serverTimestamp()
    db.collection('messages').doc(dateTime).set({
        mesg : message,
        from : user_email,
        to : to_user,
        time : dateTime
    });
    console.log('message sent!');  
    console.log('new_message_sent!');



}
