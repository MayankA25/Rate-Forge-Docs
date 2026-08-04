import Header from "@/components/Header/Header";
import HomePage from "@/components/HomePage/HomePage";
import MainComponent from "@/components/MainComponent/MainComponent";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <MainComponent>
        <div className="">
          <HomePage />
        </div>
      </MainComponent>
    </>
  );
}
