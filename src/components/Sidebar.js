import React from 'react';
import { Paper, Text, Button, Stack, Card, CloseButton } from '@mantine/core';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';

const Sidebar = ({ rules, setRules, advice, setAdvice }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result;
          setRules(prevRules => [...prevRules, {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            content: content
          }]);
        };
        reader.readAsText(file);
      }
    }
  });

  const removeRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const removeAdvice = (id) => {
    setAdvice(advice.filter(item => item.id !== id));
  };

  return (
    <Stack spacing="md" p="md" style={{ height: '100%' }}>
      {/* Rules Section */}
      <Text size="xl" weight={500}>Style Guides & Rules</Text>
      <Paper
        {...getRootProps()}
        style={{
          padding: '20px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: 'rgba(0, 0, 0, 0.02)'
        }}
      >
        <input {...getInputProps()} />
        <Stack align="center" spacing="xs">
          <FiUpload size={24} />
          <Text align="center">
            Drop files here or click to upload
          </Text>
          <Text size="xs" color="dimmed">
            Supports PDF, TXT, DOC files
          </Text>
        </Stack>
      </Paper>

      {/* Rules List */}
      <AnimatePresence>
        {rules.map((rule) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card shadow="sm" p="sm" withBorder>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Text size="sm" weight={500}>{rule.name}</Text>
                  <Text size="xs" color="dimmed" style={{ 
                    maxHeight: '60px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {rule.content}
                  </Text>
                </div>
                <CloseButton onClick={() => removeRule(rule.id)} />
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Advice Section */}
      <Text size="xl" weight={500} mt="xl">Writing Advice</Text>
      <AnimatePresence>
        {advice.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card shadow="sm" p="sm" withBorder>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text size="sm" style={{ flex: 1 }}>{item.message}</Text>
                <CloseButton onClick={() => removeAdvice(item.id)} />
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </Stack>
  );
};

export default Sidebar;
