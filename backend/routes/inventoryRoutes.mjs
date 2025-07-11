import express from 'express';
// Controller imports
import {
    fetchInventoryProducts,
    fetchInventoryProductById,
    addInventoryProduct,
    updateInventoryProduct,
    deleteInventoryProduct
} from '../controllers/inventoryController.mjs';

const router = express.Router();

// CRUD DONE :D
router.get('/', fetchInventoryProducts);
router.get('/:id', fetchInventoryProductById);
router.post('/', addInventoryProduct);
router.put('/:id', updateInventoryProduct);
router.delete('/:id', deleteInventoryProduct);

export default router;