import fs from "fs";
import PDFDocument from "pdfkit";

function createInvoice(invoice, path) {
  try {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    // Pipe to the file path first
    const stream = fs.createWriteStream(path);
    doc.pipe(stream);

    // Generate the content of the PDF
    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    // Finalize the PDF and end the stream
    doc.end();

    // Handle the stream finish event
    stream.on('finish', () => {
      console.log(`PDF created successfully at ${path}`);
    });

    // Handle the stream error event
    stream.on('error', (err) => {
      console.error(`Failed to create PDF: ${err.message}`);
    });

  } catch (err) {
    console.error(`Error generating PDF: ${err.message}`);
  }
}

function generateHeader(doc) {
  try {
    doc
      .image("download.jpeg", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("Ameena Shop", 110, 57)
      .fontSize(10)
      .text("Ameena Shop", 200, 50, { align: "right" })
      .text("jenin", 200, 65, { align: "right" })
      .text("rabaya street", 200, 80, { align: "right" })
      .moveDown();
  } catch (err) {
    console.error(`Error generating header: ${err.message}`);
  }
}

function generateCustomerInformation(doc, invoice) {
  try {
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
      .fontSize(10)
      .text("Invoice Number:", 50, customerInformationTop)
      .font("Helvetica-Bold")
      .text(invoice.invoice_nr, 150, customerInformationTop)
      .font("Helvetica")
      .text("Invoice Date:", 50, customerInformationTop + 15)
      .text(formatDate(new Date()), 150, customerInformationTop + 15)
      .text("Balance Due:", 50, customerInformationTop + 30)
      .text(
        formatCurrency(invoice.subtotal*100),
        150,
        customerInformationTop + 30
      )
      .font("Helvetica-Bold")
      .text(invoice.shipping.name, 300, customerInformationTop)
      .font("Helvetica")
      .text(invoice.shipping.address, 300, customerInformationTop + 15)
      .text(invoice.shipping.phone, 300, customerInformationTop + 30)
      .moveDown();

    generateHr(doc, 252);
  } catch (err) {
    console.error(`Error generating customer information: ${err.message}`);
  }
}

function generateInvoiceTable(doc, invoice) {
  try {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      invoiceTableTop,
      "id",
      "name",
      "quantity",
      "unitPrice",
      "finalPrice",
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) *30;
      generateTableRow(
        doc,
        position,
        i+1,
        item.productName,
        item.quantity,
        formatCurrency(item.unitPrice *100),
        // item.discount+"%",
        formatCurrency(item.finalPrice*100)
      );

      generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "Subtotal",
      "",
      formatCurrency(invoice.subtotal*100)
    );

    doc.font("Helvetica");
  } catch (err) {
    console.error(`Error generating invoice table: ${err.message}`);
  }
}

function generateFooter(doc) {
  try {
    doc
      .fontSize(10)
      .text(
        "Payment is due within 15 days. Thank you for your business.",
        50,
        780,
        { align: "center", width: 500 }
      );
  } catch (err) {
    console.error(`Error generating footer: ${err.message}`);
  }
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

export default createInvoice;
