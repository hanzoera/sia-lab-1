import { 
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from '../models/inventoryModel.mjs';

export const fetchInventoryProducts = async (req, res) => {
    console.log("[fetchInventoryProducts : controller] start");

    try {
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ msg : 'Failed to fetch inventory due to internal server error.'});
    }
};

export const fetchInventoryProductById = async (req, res) => {
    console.log("[fetchInventoryProductById : controller] start");

    const { id } = req.params;

    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found.' });
        }

        console.log("[fetchInventoryProductById : controller] the product is found");

        res.status(200).json(product);
    } catch {
        return res.status(500).json({ msg : 'Failed to fetch product due to internal server error.' })
    }
};

export const addInventoryProduct = async (req, res) => {
    console.log("[addInventoryProduct : controller] start");
    
    const { 
        item_name,
        category,
        quantity,
        price 
    } = req.body;

    try {
        await addProduct(item_name, category, quantity, price);
        return res.status(200).json({ msg : 'Product added successfully.' })
    } catch (error) {
        return res.status(500).json({ msg : 'Failed to add product due to internal server error.' })
    } 
};

export const updateInventoryProduct = async (req, res) => {
    console.log("[updateInventoryProduct : controller] start");

    const { id } = req.params;

    const { item_name, category, quantity, price } = req.body;
    try {
        await updateProduct(id, item_name, category, quantity, price);
        return res.status(200).json({ msg : 'Product updated successfully.' });
    } catch (error) {
        return res.status(500).json({ msg : 'Failed to update product due to internal server error.' });
    }
};

export const deleteInventoryProduct = async (req, res) => {
    console.log("[deleteInventoryProduct : controller] start");

    const { id } = req.params;

    try {
        await deleteProduct(id);
        res.status(200).json({ msg : 'Product deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ msg : 'Failed to update product due to internal server error.' });
    }
};