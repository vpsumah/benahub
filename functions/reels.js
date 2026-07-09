export async function onRequest() {

    const channelId = "UCwJOU0d9cU0fze4CZfQCASQ";

    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const response = await fetch(feedUrl);
    const xml = await response.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    const reels = entries.slice(0, 6).map(entry => {
        const item = entry[1];

        const id = item.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || "";
        const title = item.match(/<title>(.*?)<\/title>/)?.[1] || "";
        const published = item.match(/<published>(.*?)<\/published>/)?.[1] || "";

        return {
            id,
            title,
            published,
            url: `https://www.youtube.com/watch?v=${id}`,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            embed: `https://www.youtube.com/embed/${id}`
        };
    });

    return new Response(
        JSON.stringify(reels),
        {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=1800"
            }
        }
    );
}