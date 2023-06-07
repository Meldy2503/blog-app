"use client";
import React from "react";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";
import Wrapper from "./components/wrapper/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>blog post</h1>
      </Wrapper>
      <Footer />
    </>
  );
}
