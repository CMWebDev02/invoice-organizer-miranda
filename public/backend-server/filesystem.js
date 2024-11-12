import * as fs from 'node:fs/promises';

const invoiceDirPath = './Invoices'
const customerDirPath = './Customers'

export async function getAllCustomerFolders() {
    try {
        //? First gathers the various letter folders within the customer folder directory
        let customerDir = await fs.opendir(customerDirPath);
        let customerFolders = [];
        //? Iterates through all of the letter folders
        for await (const alphabet of customerDir) {
            //? Appends an array of all customer folder names within the current letter folder
            let customers = await fs.readdir(`${alphabet.parentPath}/${alphabet.name}`, {recursive: true});
            customerFolders.push(customers);
        }
        
        // Returns the array in alphabetical order of all the customer names.
        return customerFolders;
    } catch (error) {
        console.error(error);
    }
}