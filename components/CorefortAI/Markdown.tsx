import { Fragment, type ReactNode } from "react";

/**
 * Tiny, dependency-free renderer for the subset of Markdown the assistant uses:
 * paragraphs, "-" / "1." lists, **bold**, and links. Output is built from React nodes
 * (never dangerouslySetInnerHTML), and link targets are restricted to a safe allow-list.
 */

const SAFE_HREF = /^(\/[A-Za-z0-9\-._~/#?=&%]*|tel:\+?[0-9]{5,20}|mailto:[^\s<>"']+@[^\s<>"']+)$/;

function inline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${keyBase}-b${i}`}>{token.slice(2, -2)}</strong>);
    } else {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token)!;
      nodes.push(
        SAFE_HREF.test(m[2]) ? (
          <a key={`${keyBase}-a${i}`} href={m[2]} className="font-semibold text-hero-primary underline underline-offset-2">
            {m[1]}
          </a>
        ) : (
          m[1]
        ),
      );
    }
    last = match.index + token.length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      const k = `p${blocks.length}`;
      blocks.push(
        <p key={k}>
          {para.map((l, idx) => (
            <Fragment key={idx}>
              {idx > 0 && <br />}
              {inline(l, `${k}-${idx}`)}
            </Fragment>
          ))}
        </p>,
      );
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      const k = `l${blocks.length}`;
      const Tag = list.ordered ? "ol" : "ul";
      blocks.push(
        <Tag key={k} className={`${list.ordered ? "list-decimal" : "list-disc"} space-y-1 pl-5`}>
          {list.items.map((it, idx) => (
            <li key={idx}>{inline(it, `${k}-${idx}`)}</li>
          ))}
        </Tag>,
      );
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      flushPara();
      const ordered = !!numbered;
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push((bullet ?? numbered)![1]);
    } else if (line.trim() === "") {
      flushPara();
      flushList();
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();

  return <div className="space-y-2.5">{blocks}</div>;
}
