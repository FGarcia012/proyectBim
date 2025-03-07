import Order from "./order.model.js";

export const getOrderHistory = async (req, res) => {
    try {
        const { uid } = req.params;
        const orders = await Order.find({ user: uid }).populate('products.product', 'name price');

        return res.status(200).json({
            success: true,
            message: 'Order history fetched successfully',
            orders
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching order history',
            error: err.message
        });
    }
};