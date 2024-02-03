// Pairs to /index.html

import { loadHeaderFooter } from './utils.mjs';
import Alert from './Alert.mjs';

let alerts = new Alert('alerts');

alerts.init(); // Renders the alerts to the page

loadHeaderFooter('partials');

