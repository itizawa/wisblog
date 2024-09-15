'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { NoteAdd } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, useTheme } from '@mui/material';
import { ArticleSchema } from '@repo/types';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import urlJoin from 'url-join';
import type { z } from 'zod';
import { createArticle, updateArticle } from '~/actions/article';
import { Editor } from '~/components/uiParts/Editor';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

const inputSchema = ArticleSchema.pick({ title: true, body: true });
type InputState = z.infer<typeof inputSchema>;

type Props = {
  subDomain: string;
  blogId: string;
  existedArticle?: InputState & {
    id: string;
  };
};

export const ArticleForm: FC<Props> = ({ subDomain, blogId, existedArticle }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { palette } = useTheme();
  const router = useRouter();

  const { control, formState, handleSubmit } = useForm<InputState>({
    defaultValues: existedArticle || {
      title: '',
      body: '',
    },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ title, body }) => {
    try {
      if (existedArticle) {
        const { updatedArticle } = await updateArticle({
          id: existedArticle.id,
          title,
          body,
        });
        enqueueSnackbar({ message: '記事を更新しました', variant: 'success' });
        router.push(urlJoin(generateSubDomainUrl(subDomain), updatedArticle.id));
      } else {
        const { createdArticle } = await createArticle({
          title,
          body,
          blogId,
        });
        enqueueSnackbar({ message: '記事を作成しました', variant: 'success' });
        router.push(urlJoin(generateSubDomainUrl(subDomain), createdArticle.id));
      }
    } catch (error) {
      enqueueSnackbar({ message: (error as Error).message, variant: 'error' });
    }
  });

  return (
    <Stack gap={2}>
      <Controller
        name='title'
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            placeholder='タイトルを入力してください'
            label='タイトル'
            variant='outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={{
              '.MuiInputLabel-formControl.Mui-focused': {
                color: palette.text.primary,
              },
            }}
          />
        )}
      />
      <Controller
        name='body'
        control={control}
        render={({ field }) => (
          <Editor onChange={field.onChange} placeholder='記事の内容を入力する' body={field.value} />
        )}
      />
      <LoadingButton
        type='submit'
        variant='contained'
        endIcon={<NoteAdd />}
        color='primary'
        onClick={onSubmit}
        disabled={formState.isLoading || formState.isSubmitting || !formState.isValid}
        loading={formState.isSubmitting}
      >
        {existedArticle ? '更新' : '作成'}
      </LoadingButton>
    </Stack>
  );
};
