
const URL_BASE = "https://www.themealdb.com/api/json/v1/1/";

export const endpoints = {
    getPlateName: function(nombre) {
        return `${URL_BASE}search.php?s=${nombre}`;
    },
    getPlateIngredient: function(ingrediente) {
        return `${URL_BASE}filter.php?i=${ingrediente}`;
    },
    getPlateCategory: function(category) {
        return `${URL_BASE}filter.php?c=${category}`;
    },
    getPlateArea: function(nacionalidad) {
        return `${URL_BASE}filter.php?a=${nacionalidad}`;
    },
}


