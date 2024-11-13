import * as fs from 'fs/promises';

const invoiceDirPath = './Invoices'
const customerDirPath = './Customers'

export async function getAllCustomerFolders() {
    try {
        //? First gathers the various letter folders within the customer folder directory
        let alphabetFolders = await fs.readdir(customerDirPath);
        let customerFolders = [];
        //? Iterates through all of the letter folders
        for await (const letter of alphabetFolders) {
            //? Appends an array of all customer folder names within the current letter folder
            let customers = await fs.readdir(`${customerDirPath}/${letter}`);
            customerFolders.push(customers);
        }
        
        // Returns the array in alphabetical order of all the customer names.
        return customerFolders;
    } catch (error) {
        console.error(error);
    }
}

export async function getFirstInvoice() {
    try {
        let invoiceFolder = await fs.readdir(invoiceDirPath);
        let invoicePath = fs.realpath(`${invoiceDirPath}/${invoiceFolder[0]}`);

        return invoicePath;
    } catch (error) {
        console.error(error);
    }
}