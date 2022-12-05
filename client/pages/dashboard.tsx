import React, { useEffect } from "react";
import Layout from "../components/layouts";
import { useSession, signIn, signOut } from "next-auth/react";
import moment from "moment";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  // const { data: session } = useSession();
  const [cookies, setCookie] = useCookies();

  // if (session) {
  //   return (
  //     <Layout>
  //       <div>dashboard</div>
  //       <>
  //         <pre>{JSON.stringify(session, null, 2)}</pre>
  //         <h1>{moment(session.expires).format("MMMM Do YYYY, h:mm:ss a")}</h1>
  //         <button onClick={() => signOut()}>Sign out</button>
  //       </>
  //     </Layout>
  //   );
  // }
  // function getCookie(key: string) {
  //   var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  //   return b ? b.pop() : "";
  // }

  // useEffect(() => {
  //   let value = getCookie("jwt");
  //   console.log(value);
  // }, []);

  return (
    <div>
      <h1>hello</h1>
      <pre>{JSON.stringify(cookies, null, 2)}</pre>
      {cookies.jwt && <p>{cookies.jwt}</p>}
    </div>
  );
};

export default Dashboard;
