'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

import { createCompanion } from '@/actions/companion';
import { Textarea } from '@/components/ui/textarea';
import { SUBJECTS } from '@/constants/app';
import { useServerAction } from '@/hooks/use-server-action';
import { Subject } from '@/types';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  topic: z.string().min(1, { message: 'Topic is required' }),
  voice: z.string().min(1, { message: 'Voice is required' }),
  style: z.string().min(1, { message: 'Style is required' }),
  duration: z.coerce.number().min(1, { message: 'Duration is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const CompanionForm = () => {
  const t = useTranslations('CompanionForm');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      name: '',
      subject: '',
      topic: '',
      voice: '',
      style: '',
      duration: 15,
    },
  });

  const { run: createCompanionAction, isPending } =
    useServerAction(createCompanion);

  const tSuccess = useTranslations('Success');

  const onSubmit = async (values: FormValues) => {
    await createCompanionAction(values, {
      onSuccess: (companion) => {
        toast.success(tSuccess('saved'));

        if (companion) {
          redirect(`/companions/${companion.id}`);
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('companion_name')}</FormLabel>

              <FormControl>
                <Input
                  placeholder={t('enter_companion_name')}
                  {...field}
                  className="input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('subject')}</FormLabel>

              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="input capitalize cursor-pointer">
                    <SelectValue placeholder={t('select_subject')} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {SUBJECTS.map((subject: Subject) => (
                    <SelectItem
                      key={subject}
                      value={subject}
                      className="capitalize cursor-pointer"
                    >
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('what_to_help_with')}</FormLabel>

              <FormControl>
                <Textarea
                  placeholder={t('help_example')}
                  {...field}
                  className="input h-[180px] resize-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('voice')}</FormLabel>

              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="input capitalize cursor-pointer">
                    <SelectValue placeholder={t('select_voice')} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem className="cursor-pointer" value="male">
                    {t('male')}
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="female">
                    {t('female')}
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('style')}</FormLabel>

              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="input capitalize cursor-pointer">
                    <SelectValue placeholder={t('select_style')} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem className="cursor-pointer" value="formal">
                    {t('formal')}
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="casual">
                    {t('casual')}
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('estimated_duration')}</FormLabel>

              <FormControl>
                <Input
                  placeholder="15"
                  {...field}
                  className="input"
                  type="number"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="cursor-pointer w-full"
          type="submit"
          isLoading={isPending}
        >
          {t('build_your_companion')}
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
