export async function onRequest({ env }) {

    const apiKey = env.YOUTUBE_API_KEY;
    const channelId = "UCdjYIs3r5-dZJpgdp2DkdOA";

    const url =
        `https://www.googleapis.com/youtube/v3/playlists` +
        `?part=snippet,contentDetails` +
        `&channelId=${channelId}` +
        `&maxResults=20` +
        `&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const playlists = (data.items || []).map(item => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url,
        count: item.contentDetails.itemCount,
        url: `https://www.youtube.com/playlist?list=${item.id}`
    }));

    return new Response(
        JSON.stringify(playlists),
        {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=1800"
            }
        }
    );

}