class accessLocalStorage {
    static resetStorage() {
        let userConfirmation = confirm('Warning: This action is irreversible! Are you sure you want to continue?')
        if (!userConfirmation) return;

        localStorage.removeItem(this._key);
    }
}

export class ChangeLogStorage extends accessLocalStorage {
    static setStorage(array, maxActionStorage) {
        if (maxActionStorage > array.length) {
            localStorage.setItem(this._key, JSON.stringify(array));
        } else {
            let newArray = array.slice(0, maxActionStorage);

            localStorage.setItem(this._key, JSON.stringify(newArray))
        }
    }

    static getStorage() {
        return JSON.parse(localStorage.getItem(this._key)) || [];
    }
}

export class CustomerScannedDocumentsChangeLog extends ChangeLogStorage {
    static _key = 'customerScannedDocs';
}

export class AccountsPayablesChangeLog extends ChangeLogStorage {
    static _key = 'accountsPayables';
}

export class UserSettingsStorage extends accessLocalStorage {
    static _key = 'userSettings';

    static _defaultSettingsObj = {
        CHANGELOG_ACTIONS: 25,
        YEAR_OFFSET: 5,
        SHOW_QUICK_TRANSFER_BUTTONS: true,
        SHOW_QUICK_UNDO_BUTTONS: true,
    }

    static setStorage(obj) {
        localStorage.setItem(this._key, JSON.stringify(obj));
    }

    static getStorage() {
        // Checks if localStorage has a value associated with the userSettings key and if not, then the default settings object is stored in localStorage.
        if (localStorage.getItem(this._key) == null) this.setStorage(this._defaultSettingsObj)

        return JSON.parse(localStorage.getItem(this._key));

    }

    static getSpecificSetting(setting) {
        let allSettings = this.getStorage();

        return allSettings[setting];
    }
}