// // HOC/withAuth.jsx
// import { useRouter } from "next/router";
// import React, { useEffect } from "react";
// const withAuth = (WrappedComponent: any) => {
//   const Router = useRouter();
//   useEffect(() => {
    
//     const accessToken = localStorage.getItem("accessToken");

//     // If there is no access token we redirect to "/" page.
//     if (!accessToken) {
//       Router.push("/login");
//       return null;
//     }
//   }, []);

//   // If this is an accessToken we just render the component that was passed with all its props

//   return <WrappedComponent {...props} />;
// };

// export default withAuth;
