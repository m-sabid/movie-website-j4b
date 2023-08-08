"use client";

import { useEffect, useState } from "react";

const AddIndustry = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users").then(res=>res.json()).then(data=>console.log(data))
  }, []);

  return (
    <>
      <h1>Hello{}</h1>
    </>
  );
};

export default AddIndustry;
