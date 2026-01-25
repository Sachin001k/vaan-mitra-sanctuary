import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import tigerImage from "@/assets/tiger.jpg";
import elephantImage from "@/assets/elephant.jpg";
import rhinoImage from "@/assets/rhino.jpg";

const blogPosts = [
  {
    id: 1,
    title: "The Silent War: Understanding Human-Wildlife Conflict",
    excerpt: "As human settlements expand into wildlife corridors, encounters between humans and animals become increasingly common. Here's how we're working to create sustainable coexistence.",
    image: elephantImage,
    category: "Field Notes",
    date: "January 20, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Camera Traps: Eyes in the Forest",
    excerpt: "How technology is revolutionizing wildlife monitoring. Our network of 150+ camera traps provides unprecedented insight into animal behavior and population dynamics.",
    image: tigerImage,
    category: "Technology",
    date: "January 15, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Rhino Conservation: A Success Story",
    excerpt: "From near extinction to a thriving population of over 4,000 individuals. The remarkable comeback of the Greater One-Horned Rhinoceros in India.",
    image: rhinoImage,
    category: "Conservation Stories",
    date: "January 10, 2026",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Community-Based Conservation in Action",
    excerpt: "How local communities are becoming the frontline defenders of wildlife. Stories from the villages around Jim Corbett National Park.",
    image: tigerImage,
    category: "Field Notes",
    date: "January 5, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "The Economics of Conservation",
    excerpt: "Understanding the financial aspects of wildlife protection. How sustainable tourism and alternative livelihoods support conservation efforts.",
    image: elephantImage,
    category: "Insights",
    date: "December 28, 2025",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Climate Change and Wildlife Migration",
    excerpt: "As temperatures rise, wildlife patterns are shifting. What this means for conservation strategies and protected area management.",
    image: rhinoImage,
    category: "Research",
    date: "December 20, 2025",
    readTime: "11 min read",
    featured: false,
  },
];

const categories = [
  { name: "All Posts", count: 24 },
  { name: "Field Notes", count: 8 },
  { name: "Conservation Stories", count: 6 },
  { name: "Technology", count: 5 },
  { name: "Research", count: 3 },
  { name: "Insights", count: 2 },
];

const BlogPage = () => {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
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
            <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6">
              Tracks & Tales
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Field notes, conservation stories, and insights from our work 
              protecting India's wildlife.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 px-6 bg-jungle-darkest">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl text-ivory mb-8">Featured Stories</h2>
          
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
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jungle-darkest via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-jungle-amazon text-ivory text-xs font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-xl text-ivory mb-3 group-hover:text-jungle-canopy transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 mt-4 text-jungle-canopy text-sm font-medium hover:gap-4 transition-all"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 px-6 bg-jungle-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <h3 className="font-semibold text-ivory uppercase tracking-wider text-sm mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button className="w-full text-left px-4 py-3 bg-jungle-deep hover:bg-jungle-medium transition-colors flex justify-between items-center">
                        <span className="text-sm text-ivory">{cat.name}</span>
                        <span className="text-xs text-muted-foreground">{cat.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card-jungle group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag size={12} className="text-jungle-canopy" />
                        <span className="text-xs text-jungle-canopy uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-lg text-ivory mb-2 group-hover:text-jungle-canopy transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="btn-ghost">
                  Load More Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
