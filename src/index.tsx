// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import firebase from "firebase";
import { App } from "./App";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);
firebase.analytics();
var db = firebase.firestore();

ReactDOM.render(<App db={db} />, document.getElementById("root"));
