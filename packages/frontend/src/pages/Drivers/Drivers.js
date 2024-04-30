import React, { useEffect } from 'react'
import { useGetAdsQuery, useSearchAdsQuery } from '../../redux/api/drivers-api';
import { useSelector, useDispatch } from 'react-redux';
import { List } from './list';
import { getDriver } from '../../redux/action/getDriver';

export default function Drivers() {
  const drivers = useSelector(s => s.drivers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(() => getDriver());
  },[dispatch])
  console.log(drivers)
  return (
    <div>
      {drivers && <List data={drivers}/>}
    </div>
  )
}
