import React from 'react'
import { useGetAdsQuery, useSearchAdsQuery } from '../../redux/api/drivers-api';

export default function Drivers() {
  const { isLoading, data } = useSearchAdsQuery();
  console.log(data);
  
  return (
    <div>
      jflsjflds
    </div>
  )
}
