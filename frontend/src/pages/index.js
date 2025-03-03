import Head from "next/head";
import "../styles/globals.css";
import { useVerifyUser } from "@/helpers";

export default function Home() {
  useVerifyUser();

  return (
    <div>
      <Head>
        <title>ToDo Application</title>
        <meta name="description" content="This is a simple ToDo application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
