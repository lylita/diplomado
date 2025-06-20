import bcrypt from 'bcrypt';
import config from '../config/env.js';
import logger from '../logs/logger.js';
export const encriptar = async (texto) => {
    try{
        const salt = await bcrypt.genSalt(config.BCRYPT_SALT_ROUNDS);
        const hash = await bcrypt.hash(texto, salt);
        return hash;
    } catch (error) {
        logger.error('Error al encriptar:', error);
        throw new Error('Error al encryptar');
    }
}
export const comparar = async (texto, hash) => {
    try {
        const esIgual = await bcrypt.compare(texto, hash);
        return esIgual;
    } catch (error) {
        logger.error('Error al comparar:', error);
        throw new Error('Error al comparar');
    }
}