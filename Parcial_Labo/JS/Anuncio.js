export function Anuncio(id,titulo,transaccion,descripcion,precio,puertas,kilometros,potencia)
{
    if(id != null && titulo != null && transaccion != null && descripcion != null && precio != null && puertas != null && kilometros != null && potencia != null)
    {
            this.id = id;
            this.titulo = titulo;
            this.transaccion = transaccion;
            this.descripcion = descripcion;
            this.precio = precio;
            this.puertas = puertas;
            this.kilometros = kilometros;
            this.potencia = potencia;
    }    
    else
    {
        throw new Error("Error, algun dato fue fallido!");
    }
}