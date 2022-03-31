import React from "react";
import useAuth from "../hooks/useAuth";

function Home() {
  const { auth } = useAuth();
  return (
    <div className="container mt-5 text-center alert alert-primary">
      {auth ? <h1>{auth.firstName}'s home</h1> : <h1>Home</h1>}
    </div>
  );
}

export default Home;
