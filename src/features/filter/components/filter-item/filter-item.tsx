import { LabeledInput } from 'components/labeled-input/labeled-input';

type FilterItemProps = {
  name: string;
  count: number;
  onChange: () => void;
  checked?: boolean;
  disabled?: boolean;
};

function FilterItem({
  name,
  count,
  onChange,
  checked,
  disabled,
}: FilterItemProps) {
  return (
    <LabeledInput
      key={name}
      name={name}
      type='radio'
      value={name}
      onChange={onChange}
      inputExtraClasses={['filter__input']}
      labelExtraClasses={['filter__label']}
      checked={checked}
      disabled={disabled}
    >
      {name} <span className={`filter__${name}-count`}>{count}</span>
    </LabeledInput>
  );
}

export { FilterItem };
