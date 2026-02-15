// Project data service
// This fetches real project data from various platforms

const GITHUB_USERNAME = 'RKStudios-hub';
const MODRINTH_USER_ID = 'Random_Visitor';
const SKETCHFAB_USERNAME = 'hrupeshkumarh';
const YOUTUBE_CHANNEL_ID = 'UCKZbP7ms0yBzikpTC_X6H-A';

// Mock data - in production, replace with real API calls
export const projectData = {
  github: [],
  modrinth: [],
  curseforge: [],
  sketchfab: [],
  youtube: [],
  codepen: [],
};

// Fetch from GitHub
export async function fetchGitHubProjects(username = GITHUB_USERNAME) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
    if (!response.ok) return [];
    
    const repos = await response.json();
    return repos.map(repo => ({
      id: `gh-${repo.id}`,
      title: repo.name,
      description: repo.description || 'No description',
      tags: repo.language ? [repo.language] : [],
      url: repo.html_url,
      thumbnail: `https://opengraph.githubassets.com/${repo.id}/${repo.name}`,
      stars: repo.stargazers_count,
      platform: 'github',
      icon: '💻',
    }));
  } catch (error) {
    console.error('GitHub fetch error:', error);
    return [];
  }
}

// Fetch from Modrinth
export async function fetchModrinthProjects(userId) {
  try {
    const response = await fetch(`https://api.modrinth.com/v2/user/${userId}/projects`);
    if (!response.ok) return [];
    
    const projects = await response.json();
    return projects.map(project => ({
      id: `modrinth-${project.id}`,
      title: project.title,
      description: project.description,
      tags: project.categories || [],
      url: `https://modrinth.com/${project.project_type}/${project.slug}`,
      thumbnail: project.icon_url,
      downloads: project.downloads,
      platform: 'modrinth',
      icon: '🧊',
    }));
  } catch (error) {
    console.error('Modrinth fetch error:', error);
    return [];
  }
}

// Fetch from YouTube - using channel RSS feed
export async function fetchYouTubeVideos(channelId = YOUTUBE_CHANNEL_ID) {
  try {
    // Using a CORS proxy to fetch YouTube channel RSS
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data.items || data.items.length === 0) return [];
    
    return data.items.map((video, index) => ({
      id: `yt-${index}`,
      title: video.title,
      description: video.description || 'YouTube Video',
      url: video.link,
      thumbnail: video.thumbnail,
      platform: 'youtube',
      icon: '🎬',
    }));
  } catch (error) {
    console.error('YouTube fetch error:', error);
    return [];
  }
}

// Fetch from Sketchfab
export async function fetchSketchfabModels(username) {
  try {
    // Search for models with username as query
    const response = await fetch(`https://api.sketchfab.com/v3/search?type=models&q=${username}&sort_by=-likeCount&count=20`);
    if (!response.ok) {
      console.log('Sketchfab API response:', response.status);
      // Return mock data as fallback
      return [
        { id: 'sketchfab-1', title: '3D Model 1', description: 'Sample 3D model', url: `https://sketchfab.com/${username}`, platform: 'sketchfab' },
        { id: 'sketchfab-2', title: '3D Model 2', description: 'Sample 3D model', url: `https://sketchfab.com/${username}`, platform: 'sketchfab' },
      ];
    }
    
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      // Return mock data as fallback
      return [
        { id: 'sketchfab-1', title: '3D Model 1', description: 'Sample 3D model', url: `https://sketchfab.com/${username}`, platform: 'sketchfab' },
        { id: 'sketchfab-2', title: '3D Model 2', description: 'Sample 3D model', url: `https://sketchfab.com/${username}`, platform: 'sketchfab' },
      ];
    }
    
    return data.results.map(model => ({
      id: `sketchfab-${model.uid}`,
      title: model.name,
      description: model.description || '3D Model',
      tags: model.tags?.map(t => t.name) || [],
      url: model.url,
      thumbnail: model.thumbnails?.images?.[0]?.url,
      likes: model.likeCount,
      platform: 'sketchfab',
      icon: '🎲',
    }));
  } catch (error) {
    console.error('Sketchfab fetch error:', error);
    // Return mock data as fallback
    return [
      { id: 'sketchfab-1', title: '3D Model 1', description: 'Sample 3D model', url: `https://sketchfab.com/${username}`, platform: 'sketchfab' },
      { id: 'sketchfab-2', title: '3D Model 2', description: 'Sample 3D model', url: `https://sketchfab.com/${username}`, platform: 'sketchfab' },
    ];
  }
}

// Fetch all projects
export async function fetchAllProjects() {
  const [github, modrinth, sketchfab, youtube] = await Promise.all([
    fetchGitHubProjects(GITHUB_USERNAME),
    fetchModrinthProjects(MODRINTH_USER_ID),
    fetchSketchfabModels(SKETCHFAB_USERNAME),
    fetchYouTubeVideos(YOUTUBE_CHANNEL_ID),
  ]);

  return {
    github,
    modrinth,
    sketchfab,
    youtube,
    curseforge: [],
    codepen: [],
  };
}

// Get combined projects list
export function getCombinedProjects(allData) {
  const projects = [];
  
  // Add all projects from different platforms
  Object.entries(allData).forEach(([platform, data]) => {
    if (Array.isArray(data)) {
      projects.push(...data);
    }
  });
  
  // Sort by some criteria (could be date, popularity, etc.)
  return projects.sort((a, b) => (b.stars || b.downloads || 0) - (a.stars || a.downloads || 0));
}
