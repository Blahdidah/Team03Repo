import { convertToJson } from './utils.mjs';

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
            // Create alert <p>
            let alertElement = document.createElement('p');
            alertElement.innerHTML = alert.message;
            alertElement.style.backgroundColor = alert.background;
            alertElement.style.color = alert.color;
            // append it to alertsElement
            alertsElement.append(alertElement);
          }
          document.querySelector('main').prepend(alertsElement);
        }
      })
      .catch(() => { 
        //No action necessary. Just won't show any alerts.
    });
  }
}
