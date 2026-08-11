import type { ReactNode } from 'react';

import {
  bbcodePlainText,
  parseBbcode,
  safeBbcodeColor,
  safeBbcodeImageUrl,
  safeBbcodeSize,
  safeBbcodeUrl,
  type BbNode,
  type BbTagNode,
} from '@/lib/bbcode';

function textWithBreaks(value: string, key: string): ReactNode {
  const parts = value.split('\n');
  return parts.map((part, index) => (
    <span key={`${key}-${index}`}>
      {part}
      {index < parts.length - 1 && <br />}
    </span>
  ));
}

function renderNodes(nodes: BbNode[], path = 'bb'): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${path}-${index}`;

    if (node.type === 'text') {
      return <span key={key}>{textWithBreaks(node.value, key)}</span>;
    }

    const children = renderNodes(node.children, key);

    switch (node.name) {
      case 'b':
        return <strong key={key}>{children}</strong>;
      case 'i':
        return <em key={key}>{children}</em>;
      case 'u':
        return <u key={key}>{children}</u>;
      case 's':
        return <s key={key}>{children}</s>;
      case 'quote':
        return (
          <blockquote key={key} className="bb-quote">
            {node.param && <cite>{node.param}</cite>}
            {children}
          </blockquote>
        );
      case 'code':
        return (
          <pre key={key} className="bb-code">
            <code>{bbcodePlainText(node.children)}</code>
          </pre>
        );
      case 'url': {
        const href = safeBbcodeUrl(
          node.param || bbcodePlainText(node.children),
        );
        return href ? (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {children}
          </a>
        ) : (
          <span key={key}>{children}</span>
        );
      }
      case 'img': {
        const src = safeBbcodeImageUrl(
          bbcodePlainText(node.children).trim(),
        );
        return src ? (
          <figure key={key} className="bb-image-wrap">
            <img
              className="bb-image"
              src={src}
              alt={node.param || 'Изображение пользователя'}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {node.param && <figcaption>{node.param}</figcaption>}
          </figure>
        ) : (
          <span key={key} className="bb-invalid">
            [Изображение недоступно]
          </span>
        );
      }
      case 'color': {
        const color = safeBbcodeColor(node.param);
        if (!color) return <span key={key}>{children}</span>;

        if (color.startsWith('#')) {
          return (
            <span key={key} style={{ color }}>
              {children}
            </span>
          );
        }

        return (
          <span
            key={key}
            className={`bb-color bb-color-${color}`}
          >
            {children}
          </span>
        );
      }
      case 'size': {
        const size = safeBbcodeSize(node.param);
        if (!size) return <span key={key}>{children}</span>;

        if (size.endsWith('px')) {
          return (
            <span key={key} style={{ fontSize: size }}>
              {children}
            </span>
          );
        }

        return (
          <span
            key={key}
            className={`bb-size bb-size-${size}`}
          >
            {children}
          </span>
        );
      }
      case 'spoiler':
        return (
          <details key={key} className="bb-spoiler">
            <summary>{node.param || 'Скрытый текст'}</summary>
            <div>{children}</div>
          </details>
        );
      case 'list':
        return (
          <ul key={key} className="bb-list">
            {node.children
              .filter(
                (child): child is BbTagNode =>
                  child.type === 'tag' && child.name === '*',
              )
              .map((child, childIndex) => (
                <li key={`${key}-li-${childIndex}`}>
                  {renderNodes(
                    child.children,
                    `${key}-li-${childIndex}`,
                  )}
                </li>
              ))}
          </ul>
        );
      case '*':
        return <li key={key}>{children}</li>;
      case 'h2':
        return <h2 key={key}>{children}</h2>;
      case 'h3':
        return <h3 key={key}>{children}</h3>;
      default:
        return <span key={key}>{children}</span>;
    }
  });
}

export function BbcodeContent({
  source,
  className = '',
}: {
  source: string;
  className?: string;
}) {
  return (
    <div className={`bbcode-content ${className}`.trim()}>
      {renderNodes(parseBbcode(source))}
    </div>
  );
}
