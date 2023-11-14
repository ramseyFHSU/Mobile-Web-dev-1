import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM2GewjM_yKuYLZQZUMjOVEMZtZ-wVyVI",
  authDomain: "taskmanager-ee474.firebaseapp.com",
  projectId: "taskmanager-ee474",
  storageBucket: "taskmanager-ee474.appspot.com",
  messagingSenderId: "455676807044",
  appId: "1:455676807044:web:cdc9fd70846f30cefdffd1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getTasks(db) {
  const tasksCol = collection(db, "tasks");
  const taskSnapshot = await getDocs(tasksCol);
  const taskList = taskSnapshot.docs.map((doc) => doc);
  return taskList;
}

const unsub = onSnapshot(collection(db, "tasks"), (doc) => {
  //   console.log(doc.docChanges());
  doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Call render function in UI
      renderTask(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      //do something
      removeTask(change.doc.id);
    }
  });
});

//add new task
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(collection(db, "tasks"), {
    title: form.title.value,
    description: form.description.value,
  }).catch((error) => console.log(error));
  form.title.value = "";
  form.description.value = "";
});

//delete task
const taskContainer = document.querySelector(".tasks");
taskContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "tasks", id));
  }
});
