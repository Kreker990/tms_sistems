import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List } from './list';
import { getDriver } from '../../redux/action/getDriver';
import { Container, Content } from 'rsuite';

export default function Drivers() {
  const drivers = useSelector(s => s.drivers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(() => getDriver());
  }, [dispatch])
  return (
    <Container className='container-center'>
      <Content className='content-white'>
        <List data={drivers} />
      </Content>
    </Container>
  )
}
