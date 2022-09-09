import { useEffect, useState } from 'react';
import './App.css';
import logo from "./assets/AC2.png"
import { ethers } from 'ethers';
import {networks} from "./utils/networks"
import contractAbi from "./utils/contractAbi.json"
import 'bootstrap/dist/css/bootstrap.min.css';

import NftCards from './components/NftCard';


function App() {

  const CONTRACT_ADDRESS ="0xA79e5A78B78568f716b543aA02E7ad930d86d581"

  const [account, setAccount] = useState("")
  const [network, setNetwork] = useState("")
  const [tokensMinted, setTokensMinted] = useState("")
  // const [nftList, setNftList] = useState([])



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
          alert(`NFT Minted https://polygonscan.com/tx/${txn.hash}`)
          console.log("Mint Successful!")

        } else {
          alert("Transaction failed, please try again")
        }


      }

    }catch(error){
      console.log(error)
    }
    fetchTokenCount();
  }

  useEffect(()=>{
    if(network === "Polygon Mainnet"){
      fetchTokenCount();
    }
    checkIfWalletIsConnected();
  },[account, network])

  const renderMintButton = () => {
    if(network !== "Polygon Mainnet"){
      return (
        <div>
          <h4 className='switch-header'>Please Connect To Polygon Mainnet</h4>
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

        let tokenCount = await NFTContract.getTokenCount();
        
        setTokensMinted(tokenCount)
        console.log("token count updated")
      }
    } catch(error){
      console.log(error)
    }
  }

  // const fetchTokenURIList = async () => {
  //   try{
  //     const {ethereum } = window;

  //     if(ethereum){
  //       const provider = new ethers.providers.Web3Provider(ethereum)
  //       const signer = provider.getSigner()
  //       const NFTContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer)

  //       console.log("contract connected")
        

  //       let totalTokens = await NFTContract.tokenCount();
  //       const nftListArray = []

  //       for(let i = 0; i < totalTokens; i++ ){

  //         nftListArray.push(await NFTContract.tokenUriList(i));
  //         console.log(await NFTContract.tokenUriList(i))
          
  //       }
  //       setNftList(nftListArray)
        
  //     }
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

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
            <h1 className='header gradient-text'>Mint Your AI Alien Today!!</h1>
            <h2 className='gradient-text'>{tokensMinted.toString()} out of 75 Minted!</h2>
            <h4 className='gradient-text'>Free Mint!!</h4>
            
            

            {renderMintButton()}
            
            
          </div>
          <div>
              <h2 className='gradient-text'>Recent Mints!</h2>
              
              <NftCards />
              

          </div>
        </div>
      
      
        <footer><p className='gradient-text'>Built By Crypted Sante</p></footer>
        
      </div>
  );
}

export default App;
