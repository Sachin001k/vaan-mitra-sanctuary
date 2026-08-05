-- ==========================================
-- 1. POLICIES FOR THE 'blogs' TABLE
-- ==========================================

-- Allow anyone to read blogs
CREATE POLICY "Allow public read access to blogs" 
ON public.blogs FOR SELECT 
USING ( true );

-- Allow anyone to create blogs (even without login/signup)
CREATE POLICY "Allow public insert to blogs" 
ON public.blogs FOR INSERT 
WITH CHECK ( true );

-- Allow anyone to update blogs (optional, add if needed)
CREATE POLICY "Allow public update to blogs" 
ON public.blogs FOR UPDATE 
USING ( true );


-- ==========================================
-- 2. POLICIES FOR THE 'blog-images' BUCKET
-- ==========================================

-- Ensure the bucket exists and is set to PUBLIC
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view images in the bucket
CREATE POLICY "Allow public read access to blog-images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

-- Allow anyone to upload images to the bucket (even without login/signup)
CREATE POLICY "Allow public upload to blog-images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog-images' );

-- Allow anyone to update images in the bucket
CREATE POLICY "Allow public update to blog-images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog-images' );
