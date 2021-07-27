import Head from "next/head";
import { useState, useEffect } from "react";

import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {okaidia as syntaxTheme} from "react-syntax-highlighter/dist/cjs/styles/prism";
import gfm from "remark-gfm";

import firebase from "../../config/firebase-config";
import "firebase/firestore";

function CodeBlock({node, inline, className, children, ...props}) {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <SyntaxHighlighter style={syntaxTheme} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export default function Post(props) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("https://firebasestorage.googleapis.com/v0/b/blog-database-72722.appspot.com/o/" + props.content + "?alt=media").then((r) => {
      if (!r.ok) throw new Error("HTTP Error: " + r.status);
      return r.text();
    }).then((md) => setMarkdown(md));
  }, []);

  return (
    <>
      <Head>
        <title>{props.title} | Blog</title>
      </Head>
      <div className="relative flex flex-col w-full p-6 top-16 items-center space-y-6">
        <p className="text-sm text-gray-300">{props.title} ({props.date})</p>
        { markdown ?
          <div className="markdown-body lg:w-1/2 w-full">
            <Markdown remarkPlugins={[gfm]} components={{code: CodeBlock}} linkTarget="_blank">{markdown}</Markdown>
          </div>
          : <p className="font-bold text-lg">Loading</p> }
        
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  let data = {};
  await firebase.firestore().collection("posts").doc(query.id).get().then((d) => {
    data["content"] = d.data().content;
    data["title"] = d.data().title;
    data["date"] = d.data().date;
  });
  return {
    props: {
      content: data.content,
      title: data.title,
    }
  };
}
