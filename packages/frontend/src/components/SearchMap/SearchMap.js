import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { SearchBox } from '@mapbox/search-js-react';

// Установите ваш Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jla2VyOTkwIiwiYSI6ImNsd3RnOWk5cTAzdzYyanF1c3JuM3k0eDQifQ.JUbfgPL95dTWnAaOHQb-HQ';

const SearchMap = ({ setLocation }) => {

  const handleSearchSelect = (result) => {
    setLocation(result?.features[0]?.properties?.full_address);
  };
  return (
    <div>
      <SearchBox
        accessToken={mapboxgl.accessToken}
        onRetrieve={handleSearchSelect}
        options={{ language: 'ru' }}
        placeholder='найти на карте'
        value=''
      />
    </div>
  );
};

export default SearchMap;