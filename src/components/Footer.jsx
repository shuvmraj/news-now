import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} NewsNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;