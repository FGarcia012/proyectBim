import User from "../user/user.model.js"
import Product from "../product/product.model.js"
import Category from "../category/category.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const productExists = async (pid = " ") => {
    const existe = await Product.findById(pid)
    if(!existe){
        throw new Error("No existe el producto con el ID proporcionado")
    }
}

export const categoryExists = async (cid = " ") => {
    const existe = await Category.findById(cid)
    if(!existe){
        throw new Error("No existe la categoría con el ID proporcionado")
    }
}

export const isUserRole = async (uid) => {
    const user = await User.findById(uid);
    if (user.role !== 'USER') {
        throw new Error("Administrators can only modify users with the role 'USER'");
    }
};

export const isAdminRole = async (uid) => {
    const user = await User.findById(uid);
    if (user.role !== 'ADMIN') {
        throw new Error("El usuario no tiene el rol de administrador");
    }
};

export const isSameUserOrAdmin = async (uid, req) => {
    const user = await User.findById(uid);
    if (user.role === 'ADMIN' && req.usuario.role === 'ADMIN' && req.usuario.id !== uid) {
        throw new Error("Los administradores no pueden modificar o eliminar a otros administradores");
    }
};