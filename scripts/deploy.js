
const hre = require("hardhat");

async function main() {
  const ContractFactory = await hre.ethers.getContractFactory("APCollection");
  const AIContract = await ContractFactory.deploy();
  await AIContract.deployed();
  const deployer = await AIContract.admin();
  console.log(`Contract deployed at ${AIContract.address} by ${deployer}`)

  let txn = await AIContract.mint();
  await txn.wait();
  console.log(`NFT minted ${txn.hash}`)

  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
