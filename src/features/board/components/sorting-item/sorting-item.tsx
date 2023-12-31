import { MouseEvent } from 'react';
import cn from 'classnames';

import { SortingType, Sorting } from '../../types/sorting';

type SortingItemProps = {
  type: Sorting;
  isActive: boolean;
  onClick: (type: Sorting) => void;
};

const sortingLabel = {
  [SortingType.DEFAULT]: 'SORT BY DEFAULT',
  [SortingType.DATE_UP]: 'SORT BY DATE up',
  [SortingType.DATE_DOWN]: 'SORT BY DATE down',
};

function SortingItem({ type, isActive, onClick }: SortingItemProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick(type);
  };

  return (
    <a
      href='#'
      className={cn('board__sort-item', {
        'board__sort-item--active': isActive,
      })}
      onClick={handleClick}
    >
      {sortingLabel[type]}
    </a>
  );
}

export { SortingItem };
