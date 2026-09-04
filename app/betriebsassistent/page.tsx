import { TopicPage } from '@/components/marketing/TopicPage';
import { topicMetadata } from '@/lib/topic-pages';

export const metadata = topicMetadata('betriebsassistent');

export default function BusinessAssistantPage() {
  return <TopicPage slug="betriebsassistent" />;
}
