import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export const generateToken = (user: User): string => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const refreshToken = async (token: string): Promise<string> => {
    const decoded = verifyToken(token);

    // Se o token não for válido ou estiver expirado
    if (!decoded) {
        try {
            const payload = jwt.decode(token) as any;
            
            // Se o payload contiver o ID do usuário
            if (payload && payload.id) {
                const user = await User.findByPk(payload.id);

                if (user && user.isActive) {
                    return generateToken(user);
                }
            }

            throw new Error('Invalid or expired token');
        } catch (error) {
            throw new Error('Could not refresh token');
        }
    }

    return token;
};

export const authenticateUser = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.isActive) {
        throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password.');
    }

    const accessToken = generateToken(user);
    
    return { accessToken };
};
