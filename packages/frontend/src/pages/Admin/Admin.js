import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import styles from './Admin.module.css';

const COLORS = ['#55a64c', '#ab1b1e', '#1c7cb0', '#8884d8', '#82ca9d'];

export default function Admin() {
  const orders = useSelector(s => s.orders);
  const [totalAmount, setTotalAmount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [driverRevenue, setDriverRevenue] = useState(0);

  useEffect(() => {
    const update = () => {
      let total = 0;
      let newOrders = 0;
      let canceledOrders = 0;
      let completedOrders = 0;
      let driverRev = 0;

      orders.orders?.forEach(order => {
        if (order.statusorder.key !== 'canceled') {
          total += order.price;
          driverRev += order.price * 0.8;
        }

        if (order.statusorder.key === 'new') {
          newOrders += 1;
        } else if (order.statusorder.key === 'canceled') {
          canceledOrders += 1;
        } else if (order.statusorder.key === 'completed') {
          completedOrders += 1;
        }
      });

      setTotalAmount(total);
      setNewCount(newOrders);
      setCanceledCount(canceledOrders);
      setCompletedOrdersCount(completedOrders);
      setDriverRevenue(driverRev);
    };
    update();
  }, [orders]);

  const pieData = [
    { name: 'Завершенные', value: completedOrdersCount },
    { name: 'Отмененные', value: canceledCount },
    { name: 'Новые', value: newCount },
  ];

  const barData = [
    { name: 'Общая сумма', amount: totalAmount },
    { name: 'Выручка компании', amount: totalAmount * 0.20 },
    { name: 'Выручка водителей', amount: driverRevenue },
  ];

  return (
    <div className={styles.orderSummary}>
      <h2>Обзор заказов</h2>
      <div className={styles.chartContainer}>
        <div className={styles.pieChart}>
          <h3>Статус заказов</h3>
          <div className={styles.pieChartWrapper}>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx={200}
                cy={180}  // Смещаем диаграмму выше
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <div className={styles.pieChartLegend}>
              <div style={{ color: '#55a64c' }}>Завершенные: {completedOrdersCount}</div>
              <div style={{ color: '#ab1b1e' }}>Отмененные: {canceledCount}</div>
              <div style={{ color: '#1c7cb0' }}>Новые: {newCount}</div>
            </div>
          </div>
        </div>
        <div className={styles.barChart}>
          <h3>Финансовые показатели</h3>
          <BarChart
            width={500}
            height={300}
            data={barData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
}
