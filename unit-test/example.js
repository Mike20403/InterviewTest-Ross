const { calcBillingPeriods } = require('./src/billingPeriods');

// Example usage of calcBillingPeriods function
console.log('=== Billing Periods Calculator Examples ===\n');

// Example 1: Regular cutoff date (15th of month)
console.log('Example 1: Cutoff date 15th, Year 2023');
const result1 = calcBillingPeriods(15, '2023');
if (result1) {
    console.log('First 3 periods:');
    result1.slice(0, 3).forEach((period, index) => {
        console.log(`  Month ${index + 1}: ${period.start_date} to ${period.end_date} (${period.month})`);
    });
} else {
    console.log('Invalid input');
}

console.log('\n' + '='.repeat(50) + '\n');

// Example 2: Month-end cutoff date (31st)
console.log('Example 2: Cutoff date 31st, Year 2023');
const result2 = calcBillingPeriods(31, '2023');
if (result2) {
    console.log('February and April periods (showing month-end handling):');
    [1, 3].forEach(index => {
        const period = result2[index];
        console.log(`  Month ${index + 1}: ${period.start_date} to ${period.end_date} (${period.month})`);
    });
} else {
    console.log('Invalid input');
}

console.log('\n' + '='.repeat(50) + '\n');

// Example 3: Leap year handling
console.log('Example 3: Cutoff date 29th, Leap year 2024 vs Non-leap year 2023');
const result3a = calcBillingPeriods(29, '2024'); // Leap year
const result3b = calcBillingPeriods(29, '2023'); // Non-leap year

if (result3a && result3b) {
    console.log('February periods comparison:');
    console.log(`  2024 (leap): ${result3a[1].start_date} to ${result3a[1].end_date}`);
    console.log(`  2023 (non-leap): ${result3b[1].start_date} to ${result3b[1].end_date}`);
}

console.log('\n' + '='.repeat(50) + '\n');

// Example 4: Invalid inputs
console.log('Example 4: Invalid inputs');
console.log('Invalid year (1999):', calcBillingPeriods(15, '1999'));
console.log('Invalid cutoff date (0):', calcBillingPeriods(0, '2023'));
console.log('Invalid cutoff date (32):', calcBillingPeriods(32, '2023'));

console.log('\n' + '='.repeat(50) + '\n');

// Example 5: Full year overview
console.log('Example 5: Full year billing periods (cutoff: 10th, year: 2023)');
const result5 = calcBillingPeriods(10, '2023');
if (result5) {
    console.log('All 12 billing periods:');
    result5.forEach((period, index) => {
        const monthName = new Date(period.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        console.log(`  ${monthName.padEnd(15)}: ${period.start_date} to ${period.end_date}`);
    });
}

console.log('\n=== End of Examples ===');
