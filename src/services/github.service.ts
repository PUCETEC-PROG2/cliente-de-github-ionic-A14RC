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
    const body = {
      name: name,
      description: description,
      private: isPrivate,
      auto_init: true 
    };
    
    const response = await api.post('/user/repos', body); 
    return response.data;
  }
};