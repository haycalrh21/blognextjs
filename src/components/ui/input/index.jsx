const Input = ({ label, name, type, placeholder }) => {
    return (
        <div className="flex flex-col">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                className="border rounded-md px-3 py-2"
            />
        </div>
    );
}

export default Input;
