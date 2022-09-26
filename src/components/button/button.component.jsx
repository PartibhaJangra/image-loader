const Button = function (props) {
  const { onClick, id, children } = props;
  return (
    <button onClick={onClick} id={id}>
      {children}
    </button>
  );
};

export default Button;
