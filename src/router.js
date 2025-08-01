import { createRouter, createWebHashHistory } from 'vue-router';

// Importe tes composants
import Advertisements from './components/Advertisements.vue';
import Airdrop from './components/Airdrop.vue';
import Burn from './components/Burn.vue';
import Governance from './components/Governance.vue';
import Staking from './components/Staking.vue';
import Delegation from './components/Delegation.vue';
import BL2P from './components/BL2P.vue';

const routes = [
  { path: '/advertisements', component: Advertisements },
  { path: '/airdrop', component: Airdrop },
  { path: '/burn', component: Burn },
  { path: '/governance', component: Governance },
  { path: '/staking', component: Staking },
  { path: '/delegation', component: Delegation },
  { path: '/bl2p', component: BL2P },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
