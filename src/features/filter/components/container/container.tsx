import { useState } from 'react';
import { FilterItem } from '../filter-item/filter-item';

const filters = [
  {
    name: 'all',
    count: 13,
  },
  {
    name: 'overdue',
    count: 0,
  },
  {
    name: 'today',
    count: 0,
  },
  {
    name: 'repeating',
    count: 0,
  },
  {
    name: 'favorites',
    count: 0,
  },
  {
    name: 'archive',
    count: 1
  },
];

function Container() {
  const [activeFilter, setActiveFilter] = useState(filters[0].name);

  return (
    <section className='main__filter filter container'>
      {filters.map(({ name, count }) => (
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

export { Container };
