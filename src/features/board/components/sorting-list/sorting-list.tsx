import { useState } from 'react';

import { DEFAULT_SORTING } from '../../constants';
import { SortingType, TSorting } from '../../types/sorting';

import { SortingItem } from '../sorting-item/sorting-item';

function SortingList() {
  const [activeSorting, setActiveSorting] = useState<TSorting>(DEFAULT_SORTING);

  return (
    <div className='board__sort-list'>
      {Object.values(SortingType).map((type) => (
        <SortingItem
          key={type}
          type={type}
          isActive={activeSorting === type}
          onClick={setActiveSorting}
        />
      ))}
    </div>
  );
}

export { SortingList };
