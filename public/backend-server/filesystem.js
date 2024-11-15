import * as fs from 'fs/promises';

const invoiceDirPath = 'D:\\Invoices'
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
        //? Reads the folder where all the invoice are located and for the first invoice in the list and saves it relative path.
        let invoiceFolder = await fs.readdir(invoiceDirPath);
        let invoiceRelativePath = `${invoiceDirPath}/${invoiceFolder[0]}`

        //* Reads the file and saves it output and encodes it to base64 to convert the binary data to readable text
        //* that the webpages can handle,
            //! skipping this step resulted in the binary data becoming corrupted once it was received by the client.
        let fileStream = await fs.readFile(invoiceRelativePath)

        let encodedFileStream = fileStream.toString('base64')

        return [invoiceRelativePath, encodedFileStream];
    } catch (error) {
        console.error(error);
    }
}

export async function sortFile(queries) {
    try {
        const {customerFolder, letterFolder, filePath, fileName} = queries;
        console.log(customerFolder, letterFolder, filePath, fileName)

        const toCustomerFolder = `${customerDirPath}/${letterFolder}/${customerFolder}/${fileName}`

        let copyTransfer = await fs.copyFile(filePath, toCustomerFolder)
        let removeFile;

        if (!copyTransfer) {
            removeFile = await fs.rm(filePath)
        }

        return !removeFile;
    } catch (error) {
        console.error(error)
    }
}