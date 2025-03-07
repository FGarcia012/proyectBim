import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateInvoice = (order, path) => {
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(fs.createWriteStream(path));

    doc.fontSize(20).text('Invoice', { align: 'center' });

    doc.fontSize(12).text(`Order ID: ${order._id}`, { align: 'left' });
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, { align: 'left' });
    doc.text(`User: ${order.user.name}`, { align: 'left' });
    doc.text(`Email: ${order.user.email}`, { align: 'left' });

    doc.moveDown();
    doc.text('Products:', { align: 'left' });

    order.products.forEach(product => {
        doc.text(`- ${product.product.name} (x${product.quantity}): $${product.product.price * product.quantity}`, { align: 'left' });
    });

    doc.moveDown();
    doc.text(`Total: $${order.total}`, { align: 'left' });

    doc.end();
};