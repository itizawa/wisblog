'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { NoteAdd } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Paper, Stack, TextField, Typography, useTheme } from '@mui/material';
import { type Article, ArticleSchema } from '@repo/types';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import urlJoin from 'url-join';
import type { z } from 'zod';
import { createDraftArticle, updateDraftArticle } from '~/actions/draftArticle';
import { createPublishArticle, updatePublishArticle } from '~/actions/publishArticle';
import { Editor } from '~/components/uiParts/Editor';
import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

const inputSchema = ArticleSchema.pick({ title: true, body: true });
type InputState = z.infer<typeof inputSchema>;

type Props = {
  subDomain: string;
  blogId: string;
  existedArticle?: InputState & {
    id: string;
    status: Article['status'];
  };
};

export const ArticleForm: FC<Props> = ({ subDomain, blogId, existedArticle }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { palette } = useTheme();
  const router = useRouter();

  const { control, getValues, formState } = useForm<InputState>({
    defaultValues: existedArticle || {
      title: '',
      body: '',
    },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const onSubmit = async ({ status }: { status: Article['status'] }) => {
    const { title, body } = getValues();
    try {
      if (existedArticle) {
        switch (status) {
          case 'publish': {
            await updatePublishArticle({
              id: existedArticle.id,
              title,
              body,
            });
            return;
          }
          case 'draft': {
            await updateDraftArticle({
              id: existedArticle.id,
              title,
              body,
            });
            return;
          }
          default:
            break;
        }
        enqueueSnackbar({ message: '記事を更新しました', variant: 'success' });
        router.push(urlJoin(generateSubDomainUrl(subDomain), existedArticle.id));
        return;
      }

      switch (status) {
        case 'publish': {
          const { createdArticle } = await createPublishArticle({
            title,
            body,
            blogId,
          });
          enqueueSnackbar({ message: '記事を公開しました', variant: 'success' });
          router.push(urlJoin(generateSubDomainUrl(subDomain), createdArticle.id));
          return;
        }
        case 'draft': {
          const { createdDraftArticle } = await createDraftArticle({
            title,
            body,
            blogId,
          });
          enqueueSnackbar({ message: '記事を下書きで作成しました', variant: 'success' });
          router.push(urlJoin(generateSubDomainUrl(subDomain), createdDraftArticle.id));
          return;
        }
        default:
          break;
      }
    } catch (error) {
      enqueueSnackbar({ message: (error as Error).message, variant: 'error' });
    }
  };

  return (
    <Stack direction='row' columnGap='16px'>
      <Stack gap={2} flex={1}>
        <Controller
          name='title'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              placeholder='タイトルを入力してください'
              label='タイトル'
              variant='standard'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                fontSize: '1.5rem',
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
      </Stack>
      <Box>
        <Paper variant='outlined' sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 300, rowGap: 3 }}>
          <Typography variant='body1'>記事詳細</Typography>
          <Stack gap='16px'>
            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              endIcon={<NoteAdd />}
              color='primary'
              onClick={() => onSubmit({ status: 'publish' })}
              disabled={formState.isLoading || formState.isSubmitting || !formState.isValid}
              loading={formState.isSubmitting}
            >
              {existedArticle ? (existedArticle?.status !== 'publish' ? '公開' : '更新') : '公開'}
            </LoadingButton>
            {/* TODO: 有効にする */}
            {/* {existedArticle?.status !== 'publish' && (
              <LoadingButton
                type='submit'
                fullWidth
                variant='outlined'
                endIcon={<Save />}
                color='success'
                onClick={() => onSubmit({ status: 'draft' })}
                disabled={formState.isLoading || formState.isSubmitting || !formState.isValid}
                loading={formState.isSubmitting}
              >
                {existedArticle ? '更新' : '下書き保存'}
              </LoadingButton>
            )} */}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
};
