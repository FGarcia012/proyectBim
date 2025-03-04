import Product from "./product.model.js";
import fs from "fs/promises"
import {join, dirname} from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const createProduct = async (req, res) => {
    try {
        const data = req.body;
        let image = req.file ? req.file.filename : null;
        data.image = image;

        const product = await Product.create(data);

        return res.status(201).json({
            message: 'Product has been created',
            product
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Product creation failed',
            error: err.message
        });
    }
};

export const updateProductImage = async (req, res) => {
    try {
        const { pid } = req.params;
        let newProductImage = req.file ? req.file.filename : null;

        const product = await Product.findById(pid)
        if(!newProductImage){
            return res.status(400).json({
                success: false,
                message: 'No se proporciono ningun archivo'
            })
        }

        if(product.image){
            const oldProductImage = join(__dirname, "../../public/uploads/product-images", product.image)
            await fs.unlink(oldProductImage)
        }
        product.image = newProductImage;
        await product.save();

        return res.status(200).json({
            success: true,
            message: 'Product image has been updated',
            product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el producto',
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const data = req.body

        const product = await Product.findByIdAndUpdate(pid, data, { new: true })

        return res.status(200).json({
            success: true,
            message: 'Product updated',
            product
        })
    } catch (err) {
        return res.status (500).json ({
            success: false,
            message: 'Error updating product',
            error: err.message
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Product.findById(pid);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: err.message
        });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: err.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await Product.findByIdAndDelete(pid, { status: false }, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted',
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: err.message
        });
    }
}

export const getOutOfStockProducts = async (req, res) => {
    try {
        const products = await Product.find({ inventory: 0 });

        return res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching out of stock products',
            error: err.message
        });
    }
}

export const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ sales: -1 }).limit(10);

        return res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching top selling products',
            error: err.message
        });
    }
}