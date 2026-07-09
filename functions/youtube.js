export async function onRequest() {
    return new Response(
        JSON.stringify({
            message: "YouTube function OK"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}