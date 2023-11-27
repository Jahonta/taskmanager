type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  extraClasses?: string[];
};

function Button({
  onClick,
  children,
  type = 'button',
  extraClasses = [],
}: ButtonProps) {
  return (
    <button className={extraClasses.join(' ')} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
