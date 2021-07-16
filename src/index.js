import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        <button class="font-bold underline">{props.title}</button>
        <p class="text-sm">{props.date}</p>
      </div>
      <p class="pl-4">{props.desc}</p>
    </div>
  )
}

var listdata = [{
    title: "testing",
    date: "2021-07-16",
    desc: "testing description"
  }, {
    title: "testing2",
    date: "2021-07-15",
    desc: "testing desc2"
  }
];

function PostList(props) {
  return (
    <div class="w-full content-center p-6 space-y-6 relative h-auto top-12">
      {props.data.map((p, i) => <PostListing title={p.title} date={p.date} desc={p.desc}/>)}
    </div>
  );
}

function App() {
  return (<>
    <Topbar />
  </>);
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
