import cn from 'classnames';

type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  extraClasses?: string[];
  disabled?: boolean;
};

function Button({
  onClick,
  children,
  type = 'button',
  extraClasses = [],
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={cn(extraClasses)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { Button };
