import React from 'react';
import '../css/App.css';

import pic1 from '../assets/1.jpg'
import pic2 from '../assets/2.jpg'
import pic3 from '../assets/3.jpg'
import pic4 from '../assets/4.jpg'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {

    return (
	  <div className="App">
	  	<div className="demo">
		</div>
		<div className="demo">
		</div>
		<div class="wrap-box">
			<div class="box-content">
				<div class="l-front"> <img src={pic1} alt="1" /></div>
				<div class="l-left"> <img src={pic2} alt="1" /></div>
				<div class="l-back"> <img src={pic3} alt="1" /></div>
				<div class="l-right"> <img src={pic4} alt="1" /></div>
				<div class="m-front"> <img src={pic1} alt="1" /></div>
				<div class="m-left"> <img src={pic2} alt="1" /></div>
				<div class="m-back"> <img src={pic3} alt="1" /></div>
				<div class="m-right"> <img src={pic4} alt="1" /></div>
				<div class="s-front"> <img src={pic1} alt="1" /></div>
				<div class="s-left"> <img src={pic2} alt="1" /></div>
				<div class="s-back"> <img src={pic3} alt="1" /></div>
				<div class="s-right"> <img src={pic4} alt="1" /></div>
			</div>
		</div>

		<pre>
		</pre>
	  </div>
    );
  }
}


export default App;
