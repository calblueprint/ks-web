import React from 'react';
import 'react-table-v6/react-table.css';
import '@styles/App.css';

class About extends React.PureComponent {
  render() {
    return (
      <div className="about-page">
        <div className="cont">
          <h1>About</h1>
          <div className="about-card">
            <h2>Blueprint, Technology for Non-profits</h2>
            <p>
              This project is kickstarted off the ground with a team of
              developers from Blueprint (Berkeley). Blueprint, Technology for
              Non-profits (Berkeley) is a club at UC Berkeley that aims to make
              beautiful engineering accessible and useful for those who create
              communities and promote public welfare.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
