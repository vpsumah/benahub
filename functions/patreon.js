export async function onRequest() {

    return new Response(
        JSON.stringify({
            message: "Patreon endpoint coming soon."
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}