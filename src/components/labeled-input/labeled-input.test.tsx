import { render, screen } from '@testing-library/react';

import { LabeledInput } from './labeled-input';
import userEvent from '@testing-library/user-event';

describe('Component: LabeledInput', () => {
  it('should render a label and an input element with the provided props', () => {
    render(
      <>
        <LabeledInput
          type='radio'
          name='test'
          value='radio'
          onChange={() => {}}
          inputExtraClasses={['custom-input']}
          labelExtraClasses={['custom-label']}
        >
          Radio Label
        </LabeledInput>
        <LabeledInput
          type='checkbox'
          name='test'
          value='checkbox'
          onChange={() => {}}
        >
          Checkbox Label
        </LabeledInput>
      </>
    );

    const radioLabelElement = screen.getByText('Radio Label');
    const radioInputElement = screen.getByLabelText('Radio Label');
    const checkboxLabelElement = screen.getByText('Checkbox Label');
    const checkboxInputElement = screen.getByLabelText('Checkbox Label');

    expect(radioLabelElement).toBeInTheDocument();
    expect(radioInputElement).toBeInTheDocument();
    expect(radioInputElement).toHaveClass('visually-hidden');
    expect(radioInputElement).toHaveClass('custom-input');
    expect(radioLabelElement).toHaveClass('custom-label');

    expect(checkboxLabelElement).toBeInTheDocument();
    expect(checkboxInputElement).toBeInTheDocument();
    expect(checkboxInputElement).toHaveClass('visually-hidden');
  });

  it('should pass the value and checked state to the onChange function when input is changed', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <LabeledInput
        type='checkbox'
        name='test'
        value='test'
        onChange={onChange}
      >
        Test Label
      </LabeledInput>
    );

    const labelElement = screen.getByText('Test Label');

    await user.click(labelElement);
    expect(onChange).toHaveBeenCalledWith('test', true);

    await user.click(labelElement);
    expect(onChange).toHaveBeenCalledWith('test', false);
  });
});
