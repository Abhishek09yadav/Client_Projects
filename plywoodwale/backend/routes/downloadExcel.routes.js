import express from "express";
import {downloadExcel} from "../controller/controller.downloadExcel.js";

const router = express.Router();

router.get('/downloadExcel', downloadExcel)

export default router;