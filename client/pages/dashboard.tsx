import React from "react";
import Layout from "../components/layouts";
import { useSession, signIn, signOut } from "next-auth/react";
import moment from "moment";

const dashboard = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <Layout>
        <div>dashboard</div>
        <>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <h1>{moment(session.expires).format("MMMM Do YYYY, h:mm:ss a")}</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      </Layout>
    );
  }
};

export default dashboard;
