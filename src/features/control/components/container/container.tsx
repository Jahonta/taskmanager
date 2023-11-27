import { Header } from '../header/header';
import { Button } from '@components';

function Container() {
  return (
    <section className='main__control control container'>
      <Header />
      <Button extraClass='control__button' onClick={() => {}}>
        + ADD NEW TASK
      </Button>
    </section>
  );
}

export { Container };
