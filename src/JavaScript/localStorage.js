class accessLocalStorage {
    static resetStorage() {
        let userConfirmation = confirm('Warning: This action is irreversible! Are you sure you want to continue?')
        if (!userConfirmation) return;

        localStorage.removeItem(this._key);
    }
}

export class ChangeLogStorage extends accessLocalStorage {
    static _key = 'changeLog';

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

export class UserSettingsStorage extends accessLocalStorage {
    static _key = 'userSettings';

    static _defaultSettingsObj = {
        changeLogActions: 25,
        showQuickTransferButtons: true,
        showUndoButtons: true,
    }

    static setStorage(obj) {
        localStorage.setItem(this._key, JSON.stringify(obj));
    }

    static getStorage() {
        let item = JSON.parse(localStorage.getItem(this._key))
        return JSON.parse(localStorage.getItem(this._key)) || {...this._defaultSettingsObj};
    }
}