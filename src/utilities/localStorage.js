/**
 * @class Default class for accessing localStorage.
 */
class accessLocalStorage {
  /**
   * @method Removes the localStorage entry using the key associated with the class.
   * @returns {void}
   */
  static resetStorage() {
    let userConfirmation = confirm(
      "Warning: This action is irreversible! Are you sure you want to continue?"
    );
    if (!userConfirmation) return;

    localStorage.removeItem(this._key);
  }
}

/**
 * @class Default class for accessing the changeLog entries in localStorage.
 */
export class ChangeLogStorage extends accessLocalStorage {
  /**
   * @method Sets the localStorage entry for the associated class using the passed in array, and depending on the size of the array and the user's storage preferences, the array
   * will be trimmed down to not exceed their maximum storage allowance.
   * @param {Array} array - Array to be stored in localStorage.
   * @param {number} maxActionStorage - The maximum amount of entries allowed within the localStorage entry.
   * @returns {void}
   */
  static setStorage(array, maxActionStorage) {
    if (maxActionStorage > array.length) {
      localStorage.setItem(this._key, JSON.stringify(array));
    } else {
      let newArray = array.slice(0, maxActionStorage);

      localStorage.setItem(this._key, JSON.stringify(newArray));
    }
  }

  /**
   * @method Returned the localStorage entry for the associated key.
   * @returns {array}
   */
  static getStorage() {
    return JSON.parse(localStorage.getItem(this._key)) || [];
  }
}

/**
 * @class Class associated with the customer-scanned-documents changelog.
 */
export class CustomerScannedDocumentsChangeLog extends ChangeLogStorage {
  //* Initializes the localStorage key as a private class attribute.
  static _key = "customerScannedDocs";
}

/**
 * @class Class associated with the accounts-payables changelog.
 */
export class AccountsPayablesChangeLog extends ChangeLogStorage {
  //* Initializes the localStorage key as a private class attribute.
  static _key = "accountsPayables";
}

/**
 * @class Class associated with storing the user's settings in localStorage
 */
export class UserSettingsStorage extends accessLocalStorage {
  //* Initializes the localStorage key as a private class attribute.
  static _key = "userSettings";

  //* Initializes a default settings object.
  static _defaultSettingsObj = {
    CHANGELOG_ACTIONS: 25,
    CHANGELOG_QUICK_VIEW: 15,
    YEAR_OFFSET: 5,
    SHOW_QUICK_TRANSFER_BUTTONS: true,
    SHOW_QUICK_UNDO_BUTTONS: true,
  };

  /**
   * @method Sets the localStorage entry for the user's settings
   * @param {object} obj - Settings object to be stored in localStorage.
   * @returns {void}
   */
  static setStorage(obj) {
    localStorage.setItem(this._key, JSON.stringify(obj));
  }

  /**
   * @method Retrieves the settings object stored in localStorage or returns the defaultSettingsObject if localStorage returns a null value.
   * @returns {object}
   */
  static getStorage() {
    // Checks if localStorage has a value associated with the userSettings key and if not, then the default settings object is stored in localStorage.
    if (localStorage.getItem(this._key) === null)
      this.setStorage(this._defaultSettingsObj);

    return JSON.parse(localStorage.getItem(this._key));
  }

  /**
   * @method Returns the values of a specific setting stored in localStorage.
   * @param {string} setting - Key name that will be used to pull its associated value from the settings object.
   * @returns {number | boolean}
   */
  static getSpecificSetting(setting) {
    let allSettings = this.getStorage();

    // After retrieving all settings from localStorage, the passed in string is used to define the key.
    return allSettings[setting];
  }
}
