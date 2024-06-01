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

export const customLocale = {
  sunday: 'Вс',
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  ok: 'Ок',
  today: 'Сегодня',
  yesterday: 'Вчера',
  hours: 'Часы',
  minutes: 'Минуты',
  seconds: 'Секунды',
  last7Days: 'Последние 7 дней',
  january: 'Январь',
  february: 'Февраль',
  march: 'Март',
  april: 'Апрель',
  may: 'Май',
  june: 'Июнь',
  july: 'Июль',
  august: 'Август',
  september: 'Сентябрь',
  october: 'Октябрь',
  november: 'Ноябрь',
  december: 'Декабрь',
};

export const predefinedRanges = [
  {
    label: 'Сегодня',
    value: [new Date(), new Date()]
  },
  {
    label: 'Последняя неделя',
    value: [new Date(Date.now() - 7 * 86400000), new Date()]
  },
  {
    label: 'Последний месяц',
    value: [new Date(Date.now() - 30 * 86400000), new Date()]
  }
];

export const handleDateRangeChange = (data, range) => {
  if (range[0]) {
    const [start, end] = range;
    return data.filter(item => {
      const itemDate = new Date(item.timeStart);
      return itemDate >= start && itemDate <= end;
    });
  } else {
    return data;
  }
};