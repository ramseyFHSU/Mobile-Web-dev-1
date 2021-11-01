//promise

// Async / Await

const myUsers = {
  userList: [],
};

const myFun = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const jsonUserData = await response.json();
  return jsonUserData;
};

const anotherFun = async () => {
  const data = await myFun();
  myUsers.userList = data;
  console.log(myUsers.userList);
};

anotherFun();
