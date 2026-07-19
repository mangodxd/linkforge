import { z } from "zod";

const fileSchema = z.instanceof(File);

export const FORM_VALIDATIONS = {
  pageForm: z.object({
    title: z.string().min(1, "Title is required").max(100, "Title too long"),
    slug: z
      .string()
      .min(3, "Slug must be at least 3 characters")
      .max(50, "Slug too long")
      .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z.string().max(500, "Description too long").optional(),
    theme: z.enum(["minimal", "dark", "light", "nature", "ocean", "sunset"]),
    avatar: fileSchema.optional(),
    cover: fileSchema.optional(),
  }),

  headerBlockForm: z.object({
    name: z.string().max(100, "Name too long"),
    headline: z.string().max(200, "Headline too long").optional(),
    bio: z.string().max(500, "Bio too long").optional(),
    avatar: fileSchema.optional(),
  }),

  buttonBlockForm: z.object({
    label: z.string().max(100, "Label too long"),
    url: z.string().url("Must be a valid URL"),
    icon: z.string().max(50, "Icon name too long").optional(),
    newTab: z.boolean(),
  }),

  textBlockForm: z.object({
    content: z.string().min(1, "Content is required").max(5000, "Content too long"),
  }),

  imageBlockForm: z.object({
    alt: z.string().max(200, "Alt text too long").optional(),
    file: fileSchema,
  }),

  galleryBlockForm: z.object({
    files: z.array(fileSchema).min(1, "At least one image required").max(12, "Maximum 12 images"),
  }),

  videoBlockForm: z.object({
    source: z.enum(["youtube", "vimeo"]),
    videoId: z.string().min(1, "Video ID required"),
    title: z.string().max(200, "Title too long").optional(),
  }),

  dividerBlockForm: z.object({
    style: z.enum(["solid", "dashed", "gradient"]),
    color: z.string().optional(),
    thickness: z.enum(["thin", "medium", "thick"]).optional(),
  }),

  socialLinksBlockForm: z.object({
    platforms: z.array(
      z.object({
        platform: z.enum(["github", "twitter", "linkedin", "youtube", "instagram", "tiktok", "discord", "website", "email"]),
        url: z.string().url("Must be a valid URL").optional(),
        username: z.string().max(50, "Username too long").optional(),
      })
    ),
  }),
};

export type PageFormType = z.infer<typeof FORM_VALIDATIONS.pageForm>;
export type HeaderBlockFormType = z.infer<typeof FORM_VALIDATIONS.headerBlockForm>;
export type ButtonBlockFormType = z.infer<typeof FORM_VALIDATIONS.buttonBlockForm>;
export type TextBlockFormType = z.infer<typeof FORM_VALIDATIONS.textBlockForm>;
export type ImageBlockFormType = z.infer<typeof FORM_VALIDATIONS.imageBlockForm>;
export type GalleryBlockFormType = z.infer<typeof FORM_VALIDATIONS.galleryBlockForm>;
export type VideoBlockFormType = z.infer<typeof FORM_VALIDATIONS.videoBlockForm>;
export type DividerBlockFormType = z.infer<typeof FORM_VALIDATIONS.dividerBlockForm>;
export type SocialLinksBlockFormType = z.infer<typeof FORM_VALIDATIONS.socialLinksBlockForm>;
