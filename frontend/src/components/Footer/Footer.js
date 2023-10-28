import github from "./github.png"
import linkedin from "./linkedin.png"



export default function Footer() {
  return (
    <>
      <div className="footer-divider"></div>
        <div className="footer-container">
          <p>Copyright 2023, Chonky CEO: Dennis Lee</p>
          <div className="icon-container">
            <a href="https://github.com/dennislee1499" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="Github Icon" className="github-icon"></img>
            </a>
            <a href="https://www.linkedin.com/in/dennislee-/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="Linkedin Icon" className="linkedin-icon"></img>
            </a>
          </div>
        </div>
    </>
  );
}


