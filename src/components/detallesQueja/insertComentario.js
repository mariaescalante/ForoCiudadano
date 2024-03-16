import { supabase } from "../../../public/supabase"

document.getElementById('publicarComentario').addEventListener('click', insertarComentario)

document.getElementById('hacerComentario').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('comentarioForm').style.display = 'block';
});

async function insertarComentario() {

    let descripcion = document.getElementById("descripcion").value
    let estrellas = document.getElementById("estrellas").value
    let quejaId = document.getElementById("quejaId").value
    let usuarioId = document.getElementById("usuarioId").value


    let { data: ultimoId, error } = await supabase
        .from('Comentario')
        .select('id')
        .order("id", { ascending: false })
        .range(0, 0)

    const { data } = await supabase
        .from('Comentario')
        .insert([
            { id: ultimoId[0].id + 1, descripcion: descripcion, estrellas: estrellas, usuario: usuarioId, queja: quejaId },
        ])
        .select()


    window.location.href = `/queja/${quejaId}`;
}