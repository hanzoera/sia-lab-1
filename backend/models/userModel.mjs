// This contains all code regarding database operations
// in which controller use to read/write data 
import connection from '../config/database.mjs';

// Get row data from a username
export const findUserbyUsername = async (username) => {
    console.log('[findUserbyUsername : model] start');

    // Destructure the array
    const [row] = await connection.execute(
        'SELECT * FROM user_info WHERE username = ?',
        [username]
    );

    // Assign the values into user to extract only the first row

    // If no user matched, return null to bypass the existing username check
    if (!row[0]) {
        console.log('[findUserbyUsername : model] the user does not exist in the table.');
        return null;
    }

    console.log('[findUserbyUsername : model] the user exist in the table.');

    // Return the user information
    return row[0];
}

// Push new user into the database
export const createUser = async (username, email, password) => {
    console.log("[createUser : model] start");

    const result = await connection.execute(
        'INSERT INTO user_info (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );

    console.log('[createUser : model] passed account creation insert query to the table.');

    return result;
};