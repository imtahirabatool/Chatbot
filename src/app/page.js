// pages/index.js
import Head from "next/head";
import Chatbot from "../components/Chatbot";

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Customer Support</title>
        <meta name="description" content="AI Chatbot using Gemini API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold mb-4">AI Customer Support</h1>
        <Chatbot />
      </main>
    </div>
  );
}
