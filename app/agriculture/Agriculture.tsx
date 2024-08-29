'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React,{useState} from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { useForm } from "react-hook-form";
import Accordion from "@/components/Accordion";
import Counter from "@/components/Counter";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import CropList from '@/components/CropList';


interface Ingredient {
    name: string;
    cost: number | null;
    isDisabled: boolean;
  }

const Agriculture = () => {

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const [mainEquipmentCost, setMainEquipmentCost] =useState<number | null>(null);
    const [totalEquipmentCost, setTotalEquipmentCost] =  useState<number | null>(null);
    const [equipment, setEquipment] = useState<Ingredient[]>([]);

    const [mainUtilityCost, setMainUtilityCost] =  useState<number | null>(null);
    const [totalUtilityCost, setTotalUtilityCost] =  useState<number | null>(null);
    const [utility, setUtility] = useState<Ingredient[]>([]);

    const [mainOtherCost, setMainOtherCost] =  useState<number | null>(null);
    const [totalOtherCost, setTotalOtherCost] =  useState<number | null>(null);
    const [other, setOther] = useState<Ingredient[]>([]);

    const [workerCounter, setWorkerCounter] =  useState<number>(1);
    const [workerPay, setWorkerPay] =  useState<number>(0);


  return (
    <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
    <MaxWidthWrapper>
    <div className="my-10">

        <div className="w-1/3">
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

        <div className="w-1/3">
        <Card>
        <CardHeader>
          <CardTitle>Cost</CardTitle>
          <CardDescription>Let's calculate your cost projection...</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ marginBottom: '16px' }}>
            <Label htmlFor="equipmentCost">Equipment Cost</Label>
            <Accordion 
            mainCost={mainEquipmentCost}
            setMainCost={setMainEquipmentCost}
            totalCost={totalEquipmentCost}
            setTotalCost={setTotalEquipmentCost}
            ingredients={equipment}
            setIngredients={setEquipment}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Label htmlFor="utilityCost">Utility Cost (Electricity, Water, Gas...)</Label>
            <Accordion 
            mainCost={mainUtilityCost}
            setMainCost={setMainUtilityCost}
            totalCost={totalUtilityCost}
            setTotalCost={setTotalUtilityCost}
            ingredients={utility}
            setIngredients={setUtility}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Label htmlFor="rent">Rent/Mortgage</Label>
            <Input
              {...register("rent")} 
              placeholder="Rent"
              className="border-gray-300"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Label htmlFor="worker">Workers</Label>
            <Counter
            value={workerCounter}
            onChange={setWorkerCounter}
            totalCost={workerPay}
            onTotalCostChange={setWorkerPay}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Label htmlFor="utilityCost">Other Cost (Marketing, Tax, Insurance...)</Label>
            <Accordion 
            mainCost={mainOtherCost}
            setMainCost={setMainOtherCost}
            totalCost={totalOtherCost}
            setTotalCost={setTotalOtherCost}
            ingredients={other}
            setIngredients={setOther}
            />
          </div>
        </CardContent>
        </Card>
        </div>

        <div className="w-full">
        <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Let's calculate your revenue projection...</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <CropList/>
          </div>
        </CardContent>
        </Card>
        </div>


    </div>
    </MaxWidthWrapper>
    </form>
  )
}

export default Agriculture