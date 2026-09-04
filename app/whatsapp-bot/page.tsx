import { TopicPage } from '@/components/marketing/TopicPage';
import { topicMetadata } from '@/lib/topic-pages';

export const metadata = topicMetadata('whatsapp-bot');

export default function WhatsAppBotPage() {
  return <TopicPage slug="whatsapp-bot" />;
}
