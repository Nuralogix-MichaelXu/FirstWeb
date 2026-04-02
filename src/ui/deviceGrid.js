import { el } from './dom.js';
import { devices, statusMap } from '../data/devices.js';

function statusAllowsApply(status) {
  return status === '可领用';
}

export function initDeviceGrid({ applyModal }) {
  const deviceGrid = el('deviceGrid');
  const searchInput = el('searchInput');

  function getFilteredDevices() {
    const q = (searchInput.value || '').trim().toLowerCase();
    if (!q) return devices;
    return devices.filter((d) => `${d.name} ${d.model}`.toLowerCase().includes(q));
  }

  function renderDevices(list) {
    deviceGrid.innerHTML = '';

    for (const d of list) {
      const s = statusMap[d.status] || {
        badge: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
        label: d.status,
      };
      const canApply = statusAllowsApply(d.status);

      const card = document.createElement('article');
      card.className =
        'rounded-2xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col gap-4';
      card.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="text-sm text-slate-600">设备名称</div>
            <div class="font-semibold text-slate-900 truncate">${d.name}</div>
          </div>
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${s.badge} whitespace-nowrap">
            ${s.label}
          </span>
        </div>

        <div>
          <div class="text-sm text-slate-600">型号</div>
          <div class="text-sm font-medium text-slate-900">${d.model}</div>
        </div>

        <div class="mt-auto flex items-center justify-between gap-3">
          <div class="text-xs text-slate-500">点击领用填写登记信息</div>
          <button
            type="button"
            ${canApply ? '' : 'disabled'}
            class="rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              canApply
                ? 'bg-slate-900 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }"
            data-device-id="${d.id}"
          >
            领用
          </button>
        </div>
      `;

      const applyBtn = card.querySelector('button[data-device-id]');
      applyBtn.addEventListener('click', () => applyModal.open(d));
      deviceGrid.appendChild(card);
    }
  }

  searchInput.addEventListener('input', () => renderDevices(getFilteredDevices()));

  renderDevices(devices);

  return { render: () => renderDevices(getFilteredDevices()) };
}

