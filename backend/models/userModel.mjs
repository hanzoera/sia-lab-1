// This contains all code regarding database operations
// in which controller use to read/write data 
import connection from '../config/database.mjs'

export const findUserbyUsername = async (username) => {
    // Destructure the array 
    const [row] = await connection.execute('SELECT * FROM user_info WHERE username = ?', [username]);
    // Assign the values into user to extract only the first row 
    const user = row[0];

    // If no user matched, return null to bypass the existing username check
    if (!user) {
        return null;
    }

    // Return the username string
    console.log(user.username);
    return row[0];
}

export const createUser = async (username, email, password) => {
    const result = await connection.execute(
        'INSERT INTO user_info (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );

    return result;
};