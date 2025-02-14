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

        const product = await Product.findByIdAndUpdate(pid)
        if(!newProductImage){
            return res.status(400).json({
                success: false,
                message: 'No se proporciono ningun archivo'
            })
        }

        if(product.image){
            const oldProductImage = join(__dirname, await fs.unlink(oldProductImage))
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