// Pairs to /index.html

import { loadHeaderFooter, addBanner } from './utils.mjs';
import Alert from './Alert.mjs';

let alerts = new Alert('alerts');

alerts.init(); // Renders the alerts to the page

loadHeaderFooter('partials');
addBanner("Welcome, we encourage all to register with this site. If you register, you will automatically be entered into a giveaway that includes gear for a week-long camping trip!")
