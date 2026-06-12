/**
 * FeaturePreview — dispatcher that picks the right visual style for each
 * feature based on `preview.kind`. Keeps the page-level template simple.
 */

import type { FeaturePreviewSpec } from '@/lib/feature-content';
import { PipelinePreview } from './feature-previews/PipelinePreview';
import { ChatPreview } from './feature-previews/ChatPreview';
import { ChartPreview } from './feature-previews/ChartPreview';
import { DocumentPreview } from './feature-previews/DocumentPreview';

export function FeaturePreview({ data }: { data: FeaturePreviewSpec }) {
    switch (data.kind) {
        case 'pipeline': return <PipelinePreview data={data} />;
        case 'chat':     return <ChatPreview data={data} />;
        case 'chart':    return <ChartPreview data={data} />;
        case 'document': return <DocumentPreview data={data} />;
    }
}
