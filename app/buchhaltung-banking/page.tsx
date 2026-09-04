import { TopicPage } from '@/components/marketing/TopicPage';
import { topicMetadata } from '@/lib/topic-pages';

export const metadata = topicMetadata('buchhaltung-banking');

export default function AccountingBankingPage() {
  return <TopicPage slug="buchhaltung-banking" />;
}
