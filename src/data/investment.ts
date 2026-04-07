// 投资专区常量数据
export const categoryColors: Record<string, string> = {
  '理念': 'tag-purple',
  '分析': 'tag-green',
  '宏观': 'tag-orange',
};

// 模拟投资组合数据
export const portfolio = {
  totalValue: 158432.50,
  dayChange: 2340.80,
  dayChangePercent: 1.50,
  positions: [
    { name: '科技股 ETF', allocation: 40, value: 63373 },
    { name: '消费龙头', allocation: 25, value: 39608 },
    { name: '新能源', allocation: 20, value: 31686 },
    { name: '现金', allocation: 15, value: 23765 },
  ]
};
