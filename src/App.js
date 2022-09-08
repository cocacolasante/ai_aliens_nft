import { useEffect, useState } from 'react';
import './App.css';
import logo from "./assets/AC2.png"
import { ethers } from 'ethers';
import {networks} from "./utils/networks"
import contractAbi from "./utils/contractAbi.json"


function App() {

  const CONTRACT_ADDRESS ="0x5FbDB2315678afecb367f032d93F642f64180aa3"

  const [account, setAccount] = useState("")
  const [network, setNetwork] = useState("")

  const connectWallet = async () => {
    try {

      const {ethereum} = window;

      if(!ethereum){
        alert("Please install Metamask")
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"})
      setAccount(accounts[0])
      console.log(`Account connected: ${accounts[0]}`)

    } catch(error){
      console.log(error)
    }
  }

  const checkIfWalletIsConnected = async () => {

    const {ethereum} = window;

    if(!ethereum){
      console.log("Please install ethereum")
      return;
    } else {
      console.log("Ethereum object found")
    }

    const accounts = await ethereum.request({method: "eth_accounts"})

    if(accounts.length !=0){
      const account = accounts[0]
      setAccount(account)
      console.log(`Connected to ${account}`)
    } else{
      console.log("No accounts authorized or connected")
    }

    const chainId = await ethereum.request({method: "eth_chainId"})
    setNetwork(networks[chainId])

    ethereum.on('chainChanged', handleChainChanged);

		function handleChainChanged(_chainId) {
			window.location.reload();
		}
  }

  const mintNFT = async ()=>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const NFTContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer)

        console.log("Loading Metamask to pay for gas")

        let txn = await NFTContract.mint()
        const receipt = await txn.wait()

        if(receipt.status == 1){
          alert(`NFT Minted https://mumbai.polygonscan.com/tx/${txn.hash}`)
          console.log("Mint Successful!")

        } else {
          alert("Transaction failed, please try again")
        }


      }

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    checkIfWalletIsConnected();
  },[])

  return (
    <div className="App">
      <div className='nav-container'>
        <div className='logo-div'>
          <img className='logo' src={logo} alt='logo' />
        </div>
        <div className='button-container'>
          <button onClick={connectWallet} className='wallet-connect-btn standard-button'>Connect Wallet</button>
        </div>
      </div>
      <div>
        <div className='header-container'>
          <h1 className='header'>Mint Your AI Alien Today!!</h1>
          <h4>Free Mint</h4>
          <button onClick={mintNFT} className='standard-button wallet-connect-btn'>Mint Now</button>
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
