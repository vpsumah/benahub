export async function onRequest() {

    return new Response(
        JSON.stringify({
            message: "Facebook endpoint coming soon."
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}