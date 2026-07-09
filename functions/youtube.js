export async function onRequest() {

    return new Response(
        JSON.stringify({
            message: "Ça fonctionne !"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}