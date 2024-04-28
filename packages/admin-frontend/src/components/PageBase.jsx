// components/PageBase.js

import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold">Про тебя</h1>
        {/* Additional navigation items can be added here */}
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-800 p-4 text-white">
      <div className="container mx-auto text-center">
        <p>2023 potapov.tech</p>
      </div>
    </footer>
  );
};

const PageBase = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex">{children}</main>
      <Footer />
    </div>
  );
};

export default PageBase;
