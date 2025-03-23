import * as XLSX from 'xlsx';
import path from 'path';

const inputFiles = [
  'Lead 1.xlsx',
  'lead.xlsx',
  'lead 3.xlsx',
  'lead 4.xlsx',
  'lead 5.xlsx'
];

async function combineExcelFiles() {
  try {
    const allData: any[] = [];
    const dataDir = path.join(process.cwd(), '..', 'data');

    for (const file of inputFiles) {
      const filePath = path.join(dataDir, file);
      console.log(`Processing file: ${file}`);
      
      try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        console.log(`Found ${data.length} rows in ${file}`);
        allData.push(...data);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }

    // Create a new workbook
    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(allData);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Combined Data');
    
    // Write the combined data to a new Excel file
    const outputPath = path.join(dataDir, 'all_leads.xlsx');
    XLSX.writeFile(newWorkbook, outputPath);
    
    console.log(`Successfully combined ${allData.length} rows into ${outputPath}`);
  } catch (error) {
    console.error('Error combining Excel files:', error);
    process.exit(1);
  }
}

combineExcelFiles(); 