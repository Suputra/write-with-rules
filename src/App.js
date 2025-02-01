import React, { useState, useCallback, useEffect } from 'react';
import { MantineProvider, Text } from '@mantine/core';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import { motion } from 'framer-motion';
import AnthropicService from './services/anthropicService';

function App() {
  const [rules, setRules] = useState([]);
  const [advice, setAdvice] = useState([]);
  const [content, setContent] = useState('<p>Start writing here...</p>');
  const [anthropicService, setAnthropicService] = useState(null);
  const [lastCheckTime, setLastCheckTime] = useState(0);
  const CHECK_INTERVAL = 2000; // 2 seconds

  useEffect(() => {
    console.log('App: Checking for API key');
    const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
    console.log('App: API key present:', !!apiKey);
    
    if (apiKey) {
      console.log('App: Creating AnthropicService');
      const service = new AnthropicService(apiKey);
      setAnthropicService(service);
    } else {
      console.error('App: No Anthropic API key found in environment variables');
      setAdvice([{
        id: 'api-key-missing',
        message: 'Anthropic API key not configured. Please add it to your .env file.'
      }]);
    }
  }, []);

  const handleContentChange = useCallback(async (newContent) => {
    console.log('App: Content changed, length:', newContent.length);
    setContent(newContent);
    
    const now = Date.now();
    if (now - lastCheckTime < CHECK_INTERVAL) {
      return; // Don't check too frequently
    }
    
    if (anthropicService && rules.length > 0 && newContent.length > 50) {
      console.log('App: Checking content with service');
      try {
        setLastCheckTime(now);
        const newAdvice = await anthropicService.checkContent(newContent, rules);
        console.log('App: Received advice:', newAdvice);
        if (Array.isArray(newAdvice) && newAdvice.length > 0) {
          setAdvice(newAdvice);
        }
      } catch (error) {
        console.error('App: Error getting writing advice:', error);
        setAdvice([{
          id: Math.random().toString(36).substr(2, 9),
          message: 'Unable to analyze content. Please try again later.'
        }]);
      }
    }
  }, [rules, anthropicService, lastCheckTime]);

  return (
    <MantineProvider
      theme={{
        colorScheme: 'light',
        primaryColor: 'blue',
        components: {
          Button: {
            styles: {
              root: {
                transition: 'all 0.3s ease',
              },
            },
          },
        },
      }}
    >
      <div style={{ 
        display: 'flex', 
        height: '100vh', 
        backgroundColor: '#f5f5f5',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            width: '300px', 
            borderRight: '1px solid #e0e0e0',
            overflowY: 'auto',
            backgroundColor: 'white'
          }}
        >
          <Sidebar
            rules={rules}
            setRules={setRules}
            advice={advice}
            setAdvice={setAdvice}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            flex: 1, 
            padding: '20px',
            overflowY: 'auto'
          }}
        >
          <Editor
            content={content}
            onChange={handleContentChange}
          />
        </motion.div>
      </div>
    </MantineProvider>
  );
}

export default App;
