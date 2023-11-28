import { Button } from '@taskmanager/components';

import { Header } from '../header/header';

function Container() {
  return (
    <section className='main__control control container'>
      <Header />
      <Button extraClasses={['control__button']} onClick={() => {}}>
        + ADD NEW TASK
      </Button>
    </section>
  );
}

export { Container };
