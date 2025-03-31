import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-800 bg-black text-zinc-400">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="hover:text-zinc-300 transition-colors">© {currentYear} NewsNow. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed by{" "}
            <a
              href="https://shuvm.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors duration-300"
            >
              @whoshubhamsinha
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
