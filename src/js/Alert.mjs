import { alertMessage, convertToJson } from './utils.mjs';

export default class Alert {
  /**
   * Constructor for the alerts class
   * @param {String} alertsName
   */
  constructor(alertsName) {
    this.alertsName = alertsName;
  }
  /**
   * Display the alerts in a specified json file.
   */
  init() {
    // Read/parse alert.json
    fetch(`../json/${this.alertsName}.json`)
      .then(convertToJson)
      .then((alertData) => {
        if (Array.isArray(alertData)) {
          let alertsElement = document.createElement('section');
          alertsElement.classList.add('alert-list');
          for (let alert of alertData) {
            alertMessage(alert.message, false, alert.background, alert.color);
          }
        }
      })
      .catch(() => {
        //No action necessary. Just won't show any alerts.
      });
  }
}
