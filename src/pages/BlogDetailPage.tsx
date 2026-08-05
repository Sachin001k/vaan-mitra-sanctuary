import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import supabase from "@/lib/supabaseClient";

const fetchBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("id,title,description,topic,tags,minute_read,published_at,image_url,metadata")
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(value));
};

const stripHtml = (value?: string | null) =>
  (value ? value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", slug ?? ""],
    queryFn: () => fetchBlogBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });

  const tagList = useMemo(() => (blog?.tags && blog.tags.length ? blog.tags : []), [blog?.tags]);
  const metadataEntries = useMemo(() => (blog?.metadata ? Object.entries(blog.metadata) : []), [blog?.metadata]);
  const seoTitle = blog ? `${blog.title} | Tracks & Tales` : "Vann Mitra story";
  const seoDescription = blog
    ? stripHtml(blog.description).slice(0, 160) || "Read conservation dispatches from Vann Mitra."
    : "Dispatches from Vann Mitra Foundation's wildlife patrols.";
  const seoUrl = blog ? `https://vaanmitra.org/blog/${blog.slug}` : "https://vaanmitra.org/blog";
  const seoImage = blog?.image_url ?? "https://vaanmitra.org/logo.png";

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={seoImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
        <link rel="canonical" href={seoUrl} />
      </Helmet>
      <div className="min-h-screen bg-background text-ivory">
      <Navigation />
      <main className="mx-auto max-w-4xl space-y-10 px-6 pb-20 pt-32">
        <div>
          <Link to="/blog" className="text-xs uppercase tracking-[0.5em] text-jungle-canopy inline-flex items-center gap-2">
            <ArrowLeft size={12} /> Back to Stories
          </Link>
        </div>

        <section className="space-y-6 rounded-3xl border border-ivory/20 bg-jungle-darkest/60 p-6 shadow-2xl shadow-jungle-deep/40">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading story…</p>
          ) : error || !blog ? (
            <p className="text-sm text-destructive">Unable to find this story. Please try again.</p>
          ) : (
            <div className="space-y-8">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.5em] text-jungle-canopy">{formatDate(blog.published_at)}</p>
                <h1 className="font-display text-4xl text-ivory">{blog.title}</h1>
                <p className="text-sm text-muted-foreground">{blog.minute_read} min read · {blog.topic}</p>
              </div>

              <div className="space-y-6">
                {blog.image_url ? (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full rounded-2xl border border-jungle-medium bg-jungle-dark object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center rounded-2xl border border-jungle-medium bg-jungle-deep text-sm uppercase tracking-[0.4em]">
                    Image pending
                  </div>
                )}

                <div className="space-y-4">
                  <div
                    className="text-lg leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: blog.description ?? "" }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {tagList.map((tag) => (
                      <span
                        key={`${blog.id}-${tag}`}
                        className="rounded-full border border-jungle-canopy px-3 py-1 text-xs uppercase tracking-[0.4em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  </>
  );
};

export default BlogDetailPage;
