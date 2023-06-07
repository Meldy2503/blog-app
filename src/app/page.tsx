"use client";
import React from "react";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";
import AboutUs from "./components/home/about-us";
import Connect from "./components/home/connect";
import Features from "./components/home/features";
import LandingPage from "./components/home/landing-page";
import Join from "./components/home/join";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <AboutUs />
      <Features />
      <Join />
      <Connect />
      <Footer />
    </>
  );
}
