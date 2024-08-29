'use client'

import React from 'react'

import { useForm, useFieldArray } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'


const DynamicArray = () => {

    const {control, register} = useForm({
        defaultValues: {
            phoneNumbers: [{number: ''}]
        }
    })

    const {fields, append, remove} = useFieldArray({
        name: 'phoneNumbers',
        control
    })

  return (
    <div className='m-4'>
    <Label>Phone Numbers</Label>
    {fields.map((field, index) => {
        return (
        <div 
        className='form-control flex gap-2 mb-2' 
        key={field.id}>
            
        <Input
        className='border-black'
        type = 'text'
        {...register(`phoneNumbers.${index}.number`)}
        />
        {index > 0 && <Button
            type='button'
            onClick={()=> remove(index)}
            >
                Remove
        </Button>
        }
        </div>
        )
    })}
    <Button
    type='button'
    onClick={()=> append( {number:''})}
    >
        Add
    </Button>
    </div>
  )
}

export default DynamicArray