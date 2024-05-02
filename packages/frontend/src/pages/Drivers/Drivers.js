import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List } from './list';
import { getDriver } from '../../redux/action/getDriver';
import { Container, Content } from 'rsuite';

export default function Drivers() {
  const drivers = useSelector(s => s.drivers);
  const dispatch = useDispatch();
  console.log(drivers);
  
  useEffect(() => {
    dispatch(() => getDriver());
  },[dispatch])
  console.log(drivers)
  return (
    <Container className='container-center'>
    <Content className='content-white'>
      {drivers && drivers.length > 0 ? <List data={drivers}/> : <h5>Нету данных</h5>}
      </Content>
      </Container>
  )
}
