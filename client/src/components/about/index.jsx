import React from "react";
import logoJavaScript from "../../assets/javascript.png";
import logoHtml from "../../assets/html.png";
import logoCss from "../../assets/css.png";
import logoReact from "../../assets/reactjs.png";
import logoRedux from "../../assets/redux.png";
import logoNode from "../../assets/nodejs.png";
import logoPostgrest from "../../assets/postgressql.png";
import logoExpress from "../../assets/express.png";
import logoGitHub from "../../assets/github.png";
import logoTypeScript from "../../assets/typeScript.png";
import logoVite from "../../assets/Vitejs-logo.svg.png";
import "./index.css";

function About() {
  return (
    <main>
      <section className="section-skill">
        <p className="text_about_presentation">
          Individual project presented for soy Henrry, worked with technologies
          such as REACT, REDUX, NODEJS, EXPRESS, SEQUELIZE, POSTGRESSQL, created
          with a lot of dedication and many hours of practice, the application
          contains.
        </p>
        <h3>SKILLS</h3>
        <p className="text_about_skills">
          I have a wide range of skills that I am constantly expanding.
        </p>
        <p className="text_about_skills">
          With +800 hours of programming based on practices and real projects
          applying this knowledge.
        </p>
        <div className="content-all">
          <div className="content-carrousel">
            <figure>
              <img src={logoJavaScript} alt="logo Javascript" />
              <p>JavaScript</p>
            </figure>
            <figure>
              <img src={logoHtml} alt="logo Html" />
              <p>HTML</p>
            </figure>
            <figure>
              <img src={logoCss} alt="logo Css" />
              <p>CSS</p>
            </figure>
            <figure>
              <img src={logoGitHub} alt="logo GitHub" />
              <p>GitHub</p>
            </figure>
            <figure>
              <img src={logoReact} alt="logo React" />
              <p>React</p>
            </figure>
            <figure>
              <img src={logoRedux} alt="logo Redux" />
              <p>Redux</p>
            </figure>
            <figure>
              <img src={logoTypeScript} alt="logo Typescript" />
              <p>TypeScript</p>
            </figure>
            <figure>
              <img src={logoNode} alt="logo Node" />
              <p>Node.js </p>
            </figure>
            <figure>
              <img src={logoExpress} alt="logo Express" />
              <p>Express</p>
            </figure>
            <figure>
              <img src={logoPostgrest} alt="logo Postgress" />
              <p>Postgress</p>
            </figure>
            <figure>
              <img src={logoVite} alt="logo Postgress" />
              <p>Vite</p>
            </figure>
          </div>
        </div>
        <div className="container-technologies"></div>
      </section>
    </main>
  );
}

export default About;
