import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { List } from './list';
import { Container, Content } from 'rsuite';
import { getCompaniesA } from '../../redux/action/companiesA';

export default function ComA() {
  const companiesA = useSelector(s => s.companiesA);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCompaniesA());
  }, [dispatch])
  return (
    <Container className='container-center'>
      <Content className='content-white'>
        <List data={companiesA} />
      </Content>
    </Container>
  )
}
