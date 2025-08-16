const moment = require('moment');

// Helper function to find the nearest next valid date
const nearestNextValidDate = (dateStr) => {
    const date = moment(dateStr, 'YYYY-MM-DD');
    if (date.isValid()) {
        return date.format('YYYY-MM-DD');
    }

    // If invalid, find the next valid date
    const [year, month, day] = dateStr.split('-').map(Number);

    // Handle invalid month/year cases
    if (month < 1 || month > 12 || !year) {
        return 'Invalid date';
    }

    let testDate = moment([year, month - 1, 1]); // Start of the month

    // If the day is beyond the month's days, go to next month and use the same day
    if (day > testDate.daysInMonth()) {
        testDate = testDate.add(1, 'month').startOf('month').add(day - 1, 'days');
        // If still invalid in next month, keep going to next month
        while (day > testDate.daysInMonth()) {
            testDate = testDate.add(1, 'month').startOf('month').add(day - 1, 'days');
        }
    } else {
        testDate = testDate.add(day - 1, 'days');
    }

    return testDate.format('YYYY-MM-DD');
};

// Helper function to find the nearest previous valid date
const nearestPrevValidDate = (dateStr) => {
    const date = moment(dateStr, 'YYYY-MM-DD');
    if (date.isValid()) {
        return date.format('YYYY-MM-DD');
    }
    
    // If invalid, find the previous valid date
    const [year, month, day] = dateStr.split('-').map(Number);
    let testDate = moment([year, month - 1]); // Start of the month
    
    // If the day is beyond the month's days, use the last day of the month
    if (day > testDate.daysInMonth()) {
        testDate = testDate.endOf('month');
    } else {
        testDate = testDate.add(day - 1, 'days');
    }
    
    return testDate.format('YYYY-MM-DD');
};

const calcBillingPeriods = (cutoffDate, periodYear) => {
    const regex = /^2\d{3}$/
    const invalid = !regex.test(periodYear)
    if (invalid) return false
    if (cutoffDate < 1 || cutoffDate > 31) return false

    const months = [...Array(12).keys()].map(i => i + 1)
    const tryDates = months.map(m => {
        const end_day = cutoffDate.toString().padStart(2, '0')
        const start_day = cutoffDate.toString().padStart(2, '0') //(cutoffDate + 1 > 31 ? 1 : cutoffDate + 1).toString().padStart(2, '0')
        const end_month = m.toString().padStart(2, '0')
        const start_month = (m - 1 < 1 ? 12 : m - 1).toString().padStart(2, '0')
        const end_year = periodYear
        const start_year = m - 1 < 1 ? end_year - 1 : end_year

        return {
            start_date: nearestNextValidDate(
                `${start_year}-${start_month}-${start_day}`
            ),
            end_date: nearestPrevValidDate(
                `${end_year}-${end_month}-${end_day}`
            ),
            month: moment(
                `${periodYear}-${m.toString().padStart(2, '0')}-01`
            ).format('YYYY-MM-01'),
        }
    })
    return tryDates
}

module.exports = {
    calcBillingPeriods,
    nearestNextValidDate,
    nearestPrevValidDate
};
