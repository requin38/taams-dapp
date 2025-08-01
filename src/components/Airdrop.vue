<template>
  <div class="futuristic-card">
    <h2 class="text-2xl font-bold text-cyan-400">🎁 Gagnez des TAAMS !</h2>
    <p class="text-white">Participez à l'airdrop exclusif et recevez des tokens TAAMS.</p>
    <ul class="text-white my-4">
      <li>Nombre de places limité : <span class="promo-reward-label">1000</span></li>
      <li>Inscription ouverte tant que la limite n’est pas atteinte</li>
      <li>Récompense : <span class="promo-reward-label">500 000 000 TAAMS</span> partagés entre tous les inscrits</li>
      <li>Bonus : <span class="promo-reward-label">+50% pour les 100 premiers, +25% pour les 101-200</span></li>
      <li>Clôture : quand la limite est atteinte ou déclenchée par la gouvernance</li>
    </ul>
    <div v-if="ignitionInfo">
      <p v-if="ignitionInfo.userRegistered" class="text-green-400">Vous êtes inscrit !</p>
      <p v-else-if="!ignitionInfo.regOpen" class="text-red-400">Inscriptions fermées.</p>
      <button v-else @click="registerForAirdrop" class="futuristic-button">S'inscrire à l'Airdrop</button>
      <p v-if="ignitionInfo.userRegistered && !ignitionInfo.userClaimed && ignitionInfo.triggered" class="mt-4">
        <button @click="claimAirdrop" class="futuristic-button">Récupérer votre récompense</button>
      </p>
      <p class="mt-4">Participants inscrits : {{ ignitionInfo.participants }} / {{ ignitionInfo.maxParticipants }}</p>
    </div>
    <p v-else>Chargement...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ethers } from 'ethers';
import TAAMS_ABI from '../TAAMS_ABI.json';

export default {
  name: 'Airdrop',
  setup() {
    const ignitionInfo = ref(null);
    const contractAddress = '0xbAC8aC29CddD32997D7dDA8cc27DAB261327e1Ef'; // Mets la nouvelle adresse si nécessaire

    async function fetchIgnitionInfo() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, TAAMS_ABI, signer);
          const info = await contract.getIgnitionInfo();
          ignitionInfo.value = {
            triggered: info.triggered,
            regOpen: info.regOpen,
            participants: info.participants.toNumber(),
            maxParticipants: info.maxParticipants.toNumber(),
            userRegistered: info.userRegistered,
            userAmount: ethers.utils.formatUnits(info.userAmount, 18),
            userClaimed: info.userClaimed,
          };
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur: ' + error.message);
        }
      } else {
        alert('Veuillez installer MetaMask');
      }
    }

    async function registerForAirdrop() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, TAAMS_ABI, signer);
          const tx = await contract.registerForIgnitionAirdrop();
          await tx.wait();
          alert('Inscription réussie !');
          await fetchIgnitionInfo();
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur: ' + error.message);
        }
      } else {
        alert('Veuillez installer MetaMask');
      }
    }

    async function claimAirdrop() {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, TAAMS_ABI, signer);
          const tx = await contract.claimIgnitionAirdrop();
          await tx.wait();
          alert('Récompense récupérée !');
          await fetchIgnitionInfo();
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur: ' + error.message);
        }
      } else {
        alert('Veuillez installer MetaMask');
      }
    }

    onMounted(fetchIgnitionInfo);

    return {
      ignitionInfo,
      registerForAirdrop,
      claimAirdrop,
    };
  },
};
</script>

<style scoped>
.promo-reward-label {
  color: #00bfae;
  font-weight: bold;
}
</style>