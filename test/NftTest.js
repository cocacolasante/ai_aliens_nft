const { expect } = require("chai");
const { ethers } = require("hardhat");

require('chai')
    .use(require('chai-as-promised'))
    .should()

describe("AINFTCollection", function () {

  let APCollection

  beforeEach(async () => {
    
    const APContract = await ethers.getContractFactory("APCollection");
    APCollection = await APContract.deploy();
    await APCollection.deployed();
    
    // console.log("AI NFT collection was deployed to:", APCollection.address);
  }) 
  it("Should return collection name and symbol", async () => {
    expect(await APCollection.name()).to.equal("AI Aliens")
    expect(await APCollection.symbol()).to.equal("AIA")
  })

  it("Should mint NFT with tokenID 1", async function () {
    
    const [user1] = await ethers.getSigners();
    await APCollection.connect(user1).mint()
    await APCollection.connect(user1).mint()
    await APCollection.connect(user1).mint()

    result = await APCollection.ownerOf(1)
    console.log(result)
    result.should.equal(user1.address)
  });
  it("Checks the token uri was set", async () => {
    const [user1] = await ethers.getSigners();
    await APCollection.connect(user1).mint()
    expect(await APCollection.tokenURI(1)).to.equal("https://ipfs.io/ipfs/QmbMiN9qC3MeZqyv7hpRXAKTYN6YpKj9Rbcp7b9eiwK7cY/1.json")
  })
  it("checks the token uri list for the correct uri", async () => {
    const [user1] = await ethers.getSigners();
    await APCollection.connect(user1).mint()

    expect(await APCollection.tokenUriList(1)).to.equal("https://ipfs.io/ipfs/QmbMiN9qC3MeZqyv7hpRXAKTYN6YpKj9Rbcp7b9eiwK7cY/1.json")
  })
  // it("Should burn a token", async () => {
  //   const [user1] = await ethers.getSigners();
  //   await APCollection.connect(user1).mint()
  //   await APCollection.connect(user1).mint()
  //   expect(await APCollection.NFTOwner(user1.address)).to.equal(2)

  //   await APCollection.connect(user1).burn(1)
  //   expect(await APCollection.NFTOwner(user1.address)).to.equal(1)

  // })
});