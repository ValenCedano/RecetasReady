
import { endpoints } from './data.js';

export const getPlate = async (nombre) => {
    try {
        const response = await axios.get(endpoints.getPlateName(nombre));
        const data = response.data;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export const getPlateIngredient = async (ingrediente) => {
    try {
        const response = await axios.get(endpoints.getPlateIngredient(ingrediente));
        const data = response.data;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}
export const getPlateCategory = async (categoria) => {
    try {
        const response = await axios.get(endpoints.getPlateCategory(categoria));
        const data = response.data;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export const getPlateArea = async (area) => {
    try {
        const response = await axios.get(endpoints.getPlateArea(area));
        const data = response.data;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

