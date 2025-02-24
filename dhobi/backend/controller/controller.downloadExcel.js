import Form from "../models/Form.models.js";
import ExcelJS from 'exceljs';
import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

export const downloadExcel = async (req,res) =>{
    // res.status(200).json({message:"Download Excel"})
    try{
const forms = await Form.find({});

        // Create a new workbook and worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Forms');
 worksheet.columns = [
     { header: 'Name', key: 'name', width: 20 },
     { header: 'Email', key: 'email', width: 25 },
     { header: 'Mobile', key: 'mobile', width: 15 },
     { header: 'Address', key: 'address', width: 30 },
     { header: 'Services', key: 'services', width: 20 },
     { header: 'Pickup Date', key: 'pickup_date', width: 15 },
     { header: 'Pickup Time', key: 'pickup_time', width: 15 },
     { header: 'Date', key: 'date', width: 20 }

 ]
        forms.forEach(form => {
            worksheet.addRow({
                name: form.name,
                email: form.email,
                mobile: form.mobile,
                address: form.address,
                services: form.services,
                pickup_date: form.pickup_date,
                pickup_time: form.pickup_time,
                date: form.Date
            })
        })
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                     );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=forms.xlsx'
        );
        await workbook.xlsx.write(res);
        res.end();
    }
    catch(error){
        console.log('error generating excel file')
        res.status(500).json({message:'error generating excel file 🙁'});
    }
}
