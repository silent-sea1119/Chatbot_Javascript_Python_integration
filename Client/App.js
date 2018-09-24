import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

class App extends Component {


  state  = {
          a: '',
            }


  textInput =  () => {

      const reviewText = document.getElementById('review-text');
      const text =  reviewText.value;
      console.log("TEXT: ", text);

      this.setState({a: text});
      const str3 = "/api/user/" + `${text}`

      axios.get(str3)
      .then( response =>{
/*      console.log(response.data)*/
      let z = response.data;
      z = z.replace(/{|}|\'/g,'');
      console.log("RE: ", z);
      this.setState({a: z});

    })

  };  


  render() {
    return (

    <div > 
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            {this.state.a}
        </p>
      </div>

      <div >
         <form  >
              <textarea  id = 'review-text' name="input" cols="80" rows="5" placeholder="Type"></textarea>
              <p id = "submit" type="submit"  onClick = {this.textInput} >Submit</p>
         </form>
      </div>      

    </div> 
          
    );
  }
}

export default App;
