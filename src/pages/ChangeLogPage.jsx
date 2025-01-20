import { Link, useLocation } from "react-router";
import { useRef, useState } from "react";

import { CustomerScannedDocumentsChangeLog, AccountsPayablesChangeLog } from "../utilities/localStorage";

import { FilterOptions } from '../components/ChangeLog/UserInteraction/FilterOptions'
import { ChangeLog } from "../containers/ChangeLog";
import { ChangeLogSelector } from "../components/ChangeLog/UserInteraction/ChangeLogSelector";

import styles from './styles/ChangeLogPageStyles.module.css'
import Stack from "react-bootstrap/esm/Stack";

export function ChangeLogPage({ endPointURL }) {
    const [ currentChangeLog, setCurrentChangeLog ] = useState('customer-scanned-documents')
    const [ filterBy, setFilterBy ] = useState(null);
    const userLocation = useLocation();
    const locationState = userLocation.state 
    const returnLink = locationState !== null ? `/${locationState.lastLocation}` : '/'

    const clearChangeLogRef = useRef(null); 

    
    function changeFilter(e) {
        if (e.target.name === filterBy) {
            setFilterBy(null)
        } else {
            setFilterBy(e.target.name)
        }
    }

    function handleClick() {
        clearChangeLogRef.current();
    }

    const RenderChangeLog = () => {
        if (currentChangeLog === 'customer-scanned-documents') {
            return (
                <ChangeLog clearChangeLogRef={clearChangeLogRef} changeLogClass={CustomerScannedDocumentsChangeLog} filterBy={filterBy}
                    endPoint={`${endPointURL}/customer-scanned-documents`} />
            )
        } else if (currentChangeLog === 'account-payables') {
            return (
                <ChangeLog clearChangeLogRef={clearChangeLogRef} changeLogClass={AccountsPayablesChangeLog} filterBy={filterBy}
                    endPoint={`${endPointURL}/account-payables`} />
            )
        }
    }

    return (
        <Stack gap={2} className={`p-1 w-100 h-100`}>
            <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} className='d-flex d-mobileLandscape-none d-tabletPortrait-flex d-tabletLandscape-none'/>

            <ChangeLogSelector updateSelected={setCurrentChangeLog}/>

            <div className={`${styles.changeLogContainer} h-75 overflow-auto`}>
                <RenderChangeLog />
            </div>

            <Stack direction="horizontal" className={`${styles.footer} d-flex justify-content-between p-1 mt-auto`} gap={2}>
                <button className={`interfaceButton`} onClick={handleClick}>Clear</button>
                <FilterOptions alterDisplayedChanges={changeFilter} currentFilter={filterBy} className='d-none d-mobileLandscape-flex d-tabletPortrait-none d-tabletLandscape-flex'/>
                <Link to={returnLink} className={`interfaceButton`}>Return</Link>
            </Stack>
        </Stack>
    )
}

