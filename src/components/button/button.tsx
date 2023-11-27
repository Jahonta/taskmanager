type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  extraClass?: string;
};

function Button({
  onClick,
  children,
  type = 'button',
  extraClass,
}: ButtonProps) {
  return (
    <button className={extraClass} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
