export default async function handler(req, res) {
  const channelId = req.query.channelId || 'UCKZbP7ms0yBzikpTC_X6H-A';
  const handle = req.query.handle || 'hrupeshkumar';
  
  const urls = [
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    `https://www.youtube.com/feeds/videos.xml?handle=@${handle}`,
  ];
  
  for (const rssUrl of urls) {
    try {
      const response = await fetch(rssUrl);
      if (!response.ok) continue;
      
      const text = await response.text();
      
      const videos = [];
      const entryMatches = text.matchAll(/<entry>([\s\S]*?)<\/entry>/g);
      
      for (const entry of entryMatches) {
        if (videos.length >= 10) break;
        const entryContent = entry[1];
        
        const videoIdMatch = entryContent.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const titleMatch = entryContent.match(/<title>([^<]+)<\/title>/);
        
        if (videoIdMatch && titleMatch) {
          videos.push({
            id: `yt-${videoIdMatch[1]}`,
            title: titleMatch[1],
            description: 'YouTube Video',
            url: `https://youtube.com/watch?v=${videoIdMatch[1]}`,
            thumbnail: `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`,
            platform: 'youtube',
            icon: '🎬',
          });
        }
      }
      
      if (videos.length > 0) {
        return res.json({ success: true, videos });
      }
    } catch (e) {
      console.log('Failed:', e);
      continue;
    }
  }
  
  return res.json({ success: false, videos: [] });
}
