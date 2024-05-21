import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../redux/action/order';
import { BsCartXFill, BsFillCartCheckFill } from "react-icons/bs";
import { FaTruckMoving } from "react-icons/fa6";
import { MdPriceChange } from "react-icons/md";
import styles from './Admin.module.css';
import { List } from './list';

export default function Admin() {
  const orders = useSelector(s => s.orders);
  const dispatch = useDispatch();
  const [check, setcheck] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);

  useEffect(() => {
    dispatch(getOrders());
    const update = () => {
      let total = 0;
      let newOrders = 0;
      let canceledOrders = 0;
      let completedOrders = 0;

      orders.orders?.forEach(order => {
        total += order.price;

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
      setcheck(true)
    }
    if (!check) {
      update();
    }
  }, [])
  return (
    <div className={styles.orderSummary}>
      <h2>Обзор заказов</h2>
      <div className={styles.orderSummaryCards}>
        <div className={styles.orderSummaryCard}>
          <BsCartXFill size={50} color='#55a64c' />
          <label>Завершенные: {completedOrdersCount}</label>
        </div>
        <div className={styles.orderSummaryCard}>
          <BsFillCartCheckFill size={50} color='#ab1b1e' />
          <label>Отмененные: {canceledCount}</label>
        </div>
        <div className={styles.orderSummaryCard}>
          <FaTruckMoving size={50} color='#1c7cb0' />
          <label>Новые: {newCount}</label>
        </div>
        <div className={styles.orderSummaryCard}>
          <MdPriceChange size={50} color='#1c7cb0' />
          <label>Общая сумма: {totalAmount}</label>
        </div>
      </div>
      <List data={orders} />
    </div>
  )
}
