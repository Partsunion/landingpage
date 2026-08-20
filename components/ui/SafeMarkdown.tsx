import { Fragment, type ReactNode } from 'react';

interface SafeMarkdownProps {
    text: string;
    className?: string;
}

/**
 * Tiny, deliberately restricted renderer for chat messages.
 *
 * It supports only the formatting emitted by the bot (bold, italic, inline
 * code, blockquotes and line breaks). Input is always rendered as React text
 * nodes; no HTML parser or `dangerouslySetInnerHTML` is involved, so API/user
 * content cannot create elements, attributes or scriptable URLs.
 */
export function SafeMarkdown({ text, className }: SafeMarkdownProps) {
    const lines = text.split('\n');

    return (
        <div className={className}>
            {lines.map((line, lineIndex) => {
                const isQuote = line.startsWith('> ');
                const content = isQuote ? line.slice(2) : line;
                const rendered = renderInline(content, lineIndex);

                return (
                    <Fragment key={`line-${lineIndex}`}>
                        {isQuote ? (
                            <blockquote className="border-l-2 border-primary/40 pl-3 text-[var(--muted-foreground)] text-sm">
                                {rendered}
                            </blockquote>
                        ) : (
                            rendered
                        )}
                        {lineIndex < lines.length - 1 && !isQuote && <br />}
                    </Fragment>
                );
            })}
        </div>
    );
}

function renderInline(text: string, lineIndex: number): ReactNode[] {
    const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/g);

    return tokens.map((token, tokenIndex) => {
        const key = `${lineIndex}-${tokenIndex}`;
        if (token.startsWith('**') && token.endsWith('**')) {
            return <strong key={key}>{token.slice(2, -2)}</strong>;
        }
        if (token.startsWith('`') && token.endsWith('`')) {
            return (
                <code key={key} className="bg-muted border border-border px-1 py-0.5 rounded text-primary text-xs font-mono">
                    {token.slice(1, -1)}
                </code>
            );
        }
        if (token.startsWith('_') && token.endsWith('_')) {
            return <em key={key}>{token.slice(1, -1)}</em>;
        }
        return <Fragment key={key}>{token}</Fragment>;
    });
}
