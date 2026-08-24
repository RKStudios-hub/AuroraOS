// Project data service
// Fetches real project data from GitHub, YouTube, Modrinth, and Sketchfab with rich fallbacks

const GITHUB_USERNAME = 'RKStudios-hub';
const MODRINTH_USER_ID = 'Random_Visitor';
const SKETCHFAB_USERNAME = 'hrupeshkumarh';
const YOUTUBE_CHANNEL_ID = 'UCKZbP7ms0yBzikpTC_X6H-A';

// Fallback high quality project items with real media thumbnails
const FALLBACK_PROJECTS = {
  github: [
    {
      id: 'gh-aurora-os',
      title: 'AuroraOS Portfolio',
      description: 'Futuristic OS-style web portfolio built with React, Vite, Tailwind CSS, and Framer Motion.',
      tags: ['React', 'Tailwind', 'Vite'],
      url: 'https://github.com/RKStudios-hub/AuroraOS',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      stars: 48,
      platform: 'github',
      icon: '💻',
    },
    {
      id: 'gh-cyber-shell',
      title: 'CyberShell CLI',
      description: 'Cross-platform interactive terminal emulator with custom themes and matrix scripts.',
      tags: ['JavaScript', 'Node.js'],
      url: 'https://github.com/RKStudios-hub',
      thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80',
      stars: 32,
      platform: 'github',
      icon: '⚡',
    },
    {
      id: 'gh-pixel-canvas',
      title: 'Pixel Art Canvas',
      description: 'Browser-based pixel art drawing app with palette export and layer management.',
      tags: ['HTML5 Canvas', 'JS'],
      url: 'https://github.com/RKStudios-hub',
      thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      stars: 19,
      platform: 'github',
      icon: '🎨',
    },
  ],
  youtube: [
    {
      id: 'yt-demo-1',
      title: 'Building an OS Portfolio in React from Scratch',
      description: 'Full walkthrough building a custom desktop OS interface in Web Browser using React & Framer Motion.',
      url: 'https://youtube.com',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      platform: 'youtube',
      views: '12.4K',
      duration: '14:20',
      icon: '🎬',
    },
    {
      id: 'yt-demo-2',
      title: '3D Game Environment Showcase in Unity',
      description: 'Cinematic breakdown of procedural terrain generation, lighting, and custom shaders.',
      url: 'https://youtube.com',
      thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
      platform: 'youtube',
      views: '8.9K',
      duration: '09:45',
      icon: '🎮',
    },
    {
      id: 'yt-demo-3',
      title: 'Speed Design: Futuristic Dark Mode UI Layout',
      description: 'Creating glassmorphic dashboard layouts using Figma and Tailwind CSS.',
      url: 'https://youtube.com',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      platform: 'youtube',
      views: '15.1K',
      duration: '11:10',
      icon: '✨',
    },
  ],
  sketchfab: [
    {
      id: 'sketchfab-mech',
      title: 'Cyberpunk Mech Suit 3D',
      description: 'Low-poly rigged sci-fi mech warrior model designed for indie games.',
      tags: ['3D Model', 'Blender', 'LowPoly'],
      url: 'https://sketchfab.com',
      thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
      likes: 142,
      platform: 'sketchfab',
      icon: '🎲',
    },
    {
      id: 'sketchfab-island',
      title: 'Stylized Floating Island',
      description: 'Hand-painted fantasy floating island environment with water shaders.',
      tags: ['Environment', 'Handpainted'],
      url: 'https://sketchfab.com',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
      likes: 98,
      platform: 'sketchfab',
      icon: '🏝️',
    },
    {
      id: 'sketchfab-weapon',
      title: 'Energy Plasma Rifle',
      description: 'High-tech sci-fi plasma rifle asset with PBR textures and emission maps.',
      tags: ['Weapon', 'PBR'],
      url: 'https://sketchfab.com',
      thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
      likes: 215,
      platform: 'sketchfab',
      icon: '🔫',
    },
  ],
  modrinth: [
    {
      id: 'modrinth-shaders',
      title: 'Aurora Shader Pack',
      description: 'Ultra lightweight Minecraft shader pack enhancing godrays and dynamic water.',
      tags: ['Minecraft', 'Shader'],
      url: 'https://modrinth.com',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      downloads: '45.2K',
      platform: 'modrinth',
      icon: '🧊',
    },
    {
      id: 'modrinth-rpg',
      title: 'Mystic Realms Expansion',
      description: 'Comprehensive RPG mod adding new biomes, mythical bosses, and magic spells.',
      tags: ['Modpack', 'RPG'],
      url: 'https://modrinth.com',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
      downloads: '89.1K',
      platform: 'modrinth',
      icon: '⚔️',
    },
  ]
};

// Fetch from GitHub
export async function fetchGitHubProjects(username = GITHUB_USERNAME) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
    if (!response.ok) return FALLBACK_PROJECTS.github;
    
    const repos = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) return FALLBACK_PROJECTS.github;

    return repos.map(repo => ({
      id: `gh-${repo.id}`,
      title: repo.name,
      description: repo.description || 'GitHub Repository',
      tags: repo.language ? [repo.language] : ['GitHub'],
      url: repo.html_url,
      thumbnail: `https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80`,
      stars: repo.stargazers_count,
      platform: 'github',
      icon: '💻',
    }));
  } catch (error) {
    return FALLBACK_PROJECTS.github;
  }
}

// Fetch from Modrinth
export async function fetchModrinthProjects(userId) {
  try {
    const response = await fetch(`https://api.modrinth.com/v2/user/${userId}/projects`);
    if (!response.ok) return FALLBACK_PROJECTS.modrinth;
    
    const projects = await response.json();
    if (!Array.isArray(projects) || projects.length === 0) return FALLBACK_PROJECTS.modrinth;

    return projects.map(project => ({
      id: `modrinth-${project.id}`,
      title: project.title,
      description: project.description,
      tags: project.categories || ['Mod'],
      url: `https://modrinth.com/${project.project_type}/${project.slug}`,
      thumbnail: project.icon_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      downloads: project.downloads,
      platform: 'modrinth',
      icon: '🧊',
    }));
  } catch (error) {
    return FALLBACK_PROJECTS.modrinth;
  }
}

// Fetch from YouTube
export async function fetchYouTubeVideos(channelId = YOUTUBE_CHANNEL_ID) {
  try {
    const res = await fetch(`/api/youtube?channelId=${channelId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.videos && data.videos.length > 0) {
        return data.videos;
      }
    }
  } catch (e) {}
  return FALLBACK_PROJECTS.youtube;
}

// Fetch from Sketchfab
export async function fetchSketchfabModels(username = SKETCHFAB_USERNAME) {
  try {
    const response = await fetch(`https://api.sketchfab.com/v3/search?type=models&q=${username}&sort_by=-likeCount&count=20`);
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results.map(model => ({
          id: `sketchfab-${model.uid}`,
          title: model.name,
          description: model.description || '3D Model',
          tags: model.tags?.map(t => t.name) || ['3D Model'],
          url: model.url,
          thumbnail: model.thumbnails?.images?.[0]?.url || 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
          likes: model.likeCount,
          platform: 'sketchfab',
          icon: '🎲',
        }));
      }
    }
  } catch (error) {}
  return FALLBACK_PROJECTS.sketchfab;
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
    github: github.length ? github : FALLBACK_PROJECTS.github,
    modrinth: modrinth.length ? modrinth : FALLBACK_PROJECTS.modrinth,
    sketchfab: sketchfab.length ? sketchfab : FALLBACK_PROJECTS.sketchfab,
    youtube: youtube.length ? youtube : FALLBACK_PROJECTS.youtube,
  };
}
