'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Public, PublicOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Link, Paper, Stack, TextField, Typography, useTheme } from '@mui/material';
import { type Article, ArticleSchema } from '@repo/types';
import debounce from 'lodash/debounce';
import { useSnackbar } from 'notistack';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import urlJoin from 'url-join';
import type { z } from 'zod';

import { convertStatus } from '~/actions/article';
import { updateDraftArticle } from '~/actions/draftArticle';
import { updatePublishArticle } from '~/actions/publishArticle';
import { Editor } from '~/components/uiParts/Editor';
import { appUrls } from '~/constants/appUrls';
import { mutateArticle, useArticle } from '~/hooks/article/useArticle/useArticle';

import { generateSubDomainUrl } from '~/utils/generateSubDomainUrl';

const inputSchema = ArticleSchema;
type InputState = z.infer<typeof inputSchema>;

type Props = {
  subDomain: string;
  existingArticle: InputState & {
    id: string;
    status: Article['status'];
  };
};

export const ArticleForm: FC<Props> = ({ subDomain, existingArticle: _existingArticle }) => {
  const { data: existingArticle, isLoading } = useArticle({
    id: _existingArticle.id,
    fallbackData: _existingArticle,
  });

  if (isLoading) return null;
  if (!existingArticle) return null;

  return <ArticleFormCore subDomain={subDomain} existingArticle={existingArticle} />;
};

export const ArticleFormCore: FC<Props> = ({ subDomain, existingArticle }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { palette } = useTheme();

  const { control, getValues, formState } = useForm<InputState>({
    defaultValues: existingArticle || {
      title: '',
      body: '',
    },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  });

  const handleChange = debounce(async () => {
    const { title, body } = getValues();

    try {
      switch (existingArticle.status) {
        case 'publish': {
          await updatePublishArticle({
            id: existingArticle.id,
            title,
            body,
          });
          return;
        }
        case 'draft': {
          await updateDraftArticle({
            id: existingArticle.id,
            title,
            body,
          });
          return;
        }
        default: {
          const _exhaustiveCheck: never = existingArticle.status;
        }
      }
    } catch (error) {
      enqueueSnackbar({ message: (error as Error).message, variant: 'error' });
    }
  }, 2000);

  const handleChangeStatus = async () => {
    try {
      switch (existingArticle.status) {
        case 'publish': {
          await convertStatus({
            id: existingArticle.id,
            toStatus: 'draft',
          });
          enqueueSnackbar({ message: '下書きに更新しました', variant: 'success' });
          mutateArticle({ id: existingArticle.id });
          return;
        }
        case 'draft': {
          await convertStatus({
            id: existingArticle.id,
            toStatus: 'publish',
          });
          enqueueSnackbar({ message: '公開しました', variant: 'success' });
          mutateArticle({ id: existingArticle.id });
          return;
        }
        default: {
          const _exhaustiveCheck: never = existingArticle.status;
        }
      }
    } catch (error) {
      enqueueSnackbar({ message: (error as Error).message, variant: 'error' });
    }
  };

  return (
    <Stack
      sx={{
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
      gap='16px'
    >
      <Stack gap={2} flex={1}>
        <Controller
          name='title'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              onChange={e => {
                field.onChange(e.target.value);
                handleChange();
              }}
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
            <Editor
              onChange={body => {
                field.onChange(body);
                handleChange();
              }}
              placeholder='記事の内容を入力する'
              body={field.value}
            />
          )}
        />
      </Stack>
      <Box>
        <Paper
          variant='outlined'
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              sm: 300,
            },
            rowGap: 3,
            position: 'sticky',
            top: 24,
          }}
        >
          <Typography variant='body1'>記事設定</Typography>
          <Link
            underline='hover'
            color='inherit'
            target='_blank'
            rel='noopener noreferrer'
            href={urlJoin(generateSubDomainUrl(subDomain), appUrls.blogs.article(existingArticle.id))}
          >
            <Typography variant='body2'>実際の画面に飛ぶ</Typography>
          </Link>
          <Stack gap='16px'>
            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              endIcon={existingArticle.status === 'draft' ? <Public /> : <PublicOff />}
              color={existingArticle.status === 'draft' ? 'primary' : 'gray'}
              disabled={formState.isLoading || formState.isSubmitting || !formState.isValid}
              loading={formState.isSubmitting}
              onClick={handleChangeStatus}
            >
              {existingArticle?.status !== 'publish' ? '公開する' : '下書きに戻す'}
            </LoadingButton>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
};
