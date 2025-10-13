const fs = require('fs');
const path = require('path');

// Simple PDF generation function
function createSimplePDF(title, content, outputPath) {
    // Basic PDF structure with text content
    const pdfHeader = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

5 0 obj
<<
/Length ${content.length + 200}
>>
stream
BT
/F1 16 Tf
72 720 Td
(${title}) Tj
0 -40 Td
/F1 12 Tf
${content}
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${600 + content.length}
%%EOF`;

    fs.writeFileSync(outputPath, pdfHeader);
    console.log(`PDF created: ${outputPath}`);
}

// Drive Eraser content
const driveEraserContent = `(D-SECURE DRIVE ERASER) Tj
0 -20 Td
(Professional Drive Wiping Software) Tj
0 -30 Td
(KEY FEATURES:) Tj
0 -20 Td
(• 26 International Erasure Standards) Tj
0 -15 Td
(• Multi-Platform Support - Windows, Linux, macOS) Tj
0 -15 Td
(• USB & PXE Boot Deployment) Tj
0 -15 Td
(• Cloud Console Integration) Tj
0 -15 Td
(• Digitally Signed Certificates) Tj
0 -30 Td
(TECHNICAL SPECIFICATIONS:) Tj
0 -20 Td
(• Storage Types: HDD, SSD, NVMe, SATA, IDE, SCSI, USB) Tj
0 -15 Td
(• Operating Systems: Windows 7/8/10/11, Linux, macOS 10.12+) Tj
0 -15 Td
(• Deployment: Standalone EXE, USB bootable, PXE network boot) Tj
0 -15 Td
(• Reporting: PDF certificates with digital signatures) Tj
0 -30 Td
(USE CASES:) Tj
0 -20 Td
(• IT Asset Disposition - Secure disposal of corporate hardware) Tj
0 -15 Td
(• Data Center Decommissioning - Bulk server and storage erasure) Tj
0 -15 Td
(• Compliance Audits - Meet regulatory data destruction requirements) Tj
0 -15 Td
(• Resale Preparation - Maximum resale value with verified erasure) Tj
0 -30 Td
(PRICING: Starting at $20 per license) Tj
0 -20 Td
(Contact: sales@dsecuretech.com | dsecuretech.com) Tj`;

// File Eraser content
const fileEraserContent = `(D-SECURE FILE ERASER) Tj
0 -20 Td
(Advanced File & Folder Erasure Software) Tj
0 -30 Td
(KEY FEATURES:) Tj
0 -20 Td
(• 26 International Erasure Standards) Tj
0 -15 Td
(• Cross-Platform Support - Windows, macOS, Linux) Tj
0 -15 Td
(• Cloud Integration - Google Drive, OneDrive, Dropbox) Tj
0 -15 Td
(• Network Edition for Domain-wide Erasure) Tj
0 -15 Td
(• Comprehensive Reporting & Certificates) Tj
0 -30 Td
(PLATFORM-SPECIFIC FEATURES:) Tj
0 -20 Td
(Windows: Registry cleaning, System file erasure, Event Log cleaning) Tj
0 -15 Td
(macOS: FileVault support, Keychain deletion, Time Machine cleaning) Tj
0 -15 Td
(Linux: Multiple filesystem support, CLI interface, Bash integration) Tj
0 -30 Td
(USE CASES:) Tj
0 -20 Td
(• Individual Privacy - Personal file and browsing data protection) Tj
0 -15 Td
(• Corporate Security - Sensitive document disposal) Tj
0 -15 Td
(• Cloud Cleanup - Permanent removal from cloud storage) Tj
0 -15 Td
(• Compliance - Meet data retention and disposal policies) Tj
0 -30 Td
(PRICING: Starting at $40 per license) Tj
0 -20 Td
(Contact: sales@dsecuretech.com | dsecuretech.com) Tj`;

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../public/downloads');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate PDFs
try {
    createSimplePDF('D-Secure Drive Eraser Catalog', driveEraserContent, 
        path.join(outputDir, 'dsecure-drive-eraser-catalog.pdf'));
    
    createSimplePDF('D-Secure File Eraser Catalog', fileEraserContent, 
        path.join(outputDir, 'dsecure-file-eraser-catalog.pdf'));
    
    console.log('PDF catalogs generated successfully!');
} catch (error) {
    console.error('Error generating PDFs:', error);
}