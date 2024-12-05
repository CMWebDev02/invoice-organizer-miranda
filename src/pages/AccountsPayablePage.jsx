import { NavBar } from "../components/ui/NavBar"
import { Footer } from "../components/ui/Footer"
import { YearSelector } from "../components/YearSelection/YearSelector"
import { useState } from "react"
import { UseURLQueries } from "../hooks/UseURLQueries"
import { UserSettingsStorage } from "../utilities/localStorage"
import { InvoiceViewer } from "../components/DirectoryDisplay/InvoiceViewer"

export function AccountsPayablePage() {
    const pageName = 'AccountsPayable'
    const queryParameters = UseURLQueries({pageName})
    const maximumChangeLogActionStore = UserSettingsStorage.getSpecificSetting('CHANGELOG_ACTIONS');

    const [ isUserInteractionDisabled, setIsUserInteractionDisabled ] = useState();


    return (
        <>
            <NavBar>

            </NavBar>

            <main>
                <YearSelector isDisabled={isUserInteractionDisabled}/>

                <InvoiceViewer pageName={pageName} />
            </main>

            <Footer>

            </Footer>
        </>
    )
}