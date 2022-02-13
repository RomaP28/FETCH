// Your code goes here
window.onload = init;

function init() {
  async function getUserList() {
    // let data;
    fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'GET'
    })
      .then(response => response.json())
      // .then(json => createList(json));
      .then(json => data = JSON.parse(JSON.stringify(json)))
      .then(data => createList(data));

    function createList(data) {
      // debugger
      let listItems = document.createElement('div');
      document.body.appendChild(listItems);
      for (let item of data) {
        let user = document.createElement('div');
        let userId = document.createElement('input');
        let email = document.createElement('input');
        let name = document.createElement('input');
        let userName = document.createElement('input');
        let webSite = document.createElement('input');
        let phone = document.createElement('input');
        let deleteBtn = document.createElement('button');
        user.id = 'user' + item.id;
        user.style.border = '2px dotted orange';
        user.style.width = '50%';
        user.style.marginBottom = '10px';
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
        user.appendChild(deleteBtn);

        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.id = item.id;
        deleteBtn.style.padding = '2px 30px';
        deleteBtn.onclick = () => {
          deleteData(deleteBtn.id);
        }
      }

      let sendBtn = document.createElement('button');
      sendBtn.innerHTML = 'Send';
      sendBtn.className = 'btn';
      document.body.appendChild(sendBtn);
      sendBtn.onclick = () => {
        sendtUserList(data);
      }
      let img = document.createElement('img');
      img.setAttribute('src', 'preloader2.gif');
      img.alt = 'spinner';
      img.style.width = '30px';
      img.style.visibility = 'hidden';
      document.body.appendChild(img);
    }
  }
  function sendtUserList(data) {
    getSpinner('show');
    data = data.filter((obj) => typeof obj !== 'undefined');
    fetch('https://jsonplaceholder.typicode.com/users/4', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(() => getSpinner('hide'));
  }
  function deleteData(value) {
    getSpinner('show');
    delete data[value - 1];
    document.getElementById('user' + value).remove();
    fetch('https://jsonplaceholder.typicode.com/users/${value}', {
      method: 'DELETE',
    })
      .then(() => getSpinner('hide'));
  }
  function getSpinner(value) {
    let img = document.querySelector('img');
    return value === 'show' ? img.style.visibility = 'visible' : img.style.visibility = 'hidden';
  }
  getUserList();
}



