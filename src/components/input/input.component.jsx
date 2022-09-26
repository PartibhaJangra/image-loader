const Input = function (props) {
  const { type, className, onChange } = props;
  return (
    <input type={type} className={className} onChange={onChange} {...props} />
  );
};

export default Input;
