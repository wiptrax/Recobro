require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  setting: {
    optimizer: {
      enable: true
    }
  },
  allowUnlimitedContractSize: true,
  defaultNetwork: "polygon_zkEVM_cardona",
  networks: {
    hardhat: {},

    polygon_zkEVM_mainnet: {
      url: `${process.env.POLYGON_ZKEVM_MAINNET_API_URL}`,
      accounts: [process.env.YOUR_PRIVATE_KEY],
    },

    polygon_zkEVM_cardona: {
        url: `${process.env.POLYGON_ZKEVM_CARDONA_API_URL}`,
        accounts: [process.env.YOUR_PRIVATE_KEY]
    },

    base_mainnet: {
      url: `${process.env.BASE_MAINNET_API_URL}`,
      accounts: [process.env.YOUR_PRIVATE_KEY],
      gasPrice: 1000000000,
    },

   base_sepolia : {
        url: `${process.env.BASE_SEPOLIA_API_URL}`,
        accounts: [process.env.YOUR_PRIVATE_KEY],
        gasPrice: 20000000000,
    }

  },
  etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`
	},
	paths: {
		artifacts: '../artifacts'
	}
};