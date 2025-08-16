const { calcBillingPeriods, nearestNextValidDate, nearestPrevValidDate } = require('./billingPeriods');

describe('calcBillingPeriods', () => {
    describe('Input validation', () => {
        describe('periodYear validation', () => {
            test('should return false for invalid year format - not starting with 2', () => {
                expect(calcBillingPeriods(15, '1999')).toBe(false);
                expect(calcBillingPeriods(15, '3000')).toBe(false);
                expect(calcBillingPeriods(15, '1234')).toBe(false);
            });

            test('should return false for invalid year format - not 4 digits', () => {
                expect(calcBillingPeriods(15, '23')).toBe(false);
                expect(calcBillingPeriods(15, '202')).toBe(false);
                expect(calcBillingPeriods(15, '20234')).toBe(false);
            });

            test('should return false for non-numeric year', () => {
                expect(calcBillingPeriods(15, 'abcd')).toBe(false);
                expect(calcBillingPeriods(15, '202a')).toBe(false);
                expect(calcBillingPeriods(15, '')).toBe(false);
                expect(calcBillingPeriods(15, null)).toBe(false);
                expect(calcBillingPeriods(15, undefined)).toBe(false);
            });

            test('should accept valid years starting with 2', () => {
                expect(calcBillingPeriods(15, '2000')).not.toBe(false);
                expect(calcBillingPeriods(15, '2023')).not.toBe(false);
                expect(calcBillingPeriods(15, '2999')).not.toBe(false);
            });

            test('should handle numeric year input by converting to string', () => {
                expect(calcBillingPeriods(15, 2023)).not.toBe(false);
                expect(calcBillingPeriods(15, 2000)).not.toBe(false);
            });
        });

        describe('cutoffDate validation', () => {
            test('should return false for cutoffDate less than 1', () => {
                expect(calcBillingPeriods(0, '2023')).toBe(false);
                expect(calcBillingPeriods(-1, '2023')).toBe(false);
                expect(calcBillingPeriods(-10, '2023')).toBe(false);
            });

            test('should return false for cutoffDate greater than 31', () => {
                expect(calcBillingPeriods(32, '2023')).toBe(false);
                expect(calcBillingPeriods(50, '2023')).toBe(false);
                expect(calcBillingPeriods(100, '2023')).toBe(false);
            });

            test('should accept valid cutoffDate range 1-31', () => {
                expect(calcBillingPeriods(1, '2023')).not.toBe(false);
                expect(calcBillingPeriods(15, '2023')).not.toBe(false);
                expect(calcBillingPeriods(31, '2023')).not.toBe(false);
            });

            test('should handle edge cases for cutoffDate', () => {
                expect(calcBillingPeriods(1, '2023')).not.toBe(false);
                expect(calcBillingPeriods(31, '2023')).not.toBe(false);
            });
        });
    });

    describe('Valid input scenarios', () => {
        test('should return array of 12 billing periods', () => {
            const result = calcBillingPeriods(15, '2023');
            expect(Array.isArray(result)).toBe(true);
            expect(result).toHaveLength(12);
        });

        test('should have correct structure for each billing period', () => {
            const result = calcBillingPeriods(15, '2023');
            result.forEach((period, index) => {
                expect(period).toHaveProperty('start_date');
                expect(period).toHaveProperty('end_date');
                expect(period).toHaveProperty('month');
                expect(typeof period.start_date).toBe('string');
                expect(typeof period.end_date).toBe('string');
                expect(typeof period.month).toBe('string');
                
                // Check date format YYYY-MM-DD
                expect(period.start_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
                expect(period.end_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
                expect(period.month).toMatch(/^\d{4}-\d{2}-01$/);
            });
        });

        test('should generate correct month references', () => {
            const result = calcBillingPeriods(15, '2023');
            const expectedMonths = [
                '2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01',
                '2023-05-01', '2023-06-01', '2023-07-01', '2023-08-01',
                '2023-09-01', '2023-10-01', '2023-11-01', '2023-12-01'
            ];
            
            result.forEach((period, index) => {
                expect(period.month).toBe(expectedMonths[index]);
            });
        });
    });

    describe('Date calculation logic', () => {
        test('should handle regular cutoff date (15th) correctly', () => {
            const result = calcBillingPeriods(15, '2023');
            
            // January period: Dec 15, 2022 to Jan 15, 2023
            expect(result[0].start_date).toBe('2022-12-15');
            expect(result[0].end_date).toBe('2023-01-15');
            expect(result[0].month).toBe('2023-01-01');
            
            // February period: Jan 15, 2023 to Feb 15, 2023
            expect(result[1].start_date).toBe('2023-01-15');
            expect(result[1].end_date).toBe('2023-02-15');
            expect(result[1].month).toBe('2023-02-01');
        });

        test('should handle cutoff date at month end (31st)', () => {
            const result = calcBillingPeriods(31, '2023');
            
            // January period: Dec 31, 2022 to Jan 31, 2023
            expect(result[0].start_date).toBe('2022-12-31');
            expect(result[0].end_date).toBe('2023-01-31');
            
            // February period: Jan 31, 2023 to Feb 28, 2023 (Feb doesn't have 31 days)
            expect(result[1].start_date).toBe('2023-01-31');
            expect(result[1].end_date).toBe('2023-02-28');
            
            // April period: Mar 31, 2023 to Apr 30, 2023 (April doesn't have 31 days)
            expect(result[3].start_date).toBe('2023-03-31');
            expect(result[3].end_date).toBe('2023-04-30');
        });

        test('should handle leap year February correctly', () => {
            const result = calcBillingPeriods(29, '2024'); // 2024 is a leap year
            
            // February period in leap year
            expect(result[1].start_date).toBe('2024-01-29');
            expect(result[1].end_date).toBe('2024-02-29');
        });

        test('should handle non-leap year February correctly', () => {
            const result = calcBillingPeriods(29, '2023'); // 2023 is not a leap year
            
            // February period in non-leap year (Feb 29 doesn't exist, should use Feb 28)
            expect(result[1].start_date).toBe('2023-01-29');
            expect(result[1].end_date).toBe('2023-02-28');
        });

        test('should handle cutoff date 30 in February', () => {
            const result = calcBillingPeriods(30, '2023');
            
            // February period (Feb 30 doesn't exist, should use Feb 28)
            expect(result[1].start_date).toBe('2023-01-30');
            expect(result[1].end_date).toBe('2023-02-28');
        });

        test('should handle year transition correctly for January', () => {
            const result = calcBillingPeriods(15, '2023');
            
            // January period should start from previous year
            expect(result[0].start_date).toBe('2022-12-15');
            expect(result[0].end_date).toBe('2023-01-15');
        });
    });

    describe('Edge cases', () => {
        test('should handle cutoff date 1 (beginning of month)', () => {
            const result = calcBillingPeriods(1, '2023');
            expect(result[0].start_date).toBe('2022-12-01');
            expect(result[0].end_date).toBe('2023-01-01');
        });

        test('should handle different valid years', () => {
            const years = ['2000', '2010', '2023', '2050', '2999'];
            years.forEach(year => {
                const result = calcBillingPeriods(15, year);
                expect(result).not.toBe(false);
                expect(result).toHaveLength(12);
                result.forEach(period => {
                    expect(period.month).toContain(year);
                });
            });
        });

        test('should handle all valid cutoff dates', () => {
            for (let cutoff = 1; cutoff <= 31; cutoff++) {
                const result = calcBillingPeriods(cutoff, '2023');
                expect(result).not.toBe(false);
                expect(result).toHaveLength(12);
            }
        });
    });

    describe('Data consistency', () => {
        test('should ensure all dates are valid', () => {
            const result = calcBillingPeriods(31, '2023');
            result.forEach(period => {
                const startDate = new Date(period.start_date);
                const endDate = new Date(period.end_date);
                const monthDate = new Date(period.month);
                
                expect(startDate.toString()).not.toBe('Invalid Date');
                expect(endDate.toString()).not.toBe('Invalid Date');
                expect(monthDate.toString()).not.toBe('Invalid Date');
            });
        });

        test('should have chronological order within each period', () => {
            const result = calcBillingPeriods(15, '2023');
            result.forEach(period => {
                const startDate = new Date(period.start_date);
                const endDate = new Date(period.end_date);
                expect(startDate.getTime()).toBeLessThanOrEqual(endDate.getTime());
            });
        });
    });
});

describe('Helper Functions', () => {
    describe('nearestNextValidDate', () => {
        test('should return valid date as-is', () => {
            expect(nearestNextValidDate('2023-01-15')).toBe('2023-01-15');
            expect(nearestNextValidDate('2023-12-31')).toBe('2023-12-31');
            expect(nearestNextValidDate('2024-02-29')).toBe('2024-02-29'); // leap year
        });

        test('should handle invalid dates by finding next valid date', () => {
            expect(nearestNextValidDate('2023-02-29')).toBe('2023-03-29'); // Feb 29 in non-leap year -> Mar 29
            expect(nearestNextValidDate('2023-02-30')).toBe('2023-03-30'); // Feb 30 doesn't exist -> Mar 30
            expect(nearestNextValidDate('2023-04-31')).toBe('2023-05-31'); // April 31 doesn't exist -> May 31
        });

        test('should handle edge cases', () => {
            expect(nearestNextValidDate('2023-13-01')).toBe('Invalid date'); // Invalid month
            expect(nearestNextValidDate('2023-00-15')).toBe('Invalid date'); // Month 0
        });
    });

    describe('nearestPrevValidDate', () => {
        test('should return valid date as-is', () => {
            expect(nearestPrevValidDate('2023-01-15')).toBe('2023-01-15');
            expect(nearestPrevValidDate('2023-12-31')).toBe('2023-12-31');
            expect(nearestPrevValidDate('2024-02-29')).toBe('2024-02-29'); // leap year
        });

        test('should handle invalid dates by finding previous valid date', () => {
            expect(nearestPrevValidDate('2023-02-29')).toBe('2023-02-28'); // Feb 29 in non-leap year
            expect(nearestPrevValidDate('2023-02-30')).toBe('2023-02-28'); // Feb 30 doesn't exist
            expect(nearestPrevValidDate('2023-04-31')).toBe('2023-04-30'); // April 31 doesn't exist
            expect(nearestPrevValidDate('2023-06-31')).toBe('2023-06-30'); // June 31 doesn't exist
        });

        test('should handle leap year correctly', () => {
            expect(nearestPrevValidDate('2024-02-30')).toBe('2024-02-29'); // leap year
            expect(nearestPrevValidDate('2023-02-30')).toBe('2023-02-28'); // non-leap year
        });
    });
});

describe('Integration Tests', () => {
    describe('Real-world scenarios', () => {
        test('should handle billing cycle starting mid-month', () => {
            const result = calcBillingPeriods(15, '2023');

            // Verify that each period starts on the 15th of previous month
            // and ends on the 15th of current month
            expect(result[0].start_date).toBe('2022-12-15'); // Jan period starts Dec 15
            expect(result[0].end_date).toBe('2023-01-15');   // Jan period ends Jan 15

            expect(result[5].start_date).toBe('2023-05-15'); // Jun period starts May 15
            expect(result[5].end_date).toBe('2023-06-15');   // Jun period ends Jun 15
        });

        test('should handle end-of-month billing with month length variations', () => {
            const result = calcBillingPeriods(31, '2023');

            // January (31 days) to February (28 days in 2023)
            expect(result[1].start_date).toBe('2023-01-31');
            expect(result[1].end_date).toBe('2023-02-28');

            // March (31 days) to April (30 days)
            expect(result[3].start_date).toBe('2023-03-31');
            expect(result[3].end_date).toBe('2023-04-30');

            // May (31 days) to June (30 days)
            expect(result[5].start_date).toBe('2023-05-31');
            expect(result[5].end_date).toBe('2023-06-30');
        });

        test('should maintain consistency across different years', () => {
            const result2023 = calcBillingPeriods(28, '2023');
            const result2024 = calcBillingPeriods(28, '2024');

            // Both should have 12 periods
            expect(result2023).toHaveLength(12);
            expect(result2024).toHaveLength(12);

            // February should be different due to leap year
            expect(result2023[1].end_date).toBe('2023-02-28'); // non-leap year
            expect(result2024[1].end_date).toBe('2024-02-28'); // leap year, but 28th exists
        });

        test('should handle leap year edge case with Feb 29', () => {
            const result = calcBillingPeriods(29, '2024'); // leap year
            expect(result[1].end_date).toBe('2024-02-29');

            const resultNonLeap = calcBillingPeriods(29, '2023'); // non-leap year
            expect(resultNonLeap[1].end_date).toBe('2023-02-28');
        });
    });

    describe('Performance and boundary tests', () => {
        test('should handle multiple calls efficiently', () => {
            const start = Date.now();
            for (let i = 0; i < 100; i++) {
                calcBillingPeriods(15, '2023');
            }
            const end = Date.now();
            expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
        });

        test('should produce consistent results on repeated calls', () => {
            const result1 = calcBillingPeriods(20, '2023');
            const result2 = calcBillingPeriods(20, '2023');

            expect(result1).toEqual(result2);
        });
    });
});
