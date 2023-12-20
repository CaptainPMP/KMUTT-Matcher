const bcrypt = require('bcrypt');

const matchPassword = async (password, hash) => {
    const isMatch = await bcrypt.compareSync(password, hash);
    return isMatch;
};

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Generate a random string, which we will add to the password before hashing
    const hash = await bcrypt.hash(password, salt); // Hash the password, using the random string as "salt"
    return hash;
};

module.exports = {matchPassword, hashedPassword}