import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, Tag } from "lucide-react";
import supabase from "@/lib/supabaseClient";

type BlogRecord = {
  id: string;
  title: string;
  description: string;
  topic: string;
  tags: string[] | null;
  minute_read: number;
  published_at: string;
  image_url: string | null;
  slug: string;
  metadata: Record<string, unknown> | null;
};

const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from<BlogRecord>("blogs")
    .select("id,title,description,topic,tags,minute_read,published_at,image_url,slug,metadata")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "Unknown date";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));
};

const BlogPage = () => {
  const heroDescription = "Field notes, patrol recaps, and science updates from Vann Mitra’s wild spaces.";
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    blogs.forEach((blog) => {
      counts.set(blog.topic, (counts.get(blog.topic) ?? 0) + 1);
    });

    return [
      { name: "All Stories", count: blogs.length },
      ...Array.from(counts.entries()).map(([name, count]) => ({ name, count })),
    ];
  }, [blogs]);

  useEffect(() => {
    if (!categories.some((cat) => cat.name === selectedCategory)) {
      setSelectedCategory("All Stories");
    }
  }, [categories, selectedCategory]);

  const featuredPosts = blogs.slice(0, 2);
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All Stories") {
      return blogs;
    }
    return blogs.filter((blog) => blog.topic === selectedCategory);
  }, [blogs, selectedCategory]);

  const tagsForBlog = (blog: BlogRecord) => (blog.tags?.filter(Boolean) as string[]) ?? [];

  return (
    <>
      <Helmet>
        <title>Tracks & Tales | Latest stories from the Vann Mitra Foundation</title>
        <meta name="description" content={heroDescription} />
        <link rel="canonical" href="https://vaanmitra.org/blog" />
        <meta property="og:title" content="Tracks & Tales | Stories from Vann Mitra" />
        <meta property="og:description" content={heroDescription} />
        <meta property="og:url" content="https://vaanmitra.org/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Tracks & Tales | Vann Mitra stories" />
        <meta name="twitter:description" content={heroDescription} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />

      <section className="pt-32 pb-12 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-jungle-canopy uppercase tracking-[0.3em] text-sm mb-4">
              Stories from the Wild
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">Tracks & Tales</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Field notes, conservation stories, and insights from our work protecting India's wildlife.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-ivory">Featured Stories</h2>
            {isLoading && <span className="text-xs text-muted-foreground">Loading...</span>}
            {error && <span className="text-xs text-destructive">Unable to load stories.</span>}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-jungle group overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-jungle-deep text-ivory text-sm uppercase tracking-wider">
                      Image pending
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-jungle-darkest via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-jungle-amazon text-ivory text-xs font-semibold uppercase tracking-wider">
                      {post.topic}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(post.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.minute_read} min read
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-ivory mb-2 transition-colors group-hover:text-jungle-canopy">
                    {post.title}
                  </h3>

                  <div
                    className="text-muted-foreground text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.description ?? "" }}
                  />

                  <div className="flex flex-wrap gap-2">
                    {tagsForBlog(post).map((tag) => (
                      <span
                        key={`${post.id}-${tag}`}
                        className="rounded-full border border-jungle-canopy px-3 py-1 text-xs uppercase tracking-[0.4em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-jungle-canopy text-sm font-medium hover:gap-4 transition-all"
                  >
                    Read More <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </motion.article>
            ))}
            {!featuredPosts.length && !isLoading && (
              <div className="col-span-full text-center text-sm text-muted-foreground">
                No featured stories yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-4">
                <h3 className="font-semibold text-ivory uppercase tracking-wider text-sm">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`w-full text-left px-4 py-3 flex justify-between items-center transition-colors ${
                          selectedCategory === cat.name
                            ? "bg-jungle-amazon text-ivory"
                            : "bg-jungle-deep hover:bg-jungle-medium text-muted-foreground"
                        }`}
                      >
                        <span className="text-sm">{cat.name}</span>
                        <span className="text-xs text-muted-foreground">{cat.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center text-sm text-muted-foreground">Loading stories…</div>
              ) : error ? (
                <div className="text-center text-sm text-destructive">
                  Failed to load stories. Try again later.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="card-jungle group"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        {post.image_url ? (
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-jungle-deep text-ivory text-sm uppercase tracking-wider">
                            Image pending
                          </div>
                        )}
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Tag size={12} className="text-jungle-canopy" />
                          <span className="text-xs text-jungle-canopy uppercase tracking-wider">{post.topic}</span>
                        </div>

                        <h3 className="font-display text-lg text-ivory mb-2 transition-colors group-hover:text-jungle-canopy">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatDate(post.published_at)}</span>
                          <span>{post.minute_read} min read</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {tagsForBlog(post).map((tag) => (
                            <span
                              key={`${post.id}-${tag}`}
                              className="rounded-full border border-jungle-canopy px-3 py-1 text-xs uppercase tracking-[0.4em]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-jungle-canopy text-sm font-medium hover:gap-4 transition-all"
                        >
                          Read Story <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </motion.article>
                  ))}
                  {!filteredPosts.length && (
                    <div className="col-span-full text-center text-sm text-muted-foreground">
                      There are no stories in this category yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </>
);
};

export default BlogPage;
