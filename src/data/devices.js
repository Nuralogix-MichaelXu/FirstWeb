export const devices = [
  { id: 'd1', name: '笔记本电脑', model: 'ThinkPad T14', status: '可领用' },
  { id: 'd2', name: '手机采集设备', model: 'Pixel 8', status: '已领用' },
  { id: 'd3', name: '无线网卡套件', model: 'AX3000', status: '维修中' },
  { id: 'd4', name: '摄像机', model: 'Logi C920', status: '可领用' },
  { id: 'd5', name: '平板电脑', model: 'iPad 10.9', status: '已领用' },
  { id: 'd6', name: '路由器', model: 'RT-AC86U', status: '可领用' },
];

export const statusMap = {
  可领用: {
    badge: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200',
    label: '可领用',
  },
  已领用: {
    badge: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
    label: '已领用',
  },
  维修中: {
    badge: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200',
    label: '维修中',
  },
};

