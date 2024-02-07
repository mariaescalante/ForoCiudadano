import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const nombre = formData.get("nombre")?.toString();
  const apellidos = formData.get("apellidos")?.toString();
  const telefono = formData.get("telefono")?.toString();


  if (!email || !password || !nombre || !apellidos || !telefono) {
    return new Response("Debe rellenar todos los campos", { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  if (error == null) {
    const { data, error } = await supabase
      .from('Usuario')
      .insert([
        { nombre: nombre, apellidos: apellidos, email: email, telefono: telefono },
      ]).select()

    if (error != null && error['message'] == 'duplicate key value violates unique constraint "usuarios_email_key"') {
      return new Response("Este email ya está registrado", { status: 400 });
    }
  }

  return redirect("/confirmEmail");
};
