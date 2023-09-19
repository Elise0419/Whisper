import React, { Component } from "react";

import Header from "./Block/Header";
import Footer from "./Block/Footer";
import love from "./Img/love4.png";

function Secreat() {
  return (
    <div>
      <Header />
      <div>
        <img src={love} />
      </div>
      <Footer />
    </div>
  );
}

export default Secreat;
