<template>
  <div class="min-h-screen bg-gray-900">
    <nav class="bg-gray-800 p-4">
      <ul class="flex space-x-4 justify-center">
        <li><router-link to="/advertisements" class="nav-link">Advertisements</router-link></li>
        <li><router-link to="/airdrop" class="nav-link">Airdrop</router-link></li>
        <li><router-link to="/burn" class="nav-link">Burn</router-link></li>
        <li><router-link to="/governance" class="nav-link">Governance</router-link></li>
        <li><router-link to="/staking" class="nav-link">Staking</router-link></li>
        <li><router-link to="/delegation" class="nav-link">Delegation</router-link></li>
        <li><router-link to="/bl2p" class="nav-link">BL2P</router-link></li>
      </ul>
    </nav>
    <div class="p-4">
      <button v-if="!account" @click="connectWallet" class="futuristic-button">Connect Wallet</button>
      <span v-else class="text-cyan-400">Connected: {{ account.substring(0, 6) + '...' + account.substring(account.length - 4) }}</span>
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ethers } from 'ethers';
import TAAMS_ABI from './TAAMS_ABI.json';

export default {
  name: 'App',
  setup() {
    const contract = ref(null);
    const account = ref(null);

    async function connectWallet() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          const signer = provider.getSigner();
          account.value = await signer.getAddress();

          const network = await provider.getNetwork();
          if (network.chainId !== 137) {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x89' }],
            });
          }

          contract.value = new ethers.Contract(
            '0xbAC8aC29CddD32997D7dDA8cc27DAB261327e1Ef',
            TAAMS_ABI,
            signer
          );
        } catch (error) {
          console.error('Erreur de connexion:', error);
          alert('Erreur: ' + error.message);
        }
      } else {
        alert('Veuillez installer MetaMask');
      }
    }

    return {
      connectWallet,
      account,
    };
  },
};
</script>