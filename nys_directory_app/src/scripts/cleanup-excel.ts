import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const filesToDelete = [
  'Lead 1.xlsx',
  'lead.xlsx',
  'lead 3.xlsx',
  'lead 4.xlsx',
  'lead 5.xlsx'
];

async function cleanupExcelFiles() {
  try {
    const dataDir = path.join(process.cwd(), '..', 'data');
    const combinedFilePath = path.join(dataDir, 'all_leads.xlsx');

    // First verify that the combined file exists and has data
    if (!fs.existsSync(combinedFilePath)) {
      console.error('Combined file all_leads.xlsx not found! Aborting cleanup.');
      process.exit(1);
    }

    // Read the combined file to verify it has data
    const workbook = XLSX.readFile(combinedFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
      console.error('Combined file appears to be empty! Aborting cleanup.');
      process.exit(1);
    }

    console.log(`Verified combined file contains ${data.length} rows`);

    // Delete individual files
    for (const file of filesToDelete) {
      const filePath = path.join(dataDir, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${file}`);
      } else {
        console.log(`File not found: ${file}`);
      }
    }

    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupExcelFiles(); 