import axios from 'axios';

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Authorization': `token ${TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
});

export const githubService = {
  getRepos: async () => {
    const response = await api.get('/user/repos?sort=updated&direction=desc');
    return response.data;
  },
  
  getUser: async () => {
    const response = await api.get('/user');
    return response.data;
  },

  createRepo: async (name: string, description: string, isPrivate: boolean) => {
    const response = await api.post('/user/repos', {
      name,
      description,
      private: isPrivate,
      auto_init: true 
    });
    return response.data;
  },

  updateRepo: async (owner: string, repo: string, name: string, description: string) => {
    const response = await api.patch(`/repos/${owner}/${repo}`, {
      name,
      description
    });
    return response.data;
  },

  deleteRepo: async (owner: string, repo: string) => {
    const response = await api.delete(`/repos/${owner}/${repo}`);
    return response.status === 204;
  }
};