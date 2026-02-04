import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../shared/Seo';
import PageLayout from './PageLayout';
import NotFoundPage from './NotFoundPage';
import Button from '../shared/Button';
import { getBlogPostBySlug } from '../../config/blogPosts';

const BlogArticle = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFoundPage variant="consulting" />;
  }

  const variant = post.audience === 'marketing' ? 'marketing' : 'consulting';

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

          {post.sections.map((section) => (
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
          ))}

          <section className="mt-12 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <p className="text-gray-700 mb-4">{post.cta.text}</p>
            <div className="flex flex-wrap gap-4">
              <Link to={post.cta.href}>
                <Button variant={variant === 'marketing' ? 'secondary' : 'primary'}>
                  See how we help
                </Button>
              </Link>
              {post.cta.secondaryHref && (
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
