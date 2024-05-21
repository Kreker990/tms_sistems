import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List } from './list';
import { Container, Content } from 'rsuite';
import { getStatusOrder } from '../../redux/action/statusOrders';

export default function StatusOrder() {
  const statusOrder = useSelector(s => s.statusOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatusOrder());
  }, [dispatch])
  return (
    <Container className='container-center'>
      <Content className='content-white'>
        <List data={statusOrder} />
      </Content>
    </Container>
  )
}
