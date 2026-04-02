import { el } from './dom.js';

export function initAuthModal(auth) {
  const loginOpenBtn = el('loginOpenBtn');
  const loginOverlay = el('loginOverlay');
  const loginCloseBtn = el('loginCloseBtn');
  const loginCancelBtn = el('loginCancelBtn');
  const loginForm = el('loginForm');
  const loginErrorEl = el('loginError');
  const loginUsernameEl = el('loginUsername');
  const loginPasswordEl = el('loginPassword');
  const loginHintEl = el('loginHint');
  const loginSubmitBtn = el('loginSubmitBtn');
  const loginSubmitText = el('loginSubmitText');

  function setLoginLoading(loading) {
    loginSubmitBtn.disabled = loading;
    loginCancelBtn.disabled = loading;
    loginCloseBtn.disabled = loading;
    loginUsernameEl.disabled = loading;
    loginPasswordEl.disabled = loading;

    loginSubmitText.textContent = loading ? '登录中…' : '登录';
  }

  function setLoginOpen(open) {
    loginOverlay.classList.toggle('hidden', !open);
    if (open) {
      loginErrorEl.classList.add('hidden');
      loginUsernameEl.value = '';
      loginPasswordEl.value = '';
      setLoginLoading(false);
      loginUsernameEl.focus();
    }
  }

  function closeLoginModal() {
    setLoginOpen(false);
  }

  function openLoginModal() {
    setLoginOpen(true);
  }

  // Keep hint in sync with auth state
  auth.onAuthChange((session) => {
    if (session?.user) {
      const label = session.user.email || session.user.phone || session.user.id;
      loginHintEl.textContent = `当前登录：${label}`;
    } else {
      loginHintEl.textContent = '输入用户名和密码继续';
    }
  });

  loginOpenBtn.addEventListener('click', () => {
    const isAuthed = loginOpenBtn.dataset.authed === '1';
    if (!isAuthed) openLoginModal();
  });

  loginCloseBtn.addEventListener('click', closeLoginModal);
  loginCancelBtn.addEventListener('click', closeLoginModal);
  loginOverlay.addEventListener('click', (e) => {
    if (e.target === loginOverlay) closeLoginModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !loginOverlay.classList.contains('hidden')) closeLoginModal();
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginErrorEl.classList.add('hidden');

    const email = (loginUsernameEl.value || '').trim();
    const password = (loginPasswordEl.value || '').trim();
    if (!email || !password) {
      loginErrorEl.textContent = '用户名或密码不能为空。';
      loginErrorEl.classList.remove('hidden');
      return;
    }

    setLoginLoading(true);
    try {
      const { data, error } = await auth.signInWithPassword({ 
        email: `${email}@internal.local`, 
        password: password 
      });

      if (error || !data?.session) {
        loginErrorEl.textContent = error?.message || '登录失败，请检查账号密码。';
        loginErrorEl.classList.remove('hidden');
        return;
      }

      closeLoginModal();
    } finally {
      setLoginLoading(false);
    }
  });

  return {
    openLoginModal,
    closeLoginModal,
  };
}

