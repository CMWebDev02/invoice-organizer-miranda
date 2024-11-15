import * as fs from 'fs/promises';

export class FileSystem {
    constructor() {
        this._invoiceDirPath = 'D:\\Invoices';
        this._customerDirPath = './Customers';

        // Have the paths for these directories be read out of a file that the user will initialize upon first launching the application.
    }

    async validateMainDirectories() {
        let isCustomerFoldersPathValid = await this._checkPath(this._customerDirPath);
        let isInvoiceDirectoryValid = await this._checkPath(this._invoiceDirPath);
        if (isCustomerFoldersPathValid && isInvoiceDirectoryValid) return {valid: true, message: 'All Directory Paths are valid.'};

        let errorMessage = 'Invalid Paths:\n';
        
        //? Checks that the two main directories exist within at their specified path else an error for them is thrown.
        if (!isInvoiceDirectoryValid) errorMessage += `Invoice Directory does not exist - ${this.invoiceDirPath}\n`;
        if (!isCustomerFoldersPathValid) errorMessage += `Customer Folders Directory does not exist - ${this._customerDirPath}\n`;

        return {valid: false, message: errorMessage};
    }

    async _checkPath(path) {
        try {
            //* Attempts to check the user's permissions for a file or directory, and if it can read the permissions from said file or directory it exists.
            await fs.access(path);
            return true;
        } catch (error) {
            //* If an error occurs due to the path not leading to any file or directory, then the file does not exist.
            return false;
        }
    } 

    async getAllCustomerFolders() {
        try {
            //? First gathers the various letter folders within the customer folder directory
            if (!(await this._checkPath(this._customerDirPath))) throw new Error('Customer Folder Directory path is invalid.');
            let alphabetFolders = await fs.readdir(this._customerDirPath);
            let customerFolders = [];
            //? Iterates through all of the letter folders
            for await (const letter of alphabetFolders) {
                //* If the name of the folder is longer than one character, then it is not a letter folder and can be skipped over.
                if (letter.length > 1) continue;
                //? Appends an array of all customer folder names within the current letter folder
                let customers = await fs.readdir(`${this._customerDirPath}/${letter}`);
                customerFolders.push(customers);
            }
            
            // Returns the array in alphabetical order of all the customer names.
            return customerFolders;
        } catch (error) {
            console.error(error);
        }
    }

    async getFirstInvoice() {
        try {
            //? Reads the folder where all the invoice are located and for the first invoice in the list and saves it path as a string.
            let invoiceFolder = await fs.readdir(this._invoiceDirPath);
            
            let offset = 0;
            let invoicePath = '';
            let invoiceStat;
            do {
                if (invoiceFolder.length <= offset) throw new Error('No Valid Files Within Invoice Directory.');
                invoicePath = `${this._invoiceDirPath}/${invoiceFolder[offset]}`;
                offset++;
                invoiceStat = await fs.stat(invoicePath)
            } while (!invoiceStat.isFile());
    
            //* Reads the file and saves it output and encodes it to base64 to convert the binary data to readable text
            //* that the webpages can handle,
                //! skipping this step resulted in the binary data becoming corrupted once it was received by the client.
            let fileStream = await fs.readFile(invoicePath)
    
            let encodedFileStream = fileStream.toString('base64')
    
            return [invoicePath, encodedFileStream];
        } catch (error) {
            console.error(error);
        }
    }
    
    async sortFile(queries) {
        try {
            const {customerFolder, letterFolder, filePath, fileName} = queries;
    
            const customerFolderPath = `${this._customerDirPath}/${letterFolder}/${customerFolder}`

            if (!(await this._checkPath(customerFolderPath))) {
                throw new Error(`Transfer Failed - ${customerFolder} does not exist!`);
            }
            
            let copyTransfer = await fs.copyFile(filePath, `${customerFolderPath}/${fileName}`)
            let removeFile;
    
            if (!copyTransfer) {
                removeFile = await fs.rm(filePath)
            }
    
            return [!removeFile, `Transfer Successful - ${fileName} moved to ${customerFolder}.`];
        } catch (error) {
            console.error(error)
            return [false, error.message];
        }
    }
}