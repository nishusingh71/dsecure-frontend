const fs = require('fs');
const path = require('path');

// More professional PDF generation with better formatting
function createProfessionalPDF(data, outputPath) {
    const { title, subtitle, sections } = data;
    
    // PDF content streams
    let contentStream = `BT
/F1 20 Tf
50 720 Td
(${title}) Tj
0 -30 Td
/F1 14 Tf
(${subtitle}) Tj
0 -50 Td
`;

    let yPosition = 640;
    
    sections.forEach(section => {
        // Section heading
        contentStream += `/F2 16 Tf
50 ${yPosition} Td
(${section.heading}) Tj
0 -25 Td
/F1 12 Tf
`;
        yPosition -= 25;
        
        // Section content
        section.content.forEach(item => {
            contentStream += `(${item}) Tj
0 -18 Td
`;
            yPosition -= 18;
            
            if (yPosition < 100) {
                yPosition = 720; // Start new page (simplified)
            }
        });
        
        contentStream += `0 -10 Td
`;
        yPosition -= 10;
    });
    
    contentStream += `ET`;
    
    const pdfContent = `%PDF-1.4
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
/F2 5 0 R
>>
>>
/Contents 6 0 R
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
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj

6 0 obj
<<
/Length ${contentStream.length}
>>
stream
${contentStream}
endstream
endobj

xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000333 00000 n 
0000000412 00000 n 
0000000496 00000 n 
trailer
<<
/Size 7
/Root 1 0 R
>>
startxref
${650 + contentStream.length}
%%EOF`;

    fs.writeFileSync(outputPath, pdfContent);
    // console.log(`Professional PDF created: ${outputPath}`);
}

// Drive Eraser catalog data
const driveEraserData = {
    title: "D-SECURE DRIVE ERASER",
    subtitle: "Professional Drive Wiping & Data Sanitization Software",
    sections: [
        {
            heading: "PRODUCT OVERVIEW",
            content: [
                "D-Secure Drive Eraser is a comprehensive data sanitization solution",
                "designed to permanently erase data from hard drives, SSDs, servers,",
                "and other storage devices with military-grade security standards."
            ]
        },
        {
            heading: "KEY FEATURES",
            content: [
                "• 26 International Erasure Standards (DoD 5220.22-M, NIST SP 800-88)",
                "• Multi-Platform Support - Windows 7/8/10/11, Linux, macOS 10.12+",
                "• Deployment Options - USB Boot, PXE Network, Standalone EXE",
                "• Cloud Console Integration - Centralized management and reporting",
                "• Digitally Signed Certificates - Tamper-proof documentation",
                "• Compliance Ready - GDPR, HIPAA, SOX compliant"
            ]
        },
        {
            heading: "TECHNICAL SPECIFICATIONS",
            content: [
                "Storage Types: HDD, SSD, NVMe, SATA, IDE, SCSI, USB drives",
                "File Systems: NTFS, FAT32, exFAT, HFS+, ext3/ext4, XFS",
                "Languages: English, Spanish, French, German, Italian, Portuguese",
                "Licensing: Pay-per-use model, lifetime validity, no subscriptions"
            ]
        },
        {
            heading: "PRIMARY USE CASES",
            content: [
                "• IT Asset Disposition - Secure disposal of corporate hardware",
                "• Data Center Decommissioning - Bulk server and storage erasure",
                "• Compliance Audits - Meet regulatory data destruction requirements",
                "• Resale Preparation - Maximum resale value with verified erasure",
                "• Privacy Protection - Personal data security for individuals"
            ]
        },
        {
            heading: "PRICING & CONTACT",
            content: [
                "Starting at $20 per device license",
                "Pay-per-use model with lifetime validity",
                "Volume discounts available for bulk purchases",
                "",
                "Contact Information:",
                "Website: dsecuretech.com",
                "Sales: sales@dsecuretech.com",
                "Support: support@dsecuretech.com"
            ]
        }
    ]
};

// File Eraser catalog data
const fileEraserData = {
    title: "D-SECURE FILE ERASER",
    subtitle: "Advanced File & Folder Erasure Software",
    sections: [
        {
            heading: "PRODUCT OVERVIEW",
            content: [
                "D-Secure File Eraser provides comprehensive file and folder erasure",
                "capabilities for Windows, Mac, and Linux systems. Perfect for selective",
                "data sanitization, cloud storage cleanup, and privacy protection."
            ]
        },
        {
            heading: "KEY FEATURES",
            content: [
                "• 26 International Erasure Standards with military-grade security",
                "• Cross-Platform Support - Windows, macOS, Linux compatibility",
                "• Cloud Integration - Google Drive, OneDrive, Dropbox erasure",
                "• Network Edition - Domain-wide file erasure capabilities",
                "• Comprehensive Reporting - Detailed audit trails and certificates",
                "• Scheduled Erasure - Automated cleanup policies"
            ]
        },
        {
            heading: "PLATFORM-SPECIFIC FEATURES",
            content: [
                "Windows Edition:",
                "  - Registry cleaning and sanitization",
                "  - System file erasure (pagefile, hibernation)",
                "  - Windows Event Log cleaning",
                "",
                "macOS Edition:",
                "  - FileVault encrypted drive support",
                "  - Keychain secure deletion",
                "  - Time Machine backup cleaning",
                "",
                "Linux Edition:",
                "  - Multiple filesystem support",
                "  - Command-line interface",
                "  - Bash script integration"
            ]
        },
        {
            heading: "PRIMARY USE CASES",
            content: [
                "• Individual Privacy - Personal file and browsing data protection",
                "• Corporate Security - Sensitive document disposal",
                "• Cloud Cleanup - Permanent removal from cloud storage",
                "• Compliance - Meet data retention and disposal policies",
                "• System Optimization - Free space cleaning and performance boost"
            ]
        },
        {
            heading: "PRICING & CONTACT",
            content: [
                "Starting at $40 per license",
                "Individual and Enterprise licenses available",
                "24/7 premium support for Enterprise customers",
                "",
                "Contact Information:",
                "Website: dsecuretech.com",
                "Sales: sales@dsecuretech.com",
                "Technical: tech@dsecuretech.com",
                "Support: support@dsecuretech.com"
            ]
        }
    ]
};

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../public/downloads');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate professional PDFs
try {
    createProfessionalPDF(driveEraserData, 
        path.join(outputDir, 'dsecure-drive-eraser-catalog.pdf'));
    
    createProfessionalPDF(fileEraserData, 
        path.join(outputDir, 'dsecure-file-eraser-catalog.pdf'));
    
    // console.log('Professional PDF catalogs generated successfully!');
} catch (error) {
    console.error('Error generating PDFs:', error);
}