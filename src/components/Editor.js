import React from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Paper, Button, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { 
  FiBold, 
  FiItalic, 
  FiList
} from 'react-icons/fi';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Group spacing="xs" mb="md">
      <Button
        variant={editor.isActive('bold') ? 'filled' : 'light'}
        onClick={() => editor.chain().focus().toggleBold().run()}
        size="sm"
      >
        <FiBold size={16} />
      </Button>
      <Button
        variant={editor.isActive('italic') ? 'filled' : 'light'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        size="sm"
      >
        <FiItalic size={16} />
      </Button>
      <Button
        variant={editor.isActive('bulletList') ? 'filled' : 'light'}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        size="sm"
      >
        <FiList size={16} />
      </Button>
    </Group>
  );
};

const BubbleMenuBar = ({ editor }) => {
  if (!editor) return null;
  
  return (
    <Group spacing="xs" style={{ padding: '4px', background: 'white', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Button
        variant={editor.isActive('bold') ? 'filled' : 'light'}
        onClick={() => editor.chain().focus().toggleBold().run()}
        size="xs"
      >
        <FiBold size={14} />
      </Button>
      <Button
        variant={editor.isActive('italic') ? 'filled' : 'light'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        size="xs"
      >
        <FiItalic size={14} />
      </Button>
    </Group>
  );
};

const Editor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: content || '<p>Start writing here...</p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== '<p></p>') {  // Don't trigger for empty content
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <Paper
        shadow="sm"
        p="md"
        style={{
          backgroundColor: 'white',
          minHeight: '842px',
          width: '100%',
          margin: '0 auto',
          padding: '40px',
        }}
      >
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          style={{
            minHeight: '762px',
            outline: 'none',
          }}
        />
      </Paper>

      {editor && (
        <BubbleMenu 
          editor={editor} 
          tippyOptions={{ duration: 100 }}
        >
          <BubbleMenuBar editor={editor} />
        </BubbleMenu>
      )}
    </motion.div>
  );
};

export default Editor;
