import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

const Fullpage = () => (
  <ReactFullpage
    //fullpage options
    licenseKey = {'YOUR_KEY_HERE'}
    scrollingSpeed = {500} /* Options here */

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section">
                <p>Section 1 (welcome to fullpage.js)</p>
                <button onClick={() => fullpageApi.moveSectionDown()}>Click me to move down4 </button>
          </div>
          <div className="section">
                <p>Section 2</p>
          </div>
          <div className="section">
                <p>Section 3 </p>
                <button onClick={() => fullpageApi.moveSectionDown()}>Click me to move down3 </button>
          </div>
          <div className="section">
                <p>Section 4</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default Fullpage