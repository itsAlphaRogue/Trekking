"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  adminGetTreks,
  adminUpsertTrek,
  adminDeleteTrek,
  adminGetRegions,
  adminGetItinerary,
  adminUpsertItineraryDay,
  adminDeleteItineraryDay,
  adminGetGallery,
  adminUpsertGalleryImage,
  adminDeleteGalleryImage,
} from "@/lib/supabase/queries/admin";
import {
  uploadImage,
  trekImagePath,
  deleteImage,
} from "@/lib/supabase/storage";

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "grid" | "list";
type Difficulty = "Easy" | "Moderate" | "Strenuous" | "Challenging" | "Remote";

const DIFFICULTIES: Difficulty[] = [
  "Easy",
  "Moderate",
  "Strenuous",
  "Challenging",
  "Remote",
];

type ItineraryDay = {
  id?: string;
  trek_id: string;
  day: string;
  title: string;
  description: string;
  is_collapsed: boolean;
  sort_order: number;
};

type GalleryImage = {
  id?: string;
  trek_id: string;
  src: string;
  alt: string;
  span: "normal" | "wide";
  sort_order: number;
};

type EditableTrek = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  tagline: string;
  region_slug: string;
  region_label: string;
  duration: number;
  difficulty: Difficulty;
  price_from: number;
  image: string;
  hero_image: string;
  max_altitude: string;
  group_size: string;
  next_departure: string;
  guide_name: string;
  guide_title: string;
  guide_image: string;
  guide_quote: string;
  avg_temp: string;
  wind_speed: string;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  itinerary?: ItineraryDay[];
  gallery?: GalleryImage[];
};

const diffBadge: Record<Difficulty, string> = {
  Easy: "bg-secondary-container text-on-secondary-fixed-variant",
  Moderate: "bg-primary-fixed text-on-primary-fixed-variant",
  Strenuous: "bg-primary text-on-primary",
  Challenging: "bg-tertiary-container text-on-tertiary-container",
  Remote: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
};

const MAX_MB = 8;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

function DeleteDialog({
  trip,
  onConfirm,
  onCancel,
}: {
  trip: EditableTrek;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-surface rounded-lg border border-outline-variant shadow-xl p-8 max-w-sm w-full">
        <div className="w-12 h-12 bg-error-container rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-error">
            delete_forever
          </span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-on-surface text-center mb-2">
          Delete Package?
        </h3>
        <p className="text-sm text-on-surface-variant text-center font-sans mb-6">
          <span className="font-semibold text-on-surface">{trip.title}</span>{" "}
          will be permanently removed from the public trips page. This cannot be
          undone.
        </p>
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
  type,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  slug: string;
  type: "hero" | "card" | "gallery";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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
        const path = trekImagePath(slug || "temp", file, type);
        const url = await uploadImage(file, "trek-images", path);
        onChange(url);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred during upload.");
        }
      } finally {
        setUploading(false);
      }
    },
    [onChange, slug, type],
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
      try {
        await deleteImage(value, "trek-images");
      } catch (err) {
        console.error("Failed to delete image:", err);
      }
    }
    onChange("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
        {label}
      </label>

      {value ? (
        <div className="relative rounded overflow-hidden bg-surface-container group">
          <img src={value} alt={label} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-inverse-surface/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 bg-surface text-on-surface px-4 py-2 rounded text-xs font-semibold font-sans hover:bg-surface-container-low transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">
                swap_horiz
              </span>
              {uploading ? "Uploading..." : "Replace"}
            </button>
            <button
              type="button"
              disabled={uploading}
              onClick={clear}
              className="flex items-center gap-2 bg-error text-on-error px-4 py-2 rounded text-xs font-semibold font-sans hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">delete</span>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded transition-colors flex flex-col items-center justify-center py-10 gap-3 cursor-pointer ${
            dragOver
              ? "border-primary bg-primary-fixed/20"
              : "border-outline-variant bg-surface-container-low hover:border-primary hover:bg-surface-container"
          } ${uploading ? "opacity-50 cursor-wait" : ""}`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              dragOver
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              {uploading ? "sync" : dragOver ? "file_download" : "cloud_upload"}
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-on-surface font-sans">
              {uploading
                ? "Uploading..."
                : dragOver
                  ? "Drop to upload"
                  : "Drag & drop or click to upload"}
            </p>
            <p className="text-xs text-on-surface-variant font-sans mt-1">
              JPG, PNG, WebP · Max {MAX_MB}MB
            </p>
          </div>
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={handleInput}
      />

      {error && (
        <p className="text-xs text-error mt-2 font-sans flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Add / Edit Drawer ────────────────────────────────────────────────────────

function PackageDrawer({
  initial,
  onSave,
  onClose,
  regions,
}: {
  initial: EditableTrek | null;
  onSave: (data: EditableTrek) => Promise<void>;
  onClose: () => void;
  regions: { slug: string; name: string }[];
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<EditableTrek>(
    initial ?? {
      slug: "",
      title: "",
      description: "",
      tagline: "",
      region_slug: regions[0]?.slug || "",
      region_label: regions[0]?.name || "",
      duration: 7,
      difficulty: "Moderate",
      price_from: 1000,
      image: "",
      hero_image: "",
      max_altitude: "",
      group_size: "",
      next_departure: "",
      guide_name: "",
      guide_title: "",
      guide_image: "",
      guide_quote: "",
      avg_temp: "",
      wind_speed: "",
      is_published: true,
      is_featured: false,
      sort_order: 0,
      itinerary: [],
      gallery: [],
    },
  );
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [tab, setTab] = useState<
    "basic" | "images" | "details" | "itinerary" | "gallery"
  >("basic");
  const [saving, setSaving] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Fetch itinerary/gallery if editing
  useEffect(() => {
    if (isEdit && initial?.id) {
      Promise.all([adminGetItinerary(initial.id), adminGetGallery(initial.id)])
        .then(([itin, gal]) => {
          setForm((f) => ({ ...f, itinerary: itin, gallery: gal }));
        })
        .catch((err) => {
          console.error("Failed to fetch additional package data:", err);
        });
    }
  }, [isEdit, initial?.id]);

  const setField = <K extends keyof EditableTrek>(
    key: K,
    value: EditableTrek[K],
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setSubmissionError(null);
  };

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.duration < 1) e.duration = "Must be at least 1 day";
    if (form.price_from < 1) e.priceFrom = "Must be a positive amount";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const getFriendlyErrorMessage = (msg: string) => {
    if (msg.includes("duplicate key value violates unique constraint")) {
      if (msg.includes("slug")) return "A package with this slug already exists.";
      if (msg.includes("title"))
        return "A package with this title already exists.";
      return "A package with these details already exists.";
    }
    return msg;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setSubmissionError(null);
    try {
      // Sync regionLabel
      const regionLabel =
        regions.find((r) => r.slug === form.region_slug)?.name ??
        form.region_label;
      await onSave({ ...form, region_label: regionLabel });
    } catch (err) {
      if (err instanceof Error) {
        setSubmissionError(getFriendlyErrorMessage(err.message));
      } else {
        setSubmissionError("Save failed with an unknown error.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative ml-auto w-full max-w-xl bg-surface h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer header */}
        <div className="px-8 py-5 border-b border-outline-variant flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              {isEdit ? "Edit Package" : "Add New Package"}
            </h2>
            <p className="text-xs text-on-surface-variant font-sans mt-0.5">
              {isEdit
                ? `Editing: ${initial!.title}`
                : "This will appear on the public /trips page"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-outline-variant shrink-0 overflow-x-auto no-scrollbar">
          {(
            ["basic", "images", "details", "itinerary", "gallery"] as const
          ).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 min-w-fit px-4 py-3 text-[10px] font-semibold uppercase tracking-widest font-sans transition-colors whitespace-nowrap ${
                tab === t
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {t === "basic"
                ? "Content"
                : t === "images"
                  ? "Media"
                  : t === "details"
                    ? "Details"
                    : t === "itinerary"
                      ? "Itinerary"
                      : "Gallery"}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {submissionError && (
          <div className="mx-8 mt-4 p-3 bg-error-container text-on-error-container text-xs font-sans rounded border border-error/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <span className="material-symbols-outlined text-base">error</span>
            {submissionError}
          </div>
        )}

        {/* Form body — scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {tab === "basic" && (
            <>
              {/* Title */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Package Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => {
                    setField("title", e.target.value);
                    if (!isEdit) setField("slug", autoSlug(e.target.value));
                  }}
                  placeholder="e.g. Everest Base Camp Trek"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                    errors.title
                      ? "border-error text-error"
                      : "border-secondary focus:border-primary"
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-error mt-1 font-sans">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant font-sans shrink-0">
                    /treks/
                  </span>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setField(
                        "slug",
                        e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      )
                    }
                    placeholder="everest-base-camp"
                    className={`flex-1 bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                      errors.slug
                        ? "border-error"
                        : "border-secondary focus:border-primary"
                    }`}
                  />
                </div>
                {errors.slug && (
                  <p className="text-xs text-error mt-1 font-sans">
                    {errors.slug}
                  </p>
                )}
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Tagline (e.g. A Journey to the Top of the World)
                </label>
                <input
                  value={form.tagline}
                  onChange={(e) => setField("tagline", e.target.value)}
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Short Description *
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="A brief summary shown on the treks listing page…"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors resize-none ${
                    errors.description
                      ? "border-error"
                      : "border-secondary focus:border-primary"
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-error mt-1 font-sans">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Region + Difficulty */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Region *
                  </label>
                  <div className="relative">
                    <select
                      value={form.region_slug}
                      onChange={(e) => setField("region_slug", e.target.value)}
                      className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      {regions.map((r) => (
                        <option key={r.slug} value={r.slug}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none text-sm">
                      expand_more
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Difficulty *
                  </label>
                  <div className="relative">
                    <select
                      value={form.difficulty}
                      onChange={(e) =>
                        setField("difficulty", e.target.value as Difficulty)
                      }
                      className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      {DIFFICULTIES.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none text-sm">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Duration + Price */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Duration (days) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={form.duration}
                    onChange={(e) => setField("duration", Number(e.target.value))}
                    className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                      errors.duration
                        ? "border-error"
                        : "border-secondary focus:border-primary"
                    }`}
                  />
                  {errors.duration && (
                    <p className="text-xs text-error mt-1 font-sans">
                      {errors.duration}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Price From (USD) *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-on-surface-variant font-sans">
                      $
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={form.price_from}
                      onChange={(e) =>
                        setField("price_from", Number(e.target.value))
                      }
                      className={`flex-1 bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                        errors.priceFrom
                          ? "border-error"
                          : "border-secondary focus:border-primary"
                      }`}
                    />
                  </div>
                  {errors.priceFrom && (
                    <p className="text-xs text-error mt-1 font-sans">
                      {errors.priceFrom}
                    </p>
                  )}
                </div>
              </div>

              {/* Featured / Published */}
              <div className="flex gap-8">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setField("is_featured", e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-xs font-semibold font-sans text-on-surface-variant group-hover:text-primary transition-colors">
                    Featured on Home
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) => setField("is_published", e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-xs font-semibold font-sans text-on-surface-variant group-hover:text-primary transition-colors">
                    Published
                  </span>
                </label>
              </div>
            </>
          )}

          {tab === "images" && (
            <>
              <ImageUploader
                label="Card Image (Listing Page)"
                value={form.image}
                onChange={(url) => setField("image", url)}
                slug={form.slug}
                type="card"
              />
              <ImageUploader
                label="Hero Image (Detail Page)"
                value={form.hero_image}
                onChange={(url) => setField("hero_image", url)}
                slug={form.slug}
                type="hero"
              />
              <div className="bg-surface-container-low rounded p-4 border border-outline-variant">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Guide Information
                </p>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <ImageUploader
                    label="Guide Photo"
                    value={form.guide_image}
                    onChange={(url) => setField("guide_image", url)}
                    slug={form.slug}
                    type="card"
                  />
                  <div className="space-y-4">
                    <input
                      value={form.guide_name}
                      onChange={(e) => setField("guide_name", e.target.value)}
                      placeholder="Guide Name"
                      className="w-full bg-surface border-b border-secondary py-2 text-xs font-sans focus:outline-none focus:border-primary"
                    />
                    <input
                      value={form.guide_title}
                      onChange={(e) => setField("guide_title", e.target.value)}
                      placeholder="Title (e.g. Lead Guide)"
                      className="w-full bg-surface border-b border-secondary py-2 text-xs font-sans focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <textarea
                  rows={2}
                  value={form.guide_quote}
                  onChange={(e) => setField("guide_quote", e.target.value)}
                  placeholder="Guide Quote..."
                  className="w-full bg-surface border-b border-secondary py-2 text-xs font-sans focus:outline-none focus:border-primary mt-4 resize-none"
                />
              </div>
            </>
          )}

          {tab === "details" && (
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  label: "Max Altitude",
                  key: "max_altitude",
                  placeholder: "5,545m",
                },
                {
                  label: "Group Size",
                  key: "group_size",
                  placeholder: "2-12 persons",
                },
                {
                  label: "Next Departure",
                  key: "next_departure",
                  placeholder: "Sep 20, 2026",
                },
                { label: "Avg Temp", key: "avg_temp", placeholder: "10°C / -15°C" },
                {
                  label: "Wind Speed",
                  key: "wind_speed",
                  placeholder: "15-20 km/h",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    {field.label}
                  </label>
                  <input
                    value={(form as unknown as Record<string, string>)[field.key] ?? ""}
                    onChange={(e) =>
                      setField(field.key as keyof EditableTrek, e.target.value)
                    }
                    placeholder={field.placeholder}
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "itinerary" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">
                  Itinerary Days
                </label>
                <button
                  onClick={() => {
                    const newItin = [...(form.itinerary || [])];
                    newItin.push({
                      trek_id: form.id || "",
                      day: `Day ${newItin.length + 1}`,
                      title: "",
                      description: "",
                      is_collapsed: false,
                      sort_order: newItin.length,
                    });
                    setField("itinerary", newItin);
                  }}
                  className="text-primary text-[10px] font-semibold uppercase tracking-widest font-sans flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Day
                </button>
              </div>

              {!form.itinerary?.length ? (
                <div className="text-center py-10 bg-surface-container-low rounded border border-dashed border-outline-variant">
                  <p className="text-xs text-on-surface-variant font-sans">
                    No itinerary days added yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {form.itinerary.map((day, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-container-low rounded p-4 border border-outline-variant space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          value={day.day}
                          onChange={(e) => {
                            const next = [...form.itinerary!];
                            next[idx].day = e.target.value;
                            setField("itinerary", next);
                          }}
                          className="font-serif font-bold text-primary bg-transparent focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const next = form.itinerary!.filter((_, i) => i !== idx);
                            setField("itinerary", next);
                          }}
                          className="text-outline hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </button>
                      </div>
                      <input
                        value={day.title}
                        onChange={(e) => {
                          const next = [...form.itinerary!];
                          next[idx].title = e.target.value;
                          setField("itinerary", next);
                        }}
                        placeholder="Day Title"
                        className="w-full bg-surface border-b border-outline-variant py-1 text-sm font-sans focus:outline-none focus:border-primary"
                      />
                      <textarea
                        rows={2}
                        value={day.description}
                        onChange={(e) => {
                          const next = [...form.itinerary!];
                          next[idx].description = e.target.value;
                          setField("itinerary", next);
                        }}
                        placeholder="Description..."
                        className="w-full bg-surface border-b border-outline-variant py-1 text-xs font-sans focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">
                  Gallery Images
                </label>
                <button
                  onClick={() => {
                    const next = [...(form.gallery || [])];
                    next.push({
                      trek_id: form.id || "",
                      src: "",
                      alt: "",
                      span: "normal",
                      sort_order: next.length,
                    });
                    setField("gallery", next);
                  }}
                  className="text-primary text-[10px] font-semibold uppercase tracking-widest font-sans flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Image
                </button>
              </div>

              {!form.gallery?.length ? (
                <div className="text-center py-10 bg-surface-container-low rounded border border-dashed border-outline-variant">
                  <p className="text-xs text-on-surface-variant font-sans">
                    No gallery images added yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {form.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-container-low rounded p-3 border border-outline-variant space-y-3"
                    >
                      <ImageUploader
                        label={`Image ${idx + 1}`}
                        value={img.src}
                        onChange={(url) => {
                          const next = [...form.gallery!];
                          next[idx].src = url;
                          setField("gallery", next);
                        }}
                        slug={form.slug}
                        type="gallery"
                      />
                      <input
                        value={img.alt}
                        onChange={(e) => {
                          const next = [...form.gallery!];
                          next[idx].alt = e.target.value;
                          setField("gallery", next);
                        }}
                        placeholder="Alt text"
                        className="w-full bg-surface border-b border-outline-variant py-1 text-[10px] font-sans focus:outline-none focus:border-primary"
                      />
                      <select
                        value={img.span}
                        onChange={(e) => {
                          const next = [...form.gallery!];
                          next[idx].span = e.target.value as "normal" | "wide";
                          setField("gallery", next);
                        }}
                        className="w-full bg-surface border-b border-outline-variant py-1 text-[10px] font-sans focus:outline-none"
                      >
                        <option value="normal">Normal</option>
                        <option value="wide">Wide</option>
                      </select>
                      <button
                        onClick={() => {
                          const next = form.gallery!.filter((_, i) => i !== idx);
                          setField("gallery", next);
                        }}
                        className="w-full text-error text-[10px] font-semibold font-sans hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer footer */}
        <div className="px-8 py-5 border-t border-outline-variant flex gap-3 shrink-0">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 border border-outline-variant text-on-surface-variant rounded px-4 py-3 text-sm font-semibold font-sans hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-primary text-on-primary rounded px-4 py-3 text-sm font-semibold font-sans hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">
              {saving ? "sync" : isEdit ? "save" : "add_circle"}
            </span>
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Package"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminPackagesPage() {
  const [trips, setTrips] = useState<EditableTrek[]>([]);
  const [regions, setRegions] = useState<{ slug: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<EditableTrek | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EditableTrek | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [treksData, regionsData] = await Promise.all([
        adminGetTreks(),
        adminGetRegions(),
      ]);

      const mappedTreks: EditableTrek[] = treksData.map((t) => ({
        id: t.id,
        slug: t.slug,
        title: t.title,
        description: t.description || "",
        tagline: t.tagline || "",
        region_slug: t.region_slug,
        region_label: t.region_label || "",
        duration: t.duration || 0,
        difficulty: t.difficulty as Difficulty,
        price_from: t.price_from || 0,
        image: t.image || "",
        hero_image: t.hero_image || "",
        max_altitude: t.max_altitude || "",
        group_size: t.group_size || "",
        next_departure: t.next_departure || "",
        guide_name: t.guide_name || "",
        guide_title: t.guide_title || "",
        guide_image: t.guide_image || "",
        guide_quote: t.guide_quote || "",
        avg_temp: t.avg_temp || "",
        wind_speed: t.wind_speed || "",
        is_published: t.is_published ?? true,
        is_featured: t.is_featured ?? false,
        sort_order: t.sort_order || 0,
      }));

      setTrips(mappedTreks);
      setRegions(regionsData.map((r) => ({ slug: r.slug, name: r.name })));
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => loadData());
  }, [loadData]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Filter
  const filtered = trips.filter((t) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.region_label.toLowerCase().includes(q);
    const matchR = regionFilter === "all" || t.region_slug === regionFilter;
    const matchD = diffFilter === "all" || t.difficulty === diffFilter;
    return matchQ && matchR && matchD;
  });

  const handleSave = async (data: EditableTrek) => {
    // 1. Upsert Trek
    const savedTrek = await adminUpsertTrek({
      id: data.id,
      slug: data.slug,
      title: data.title,
      description: data.description,
      tagline: data.tagline,
      region_slug: data.region_slug,
      region_label: data.region_label,
      duration: data.duration,
      difficulty: data.difficulty,
      price_from: data.price_from,
      image: data.image,
      hero_image: data.hero_image,
      max_altitude: data.max_altitude,
      group_size: data.group_size,
      next_departure: data.next_departure,
      guide_name: data.guide_name,
      guide_title: data.guide_title,
      guide_image: data.guide_image,
      guide_quote: data.guide_quote,
      avg_temp: data.avg_temp,
      wind_speed: data.wind_speed,
      is_published: data.is_published,
      is_featured: data.is_featured,
      sort_order: data.sort_order,
    });

    // 2. Handle Itinerary
    if (data.itinerary) {
      const current = data.id ? await adminGetItinerary(data.id) : [];
      const currentIds = current.map((i) => i.id);
      const newIds = data.itinerary.map((i) => i.id).filter(Boolean);
      const toDelete = currentIds.filter((id) => !newIds.includes(id));

      await Promise.all([
        ...data.itinerary.map((day, idx) =>
          adminUpsertItineraryDay({
            ...day,
            trek_id: savedTrek.id,
            sort_order: idx,
          }),
        ),
        ...toDelete.map((id) => adminDeleteItineraryDay(id!)),
      ]);
    }

    // 3. Handle Gallery
    if (data.gallery) {
      const current = data.id ? await adminGetGallery(data.id) : [];
      const currentIds = current.map((i) => i.id);
      const newIds = data.gallery.map((i) => i.id).filter(Boolean);
      const toDelete = currentIds.filter((id) => !newIds.includes(id));

      await Promise.all([
        ...data.gallery.map((img, idx) =>
          adminUpsertGalleryImage({
            ...img,
            trek_id: savedTrek.id,
            sort_order: idx,
          }),
        ),
        ...toDelete.map((id) => adminDeleteGalleryImage(id!)),
      ]);
    }

    showToast(`"${data.title}" saved successfully`);
    loadData();
    setDrawerOpen(false);
    setEditTarget(null);
  };

  const handleDelete = async (trip: EditableTrek) => {
    try {
      await adminDeleteTrek(trip.id!);
      showToast(`"${trip.title}" deleted`);
      loadData();
      setDeleteTarget(null);
    } catch (err) {
      if (err instanceof Error) {
        alert(`Delete failed: ${err.message}`);
      } else {
        alert("Delete failed with an unknown error.");
      }
    }
  };

  const openAdd = () => {
    setEditTarget(null);
    setDrawerOpen(true);
  };

  const openEdit = (trip: EditableTrek) => {
    setEditTarget(trip);
    setDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">
          sync
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-wrap flex-1">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search packages…"
              className="bg-surface-container-lowest border border-outline-variant rounded pl-9 pr-4 py-2 text-sm font-sans focus:outline-none focus:border-primary transition-colors w-52"
            />
          </div>

          {/* Region filter */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="border border-outline-variant rounded px-3 py-2 text-sm font-sans bg-surface focus:outline-none focus:border-primary text-on-surface"
          >
            <option value="all">All Regions</option>
            {regions.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name}
              </option>
            ))}
          </select>

          {/* Difficulty filter */}
          <select
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            className="border border-outline-variant rounded px-3 py-2 text-sm font-sans bg-surface focus:outline-none focus:border-primary text-on-surface"
          >
            <option value="all">All Difficulties</option>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* View toggle */}
          <div className="flex border border-outline-variant rounded overflow-hidden">
            {(["list", "grid"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`px-3 py-2 transition-colors ${
                  viewMode === v
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {v === "list" ? "view_list" : "grid_view"}
                </span>
              </button>
            ))}
          </div>

          {/* Add button */}
          <button
            onClick={openAdd}
            className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Package
          </button>
        </div>
      </div>

      {/* ── Result count ── */}
      <p className="text-xs text-on-surface-variant font-sans">
        Showing{" "}
        <span className="font-semibold text-on-surface">{filtered.length}</span>{" "}
        of {trips.length} packages
      </p>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 gap-4 bg-surface border border-outline-variant rounded">
          <span className="material-symbols-outlined text-6xl text-outline-variant">
            search_off
          </span>
          <p className="font-serif text-xl text-primary">No packages found</p>
          <p className="text-sm text-on-surface-variant font-sans">
            Try adjusting your search or filters.
          </p>
          <button
            onClick={openAdd}
            className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors mt-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add First Package
          </button>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {viewMode === "list" && filtered.length > 0 && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  {[
                    "Package",
                    "Region",
                    "Difficulty",
                    "Duration",
                    "Price From",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-outline font-sans whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filtered.map((trip) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-surface-container-lowest transition-colors group"
                  >
                    {/* Package */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 rounded overflow-hidden bg-surface-container shrink-0">
                          {trip.image ? (
                            <img
                              src={trip.image}
                              alt={trip.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-outline text-sm">
                                image
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface font-sans">
                            {trip.title}
                          </p>
                          <p className="text-xs text-outline font-sans">
                            /treks/{trip.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Region */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface-variant font-sans">
                        {trip.region_label}
                      </span>
                    </td>
                    {/* Difficulty */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-semibold font-sans ${diffBadge[trip.difficulty]}`}
                      >
                        {trip.difficulty}
                      </span>
                    </td>
                    {/* Duration */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface font-sans">
                        {trip.duration} days
                      </span>
                    </td>
                    {/* Price */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-on-surface font-sans">
                        ${trip.price_from.toLocaleString()}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(trip)}
                          className="p-1.5 rounded border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-base">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(trip)}
                          className="p-1.5 rounded border border-outline-variant text-on-surface-variant hover:border-error hover:text-error transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-base">
                            delete
                          </span>
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

      {/* ── GRID VIEW ── */}
      {viewMode === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((trip) => (
            <div
              key={trip.id}
              className="bg-surface border border-outline-variant rounded overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 bg-surface-container overflow-hidden">
                {trip.image ? (
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">
                      image
                    </span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold font-sans ${diffBadge[trip.difficulty]}`}
                  >
                    {trip.difficulty}
                  </span>
                </div>
                {/* Hover actions overlay */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(trip)}
                    className="w-8 h-8 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-base">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(trip)}
                    className="w-8 h-8 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="font-serif text-base font-semibold text-primary leading-tight">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-secondary font-sans mt-0.5">
                    {trip.region_label}
                  </p>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed flex-1 line-clamp-2">
                  {trip.description}
                </p>
                <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-outline font-sans">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    {trip.duration} days
                  </div>
                  <span className="text-sm font-semibold text-primary font-sans">
                    from ${trip.price_from.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 pb-4 flex gap-2">
                <button
                  onClick={() => openEdit(trip)}
                  className="flex-1 border border-primary text-primary rounded px-3 py-2 text-xs font-semibold font-sans hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(trip)}
                  className="flex-1 border border-outline-variant text-on-surface-variant rounded px-3 py-2 text-xs font-semibold font-sans hover:border-error hover:text-error transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Drawer ── */}
      {drawerOpen && (
        <PackageDrawer
          initial={editTarget}
          onSave={handleSave}
          onClose={() => {
            setDrawerOpen(false);
            setEditTarget(null);
          }}
          regions={regions}
        />
      )}

      {/* ── Delete confirm ── */}
      {deleteTarget && (
        <DeleteDialog
          trip={deleteTarget}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-xl text-sm font-sans font-semibold flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-base">
            check_circle
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}

