import Swal from 'sweetalert2'

export const post = async (url, payload, token = null) => {

    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `${token}`;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    }).catch((error) => ({ error: true, ...error }));

    if (response.error) {
        Swal.fire({
            title: 'Error!',
            text: 'Server Error',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return { error: true };
    }

    const result = await response.json();
    if (response.ok) {
        return result;
    }
    Swal.fire({
        title: 'Error!',
        text: result.message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
    return {error: true, result}
}

export const get= async (url, headers) =>{
    const response= await fetch(url, {method: 'GET', headers})
    .catch( (e)=> ({error: true, ...e}));

    if(response.error){
        Swal.fire({
            title: 'Error!',
            text: 'Server Error',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return { error: true };
    }
    
    const result= await response.json();
    if(response.ok){
        return result;
    }
    Swal.fire({
        title: 'Error!',
        text: result.message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
    return {error: true, result}


}