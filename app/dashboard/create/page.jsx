"use client";
import React from "react";
import Link from "next/link";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import * as yup from "yup";
import { db,storage } from "@/lib/firebase";
import { collection,addDoc,updateDoc,doc } from "firebase/firestore";
import { ref,uploadString,getDownloadURL } from "firebase/storage";

const rules = yup.object().shape({
    title:yup.string().required().min(3),
    wallet:yup.string().required().min(26).max(62),
    price:yup.number().required(),
    ticker:yup.string().required().min(3),
    notes:yup.string(),
    quantity:yup.number().required().min(1),
})

export default function Create () {
    const [open, setOpen] = React.useState(false);
    const [openProgress,setOpenProgress] = React.useState(false);
    const [selectedFile,setSelectedFile] = React.useState(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = readerEvent => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // create records in firestore -------
    const createRecords = async () => {
        const docRef = await addDoc(collection(db,"assets"),{
            title: values.title,
            wallet:values.wallet,
            price:values.price,
            ticker:values.ticker,
            quantity:values.quantity,
            notes:values.notes,
            timestamp:new Date().getTime(),
            createdBy:null,
        });
        
        const imageRef = ref(storage,`assets/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef,selectedFile,"data_url")
            .then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db,"assets",docRef.id),{
                    thumbnail:downloadURL
                });
            })

            setOpenProgress(false);
            handleClickOpen();
        } else {
            setOpenProgress(false);
            handleClickOpen();
        }
    }

    const { values,handleSubmit,touched,errors,handleChange} = useFormik({
        initialValues:{title:'',wallet:'',price:0,ticker:'',notes:'',quantity:0},
        onSubmit:(values) => {
            setOpenProgress(true);

            //call function to write to firestore db
            createRecords()
        },
        validationSchema:rules
    });

    return (
        <>
        <main className="min-h-[480px] flex justify-center px-3 md:px-12 lg:px-24 py-12">
            <form onSubmit={handleSubmit} className="w-full md:w-[380px] flex flex-col gap-4 border border-gray-300 p-4">
                <div>
                    <TextField 
                    id="title" 
                    label="title" 
                    variant="standard" 
                    placeholder="title"
                    className="w-full"
                    value={values.title}
                    onChange={handleChange}
                    />
                    {touched.title && errors.title ? <span className="text-xs text-red-500">{errors.title}</span> : null}
                </div>
                <div>
                    <TextField 
                    id="wallet" 
                    label="wallet" 
                    variant="standard" 
                    placeholder="wallet"
                    className="w-full"
                    value={values.wallet}
                    onChange={handleChange}
                    />
                    {touched.wallet && errors.wallet ? <span className="text-xs text-red-500">{errors.wallet}</span> : null}
                </div>
                <div>
                    <TextField 
                    type="number"
                    id="price" 
                    label="price" 
                    variant="standard" 
                    placeholder="price"
                    className="w-full"
                    value={values.price}
                    onChange={handleChange}
                    />
                    {touched.price && errors.price ? <span className="text-xs text-red-500">{errors.price}</span> : null}
                </div>
                <div>
                    <TextField 
                    id="ticker" 
                    label="ticker" 
                    variant="standard" 
                    placeholder="ticker"
                    className="w-full"
                    value={values.ticker}
                    onChange={handleChange}
                    />
                    {touched.ticker && errors.ticker ? <span className="text-xs text-red-500">{errors.ticker}</span> : null}
                </div>
                <div>
                    <TextField 
                    type="number"
                    id="quantity" 
                    label="quantity" 
                    variant="standard" 
                    placeholder="quantity"
                    className="w-full"
                    value={values.quantity}
                    onChange={handleChange}
                    />
                    {touched.quantity && errors.quantity ? <span className="text-xs text-red-500">{errors.quantity}</span> : null}
                </div>
                <div>
                    <TextField 
                    multiline={true}
                    rows={3}
                    id="notes" 
                    label="notes" 
                    variant="standard" 
                    placeholder="notes"
                    className="w-full"
                    value={values.notes}
                    onChange={handleChange}
                    />
                    {touched.notes && errors.notes ? <span className="text-xs text-red-500">{errors.notes}</span> : null}
                </div>
                <div>
                    <input 
                    className=""
                    type="file"
                    accept="image/*"
                    onChange={addImageToPost}
                    />
                </div>
           
                <Button type="submit" variant="contained" color="secondary">
                    {openProgress ? <CircularProgress style={{color:"white"}}/> : <span>CREATE PORTFOLIO</span>}
                </Button>
            </form>
        </main>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Feedback</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Your asset was added successfully!
                </DialogContentText>

                <Link 
                className="block bg-stone-600 py-1 px-2 text-stone-50 rounded-sm mt-4"
                href="/dashboard">Return to Dashboard</Link>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}