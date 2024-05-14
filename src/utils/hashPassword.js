import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

 const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing failed');
    }
};

export default hashPassword
