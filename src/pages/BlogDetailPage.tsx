import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CtaSection } from '@/components/CtaSection';
import { FaqAccordion } from '@/components/FaqAccordion';
import { blogs, getBlogBySlug, type BlogContentBlock } from '@/data/blog';

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function renderRichText(content: string) {
  return content.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={index}>{part}</span>;

    const [, label, href] = match;
    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link
          key={index}
          to={href}
          className="text-brand-600 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          {label}
        </Link>
      );
    }

    if (/^https?:\/\//i.test(href)) {
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          {label}
        </a>
      );
    }

    return <span key={index}>{label}</span>;
  });
}

function ContentBlock({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return block.content ? (
        <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300 sm:text-base">
          {renderRichText(block.content)}
        </p>
      ) : null;

    case 'list': {
      if (block.items.length === 0) return null;
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <div>
          {block.heading && (
            <h3 className="mb-3 text-sm font-700 text-ink-900 dark:text-ink-50">{block.heading}</h3>
          )}
          <List className={`space-y-3 ${block.ordered ? 'list-decimal pl-5 marker:text-brand-500' : ''}`}>
            {block.items.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className={block.ordered
                  ? 'pl-1 text-sm text-ink-700 dark:text-ink-200'
                  : 'flex items-start gap-3 text-sm text-ink-700 dark:text-ink-200'}
              >
                {!block.ordered && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />}
                <span>{renderRichText(item)}</span>
              </li>
            ))}
          </List>
        </div>
      );
    }

    case 'cards':
      return block.items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((card, index) => (
            <div
              key={`${card.heading}-${index}`}
              className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm dark:border-ink-800 dark:bg-ink-900"
            >
              <h3 className="text-sm font-700 text-ink-900 dark:text-ink-50">{card.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{renderRichText(card.text)}</p>
            </div>
          ))}
        </div>
      ) : null;

    case 'table':
      return (
        <div className="overflow-x-auto rounded-2xl border border-ink-200 dark:border-ink-800">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            {block.caption && (
              <caption className="bg-ink-100/70 px-4 py-3 text-left font-700 text-ink-800 dark:bg-ink-800 dark:text-ink-100">
                {block.caption}
              </caption>
            )}
            <thead className="bg-ink-100/70 dark:bg-ink-800">
              <tr>
                {block.headers.map((header, index) => (
                  <th key={`${header}-${index}`} scope="col" className="border-b border-ink-200 px-4 py-3 font-700 text-ink-800 dark:border-ink-700 dark:text-ink-100">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white dark:bg-ink-900">
                  {block.headers.map((_, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 align-top text-ink-600 dark:text-ink-300">
                      {renderRichText(row[cellIndex] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'faq':
      return block.items.length > 0 ? (
        <FaqAccordion items={block.items.map((item) => ({ q: item.question, a: item.answer }))} />
      ) : null;

    case 'callout':
      return block.content ? (
        <aside className="rounded-2xl border border-brand-200 bg-brand-500/5 p-5 dark:border-brand-800">
          {block.title && <h3 className="text-sm font-700 text-ink-900 dark:text-ink-50">{block.title}</h3>}
          <p className="mt-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{renderRichText(block.content)}</p>
        </aside>
      ) : null;

    case 'quote':
      return (
        <figure className="border-l-4 border-brand-500 py-1 pl-5">
          <blockquote className="text-lg font-600 leading-relaxed text-ink-800 dark:text-ink-100">
            {renderRichText(block.content)}
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-3 text-sm text-ink-500 dark:text-ink-400">{block.attribution}</figcaption>
          )}
        </figure>
      );

    case 'heading': {
      const Heading = block.level === 4 ? 'h4' : 'h3';
      return (
        <Heading className="text-xl font-700 text-ink-900 dark:text-ink-50">
          {block.content}
        </Heading>
      );
    }

    case 'image':
      return (
        <figure>
          <img src={block.src} alt={block.alt} className="w-full rounded-2xl object-cover" loading="lazy" />
          {block.caption && (
            <figcaption className="mt-2 text-center text-xs text-ink-500 dark:text-ink-400">{block.caption}</figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? getBlogBySlug(slug) : undefined;

  if (!blog) {
    return <Navigate to="/blog/" replace />;
  }

  const description = blog.metaDescription || blog.excerpt;
  const title = blog.metaTitle || blog.title;
  const sameCategoryBlogs = blogs.filter(
    (post) => post.slug !== blog.slug && post.category === blog.category,
  );
  const otherBlogs = blogs.filter(
    (post) => post.slug !== blog.slug && post.category !== blog.category,
  );
  const relatedBlogs = [
    ...sameCategoryBlogs.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    ...otherBlogs.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  ]
    .slice(0, 3);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    mainEntityOfPage: `https://www.meridianinfotechsolutions.in/blog/${blog.slug}/`,
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonicalPath={`/blog/${blog.slug}/`}
        ogType="article"
        jsonLd={jsonLd}
      />

      <article>
        <header className="relative overflow-hidden border-b border-ink-200 dark:border-ink-800">
          <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-40 dark:bg-grid-dark" />
          <div className="container-px relative py-12 sm:py-16">
            <Breadcrumbs crumbs={[{ label: 'Blog', to: '/blog/' }, { label: blog.title }]} />
            <div className="mx-auto mt-8 max-w-4xl">
              <span className="chip">{blog.category}</span>
              <h1 className="mt-4 text-balance font-display text-3xl font-700 leading-tight text-ink-900 dark:text-ink-50 sm:text-4xl lg:text-5xl">
                {blog.title}
              </h1>
              <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-ink-600 dark:text-ink-300 sm:text-lg">
                {blog.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500 dark:text-ink-400">
                <span>By {blog.author}</span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {blog.readingTime} min read
                </span>
                {blog.updatedAt && blog.updatedAt !== blog.publishedAt && (
                  <span>Updated {formatDate(blog.updatedAt)}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {blog.coverImage && (
          <div className="container-px pt-10">
            <img
              src={blog.coverImage}
              alt={blog.coverImageAlt || blog.title}
              className="mx-auto max-h-[34rem] w-full max-w-5xl rounded-3xl object-cover"
            />
          </div>
        )}

        <div className="container-px py-12 sm:py-16">
          <div className="mx-auto max-w-4xl space-y-12">
            {blog.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-5">
                {section.title && (
                  <h2 className="text-2xl font-700 leading-tight text-ink-900 dark:text-ink-50 sm:text-3xl">
                    {section.title}
                  </h2>
                )}
                <div className="space-y-5">
                  {section.blocks.map((block, index) => (
                    <ContentBlock key={`${section.id}-${block.type}-${index}`} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>

      {relatedBlogs.length > 0 && (
        <section className="container-px pb-16" aria-labelledby="related-blogs-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Keep reading</p>
              <h2
                id="related-blogs-title"
                className="mt-2 text-2xl font-700 text-ink-900 dark:text-ink-50 sm:text-3xl"
              >
                Related articles
              </h2>
            </div>
            <Link
              to="/blog/"
              className="inline-flex items-center gap-1.5 text-sm font-700 text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
              >
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    className="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-brand-500/10 via-accent-500/10 to-brand-600/20" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className="chip self-start">{post.category}</span>
                  <h3 className="mt-3 text-base font-700 leading-snug text-ink-900 transition-colors group-hover:text-brand-600 dark:text-ink-50 dark:group-hover:text-brand-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-700 text-brand-600 dark:text-brand-400">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
