import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Clock3, Newspaper } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/PageHeader';
import { CtaSection } from '@/components/CtaSection';
import { blogs } from '@/data/blog';

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

export default function BlogPage() {
  const sortedBlogs = [...blogs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog — Meridian InfoTech Solutions',
    description: 'Helpful guides, tips, and insights from Meridian InfoTech Solutions.',
    url: 'https://www.meridianinfotechsolutions.in/blog/',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: sortedBlogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.meridianinfotechsolutions.in/blog/${blog.slug}/`,
        name: blog.title,
      })),
    },
  };

  return (
    <>
      <Seo
        title="Blog — IT Tips, Guides & Insights"
        description="Read practical IT tips, device guides, and technology insights from Meridian InfoTech Solutions."
        canonicalPath="/blog/"
        jsonLd={jsonLd}
      />

      <PageHeader
        label="Our Blog"
        title={<>Ideas and advice for your <span className="text-gradient">everyday tech</span></>}
        description="Explore practical guides, helpful tips, and insights from our IT team."
        crumbs={[{ label: 'Blog' }]}
      />

      <section className="container-px py-16">
        {sortedBlogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedBlogs.map((blog, index) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                className="h-full"
              >
                <Link
                  to={`/blog/${blog.slug}/`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-ink-900/5 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
                >
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.coverImageAlt || blog.title}
                      className="aspect-[16/9] w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-500/10 via-accent-500/10 to-brand-600/20">
                      <Newspaper className="h-12 w-12 text-brand-500/70" strokeWidth={1.5} />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="chip">{blog.category}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-ink-400 dark:text-ink-500">
                        <Clock3 className="h-3.5 w-3.5" />
                        {blog.readingTime} min read
                      </span>
                    </div>

                    <h2 className="mt-4 text-lg font-700 leading-snug text-ink-900 transition-colors group-hover:text-brand-600 dark:text-ink-50 dark:group-hover:text-brand-400">
                      {blog.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                      {blog.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 dark:border-ink-800">
                      <span className="inline-flex items-center gap-1.5 text-xs text-ink-400 dark:text-ink-500">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-700 text-brand-600 transition-colors group-hover:text-brand-700 dark:text-brand-400 dark:group-hover:text-brand-300">
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-3xl border border-ink-200 bg-white px-6 py-12 text-center shadow-sm dark:border-ink-800 dark:bg-ink-900">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
              <Newspaper className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-xl font-700 text-ink-900 dark:text-ink-50">New articles are on the way</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Our blog articles will appear here as soon as they are published.
            </p>
          </div>
        )}
      </section>

      <CtaSection />
    </>
  );
}
