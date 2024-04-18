import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwectJgx-gtfei69906TQQ7pjcEjg4_OA",
  authDomain: "task-manager-28005.firebaseapp.com",
  projectId: "task-manager-28005",
  storageBucket: "task-manager-28005.appspot.com",
  messagingSenderId: "973028067207",
  appId: "1:973028067207:web:98e6281565aef61c5b3522",
  measurementId: "G-2JFGMGPLQR",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signupUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setUser(userCredential.user);
      createUserInFirestore(userCredential.user);
    } catch (error) {
      setError(error.message);
      console.log("Signup Error:", error.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
      console.log("Login Error:", error.message);
    }
  };

  const loggedInUser = () => {
    return user;
  };

  const logOutUser = () => {
    signOut(firebaseAuth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError(error.message);
        console.log("Logout Error:", error.message);
      });
  };

  const getToDoLists = async (authUser) => {
    if (!authUser) {
      console.log("No user to get ToDo lists for");
      return [];
    }

    try {
      const userTodosRef = collection(fireStore, "/todos");
      const q = query(userTodosRef);
      const querySnapshot = await getDocs(q);

      const lists = querySnapshot.docs.map(async (doc) => {
        const todoData = doc.data();
        const todoID = doc.id;

        // Query tasks related to this ToDo
        const tasksRef = collection(fireStore, "tasks");
        const taskQuery = query(tasksRef, where("todoID", "==", todoID));
        const taskQuerySnapshot = await getDocs(taskQuery);
        const totalTasks = taskQuerySnapshot.size;

        return {
          todoTitle: todoData.title || "",
          totalTasks,
          userEmail: todoData.userEmail || "",
          createdAt: todoData.createdAt
            ? todoData.createdAt.toDate().toLocaleDateString()
            : "",
          updatedAt: todoData.updatedAt
            ? todoData.updatedAt.toDate().toLocaleDateString()
            : todoData.createdAt.toDate().toLocaleDateString(),
        };
      });

      return Promise.all(lists);
    } catch (error) {
      console.log("Error getting ToDo lists from Firestore:", error.message);
      return [];
    }
  };

  const getTasksFromFirestore = async () => {
    try {
      const tasksRef = collection(fireStore, "tasks");
      const querySnapshot = await getDocs(tasksRef);

      const tasks = querySnapshot.docs.map((doc) => {
        const taskData = doc.data();
        return {
          id: doc.id || "",
          name: taskData.name || "",
          description: taskData.description || "",
          todoTitle: taskData.todoTitle || "",
          userEmail: taskData.userEmail || "",
          createdAt: taskData.createdAt
            ? taskData.createdAt.toDate().toLocaleDateString()
            : null, // Convert Firestore timestamp to JavaScript Date object
        };
      });

      return tasks;
    } catch (error) {
      console.log("Error getting Tasks from Firestore:", error.message);
      return [];
    }
  };

  const getUsersFromFirestore = async () => {
    try {
      const usersRef = collection(fireStore, "users");
      const querySnapshot = await getDocs(usersRef);

      const users = querySnapshot.docs.map((doc) => {
        const userData = doc.data();
        return {
          id: doc.id,
          email: userData.email || "",
          password: userData.password || "",
          createdAt: userData.createdAt
            ? userData.createdAt.toDate().toLocaleString()
            : "",
          ip: userData.ip || "",
        };
      });

      return users;
    } catch (error) {
      console.log("Error getting users from Firestore:", error.message);
      return [];
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUser,

        loginUser,
        loggedInUser,
        error,
        clearError,
        logOutUser,

        getToDoLists,
        getUsersFromFirestore,
        getTasksFromFirestore,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
