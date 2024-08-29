'use client'

import React, { useEffect, useCallback } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Accordion from "@/components/Accordion";
import Counter from "@/components/Counter";
import ProductList from "@/components/ProductList";
import Customer from "@/components/Customer";
import { Button } from "@/components/ui/button";
import Charts from '@/components/Charts';

type FormData = {
    mainCost: number | null;
    equipments: { name: string; cost: number | null; isDisabled: boolean }[];
    restaurantName: string;
    cuisineName: string;
    location: string;
    rent: number | null;
    workerPay: number | null;
    workerCounter: number;
    workerTotalPay: number;
    totalOperatingCost: number;
    population: number | null;
    percentage: number;
    totalCustomer: number;
    productsRevenue: { name: string; cost: number | null; price: number | null; customers: number | null; revenue: number | null; isAdded: boolean}[];
    totalProductsRevenue: number;
    totalRevenue: number;
  };

const Restaurant = () => {


    const { control, register, handleSubmit, watch, setValue } = useForm<FormData>({
        defaultValues: {
          mainCost: null,
          equipments: [{ name: '', cost: null, isDisabled: false }],
          restaurantName: '',
          cuisineName: '',
          location: '',
          rent: null,
          workerPay: null,
          workerCounter: 1,
          workerTotalPay: 0,
          totalOperatingCost: 0,
          population: null,
          percentage: 3,
          totalCustomer: 0,
          productsRevenue: [{ name:'', cost: null, price: null, customers: null, revenue: null, isAdded: false}],
          totalProductsRevenue: 0,
          totalRevenue: 0,
        },
      });

      const { fields: equipmentFields, append: appendEquipment, remove: removeEquipment, update: updateEquipment } = useFieldArray({
        control,
        name: 'equipments',
    });

    const { fields: productsRevenueFields, append: appendProductRevenue, remove: removeProductRevenue, update: updateProductRevenue } = useFieldArray({
        control,
        name: 'productsRevenue',
    });

    

    const handleTotalCostChange = useCallback((newTotalCost:number) => {
        setValue('workerTotalPay', newTotalCost);
      }, [setValue]);
      
    const handleCostChange = useCallback((newCost: number | null) => {
    setValue('workerPay', newCost);
    }, [setValue]);

    const handleTotalCustomerChange = useCallback((newTotalCost:number) => {
        setValue('totalCustomer', newTotalCost);
      }, [setValue]);
      
    const handleCustomerChange = useCallback((newCost: number | null) => {
    setValue('population', newCost);
    }, [setValue]);





    const calculateTotalOperatingCost = useCallback(() => {
        const mainCost = Number(watch('mainCost')) || 0;
        const rent = Number(watch('rent')) || 0;
        const workerTotalPay = Number(watch('workerTotalPay')) || 0;;
        const total = mainCost + rent + workerTotalPay;
        setValue('totalOperatingCost', total);
        
    }, [watch, setValue]);

    useEffect(() => {
        calculateTotalOperatingCost();
    }, [watch('mainCost'), watch('rent'), watch('workerTotalPay')]);

    const onSubmit = (data: FormData) => {
        const totalOperatingCost = data.totalOperatingCost || 0;
        const totalProductsRevenue = data.totalProductsRevenue || 0;

        // Calculate totalRevenue
        const totalRevenue = totalProductsRevenue - totalOperatingCost;
        setValue('totalRevenue', totalRevenue);

        console.log({ ...data, totalRevenue });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MaxWidthWrapper>
                <div className="my-10">
                    <div className='flex flex-col md:flex-row'>
                    <div>
                    <div className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Information</CardTitle>
                                <CardDescription>Tell more about your business...</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div style={{ marginBottom: '16px' }}>
                                    <Label htmlFor="businessName">Business Name</Label>
                                    <Input
                                        {...register("restaurantName")}
                                        placeholder="Business Name"
                                        className="border-gray-300"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <Label htmlFor="cuisineType">Type of Cuisine</Label>
                                    <Input
                                        {...register("cuisineName")}
                                        placeholder="Cuisine"
                                        className="border-gray-300"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        {...register("location")}
                                        placeholder="Location"
                                        className="border-gray-300"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cost</CardTitle>
                                <CardDescription>Let's calculate your cost projection...</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div style={{ marginBottom: '16px' }}>
                                    <Label htmlFor="equipmentCost">Equipment Cost</Label>
                                    <Accordion
                                        register={register}
                                        fields={equipmentFields}
                                        append={appendEquipment}
                                        remove={removeEquipment}
                                        update={updateEquipment}
                                        watch={watch}
                                        setValue={setValue}
                                        itemsKey='equipments'
                                        mainCostKey='mainCost'
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <Label htmlFor="rent">Rent/Mortgage</Label>
                                    <Input
                                        {...register("rent")}
                                        placeholder="Rent"
                                        className="border-gray-300"
                                        min="1"
                                    />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <Label htmlFor="worker">Workers</Label>
                                    <Controller
                                        control={control}
                                        name="workerCounter"
                                        render={({ field }) => (
                                            <Counter
                                            value={field.value}
                                            onChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            totalCost={watch('workerTotalPay')}
                                            onTotalCostChange={handleTotalCostChange}
                                            cost={watch('workerPay')}
                                            onCostChange={handleCostChange}
                                            />
                                        )}
                                        />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <Label htmlFor="total">Total Operating Cost</Label>
                                    <Input
                                        value={watch('totalOperatingCost')}
                                        placeholder="Total"
                                        readOnly
                                        disabled
                                        className="bg-gray-300 font-black"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    </div>
                    <div className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue</CardTitle>
                                <CardDescription>Let's calculate your revenue projection...</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                <Controller
                                        control={control}
                                        name="percentage"
                                        render={({ field }) => (
                                            <Customer
                                            percentage={field.value}
                                            onPercentageChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            totalCustomer={watch('totalCustomer')}
                                            totalCustomerChange={handleTotalCustomerChange}
                                            population={watch('population')}
                                            onPopulationChange={handleCustomerChange}
                                            />
                                        )}
                                />
                                </div>
                                <div>
                                    <ProductList
                                    register={register}
                                    fields={productsRevenueFields}
                                    append={appendProductRevenue}
                                    remove={removeProductRevenue}
                                    update={updateProductRevenue}
                                    watch={watch}
                                    setValue={setValue}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    </div>
                    <div className="flex justify-center my-4">
                        <Button type="submit">Calculate</Button>
                    </div>
                    <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Revenue</CardTitle>
                            <CardDescription>This is your projected monthly revenue</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex justify-center font-bold text-2xl'
                            style={{ marginBottom: '16px' }}>
                            {watch('totalRevenue')}
                            </div>
                            <div>
                                <Charts initialValue={watch('totalRevenue')}/>
                            </div>
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </MaxWidthWrapper>
        </form>
    );
};

export default Restaurant;
