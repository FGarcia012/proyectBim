import Category from "./category.model.js"; 
import Product from "../product/product.model.js";

export const addCategory = async (req, res) => {
    try {
        const data = req.body;

        const category = await Category.create(data); 

        return res.status(201).json({
            message: 'Categoria creada',
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al agregar la categoria',
            error: err.message
        });
    }
};

export const getCategorys = async (req, res) => {
    try {
        const category = await Category.find();

        return res.status(200).json({
            success: true,
            category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching categorys',
            error: err.message
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { cid } = req.params
        const data = req.body

        const category = await Category.findByIdAndUpdate(cid, data, { new: true })

        return res.status(200).json({
            message: 'Categoria actualizada',
            category
        })
    }catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la categoria',
            error: err.message
        })
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { cid } = req.params;

        const generalCategory = await Category.findOne({ name: "Articulos" });
        if (!generalCategory) {
            return res.status(500).json({
                success: false,
                message: 'La categoría "Articulos" no existe'
            });
        }

        await Product.updateMany({ category: cid }, { category: generalCategory._id });

        await Category.findByIdAndDelete(cid);

        return res.status(200).json({
            message: 'Categoria eliminada y productos actualizados a "Articulos"'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoria',
            error: err.message
        })
    }
}