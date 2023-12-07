import { Filter } from '@taskmanager/types';
import { useTasks } from '@taskmanager/api';
import { getFilters } from '@taskmanager/helpers';

import { FilterItem } from '../filter-item/filter-item';

type FilterContainerProps = {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
};

function FilterContainer({
  activeFilter,
  setActiveFilter,
}: FilterContainerProps) {
  const { data, isSuccess } = useTasks();

  if (!isSuccess) {
    return null;
  }

  return (
    <section className='main__filter filter container'>
      {getFilters(data).map(([name, count]) => (
        <FilterItem
          key={name}
          name={name}
          count={count}
          onChange={() => setActiveFilter(name)}
          checked={activeFilter === name}
          disabled={count === 0}
        />
      ))}
    </section>
  );
}

export { FilterContainer };
