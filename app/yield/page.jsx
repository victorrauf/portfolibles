"use client"
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField,Button,Dialog,DialogContent,DialogActions } from "@mui/material";

const rules = yup.object().shape({
    title:yup.string().required().min(3),
    quantity:yup.number().required().min(1),
    initialPrice:yup.number().required(),
    newPrice:yup.number().required(),
});

export default function Yield() {
    const [assetValue,setAssetValue] = React.useState(undefined);
    const [percProfit,setPercProfit] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { values,handleSubmit,touched,errors,handleChange} = useFormik({
        initialValues:{title:'',quantity:0,initialPrice:0,newPrice:0},
        onSubmit:() => {
            setAssetValue(values.quantity*values.newPrice);//new value

            const costPrice = values.initialPrice * values.quantity;
            const sellingPrice = values.newPrice * values.quantity;
            const profit = sellingPrice - costPrice;
            const percentageProfit = (profit / costPrice) * 100;
            setPercProfit(percentageProfit);//percent profit

            handleClickOpen();
        },
        validationSchema:rules
    });

    return (
        <>
        <main className="w-full flex justify-center px-3 md:px-12 lg:px-16 py-12 bg-gradient-to-b from-[#F0ECE5] via-white to-[#B6BBC4]">
            <section className="w-[320px] md:w-full min:h-screen md:h-screen flex justify-center rounded-lg p-6">
                <form onSubmit={handleSubmit} className="w-full md:w-[380px] flex flex-col gap-4 border border-gray-300 p-4">
                    <div className="mb-3">
                        <TextField 
                        id="title" 
                        label="title" 
                        variant="outlined" 
                        placeholder="title"
                        className="w-full"
                        value={values.title}
                        onChange={handleChange}
                        />
                        {touched.title && errors.title ? <span className="text-xs text-red-500">{errors.title}</span> : null}
                    </div>
                    <div className="mb-3">
                        <TextField 
                        type="number"
                        id="quantity" 
                        label="quantity" 
                        variant="outlined" 
                        placeholder="quantity"
                        className="w-full"
                        value={values.quantity}
                        onChange={handleChange}
                        />
                        {touched.quantity && errors.quantity ? <span className="text-xs text-red-500">{errors.quantity}</span> : null}
                    </div>
                    <div className="mb-3">
                        <TextField 
                        type="number"
                        id="initialPrice" 
                        label="initialPrice" 
                        variant="outlined" 
                        placeholder="initialPrice"
                        className="w-full"
                        value={values.initialPrice}
                        onChange={handleChange}
                        />
                        {touched.initialPrice && errors.initialPrice ? <span className="text-xs text-red-500">{errors.initialPrice}</span> : null}
                    </div>
                    <div className="mb-3">
                        <TextField 
                        type="number"
                        id="newPrice" 
                        label="newPrice" 
                        variant="outlined" 
                        placeholder="newPrice"
                        className="w-full"
                        value={values.newPrice}
                        onChange={handleChange}
                        />
                        {touched.newPrice && errors.newPrice ? <span className="text-xs text-red-500">{errors.newPrice}</span> : null}
                    </div>
            
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary"
                    style={{padding:12}}>CALCULATE</Button>
                </form>
            </section>
        </main>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <div className="w-full">
                    <div className="flex justify-between items-center border-b border-gray-300 p-4">
                        <p className="font-thin text-gray-600">Ticker</p>
                        <p className="font-thin text-gray-800 text-lg uppercase">{values.title}</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-300 p-4">
                        <p className="font-thin text-gray-600">Quantity</p>
                        <p className="font-thin text-gray-800 text-lg">{values.quantity} {values.title}</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-300 p-4">
                        <p className="font-thin text-gray-600">Initial Price</p>
                        <p className="font-thin text-gray-800 text-lg">${values.initialPrice}</p>
                    </div>
                    <div className="flex justify-between items-center p-4">
                        <p className="font-thin text-gray-600">New Price</p>
                        <p className="font-thin text-gray-800 text-lg">${values.newPrice}</p>
                    </div>
                    <div className="flex gap-4 items-center border border-gray-300 p-4 rounded-md">
                        <div className="flex flex-col gap-3 border border-gray-300 p-2 rounded-md">
                            <blockquote className="flex items-center border-b border-gray-300 p-2">
                                <p className="font-thin text-gray-800 text-lg uppercase">Value</p>
                            </blockquote>
                            <blockquote className="flex items-center p-2">
                                <p className="font-thin text-gray-800 text-3xl">${assetValue}</p>
                            </blockquote>
                        </div>
                        <div className="flex flex-col gap-3 border border-gray-300 p-2 rounded-md">
                            <blockquote className="flex items-center border-b border-gray-300 p-2">
                                <p className="font-thin text-gray-800 text-lg uppercase">% Profit</p>
                            </blockquote>
                            <blockquote className="flex items-center p-2">
                                <p className="font-thin text-gray-800 text-3xl">{Math.round(percProfit)}</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

//ACCESS qty:500 at 0.21k, [value] when price get 0.47k
//qty,initial_price,new_price,title
//perc profi