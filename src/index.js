import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"
import "github-markdown-css";
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

function Topbar() {
  return (
    <div class="fixed z-20 flex flex-col items-center w-full bg-gray-50 shadow">
      <div class="flex flex-row items-center h-12 pl-2 space-x-6 text-center">
        <h1 class="font-bold">blog.stimsina.com</h1>
        <a href="/">Recent Posts</a>
        <div class="flex">
          <input class="w-full pl-2" type="text" placeholder="Search"/>
          <button class="bg-white w-auto flex justify-end items-center p-2">→</button>
        </div>
      </div>
    </div>
  );
}

function PostListing(props) {
  return (
    <div class="w-1/2 flex p-2 shadow">
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
    <div class="w-full flex flex-col items-center p-6 space-y-6 relative h-auto top-12">
      {props.data.map((p, i) => <PostListing title={p.title} date={p.date} desc={p.description} func={props.func} id={i}/>)}
    </div>
  );
}

function Post(props) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(props.data.content).then((r) => {
      if (!r.ok) throw new Error("HTTP Error: " + r.status);
      return r.text();
    }).then((md) => setMarkdown(md));
  }, [props.data.content]);

  return (
    <div class="relative p-6 pt-16 w-full flex flex-col items-center">
      <p class="text-sm text-gray-300">{props.data.title} ({props.data.date})</p>
      {markdown ? <div class="markdown-body pt-6 w-1/2">
        <ReactMarkdown remarkPlugins={[gfm]} linkTarget="_blank">{markdown}</ReactMarkdown>
      </div> : <p class="pt-6 font-bold">Loading</p>}
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState(0);
  const [curr, setCurr] = useState(-1);

  useEffect(() => {
    db.collection("posts").get().then((querySnapshot) => {
      let ps = [];
      querySnapshot.forEach((doc) => ps.push(doc.data()))
      return ps;
    }).then((ps) => setPosts(ps.reverse()));
  }, []);

  let content;
  if (curr >= 0 && posts) {
    content = <Post data={posts[curr]}/>;
  } else if (posts) {
    content = <PostList data={posts} func={(id) => {
      setCurr(id);
    }}/>;
  }

  return (<>
    <Topbar />
    {content ? content : <div class="relative flex flex-col pt-16 w-full items-center"><p class="font-bold">Loading</p></div>}
  </>);
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
