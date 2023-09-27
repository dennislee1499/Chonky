import github from "./github.png"



export default function Footer() {
  return (
    <>
      <div className="footer-divider"></div>
      <div className="footer-container">
        <p>Copyright 2023, Chonky CEO: Dennis Lee</p>
        <a href="https://github.com/dennislee1499" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="Github Icon" className="github-icon"></img>
        </a>
      </div>
    </>
  );
}


