import { el } from './dom.js';
import { getUserLabel } from '../state/authState.js';

export function initHeaderAuthControls(auth) {
  const loginOpenBtn = el('loginOpenBtn');
  const currentUserLabelEl = el('currentUserLabel');

  function setAuthButtonState(session) {
    const authed = !!session?.user;
    loginOpenBtn.textContent = authed ? '登出' : '登录';
    loginOpenBtn.dataset.authed = authed ? '1' : '0';

    if (authed) {
      const label = getUserLabel(session.user);
      currentUserLabelEl.textContent = label;
      currentUserLabelEl.classList.remove('hidden');
      currentUserLabelEl.classList.add('inline-flex');
    } else {
      currentUserLabelEl.textContent = '';
      currentUserLabelEl.classList.add('hidden');
      currentUserLabelEl.classList.remove('inline-flex');
    }
  }

  auth.onAuthChange(setAuthButtonState);

  loginOpenBtn.addEventListener('click', async () => {
    const isAuthed = loginOpenBtn.dataset.authed === '1';
    if (!isAuthed) return; // 登录弹窗由 authModal 负责打开

    const { error } = await auth.signOut();
    if (error) alert(`登出失败：${error.message}`);
  });

  return { setAuthButtonState };
}

