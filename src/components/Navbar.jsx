import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-fuchsia-200 mb-2">
        <nav className="flex justify-between p-2.5">
          <div className="logo px-2.5 font-bold text-lg">
            <a href="">
              <span>iTodo</span>
            </a>
          </div>
          <div className="lists">
            <ul className="list-none flex gap-4 px-2.5">
              <a href="">
                <li>Home</li>
              </a>
              <a href="">
                <li>About</li>
              </a>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
