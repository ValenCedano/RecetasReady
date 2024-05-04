import { getPlate, getPlateCategory, getPlateIngredient, getPlateArea } from "./services.js";
const botonBusqueda = document.getElementById("search")
const valorIngresado = document.getElementById("fname")
const filtro = document.getElementById("opciones")
const sectionNombre = document.getElementsByClassName("busquedaNombre");
const galerias = document.getElementsByClassName("galeriaSegunFiltro");

let inputValue;
let selectValue;

const sectionBusquedaNombre = (contenedor, listaComidaEncontrada) => {
    let ingredientes = [];
    for (let clave in listaComidaEncontrada) {
        if (clave.startsWith("strIngredient") && listaComidaEncontrada[clave] !== "") {
            ingredientes.push(listaComidaEncontrada[clave]);
            
        }

    };



    contenedor.innerHTML = "";
    contenedor.innerHTML += `
    <h2>${listaComidaEncontrada.strMeal}</h2>
    <img src="${listaComidaEncontrada.strMealThumb}" width="100"
    height="100"/>
    <h3>Ingredientes</h3>
    `

    const ulIngre = document.createElement('ul');
    const divIngre = document.createElement('div');
    ingredientes.forEach((elemento) => {

        let li = document.createElement('li');
        li.textContent = elemento;
        ulIngre.appendChild(li);

        divIngre.appendChild(ulIngre);



        contenedor.appendChild(divIngre);

    });

    const instruction = document.createElement('div');
    const title = document.createElement('h3');
    instruction.setAttribute("class", "Receta");
    divIngre.setAttribute("class", "Ingredientes");
    title.innerText = "Receta";
    instruction.appendChild(title);

    const instructionsContent = document.createElement('p');
    instructionsContent.textContent = listaComidaEncontrada.strInstructions;
    instruction.appendChild(instructionsContent); 


    contenedor.appendChild(instruction);

};

const sectionGaleria = (contenedor, tipo) => {
    let count = 0;
    let type = [];

    const galeriaContainer = document.createElement('div');
    galeriaContainer.setAttribute("class", "galeriaContainer");

    tipo.forEach((elemento) => {
        if (count <= 18) {
           
            const divElement = document.createElement('div');
            divElement.setAttribute("class", "imagenNombreContainer");


            divElement.innerHTML = `
                <img src="${elemento.strMealThumb}" width="100" height="100" />
                <h2 class="moreInfo">${elemento.strMeal}</h2>
            `;


            contenedor.appendChild(divElement);
            count += 1;
        }
    });


}


botonBusqueda.addEventListener("click", async (event) => {
    event.preventDefault();
    inputValue = valorIngresado.value;
    selectValue = filtro.value;
    const datos = await getPlate(inputValue);
    
    if (selectValue == "selection" || inputValue == "") {
        alert('Ingrese una comida a buscar y el filtro de busqueda')
    } else {
        console.log("Valor ingresado:", inputValue);
        console.log("Opción seleccionada:", selectValue);
    }

    if (selectValue === "nombre") {
        const datos = await getPlate(inputValue);
        if (datos.meals && datos.meals.length > 0) {
            galerias[0].setAttribute('style', 'display:none');
            sectionNombre[0].setAttribute('style', 'display:flex');
            
            sectionBusquedaNombre(sectionNombre[0], datos.meals[0]);
        } else {
            alert('No se encontraron resultados para el nombre ingresado.');
        }
    } else if (selectValue === "categoria") {
        const categoria = await getPlateCategory(inputValue);
        if (categoria.meals && categoria.meals.length > 0) {
            sectionNombre[0].setAttribute('style', 'display:none');
            galerias[0].setAttribute('style', 'display:flex');
           
            sectionGaleria(galerias[0], categoria.meals);
        } else {
            alert('No se encontraron resultados para la categoría ingresada.');
        }
    } else if (selectValue === "ingrediente") {
        const segunIngrediente = await getPlateIngredient(inputValue);
        if (segunIngrediente.meals && segunIngrediente.meals.length > 0) {
            sectionNombre[0].setAttribute('style', 'display:none');
            galerias[0].setAttribute('style', 'display:flex');
            sectionGaleria(galerias[0], segunIngrediente.meals);
        } else {
            alert('No se encontraron resultados para el ingrediente ingresado.');
        }
    } else if (selectValue === "area") {
        const area = await getPlateArea(inputValue);
        if (area.meals && area.meals.length > 0) {
            sectionNombre[0].setAttribute('style', 'display:none');
            galerias[0].setAttribute('style', 'display:flex');
            sectionGaleria(galerias[0], area.meals);
        } else {
            alert('No se encontraron resultados para el área ingresada.');
        }
    } else {
        alert("Error. Asegúrate de seleccionar una categoría válida.");
    }
    const moreInfoElements = document.querySelectorAll("h2.moreInfo");
    
    moreInfoElements.forEach(moreInfo => {
        moreInfo.addEventListener("click", async() => {
            let nombrePlato = moreInfo.innerText; 
            const datos2 = await getPlate(nombrePlato);
            galerias[0].setAttribute('style', 'display:none');
            sectionNombre[0].setAttribute('style', 'display:flex');
            sectionBusquedaNombre(sectionNombre[0], datos2.meals[0]);
            
            
            
        });
    });




});



