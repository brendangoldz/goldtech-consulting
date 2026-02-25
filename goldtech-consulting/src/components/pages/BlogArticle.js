import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import Seo from '../shared/Seo';
import PageLayout from './PageLayout';
import NotFoundPage from './NotFoundPage';
import Button from '../shared/Button';
import { getBlogPostBySlug } from '../../sanity/loaders';

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-gray-600 mb-4">{children}</p>,
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-navy mb-3 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-navy mb-2 mt-6">{children}</h3>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 space-y-2 text-gray-600 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 space-y-2 text-gray-600 mb-4">{children}</ol>
    )
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>
  }
};

const BlogArticle = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getBlogPostBySlug(slug)
      .then((p) => {
        if (!cancelled) setPost(p);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-busy="true">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  if (!post) {
    return <NotFoundPage variant="consulting" />;
  }

  const variant = post.audience === 'marketing' ? 'marketing' : 'consulting';
  const hasPortableBody = Array.isArray(post.body) && post.body.length > 0;

  return (
    <PageLayout variant={variant}>
      <Seo
        title={`${post.title} | GoldTech`}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
      />

      <article className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">
            {variant === 'marketing' ? 'Marketing' : 'Consulting'} • {post.readTime}
          </div>
          <h1 className="text-4xl font-bold text-navy mb-4">{post.title}</h1>
          <p className="text-gray-600 text-lg mb-10">{post.intro}</p>

          {hasPortableBody ? (
            <div className="prose-custom">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          ) : (
            post.sections?.map((section) => (
              <section key={section.heading} className="mb-8">
                <h2 className="text-2xl font-semibold text-navy mb-3">{section.heading}</h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={`${section.heading}-p-${index}`} className="text-gray-600 mb-4">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2 text-gray-600">
                    {section.bullets.map((item, index) => (
                      <li key={`${section.heading}-b-${index}`} className="flex items-start gap-3">
                        <span
                          className={`mt-1 h-2 w-2 rounded-full ${
                            variant === 'marketing' ? 'bg-marketing-primary' : 'bg-gold'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))
          )}

          <section className="mt-12 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <p className="text-gray-700 mb-4">{post.cta?.text}</p>
            <div className="flex flex-wrap gap-4">
              <Link to={post.cta?.href ?? '/consulting#contact'}>
                <Button variant={variant === 'marketing' ? 'secondary' : 'primary'}>
                  See how we help
                </Button>
              </Link>
              {post.cta?.secondaryHref && (
                <Link to={post.cta.secondaryHref}>
                  <Button variant="outline">{post.cta.secondaryText || 'Contact'}</Button>
                </Link>
              )}
            </div>
          </section>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogArticle;
