import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface BookingFinancial {
  booking_code: string;
  customer: string;
  package_name: string;
  package_price: number;
  event_date: string;
  payment_status: string;
  total_paid: number;
  total_expenses: number;
  cash_position: number;
  expected_profit: number;
  profit_margin: number;
}

export interface ExpenseItem {
  booking_code: string;
  item_name: string;
  description: string;
  amount: number;
  date: string;
}

export interface ExportData {
  summary: {
    total_revenue: number;
    total_expenses: number;
    net_profit: number;
    expected_profit: number;
    average_profit_margin: number;
  };
  bookings: BookingFinancial[];
  expenses: ExpenseItem[];
  period: { start: string; end: string };
}

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

/**
 * Export to Excel (.xlsx) — 3 sheets: Summary, Detail Bookings, Detail Pengeluaran
 */
export function exportToExcel(data: ExportData, filename = 'financial-report.xlsx') {
  const wb = XLSX.utils.book_new();

  // SHEET 1: Summary
  const summaryRows = [
    ['PLATINUM PROJECT BALI — LAPORAN KEUANGAN'],
    ['Periode:', `${data.period.start} s/d ${data.period.end}`],
    ['Generated:', new Date().toLocaleString('id-ID')],
    [''],
    ['RINGKASAN KEUANGAN'],
    ['Total Pemasukan (Diterima)', data.summary.total_revenue],
    ['Total Pengeluaran',           data.summary.total_expenses],
    ['Net Profit (Posisi Kas)',     data.summary.net_profit],
    ['Expected Profit (Potensial)', data.summary.expected_profit],
    ['Average Profit Margin',       `${data.summary.average_profit_margin.toFixed(2)}%`],
    [''],
    ['Total Bookings', data.bookings.length],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(summaryRows);
  ws1['!cols'] = [{ width: 30 }, { width: 22 }];
  XLSX.utils.book_append_sheet(wb, ws1, 'Summary');

  // SHEET 2: Detail Bookings
  const bookingRows = data.bookings.map((b) => ({
    'Booking Code':   b.booking_code,
    Customer:         b.customer,
    Paket:            b.package_name,
    'Harga Paket':    b.package_price,
    'Event Date':     b.event_date,
    'Status Payment': b.payment_status,
    'Total Paid':     b.total_paid,
    'Total Expenses': b.total_expenses,
    'Cash Position':  b.cash_position,
    'Expected Profit':b.expected_profit,
    'Margin %':       b.profit_margin,
  }));
  const ws2 = XLSX.utils.json_to_sheet(bookingRows);
  ws2['!cols'] = [14, 24, 20, 14, 12, 14, 14, 14, 14, 14, 10].map((w) => ({ width: w }));
  XLSX.utils.book_append_sheet(wb, ws2, 'Detail Bookings');

  // SHEET 3: Detail Pengeluaran
  const expenseRows = data.expenses.map((e) => ({
    'Booking Code': e.booking_code,
    Item:           e.item_name,
    Deskripsi:      e.description,
    Jumlah:         e.amount,
    Tanggal:        e.date,
  }));
  const ws3 = XLSX.utils.json_to_sheet(expenseRows);
  ws3['!cols'] = [{ width: 14 }, { width: 32 }, { width: 40 }, { width: 14 }, { width: 12 }];
  XLSX.utils.book_append_sheet(wb, ws3, 'Detail Pengeluaran');

  XLSX.writeFile(wb, filename);
}

/**
 * Export to PDF — A4, header, summary box, bookings table
 */
export function exportToPDF(data: ExportData, filename = 'financial-report.pdf') {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PLATINUM PROJECT BALI', pageWidth / 2, y, { align: 'center' });
  y += 8;
  doc.setFontSize(13);
  doc.text('LAPORAN KEUANGAN', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Periode: ${data.period.start} s/d ${data.period.end}`, pageWidth / 2, y, { align: 'center' });
  y += 12;

  // Summary box (gold background)
  doc.setFillColor(212, 175, 55);
  doc.roundedRect(14, y, pageWidth - 28, 52, 4, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  y += 8;
  doc.text('RINGKASAN KEUANGAN', 20, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Total Pemasukan : ${formatRupiah(data.summary.total_revenue)}`, 20, y);
  y += 5;
  doc.text(`Total Pengeluaran: ${formatRupiah(data.summary.total_expenses)}`, 20, y);
  y += 5;
  doc.text(`Net Profit       : ${formatRupiah(data.summary.net_profit)}`, 20, y);
  y += 5;
  doc.text(`Expected Profit  : ${formatRupiah(data.summary.expected_profit)}`, 20, y);
  y += 5;
  doc.text(`Profit Margin    : ${data.summary.average_profit_margin.toFixed(2)}%`, 20, y);
  y += 14;

  doc.setTextColor(0, 0, 0);

  // Detail Bookings table
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DETAIL BOOKINGS', 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [['Kode', 'Customer', 'Paket', 'Harga', 'Paid', 'Expenses', 'Profit']],
    body: data.bookings.map((b) => [
      b.booking_code,
      b.customer.substring(0, 20),
      b.package_name.substring(0, 16),
      formatRupiah(b.package_price),
      formatRupiah(b.total_paid),
      formatRupiah(b.total_expenses),
      formatRupiah(b.expected_profit),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [212, 175, 55], textColor: [255, 255, 255], fontSize: 8 },
    styles: { fontSize: 7, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 30 },
      2: { cellWidth: 22 },
      3: { cellWidth: 22 },
      4: { cellWidth: 22 },
      5: { cellWidth: 22 },
      6: { cellWidth: 22 },
    },
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(160);
    doc.text(
      `Generated: ${new Date().toLocaleString('id-ID')} | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: 'center' }
    );
  }

  doc.save(filename);
}
