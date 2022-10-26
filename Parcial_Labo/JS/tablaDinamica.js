
function crearCabecera(row)
{
    const cabecera = document.createElement("thead"); 
    const tr = document.createElement("tr"); 

    for (const key in row) { 
        
        if(key !== "id")
        {
            const th = document.createElement("th");       
            th.textContent = key;
            tr.appendChild(th);
        }    
    }

    cabecera.appendChild(tr); 

    return cabecera;
}


function crearCuerpo(arrayData)
{
    const cuerpo = document.createElement("tbody");
    
    arrayData.forEach(element => {
        const fila = document.createElement("tr"); 
        for (const key in element) {  
            const celda = document.createElement("td"); 
            if(key !== "id")
            {
                celda.textContent = element[key];
                fila.appendChild(celda); 
    
            }
            else
            {
                fila.setAttribute("data-id",element[key]);    
            }
        }
        cuerpo.appendChild(fila);
    })
    return cuerpo;
}


export function crearTabla(arrayData)
{
    if(!Array.isArray(arrayData)) 
    {
        return null; 
    }

    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(arrayData[0]));
    tabla.appendChild(crearCuerpo(arrayData)); 


    return tabla;
}