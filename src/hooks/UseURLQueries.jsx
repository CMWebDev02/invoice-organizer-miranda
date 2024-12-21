import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function UseURLQueries({ pageName }) {
    const [ queryParameters, setQueryParameters ] = useSearchParams();

    // Injects the necessary queries into the url upon initialization of the hook.
    useEffect(() => {
        if (pageName == 'Customer Scanned Documents') {
            setQueryParameters(preParameters => {
                return {
                    year: preParameters.get('year') || new Date().getFullYear(),
                    currentInvoice: preParameters.get('currentInvoice') || '',
                    selectedCustomer: preParameters.get('selectedCustomer') || '',
                }
            }) 
        } else if (pageName == 'AccountsPayable') {
            setQueryParameters(preParameters => {
                return {
                    year: preParameters.get('year') || '',
                    currentInvoice: preParameters.get('currentInvoice') || '',
                    selectedAccount: preParameters.get('selectedAccount') || ''
                }
            }) 
        }
    }, [setQueryParameters, pageName])

    //* Returns only a way to access the queries, since altering or reassigning values for the queries will be handled in other components
    return queryParameters;
}