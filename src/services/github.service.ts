import axios from 'axios';

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Authorization': `token ${TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
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
  }
};