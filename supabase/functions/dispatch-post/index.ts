import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.5";

Deno.serve(async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!,
    Deno.env.get("NEXT_PUBLIC_SUPABASE_ROLE_KEY")!,
  );

  const { data: todos, error } = await supabaseClient.from("todos").select("*");

  if (error) {
    return new Response(JSON.stringify({ error }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  return new Response(JSON.stringify({ todos }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});

// Deno.serve(async (req: Request) => {
//   const supabaseClient = createClient(
//     "https://famqfppixgsmsejtylkx.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU",
//   );

//   // Get the session or user object
//   const authHeader = req.headers.get("Authorization")!;

//   console.log(authHeader);
//   const token = authHeader.replace("Bearer ", "");
//   const { data, error } = await supabaseClient.auth.getUser(token);
//   console.log("error: ", error);
//   const user = data.user;

//   return new Response(JSON.stringify({ user }), {
//     headers: { "Content-Type": "application/json" },
//     status: 200,
//   });
// });

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/dispatch-post' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
