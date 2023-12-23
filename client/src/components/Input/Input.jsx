import './Input.scss'

const Input = ({value, type, placeholder, setValue}) => {
    return (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
        />
    );
};

export default Input;
