import moment from 'moment-timezone';

// Define the time zone for India
const indianTimeZone = 'Asia/Kolkata';

// Function to get the current IST date-time
const getCurrentISTDateTime = () => moment().tz(indianTimeZone).format('YYYY-MM-DD HH:mm:ss');

export { getCurrentISTDateTime }