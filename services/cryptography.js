import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        throw new Error("Encrypting of password failed");
    }
}

export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}