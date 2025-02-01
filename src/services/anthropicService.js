import axios from 'axios';

class AnthropicService {
  constructor(apiKey) {
    console.log('Constructor called with API key:', apiKey ? 'present' : 'missing');
    if (!apiKey) throw new Error('API key is required');
    this.apiKey = apiKey;
  }

  async checkContent(content, rules) {
    console.log('checkContent called');
    
    try {
      const response = await axios.post('http://localhost:3001/api/analyze', {
        content
      });

      console.log('Response received:', response.data);
      return response.data.suggestions;
      
    } catch (error) {
      console.error('Error:', error);
      return [{
        id: 'error',
        message: error.response?.data?.error || error.message
      }];
    }
  }
}

export default AnthropicService;
