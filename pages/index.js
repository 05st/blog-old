import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

import "firebase/firestore";
import firebase from "../config/firebase-config";

function PostListing({title, date, description, id}) {
  return (
    <div className="p-4 rounded border w-full space-y-2">
      <div className="flex flex-row space-x-4 items-center">
        <Link href={"/posts/" + id}>
          <a className="font-bold hover:underline"><h2>{title}</h2></a>
        </Link>
        <p className="text-sm">{date}</p>
      </div>
      <p>{description}</p>
    </div>
  );
}

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("posts").get().then((q) => {
      let tempPosts = [];
      q.forEach((d) => {
        let toPush = d.data();
        toPush["id"] = d.id;
        tempPosts.push(toPush);
      });
      return tempPosts;
    }).then((ps) => setPosts(ps.sort((a, b) => a.date < b.date)));
  }, []);

  return (
    <div className="flex flex-col w-full space-y-6 md:w-1/2 p-6 pt-2 items-center">
      <h1 className="font-bold text-lg">Recent Posts</h1>
      { posts.map((data, id) => <PostListing {...data} />) }
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative top-20">
      <Head>
        <title>Recent Posts | Blog</title>

        <meta property="og:title" content="Recent Posts | Blog" key="title"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="blog.stimsina.com"/>
        <meta property="og:description" content="Posts about computer science, programming, mathematics, or anything else I am currently interested in."/>
      </Head>
      <div className="w-full flex flex-col items-center">
        <PostList />
      </div>
    </div>
  );
}
