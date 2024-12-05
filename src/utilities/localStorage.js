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

export class InvoiceOrganizerChangeLog extends ChangeLogStorage {
    static _key = 'changeLogInvoices';
}

export class AccountsPayableChangeLog extends ChangeLogStorage {
    static _key = 'changeLogInvoices';
}

export class UserSettingsStorage extends accessLocalStorage {
    static _key = 'userSettings';

    static _defaultSettingsObj = {
        CHANGELOG_ACTIONS: 25,
        SHOW_QUICK_TRANSFER_BUTTONS: true,
        SHOW_QUICK_UNDO_BUTTONS: true,
    }

    static setStorage(obj) {
        localStorage.setItem(this._key, JSON.stringify(obj));
    }

    static getStorage() {
        let item = JSON.parse(localStorage.getItem(this._key))
        return JSON.parse(localStorage.getItem(this._key)) || {...this._defaultSettingsObj};
    }

    static getSpecificSetting(setting) {
        let settings = this.getStorage();

        return settings[setting];
    }
}