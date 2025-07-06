
// Professional Healthcare RCM Dashboard
// Advanced Revenue Cycle Management Analytics Platform

class RCMDashboard {
    constructor() {
        this.data = this.initializeMockData();
        this.charts = {};
        this.refreshInterval = null;
        this.currentPage = 1;
        this.rowsPerPage = 10;
        this.filteredPatientAccounts = [];
        this.AR_DAYS_THRESHOLD = 50;
        this.currentDateReports = new Date();
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.currentDashboardDateRange = 'Last 30 Days';
        this.selectedAnalyticsPayer = 'All';
        this.init();
    }

    initializeMockData() {
        return {
            // Enhanced financial metrics with realistic healthcare data for different time periods
            metrics: {
                current: {
                    totalRevenue: 8750000,
                    totalCollections: 8050000,
                    outstandingAR: 1200000,
                    daysInAR: 45.2,
                    collectionRate: 92.0,
                    denialRate: 8.0,
                    cleanClaimRate: 87.5,
                    firstPassResolution: 76.3,
                    costToCollect: 3.2,
                    netCollectionRate: 94.8
                },
                lastQuarter: {
                    totalRevenue: 24500000,
                    totalCollections: 22650000,
                    outstandingAR: 3200000,
                    daysInAR: 47.8,
                    collectionRate: 89.2,
                    denialRate: 9.1,
                    cleanClaimRate: 85.3,
                    firstPassResolution: 74.1,
                    costToCollect: 3.5,
                    netCollectionRate: 92.4
                },
                yearToDate: {
                    totalRevenue: 52300000,
                    totalCollections: 48125000,
                    outstandingAR: 4850000,
                    daysInAR: 46.3,
                    collectionRate: 90.1,
                    denialRate: 8.7,
                    cleanClaimRate: 86.2,
                    firstPassResolution: 75.8,
                    costToCollect: 3.4,
                    netCollectionRate: 93.1
                },
                allTime: {
                    totalRevenue: 285600000,
                    totalCollections: 262180000,
                    outstandingAR: 12450000,
                    daysInAR: 48.9,
                    collectionRate: 88.7,
                    denialRate: 9.8,
                    cleanClaimRate: 83.4,
                    firstPassResolution: 72.3,
                    costToCollect: 3.8,
                    netCollectionRate: 91.8
                }
            },

            // Provider performance data with historical trends
            providers: [
                { name: 'Dr. Tony Stark', specialty: 'Cardiology', collectionRate: 95.2, avgDaysAR: 38, charges: 485000, ytdCharges: 5820000, patients: 456, ytdPatients: 5472 },
                { name: 'Dr. Bruce Wayne', specialty: 'Orthopedics', collectionRate: 91.8, avgDaysAR: 44, charges: 625000, ytdCharges: 7500000, patients: 234, ytdPatients: 2808 },
                { name: 'Dr. Diana Prince', specialty: 'Radiology', collectionRate: 88.7, avgDaysAR: 52, charges: 385000, ytdCharges: 4620000, patients: 789, ytdPatients: 9468 },
                { name: 'Dr. Clark Kent', specialty: 'Emergency Medicine', collectionRate: 89.3, avgDaysAR: 41, charges: 720000, ytdCharges: 8640000, patients: 1245, ytdPatients: 14940 },
                { name: 'Dr. Natasha Romanoff', specialty: 'Pediatrics', collectionRate: 93.4, avgDaysAR: 35, charges: 295000, ytdCharges: 3540000, patients: 678, ytdPatients: 8136 },
                { name: 'Dr. Steve Rogers', specialty: 'Surgery', collectionRate: 94.1, avgDaysAR: 39, charges: 850000, ytdCharges: 10200000, patients: 189, ytdPatients: 2268 },
                { name: 'Dr. Wanda Maximoff', specialty: 'Oncology', collectionRate: 96.7, avgDaysAR: 42, charges: 950000, ytdCharges: 11400000, patients: 234, ytdPatients: 2808 },
                { name: 'Dr. Charles Xavier', specialty: 'Neurology', collectionRate: 90.5, avgDaysAR: 46, charges: 675000, ytdCharges: 8100000, patients: 345, ytdPatients: 4140 },
                { name: 'Dr. Jean Grey', specialty: 'Pulmonology', collectionRate: 92.8, avgDaysAR: 40, charges: 520000, ytdCharges: 6240000, patients: 456, ytdPatients: 5472 },
                { name: 'Dr. Peter Parker', specialty: 'Gastroenterology', collectionRate: 89.9, avgDaysAR: 48, charges: 580000, ytdCharges: 6960000, patients: 378, ytdPatients: 4536 },
                { name: 'Dr. Carol Danvers', specialty: 'Dermatology', collectionRate: 94.3, avgDaysAR: 33, charges: 420000, ytdCharges: 5040000, patients: 567, ytdPatients: 6804 },
                { name: 'Dr. Scott Lang', specialty: 'Urology', collectionRate: 91.2, avgDaysAR: 43, charges: 465000, ytdCharges: 5580000, patients: 289, ytdPatients: 3468 }
            ],

            // AR aging buckets with time period breakdowns
            aging: {
                current: {
                    '0-30': { amount: 420000, percentage: 35.0, count: 156 },
                    '31-60': { amount: 360000, percentage: 30.0, count: 134 },
                    '61-90': { amount: 240000, percentage: 20.0, count: 89 },
                    '91-120': { amount: 120000, percentage: 10.0, count: 45 },
                    '120+': { amount: 60000, percentage: 5.0, count: 21 }
                },
                lastQuarter: {
                    '0-30': { amount: 1260000, percentage: 32.5, count: 468 },
                    '31-60': { amount: 1080000, percentage: 28.8, count: 402 },
                    '61-90': { amount: 720000, percentage: 22.5, count: 267 },
                    '91-120': { amount: 480000, percentage: 12.0, count: 178 },
                    '120+': { amount: 240000, percentage: 4.2, count: 89 }
                },
                yearToDate: {
                    '0-30': { amount: 2850000, percentage: 34.2, count: 1026 },
                    '31-60': { amount: 2450000, percentage: 29.1, count: 923 },
                    '61-90': { amount: 1680000, percentage: 21.8, count: 645 },
                    '91-120': { amount: 1120000, percentage: 11.5, count: 434 },
                    '120+': { amount: 420000, percentage: 3.4, count: 178 }
                },
                allTime: {
                    '0-30': { amount: 12450000, percentage: 36.8, count: 4567 },
                    '31-60': { amount: 10890000, percentage: 31.2, count: 3894 },
                    '61-90': { amount: 7234000, percentage: 20.1, count: 2678 },
                    '91-120': { amount: 3890000, percentage: 8.9, count: 1456 },
                    '120+': { amount: 2340000, percentage: 3.0, count: 892 }
                }
            },

            // Denial reasons with resolution times and historical data
            denialReasons: {
                current: [
                    { reason: 'Eligibility Issues', count: 156, percentage: 35.2, avgResolutionDays: 12, cost: 234000, trend: 'down' },
                    { reason: 'Authorization Required', count: 134, percentage: 30.2, avgResolutionDays: 8, cost: 189000, trend: 'stable' },
                    { reason: 'Coding Errors', count: 89, percentage: 20.1, avgResolutionDays: 5, cost: 125000, trend: 'up' },
                    { reason: 'Missing Documentation', count: 43, percentage: 9.7, avgResolutionDays: 15, cost: 67000, trend: 'down' },
                    { reason: 'Timely Filing', count: 21, percentage: 4.7, avgResolutionDays: 45, cost: 89000, trend: 'stable' },
                    { reason: 'Duplicate Claim', count: 18, percentage: 3.1, avgResolutionDays: 3, cost: 23000, trend: 'down' },
                    { reason: 'Non-Covered Service', count: 15, percentage: 2.8, avgResolutionDays: 30, cost: 45000, trend: 'up' },
                    { reason: 'Invalid Provider ID', count: 12, percentage: 2.2, avgResolutionDays: 7, cost: 18000, trend: 'stable' }
                ],
                lastQuarter: [
                    { reason: 'Eligibility Issues', count: 489, percentage: 37.8, avgResolutionDays: 14, cost: 734000, trend: 'down' },
                    { reason: 'Authorization Required', count: 398, percentage: 28.9, avgResolutionDays: 9, cost: 567000, trend: 'stable' },
                    { reason: 'Coding Errors', count: 234, percentage: 18.2, avgResolutionDays: 6, cost: 345000, trend: 'up' },
                    { reason: 'Missing Documentation', count: 145, percentage: 11.1, avgResolutionDays: 16, cost: 198000, trend: 'down' },
                    { reason: 'Timely Filing', count: 89, percentage: 6.8, avgResolutionDays: 47, cost: 267000, trend: 'stable' }
                ],
                yearToDate: [
                    { reason: 'Eligibility Issues', count: 1245, percentage: 36.4, avgResolutionDays: 13, cost: 1867000, trend: 'down' },
                    { reason: 'Authorization Required', count: 1034, percentage: 29.7, avgResolutionDays: 8, cost: 1456000, trend: 'stable' },
                    { reason: 'Coding Errors', count: 678, percentage: 19.8, avgResolutionDays: 5, cost: 923000, trend: 'up' },
                    { reason: 'Missing Documentation', count: 389, percentage: 10.3, avgResolutionDays: 15, cost: 534000, trend: 'down' },
                    { reason: 'Timely Filing', count: 234, percentage: 6.1, avgResolutionDays: 46, cost: 678000, trend: 'stable' }
                ]
            },

            // Patient accounts with enhanced data - expanded to 50+ patients
            patients: [
                // January 2024
                { name: 'Harry Potter', account: '123456789', serviceDate: '2024-01-15', procedure: 'Cardiac Catheterization', payer: 'United Healthcare', billed: 15000, outstanding: 5000, status: 'Pending', daysAR: 45, provider: 'Dr. Tony Stark', month: 'Jan' },
                { name: 'Luke Skywalker', account: '987654321', serviceDate: '2024-01-20', procedure: 'Knee Replacement', payer: 'BCBS', billed: 25000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Bruce Wayne', month: 'Jan' },
                { name: 'Wonder Woman', account: '456789123', serviceDate: '2024-01-05', procedure: 'MRI Brain', payer: 'Medicare', billed: 1200, outstanding: 1200, status: 'Denied', daysAR: 85, provider: 'Dr. Diana Prince', month: 'Jan' },
                { name: 'Spider-Man', account: '321987654', serviceDate: '2024-01-28', procedure: 'Physical Therapy', payer: 'Medicaid', billed: 800, outstanding: 200, status: 'Pending', daysAR: 32, provider: 'Dr. Natasha Romanoff', month: 'Jan' },
                { name: 'Batman', account: '654321987', serviceDate: '2024-01-10', procedure: 'Emergency Room Visit', payer: 'United Healthcare', billed: 3500, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Clark Kent', month: 'Jan' },
                { name: 'Hermione Granger', account: '112233445', serviceDate: '2024-01-12', procedure: 'Dermatology Consult', payer: 'BCBS', billed: 450, outstanding: 450, status: 'Denied', daysAR: 78, provider: 'Dr. Carol Danvers', month: 'Jan' },
                { name: 'Iron Man', account: '223344556', serviceDate: '2024-01-08', procedure: 'Routine Checkup', payer: 'Medicare', billed: 200, outstanding: 50, status: 'Pending', daysAR: 55, provider: 'Dr. Natasha Romanoff', month: 'Jan' },
                { name: 'Captain America', account: '334455667', serviceDate: '2024-01-25', procedure: 'Lab Work', payer: 'Medicaid', billed: 150, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Diana Prince', month: 'Jan' },
                { name: 'Darth Vader', account: '445566001', serviceDate: '2024-01-03', procedure: 'Colonoscopy', payer: 'United Healthcare', billed: 2800, outstanding: 850, status: 'Pending', daysAR: 67, provider: 'Dr. Peter Parker', month: 'Jan' },
                { name: 'Princess Leia', account: '556677002', serviceDate: '2024-01-16', procedure: 'Lung Biopsy', payer: 'BCBS', billed: 4500, outstanding: 1200, status: 'Review', daysAR: 52, provider: 'Dr. Jean Grey', month: 'Jan' },
                { name: 'Yoda', account: '667788003', serviceDate: '2024-01-09', procedure: 'Brain Surgery', payer: 'Medicare', billed: 65000, outstanding: 12000, status: 'Pending', daysAR: 71, provider: 'Dr. Charles Xavier', month: 'Jan' },
                { name: 'Superman', account: '778899004', serviceDate: '2024-01-22', procedure: 'Cancer Treatment', payer: 'United Healthcare', billed: 28000, outstanding: 5600, status: 'Pending', daysAR: 38, provider: 'Dr. Wanda Maximoff', month: 'Jan' },
                { name: 'Thor', account: '889900005', serviceDate: '2024-01-14', procedure: 'Prostate Surgery', payer: 'BCBS', billed: 18500, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Scott Lang', month: 'Jan' },
                { name: 'Black Widow', account: '990011006', serviceDate: '2024-01-29', procedure: 'Skin Cancer Removal', payer: 'Medicare', billed: 1800, outstanding: 360, status: 'Pending', daysAR: 31, provider: 'Dr. Carol Danvers', month: 'Jan' },
                { name: 'Wolverine', account: '101112007', serviceDate: '2024-01-07', procedure: 'Heart Bypass', payer: 'Medicaid', billed: 85000, outstanding: 25500, status: 'Review', daysAR: 73, provider: 'Dr. Steve Rogers', month: 'Jan' },

                // February 2024
                { name: 'Gandalf', account: '445566778', serviceDate: '2024-02-01', procedure: 'X-Ray Chest', payer: 'United Healthcare', billed: 300, outstanding: 300, status: 'Review', daysAR: 28, provider: 'Dr. Diana Prince', month: 'Feb' },
                { name: 'Elsa', account: '556677889', serviceDate: '2024-02-03', procedure: 'Surgical Consultation', payer: 'BCBS', billed: 850, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Bruce Wayne', month: 'Feb' },
                { name: 'Shrek', account: '667788990', serviceDate: '2024-02-05', procedure: 'Blood Test', payer: 'Medicare', billed: 125, outstanding: 25, status: 'Pending', daysAR: 22, provider: 'Dr. Natasha Romanoff', month: 'Feb' },
                { name: 'Moana', account: '778899001', serviceDate: '2024-02-08', procedure: 'Ultrasound', payer: 'Medicaid', billed: 400, outstanding: 400, status: 'Denied', daysAR: 19, provider: 'Dr. Diana Prince', month: 'Feb' },
                { name: 'Hulk', account: '889900112', serviceDate: '2024-02-10', procedure: 'CT Scan', payer: 'United Healthcare', billed: 2200, outstanding: 500, status: 'Pending', daysAR: 15, provider: 'Dr. Diana Prince', month: 'Feb' },
                { name: 'Cinderella', account: '990011223', serviceDate: '2024-02-12', procedure: 'Cardio Stress Test', payer: 'BCBS', billed: 800, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Tony Stark', month: 'Feb' },
                { name: 'Captain Marvel', account: '101112234', serviceDate: '2024-02-14', procedure: 'Hip Replacement', payer: 'Medicare', billed: 35000, outstanding: 8000, status: 'Pending', daysAR: 12, provider: 'Dr. Bruce Wayne', month: 'Feb' },
                { name: 'Deadpool', account: '212223008', serviceDate: '2024-02-16', procedure: 'Appendectomy', payer: 'United Healthcare', billed: 12000, outstanding: 2400, status: 'Pending', daysAR: 10, provider: 'Dr. Steve Rogers', month: 'Feb' },
                { name: 'Aquaman', account: '323334009', serviceDate: '2024-02-18', procedure: 'Endoscopy', payer: 'BCBS', billed: 1500, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Peter Parker', month: 'Feb' },
                { name: 'Rapunzel', account: '434445010', serviceDate: '2024-02-20', procedure: 'Chemotherapy', payer: 'Medicare', billed: 15000, outstanding: 3000, status: 'Review', daysAR: 8, provider: 'Dr. Wanda Maximoff', month: 'Feb' },
                { name: 'The Flash', account: '545556011', serviceDate: '2024-02-22', procedure: 'Kidney Stone Removal', payer: 'Medicaid', billed: 8500, outstanding: 1700, status: 'Pending', daysAR: 6, provider: 'Dr. Scott Lang', month: 'Feb' },
                { name: 'Belle', account: '656667012', serviceDate: '2024-02-24', procedure: 'Pneumonia Treatment', payer: 'United Healthcare', billed: 3200, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Jean Grey', month: 'Feb' },
                { name: 'Doctor Strange', account: '767778013', serviceDate: '2024-02-26', procedure: 'Spinal Surgery', payer: 'BCBS', billed: 45000, outstanding: 9000, status: 'Pending', daysAR: 2, provider: 'Dr. Charles Xavier', month: 'Feb' },
                { name: 'Ariel', account: '878889014', serviceDate: '2024-02-28', procedure: 'Mole Removal', payer: 'Medicare', billed: 650, outstanding: 130, status: 'Pending', daysAR: 1, provider: 'Dr. Carol Danvers', month: 'Feb' },

                // December 2023 (Q4 data)
                { name: 'Simba', account: '989990015', serviceDate: '2023-12-05', procedure: 'Gallbladder Surgery', payer: 'United Healthcare', billed: 22000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Steve Rogers', month: 'Dec' },
                { name: 'Buzz Lightyear', account: '090001016', serviceDate: '2023-12-08', procedure: 'Hernia Repair', payer: 'BCBS', billed: 8900, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Steve Rogers', month: 'Dec' },
                { name: 'Mulan', account: '101102017', serviceDate: '2023-12-12', procedure: 'Cataract Surgery', payer: 'Medicare', billed: 4200, outstanding: 840, status: 'Pending', daysAR: 89, provider: 'Dr. Diana Prince', month: 'Dec' },
                { name: 'Woody', account: '212203018', serviceDate: '2023-12-15', procedure: 'Tonsillectomy', payer: 'Medicaid', billed: 3500, outstanding: 700, status: 'Pending', daysAR: 86, provider: 'Dr. Natasha Romanoff', month: 'Dec' },
                { name: 'Frozen Anna', account: '323304019', serviceDate: '2023-12-18', procedure: 'Broken Arm Cast', payer: 'United Healthcare', billed: 1200, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Clark Kent', month: 'Dec' },
                { name: 'Green Lantern', account: '434405020', serviceDate: '2023-12-20', procedure: 'Allergy Testing', payer: 'BCBS', billed: 850, outstanding: 170, status: 'Pending', daysAR: 81, provider: 'Dr. Carol Danvers', month: 'Dec' },
                { name: 'Jasmine', account: '545506021', serviceDate: '2023-12-22', procedure: 'Physical Exam', payer: 'Medicare', billed: 250, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Natasha Romanoff', month: 'Dec' },
                { name: 'Ant-Man', account: '656607022', serviceDate: '2023-12-28', procedure: 'Flu Treatment', payer: 'Medicaid', billed: 180, outstanding: 36, status: 'Pending', daysAR: 75, provider: 'Dr. Clark Kent', month: 'Dec' },

                // November 2023 (Q4 data)
                { name: 'Pocahontas', account: '767708023', serviceDate: '2023-11-02', procedure: 'Mammogram', payer: 'United Healthcare', billed: 380, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Diana Prince', month: 'Nov' },
                { name: 'Black Panther', account: '878809024', serviceDate: '2023-11-05', procedure: 'Diabetes Management', payer: 'BCBS', billed: 420, outstanding: 84, status: 'Pending', daysAR: 118, provider: 'Dr. Jean Grey', month: 'Nov' },
                { name: 'Snow White', account: '989910025', serviceDate: '2023-11-08', procedure: 'Thyroid Surgery', payer: 'Medicare', billed: 16500, outstanding: 3300, status: 'Review', daysAR: 115, provider: 'Dr. Steve Rogers', month: 'Nov' },
                { name: 'Robin Hood', account: '090011026', serviceDate: '2023-11-12', procedure: 'Asthma Treatment', payer: 'Medicaid', billed: 290, outstanding: 58, status: 'Pending', daysAR: 111, provider: 'Dr. Jean Grey', month: 'Nov' },
                { name: 'Catwoman', account: '101112027', serviceDate: '2023-11-15', procedure: 'Shoulder Surgery', payer: 'United Healthcare', billed: 18000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Bruce Wayne', month: 'Nov' },
                { name: 'Han Solo', account: '212213028', serviceDate: '2023-11-18', procedure: 'Cardiac Ablation', payer: 'BCBS', billed: 25000, outstanding: 5000, status: 'Pending', daysAR: 105, provider: 'Dr. Tony Stark', month: 'Nov' },
                { name: 'Violet Parr', account: '323314029', serviceDate: '2023-11-22', procedure: 'Migraine Treatment', payer: 'Medicare', billed: 480, outstanding: 96, status: 'Pending', daysAR: 101, provider: 'Dr. Charles Xavier', month: 'Nov' },
                { name: 'Optimus Prime', account: '434415030', serviceDate: '2023-11-25', procedure: 'Sports Injury', payer: 'Medicaid', billed: 1200, outstanding: 240, status: 'Pending', daysAR: 98, provider: 'Dr. Bruce Wayne', month: 'Nov' },

                // October 2023 (Q4 data)
                { name: 'Elastigirl', account: '545516031', serviceDate: '2023-10-03', procedure: 'Hysterectomy', payer: 'United Healthcare', billed: 28000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Steve Rogers', month: 'Oct' },
                { name: 'Spock', account: '656617032', serviceDate: '2023-10-06', procedure: 'Sleep Study', payer: 'BCBS', billed: 1800, outstanding: 360, status: 'Pending', daysAR: 148, provider: 'Dr. Jean Grey', month: 'Oct' },
                { name: 'Tinker Bell', account: '767718033', serviceDate: '2023-10-09', procedure: 'Arthritis Treatment', payer: 'Medicare', billed: 650, outstanding: 130, status: 'Pending', daysAR: 145, provider: 'Dr. Bruce Wayne', month: 'Oct' },
                { name: 'Joker', account: '878819034', serviceDate: '2023-10-12', procedure: 'Bladder Surgery', payer: 'Medicaid', billed: 14000, outstanding: 2800, status: 'Review', daysAR: 142, provider: 'Dr. Scott Lang', month: 'Oct' },
                { name: 'Sleeping Beauty', account: '989920035', serviceDate: '2023-10-15', procedure: 'Skin Graft', payer: 'United Healthcare', billed: 8500, outstanding: 1700, status: 'Pending', daysAR: 139, provider: 'Dr. Carol Danvers', month: 'Oct' },
                { name: 'Captain Kirk', account: '090021036', serviceDate: '2023-10-18', procedure: 'Eye Surgery', payer: 'BCBS', billed: 12000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Diana Prince', month: 'Oct' },
                { name: 'Merida', account: '101122037', serviceDate: '2023-10-21', procedure: 'Cancer Screening', payer: 'Medicare', billed: 750, outstanding: 150, status: 'Pending', daysAR: 133, provider: 'Dr. Wanda Maximoff', month: 'Oct' },
                { name: 'Thanos', account: '212223038', serviceDate: '2023-10-25', procedure: 'Emergency Surgery', payer: 'Medicaid', billed: 32000, outstanding: 6400, status: 'Review', daysAR: 129, provider: 'Dr. Clark Kent', month: 'Oct' },

                // Additional patients for March 2024
                { name: 'Neo', account: '324435039', serviceDate: '2024-03-01', procedure: 'Neurosurgery', payer: 'United Healthcare', billed: 75000, outstanding: 15000, status: 'Pending', daysAR: 28, provider: 'Dr. Charles Xavier', month: 'Mar' },
                { name: 'Trinity', account: '435546040', serviceDate: '2024-03-03', procedure: 'Spinal Fusion', payer: 'BCBS', billed: 45000, outstanding: 9000, status: 'Review', daysAR: 26, provider: 'Dr. Bruce Wayne', month: 'Mar' },
                { name: 'Morpheus', account: '546657041', serviceDate: '2024-03-05', procedure: 'Kidney Transplant', payer: 'Medicare', billed: 120000, outstanding: 24000, status: 'Pending', daysAR: 24, provider: 'Dr. Steve Rogers', month: 'Mar' },
                { name: 'Agent Smith', account: '657768042', serviceDate: '2024-03-07', procedure: 'Cardiac Surgery', payer: 'Medicaid', billed: 95000, outstanding: 19000, status: 'Review', daysAR: 22, provider: 'Dr. Tony Stark', month: 'Mar' },
                { name: 'Sherlock Holmes', account: '768879043', serviceDate: '2024-03-09', procedure: 'Brain Tumor Removal', payer: 'United Healthcare', billed: 85000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Charles Xavier', month: 'Mar' },
                { name: 'John Watson', account: '879980044', serviceDate: '2024-03-11', procedure: 'Gunshot Wound Treatment', payer: 'BCBS', billed: 35000, outstanding: 7000, status: 'Pending', daysAR: 18, provider: 'Dr. Clark Kent', month: 'Mar' },
                { name: 'Frodo Baggins', account: '980091045', serviceDate: '2024-03-13', procedure: 'Finger Reattachment', payer: 'Medicare', billed: 25000, outstanding: 5000, status: 'Pending', daysAR: 16, provider: 'Dr. Bruce Wayne', month: 'Mar' },
                { name: 'Gandalf', account: '091102046', serviceDate: '2024-03-15', procedure: 'Burn Treatment', payer: 'Medicaid', billed: 15000, outstanding: 3000, status: 'Review', daysAR: 14, provider: 'Dr. Carol Danvers', month: 'Mar' },
                { name: 'Aragorn', account: '102213047', serviceDate: '2024-03-17', procedure: 'Wound Care', payer: 'United Healthcare', billed: 8500, outstanding: 1700, status: 'Pending', daysAR: 12, provider: 'Dr. Natasha Romanoff', month: 'Mar' },
                { name: 'Legolas', account: '213324048', serviceDate: '2024-03-19', procedure: 'Vision Correction Surgery', payer: 'BCBS', billed: 12000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Diana Prince', month: 'Mar' },
                { name: 'Gimli', account: '324435049', serviceDate: '2024-03-21', procedure: 'Back Surgery', payer: 'Medicare', billed: 55000, outstanding: 11000, status: 'Pending', daysAR: 8, provider: 'Dr. Bruce Wayne', month: 'Mar' },
                { name: 'Boromir', account: '435546050', serviceDate: '2024-03-23', procedure: 'Chest Surgery', payer: 'Medicaid', billed: 42000, outstanding: 8400, status: 'Review', daysAR: 6, provider: 'Dr. Steve Rogers', month: 'Mar' },

                // Additional patients for September 2023
                { name: 'Indiana Jones', account: '546657051', serviceDate: '2023-09-02', procedure: 'Shoulder Surgery', payer: 'United Healthcare', billed: 28000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Bruce Wayne', month: 'Sep' },
                { name: 'Han Solo', account: '657768052', serviceDate: '2023-09-05', procedure: 'Carbonite Poisoning Treatment', payer: 'BCBS', billed: 45000, outstanding: 9000, status: 'Pending', daysAR: 176, provider: 'Dr. Jean Grey', month: 'Sep' },
                { name: 'Chewbacca', account: '768879053', serviceDate: '2023-09-08', procedure: 'Dental Surgery', payer: 'Medicare', billed: 8500, outstanding: 1700, status: 'Pending', daysAR: 173, provider: 'Dr. Carol Danvers', month: 'Sep' },
                { name: 'R2-D2', account: '879980054', serviceDate: '2023-09-11', procedure: 'Robotic Joint Replacement', payer: 'Medicaid', billed: 65000, outstanding: 13000, status: 'Review', daysAR: 170, provider: 'Dr. Bruce Wayne', month: 'Sep' },
                { name: 'C-3PO', account: '980091055', serviceDate: '2023-09-14', procedure: 'Speech Therapy', payer: 'United Healthcare', billed: 3200, outstanding: 640, status: 'Pending', daysAR: 167, provider: 'Dr. Natasha Romanoff', month: 'Sep' },
                { name: 'Obi-Wan Kenobi', account: '091102056', serviceDate: '2023-09-17', procedure: 'Lightsaber Wound Treatment', payer: 'BCBS', billed: 22000, outstanding: 4400, status: 'Review', daysAR: 164, provider: 'Dr. Clark Kent', month: 'Sep' },
                { name: 'Qui-Gon Jinn', account: '102213057', serviceDate: '2023-09-20', procedure: 'Trauma Surgery', payer: 'Medicare', billed: 58000, outstanding: 11600, status: 'Pending', daysAR: 161, provider: 'Dr. Steve Rogers', month: 'Sep' },
                { name: 'Mace Windu', account: '213324058', serviceDate: '2023-09-23', procedure: 'Hand Reattachment', payer: 'Medicaid', billed: 35000, outstanding: 7000, status: 'Review', daysAR: 158, provider: 'Dr. Bruce Wayne', month: 'Sep' },
                { name: 'Padme Amidala', account: '324435059', serviceDate: '2023-09-26', procedure: 'Maternity Care', payer: 'United Healthcare', billed: 25000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Natasha Romanoff', month: 'Sep' },
                { name: 'Anakin Skywalker', account: '435546060', serviceDate: '2023-09-29', procedure: 'Prosthetic Limb Surgery', payer: 'BCBS', billed: 125000, outstanding: 25000, status: 'Pending', daysAR: 152, provider: 'Dr. Steve Rogers', month: 'Sep' },

                // Additional patients for August 2023
                { name: 'Katniss Everdeen', account: '546657061', serviceDate: '2023-08-01', procedure: 'Archery Injury Treatment', payer: 'Medicare', billed: 12000, outstanding: 2400, status: 'Pending', daysAR: 212, provider: 'Dr. Bruce Wayne', month: 'Aug' },
                { name: 'Peeta Mellark', account: '657768062', serviceDate: '2023-08-04', procedure: 'Burn Treatment', payer: 'Medicaid', billed: 18000, outstanding: 3600, status: 'Review', daysAR: 209, provider: 'Dr. Carol Danvers', month: 'Aug' },
                { name: 'Gale Hawthorne', account: '768879063', serviceDate: '2023-08-07', procedure: 'Shrapnel Removal', payer: 'United Healthcare', billed: 22000, outstanding: 4400, status: 'Pending', daysAR: 206, provider: 'Dr. Clark Kent', month: 'Aug' },
                { name: 'Haymitch Abernathy', account: '879980064', serviceDate: '2023-08-10', procedure: 'Alcohol Poisoning Treatment', payer: 'BCBS', billed: 8500, outstanding: 1700, status: 'Pending', daysAR: 203, provider: 'Dr. Jean Grey', month: 'Aug' },
                { name: 'Effie Trinket', account: '980091065', serviceDate: '2023-08-13', procedure: 'Cosmetic Surgery', payer: 'Medicare', billed: 15000, outstanding: 3000, status: 'Review', daysAR: 200, provider: 'Dr. Carol Danvers', month: 'Aug' },
                { name: 'President Snow', account: '091102066', serviceDate: '2023-08-16', procedure: 'Poison Treatment', payer: 'Medicaid', billed: 45000, outstanding: 9000, status: 'Denied', daysAR: 197, provider: 'Dr. Wanda Maximoff', month: 'Aug' },
                { name: 'Finnick Odair', account: '102213067', serviceDate: '2023-08-19', procedure: 'Water Injury Treatment', payer: 'United Healthcare', billed: 28000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Clark Kent', month: 'Aug' },
                { name: 'Johanna Mason', account: '213324068', serviceDate: '2023-08-22', procedure: 'Axe Wound Treatment', payer: 'BCBS', billed: 32000, outstanding: 6400, status: 'Pending', daysAR: 191, provider: 'Dr. Steve Rogers', month: 'Aug' },
                { name: 'Beetee', account: '324435069', serviceDate: '2023-08-25', procedure: 'Electrical Burn Treatment', payer: 'Medicare', billed: 25000, outstanding: 5000, status: 'Review', daysAR: 188, provider: 'Dr. Carol Danvers', month: 'Aug' },
                { name: 'Wiress', account: '435546070', serviceDate: '2023-08-28', procedure: 'Mental Health Evaluation', payer: 'Medicaid', billed: 1200, outstanding: 240, status: 'Pending', daysAR: 185, provider: 'Dr. Charles Xavier', month: 'Aug' },

                // Additional patients for July 2023
                { name: 'Edward Cullen', account: '546657071', serviceDate: '2023-07-03', procedure: 'Blood Disorder Treatment', payer: 'United Healthcare', billed: 35000, outstanding: 7000, status: 'Pending', daysAR: 241, provider: 'Dr. Wanda Maximoff', month: 'Jul' },
                { name: 'Bella Swan', account: '657768072', serviceDate: '2023-07-06', procedure: 'Pregnancy Complications', payer: 'BCBS', billed: 45000, outstanding: 9000, status: 'Review', daysAR: 238, provider: 'Dr. Natasha Romanoff', month: 'Jul' },
                { name: 'Jacob Black', account: '768879073', serviceDate: '2023-07-09', procedure: 'Animal Bite Treatment', payer: 'Medicare', billed: 8500, outstanding: 1700, status: 'Pending', daysAR: 235, provider: 'Dr. Carol Danvers', month: 'Jul' },
                { name: 'Alice Cullen', account: '879980074', serviceDate: '2023-07-12', procedure: 'Vision Disorder Treatment', payer: 'Medicaid', billed: 12000, outstanding: 2400, status: 'Review', daysAR: 232, provider: 'Dr. Diana Prince', month: 'Jul' },
                { name: 'Emmett Cullen', account: '980091075', serviceDate: '2023-07-15', procedure: 'Strength Enhancement Surgery', payer: 'United Healthcare', billed: 55000, outstanding: 11000, status: 'Pending', daysAR: 229, provider: 'Dr. Steve Rogers', month: 'Jul' },
                { name: 'Rosalie Hale', account: '091102076', serviceDate: '2023-07-18', procedure: 'Cosmetic Reconstruction', payer: 'BCBS', billed: 38000, outstanding: 7600, status: 'Review', daysAR: 226, provider: 'Dr. Carol Danvers', month: 'Jul' },
                { name: 'Jasper Hale', account: '102213077', serviceDate: '2023-07-21', procedure: 'Mood Disorder Treatment', payer: 'Medicare', billed: 15000, outstanding: 3000, status: 'Pending', daysAR: 223, provider: 'Dr. Charles Xavier', month: 'Jul' },
                { name: 'Carlisle Cullen', account: '213324078', serviceDate: '2023-07-24', procedure: 'Medical Consultation', payer: 'Medicaid', billed: 2500, outstanding: 500, status: 'Pending', daysAR: 220, provider: 'Dr. Tony Stark', month: 'Jul' },
                { name: 'Esme Cullen', account: '324435079', serviceDate: '2023-07-27', procedure: 'Heart Surgery', payer: 'United Healthcare', billed: 75000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Tony Stark', month: 'Jul' },
                { name: 'Charlie Swan', account: '435546080', serviceDate: '2023-07-30', procedure: 'Police Injury Treatment', payer: 'BCBS', billed: 18000, outstanding: 3600, status: 'Pending', daysAR: 214, provider: 'Dr. Clark Kent', month: 'Jul' },

                // Additional patients for June 2023
                { name: 'Harry Potter', account: '546657081', serviceDate: '2023-06-02', procedure: 'Scar Removal', payer: 'Medicare', billed: 8500, outstanding: 1700, status: 'Pending', daysAR: 272, provider: 'Dr. Carol Danvers', month: 'Jun' },
                { name: 'Ron Weasley', account: '657768082', serviceDate: '2023-06-05', procedure: 'Broken Wand Injury', payer: 'Medicaid', billed: 3200, outstanding: 640, status: 'Review', daysAR: 269, provider: 'Dr. Bruce Wayne', month: 'Jun' },
                { name: 'Hermione Granger', account: '768879083', serviceDate: '2023-06-08', procedure: 'Memory Enhancement Procedure', payer: 'United Healthcare', billed: 25000, outstanding: 5000, status: 'Pending', daysAR: 266, provider: 'Dr. Charles Xavier', month: 'Jun' },
                { name: 'Albus Dumbledore', account: '879980084', serviceDate: '2023-06-11', procedure: 'Age-Related Treatment', payer: 'BCBS', billed: 45000, outstanding: 9000, status: 'Review', daysAR: 263, provider: 'Dr. Wanda Maximoff', month: 'Jun' },
                { name: 'Severus Snape', account: '980091085', serviceDate: '2023-06-14', procedure: 'Snake Bite Treatment', payer: 'Medicare', billed: 18000, outstanding: 3600, status: 'Pending', daysAR: 260, provider: 'Dr. Jean Grey', month: 'Jun' },
                { name: 'Rubeus Hagrid', account: '091102086', serviceDate: '2023-06-17', procedure: 'Animal Attack Treatment', payer: 'Medicaid', billed: 22000, outstanding: 4400, status: 'Review', daysAR: 257, provider: 'Dr. Clark Kent', month: 'Jun' },
                { name: 'Sirius Black', account: '102213087', serviceDate: '2023-06-20', procedure: 'Prison Injury Treatment', payer: 'United Healthcare', billed: 35000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Steve Rogers', month: 'Jun' },
                { name: 'Remus Lupin', account: '213324088', serviceDate: '2023-06-23', procedure: 'Werewolf Transformation Treatment', payer: 'BCBS', billed: 42000, outstanding: 8400, status: 'Pending', daysAR: 251, provider: 'Dr. Jean Grey', month: 'Jun' },
                { name: 'Neville Longbottom', account: '324435089', serviceDate: '2023-06-26', procedure: 'Plant Poisoning Treatment', payer: 'Medicare', billed: 8500, outstanding: 1700, status: 'Review', daysAR: 248, provider: 'Dr. Carol Danvers', month: 'Jun' },
                { name: 'Luna Lovegood', account: '435546090', serviceDate: '2023-06-29', procedure: 'Psychiatric Evaluation', payer: 'Medicaid', billed: 2200, outstanding: 440, status: 'Pending', daysAR: 245, provider: 'Dr. Charles Xavier', month: 'Jun' },

                // Additional patients for April 2024 (recent)
                { name: 'James Bond', account: '546657091', serviceDate: '2024-04-01', procedure: 'Gunshot Wound Treatment', payer: 'United Healthcare', billed: 45000, outstanding: 9000, status: 'Review', daysAR: 8, provider: 'Dr. Clark Kent', month: 'Apr' },
                { name: 'Ethan Hunt', account: '657768092', serviceDate: '2024-04-03', procedure: 'Mission Impossible Injury', payer: 'BCBS', billed: 35000, outstanding: 7000, status: 'Pending', daysAR: 6, provider: 'Dr. Steve Rogers', month: 'Apr' },
                { name: 'Jason Bourne', account: '768879093', serviceDate: '2024-04-05', procedure: 'Memory Loss Treatment', payer: 'Medicare', billed: 28000, outstanding: 5600, status: 'Review', daysAR: 4, provider: 'Dr. Charles Xavier', month: 'Apr' },
                { name: 'John Wick', account: '879980094', serviceDate: '2024-04-07', procedure: 'Combat Injury Treatment', payer: 'Medicaid', billed: 52000, outstanding: 10400, status: 'Pending', daysAR: 2, provider: 'Dr. Clark Kent', month: 'Apr' },
                { name: 'Lara Croft', account: '980091095', serviceDate: '2024-04-09', procedure: 'Archaeological Injury', payer: 'United Healthcare', billed: 22000, outstanding: 0, status: 'Paid', daysAR: 0, provider: 'Dr. Bruce Wayne', month: 'Apr' },

                // Additional patients for May 2024 (future dates for testing)
                { name: 'Tony Stark', account: '091102096', serviceDate: '2024-05-01', procedure: 'Arc Reactor Surgery', payer: 'BCBS', billed: 250000, outstanding: 50000, status: 'Pending', daysAR: 15, provider: 'Dr. Tony Stark', month: 'May' },
                { name: 'Peter Parker', account: '102213097', serviceDate: '2024-05-03', procedure: 'Spider Bite Treatment', payer: 'Medicare', billed: 15000, outstanding: 3000, status: 'Review', daysAR: 13, provider: 'Dr. Jean Grey', month: 'May' },
                { name: 'Bruce Banner', account: '213324098', serviceDate: '2024-05-05', procedure: 'Gamma Radiation Treatment', payer: 'Medicaid', billed: 185000, outstanding: 37000, status: 'Pending', daysAR: 11, provider: 'Dr. Wanda Maximoff', month: 'May' },
                { name: 'Natasha Romanoff', account: '324435099', serviceDate: '2024-05-07', procedure: 'Spy Injury Treatment', payer: 'United Healthcare', billed: 38000, outstanding: 7600, status: 'Review', daysAR: 9, provider: 'Dr. Steve Rogers', month: 'May' },
                { name: 'Clint Barton', account: '435546100', serviceDate: '2024-05-09', procedure: 'Archery Accident', payer: 'BCBS', billed: 18000, outstanding: 3600, status: 'Pending', daysAR: 7, provider: 'Dr. Bruce Wayne', month: 'May' }
            ],

            // AR trend data with multiple time periods
            arTrend: {
                last30Days: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    values: [1200, 1150, 1180, 1120],
                    daysAR: [46, 45, 44, 43]
                },
                lastQuarter: {
                    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
                    values: [1350, 1280, 1420, 1200, 1150],
                    daysAR: [51, 48, 52, 45, 42]
                },
                yearToDate: {
                    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
                    values: [1580, 1520, 1680, 1420, 1750, 1620, 1690, 1350, 1280, 1420, 1200, 1150],
                    daysAR: [54, 52, 58, 48, 62, 56, 59, 51, 48, 52, 45, 42]
                },
                allTime: {
                    labels: ['2020', '2021', '2022', '2023', '2024 YTD'],
                    values: [1890, 1750, 1650, 1520, 1285],
                    daysAR: [65, 58, 52, 49, 46]
                }
            },

            // Reports data with comprehensive historical data
            reports: {
                monthlyReports: [
                    { month: 'February 2024', revenue: 875000, collections: 805000, denialRate: 7.8, daysAR: 42, generatedDate: '2024-02-28', claims: 2456, paid: 2265, denied: 191 },
                    { month: 'January 2024', revenue: 920000, collections: 850000, denialRate: 8.2, daysAR: 45, generatedDate: '2024-01-31', claims: 2678, paid: 2458, denied: 220 },
                    { month: 'December 2023', revenue: 885000, collections: 812000, denialRate: 8.5, daysAR: 48, generatedDate: '2023-12-31', claims: 2534, paid: 2319, denied: 215 },
                    { month: 'November 2023', revenue: 798000, collections: 735000, denialRate: 9.1, daysAR: 52, generatedDate: '2023-11-30', claims: 2389, paid: 2171, denied: 218 },
                    { month: 'October 2023', revenue: 945000, collections: 868000, denialRate: 8.8, daysAR: 51, generatedDate: '2023-10-31', claims: 2765, paid: 2523, denied: 242 },
                    { month: 'September 2023', revenue: 1020000, collections: 935000, denialRate: 8.3, daysAR: 49, generatedDate: '2023-09-30', claims: 2890, paid: 2649, denied: 241 },
                    { month: 'August 2023', revenue: 978000, collections: 895000, denialRate: 8.5, daysAR: 56, generatedDate: '2023-08-31', claims: 2734, paid: 2501, denied: 233 },
                    { month: 'July 2023', revenue: 1150000, collections: 1035000, denialRate: 10.0, daysAR: 62, generatedDate: '2023-07-31', claims: 3245, paid: 2921, denied: 324 },
                    { month: 'June 2023', revenue: 890000, collections: 820000, denialRate: 7.9, daysAR: 48, generatedDate: '2023-06-30', claims: 2456, paid: 2261, denied: 195 },
                    { month: 'May 2023', revenue: 1080000, collections: 972000, denialRate: 10.0, daysAR: 58, generatedDate: '2023-05-31', claims: 3021, paid: 2719, denied: 302 },
                    { month: 'April 2023', revenue: 950000, collections: 874000, denialRate: 8.0, daysAR: 52, generatedDate: '2023-04-30', claims: 2678, paid: 2464, denied: 214 },
                    { month: 'March 2023', revenue: 1025000, collections: 946000, denialRate: 7.7, daysAR: 54, generatedDate: '2023-03-31', claims: 2890, paid: 2667, denied: 223 }
                ],
                quarterlyReports: [
                    { quarter: 'Q1 2024', revenue: 2675000, collections: 2465000, denialRate: 8.1, daysAR: 45, generatedDate: '2024-03-31', claims: 7834, avgCollectionTime: 43 },
                    { quarter: 'Q4 2023', revenue: 2628000, collections: 2415000, denialRate: 8.8, daysAR: 50, generatedDate: '2023-12-31', claims: 7688, avgCollectionTime: 47 },
                    { quarter: 'Q3 2023', revenue: 3148000, collections: 2865000, denialRate: 8.9, daysAR: 55, generatedDate: '2023-09-30', claims: 8869, avgCollectionTime: 52 },
                    { quarter: 'Q2 2023', revenue: 2920000, collections: 2666000, denialRate: 8.6, daysAR: 52, generatedDate: '2023-06-30', claims: 8155, avgCollectionTime: 49 }
                ],
                yearlyReports: [
                    { year: '2023', revenue: 11396000, collections: 10411000, denialRate: 8.6, daysAR: 50, generatedDate: '2023-12-31', claims: 32546, growth: '+12.3%' },
                    { year: '2022', revenue: 10145000, collections: 9230000, denialRate: 9.0, daysAR: 52, generatedDate: '2022-12-31', claims: 28934, growth: '+8.7%' },
                    { year: '2021', revenue: 9334000, collections: 8456000, denialRate: 9.4, daysAR: 58, generatedDate: '2021-12-31', claims: 26789, growth: '+5.2%' },
                    { year: '2020', revenue: 8872000, collections: 7985000, denialRate: 10.0, daysAR: 65, generatedDate: '2020-12-31', claims: 25456, growth: '-3.1%' }
                ],
                scheduledReports: [
                    { name: 'Weekly AR Summary', frequency: 'Weekly', nextRun: '2024-03-01', recipients: ['admin@hospital.com', 'finance@hospital.com'], lastRun: '2024-02-23' },
                    { name: 'Monthly Collections Report', frequency: 'Monthly', nextRun: '2024-03-01', recipients: ['cfo@hospital.com'], lastRun: '2024-02-01' },
                    { name: 'Denial Analysis', frequency: 'Bi-weekly', nextRun: '2024-02-29', recipients: ['coding@hospital.com'], lastRun: '2024-02-15' },
                    { name: 'Provider Performance Review', frequency: 'Monthly', nextRun: '2024-03-05', recipients: ['medical.director@hospital.com'], lastRun: '2024-02-05' },
                    { name: 'Payer Performance Analysis', frequency: 'Quarterly', nextRun: '2024-04-01', recipients: ['contracts@hospital.com'], lastRun: '2024-01-01' },
                    { name: 'Executive Dashboard', frequency: 'Weekly', nextRun: '2024-03-04', recipients: ['ceo@hospital.com', 'cfo@hospital.com'], lastRun: '2024-02-26' }
                ]
            },

            // Analytics data with comprehensive performance metrics
            analytics: {
                payerPerformance: [
                    { payer: 'United Healthcare', totalClaims: 1250, paidClaims: 1150, deniedClaims: 100, avgPaymentTime: 18, collectionRate: 92.0, ytdClaims: 15000, ytdRevenue: 18750000, marketShare: 28.5 },
                    { payer: 'BCBS', totalClaims: 1180, paidClaims: 1040, deniedClaims: 140, avgPaymentTime: 22, collectionRate: 88.1, ytdClaims: 14160, ytdRevenue: 16980000, marketShare: 25.8 },
                    { payer: 'Medicare', totalClaims: 980, paidClaims: 910, deniedClaims: 70, avgPaymentTime: 15, collectionRate: 92.9, ytdClaims: 11760, ytdRevenue: 9408000, marketShare: 18.2 },
                    { payer: 'Medicaid', totalClaims: 750, paidClaims: 700, deniedClaims: 50, avgPaymentTime: 25, collectionRate: 93.3, ytdClaims: 9000, ytdRevenue: 5400000, marketShare: 12.4 },
                    { payer: 'Aetna', totalClaims: 645, paidClaims: 578, deniedClaims: 67, avgPaymentTime: 20, collectionRate: 89.6, ytdClaims: 7740, ytdRevenue: 9288000, marketShare: 8.9 },
                    { payer: 'Cigna', totalClaims: 523, paidClaims: 465, deniedClaims: 58, avgPaymentTime: 19, collectionRate: 88.9, ytdClaims: 6276, ytdRevenue: 7531200, marketShare: 6.2 }
                ],
                trendAnalysis: {
                    last12Months: {
                        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
                        collectionRates: [91.2, 89.5, 88.7, 92.1, 87.8, 90.2, 91.5, 89.3, 88.9, 90.5, 91.8, 92.0],
                        denialRates: [8.8, 10.5, 11.3, 7.9, 12.2, 9.8, 8.5, 10.7, 11.1, 9.5, 8.2, 8.0],
                        avgDaysAR: [54, 58, 61, 43, 67, 52, 48, 60, 63, 51, 45, 42],
                        revenue: [1025000, 950000, 1080000, 890000, 1150000, 978000, 1020000, 945000, 798000, 885000, 920000, 875000]
                    },
                    quarterlyComparison: {
                        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
                        collectionRates: [89.8, 90.2, 89.0, 89.6, 91.9],
                        denialRates: [10.2, 9.8, 10.3, 9.8, 8.0],
                        avgDaysAR: [58, 51, 55, 50, 43],
                        revenue: [3055000, 2920000, 3148000, 2628000, 2675000]
                    },
                    yearlyComparison: {
                        labels: ['2020', '2021', '2022', '2023', '2024 YTD'],
                        collectionRates: [85.5, 87.2, 88.9, 89.6, 91.9],
                        denialRates: [14.5, 12.8, 11.1, 10.4, 8.0],
                        avgDaysAR: [65, 58, 52, 50, 43],
                        revenue: [8872000, 9334000, 10145000, 11396000, 2675000]
                    }
                },
                specialtyAnalysis: [
                    { specialty: 'Cardiology', revenue: 5820000, collectionRate: 95.2, avgDaysAR: 38, claims: 1456, denialRate: 4.8 },
                    { specialty: 'Orthopedics', revenue: 7500000, collectionRate: 91.8, avgDaysAR: 44, claims: 1234, denialRate: 8.2 },
                    { specialty: 'Emergency Medicine', revenue: 8640000, collectionRate: 89.3, avgDaysAR: 41, claims: 2456, denialRate: 10.7 },
                    { specialty: 'Surgery', revenue: 10200000, collectionRate: 94.1, avgDaysAR: 39, claims: 987, denialRate: 5.9 },
                    { specialty: 'Oncology', revenue: 11400000, collectionRate: 96.7, avgDaysAR: 42, claims: 1123, denialRate: 3.3 },
                    { specialty: 'Radiology', revenue: 4620000, collectionRate: 88.7, avgDaysAR: 52, claims: 1789, denialRate: 11.3 },
                    { specialty: 'Pediatrics', revenue: 3540000, collectionRate: 93.4, avgDaysAR: 35, claims: 1567, denialRate: 6.6 }
                ]
            },

            // Settings data
            settings: {
                user: {
                    name: 'Dr. Jennifer Adams',
                    role: 'RCM Administrator',
                    email: 'jadams@hospital.com',
                    department: 'Revenue Cycle Management'
                },
                preferences: {
                    arThreshold: 50,
                    denialThreshold: 10,
                    emailNotifications: true,
                    dashboardRefresh: 30
                },
                systemInfo: {
                    version: '2.1.4',
                    lastUpdate: '2024-02-15',
                    uptime: '99.8%',
                    dataRetention: '7 years'
                }
            }
        };
    }

    init() {
        this.filteredPatientAccounts = this.data.patients;
        this.setupEventListeners();
        this.setupNavigationListeners();
        this.setupArTrendChartListeners();
        this.renderDashboard();
        this.initializeCharts();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(e.target.dataset.section);
            });
        });

        // Refresh button
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        // Floating action button
        const floatingAction = document.querySelector('.floating-action');
        if (floatingAction) {
            floatingAction.addEventListener('click', () => {
                this.showQuickActions();
            });
        }

        // Search input
        const searchInput = document.querySelector('input[placeholder="Search accounts..."]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterPatients(e.target.value);
            });
        }

        // Pagination controls
        this.setupPaginationListeners();
    }

    setupPaginationListeners() {
        // Previous button
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderPatientTable();
                    this.updatePaginationButtons();
                }
            });
        }

        // Next button
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(this.filteredPatientAccounts.length / this.rowsPerPage);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.renderPatientTable();
                    this.updatePaginationButtons();
                }
            });
        }

        // Page number buttons
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                if (page && page !== this.currentPage) {
                    this.currentPage = page;
                    this.renderPatientTable();
                    this.updatePaginationButtons();
                }
            });
        });
    }

    updatePaginationButtons() {
        const totalPages = Math.ceil(this.filteredPatientAccounts.length / this.rowsPerPage);
        
        // Update page buttons
        document.querySelectorAll('.page-btn').forEach(btn => {
            const page = parseInt(btn.dataset.page);
            if (page === this.currentPage) {
                btn.className = 'px-3 py-2 bg-blue-500 text-white rounded-lg transition-colors text-sm page-btn';
            } else {
                btn.className = 'px-3 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] rounded-lg border border-[var(--border-subtle)] transition-colors text-sm page-btn';
            }
        });

        // Update Previous button state
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            if (this.currentPage <= 1) {
                prevBtn.disabled = true;
                prevBtn.className = 'px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded-lg border border-[var(--border-subtle)] text-sm cursor-not-allowed';
            } else {
                prevBtn.disabled = false;
                prevBtn.className = 'px-3 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] rounded-lg border border-[var(--border-subtle)] transition-colors text-sm';
            }
        }

        // Update Next button state
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            if (this.currentPage >= totalPages) {
                nextBtn.disabled = true;
                nextBtn.className = 'px-3 py-2 bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded-lg border border-[var(--border-subtle)] text-sm cursor-not-allowed';
            } else {
                nextBtn.disabled = false;
                nextBtn.className = 'px-3 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] rounded-lg border border-[var(--border-subtle)] transition-colors text-sm';
            }
        }
    }

    setupNavigationListeners() {
        // Additional navigation setup if needed
        console.log('Navigation listeners setup');
        
        // Set up time period selector
        const timeSelector = document.querySelector('select');
        if (timeSelector) {
            timeSelector.addEventListener('change', (e) => {
                this.currentDashboardDateRange = e.target.value;
                this.updateMetricsForTimePeriod(e.target.value);
            });
        }
    }

    setupArTrendChartListeners() {
        // AR trend chart interaction setup
        console.log('AR trend chart listeners setup');
        
        const canvas = document.getElementById('ar-trend-chart');
        if (canvas) {
            canvas.addEventListener('mousemove', (e) => {
                this.handleChartHover(e);
            });
            
            canvas.addEventListener('mouseleave', () => {
                const tooltip = document.getElementById('tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                }
            });
        }
    }

    updateMetricsForTimePeriod(period) {
        let metrics;
        switch(period) {
            case 'Last Quarter':
                metrics = this.data.metrics.lastQuarter;
                break;
            case 'Year to Date':
                metrics = this.data.metrics.yearToDate;
                break;
            case 'All Time':
                metrics = this.data.metrics.allTime;
                break;
            default:
                metrics = this.data.metrics.current;
        }
        
        this.animateValue('total-revenue', `$${(metrics.totalRevenue / 1000000).toFixed(2)}M`);
        this.animateValue('collection-rate', `${metrics.collectionRate.toFixed(1)}%`);
        this.animateValue('days-in-ar', metrics.daysInAR.toFixed(1));
        this.animateValue('denial-rate', `${metrics.denialRate.toFixed(1)}%`);
    }

    handleChartHover(e) {
        // Chart hover functionality
        const tooltip = document.getElementById('tooltip');
        if (tooltip && this.charts.arTrend) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate which data point we're hovering over
            const canvas = this.charts.arTrend.canvas;
            const padding = 40;
            const dataWidth = canvas.offsetWidth - 2 * padding;
            const dataIndex = Math.round((x - padding) / dataWidth * (this.charts.arTrend.data.values.length - 1));
            
            if (dataIndex >= 0 && dataIndex < this.charts.arTrend.data.values.length) {
                const label = this.charts.arTrend.data.labels[dataIndex];
                const value = this.charts.arTrend.data.values[dataIndex];
                const daysAR = this.charts.arTrend.data.daysAR[dataIndex];
                
                // Show tooltip with actual chart data
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 10 + 'px';
                tooltip.style.opacity = '1';
                tooltip.innerHTML = `
                    <div class="font-medium">${label}</div>
                    <div class="text-sm">AR: ${this.formatCurrency(value * 1000)}</div>
                    <div class="text-sm">Days: ${daysAR}</div>
                `;
            } else {
                tooltip.style.opacity = '0';
            }
        }
    }

    handleNavigation(section) {
        // Update active navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const navItem = document.querySelector(`[data-section="${section}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }

        // Hide all sections
        this.hideAllSections();

        // Show selected section
        switch(section) {
            case 'dashboard':
                this.showDashboard();
                break;
            case 'analytics':
                this.showAnalytics();
                break;
            case 'reports':
                this.showReports();
                break;
            case 'settings':
                this.showSettings();
                break;
        }
    }

    hideAllSections() {
        const sections = ['dashboard-section', 'analytics-section', 'reports-section', 'settings-section'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('hidden');
            }
        });
    }

    showDashboard() {
        const section = document.getElementById('dashboard-section');
        if (section) {
            section.classList.remove('hidden');
        }
        this.renderDashboard();
    }

    showAnalytics() {
        let section = document.getElementById('analytics-section');
        if (!section) {
            section = this.createAnalyticsSection();
        }
        section.classList.remove('hidden');
        this.renderAnalytics();
    }

    showReports() {
        let section = document.getElementById('reports-section');
        if (!section) {
            section = this.createReportsSection();
        }
        section.classList.remove('hidden');
        this.renderReports();
    }

    showSettings() {
        let section = document.getElementById('settings-section');
        if (!section) {
            section = this.createSettingsSection();
        }
        section.classList.remove('hidden');
        this.renderSettings();
    }

    createAnalyticsSection() {
        const main = document.querySelector('main');
        const section = document.createElement('div');
        section.id = 'analytics-section';
        section.className = 'space-y-8 hidden';
        section.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold">Advanced Analytics</h2>
                        <p class="text-[var(--text-secondary)] mt-1">Deep dive into performance metrics and trends</p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <select id="analytics-timeframe" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                            <option>Year to Date</option>
                        </select>
                    </div>
                </div>

                <!-- Payer Performance Analysis -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="metric-card rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-6">Payer Performance Analysis</h3>
                        <div id="payer-performance-list" class="space-y-4"></div>
                    </div>

                    <div class="metric-card rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-6">Collection Trend Analysis</h3>
                        <div class="chart-container">
                            <canvas id="trend-analysis-chart" class="w-full h-full"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Detailed Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="metric-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="p-2 bg-purple-500/10 rounded-lg">
                                <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <h4 class="text-sm font-medium text-[var(--text-secondary)]">Avg Payment Time</h4>
                            <p class="text-2xl font-bold">19.5 days</p>
                            <div class="text-sm text-green-400">-2.3 days vs last month</div>
                        </div>
                    </div>

                    <div class="metric-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="p-2 bg-blue-500/10 rounded-lg">
                                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <h4 class="text-sm font-medium text-[var(--text-secondary)]">Clean Claim Rate</h4>
                            <p class="text-2xl font-bold">87.5%</p>
                            <div class="text-sm text-green-400">+1.2% vs last month</div>
                        </div>
                    </div>

                    <div class="metric-card rounded-xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <div class="p-2 bg-green-500/10 rounded-lg">
                                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <h4 class="text-sm font-medium text-[var(--text-secondary)]">Cost to Collect</h4>
                            <p class="text-2xl font-bold">3.2%</p>
                            <div class="text-sm text-red-400">+0.1% vs last month</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        main.appendChild(section);
        return section;
    }

    createReportsSection() {
        const main = document.querySelector('main');
        const section = document.createElement('div');
        section.id = 'reports-section';
        section.className = 'space-y-8 hidden';
        section.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold">Reports & Analytics</h2>
                        <p class="text-[var(--text-secondary)] mt-1">Generate and manage comprehensive reports</p>
                    </div>
                    <button class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                        Generate New Report
                    </button>
                </div>

                <!-- Recent Reports -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="metric-card rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-6">Recent Reports</h3>
                        <div id="recent-reports-list" class="space-y-4"></div>
                    </div>

                    <div class="metric-card rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-6">Scheduled Reports</h3>
                        <div id="scheduled-reports-list" class="space-y-4"></div>
                    </div>
                </div>

                <!-- Report Generation -->
                <div class="metric-card rounded-xl p-6">
                    <h3 class="text-lg font-semibold mb-6">Generate Custom Report</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Report Type</label>
                            <select class="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option>Financial Summary</option>
                                <option>AR Aging Analysis</option>
                                <option>Provider Performance</option>
                                <option>Denial Analysis</option>
                                <option>Payer Performance</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Date Range</label>
                            <select class="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option>Last 30 Days</option>
                                <option>Last Quarter</option>
                                <option>Year to Date</option>
                                <option>Custom Range</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Format</label>
                            <select class="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option>PDF</option>
                                <option>Excel</option>
                                <option>CSV</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        `;
        main.appendChild(section);
        return section;
    }

    createSettingsSection() {
        const main = document.querySelector('main');
        const section = document.createElement('div');
        section.id = 'settings-section';
        section.className = 'space-y-8 hidden';
        section.innerHTML = `
            <div class="space-y-6">
                <div>
                    <h2 class="text-3xl font-bold">Settings</h2>
                    <p class="text-[var(--text-secondary)] mt-1">Manage your account and system preferences</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- User Profile -->
                    <div class="metric-card rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-6">User Profile</h3>
                        <div id="user-profile" class="space-y-4"></div>
                    </div>

                    <!-- System Preferences -->
                    <div class="metric-card rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-6">Preferences</h3>
                        <div id="system-preferences" class="space-y-4"></div>
                    </div>
                </div>

                <!-- System Information -->
                <div class="metric-card rounded-xl p-6">
                    <h3 class="text-lg font-semibold mb-6">System Information</h3>
                    <div id="system-info" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>
                </div>
            </div>
        `;
        main.appendChild(section);
        return section;
    }

    renderDashboard() {
        this.updateMetrics();
        this.renderProviders();
        this.renderPatientTable();
    }

    renderAnalytics() {
        this.renderPayerPerformance();
        this.initTrendAnalysisChart();
    }

    renderReports() {
        this.renderRecentReports();
        this.renderScheduledReports();
    }

    renderSettings() {
        this.renderUserProfile();
        this.renderSystemPreferences();
        this.renderSystemInfo();
    }

    renderPayerPerformance() {
        const container = document.getElementById('payer-performance-list');
        if (!container) return;

        container.innerHTML = this.data.analytics.payerPerformance.map(payer => `
            <div class="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-lg">
                <div>
                    <div class="font-medium">${payer.payer}</div>
                    <div class="text-sm text-[var(--text-secondary)]">${payer.totalClaims} claims processed</div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-lg">${payer.collectionRate.toFixed(1)}%</div>
                    <div class="text-sm text-[var(--text-secondary)]">${payer.avgPaymentTime} days avg</div>
                </div>
            </div>
        `).join('');
    }

    renderRecentReports() {
        const container = document.getElementById('recent-reports-list');
        if (!container) return;

        container.innerHTML = this.data.reports.monthlyReports.map(report => `
            <div class="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-lg">
                <div>
                    <div class="font-medium">${report.month}</div>
                    <div class="text-sm text-[var(--text-secondary)]">Generated ${this.formatDate(report.generatedDate)}</div>
                </div>
                <div class="text-right">
                    <div class="font-bold">${this.formatCurrency(report.revenue)}</div>
                    <button class="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                </div>
            </div>
        `).join('');
    }

    renderScheduledReports() {
        const container = document.getElementById('scheduled-reports-list');
        if (!container) return;

        container.innerHTML = this.data.reports.scheduledReports.map(report => `
            <div class="flex items-center justify-between p-4 bg-[var(--bg-secondary)] rounded-lg">
                <div>
                    <div class="font-medium">${report.name}</div>
                    <div class="text-sm text-[var(--text-secondary)]">${report.frequency}</div>
                </div>
                <div class="text-right">
                    <div class="text-sm font-medium">Next: ${this.formatDate(report.nextRun)}</div>
                    <div class="text-xs text-[var(--text-secondary)]">${report.recipients.length} recipients</div>
                </div>
            </div>
        `).join('');
    }

    renderUserProfile() {
        const container = document.getElementById('user-profile');
        if (!container) return;

        const user = this.data.settings.user;
        container.innerHTML = `
            <div class="flex items-center space-x-4 mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    ${user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <div class="font-bold text-lg">${user.name}</div>
                    <div class="text-[var(--text-secondary)]">${user.role}</div>
                </div>
            </div>
            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
                    <input type="email" value="${user.email}" class="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)] mb-1">Department</label>
                    <input type="text" value="${user.department}" class="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm">
                </div>
            </div>
        `;
    }

    renderSystemPreferences() {
        const container = document.getElementById('system-preferences');
        if (!container) return;

        const prefs = this.data.settings.preferences;
        container.innerHTML = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">AR Days Threshold</label>
                    <input type="number" value="${prefs.arThreshold}" class="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Denial Rate Threshold (%)</label>
                    <input type="number" value="${prefs.denialThreshold}" class="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm">
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Email Notifications</span>
                    <button class="w-12 h-6 bg-blue-500 rounded-full relative transition-colors">
                        <div class="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                    </button>
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Dashboard Refresh (seconds)</label>
                    <select class="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm">
                        <option value="30" ${prefs.dashboardRefresh === 30 ? 'selected' : ''}>30</option>
                        <option value="60">60</option>
                        <option value="120">120</option>
                    </select>
                </div>
            </div>
        `;
    }

    renderSystemInfo() {
        const container = document.getElementById('system-info');
        if (!container) return;

        const info = this.data.settings.systemInfo;
        container.innerHTML = `
            <div class="text-center">
                <div class="text-2xl font-bold">${info.version}</div>
                <div class="text-sm text-[var(--text-secondary)]">System Version</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold">${info.uptime}</div>
                <div class="text-sm text-[var(--text-secondary)]">Uptime</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold">${this.formatDate(info.lastUpdate)}</div>
                <div class="text-sm text-[var(--text-secondary)]">Last Update</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold">${info.dataRetention}</div>
                <div class="text-sm text-[var(--text-secondary)]">Data Retention</div>
            </div>
        `;
    }

    updateMetrics() {
        const metrics = this.data.metrics.current;
        
        this.animateValue('total-revenue', `$${(metrics.totalRevenue / 1000000).toFixed(2)}M`);
        this.animateValue('collection-rate', `${(metrics.collectionRate + this.generateVariance(0, 0.1)).toFixed(1)}%`);
        this.animateValue('days-in-ar', (metrics.daysInAR + this.generateVariance(0, 0.1)).toFixed(1));
        this.animateValue('denial-rate', `${(metrics.denialRate + this.generateVariance(0, 0.1)).toFixed(1)}%`);
    }

    generateVariance(baseValue, variancePercent = 0.15) {
        return (Math.random() - 0.5) * 2 * variancePercent;
    }

    animateValue(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element with ID '${elementId}' not found`);
            return;
        }

        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.2s ease';

        setTimeout(() => {
            if (element) {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
            }
        }, 100);
    }

    renderProviders() {
        const container = document.getElementById('provider-list');
        if (!container) return;

        container.innerHTML = this.data.providers.slice(0, 5).map(provider => `
            <div class="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ${provider.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <div class="font-medium text-sm">${provider.name}</div>
                        <div class="text-xs text-[var(--text-secondary)]">${provider.specialty}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-sm">${provider.collectionRate}%</div>
                    <div class="text-xs text-[var(--text-secondary)]">${provider.avgDaysAR}d AR</div>
                </div>
            </div>
        `).join('');
    }

    renderPatientTable() {
        const tbody = document.getElementById('patient-table-body');
        if (!tbody) return;

        const start = (this.currentPage - 1) * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        const paginatedData = this.filteredPatientAccounts.slice(start, end);

        tbody.innerHTML = paginatedData.map(patient => `
            <tr class="hover:bg-[var(--bg-secondary)] transition-colors">
                <td class="py-4 px-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            ${patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <div class="font-medium text-sm">${patient.name}</div>
                            <div class="text-xs text-[var(--text-secondary)]">${patient.procedure}</div>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-4">
                    <div class="font-mono text-sm">${patient.account}</div>
                    <div class="text-xs text-[var(--text-secondary)]">${patient.payer}</div>
                </td>
                <td class="py-4 px-4 text-sm">${this.formatDate(patient.serviceDate)}</td>
                <td class="py-4 px-4">
                    <div class="font-mono text-sm">${this.formatCurrency(patient.billed)}</div>
                    <div class="text-xs text-[var(--text-secondary)]">Outstanding: ${this.formatCurrency(patient.outstanding)}</div>
                </td>
                <td class="py-4 px-4">
                    <span class="status-badge status-${patient.status.toLowerCase()}">${patient.status}</span>
                </td>
                <td class="py-4 px-4">
                    <div class="text-sm font-medium ${patient.daysAR > 60 ? 'text-red-400' : patient.daysAR > 30 ? 'text-orange-400' : 'text-green-400'}">
                        ${patient.daysAR} days
                    </div>
                </td>
                <td class="py-4 px-4">
                    <button class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors" onclick="if(window.dashboard) window.dashboard.viewPatientDetail('${patient.account}')">
                        View Details
                    </button>
                </td>
            </tr>
        `).join('');

        // Update pagination info
        const recordsInfo = document.getElementById('records-info');
        if (recordsInfo) {
            const total = this.filteredPatientAccounts.length;
            const showing = Math.min(end, total);
            recordsInfo.textContent = `${start + 1}-${showing} of ${total}`;
        }

        // Update pagination buttons
        this.updatePaginationButtons();
    }

    initializeCharts() {
        this.initARTrendChart();
        this.initDenialChart();
    }

    initARTrendChart() {
        const canvas = document.getElementById('ar-trend-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = this.data.arTrend.yearToDate;

        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);

        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        const padding = 40;

        ctx.clearRect(0, 0, width, height);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (i * (height - 2 * padding)) / 5;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        const maxValue = Math.max(...data.values);
        const minValue = Math.min(...data.values);
        const range = maxValue - minValue;

        // Draw line
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 3;
        ctx.beginPath();

        data.values.forEach((value, index) => {
            const x = padding + (index * (width - 2 * padding)) / (data.values.length - 1);
            const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw points
        ctx.fillStyle = '#3B82F6';
        data.values.forEach((value, index) => {
            const x = padding + (index * (width - 2 * padding)) / (data.values.length - 1);
            const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw labels
        ctx.fillStyle = '#94A3B8';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        data.labels.forEach((label, index) => {
            const x = padding + (index * (width - 2 * padding)) / (data.labels.length - 1);
            ctx.fillText(label, x, height - 10);
        });

        this.charts.arTrend = { canvas, ctx, data };
    }

    initDenialChart() {
        const canvas = document.getElementById('denial-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = this.data.denialReasons.current.slice(0, 5);

        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);

        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;

        ctx.clearRect(0, 0, width, height);

        const colors = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'];
        let currentAngle = -Math.PI / 2;

        data.forEach((item, index) => {
            const sliceAngle = (item.percentage / 100) * 2 * Math.PI;

            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, radius * 0.6, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();
            ctx.fill();

            currentAngle += sliceAngle;
        });

        // Draw center text
        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Denials', centerX, centerY - 5);
        ctx.font = '12px Inter';
        ctx.fillText('by Reason', centerX, centerY + 10);

        this.charts.denial = { canvas, ctx, data };
    }

    initTrendAnalysisChart() {
        const canvas = document.getElementById('trend-analysis-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = this.data.analytics.trendAnalysis.last12Months;

        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);

        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        const padding = 40;

        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (i * (height - 2 * padding)) / 5;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Draw collection rate line
        const maxRate = Math.max(...data.collectionRates);
        const minRate = Math.min(...data.collectionRates);
        const rateRange = maxRate - minRate;

        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 3;
        ctx.beginPath();

        data.collectionRates.forEach((rate, index) => {
            const x = padding + (index * (width - 2 * padding)) / (data.collectionRates.length - 1);
            const y = height - padding - ((rate - minRate) / rateRange) * (height - 2 * padding);

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw labels
        ctx.fillStyle = '#94A3B8';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        data.labels.forEach((label, index) => {
            const x = padding + (index * (width - 2 * padding)) / (data.labels.length - 1);
            ctx.fillText(label, x, height - 10);
        });
    }

    refreshData() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (!refreshBtn) return;

        const originalText = refreshBtn.innerHTML;

        refreshBtn.innerHTML = `
            <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span>Refreshing...</span>
        `;

        setTimeout(() => {
            this.updateMetrics();
            this.initializeCharts();
            refreshBtn.innerHTML = originalText;
            this.showNotification('Data refreshed successfully', 'success');
        }, 1500);
    }

    filterPatients(searchTerm) {
        this.filteredPatientAccounts = this.data.patients.filter(patient => 
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.account.includes(searchTerm) ||
            patient.procedure.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.currentPage = 1;
        this.renderPatientTable();
        this.updatePaginationButtons();
    }

    viewPatientDetail(accountNumber) {
        const patient = this.data.patients.find(p => p.account === accountNumber);
        if (!patient) return;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-[var(--bg-card)] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold">Patient Account Details</h2>
                    <button class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="text-sm text-[var(--text-secondary)]">Patient Name</label>
                            <div class="text-lg font-medium">${patient.name}</div>
                        </div>
                        <div>
                            <label class="text-sm text-[var(--text-secondary)]">Account Number</label>
                            <div class="font-mono">${patient.account}</div>
                        </div>
                        <div>
                            <label class="text-sm text-[var(--text-secondary)]">Service Date</label>
                            <div>${this.formatDate(patient.serviceDate)}</div>
                        </div>
                        <div>
                            <label class="text-sm text-[var(--text-secondary)]">Procedure</label>
                            <div>${patient.procedure}</div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label class="text-sm text-[var(--text-secondary)]">Insurance Payer</label>
                            <div>${patient.payer}</div>
                        </div>
                        <div>
                            <label class="text-sm text-[var(--text-secondary)]">Billed Amount</label>
                            <div class="text-lg font-bold">${this.formatCurrency(patient.billed)}</div>
                        </div>
                        <div>
                            <label class="text-sm text-[var(--text-secondary)]">Outstanding Balance</label>
                            <div class="text-lg font-bold text-orange-400">${this.formatCurrency(patient.outstanding)}</div>
                        </div>
                        <div>
                            <label class="text-sm text-[var(--text-secondary)]">Days in AR</label>
                            <div class="text-lg font-bold ${patient.daysAR > 60 ? 'text-red-400' : patient.daysAR > 30 ? 'text-orange-400' : 'text-green-400'}">${patient.daysAR} days</div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 pt-6 border-t border-[var(--border-subtle)]">
                    <div class="flex flex-wrap gap-3">
                        <button class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                            Send Statement
                        </button>
                        <button class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                            Contact Patient
                        </button>
                        <button class="bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] px-4 py-2 rounded-lg text-sm font-medium transition-all border border-[var(--border-subtle)]">
                            View History
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showQuickActions() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-[var(--bg-card)] rounded-xl p-6 max-w-md w-full">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold">Quick Actions</h2>
                    <button class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="space-y-3">
                    <button class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-lg text-left transition-all">
                        <div class="font-medium">Generate Monthly Report</div>
                        <div class="text-sm opacity-90">Export comprehensive analytics</div>
                    </button>
                    <button class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-lg text-left transition-all">
                        <div class="font-medium">Review Denials</div>
                        <div class="text-sm opacity-90">Analyze recent claim denials</div>
                    </button>
                    <button class="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-lg text-left transition-all">
                        <div class="font-medium">Schedule Collections</div>
                        <div class="text-sm opacity-90">Set up automated follow-ups</div>
                    </button>
                    <button class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-lg text-left transition-all">
                        <div class="font-medium">AR Aging Report</div>
                        <div class="text-sm opacity-90">Detailed aging analysis</div>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all transform translate-x-full`;

        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-orange-500',
            info: 'bg-blue-500'
        }[type];

        notification.innerHTML = `
            <div class="${bgColor} text-white p-4 rounded-lg flex items-center space-x-3">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            this.updateMetrics();
        }, 30000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.dashboard = new RCMDashboard();
        console.log('Healthcare RCM Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
});
