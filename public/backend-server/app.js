import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

import * as fileAccess from './filesystem.js'

const backEnd = express();
const port = 3000;

backEnd.use(cors({
    origin: 'http://localhost:5173/',
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
        let invoice = await fileAccess.getFirstInvoice();
        res.sendFile(invoice);
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