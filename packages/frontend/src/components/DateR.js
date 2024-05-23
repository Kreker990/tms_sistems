export const dateRanges = [
  { label: 'За последний день', value: 'lastDay' },
  { label: 'За последнюю неделю', value: 'lastWeek' },
  { label: 'За последний месяц', value: 'lastMonth' },
  { label: 'За все время', value: 'allTime' }
];

export const filterOrdersByDate = (orders, range) => {
  const now = new Date();
  let filteredOrders;

  switch (range) {
    case 'lastDay':
      filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.timeStart);
        return orderDate >= new Date(now.setDate(now.getDate() - 1));
      });
      break;
    case 'lastWeek':
      filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.timeStart);
        return orderDate >= new Date(now.setDate(now.getDate() - 7));
      });
      break;
    case 'lastMonth':
      filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.timeStart);
        return orderDate >= new Date(now.setMonth(now.getMonth() - 1));
      });
      break;
    case 'allTime':
    default:
      filteredOrders = orders;
      break;
  }

  return filteredOrders;
};