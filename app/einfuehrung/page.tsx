import { TopicPage } from '@/components/marketing/TopicPage';
import { topicMetadata } from '@/lib/topic-pages';

export const metadata = topicMetadata('einfuehrung');

export default function IntroductionPage() {
  return <TopicPage slug="einfuehrung" />;
}
