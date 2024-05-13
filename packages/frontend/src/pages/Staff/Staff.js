import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List } from './list';
import { Container, Content } from 'rsuite';
import { getStaff } from '../../redux/action/staff';

export default function Staff() {
  const staff = useSelector(s => s.staff);
  const dispatch = useDispatch();
  console.log(staff);
  
  useEffect(() => {
    dispatch(getStaff());
  }, [dispatch])
  return (
    <Container className='container-center'>
      <Content className='content-white'>
        <List data={staff} />
      </Content>
    </Container>
  )
}
