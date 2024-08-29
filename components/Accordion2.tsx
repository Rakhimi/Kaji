'use client'

import React, { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Input } from "@/components/ui/input"

interface Ingredient {
    name: string;
    cost: number | null;
    isDisabled: boolean;
}

interface AccordionProps {

    mainCost: number | null;
    setMainCost: (cost: number | null) => void;
    ingredients: Ingredient[];
    setIngredients: (ingredients: Ingredient[]) => void;
    totalCost: number | null;
    setTotalCost: (cost: number | null) => void;
}

const Accordion: React.FC<AccordionProps> = ({ mainCost, setMainCost, ingredients, setIngredients, totalCost, setTotalCost }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isIngredient, setIsIngredient] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
        if (!isOpen && ingredients.length === 0) {
            addInitialIngredient();
        }
    };

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number | null) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = {
            ...newIngredients[index],
            [field]: value,
        };
        setIngredients(newIngredients);
        updateTotalCost(newIngredients);
    };

    const addInitialIngredient = () => {
        setIngredients([...ingredients, { name: '', cost: null, isDisabled: false }]);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', cost: null, isDisabled: false }]);
        setMainCost(null);
        setIsIngredient(true);
    };

    const removeIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
        updateTotalCost(newIngredients);

        // Set isIngredient based on the new length of ingredients array
        if (newIngredients.length <= 1) {
            setIsIngredient(false);
            setMainCost(null);
            setTotalCost(null);
        }
    };

    const disableIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients[index].isDisabled = true;
        setIngredients(newIngredients);
    };

    const updateTotalCost = (ingredients: Ingredient[]) => {
        const newTotal = ingredients.reduce((sum, ingredient) => sum + (ingredient.cost ?? 0), 0);
        setTotalCost(newTotal === 0 ? null : newTotal);
    };

    return (
        <div className="border-b last:border-b-0 mb-4">
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <Input
                    type="number"
                    value={mainCost !== null ? mainCost : (totalCost !== null ? totalCost : '')}
                    onChange={(e) => setMainCost(e.target.value !== '' ? Number(e.target.value) : null)}
                    disabled={isIngredient}
                    className="border rounded p-2 mr-4 w-1/2 border-gray-300"
                    placeholder="Enter cost"
                />
                <span className="cursor-pointer text-2xl" onClick={toggleAccordion}>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isOpen && (
                <div className="p-2 bg-white">
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <Input
                                type="text"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                className="border rounded p-2 mr-2 flex-1 border-gray-300"
                                placeholder="Item name"
                            />
                            <Input
                                type="number"
                                value={ingredient.cost !== null ? ingredient.cost.toString() : ''}
                                onChange={(e) => handleIngredientChange(index, 'cost', e.target.value !== '' ? Number(e.target.value) : null)}
                                className="border rounded p-2 flex-1 border-gray-300"
                                placeholder="Cost"
                            />
                            {ingredient.isDisabled ? (
                                <button onClick={() => removeIngredient(index)} className="text-red-700 font-bold px-2">
                                <FaMinusCircle className='text-3xl'/>
                                </button>
                            ) : (
                                <button onClick={() => { disableIngredient(index); addIngredient(); }} className="text-sky-500 font-bold px-2">
                                <FaPlusCircle className='text-3xl'/>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Accordion;
