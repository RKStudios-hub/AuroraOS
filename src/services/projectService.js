// Project data service
// This fetches real project data from various platforms

const GITHUB_USERNAME = 'rkstudios'; // Replace with actual username
const YOUTUBE_CHANNEL_ID = 'UCexample'; // Replace with actual channel ID

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

// Fetch from YouTube
export async function fetchYouTubeVideos(channelId = YOUTUBE_CHANNEL_ID) {
  // YouTube API requires API key, so we'll use mock data or RSS
  // In production, use YouTube Data API
  return [];
}

// Fetch from Sketchfab
export async function fetchSketchfabModels(username) {
  try {
    const response = await fetch(`https://sketchfab.com/oembed?url=https://sketchfab.com/${username}`);
    if (!response.ok) return [];
    
    // Sketchfab API is limited, using search instead
    const searchResponse = await fetch(`https://api.sketchfab.com/v3/search?type=models&q=${username}&downloadable=true`);
    if (!searchResponse.ok) return [];
    
    const data = await searchResponse.json();
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
    return [];
  }
}

// Fetch all projects
export async function fetchAllProjects() {
  const [github, modrinth] = await Promise.all([
    fetchGitHubProjects(),
    fetchModrinthProjects('rkstudios'), // Replace with actual Modrinth user ID
  ]);

  return {
    github,
    modrinth,
    youtube: [],
    sketchfab: [],
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
