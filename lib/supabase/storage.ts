type Bucket = "trek-images" | "region-images";

/**
 * Upload a file via the server-side API route.
 * This bypasses client-side RLS issues by using the Service Role on the server.
 */
export async function uploadImage(
  file: File,
  bucket: Bucket,
  path: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucket);
  formData.append("path", path);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return data.publicUrl;
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
 * Delete an image from storage via the server-side API route.
 */
export async function deleteImage(
  publicUrl: string,
  bucket: Bucket
): Promise<void> {
  const res = await fetch("/api/admin/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicUrl, bucket }),
  });

  if (!res.ok) {
    const data = await res.json();
    console.error("deleteImage error:", data.error || "Deletion failed");
  }
}
