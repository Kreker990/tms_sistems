import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List } from './list';
import { Container, Content } from 'rsuite';
import { getCompaniesB } from '../../redux/action/companiesB';

export default function ComB() {
  const companiesB = useSelector(s => s.companiesB);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCompaniesB());
  }, [dispatch])
  return (
    <Container className='container-center'>
      <Content className='content-white'>
        <List data={companiesB} />
      </Content>
    </Container>
  )
}
