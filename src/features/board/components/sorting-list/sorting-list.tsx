import { SortingType, Sorting } from '../../types/sorting';

import { SortingItem } from '../sorting-item/sorting-item';

type SortingListProps = {
  activeSorting: Sorting;
  setActiveSorting: (type: Sorting) => void;
};

function SortingList({ activeSorting, setActiveSorting }: SortingListProps) {
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
