import React from "react";

const Dropdown = ({ id, name, items, onChange, value } : 
    { 
        id: string, 
        name: string, 
        items: ReadonlyArray<string>, 
        onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
        value?: string
    }) => {
    if (!items || !items.length) {
        return null;
    }
    return (
        <div className="flex flex-col flex-auto">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 uppercase">
                {name}
            </label>
            <select id={id} name={name} autoComplete={name} onChange={onChange} value={value}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {items.map((item, index) => {
                    return (<option key={index}>{item}</option>);
                })}
            </select>
        </div>
    );
}

export default Dropdown