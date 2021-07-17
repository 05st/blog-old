import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import "./index.css";

import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyA7LvSSHQf9MkGQwHAKNzm_B1EfVZu8hgU",
  authDomain: "blog-database-72722.firebaseapp.com",
  projectId: "blog-database-72722",
  storageBucket: "blog-database-72722.appspot.com",
  messagingSenderId: "938125379165",
  appId: "1:938125379165:web:983b7e6ebb0ba1e9786fb4",
  measurementId: "G-1M4T5GXLF8"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let loaded_posts = false;
let loaded_md = false;

async function getPosts() {
  let posts = [];
  await db.collection("posts").get().then((querySnapshot) => querySnapshot.forEach((doc) => posts.push(doc.data())));
  loaded_posts = true;
  return posts;
}

async function getMarkdown(link) {
  let md = "";
  await fetch(link).then((r) => {
    if (!r.ok) throw new Error("HTTP Error: " + r.status);
    md = r.text();
  });
  loaded_md = true;
  return md;
}

function Topbar() {
  return (
    <div class="fixed w-full h-12 flex pl-2 space-x-6 bg-gray-50 shadow items-center text-center">
      <h1 class="font-bold">blog.stimsina.com</h1>
      <a href="/">Recent Posts</a>
      <div class="flex">
        <input class="w-full rounded pl-2" type="text" placeholder="Search"/>
        <button class="bg-white w-auto rounded flex justify-end items-center p-2">
          <i>search</i>
        </button>
      </div>
    </div>
  );
}

function PostListing(props) {
  return (
    <div class="w-full flex p-2 shadow">
      <div class="items-center">
        <button onClick={() => props.func(props.id)} class="font-bold underline">{props.title}</button>
        <p class="text-sm">{props.date}</p>
      </div>
      <p class="pl-4">{props.desc}</p>
    </div>
  )
}

function PostList(props) {
  return (
    <div class="w-full content-center p-6 space-y-6 relative h-auto top-12">
      {props.data.map((p, i) => <PostListing title={p.title} date={p.date} desc={p.description} func={props.func} id={i}/>)}
    </div>
  );
}

function Post(props) {
  const [markdown, setMarkdown] = useState("");

  if (!loaded_md) getMarkdown(props.data.content).then((c) => setMarkdown(c));
  console.log(markdown);

  return (
    <div class="relative top-12 p-6">
      <p class="text-gray-300">{props.data.title} ({props.data.date})</p>
      {markdown && <ReactMarkdown linkTarget="_blank" children={markdown}/>}
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState(0);
  const [curr, setCurr] = useState(-1);

  if (!loaded_posts) getPosts().then((q) => setPosts(q));

  let content;
  if (curr >= 0 && posts) {
    content = <Post data={posts[curr]}/>
  } else if (posts) {
    content = <PostList data={posts} func={(id) => {
      loaded_md = false;
      setCurr(id);
    }}/>;
  }

  return (<>
    <Topbar />
    {content}
  </>);
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
