import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {HtmlDirUpdater} from '@/components/html-dir-updater';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlDirUpdater locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
