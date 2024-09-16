import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const FilterClass = () => {
    const [selected, setSelected] = useState('Class');
    const [openMenu, setOpenMenu] = useState(false);
    const toogleMenu = () => {
        setOpenMenu(!openMenu);
    };
    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
    ];
    return (
        <>
            <div className="relative font-inter">
                <button
                    onClick={toogleMenu}
                    className="flex items-center justify-between w-16 h-8 md:w-[90px] md:h-9 lg:h-10 border border-gray-300 bg-white focus:outline-none rounded-[4px] md:rounded-lg text-[8px] md:text-sm appearance-none gap-1 px-4 font-medium"
                >
                    {selected}

                    <ChevronDownIcon className={`size-2 md:size-3 text-black stroke-black transition-transform duration-200 ${openMenu ? 'rotate-180' : ''}`} />
                </button>

                <div
                    className={`text-center absolute w-full md:w-[90px] bg-white focus:outline-none rounded-[4px] md:rounded-lg text-[8px] md:text-sm px-2 appearance-none shadow-2xl py-2 transition-all duration-300 transform origin-top ${
                        openMenu ? 'max-h-screen opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'
                    } overflow-hidden`}
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            className="flex items-center justify-center w-full h-5 gap-2 px-3 font-medium text-black md:h-8 hover:text-white hover:bg-primary"
                            onClick={(e) => {
                                setSelected(option.value);
                                setOpenMenu(false);
                            }}
                        >
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FilterClass;
