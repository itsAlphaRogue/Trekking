import { createClient } from "@/lib/supabase/client";

type Bucket = "trek-images" | "region-images";

/**
 * Upload a file to Supabase Storage and return its public URL.
 * Used in the admin image upload components.
 *
 * @param file     - The File object from the input / drop event
 * @param bucket   - "trek-images" or "region-images"
 * @param path     - Storage path e.g. "treks/everest-base-camp/hero.jpg"
 * @returns        - Public URL string or throws on error
 */
export async function uploadImage(
  file: File,
  bucket: Bucket,
  path: string
): Promise<string> {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,           // overwrite if same path
      contentType: file.type,
    });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Build a storage path for a trek image.
 * e.g. "treks/everest-base-camp/hero-1234567890.jpg"
 */
export function trekImagePath(
  slug: string,
  file: File,
  type: "hero" | "gallery" | "card" = "hero"
): string {
  const ext = file.name.split(".").pop() ?? "jpg";
  const ts = Date.now();
  return `treks/${slug}/${type}-${ts}.${ext}`;
}

/**
 * Build a storage path for a region image.
 * e.g. "regions/everest/hero-1234567890.jpg"
 */
export function regionImagePath(
  slug: string,
  file: File,
  type: "hero" | "specialty" = "hero"
): string {
  const ext = file.name.split(".").pop() ?? "jpg";
  const ts = Date.now();
  return `regions/${slug}/${type}-${ts}.${ext}`;
}

/**
 * Delete an image from storage by its public URL.
 * Extracts the path from the URL automatically.
 */
export async function deleteImage(
  publicUrl: string,
  bucket: Bucket
): Promise<void> {
  const supabase = createClient();

  // Extract path from URL: everything after /storage/v1/object/public/{bucket}/
  const marker = `/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return; // not a storage URL — skip

  const path = publicUrl.slice(idx + marker.length);

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) console.error("deleteImage error:", error.message);
}
