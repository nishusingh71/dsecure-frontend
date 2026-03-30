import jsPDF from 'jspdf';
import logoDSecure from '@/assets/reports/logo_dsecure.png';
import logoDSecureErase from '@/assets/reports/logo_dsecure_erase.png';
import watermark from '@/assets/reports/watermark.png';

/**
 * Generates a professional PDF sanitization report for FreezeState Advanced
 * matching the D-Secure corporate standard.
 */
export const generateFreezeStateReport = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 25;

  // --- Helper Functions ---
  const drawLine = (y: number) => {
    doc.setDrawColor(241, 245, 249); // Slate-100
    doc.line(margin, y, pageWidth - margin, y);
  };

  const addSectionHeader = (title: string, y: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85); // Slate-700
    doc.text(title, margin, y);
    return y + 8;
  };

  const addDataPair = (label: string, value: string, x: number, y: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // Slate-400
    doc.text(label, x, y);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.text(value, x + 35, y);
  };

  // --- Watermark ---
  // Adding watermark first so it stays in the background
  doc.addImage(watermark, 'PNG', (pageWidth - 140) / 2, 80, 140, 140, undefined, 'FAST');

  // --- Branding ---
  // Logo Left
  doc.addImage(logoDSecure, 'PNG', margin, 10, 45, 12);
  
  // Header Center
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('D-SecureTech', pageWidth / 2, 18, { align: 'center' });
  
  // Header Right (Cloud indicator)
  doc.addImage(logoDSecureErase, 'PNG', pageWidth - margin - 45, 10, 45, 12);
  
  currentY = 40;

  // --- Section: Process Status ---
  currentY = addSectionHeader('Process Status', currentY);
  addDataPair('Process Status:', 'Completed', margin, currentY);
  addDataPair('Process Mode:', 'Advanced Sanitization', pageWidth / 2, currentY);
  currentY += 12;
  drawLine(currentY - 6);

  // --- Section: Report Info ---
  currentY = addSectionHeader('Report Info', currentY);
  addDataPair('Report ID:', 'ADV-' + Math.floor(Math.random() * 900000 + 100000), margin, currentY);
  addDataPair('Report Date:', new Date().toLocaleString(), pageWidth / 2, currentY);
  currentY += 8;
  addDataPair('Software:', 'FreezeState Advanced v2.4', margin, currentY);
  
  // Digital Identifier (Long Hash)
  const hash = 'f709e02abf630351c87a55aaf930078a6d8fc942013d122db2541d747423a632';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Digital Identifier:', pageWidth / 2, currentY);
  doc.setTextColor(30, 41, 59);
  doc.text(hash.substring(0, 32), pageWidth / 2 + 35, currentY);
  doc.text(hash.substring(32), pageWidth / 2 + 35, currentY + 4);
  
  currentY += 15;
  drawLine(currentY - 6);

  // --- Section: System Info ---
  currentY = addSectionHeader('System Info', currentY);
  addDataPair('OS:', 'Windows 10 Pro (22H2)', margin, currentY);
  addDataPair('Computer:', 'LAB-NODE-PC04', pageWidth / 2, currentY);
  currentY += 8;
  addDataPair('MAC:', '00-0C-29-5B-37-19', margin, currentY);
  addDataPair('Manufacturer:', 'Dell Inc. (OptiPlex)', pageWidth / 2, currentY);
  currentY += 12;
  drawLine(currentY - 6);

  // --- Section: Process Summary ---
  currentY = addSectionHeader('Process Summary', currentY);
  addDataPair('Start:', new Date(Date.now() - 45000).toLocaleString(), margin, currentY);
  addDataPair('End:', new Date().toLocaleString(), pageWidth / 2, currentY);
  currentY += 8;
  addDataPair('Method:', 'NIST SP 800-88 Rev1 (Purge)', margin, currentY);
  addDataPair('Verification:', 'Total Verification Pass', pageWidth / 2, currentY);
  currentY += 12;
  drawLine(currentY - 6);

  // --- Section: Erasure Details ---
  currentY = addSectionHeader('Erasure Details', currentY);
  addDataPair('Erase Type:', 'Redirected Sector Wipe', margin, currentY);
  addDataPair('Total Erasures:', '1 (Session Delta)', pageWidth / 2, currentY);
  currentY += 8;
  addDataPair('Successful:', '1', margin, currentY);
  addDataPair('Failed Erasures:', '0', pageWidth / 2, currentY);
  currentY += 12;
  drawLine(currentY - 6);

  // --- Section: Personnel ---
  currentY = addSectionHeader('Personnel', currentY);
  addDataPair('Erased By:', 'FreezeState Autonomous Agent', margin, currentY);
  addDataPair('Validated By:', 'D-Secure Hub Validator', pageWidth / 2, currentY);
  
  // --- Signatures ---
  currentY += 40;
  
  // Left Signature
  doc.setFont('times', 'italic');
  doc.setFontSize(16);
  doc.setTextColor(79, 70, 229); // Indigo-600
  doc.text('Sample Signature', margin + 10, currentY);
  
  // Right Signature
  doc.text('Sample Signature', pageWidth - margin - 50, currentY);
  
  currentY += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('Technician', margin + 20, currentY);
  doc.text('Validator', pageWidth - margin - 40, currentY);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text('Compliance Verified by D-Secure Global Compliance Engine - Tamper-proof audit report with certificate', pageWidth / 2, 285, { align: 'center' });

  // Download
  doc.save(`FS_Advanced_Sanitization_Report_${Date.now()}.pdf`);
};
