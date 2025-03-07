import Invoice from "./invoice.model.js";
import Product from "../product/product.model.js";
import { generateInvoice } from "../utils/invoiceGenerator.js";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createInvoice = async (req, res) => {
    try {
        const { user, products } = req.body;

        let total = 0;
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            if (product.inventory < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product ${product.name}`
                });
            }
            total += product.price * item.quantity;
            product.inventory -= item.quantity;
            await product.save();
        }

        const invoice = new Invoice({ user, products, total });
        await invoice.save();

        const invoicePath = join(__dirname, "../../public/uploads/invoices-pdf", `invoice-${invoice._id}.pdf`);
        generateInvoice(invoice, invoicePath);

        return res.status(201).json({
            success: true,
            message: 'Invoice created',
            invoice,
            invoicePath
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error creating invoice',
            error: err.message
        });
    }
};

export const getInvoicesByUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const invoices = await Invoice.find({ user: uid }).populate('products.product', 'name price');

        return res.status(200).json({
            success: true,
            invoices
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching invoices',
            error: err.message
        });
    }
};

export const updateInvoice = async (req, res) => {
    try {
        const { iid } = req.params;
        const { products } = req.body;

        const invoice = await Invoice.findById(iid);
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }

        let total = 0;
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            if (product.inventory < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product ${product.name}`
                });
            }
            total += product.price * item.quantity;
            product.inventory -= item.quantity;
            await product.save();
        }

        invoice.products = products;
        invoice.total = total;
        await invoice.save();

        const invoicePath = join(__dirname, "../../public/uploads/invoices-pdf", `invoice-${invoice._id}.pdf`);
        generateInvoice(invoice, invoicePath);

        return res.status(200).json({
            success: true,
            message: 'Invoice updated',
            invoice,
            invoicePath
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error updating invoice',
            error: err.message
        });
    }
};