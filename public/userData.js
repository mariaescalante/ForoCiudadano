import { supabase } from "./supabase"

document.getElementById('sendUserData').addEventListener('click', insertUserData)

async function insertUserData() {

    let nombre = document.getElementById('inputNombre').value
    let apellidos = document.getElementById('inputApellidos').value
    let email = document.getElementById('inputEmail').value
    let telefono = document.getElementById('inputTelefono').value


    const { data, error } = await supabase
        .from('Usuario')
        .insert([
            { nombre: nombre, apellidos: apellidos, email: email, telefono: telefono },
        ]).select()

    if (error == null) {
        window.location.href = `/signin` // No funciona
    }
}
