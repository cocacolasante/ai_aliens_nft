import { useEffect, useState } from 'react';
import './App.css';
import logo from "./assets/AC2.png"
import { ethers } from 'ethers';
import {networks} from "./utils/networks"
import contractAbi from "./utils/contractAbi.json"


function App() {

  const CONTRACT_ADDRESS ="0x855d3c8076df8eB859A14A47c4A2503364919A59"

  const [account, setAccount] = useState("")
  const [network, setNetwork] = useState("")
  const [tokensMinted, setTokensMinted] = useState("")

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

    if(accounts.length !== 0){
      const currentAccount = accounts[0]
      setAccount(currentAccount)
      console.log(`Connected to ${currentAccount}`)
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

        if(receipt.status === 1){
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
    if(network === "Polygon Mumbai Testnet"){
      fetchTokenCount();
    }
    checkIfWalletIsConnected();
  },[account, network, tokensMinted])

  const renderMintButton = () => {
    if(network !== "Polygon Mumbai Testnet"){
      return (
        <div>
          <h4 className='switch-header'>Please Connect To Polygon Testnet</h4>
        </div>
      )
    } 
    return (
      <div>
        <button onClick={mintNFT} className='standard-button wallet-connect-btn'>Mint Now</button>
      </div>
    )
  }

  const renderConnectButton = () => {
    if(!account){
      return (
        <div className='button-container'>
          <button onClick={connectWallet} className='wallet-connect-btn standard-button'>Connect Wallet</button>
      </div>
      )
    }else{
    return (
      <div className='button-container'>
        <button onClick={null} className='wallet-connect-btn standard-button'><p> Wallet: {account.slice(0, 6)}...{account.slice(-4)} </p></button>
      </div>
    )
  }
  }

  const fetchTokenCount = async () =>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const NFTContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer)
        
        console.log("connected to contract")

        let tokenCount = await NFTContract.getTokenCount();
        

        setTokensMinted(tokenCount)

      }
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div className='nav-container'>
        <div className='logo-div'>
          <img className='logo' src={logo} alt='logo' />
        </div>
        {renderConnectButton()}
      </div>
      <div>
        <div className='header-container'>
          <h1 className='header'>Mint Your AI Alien Today!!</h1>
          <h2>{tokensMinted.toString()} out of 75 Minted!</h2>
          <h4>Free Mint!!</h4>
          
          

          {renderMintButton()}
          
          
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
