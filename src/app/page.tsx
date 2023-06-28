"use client";
import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AboutUs from "./components/home/about-us";
import Connect from "./components/home/connect";
import Features from "./components/home/features";
import LandingPage from "./components/home/landing-page";
import Join from "./components/home/join";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <LandingPage />
      <AboutUs />
      <Features />
      <Join />
      <Connect />
      <Footer />
    </Box>
  );
}
