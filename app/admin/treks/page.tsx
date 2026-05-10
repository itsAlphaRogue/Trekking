"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadImage, trekImagePath, deleteImage } from "@/lib/supabase/storage";

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewMode = "grid" | "list";
type Difficulty = "Easy" | "Moderate" | "Strenuous" | "Challenging" | "Remote";

const DIFFICULTIES: Difficulty[] = ["Easy", "Moderate", "Strenuous", "Challenging", "Remote"];

interface RegionOption {
  value: string;
  label: string;
}

interface TrekRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  tagline: string | null;
  region_slug: string;
  region_label: string | null;
  duration: number;
  difficulty: string;
  price_from: number;
  image: string | null;
  hero_image: string | null;
  max_altitude: string | null;
  group_size: string | null;
  next_departure: string | null;
  guide_name: string | null;
  guide_title: string | null;
  guide_image: string | null;
  guide_quote: string | null;
  avg_temp: string | null;
  wind_speed: string | null;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
}

interface ItineraryRow {
  id: string;
  trek_id: string;
  day: string;
  title: string;
  description: string | null;
  is_collapsed: boolean;
  sort_order: number;
}

interface GalleryRow {
  id: string;
  trek_id: string;
  src: string;
  alt: string | null;
  span: string;
  sort_order: number;
}

const diffBadge: Record<string, string> = {
  Easy: "bg-secondary-container text-on-secondary-fixed-variant",
  Moderate: "bg-primary-fixed text-on-primary-fixed-variant",
  Strenuous: "bg-primary text-on-primary",
  Challenging: "bg-tertiary-container text-on-tertiary-container",
  Remote: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
};

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

function DeleteDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-surface rounded-lg border border-outline-variant shadow-xl p-8 max-w-sm w-full">
        <div className="w-12 h-12 bg-error-container rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-error">delete_forever</span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-on-surface text-center mb-2">{title}</h3>
        <p className="text-sm text-on-surface-variant text-center font-sans mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-outline-variant text-on-surface-variant rounded px-4 py-2.5 text-sm font-semibold font-sans hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-error text-on-error rounded px-4 py-2.5 text-sm font-semibold font-sans hover:opacity-90 transition-opacity"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Image Uploader ──────────────────────────────────────────────────────────

function ImageUploader({
  label,
  value,
  onChange,
  slug,
  bucket,
  imageType,
  maxMb,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  slug: string;
  bucket: "trek-images";
  imageType: "hero" | "gallery" | "card";
  maxMb?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const MAX_MB = maxMb ?? 5;
  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!ACCEPTED.includes(file.type)) {
        setError("Only JPG, PNG, or WebP files are accepted.");
        return;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`File must be under ${MAX_MB}MB.`);
        return;
      }
      setUploading(true);
      try {
        const path = trekImagePath(slug, file, imageType);
        const publicUrl = await uploadImage(file, bucket, path);
        onChange(publicUrl);
      } catch (err: any) {
        setError(err.message ?? "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange, slug, bucket, imageType, MAX_MB, ACCEPTED],
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const clear = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value) {
      try { await deleteImage(value, bucket); } catch {}
    }
    onChange("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">{label}</label>

      {value ? (
        <div className="relative rounded overflow-hidden bg-surface-container group">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-inverse-surface/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 bg-surface text-on-surface px-4 py-2 rounded text-xs font-semibold font-sans hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-base">swap_horiz</span>
              Replace
            </button>
            <button
              type="button"
              onClick={clear}
              className="flex items-center gap-2 bg-error text-on-error px-4 py-2 rounded text-xs font-semibold font-sans hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-base">delete</span>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={`w-full border-2 border-dashed rounded transition-colors flex flex-col items-center justify-center py-10 gap-3 cursor-pointer ${
            dragOver
              ? "border-primary bg-primary-fixed/20"
              : "border-outline-variant bg-surface-container-low hover:border-primary hover:bg-surface-container"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            dragOver ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"
          }`}>
            <span className="material-symbols-outlined text-2xl">
              {uploading ? "hourglass_top" : dragOver ? "file_download" : "cloud_upload"}
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-on-surface font-sans">
              {uploading ? "Uploading…" : dragOver ? "Drop to upload" : "Drag & drop or click to upload"}
            </p>
            <p className="text-xs text-on-surface-variant font-sans mt-1">JPG, PNG, WebP · Max {MAX_MB}MB</p>
          </div>
        </button>
      )}

      <input ref={inputRef} type="file" accept={ACCEPTED.join(",")} className="hidden" onChange={handleInput} />

      {error && (
        <p className="text-xs text-error mt-2 font-sans flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Trek Drawer ─────────────────────────────────────────────────────────────

type DrawerTab = "content" | "details" | "guide" | "itinerary" | "gallery";

function TrekDrawer({
  initial,
  regions,
  onSave,
  onClose,
}: {
  initial: TrekRow | null;
  regions: RegionOption[];
  onSave: (data: TrekRow) => Promise<void>;
  onClose: () => void;
}) {
  const isEdit = !!initial;
  const supabase = createClient();

  const emptyTrek = (): TrekRow => ({
    id: "",
    slug: "",
    title: "",
    description: "",
    tagline: null,
    region_slug: regions[0]?.value ?? "everest",
    region_label: regions[0]?.label ?? "Everest Region",
    duration: 7,
    difficulty: "Moderate",
    price_from: 1000,
    image: null,
    hero_image: null,
    max_altitude: null,
    group_size: null,
    next_departure: null,
    guide_name: null,
    guide_title: null,
    guide_image: null,
    guide_quote: null,
    avg_temp: null,
    wind_speed: null,
    is_published: true,
    is_featured: false,
    sort_order: 0,
  });

  const [form, setForm] = useState<TrekRow>(initial ?? emptyTrek());
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [tab, setTab] = useState<DrawerTab>("content");
  const [saving, setSaving] = useState(false);

  // Itinerary state
  const [itinerary, setItinerary] = useState<ItineraryRow[]>([]);
  const [itinLoading, setItinLoading] = useState(false);

  // Gallery state
  const [gallery, setGallery] = useState<GalleryRow[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  useEffect(() => {
    if (!initial?.id) return;

    async function loadChildren() {
      setItinLoading(true);
      setGalleryLoading(true);
      const [itinResult, galResult] = await Promise.all([
        supabase.from("itinerary_days").select("*").eq("trek_id", initial!.id).order("sort_order", { ascending: true }),
        supabase.from("gallery_images").select("*").eq("trek_id", initial!.id).order("sort_order", { ascending: true }),
      ]);
      if (itinResult.data) setItinerary(itinResult.data as ItineraryRow[]);
      if (galResult.data) setGallery(galResult.data as GalleryRow[]);
      setItinLoading(false);
      setGalleryLoading(false);
    }
    loadChildren();
  }, [initial?.id]);

  const set = <K extends keyof TrekRow>(key: K, value: TrekRow[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.duration < 1) e.duration = "Must be at least 1 day";
    if (form.price_from < 1) e.price_from = "Must be a positive amount";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const regionLabel = regions.find((r) => r.value === form.region_slug)?.label ?? form.region_label;
      await onSave({ ...form, region_label: regionLabel });
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: DrawerTab; label: string; icon: string }[] = [
    { key: "content", label: "Content", icon: "article" },
    { key: "details", label: "Details", icon: "info" },
    { key: "guide", label: "Guide", icon: "person" },
    { key: "itinerary", label: "Itinerary", icon: "format_list_numbered" },
    { key: "gallery", label: "Gallery", icon: "collections" },
  ];

  // ─── Itinerary helpers ───
  const addItineraryDay = async () => {
    if (!form.id) return;
    const day: ItineraryRow = {
      id: "",
      trek_id: form.id,
      day: `Day ${itinerary.length + 1}`,
      title: "",
      description: null,
      is_collapsed: false,
      sort_order: itinerary.length,
    };
    const { data, error } = await supabase.from("itinerary_days").insert(day).select().single();
    if (!error && data) setItinerary((prev) => [...prev, data as ItineraryRow]);
  };

  const updateItineraryDay = async (idx: number, updates: Partial<ItineraryRow>) => {
    const day = itinerary[idx];
    if (day.id) {
      await supabase.from("itinerary_days").update(updates).eq("id", day.id);
    }
    setItinerary((prev) => prev.map((d, i) => (i === idx ? { ...d, ...updates } : d)));
  };

  const deleteItineraryDay = async (idx: number) => {
    const day = itinerary[idx];
    if (day.id) await supabase.from("itinerary_days").delete().eq("id", day.id);
    setItinerary((prev) => prev.filter((_, i) => i !== idx));
  };

  // ─── Gallery helpers ───
  const addGalleryImage = async () => {
    if (!form.id) return;
    const img: GalleryRow = {
      id: "",
      trek_id: form.id,
      src: "",
      alt: null,
      span: "normal",
      sort_order: gallery.length,
    };
    const { data, error } = await supabase.from("gallery_images").insert(img).select().single();
    if (!error && data) setGallery((prev) => [...prev, data as GalleryRow]);
  };

  const updateGalleryImage = async (idx: number, updates: Partial<GalleryRow>) => {
    const img = gallery[idx];
    if (img.id) {
      await supabase.from("gallery_images").update(updates).eq("id", img.id);
    }
    setGallery((prev) => prev.map((g, i) => (i === idx ? { ...g, ...updates } : g)));
  };

  const deleteGalleryImage = async (idx: number) => {
    const img = gallery[idx];
    if (img.id) await supabase.from("gallery_images").delete().eq("id", img.id);
    if (img.src) {
      try { await deleteImage(img.src, "trek-images"); } catch {}
    }
    setGallery((prev) => prev.filter((_, i) => i !== idx));
  };

  const onGalleryUpload = async (idx: number, file: File) => {
    const path = trekImagePath(form.slug, file, "gallery");
    const url = await uploadImage(file, "trek-images", path);
    await updateGalleryImage(idx, { src: url });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-xl bg-surface h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer header */}
        <div className="px-8 py-5 border-b border-outline-variant flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              {isEdit ? "Edit Package" : "Add New Package"}
            </h2>
            <p className="text-xs text-on-surface-variant font-sans mt-0.5">
              {isEdit ? `Editing: ${initial!.title}` : "This will appear on the public /treks page"}
            </p>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-outline-variant shrink-0 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              disabled={!isEdit && (t.key === "itinerary" || t.key === "gallery")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widest font-sans transition-colors whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed ${
                tab === t.key
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-sm align-middle mr-1">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* ── CONTENT TAB ── */}
          {tab === "content" && (
            <>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Package Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", autoSlug(e.target.value)); }}
                  placeholder="e.g. Everest Base Camp Trek"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${errors.title ? "border-error text-error" : "border-secondary focus:border-primary"}`}
                />
                {errors.title && <p className="text-xs text-error mt-1 font-sans">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">URL Slug *</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant font-sans shrink-0">/treks/</span>
                  <input
                    value={form.slug}
                    onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="everest-base-camp"
                    className={`flex-1 bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${errors.slug ? "border-error" : "border-secondary focus:border-primary"}`}
                  />
                </div>
                {errors.slug && <p className="text-xs text-error mt-1 font-sans">{errors.slug}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Short Description *</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="A brief summary shown on the treks listing page…"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors resize-none ${errors.description ? "border-error" : "border-secondary focus:border-primary"}`}
                />
                {errors.description && <p className="text-xs text-error mt-1 font-sans">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Tagline</label>
                <input
                  value={form.tagline ?? ""}
                  onChange={(e) => set("tagline", e.target.value || null)}
                  placeholder="e.g. The world's most iconic trek…"
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Region *</label>
                  <div className="relative">
                    <select
                      value={form.region_slug}
                      onChange={(e) => {
                        set("region_slug", e.target.value);
                        set("region_label", regions.find((r) => r.value === e.target.value)?.label ?? form.region_label);
                      }}
                      className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      {regions.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none text-sm">expand_more</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Difficulty *</label>
                  <div className="relative">
                    <select
                      value={form.difficulty}
                      onChange={(e) => set("difficulty", e.target.value)}
                      className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      {DIFFICULTIES.map((d) => (<option key={d} value={d}>{d}</option>))}
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none text-sm">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Duration (days) *</label>
                  <input
                    type="number" min={1} max={60}
                    value={form.duration}
                    onChange={(e) => set("duration", Number(e.target.value))}
                    className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${errors.duration ? "border-error" : "border-secondary focus:border-primary"}`}
                  />
                  {errors.duration && <p className="text-xs text-error mt-1 font-sans">{errors.duration}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Price From (USD) *</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-on-surface-variant font-sans">$</span>
                    <input
                      type="number" min={1}
                      value={form.price_from}
                      onChange={(e) => set("price_from", Number(e.target.value))}
                      className={`flex-1 bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${errors.price_from ? "border-error" : "border-secondary focus:border-primary"}`}
                    />
                  </div>
                  {errors.price_from && <p className="text-xs text-error mt-1 font-sans">{errors.price_from}</p>}
                </div>
              </div>

              <ImageUploader
                label="Cover Image *"
                value={form.image ?? ""}
                onChange={(url) => set("image", url)}
                slug={form.slug || "new-trek"}
                bucket="trek-images"
                imageType="card"
              />

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) => set("is_published", e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-sans text-on-surface">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => set("is_featured", e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-sans text-on-surface">Featured on Homepage</span>
                </label>
              </div>

              <div className="bg-surface-container-low rounded p-4 border border-outline-variant">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-3 font-sans">Card Preview</p>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {form.difficulty && (
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold font-sans ${diffBadge[form.difficulty]}`}>
                          {form.difficulty.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="font-serif text-sm font-semibold text-primary leading-tight">{form.title || "Package Title"}</p>
                    <p className="text-xs text-on-surface-variant font-sans mt-1 line-clamp-2">{form.description || "Short description will appear here…"}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-outline font-sans">{form.duration} days</p>
                    <p className="text-sm font-semibold text-primary font-sans">${form.price_from.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── DETAILS TAB ── */}
          {tab === "details" && (
            <>
              <ImageUploader
                label="Hero Image (Trek Detail Page)"
                value={form.hero_image ?? ""}
                onChange={(url) => set("hero_image", url)}
                slug={form.slug || "new-trek"}
                bucket="trek-images"
                imageType="hero"
                maxMb={8}
              />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Max Altitude</label>
                  <input
                    value={form.max_altitude ?? ""}
                    onChange={(e) => set("max_altitude", e.target.value || null)}
                    placeholder="e.g. 5,364m"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Group Size</label>
                  <input
                    value={form.group_size ?? ""}
                    onChange={(e) => set("group_size", e.target.value || null)}
                    placeholder="e.g. 2 – 12 People"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Next Departure</label>
                  <input
                    value={form.next_departure ?? ""}
                    onChange={(e) => set("next_departure", e.target.value || null)}
                    placeholder="e.g. 12 Oct 2026"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Sort Order</label>
                  <input
                    type="number" min={0}
                    value={form.sort_order}
                    onChange={(e) => set("sort_order", Number(e.target.value))}
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Avg Temperature</label>
                  <input
                    value={form.avg_temp ?? ""}
                    onChange={(e) => set("avg_temp", e.target.value || null)}
                    placeholder="e.g. -10°C / 14°F"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Wind Speed</label>
                  <input
                    value={form.wind_speed ?? ""}
                    onChange={(e) => set("wind_speed", e.target.value || null)}
                    placeholder="e.g. 15 km/h"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* ── GUIDE TAB ── */}
          {tab === "guide" && (
            <>
              <ImageUploader
                label="Guide Photo"
                value={form.guide_image ?? ""}
                onChange={(url) => set("guide_image", url)}
                slug={form.slug || "new-trek"}
                bucket="trek-images"
                imageType="gallery"
              />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Guide Name</label>
                  <input
                    value={form.guide_name ?? ""}
                    onChange={(e) => set("guide_name", e.target.value || null)}
                    placeholder="e.g. Lhakpa Sherpa"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Guide Title</label>
                  <input
                    value={form.guide_title ?? ""}
                    onChange={(e) => set("guide_title", e.target.value || null)}
                    placeholder="e.g. Expedition Lead, 12× Summiter"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Guide Quote</label>
                <textarea
                  rows={2}
                  value={form.guide_quote ?? ""}
                  onChange={(e) => set("guide_quote", e.target.value || null)}
                  placeholder="e.g. We don't just guide; we ensure you feel the spirit of the mountains safely."
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
            </>
          )}

          {/* ── ITINERARY TAB ── */}
          {tab === "itinerary" && (
            <>
              {!isEdit && (
                <div className="bg-surface-container-low rounded p-6 border border-outline-variant text-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-3 block">save</span>
                  <p className="text-sm text-on-surface-variant font-sans">Save the package first to manage itinerary days.</p>
                </div>
              )}

              {isEdit && itinLoading && (
                <div className="flex items-center justify-center py-12">
                  <span className="material-symbols-outlined text-3xl text-outline-variant animate-spin">progress_activity</span>
                </div>
              )}

              {isEdit && !itinLoading && (
                <div className="space-y-4">
                  {itinerary.map((day, idx) => (
                    <div key={day.id || idx} className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary font-sans">Day {idx + 1}</span>
                        <button
                          onClick={() => deleteItineraryDay(idx)}
                          className="text-on-surface-variant hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                      <input
                        value={day.day}
                        onChange={(e) => updateItineraryDay(idx, { day: e.target.value })}
                        placeholder="e.g. Day 1"
                        className="w-full bg-surface border-b border-secondary px-0 py-2 text-xs font-semibold font-sans focus:outline-none focus:border-primary transition-colors"
                      />
                      <input
                        value={day.title}
                        onChange={(e) => updateItineraryDay(idx, { title: e.target.value })}
                        placeholder="Day title…"
                        className="w-full bg-surface border-b border-outline-variant px-0 py-2 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                      />
                      <textarea
                        rows={2}
                        value={day.description ?? ""}
                        onChange={(e) => updateItineraryDay(idx, { description: e.target.value || null })}
                        placeholder="Day description…"
                        className="w-full bg-surface border-b border-outline-variant px-0 py-2 text-xs font-sans focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={day.is_collapsed}
                          onChange={(e) => updateItineraryDay(idx, { is_collapsed: e.target.checked })}
                          className="w-3.5 h-3.5 rounded border-outline-variant text-primary"
                        />
                        <span className="text-xs font-sans text-on-surface-variant">Collapse in detail view</span>
                      </label>
                    </div>
                  ))}

                  <button
                    onClick={addItineraryDay}
                    className="w-full border-2 border-dashed border-outline-variant rounded p-4 text-xs font-semibold text-on-surface-variant font-sans hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    Add Day
                  </button>
                </div>
              )}
            </>
          )}

          {/* ── GALLERY TAB ── */}
          {tab === "gallery" && (
            <>
              {!isEdit && (
                <div className="bg-surface-container-low rounded p-6 border border-outline-variant text-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-3 block">save</span>
                  <p className="text-sm text-on-surface-variant font-sans">Save the package first to manage gallery images.</p>
                </div>
              )}

              {isEdit && galleryLoading && (
                <div className="flex items-center justify-center py-12">
                  <span className="material-symbols-outlined text-3xl text-outline-variant animate-spin">progress_activity</span>
                </div>
              )}

              {isEdit && !galleryLoading && (
                <div className="space-y-4">
                  {gallery.map((img, idx) => (
                    <div key={img.id || idx} className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary font-sans">Image {idx + 1}</span>
                        <button
                          onClick={() => deleteGalleryImage(idx)}
                          className="text-on-surface-variant hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>

                      {img.src ? (
                        <div className="relative rounded overflow-hidden h-32 bg-surface-container group">
                          <img src={img.src} alt={img.alt ?? ""} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-inverse-surface/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={async () => {
                                try { await deleteImage(img.src, "trek-images"); } catch {}
                                await updateGalleryImage(idx, { src: "" });
                              }}
                              className="bg-error text-on-error px-3 py-1.5 rounded text-xs font-semibold font-sans"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <input
                            value={img.src}
                            onChange={(e) => updateGalleryImage(idx, { src: e.target.value })}
                            placeholder="Paste image URL or upload below…"
                            className="w-full bg-surface border-b border-outline-variant px-0 py-2 text-xs font-sans focus:outline-none focus:border-primary transition-colors"
                          />
                          <p className="text-[10px] text-outline font-sans mt-1 mb-2">Or upload:</p>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) await onGalleryUpload(idx, file);
                            }}
                            className="text-xs font-sans"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          value={img.alt ?? ""}
                          onChange={(e) => updateGalleryImage(idx, { alt: e.target.value || null })}
                          placeholder="Alt text…"
                          className="w-full bg-surface border-b border-outline-variant px-0 py-2 text-xs font-sans focus:outline-none focus:border-primary transition-colors"
                        />
                        <select
                          value={img.span}
                          onChange={(e) => updateGalleryImage(idx, { span: e.target.value })}
                          className="bg-surface border-b border-outline-variant px-0 py-2 text-xs font-sans focus:outline-none focus:border-primary"
                        >
                          <option value="normal">Normal</option>
                          <option value="wide">Wide</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addGalleryImage}
                    className="w-full border-2 border-dashed border-outline-variant rounded p-4 text-xs font-semibold text-on-surface-variant font-sans hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    Add Image
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer footer */}
        <div className="px-8 py-5 border-t border-outline-variant flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 border border-outline-variant text-on-surface-variant rounded px-4 py-3 text-sm font-semibold font-sans hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-primary text-on-primary rounded px-4 py-3 text-sm font-semibold font-sans hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">{saving ? "hourglass_top" : isEdit ? "save" : "add_circle"}</span>
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Package"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminTreksPage() {
  const supabase = createClient();

  const [treks, setTreks] = useState<TrekRow[]>([]);
  const [regions, setRegions] = useState<RegionOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TrekRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TrekRow | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTreks = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("treks")
      .select("*")
      .order("sort_order", { ascending: true });
    if (err) setError(err.message);
    else setTreks((data as TrekRow[]) ?? []);
    setLoading(false);
  }, [supabase]);

  const fetchRegions = useCallback(async () => {
    const { data } = await supabase
      .from("regions")
      .select("slug, name")
      .order("sort_order", { ascending: true });
    if (data) {
      setRegions(data.map((r: any) => ({ value: r.slug, label: r.name })));
    }
  }, [supabase]);

  useEffect(() => { fetchTreks(); fetchRegions(); }, [fetchTreks, fetchRegions]);

  const filtered = treks.filter((t) => {
    const q = search.toLowerCase();
    const matchQ = !q || t.title.toLowerCase().includes(q) || (t.region_label ?? "").toLowerCase().includes(q);
    const matchR = regionFilter === "all" || t.region_slug === regionFilter;
    const matchD = diffFilter === "all" || t.difficulty === diffFilter;
    return matchQ && matchR && matchD;
  });

  const handleSave = async (data: TrekRow) => {
    const supabaseLocal = createClient();
    const payload: Record<string, any> = { ...data };
    if (!payload.id) delete payload.id;

    const { data: saved, error: err } = data.id
      ? await supabaseLocal.from("treks").update(payload).eq("id", data.id).select().single()
      : await supabaseLocal.from("treks").insert(payload).select().single();

    if (err) { showToast(`Error: ${err.message}`); return; }

    if (data.id) {
      setTreks((prev) => prev.map((t) => (t.id === data.id ? (saved as TrekRow) : t)));
    } else {
      setTreks((prev) => [(saved as TrekRow), ...prev]);
    }
    showToast(`"${data.title}" ${data.id ? "updated" : "added"} successfully`);
    setDrawerOpen(false);
    setEditTarget(null);
  };

  const handleDelete = async (trek: TrekRow) => {
    const supabaseLocal = createClient();
    // Clean up images
    if (trek.image) { try { await deleteImage(trek.image, "trek-images"); } catch {} }
    if (trek.hero_image) { try { await deleteImage(trek.hero_image, "trek-images"); } catch {} }
    if (trek.guide_image) { try { await deleteImage(trek.guide_image, "trek-images"); } catch {} }

    const { error: err } = await supabaseLocal.from("treks").delete().eq("id", trek.id);
    if (err) { showToast(`Error: ${err.message}`); return; }

    setTreks((prev) => prev.filter((t) => t.id !== trek.id));
    setDeleteTarget(null);
    showToast(`"${trek.title}" deleted`);
  };

  const openAdd = () => { setEditTarget(null); setDrawerOpen(true); };
  const openEdit = (trek: TrekRow) => { setEditTarget(trek); setDrawerOpen(true); };

  return (
    <div className="space-y-6 pb-10">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-wrap flex-1">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search packages…"
              className="bg-surface-container-lowest border border-outline-variant rounded pl-9 pr-4 py-2 text-sm font-sans focus:outline-none focus:border-primary transition-colors w-52"
            />
          </div>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="border border-outline-variant rounded px-3 py-2 text-sm font-sans bg-surface focus:outline-none focus:border-primary text-on-surface"
          >
            <option value="all">All Regions</option>
            {regions.map((r) => (<option key={r.value} value={r.value}>{r.label}</option>))}
          </select>
          <select
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            className="border border-outline-variant rounded px-3 py-2 text-sm font-sans bg-surface focus:outline-none focus:border-primary text-on-surface"
          >
            <option value="all">All Difficulties</option>
            {DIFFICULTIES.map((d) => (<option key={d} value={d}>{d}</option>))}
          </select>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex border border-outline-variant rounded overflow-hidden">
            {(["list", "grid"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`px-3 py-2 transition-colors ${viewMode === v ? "bg-primary text-on-primary" : "bg-surface text-on-surface-variant hover:bg-surface-container"}`}
              >
                <span className="material-symbols-outlined text-base">{v === "list" ? "view_list" : "grid_view"}</span>
              </button>
            ))}
          </div>
          <button
            onClick={openAdd}
            className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Package
          </button>
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-on-surface-variant font-sans">
        Showing <span className="font-semibold text-on-surface">{filtered.length}</span> of {treks.length} packages
      </p>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-28">
          <span className="material-symbols-outlined text-4xl text-outline-variant animate-spin">progress_activity</span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-28 gap-4 bg-surface border border-outline-variant rounded">
          <span className="material-symbols-outlined text-6xl text-error">error</span>
          <p className="font-serif text-xl text-primary">Failed to load packages</p>
          <p className="text-sm text-on-surface-variant font-sans">{error}</p>
          <button onClick={fetchTreks} className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans">
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 gap-4 bg-surface border border-outline-variant rounded">
          <span className="material-symbols-outlined text-6xl text-outline-variant">search_off</span>
          <p className="font-serif text-xl text-primary">No packages found</p>
          <p className="text-sm text-on-surface-variant font-sans">Try adjusting your search or filters.</p>
          <button onClick={openAdd} className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors mt-2">
            <span className="material-symbols-outlined text-base">add</span>
            Add First Package
          </button>
        </div>
      )}

      {/* LIST VIEW */}
      {!loading && viewMode === "list" && filtered.length > 0 && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  {["Package", "Region", "Difficulty", "Duration", "Price From", "Status", ""].map((h) => (
                    <th key={h} className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-outline font-sans whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filtered.map((trek) => (
                  <tr key={trek.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 rounded overflow-hidden bg-surface-container shrink-0">
                          {trek.image ? (
                            <img src={trek.image} alt={trek.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-outline text-sm">image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface font-sans">{trek.title}</p>
                          <p className="text-xs text-outline font-sans">/treks/{trek.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface-variant font-sans">{trek.region_label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-semibold font-sans ${diffBadge[trek.difficulty]}`}>{trek.difficulty}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface font-sans">{trek.duration} days</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-on-surface font-sans">${trek.price_from.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans ${trek.is_published ? "bg-secondary-container text-on-secondary-fixed-variant" : "bg-surface-container-highest text-on-surface-variant"}`}>
                        {trek.is_published ? "Live" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(trek)} className="p-1.5 rounded border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors" title="Edit">
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button onClick={() => setDeleteTarget(trek)} className="p-1.5 rounded border border-outline-variant text-on-surface-variant hover:border-error hover:text-error transition-colors" title="Delete">
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {!loading && viewMode === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((trek) => (
            <div key={trek.id} className="bg-surface border border-outline-variant rounded overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
              <div className="relative h-44 bg-surface-container overflow-hidden">
                {trek.image ? (
                  <img src={trek.image} alt={trek.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold font-sans ${diffBadge[trek.difficulty]}`}>{trek.difficulty}</span>
                  {!trek.is_published && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold font-sans bg-surface-container-highest text-on-surface-variant">Draft</span>
                  )}
                  {trek.is_featured && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold font-sans bg-tertiary-fixed text-on-tertiary-fixed-variant">Featured</span>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(trek)} className="w-8 h-8 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title="Edit">
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button onClick={() => setDeleteTarget(trek)} className="w-8 h-8 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-error transition-colors" title="Delete">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="font-serif text-base font-semibold text-primary leading-tight">{trek.title}</h3>
                  <p className="text-xs text-secondary font-sans mt-0.5">{trek.region_label}</p>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed flex-1 line-clamp-2">{trek.description}</p>
                <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-outline font-sans">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {trek.duration} days
                  </div>
                  <span className="text-sm font-semibold text-primary font-sans">from ${trek.price_from.toLocaleString()}</span>
                </div>
              </div>
              <div className="px-5 pb-4 flex gap-2">
                <button onClick={() => openEdit(trek)} className="flex-1 border border-primary text-primary rounded px-3 py-2 text-xs font-semibold font-sans hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">edit</span>Edit
                </button>
                <button onClick={() => setDeleteTarget(trek)} className="flex-1 border border-outline-variant text-on-surface-variant rounded px-3 py-2 text-xs font-semibold font-sans hover:border-error hover:text-error transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">delete</span>Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer */}
      {drawerOpen && (
        <TrekDrawer
          initial={editTarget}
          regions={regions}
          onSave={handleSave}
          onClose={() => { setDrawerOpen(false); setEditTarget(null); }}
        />
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <DeleteDialog
          title="Delete Package?"
          message={`${deleteTarget.title} will be permanently removed. This cannot be undone.`}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-xl text-sm font-sans font-semibold flex items-center gap-2 z-50">
          <span className="material-symbols-outlined text-base">check_circle</span>
          {toast}
        </div>
      )}
    </div>
  );
}