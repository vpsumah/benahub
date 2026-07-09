export async function onRequest({ env }) {

    const channelId = "UCdjYIs3r5-dZJpgdp2DkdOA";
    const apiKey = env.YOUTUBE_API_KEY;

    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const response = await fetch(feedUrl);
    const xml = await response.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    const videos = entries.slice(0, 8).map(entry => {
        const item = entry[1];

        const id = item.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || "";
        const title = item.match(/<title>(.*?)<\/title>/)?.[1] || "";
        const published = item.match(/<published>(.*?)<\/published>/)?.[1] || "";
        const description = item.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || "";

        return {
            id,
            title,
            published,
            url: `https://www.youtube.com/watch?v=${id}`,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            embed: `https://www.youtube.com/embed/${id}`,
            isShort:
                title.toLowerCase().includes("#shorts") ||
                description.toLowerCase().includes("#shorts")
             };
    });

    return new Response(
        JSON.stringify(videos),
        {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=1800"
            }
        }
    );
}