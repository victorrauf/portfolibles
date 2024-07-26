"use client"
import React from "react";
import Image from "next/image";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { FaTrash,FaPencilAlt } from "react-icons/fa";
import { db } from "@/lib/firebase";
import { deleteDoc,doc,updateDoc } from "firebase/firestore";
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

const rules = yup.object().shape({
    title:yup.string().required().min(3),
    wallet:yup.string().required().min(26).max(62),
    price:yup.number().required(),
    ticker:yup.string().required().min(3),
    notes:yup.string(),
    quantity:yup.number().required().min(1),
});

export function AssetTab ({id,title,qty,tick,holdWallet,price,notes,img}) {
    const [open, setOpen] = React.useState(false);
    const [openProgress,setOpenProgress] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openProgressUpdate,setOpenProgressUpdate] = React.useState(false);
    const handleClickOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);

    const handleDelete = async () => {
        setOpenProgress(true);//start progress indicator

        await deleteDoc(doc(db,'assets',id))
        .then(() => {
            setOpenProgress(false);//stop progress indicator
            handleClose();//close the dialog box
        })
        .catch(e => {
            console.error(e);
            setOpenProgress(false);//stop progress indicator
            handleClose();//close the dialog box
            alert("Unable to complete action");
        })
    }

    // update records in firestore -------
    const updateRecords = async () => {
        setOpenProgressUpdate(true);//start progress indicator

        await updateDoc(doc(db,"assets",id),{
            title: values.title,
            wallet:values.wallet,
            price:values.price,
            ticker:values.ticker,
            quantity:values.quantity,
            notes:values.notes,
            updatedAt:new Date().getTime(),
        }).then(() => {
            setOpenProgressUpdate(false);
            handleCloseUpdate();
        }).catch(err => {
            console.error(err);
            setOpenProgressUpdate(false);
            handleCloseUpdate();
            alert("There was a problem")
        })
    }

    const { values,handleSubmit,touched,errors,handleChange} = useFormik({
        initialValues:{title:title,wallet:holdWallet,price:price,ticker:tick,notes:notes,quantity:qty},
        onSubmit:(values) => {
            updateRecords()
        },
        validationSchema:rules
    });

    return (
        <>
        <div className="min-h-[54px] flex justify-between items-center bg-[#161A30] rounded-lg p-3">
            <div className="flex items-center gap-1">
                <blockquote className="bg-gray-50 rounded-md">
                    <Image 
                    width={36} 
                    height={36} 
                    src={img ? img : "/placeholder.png"} 
                    alt="asset image"
                    className="rounded-lg"/>
                </blockquote>
                <span className="text-[#F0ECE5] text-xs uppercase">{title}</span>
            </div>

            <span className="text-[#F0ECE5] text-xs uppercase">{qty} {tick}</span>

            <blockquote className="flex items-center text-xs gap-1">
                <CiWallet className="text-[#F0ECE5]"/>
                <span className="text-[#F0ECE5]">...{holdWallet.substr(holdWallet.length - 4)}</span>
            </blockquote>

            <blockquote className="flex items-center gap-3">
                <FaPencilAlt 
                onClick={handleClickOpenUpdate}
                className="text-xl text-[#F0ECE5] cursor-pointer"/>
                <FaTrash 
                onClick={handleClickOpen}
                className="text-xl text-[#F0ECE5] cursor-pointer"/>
                <BsBoxArrowUpRight className="text-xl text-[#F0ECE5]"/>
            </blockquote>
        </div>
        
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Confirm Action</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this asset?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} variant="contained" color="error">
                    {openProgress ? <CircularProgress color="info"/> : <span>DELETE</span>}
                </Button>
            </DialogActions>
        </Dialog>

        {/* update asset dialog */}
        <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Update Asset</DialogTitle>
            <DialogContent>
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
            
                    <Button type="submit" variant="contained" color="secondary">
                        {openProgressUpdate ? <CircularProgress style={{color:"white"}}/> : <span>UPDATE ASSET</span>}
                    </Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseUpdate}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}