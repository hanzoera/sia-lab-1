// This contains all code regarding database operations
// in which controller use to read/write data
import connection from '../config/database.mjs';

// Get all products and their information from the database
export const getAllProducts = async () => {
    console.log('[getAllProducts : model] start');

    const [row] = await connection.execute('SELECT * FROM inventory_info');

    if (!row || row.length === 0) {
        console.log('[getAllProducts : model] no any product exists in the table.');

        return null;
    }

    console.log('[getAllProducts : model] product(s) exists in the table.');

    return row;
};

// Get single product information from the database
export const getProductById = async (id) => {
    console.log('[getProductById : model] start');

    const [row] = await connection.execute(
        'SELECT * FROM inventory_info WHERE id = ?',
        [id]
    );

    // Assign the values into user to extract only the first row

    // If no product found, return null to bypass the existing username check
    if (!row[0]) {
        console.log("[getProductById : model] the product is not found in the table.");

        return null;
    }

    console.log("[getProductById : model] the product is found in the table.");

    // Return the product information
    return row[0];
};

// Add new item to the database
export const addProduct = async (item_name, category, quantity, price) => {
    console.log("[addProduct : model] start");

    const [result] = await connection.execute(
        'INSERT INTO inventory_info VALUES (?, ?, ?, ?)',
        [item_name, category, quantity, price]
    );

    console.log("[addProduct : model] product is added to the table.");

    return result;
};

// Update item from the database
export const updateProduct = async (id, item_name, category, quantity, price) => {
    console.log("[updateProduct : model] start");

    const [result] = await connection.execute(
        'UPDATE inventory_info SET item_name=?, category=?, quantity=?, price=? WHERE id=?',
        [item_name, category, quantity, price, id]
    );

    console.log("[updateProduct : model] product is update in the table.");

    return result;
};

// Delete item from the database
export const deleteProduct = async (id) => {
    console.log("[deleteProduct : model] start");
    
    const [result] = await connection.execute(
        'DELETE FROM inventory_info WHERE id=?',
        [id]
    );

    console.log("[updateProduct : model] product is deleted off the table.");

    return result;
};