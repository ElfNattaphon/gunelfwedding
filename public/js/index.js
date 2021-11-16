/*
let userList = document.querySelector('#userList');
let from = document.querySelector('#addUser');
*/
const message_commit = document.getElementById('message_commit');
const message = document.getElementById('message');


let bFbStatus = false;
let fbID = "";
let fbName = "";
let fbEmail = "";




function codeAddress() {
    //alert("Hello")
    $("#profile").hide();
}
window.onload = codeAddress;


message_commit.addEventListener('click', (e) => {
    if (document.getElementById('message') == "")
    {
        alert("อวยพรอะไรพวกเราดี ❤❤❤❤")
    }
    else
    {
    //console.log("OK");
    e.preventDefault();
    db.collection('post').add({
        comment: message.value,
        id: sessionStorage.getItem("sessionfbID"),
        name: sessionStorage.getItem("sessionfbName"),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    }
    message.value = '';
});


function renderPost(doc) {
    let div1 = document.createElement("div");
    div1.className = "card p-3 ";
//text-right
    let div2 = document.createElement("div");
    div2.className = "card-title";

    let img = document.createElement("img");
    img.src = "https://cdn.pixabay.com/photo/2018/05/08/18/25/facebook-3383596_960_720.png";
    img.className = "rounded-circle avatar-xs";
    img.alt = "friend";
    img.width = "50";
    img.height = "50";

    let blockquote = document.createElement("blockquote");
    blockquote.className = "blockquote mb-0";

    let para1 = document.createElement("p");
    let node1 = document.createTextNode(doc.data().comment);
    para1.appendChild(node1);
    blockquote.appendChild(para1);

    let footer = document.createElement("footer");
    footer.className = "blockquote-footer";

    let para2 = document.createElement("p");
    para2.className = "card-text";
    let node2 = document.createTextNode(doc.data().name);
    para2.appendChild(node2);

    let small = document.createElement("small");
    small.className = "text-muted";
    let node3;
    if (doc.data().timestamp != null) {
         node3 = document.createTextNode(timeConverter(doc.data().timestamp.toDate()));
    }else{
         let d = new Date();
         node3 = document.createTextNode(timeConverter(d));
    }
    //console.log(timeConverter(doc.data().timestamp.toDate()))
    let div_h = document.createElement("div");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let span2 = document.createElement("span2");
    let img2 = document.createElement("img");
    img2.src = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e";
    img2.width = "18";
    img2.height = "18";
    //span.style.textAlign = "left";
    span.appendChild(img2);
    var text_love = document.createTextNode(" รักเลย");
    span2.appendChild(text_love);
    span2.className = "spanClass_textLove";
    //span2.style.textAlign = "left";
    //span2.style.color("PINK")//"rgb(243, 62, 88);"

    
    let card_footer = document.createElement("div"); 
    card_footer.className = "card-footer Class_ColorBoxLike";
    card_footer.appendChild(span)
    card_footer.appendChild(span2)
    //card_footer.style.float = "left";
    /*
    let a1 = document.createElement("a");
    let i1 = document.createElement("i");
    i1.className = "fa fa-heart";
    
    a1 = document.createTextNode("รักเลย");
    card_footer.appendChild(a1)
*/
    small.appendChild(node3);

    footer.appendChild(para2);
    footer.appendChild(small);

    div2.appendChild(img)
    div1.appendChild(div2)
    div1.appendChild(blockquote);
    div1.appendChild(footer);
    div_h.appendChild(div1);
    div1.appendChild(card_footer);
    //div_h.appendChild(p);
    let element = document.getElementById("postList");
    element.appendChild(div_h);

}

db.collection('post').onSnapshot(snanshot => {
    let changes = snanshot.docChanges();
    changes.forEach(change => {
        //console.log(change.doc.data().comment);
        //renderPost(change.doc);
        if (change.type == 'added') {
            renderPost(change.doc);
        } else if (change.type == 'removed') {
            //renderPost(change.doc);
            //alert('delete')
        }
    });
});


// facebook login

window.fbAsyncInit = function () {
    FB.init({
        appId: '2958625627702738',
        cookie: true,
        xfbml: true,
        version: 'v9.0'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function statusChangeCallback(response) {
    if (bFbStatus == false) {
        fbID = response.authResponse.userID;
        if (response.status == 'connected') {
            getCurrentUserInfo(response)
        } else {
            FB.login(function (response) {
                if (response.authResponse) {
                    getCurrentUserInfo(response)
                } else {
                    console.log('Auth cancelled.')
                }
            }, { scope: 'email' });
        }
    }
    bFbStatus = true;
}

function getCurrentUserInfo() {
    FB.api('/me?fields=name,email', function (userInfo) {

        fbName = userInfo.name;
        fbEmail = userInfo.email;

        //console.log(fbID);
        //console.log(fbName);
        //console.log(fbEmail);

        sessionStorage.setItem("sessionfbID", fbID)
        sessionStorage.setItem("sessionfbName", fbName)
        sessionStorage.setItem("sessionfbEmail", fbEmail)
    });
    //console.log(bFbStatus);
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function timeConverter(UNIX_timestamp) {
    var a = UNIX_timestamp;//new Date(UNIX_timestamp * 1000);
    //var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    var year = a.getFullYear() + 543;
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year;//+ ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

/*
function renderUser(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span')
    let city = document.createElement('span')
    let del = document.createElement('div');
    del.className = 'del';

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    del.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(del);

    userList.appendChild(li);

    //delete data
    del.addEventListener('click', (e) =>{
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('users').doc(id).delete();
    });
}
*/
/* //where
db.collection('users').where('city','==','siriraj').get().then(user => {
    user.docs.forEach(doc => {
        console.log(doc.data())
        renderUser(doc);
    });
});
*/

/*
db.collection('users').doc('J1lFa1IuyMnqWyUfaV6P').update({city:'bankok'})
*/
//.where('city','==','bangkok').orderBy('name').
/*
db.collection('users').get().then(user => {
    user.docs.forEach(doc => {
        console.log(doc.data())
        renderUser(doc);
    });
});
*/
/*
from.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        name: from.name.value,
        city: from.city.value
    })
    from.name.value = '';
    from.city.value = '';
});
*/


// real-time database
/*
db.collection('users').orderBy('name').onSnapshot(snanshot => {
    let changes = snanshot.docChanges();
    changes.forEach(change =>{
        //console.log(change);
        if (change.type == 'added'){
            renderUser(change.doc);
        }else if (change.type == 'removed'){
            let li = userList.querySelector(`[data-id=${change.doc.id}]`)
            userList.removeChild(li);
        }
    })
})
*/
