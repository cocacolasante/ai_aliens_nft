import './App.css';
import logo from "./assets/AC.png"


function App() {

  return (
    <div className="App">
      <div className='nav-container'>
        <div className='logo-div'>
          <img className='logo' src={logo} alt='logo' />
        </div>
        <div className='button-container'>
          <button className='wallet-connect-btn'>Connect Wallet</button>
        </div>
      </div>
      <div>
        <div className='header-container'>
          <h1 className='header'>Mint Your AI Alien Today!!</h1>
          <h4>Free Mint</h4>
        </div>
        <div>
            <h2>Recent Mints!</h2>
        </div>
      </div>
     
     
      <footer>Built By Crypted Sante</footer>
      
    </div>
  );
}

export default App;
