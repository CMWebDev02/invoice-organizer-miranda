class accessLocalStorage {

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

    static resetStorage() {
        let userConfirmation = confirm('Warning: This action is irreversible! Are you sure you want to continue?')
        if (!userConfirmation) return;

        localStorage.setItem(this._key, JSON.stringify([]));
    }
}

export class ChangeLogStorage extends accessLocalStorage {
    static _key = 'changeLog'
}