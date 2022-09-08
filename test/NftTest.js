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
    
    console.log("AI NFT collection was deployed to:", APCollection.address);
  }) 
  it("Should return collection name and symbol", async () => {
    expect(await APCollection.name()).to.equal("AI Aliens")
    expect(await APCollection.symbol()).to.equal("AIA")
  })

  it("Should mint NFT with tokenID 1", async function () {
    
    const [user1] = await ethers.getSigners();
    await APCollection.connect(user1).mint()

    result = await APCollection.ownerOf(1)
    result.should.equal(user1.address)
  });
  it("Should burn a token", async () => {
    const [user1] = await ethers.getSigners();
    await APCollection.connect(user1).mint()
    await APCollection.connect(user1).mint()
    expect(await APCollection.NFTOwner(user1.address)).to.equal(2)

    await APCollection.connect(user1).burn(1)
    expect(await APCollection.NFTOwner(user1.address)).to.equal(1)

  })
});