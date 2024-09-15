'use client';

import './styles.scss';

import { Color } from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import { Link } from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { FC } from 'react';

type Props = {
  body?: string;
  placeholder: string;
  onChange: (body: string) => void;
};

export const Editor: FC<Props> = ({ body, placeholder, onChange }) => {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    Link.configure(),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
    Placeholder.configure({
      placeholder,
    }),
    Heading.configure({
      levels: [1, 2, 3, 4, 5],
    }),
  ];

  const editor = useEditor({
    extensions,
    content: body,
    autofocus: 'end',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[400px]',
      },
    },
  });

  return <EditorContent editor={editor} />;
};
