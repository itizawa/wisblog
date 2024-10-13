'use client';

import { NoteAdd } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { type FC, useTransition } from 'react';
import { createDraftArticleForNew } from '~/actions/draftArticle';

type Props = {
  blogId: string;
};

export const CreateNewArticleButton: FC<Props> = ({ blogId }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => createDraftArticleForNew({ blogId }));
  };

  return (
    <LoadingButton onClick={() => handleClick()} variant='contained' startIcon={<NoteAdd />} loading={isPending}>
      新規作成
    </LoadingButton>
  );
};
