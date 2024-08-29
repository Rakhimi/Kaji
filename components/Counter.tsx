'use client';

import React, { useCallback, useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  cost: number | null;
  onCostChange: (value: number | null) => void;
  totalCost: number;
  onTotalCostChange: (totalCost: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  cost,
  onCostChange,
  totalCost,
  onTotalCostChange
}) => {

  useEffect(() => {
    if (cost !== null) {
      onTotalCostChange(cost * value);
    } else {
      onTotalCostChange(0 * value)
    }
  }, [cost, value, onTotalCostChange]);

  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value !== '' ? Number(e.target.value) : null;
    onCostChange(inputValue);
  };

  return (
    <div className="flex gap-1">
      <Input
        placeholder="Cost"
        className="border-gray-400"
        type="number"
        value={cost !== null ? cost : ''}
        onChange={handleCostChange}
        min="1"
      />
      <div className="flex flex-row items-center gap-2 select-none">
        <div
          onClick={onReduce}
          style={{ color: 'white' }}
          className="
            w-7
            h-7
            rounded-full
            border-neutral-400
            flex
            items-center
            justify-center
            cursor-pointer
            hover:opacity-80
            transition
            bg-red-600
          "
        >
          <FaMinusCircle />
        </div>
        <div
          className="
            font-bold
            text-xl
            text-neutral-800
            pointer-events-none
          "
        >
          {value}
        </div>
        <div
          onClick={onAdd}
          style={{ color: 'white' }}
          className="
            w-7
            h-7
            rounded-full
            border-neutral-400
            flex
            items-center
            justify-center
            cursor-pointer
            hover:opacity-80
            transition
            bg-sky-500
          "
        >
          <FaPlusCircle />
        </div>
      </div>
      <Input
        placeholder="Total Cost"
        className="bg-gray-300 font-black"
        value={totalCost}
        disabled
      />
    </div>
  );
};

export default Counter;
