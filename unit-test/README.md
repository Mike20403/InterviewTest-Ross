# Billing Periods Unit Tests

This project contains comprehensive Jest unit tests for the `calcBillingPeriods` function.

## Function Overview

The `calcBillingPeriods` function generates 12 billing periods for a given year, with each period spanning from a cutoff date in the previous month to the same cutoff date in the current month.

### Parameters
- `cutoffDate` (number): Day of the month (1-31) that serves as the billing cutoff
- `periodYear` (string): Year in format "2XXX" (2000-2999)

### Returns
- Array of 12 billing period objects, each containing:
  - `start_date`: Start date of the billing period (YYYY-MM-DD)
  - `end_date`: End date of the billing period (YYYY-MM-DD)  
  - `month`: Reference month (YYYY-MM-01)
- `false` if input validation fails

## Installation

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

## Test Coverage

The test suite covers:

### Input Validation
- ✅ Invalid year formats (not starting with 2, wrong length, non-numeric)
- ✅ Invalid cutoff dates (< 1 or > 31)
- ✅ Edge cases and boundary conditions

### Core Functionality
- ✅ Correct array structure (12 periods)
- ✅ Proper date formatting (YYYY-MM-DD)
- ✅ Month reference generation
- ✅ Year transition handling (January periods start in previous year)

### Date Logic
- ✅ Regular cutoff dates (e.g., 15th of month)
- ✅ Month-end cutoff dates (28th, 29th, 30th, 31st)
- ✅ Leap year handling
- ✅ Invalid date correction (e.g., Feb 31 → Feb 28/29)

### Helper Functions
- ✅ `nearestNextValidDate` - finds next valid date for invalid inputs
- ✅ `nearestPrevValidDate` - finds previous valid date for invalid inputs

### Integration Tests
- ✅ Real-world billing scenarios
- ✅ Cross-year consistency
- ✅ Performance testing
- ✅ Repeated call consistency

## Test Structure

```
src/
├── billingPeriods.js      # Main function and helpers
├── billingPeriods.test.js # Comprehensive test suite
```

## Key Test Scenarios

1. **Input Validation**: Tests all invalid inputs return `false`
2. **Valid Inputs**: Tests all valid combinations produce correct results
3. **Edge Cases**: Tests boundary conditions like leap years, month-end dates
4. **Date Consistency**: Ensures all generated dates are valid and chronological
5. **Helper Functions**: Tests the date correction utilities
6. **Integration**: Tests real-world usage patterns

## Coverage Goals

The test suite aims for:
- 100% function coverage
- 100% line coverage  
- 95%+ branch coverage
- 90%+ statement coverage

## Dependencies

- **Jest**: Testing framework
- **Moment.js**: Date manipulation library (used by the main function)

