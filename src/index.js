import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import avatar from './res/avatar.png';
import github from './res/github.png';
import twitter from './res/twitter.png';

function NavLink(props) {
  return (
    <a class="group block text-xl" href={props.link} target={props.newtab ? "_blank" : ""} rel="noreferrer">
      {props.children}
      {props.hover && <div class="w-full h-1/6 bg-black transition duration-100 opacity-0 group-hover:opacity-100"/>}
    </a>
  );
}

function Brand() {
  return <h1 class="font-bold text-xl">SAMI TIMSINA</h1>;
}

function TopBar() {
  return (
    <div class="z-20 fixed w-full flex p-4 space-x-6 bg-gray-50 shadow text-center">
      <Brand/>
      <NavLink link="" hover={true}>Home</NavLink>
      <NavLink link="" hover={true}>About</NavLink>
      <NavLink link="https://github.com/05st" newtab={true}>
        <img class="transition duration-100 opacity-50 hover:opacity-100" src={github} alt="GitHub"/>
      </NavLink>
      <NavLink link="https://twitter.com/__05st" newtab={true}>
        <img style={{width: 32, height:32}} class="transition duration-100 opacity-50 hover:opacity-100" src={twitter} alt="Twitter"/>
      </NavLink>
    </div>
  );
}

function LandingPage() {
  return (
    <div class="flex w-full min-h-screen grid grid-rows-3 bg-gradient-to-r from-blue-400 via-gray-100 to-gray-200">
      <div class="col-span-3 mx-auto mt-36 w-96 h-96 p-4 bg-gray-50 rounded-full shadow-2xl transition duration-200 transform hover:scale-105">
        <img class="rounded-full" src={avatar} alt="Avatar"/>
      </div>
      <div class="col-span-3 h-16 mx-auto mt-24 p-4 bg-gray-50 rounded-3xl shadow-inner">
        <h1 class="text-xl text-center">Lorem <span class="font-bold">ipsum</span> dolor sit amet, consectetur adipiscing elit.</h1>
        <p class="font-bold opacity-50 text-center mt-16">KEEP SCROLLING<br/>↓</p>
      </div>
    </div>
  );
}

function App() {
  return (<>
    <TopBar/>
    <LandingPage/>
    <div class="w-full h-36 bg-gray-200">
      <h1>Bonjour</h1>
    </div>
  </>);
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
