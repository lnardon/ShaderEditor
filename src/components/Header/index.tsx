import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <img className="logo" src="./icon.png" alt="Logo" />
        <h1 className="title">GLSL Shader Editor</h1>
      </div>
      <div
        className="github-btn"
        onClick={() =>
          window.open("https://github.com/lnardon/ShaderEditor", "_blank")
        }
      >
        <img className="github-logo" src="./logo.png" alt="Github Logo" />
        View on Github
      </div>
    </header>
  );
};

export default Header;
