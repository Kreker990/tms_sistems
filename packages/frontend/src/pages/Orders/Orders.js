import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List } from './list';
import { Container, Content } from 'rsuite';
import { getOrders } from '../../redux/action/order';

export default function Orders() {
  const orders = useSelector(s => s.orders);
  const dispatch = useDispatch();
  console.log(orders);
  
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch])
  return (
    <Container className='container-center'>
      <Content className='content-white'>
        <List data={orders} />
      </Content>
    </Container>
  )
}
