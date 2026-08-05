import { useCallback, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const topicChoices = [
  "Ranger Patrols",
  "Community Engagement",
  "Science & Research",
  "Photography & Storytelling",
  "Campaigns & Policy",
  "Other",
] as const;

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
];

type BlogRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  topic: string;
  tags: string[];
  minute_read: number;
  published_at: string;
  image_url: string | null;
  image_path: string | null;
  metadata: Record<string, unknown>;
  status: string;
  created_at: string;
  updated_at: string;
};

const blogSchema = z
  .object({
    title: z.string().min(1, "Please provide a title for the story."),
    description: z.string().min(10, "Add a description that tells what the blog covers."),
    topicChoice: z.enum(topicChoices),
    customTopic: z.string().trim().optional(),
    tags: z.string().optional(),
    minuteRead: z.coerce.number().int().min(1).max(120),
    publishedAt: z.string().optional(),
  })
  .refine(
    (data) => data.topicChoice !== "Other" || Boolean(data.customTopic),
    {
      message: "Please describe the topic when you select Other.",
      path: ["customTopic"],
    },
  );

type BlogFormValues = z.infer<typeof blogSchema>;

const AdminPage = () => {
  const defaultValues = useMemo(
    () => ({
      title: "",
      description: "",
      tags: "",
      minuteRead: 5,
      publishedAt: new Date().toISOString().slice(0, 16),
      topicChoice: topicChoices[0],
      customTopic: "",
    }),
    [],
  );

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  });

  const { toast } = useToast();
  const topicChoiceSelected = form.watch("topicChoice");

  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogRecord | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [existingImageUrl, setExistingImageUrl] = useState<string>();
  const [existingImagePath, setExistingImagePath] = useState<string>();
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  const resetEditor = () => {
    form.reset({
      ...defaultValues,
      publishedAt: new Date().toISOString().slice(0, 16),
    });
    setSelectedImage(null);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(undefined);
    setExistingImageUrl(undefined);
    setExistingImagePath(undefined);
    setEditingBlog(null);
    setStatus("");
    setTagList([]);
    setTagInput("");
    form.setValue("tags", "");
  };

  const addTag = (value: string) => {
    const normalized = value.trim();
    if (!normalized) {
      return;
    }
    setTagList((prev) => {
      if (prev.includes(normalized)) {
        return prev;
      }
      const next = [...prev, normalized];
      form.setValue("tags", next.join(", "));
      return next;
    });
  };

  const removeTag = (tag: string) => {
    setTagList((prev) => {
      const next = prev.filter((existing) => existing !== tag);
      form.setValue("tags", next.join(", "));
      return next;
    });
  };

  const openModalForNewBlog = () => {
    resetEditor();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetEditor();
  };

  const fetchBlogs = useCallback(async () => {
    setLoadingBlogs(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      toast({
        title: "Unable to load stories",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setBlogs(data ?? []);
    }

    setLoadingBlogs(false);
  }, [toast]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleEditBlog = (blog: BlogRecord) => {
    const derivedTopicChoice = topicChoices.includes(blog.topic as (typeof topicChoices)[number])
      ? (blog.topic as (typeof topicChoices)[number])
      : "Other";

    form.reset({
      title: blog.title,
      description: blog.description,
      tags: blog.tags.join(", "),
      minuteRead: blog.minute_read,
      publishedAt: new Date(blog.published_at).toISOString().slice(0, 16),
      topicChoice: derivedTopicChoice,
      customTopic: derivedTopicChoice === "Other" ? blog.topic : "",
    });

    setEditingBlog(blog);
    setExistingImageUrl(blog.image_url ?? undefined);
    setExistingImagePath(blog.image_path ?? undefined);
    setSelectedImage(null);
    setPreviewUrl(blog.image_url ?? undefined);
    setStatus("");
    setTagList(blog.tags);
    setTagInput("");
    form.setValue("tags", blog.tags.join(", "));
    setIsModalOpen(true);
  };

  const handleDeleteBlog = async (blog: BlogRecord) => {
    if (!window.confirm(`Delete “${blog.title}”? This action cannot be undone.`)) {
      return;
    }

    const { error } = await supabase.from("blogs").delete().eq("id", blog.id);
    if (error) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Story removed", description: `“${blog.title}” was deleted.` });
    fetchBlogs();
  };

  const setImageFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      if (previewUrl && previewUrl !== existingImageUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setSelectedImage(file);
      setExistingImageUrl(undefined);
      setExistingImagePath(undefined);
      setPreviewUrl(URL.createObjectURL(file));
    },
    [existingImageUrl, previewUrl],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
      setImageFile(acceptedFiles[0]);
    },
    [setImageFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  const uploadCoverImage = async (image: File) => {
    const filename = (() => {
      const extension = image.name.split(".").pop()?.toLowerCase() ?? "bin";
      const randomId = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
      return `${randomId}.${extension}`;
    })();

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filename, image, {
        cacheControl: "3600",
        upsert: false,
        contentType: image.type || "application/octet-stream",
      });

    if (uploadError || !uploadData?.path) {
      throw uploadError ?? new Error("Failed to upload the hero image.");
    }

    const { data: publicUrlData, error: publicUrlError } = await supabase.storage
      .from("blog-images")
      .getPublicUrl(uploadData.path);

    if (publicUrlError) {
      throw publicUrlError;
    }

    return {
      imageUrl: publicUrlData.publicUrl,
      imagePath: uploadData.path,
    };
  };

  const onSubmit: SubmitHandler<BlogFormValues> = async (values) => {
    setIsUploading(true);
    setStatus(editingBlog ? "Updating story…" : "Uploading story…");

    const tags =
      tagList.length > 0
        ? tagList
        : values.tags
        ? values.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [];

    const topic =
      values.topicChoice === "Other"
        ? values.customTopic?.trim() || "Other"
        : values.topicChoice;

    const publishedAt = values.publishedAt ? new Date(values.publishedAt) : new Date();
    let imageUrl = existingImageUrl;
    let imagePath = existingImagePath;

    try {
      if (selectedImage) {
        setStatus("Uploading new cover image…");
        const upload = await uploadCoverImage(selectedImage);
        imageUrl = upload.imageUrl;
        imagePath = upload.imagePath;
      }

      const payload = {
        title: values.title,
        description: values.description,
        topic,
        tags,
        minute_read: values.minuteRead,
        published_at: publishedAt.toISOString(),
        image_url: imageUrl,
        image_path: imagePath,
        metadata: editingBlog
          ? { ...editingBlog.metadata, updated_by: "admin-ui" }
          : { created_by: "admin-ui", status: "draft" },
        status: editingBlog?.status ?? "draft",
      };

      if (editingBlog) {
        const { error } = await supabase
          .from("blogs")
          .update(payload)
          .eq("id", editingBlog.id);

        if (error) {
          throw error;
        }

        toast({
          title: "Story updated",
          description: "Changes were saved to Supabase.",
        });
      } else {
        const { error } = await supabase.from("blogs").insert(payload);
        if (error) {
          throw error;
        }

        toast({
          title: "Story created",
          description: "The new blog entry was added to Supabase.",
        });
      }

      fetchBlogs();
      closeModal();
    } catch (error) {
      console.error(error);
      toast({
        title: "Unable to save",
        description: (error as Error)?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setStatus("");
    }
  };

  const blogListSection = (
    <section className="rounded-3xl border border-ivory/10 bg-background/70 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-jungle-canopy">Stories</p>
          <h2 className="text-2xl font-semibold">Manage published entries</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          {blogs.length} {blogs.length === 1 ? "story" : "stories"}
        </p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-jungle-medium/30 bg-jungle-dark/30 shadow-lg">
        {loadingBlogs ? (
          <div className="px-6 py-10 text-center text-sm text-muted-foreground">Loading stories…</div>
        ) : (
          <table className="min-w-full divide-y divide-jungle-medium/40 text-sm">
            <thead className="bg-jungle-dark/80 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Topic / tags</th>
                <th className="px-4 py-3 text-left">Published</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-jungle-medium/40 bg-background">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    Ready when you are — click “Add a blog” to publish the first story.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-foreground">{blog.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{blog.description}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-foreground">{blog.topic}</p>
                      <p className="text-xs text-muted-foreground">
                        {blog.tags.join(", ") || "no tags"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {new Date(blog.published_at).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditBlog(blog)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive "
                          onClick={() => handleDeleteBlog(blog)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );

  const blogFormDialog = (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        } else {
          setIsModalOpen(true);
        }
      }}
    >
      <DialogContent className="max-w-[min(95vw,900px)] max-h-[85vh] overflow-hidden bg-green-900 text-white ">
        <DialogHeader>
          <DialogTitle>{editingBlog ? "Update story" : "Add a blog"}</DialogTitle>
          <DialogDescription>
            Provide the story details, upload a cover image, and schedule when it should appear on the site.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto pr-2">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Story title</FormLabel>
                      <FormControl>
                        <Input placeholder="Animals, habitat, or action" {...field} />
                      </FormControl>
                      <FormDescription>
                        Make this hook short but vivid so readers know what to expect.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topicChoice"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Topic / beat</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {topicChoices.map((topic) => (
                              <SelectItem key={topic} value={topic}>
                                {topic}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select a curated topic (or choose Other to describe it yourself).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minuteRead"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated read time (minutes)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min={1} max={120} step={1} />
                      </FormControl>
                      <FormDescription>Helps readers plan their time.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publish date</FormLabel>
                      <FormControl>
                        <Input {...field} type="datetime-local" />
                      </FormControl>
                      <FormDescription>Store a timestamp for scheduling or filtering.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Tags / keywords</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Community, camera-traps, forest"
                          value={tagInput}
                          onChange={(event) => {
                            setTagInput(event.target.value);
                            field.onChange(event);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addTag(tagInput);
                              setTagInput("");
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Press Enter to turn each keyword into a tag.
                      </FormDescription>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {tagList.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-2 rounded-full border border-green-700 bg-green-900 px-3 py-1 text-xs font-semibold text-emerald-100"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="rounded-full border border-emerald-100/40 bg-emerald-200/10 px-1 text-[10px] font-bold text-emerald-100 transition hover:bg-emerald-200/20"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {topicChoiceSelected === "Other" && (
                <FormField
                  control={form.control}
                  name="customTopic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe the topic</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the custom topic" {...field} />
                      </FormControl>
                      <FormDescription>
                        This text becomes the stored topic for the blog entry.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      modules={quillModules}
                      formats={quillFormats}
                      className="min-h-[200px] rounded-lg bg-white text-slate-900"
                    />
                  </FormControl>
                  <FormDescription>Describe the story with rich text; the HTML will be published as-is.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

              <div>
                <p className="text-sm font-semibold text-jungle-canopy">Cover image</p>
                <p className="text-sm text-foreground/70">
                  Drag & drop or click to choose an image (PNG, JPG, or WebP).
                </p>
                <div
                  {...getRootProps()}
                  className={cn(
                    "mt-3 flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-slate-900/40 px-4 text-center text-sm transition-all",
                    isDragActive ? "border-jungle-canopy/70 bg-jungle-canopy/5" : "border-input/40",
                  )}
                >
                  <input {...getInputProps()} />
                  <p className="text-foreground/60">Drop one image or click to browse</p>
                  <p className="text-xs text-foreground/40">PNG, JPG, WebP (max 10 MB recommended)</p>
                </div>

                {previewUrl && (
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-xl border border-ivory/30">
                      <img src={previewUrl} alt="cover preview" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      {selectedImage ? (
                        <>
                          <p className="text-sm font-semibold">{selectedImage.name}</p>
                          <p className="text-xs text-foreground/70">
                            {selectedImage.type} · {(selectedImage.size / 1024).toFixed(1)} KB
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-semibold">Stored cover image preview</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button variant="ghost" type="button" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (editingBlog ? "Updating story…" : "Saving story…") : editingBlog ? "Update story" : "Create blog entry"}
              </Button>
            </div>
            {status && (
              <p className="text-sm text-foreground/70" aria-live="polite">
                {status}
              </p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-jungle-deep/60 to-black text-ivory">
      <Navigation />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-28">
        <section className="rounded-3xl border border-ivory/10 bg-background/70 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-jungle-canopy">Admin studio</p>
              <h1 className="text-3xl font-semibold">Story control</h1>
              <p className="text-sm text-muted-foreground">
                Upload new stories, refresh entries, and keep the site up to date from here.
              </p>
            </div>
            <div>
              <Button size="sm" onClick={openModalForNewBlog}>
                Add a blog
              </Button>
            </div>
          </div>
        </section>
        {blogListSection}
      </main>
      <Footer />
      {blogFormDialog}
    </div>
  );
};

export default AdminPage;
