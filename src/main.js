import { initSupabaseAuth } from './state/authState.js';
import { initHeaderAuthControls } from './ui/appHeader.js';
import { initAuthModal } from './ui/authModal.js';
import { initApplyModal } from './ui/applyModal.js';
import { initDeviceGrid } from './ui/deviceGrid.js';

function main() {
  const auth = initSupabaseAuth();

  initHeaderAuthControls(auth);
  initAuthModal(auth);

  const applyModal = initApplyModal();
  initDeviceGrid({ applyModal });
}

main();

