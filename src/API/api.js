



const API_URL ='http://localhost:5000';  

export const signUp=async (userData) =>{
    const response= await fetch(`${API_URL}/users`,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userData)
    })

    if(!response.ok) {
        // const errorData =await response.json();
        throw new Error('Something went wrong');
    }

    return response.json();
}



