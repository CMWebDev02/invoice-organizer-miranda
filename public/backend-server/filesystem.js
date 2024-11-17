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

    async _validatePaths(pathArray) {
        try {
            for (const path of pathArray) {
                if (!(await this._checkPath(path))) {
                    throw new Error(`Transfer Failed - ${path} does not exist!`);
                }
            }

            return [true, null];
        } catch (error) {
            return [false, error.message]
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
            let invoiceName = '';
            let invoiceStat;
            do {
                if (invoiceFolder.length <= offset) throw new Error('No Valid Files Within Invoice Directory.');
                invoicePath = `${this._invoiceDirPath}/${invoiceFolder[offset]}`;
                invoiceName = invoiceFolder[offset]
                offset++;
                invoiceStat = await fs.stat(invoicePath)
            } while (!invoiceStat.isFile());
    
            //* Reads the file and saves it output and encodes it to base64 to convert the binary data to readable text
            //* that the webpages can handle,
                //! skipping this step resulted in the binary data becoming corrupted once it was received by the client.
            let fileStream = await fs.readFile(invoicePath)
    
            let encodedFileStream = fileStream.toString('base64')
    
            return [invoiceName, encodedFileStream];
        } catch (error) {
            console.error(error);
        }
    }

    async _checkForYearFolder(customerFolderPath, year) {
        try {
            let customerYearPath = `${customerFolderPath}/${year}`
            if (!(await this._checkPath(customerYearPath))) {
                let hasCreationFailed = await fs.mkdir(customerYearPath);
                if (hasCreationFailed) throw new Error(`Failed to make a ${year} year directory within ${customerFolderPath}.`)
            }

            return [true, customerYearPath];
        } catch (error) {
            console.error(error)
            return [false, error.message];
        }
    }
    
    async sortFile(queries) {
        try {
            //? Separates the query parameters that were passed with the fetch call.
            let {customerFolderPath, customerName, invoiceName, year} = queries;
    
            //? Construct the paths for the customer folder and the invoice using the base paths specified.
            let invoiceFilePath = `${this._invoiceDirPath}/${invoiceName}`;
            customerFolderPath = `${this._customerDirPath}/${customerFolderPath}`;
            
            //? Validate the invoice and customer folder path constructed above.
            let arePathsValid = await this._validatePaths([customerFolderPath, invoiceFilePath])
            if (!arePathsValid[0]) throw new Error(arePathsValid[1]);
            
            //? Validate that a year folder already exist within the customer folder, and if not one is created.
            //! If any error results from attempting to create one the error is thrown to stop all proceeding code.
            let [isYearFolderCreated, yearFolderCheckResult] = await this._checkForYearFolder(customerFolderPath, year);
            if (!isYearFolderCreated) throw new Error(yearFolderCheckResult);
            
            //? Attempts to copy the file over since this allows the invoice and customer folder directory to be housed on separate drive without issue.
            let hasFileCopyFailed = await fs.copyFile(invoiceFilePath, `${yearFolderCheckResult}/${invoiceName}`)
            //? Initializes a new variable that will be used to store the result of deleting the invoice from its original location since it is copied, 
            //! and this should be done only if the transfer succeeded.
            let hasFileDeletionFailed;
    
            //? Checks if the copy was successful and if so delete the file from the original location and return true and a successful transfer message.
            if (!hasFileCopyFailed) {
                hasFileDeletionFailed = await fs.rm(invoiceFilePath)
                //* One final check to determine if the file deletion succeeded.
                if (hasFileDeletionFailed) throw new Error('Failed to remove invoice from original location!')

                return [true, `Transfer Successful - ${invoiceName} moved to ${customerName}.`];
            } else {
                throw new Error('Failed to copy invoice to new location!')
            }
        } catch (error) {
            console.error(error)
            return [false, `Transfer Failed - ${invoiceName} failed to transfer to ${customerName}.`];
        }
    }
}