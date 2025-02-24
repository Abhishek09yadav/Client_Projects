import Form from "../models/Form.models.js";
import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

export const downloadExcel = (req,res) =>{
    res.status(200).json({message:"Download Excel"})
}
