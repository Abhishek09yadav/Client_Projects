import Form from "../models/Form.models.js";
import ExcelJS from 'exceljs';
import express from 'express';

export const downloadExcel = async (req, res) => {
    try {
        const forms = await Form.find({});

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Forms');
        worksheet.columns = [
            { header: 'Student Name', key: 'studentName', width: 20 },
            { header: 'WhatsApp', key: 'whatsapp', width: 20 },
            { header: 'Guardian Name', key: 'guardianName', width: 25 },
            { header: 'Guardian Phone', key: 'guardianPhone', width: 20 },
            { header: 'Guardian Relation', key: 'guardianRelation', width: 20 },
            { header: 'Course', key: 'course', width: 20 },
            { header: 'Hostel Name', key: 'hostelName', width: 25 },
            { header: 'Hostel Type', key: 'hostelType', width: 15 },
            { header: 'ID Proof Type', key: 'idProofType', width: 20 },
            { header: 'ID Proof', key: 'idProof', width: 30 },
            { header: 'Room No', key: 'roomNo', width: 15 },
            { header: 'Booking Date', key: 'BookingDate', width: 20 }
        ];

        forms.forEach(form => {
            worksheet.addRow({
                studentName: form.studentName,
                whatsapp: form.whatsapp,
                guardianName: form.guardianName,
                guardianPhone: form.guardianPhone,
                guardianRelation: form.guardianRelation,
                course: form.course,
                hostelName: form.hostelName,
                hostelType: form.hostelType,
                idProofType: form.idProofType,
                idProof: form.idProof,
                roomNo: form.roomNo,
                BookingDate: form.BookingDate
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=hostel_bookings.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).json({ message: 'Error generating Excel file 🙁' });
    }
};
