import Cart from "./cart.model.js";
import Product from "../product/product.model.js";
import Order from "../order/order.model.js";
import { generateInvoice } from "../utils/invoiceGenerator.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const addToCart = async (req, res) => {
    try {
        const data = req.body;
        const { product, quantity } = data;
        const uid = req.usuario._id;

        const cart = await Cart.findOne({ user: uid });

        if (!cart) {
            cart = new Cart({ user: uid, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === product);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            const productExists = await Product.findById(product);
            if (!productExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            cart.products.push({ product, quantity });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product added to cart',
            cart
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error adding product to cart',
            error: err.message
        });
    }
};

export const purchasingProcess = async (req, res) => {
    try {
        const uid = req.usuario._id;
        const cart = await Cart.findOne({ user: uid }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        const total = cart.products.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

        const order = new Order({
            user: uid,
            products: cart.products,
            total,
            status: 'completed'
        });

        await order.save();

        for (const item of cart.products) {
            const product = await Product.findById(item.product._id);
            product.inventory -= item.quantity;
            product.sales += item.quantity;
            await product.save();
        }

        cart.products = [];
        await cart.save();

        const invoicePath = join(__dirname, "../../public/uploads/invoices-pdf", `invoice-${order._id}.pdf`);
        generateInvoice(order, invoicePath);

        return res.status(200).json({
            success: true,
            message: 'Checkout completed',
            order,
            invoicePath 
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error during checkout',
            error: err.message
        });
    }
};