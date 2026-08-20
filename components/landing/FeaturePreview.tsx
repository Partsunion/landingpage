/**
 * FeaturePreview — dispatcher that picks the right visual style for each
 * feature based on `preview.kind`. Keeps the page-level template simple.
 */

import type { FeaturePreviewSpec } from '@/lib/feature-content';
import { PipelinePreview } from './feature-previews/PipelinePreview';

export function FeaturePreview({ data }: { data: FeaturePreviewSpec }) {
    return <PipelinePreview data={data} />;
}
