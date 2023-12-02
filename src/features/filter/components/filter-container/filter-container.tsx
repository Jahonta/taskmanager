import { Filter, Task } from '@taskmanager/types';
import { FilterItem } from '../filter-item/filter-item';

type FilterContainerProps = {
  filteredTasks: Record<Filter, Task[]>;
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
};

function FilterContainer({
  filteredTasks,
  activeFilter,
  setActiveFilter,
}: FilterContainerProps) {
  return (
    <section className='main__filter filter container'>
      {(Object.entries(filteredTasks) as [Filter, Task[]][]).map(
        ([name, tasks]) => (
          <FilterItem
            key={name}
            name={name}
            count={tasks.length}
            onChange={() => setActiveFilter(name)}
            checked={activeFilter === name}
            disabled={tasks.length === 0}
          />
        )
      )}
    </section>
  );
}

export { FilterContainer };
