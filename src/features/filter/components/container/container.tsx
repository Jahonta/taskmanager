function Container() {
  return (
    <section className='main__filter filter container'>
      <input
        type='radio'
        id='filter__all'
        className='filter__input visually-hidden'
        name='filter'
        checked
      />
      <label htmlFor='filter__all' className='filter__label'>
        All <span className='filter__all-count'>13</span>
      </label>
      <input
        type='radio'
        id='filter__overdue'
        className='filter__input visually-hidden'
        name='filter'
        disabled
      />
      <label htmlFor='filter__overdue' className='filter__label'>
        Overdue <span className='filter__overdue-count'>0</span>
      </label>
      <input
        type='radio'
        id='filter__today'
        className='filter__input visually-hidden'
        name='filter'
        disabled
      />
      <label htmlFor='filter__today' className='filter__label'>
        Today <span className='filter__today-count'>0</span>
      </label>
      <input
        type='radio'
        id='filter__favorites'
        className='filter__input visually-hidden'
        name='filter'
      />
      <label htmlFor='filter__favorites' className='filter__label'>
        Favorites <span className='filter__favorites-count'>1</span>
      </label>
      <input
        type='radio'
        id='filter__repeating'
        className='filter__input visually-hidden'
        name='filter'
      />
      <label htmlFor='filter__repeating' className='filter__label'>
        Repeating <span className='filter__repeating-count'>1</span>
      </label>
      <input
        type='radio'
        id='filter__archive'
        className='filter__input visually-hidden'
        name='filter'
      />
      <label htmlFor='filter__archive' className='filter__label'>
        Archive <span className='filter__archive-count'>115</span>
      </label>
    </section>
  );
}

export { Container };
