import cn from 'classnames';

type LabeledInputProps = {
  type: 'radio' | 'checkbox';
  name: string;
  value: string;
  onChange: (value: string, isChecked: boolean) => void;
  children?: React.ReactNode;
  inputExtraClasses?: string[];
  labelExtraClasses?: string[];
  checked?: boolean;
  disabled?: boolean;
};

function LabeledInput({
  type,
  name,
  value,
  children,
  onChange,
  inputExtraClasses = [],
  labelExtraClasses = [],
  disabled,
  checked,
}: LabeledInputProps) {
  const id = crypto.randomUUID();
  return (
    <>
      <input
        type={type}
        id={id}
        className={cn('visually-hidden', inputExtraClasses)}
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={(event) => onChange(value, event.target.checked)}
      />
      <label htmlFor={id} className={cn(labelExtraClasses)}>
        {children}
      </label>
    </>
  );
}

export { LabeledInput };
