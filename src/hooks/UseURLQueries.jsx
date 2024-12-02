import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function UseURLQueries() {
    const [ queryParameters, setQueryParameters ] = useSearchParams();

    // Injects the necessary queries into the url upon initialization of the hook.
    useEffect(() => {
        setQueryParameters(prevParameters => {
            return {
                year: prevParameters.get('year') || new Date().getFullYear(),
                currentInvoice: prevParameters.get('currentInvoice') || '',
                selectedCustomer: prevParameters.get('selectedCustomer') || '',
            }
        })
    }, [setQueryParameters])

    //* Returns only a way to access the queries, since altering or reassigning values for the queries will be handled in other components
    return queryParameters;
}