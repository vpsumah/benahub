export async function onRequest() {

    return new Response(
        JSON.stringify({
            message: "Search endpoint coming soon."
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}