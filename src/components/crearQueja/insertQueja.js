import { supabase } from "../../../public/supabase"

document.getElementById('publicarQueja').addEventListener('click', insertarQueja)

async function insertarQueja() {

    let email = document.getElementById("email").value
    let imagen = document.getElementById("imagen").value
    let titulo = document.getElementById("titulo").value
    let descripcion = document.getElementById("descripcion").value
    let categoria = document.getElementById("categoria").value
    let distrito = document.getElementById("distrito").value

    let { data: usuario } = await supabase
        .from("Usuario")
        .select("*")
        .eq("email", email);

    const { data, error } = await supabase
        .from('Queja')
        .insert([
            { imagen: imagen, titulo: titulo, descripcion: descripcion, categoria: categoria, distrito: distrito, usuario: usuario[0].id },
        ])
        .select()


    window.location.href = "/misQuejas"

}