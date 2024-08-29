'use client';

import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from '../ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useModal } from '../ModalContext';

type FormFields = {
  email: string;
  password: string;
};

const RegisterModal = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormFields>();

  const { isOpenRegister, closeRegisterModal } = useModal();

  const onClose = () => { 
    closeRegisterModal();
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log('User registered successfully:', result);
      
      // Optionally, you can close the modal or navigate to a different page
      closeRegisterModal();

    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const body = (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <div>
        <Input
          placeholder='Email'
          {...register('email', { required: 'Email is required' })}
          type='email'
        />
        {errors.email && (
          <div className='text-sm text-red-700'>
            {errors.email.message}
          </div>
        )}
      </div>
      <div>
        <Input
          placeholder='Password'
          {...register('password', 
          { 
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            }
          })}
          type='password'
        />
        {errors.password && (
          <div className='text-sm text-red-700'>
            {errors.password.message}
          </div>
        )}
      </div>
      <Button type='submit'>Register Now</Button>
    </form>
  );

  if (!isOpenRegister) return null;

  return (
    <div
      className='
      justify-center 
      items-center 
      flex 
      overflow-x-hidden 
      overflow-y-auto 
      fixed 
      inset-0 
      z-50
      outline-none 
      focus:outline-none
      bg-neutral-800/70
      '
    >
      <div 
        className='
        relative 
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        my-6
        mx-auto 
        h-full 
        lg:h-auto
        md:h-auto'
      >
        <div className={`
          translate
          duration-300
          h-full
          ${isOpenRegister ? 'translate-y-0' : 'translate-y-full'}
          ${isOpenRegister ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className='
            translate
            h-full
            lg:h-auto
            md:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-white 
            outline-none 
            focus:outline-none'
          >
            <div className='
              flex 
              items-center 
              p-6
              rounded-t
              justify-center
              relative
              border-b-[1px]
            '>
              <button
                className="
                  p-1
                  border-0 
                  hover:opacity-70
                  transition
                  absolute
                  left-9
                "
                onClick={onClose}
              >
                <IoMdClose size={18} />
              </button>
            </div>
            <div className="text-lg font-semibold px-4">
              {'Register your account here'}
            </div>
            <div className="relative p-6 flex-auto">
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
