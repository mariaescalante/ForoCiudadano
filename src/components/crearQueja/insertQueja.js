import { supabase } from "../../../public/supabase"

document.getElementById('quejaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    insertarQueja();
  });
async function insertarQueja() {

    let email = document.getElementById("email").value
    let titulo = document.getElementById("titulo").value
    let descripcion = document.getElementById("descripcion").value
    let categoria = document.getElementById("categoria").value
    let distrito = document.getElementById("distrito").value

    let { data: usuario } = await supabase
        .from("Usuario")
        .select("*")
        .eq("email", email);



    let imagenInput = document.getElementById("imagen");
    let archivoImagen = imagenInput.files[0];

    const { data: uploaded, error: uploadError } = await supabase
        .storage
        .from('imagenes')
        .upload(archivoImagen.name, archivoImagen);


    const { data, error } = await supabase
        .from('Queja')
        .insert([
            { imagen: archivoImagen.name, titulo: titulo, descripcion: descripcion, categoria: categoria, distrito: distrito, usuario: usuario[0].id },
        ])
        .select()


    window.location.href = "/misQuejas"

}