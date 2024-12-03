
// config/index.tsx

import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, polygonZkEvmCardona, baseSepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = '1ba65c052abca424426d1a2fbbde6bac'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [polygonZkEvmCardona, baseSepolia]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  auth: {
    email: true,
    socials: ["google"],
    showWallets : false,
    walletFeatures: true
  },
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig