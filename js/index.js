// Your code goes here
window.onload = init;

function init() {
  async function getUserList() {
    fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => createList(json));

    function createList(json) {
      // debugger
      let listItems = document.createElement('div');
      document.body.appendChild(listItems);
      for (let item of json) {
        let user = document.createElement('div');
        let userId = document.createElement('input');
        let email = document.createElement('input');
        let name = document.createElement('input');
        let userName = document.createElement('input');
        let webSite = document.createElement('input');
        let phone = document.createElement('input');
        let deleteBtn = document.createElement('button');

        email.setAttribute('type', 'email');
        userId.value = item.id;
        email.value = item.email;
        name.value = item.name;
        userName.value = item.username;
        webSite.value = item.website;
        phone.value = item.phone
        user.appendChild(userId);
        user.appendChild(email);
        user.appendChild(name);
        user.appendChild(userName);
        user.appendChild(webSite);
        user.appendChild(phone);
        listItems.appendChild(user);
        listItems.appendChild(deleteBtn);

        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.id = item.id;
        deleteBtn.onclick = () => {
          deleteData(deleteBtn.id);
        }
      }

      let sendBtn = document.createElement('button');
      sendBtn.innerHTML = 'Send';
      sendBtn.className = 'btn';
      document.body.appendChild(sendBtn);
      sendBtn.onclick = () => {
        sendtUserList(json);
      }
      // debugger
      let img = document.createElement('img');
      img.setAttribute('src', 'preloader2.gif');
      img.alt = 'spinner';
      img.style.width = '30px';
      img.style.visibility = 'hidden';
      document.body.appendChild(img);
    }
  }

  function sendtUserList(json) {
    let img = document.querySelector('img');
    img.style.visibility = 'visible';
    fetch('https://jsonplaceholder.typicode.com/users/4', {
      method: 'PUT',
      body: JSON.stringify(json),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(() => img.style.visibility = 'hidden');

  }
  function deleteData(value) {



    let img = document.querySelector('img');
    img.style.visibility = 'visible';
    fetch('https://jsonplaceholder.typicode.com/users/${value}', {
      method: 'DELETE',
    })
      .then(() => img.style.visibility = 'hidden');
  }

  getUserList()
}



