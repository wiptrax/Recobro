const { ethers } = require("hardhat");

async function main() {

  const Contract= await ethers.getContractFactory("LostAndFound");
    console.log("Deploying your contract, please Wait.....");

    const contract = await Contract.deploy();

	await contract.waitForDeployment();
	console.log("Contract deployed to:", await contract.getAddress());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
