import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './button';

describe('Component: Button', () => {
  it('should render a button element with default props when no props are passed', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('');
    expect(buttonElement).not.toBeDisabled();
  });

  it('should render a button element with provided children and props when props are passed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={onClick} type='submit' extraClasses={['test']}>
        Click me
      </Button>
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click me');
    expect(buttonElement).toHaveClass('test');
    await user.click(buttonElement);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should render a disabled button element when disabled prop is true', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick} disabled={true} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
    await user.click(buttonElement);
    expect(onClick).not.toHaveBeenCalled();
  });
});
