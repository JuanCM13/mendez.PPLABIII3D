export const validarCampoVacio = (e)=>{
    if(e != null) 
    {
        const input = e.target;
        const value = input.value.trim();
        
        !value ? setError(input): setSuccess(input);
    }};

    export function setError(input,mensaje="Se debe completar el campo para continuar..")
    {
        if(input != null && input.matches("input"))
        {
            const $small = input.nextElementSibling;
            if($small != null)
            {
                if(input.classList.contains("input-success"))
                {
                    input.classList.remove("input-success");    
                }
                input.classList.add("input-error");
                if($small.classList.contains("success"))
                {
                    $small.classList.remove("success");
                    if($small.classList.contains("warning"))
                    {
                        $small.classList.remove("warning");
                    }    
                }
                $small.classList.add("danger");
                $small.textContent = mensaje;
                input.classList.remove("checkeado");
            }
        }
    }

    export function setSuccess(input)
    {
        if(input != null && input.matches("input"))
        {
            const $small = input.nextElementSibling;
            if($small != null)
            {
                if(input.classList.contains("input-error"))
                {
                    input.classList.remove("input-error");    
                }
                input.classList.add("input-success");
                if($small.classList.contains("danger"))
                {
                    $small.classList.remove("danger");
                    if($small.classList.contains("warning"))
                    {
                        $small.classList.remove("warning");
                    }    
                }
                $small.textContent = "";
                input.classList.add("checkeado");
            }
        }
    }

    export function validarRadioButton(arrayRadio)
    {   
        let elemento = null;
        if(arrayRadio != null)
        {
            //console.log("entre al validar");
            for(let radio of arrayRadio)
            {
                if(radio.checked)
                {
                    elemento = radio;
                    break;
                }
            }
        }
        return elemento;
    }

    export function validarCheckeos(arrayInputs)
    {
        let seP = true;
        if(arrayInputs != null)
        {
            for(let input of arrayInputs)
            {
                if(input.matches("input") && !input.classList.contains("checkeado"))
                {
                    seP = false;
                    break;
                }
            }
        }
        return seP;
    }