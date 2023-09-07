const usersList = document.querySelector(".users-container");

function addUser() {
  console.log("Adding...");
  const name = document.querySelector(".user-name").value;
  const avatar = document.querySelector(".user-avatar").value;

  const data = {
    name,
    avatar,
  };

  // Create
  // 1. method - POST
  // 2. data - JSON & body
  // 3. Header - JSON data

  // Create -> Refresh
  fetch("https://60c98aa8772a760017203b57.mockapi.io/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  }).then(() => getUsers());

  console.log(name, avatar);
}

const createUser = ({ name, avatar, createdAt, id }) => {
  usersList.innerHTML += `<div class="user">
        <img
          class="user-pic"
          src=${avatar}
          alt=${name}
        />
        
        <div class="user-detail">
          <h2 class="user-name">${name}</h2>
          <p>${new Date(createdAt).toDateString()}</p>
          <button onclick="deleteUser(${id})">Delete</button>
        </div>
      </div>`;
};

function deleteUser(id) {
  // Print the id of user in console
  console.log("Deleting... User", id);

  // Avoided Race condition
  // Delete -> Refresh
  fetch(`https://60c98aa8772a760017203b57.mockapi.io/users/${id}`, {
    method: "DELETE",
  }).then(() => getUsers());

  // Race Condition
  // Lorry
  // fetch(`https://60c98aa8772a760017203b57.mockapi.io/users/${id}`, {
  //   method: "DELETE",
  // })

  // Ferrari
  // getUsers()
}
let pageNo=1;
function getUsers() {
  fetch(`https://60c98aa8772a760017203b57.mockapi.io/users?page=${pageNo}&limit=10`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((users) => {
      // Clear the old list
      usersList.innerHTML = "";
      // Adding the new list
      users.forEach(createUser);
    });
}

function nextPage(){
    pageNo++;
    getUsers()
}
function previousPage(){
    if(pageNo == 1 ){
        return
    }
    pageNo--;
    getUsers()
}
function btn(pageNum){
    pageNo=pageNum;
    getUsers()
}
let singlePageLength;
async function getTotalUserCount(){
const totalData=await  fetch("https://60c98aa8772a760017203b57.mockapi.io/users")
const len = await totalData.json()

const totalLength = len.length
singlePageLength = Math.ceil(totalLength/10)
console.log(singlePageLength)
createPagination()
}
function createPagination(){
    const buttons= document.querySelector(".pagination-buttons")
    for (let i = 1; i <= singlePageLength; i++) {
        buttons.innerHTML += `<button class="page1-btn" onclick="btn(${i})">${i}</button>` 
        
    }
    
}
getTotalUserCount()
getUsers();