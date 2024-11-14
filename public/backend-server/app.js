import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

import * as fileAccess from './filesystem.js'

const backEnd = express();
const port = 3000;

backEnd.use(cors({
    origin: 'http://localhost:5173/',
    // This header needs to be exposed to the user to provide the relative path that will be used for moving the invoice
    exposedHeaders: 'x-invoice-organizer-file-path',
}))

backEnd.get('/getDirectories', async (req, res) => {
    try {
        let customers = await fileAccess.getAllCustomerFolders();
        res.send({customersArray: customers});
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send('Server Error');
    }
})

backEnd.get('/getInvoice', async (req, res) => {
    try {
        let [ invoiceRelativePath, invoiceAbsolutePath ] = await fileAccess.getFirstInvoice();

        res.header({'x-invoice-organizer-file-path': invoiceRelativePath}).sendFile(invoiceAbsolutePath);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send('Server Error');
    }
})

backEnd.get('/test', async (req, res) => {
    try {
        res.send({data: 'Successfully connected.'});
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send('Server Error');
    }
})

backEnd.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})