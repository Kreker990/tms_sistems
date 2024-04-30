import React from 'react'
import { useGetAdsQuery, useSearchAdsQuery } from '../../redux/api/drivers-api';
import { useSelector, useDispatch } from 'react-redux';

export default function Drivers() {
  const drivers = useSelector(s => s.drivers);
  const dispatch = useDispatch();

  console.log(drivers)
  return (
    <div>
      jflsjflds
    </div>
  )
}
