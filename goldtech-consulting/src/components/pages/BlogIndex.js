import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../shared/Seo';
import PageLayout from './PageLayout';
import { loadBlogPosts } from '../../sanity/loaders';

const LOGO_SWITCH_MS = 2500;
const LOGOS = [
  { src: '/goldtech-logo.svg', key: 'consulting' },
  { src: '/goldtech-marketing-logo.svg', key: 'marketing' }
];

const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consultingFirst, setConsultingFirst] = useState(true);

  useEffect(() => {
    loadBlogPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = setInterval(() => setConsultingFirst((prev) => !prev), LOGO_SWITCH_MS);
    return () => clearInterval(id);
  }, []);

  const leftLogo = consultingFirst ? LOGOS[0] : LOGOS[1];
  const rightLogo = consultingFirst ? LOGOS[1] : LOGOS[0];

  return (
    <PageLayout
      variant="consulting"
      showBackButton
      backFallbackPath="/"
    >
      <Seo
        title="Automation & Marketing Insights | GoldTech"
        description="Short, tactical articles on automation, integration, and marketing strategy to help your business grow."
        path="/blog"
        type="website"
      />
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-navy mb-4">Insights and Playbooks</h1>
          <p className="text-gray-600 max-w-2xl">
            Practical guides on automation, integrations, and marketing growth. Each article includes clear next steps.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2">
          {loading ? (
            <p className="text-gray-600 col-span-2">Loading…</p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition"
              >
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  {post.audience === 'marketing' ? 'Marketing' : 'Consulting'} • {post.readTime}
                </div>
                <h2 className="text-xl font-semibold text-navy mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm">{post.description}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogIndex;
