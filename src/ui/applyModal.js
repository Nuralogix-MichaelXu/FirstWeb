import { el } from './dom.js';

export function initApplyModal() {
  const modalOverlay = el('modalOverlay');
  const modalCloseBtn = el('modalCloseBtn');
  const modalCancelBtn = el('modalCancelBtn');
  const applyForm = el('applyForm');

  const selectedDeviceIdEl = el('selectedDeviceId');
  const deviceSummaryEl = el('deviceSummary');
  const formErrorEl = el('formError');

  const applyNameEl = el('applyName');
  const applyDeptEl = el('applyDept');
  const applyDueDateEl = el('applyDueDate');

  function setModalOpen(open) {
    modalOverlay.classList.toggle('hidden', !open);
    if (open) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      applyDueDateEl.min = `${yyyy}-${mm}-${dd}`;

      formErrorEl.classList.add('hidden');
      const firstFocusable = modalOverlay.querySelector('button, input, [href]');
      if (firstFocusable) firstFocusable.focus();
    }
  }

  function close() {
    setModalOpen(false);
  }

  function open(device) {
    selectedDeviceIdEl.value = device.id;
    deviceSummaryEl.textContent = `设备：${device.name}（${device.model}）`;
    applyNameEl.value = '';
    applyDeptEl.value = '';
    applyDueDateEl.value = '';
    setModalOpen(true);
  }

  modalCloseBtn.addEventListener('click', close);
  modalCancelBtn.addEventListener('click', close);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) close();
  });

  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formErrorEl.classList.add('hidden');

    const name = (applyNameEl.value || '').trim();
    const dept = (applyDeptEl.value || '').trim();
    const dueDate = (applyDueDateEl.value || '').trim();
    const selectedDeviceId = (selectedDeviceIdEl.value || '').trim();

    if (!selectedDeviceId || !name || !dept || !dueDate) {
      formErrorEl.classList.remove('hidden');
      return;
    }

    alert(`已提交领用申请（演示）\n设备ID：${selectedDeviceId}\n姓名：${name}\n部门：${dept}\n预计归还：${dueDate}`);
    close();
  });

  return { open, close };
}

