"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  adminGetRegions,
  adminUpsertRegion,
  adminDeleteRegion,
  adminGetSpecialties,
  adminUpsertSpecialty,
  adminDeleteSpecialty,
} from "@/lib/supabase/queries/admin";
import {
  uploadImage,
  regionImagePath,
  deleteImage,
} from "@/lib/supabase/storage";

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_MB = 8;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const BENTO_LAYOUTS_FIXED = ["large", "small", "small", "large-split"] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type Specialty = {
  id?: string;
  region_id: string;
  number: string;
  title: string;
  description: string;
  sort_order: number;
};

type EditableRegion = {
  id?: string;
  slug: string;
  name: string;
  tagline: string;
  hero_label: string;
  hero_image: string;
  description: string;
  specialty_image: string;
  badge: string;
  card_description: string;
  elevation: string;
  difficulty: string;
  best_season: string;
  sort_order: number;
  is_published: boolean;
  specialties?: Specialty[];
};

type BentoLayout = "large" | "small" | "large-split";

function getBentoLayout(index: number): BentoLayout {
  return (BENTO_LAYOUTS_FIXED[index] as BentoLayout) ?? "small";
}

function toBentoLabel(layout: BentoLayout): string {
  switch (layout) {
    case "large":
      return "Wide card (8/12 cols)";
    case "small":
      return "Narrow card (4/12 cols)";
    case "large-split":
      return "Wide split card (8/12 cols)";
  }
}

// ─── Image Uploader ────────────────────────────────────────────────────────────

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
  type: "hero" | "specialty";
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
        const path = regionImagePath(slug || "temp", file, type);
        const url = await uploadImage(file, "region-images", path);
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

  const clear = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value) {
      try {
        await deleteImage(value, "region-images");
      } catch (err) {
        console.error("Failed to delete image from storage:", err);
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
          <img src={value} alt={label} className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-inverse-surface/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 bg-surface text-on-surface px-3 py-1.5 rounded text-xs font-semibold font-sans hover:bg-surface-container-low transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">
                swap_horiz
              </span>
              {uploading ? "Uploading..." : "Replace"}
            </button>
            <button
              type="button"
              disabled={uploading}
              onClick={clear}
              className="flex items-center gap-2 bg-error text-on-error px-3 py-1.5 rounded text-xs font-semibold font-sans hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
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
          className={`w-full border-2 border-dashed rounded flex flex-col items-center justify-center py-7 gap-2 cursor-pointer transition-colors ${
            dragOver
              ? "border-primary bg-primary-fixed/20"
              : "border-outline-variant bg-surface-container-low hover:border-primary hover:bg-surface-container"
          } ${uploading ? "opacity-50 cursor-wait" : ""}`}
        >
          <span
            className={`material-symbols-outlined text-2xl ${dragOver ? "text-primary" : "text-outline"}`}
          >
            {uploading ? "sync" : dragOver ? "file_download" : "cloud_upload"}
          </span>
          <p className="text-xs font-semibold text-on-surface font-sans">
            {uploading
              ? "Uploading..."
              : dragOver
                ? "Drop to upload"
                : "Drag & drop or click"}
          </p>
          <p className="text-[10px] text-outline font-sans">
            JPG, PNG, WebP · Max {MAX_MB}MB
          </p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) processFile(f);
        }}
      />
      {error && (
        <p className="text-xs text-error mt-1 font-sans flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Bento Preview Components ──────────────────────────────────────────────

const PreviewImg = ({ r, cls }: { r: EditableRegion; cls: string }) => (
  <div className={`${cls} overflow-hidden`}>
    {r.hero_image ? (
      <img
        src={r.hero_image}
        alt={r.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
        <span className="material-symbols-outlined text-outline-variant">
          image
        </span>
      </div>
    )}
  </div>
);

const PreviewBadge = ({ r }: { r: EditableRegion }) => (
  <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/70 to-transparent">
    <p className="text-[9px] font-semibold text-white font-sans truncate">
      {r.name}
    </p>
    <p className="text-[8px] text-white/70 font-sans truncate">{r.badge}</p>
  </div>
);

// ─── Bento Preview (miniature) ────────────────────────────────────────────────

function BentoPreview({
  regions,
  highlightSlug,
}: {
  regions: EditableRegion[];
  highlightSlug: string;
}) {
  const cardBase =
    "relative overflow-hidden bg-surface-container-high transition-all";
  const highlight = "ring-2 ring-primary";

  const [r0, r1, r2, r3] = regions;
  const overflow = regions.slice(4);

  return (
    <div className="bg-surface-container-low rounded p-3 border border-outline-variant">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-3 font-sans">
        Bento Preview — Destinations Page
      </p>
      <div className="grid grid-cols-12 gap-1">
        {/* Row 1: large (8) + small (4) */}
        {r0 && (
          <div
            className={`col-span-8 h-16 ${cardBase} ${r0.slug === highlightSlug ? highlight : ""}`}
          >
            <PreviewImg r={r0} cls="w-full h-full" />
            <PreviewBadge r={r0} />
          </div>
        )}
        {r1 && (
          <div
            className={`col-span-4 h-16 ${cardBase} ${r1.slug === highlightSlug ? highlight : ""}`}
          >
            <PreviewImg r={r1} cls="w-full h-full" />
            <PreviewBadge r={r1} />
          </div>
        )}
        {/* Row 2: small (4) + large-split (8) */}
        {r2 && (
          <div
            className={`col-span-4 h-16 ${cardBase} ${r2.slug === highlightSlug ? highlight : ""}`}
          >
            <PreviewImg r={r2} cls="w-full h-full" />
            <PreviewBadge r={r2} />
          </div>
        )}
        {r3 && (
          <div
            className={`col-span-8 h-16 ${cardBase} ${r3.slug === highlightSlug ? highlight : ""}`}
          >
            <div className="grid grid-cols-2 h-full">
              <PreviewImg r={r3} cls="h-full" />
              <div className="bg-surface-container-highest flex items-center justify-center p-1">
                <p className="text-[8px] font-semibold text-primary font-sans text-center truncate">
                  {r3.name}
                </p>
              </div>
            </div>
            {r3.slug === highlightSlug && (
              <div className="absolute inset-0 ring-2 ring-primary pointer-events-none" />
            )}
          </div>
        )}
        {/* Overflow regions (5th+) */}
        {overflow.map((r, i) => (
          <div
            key={r.slug}
            className={`col-span-4 h-16 ${cardBase} ${r.slug === highlightSlug ? highlight : ""}`}
          >
            <PreviewImg r={r} cls="w-full h-full" />
            <PreviewBadge r={r} />
            <div className="absolute top-1 right-1 bg-surface-container/80 rounded text-[7px] font-semibold font-sans px-1 text-on-tertiary-fixed-variant">
              +{i + 5}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-outline font-sans mt-2 text-center">
        Blue outline = region being edited · Extra regions appear as narrow
        cards
      </p>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteDialog({
  region,
  onConfirm,
  onCancel,
}: {
  region: EditableRegion;
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
          Delete Region?
        </h3>
        <p className="text-sm text-on-surface-variant text-center font-sans mb-2">
          <span className="font-semibold text-on-surface">{region.name}</span>{" "}
          will be removed from the destinations page and its bento card position
          will be vacant.
        </p>
        <p className="text-xs text-error text-center font-sans mb-6">
          ⚠ All trek packages linked to this region will lose their region
          reference.
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
            Delete Region
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Region Drawer ────────────────────────────────────────────────────────────

function RegionDrawer({
  initial,
  allRegions,
  position,
  onSave,
  onClose,
}: {
  initial: EditableRegion | null;
  allRegions: EditableRegion[];
  position: number;
  onSave: (data: EditableRegion) => Promise<void>;
  onClose: () => void;
}) {
  const isEdit = !!initial;
  const [form, setForm] = useState<EditableRegion>(
    initial ?? {
      slug: "",
      name: "",
      tagline: "",
      hero_label: "",
      hero_image: "",
      description: "",
      specialty_image: "",
      elevation: "",
      difficulty: "",
      best_season: "",
      badge: "",
      card_description: "",
      sort_order: position,
      is_published: true,
      specialties: [],
    },
  );
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [tab, setTab] = useState<"basic" | "images" | "stats" | "specialties">(
    "basic",
  );
  const [saving, setSaving] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Fetch specialties if editing
  useEffect(() => {
    if (isEdit && initial?.id) {
      adminGetSpecialties(initial.id).then((specs) => {
        setForm((f) => ({ ...f, specialties: specs }));
      });
    }
  }, [isEdit, initial?.id]);

  const setField = <K extends keyof EditableRegion>(
    key: K,
    val: EditableRegion[K],
  ) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setSubmissionError(null);
  };

  const autoSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.tagline.trim()) e.tagline = "Tagline is required";
    if (!form.badge.trim()) e.badge = "Badge label is required";
    if (!form.card_description.trim())
      e.cardDescription = "Card description is required";
    if (!form.description.trim())
      e.description = "Full description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const getFriendlyErrorMessage = (msg: string) => {
    if (msg.includes("duplicate key value violates unique constraint")) {
      if (msg.includes("slug")) return "A region with this slug already exists.";
      if (msg.includes("name")) return "A region with this name already exists.";
      return "A region with these details already exists.";
    }
    return msg;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setSubmissionError(null);
    try {
      await onSave(form);
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

  // Build preview regions with the current form applied
  const previewRegions = allRegions.map((r, i) => (i === position ? form : r));
  // If adding new, append at current position
  if (!isEdit) previewRegions[position] = form;

  const bentoLayout = BENTO_LAYOUTS_FIXED[position] ?? "small";

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative ml-auto w-full max-w-xl bg-surface h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 border-b border-outline-variant flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">
              {isEdit ? "Edit Region" : "Add New Region"}
            </h2>
            <p className="text-xs text-on-surface-variant font-sans mt-0.5 flex items-center gap-2">
              <span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-semibold font-sans">
                {toBentoLabel(bentoLayout)}
              </span>
              {isEdit
                ? `Editing position ${position + 1} of 4`
                : "Will be added at end"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-outline-variant shrink-0 overflow-x-auto no-scrollbar">
          {(["basic", "images", "stats", "specialties"] as const).map((t) => (
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
                  ? "Images"
                  : t === "stats"
                    ? "Stats"
                    : "Specialties"}
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

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* ── BASIC TAB ── */}
          {tab === "basic" && (
            <>
              {/* Name */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Region Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => {
                    setField("name", e.target.value);
                    if (!isEdit) setField("slug", autoSlug(e.target.value));
                  }}
                  placeholder="e.g. Everest Region"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                    errors.name
                      ? "border-error"
                      : "border-secondary focus:border-primary"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-error mt-1 font-sans">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Slug + Hero Label */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    URL Slug *
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-outline font-sans shrink-0">
                      /destinations/
                    </span>
                    <input
                      value={form.slug}
                      onChange={(e) =>
                        setField(
                          "slug",
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, ""),
                        )
                      }
                      placeholder="everest"
                      className={`flex-1 bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors min-w-0 ${
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
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Hero Label
                  </label>
                  <input
                    value={form.hero_label}
                    onChange={(e) => setField("hero_label", e.target.value)}
                    placeholder="e.g. Nepal Sanctuary"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Tagline *{" "}
                  <span className="normal-case text-outline">
                    (shown in hero)
                  </span>
                </label>
                <input
                  value={form.tagline}
                  onChange={(e) => setField("tagline", e.target.value)}
                  placeholder="e.g. Heart of the Himalayas"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                    errors.tagline
                      ? "border-error"
                      : "border-secondary focus:border-primary"
                  }`}
                />
                {errors.tagline && (
                  <p className="text-xs text-error mt-1 font-sans">
                    {errors.tagline}
                  </p>
                )}
              </div>

              {/* Badge */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Bento Badge Label *{" "}
                  <span className="normal-case text-outline">
                    (shown on card)
                  </span>
                </label>
                <input
                  value={form.badge}
                  onChange={(e) => setField("badge", e.target.value)}
                  placeholder="e.g. Iconic"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                    errors.badge
                      ? "border-error"
                      : "border-secondary focus:border-primary"
                  }`}
                />
                {errors.badge && (
                  <p className="text-xs text-error mt-1 font-sans">
                    {errors.badge}
                  </p>
                )}
              </div>

              {/* Card description */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Short Card Description *{" "}
                  <span className="normal-case text-outline">
                    (shown on bento card, ~100 chars)
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={form.card_description}
                  onChange={(e) => setField("card_description", e.target.value)}
                  placeholder="A concise description for the destinations grid…"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors resize-none ${
                    errors.cardDescription
                      ? "border-error"
                      : "border-secondary focus:border-primary"
                  }`}
                />
                <p className="text-[10px] text-outline font-sans mt-1">
                  {form.card_description.length} chars
                </p>
                {errors.cardDescription && (
                  <p className="text-xs text-error mt-1 font-sans">
                    {errors.cardDescription}
                  </p>
                )}
              </div>

              {/* Full description */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Full Description *{" "}
                  <span className="normal-case text-outline">
                    (shown on region detail page)
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="The full description shown on the region detail page…"
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

              {/* Bento preview */}
              <BentoPreview
                regions={previewRegions}
                highlightSlug={form.slug}
              />
            </>
          )}

          {/* ── IMAGES TAB ── */}
          {tab === "images" && (
            <>
              <div className="bg-surface-container-low rounded p-4 border border-outline-variant text-xs text-on-surface-variant font-sans space-y-1">
                <p>
                  <span className="font-semibold text-on-surface">
                    Hero Image
                  </span>{" "}
                  — full-bleed background on the region detail page hero
                  (recommended: 1920×1080px landscape)
                </p>
                <p>
                  <span className="font-semibold text-on-surface">
                    Specialty Image
                  </span>{" "}
                  — shown in the &quot;Regional Specialties&quot; section
                  (recommended: portrait 4:5)
                </p>
              </div>

              <ImageUploader
                label="Hero Image (Region Detail Page)"
                value={form.hero_image}
                onChange={(url) => setField("hero_image", url)}
                slug={form.slug}
                type="hero"
              />

              <ImageUploader
                label="Specialty / Interior Image"
                value={form.specialty_image}
                onChange={(url) => setField("specialty_image", url)}
                slug={form.slug}
                type="specialty"
              />

              {/* Bento preview with current image */}
              <BentoPreview
                regions={previewRegions}
                highlightSlug={form.slug}
              />
            </>
          )}

          {/* ── STATS TAB ── */}
          {tab === "stats" && (
            <>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Average Elevation
                </label>
                <input
                  value={form.elevation}
                  onChange={(e) => setField("elevation", e.target.value)}
                  placeholder="e.g. 4,000m+"
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Difficulty Range
                </label>
                <input
                  value={form.difficulty}
                  onChange={(e) => setField("difficulty", e.target.value)}
                  placeholder="e.g. Moderate to Challenging"
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Best Season
                </label>
                <input
                  value={form.best_season}
                  onChange={(e) => setField("best_season", e.target.value)}
                  placeholder="e.g. Mar–May & Oct–Nov"
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Stats preview */}
              <div className="bg-surface-container-low rounded p-4 border border-outline-variant">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-3 font-sans">
                  Stats Bar Preview
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: "terrain",
                      label: "Avg Elevation",
                      value: form.elevation || "—",
                    },
                    {
                      icon: "speed",
                      label: "Difficulty",
                      value: form.difficulty || "—",
                    },
                    {
                      icon: "calendar_month",
                      label: "Best Season",
                      value: form.best_season || "—",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-surface rounded p-3 border-b-2 border-secondary"
                    >
                      <span className="material-symbols-outlined text-secondary text-lg block mb-1">
                        {s.icon}
                      </span>
                      <p className="text-[9px] uppercase tracking-widest text-outline font-sans">
                        {s.label}
                      </p>
                      <p className="text-xs font-semibold text-primary font-serif mt-0.5">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── SPECIALTIES TAB ── */}
          {tab === "specialties" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">
                  Regional Specialties
                </label>
              </div>

              {!form.specialties?.length ? (
                <div className="text-center py-10 bg-surface-container-low rounded border border-dashed border-outline-variant">
                  <p className="text-xs text-on-surface-variant font-sans">
                    No specialties added yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {form.specialties.map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-container-low rounded p-4 border border-outline-variant space-y-4 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-serif font-bold text-outline-variant">
                          #{spec.number}
                        </span>
                        <button
                          onClick={() => {
                            const newSpecs = form.specialties?.filter(
                              (_, i) => i !== idx,
                            );
                            setField("specialties", newSpecs);
                          }}
                          className="text-outline hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                          <label className="block text-[8px] font-semibold uppercase tracking-widest text-outline mb-1 font-sans">
                            Num
                          </label>
                          <input
                            value={spec.number}
                            onChange={(e) => {
                              const newSpecs = [...(form.specialties || [])];
                              newSpecs[idx].number = e.target.value;
                              setField("specialties", newSpecs);
                            }}
                            className="w-full bg-surface border-b border-outline-variant py-1 text-xs font-sans focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="block text-[8px] font-semibold uppercase tracking-widest text-outline mb-1 font-sans">
                            Title
                          </label>
                          <input
                            value={spec.title}
                            onChange={(e) => {
                              const newSpecs = [...(form.specialties || [])];
                              newSpecs[idx].title = e.target.value;
                              setField("specialties", newSpecs);
                            }}
                            placeholder="e.g. Rare Flora"
                            className="w-full bg-surface border-b border-outline-variant py-1 text-xs font-sans focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] font-semibold uppercase tracking-widest text-outline mb-1 font-sans">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={spec.description}
                          onChange={(e) => {
                            const newSpecs = [...(form.specialties || [])];
                            newSpecs[idx].description = e.target.value;
                            setField("specialties", newSpecs);
                          }}
                          className="w-full bg-surface border-b border-outline-variant py-1 text-xs font-sans focus:outline-none focus:border-primary resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const newSpecs = [...(form.specialties || [])];
                    newSpecs.push({
                      region_id: form.id || "",
                      number: String(newSpecs.length + 1).padStart(2, "0"),
                      title: "",
                      description: "",
                      sort_order: newSpecs.length,
                    });
                    setField("specialties", newSpecs);
                  }}
                  className="w-full py-4 border-2 border-dashed border-outline-variant rounded-lg text-outline hover:text-primary hover:border-primary hover:bg-surface-container-low transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Add Specialty
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
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
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Region"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminRegionsPage() {
  const [regions, setRegions] = useState<EditableRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<{
    region: EditableRegion;
    index: number;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    region: EditableRegion;
    index: number;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const loadRegions = useCallback(async () => {
    try {
      const data = await adminGetRegions();
      // Map DB fields to EditableRegion
      const mapped: EditableRegion[] = data.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        tagline: r.tagline || "",
        hero_label: r.hero_label || "",
        hero_image: r.hero_image || "",
        description: r.description || "",
        specialty_image: r.specialty_image || "",
        badge: r.badge || "",
        card_description: r.card_description || "",
        elevation: r.elevation || "",
        difficulty: r.difficulty || "",
        best_season: r.best_season || "",
        sort_order: r.sort_order || 0,
        is_published: r.is_published ?? true,
      }));
      setRegions(mapped);
    } catch (err) {
      console.error("Failed to load regions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => loadRegions());
  }, [loadRegions]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (data: EditableRegion) => {
    // 1. Upsert Region
    const savedRegion = await adminUpsertRegion({
      id: data.id,
      slug: data.slug,
      name: data.name,
      tagline: data.tagline,
      hero_label: data.hero_label,
      hero_image: data.hero_image,
      description: data.description,
      specialty_image: data.specialty_image,
      badge: data.badge,
      card_description: data.card_description,
      elevation: data.elevation,
      difficulty: data.difficulty,
      best_season: data.best_season,
      sort_order: data.sort_order,
      is_published: data.is_published,
    });

    // 2. Handle Specialties (Upsert/Delete)
    if (data.specialties) {
      // Get current specialties from DB to identify deletions
      const currentSpecs = data.id ? await adminGetSpecialties(data.id) : [];
      const currentIds = currentSpecs.map((s) => s.id);
      const newIds = data.specialties.map((s) => s.id).filter(Boolean);

      const toDelete = currentIds.filter((id) => !newIds.includes(id));

      await Promise.all([
        ...data.specialties.map((spec) =>
          adminUpsertSpecialty({
            ...spec,
            region_id: savedRegion.id,
          }),
        ),
        ...toDelete.map((id) => adminDeleteSpecialty(id!)),
      ]);
    }

    showToast(`"${data.name}" saved successfully`);
    loadRegions();
    setDrawerOpen(false);
    setEditTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminDeleteRegion(deleteTarget.region.id!);
      showToast(`"${deleteTarget.region.name}" deleted`);
      loadRegions();
      setDeleteTarget(null);
    } catch (err) {
      if (err instanceof Error) {
        alert(`Delete failed: ${err.message}`);
      } else {
        alert("Delete failed with an unknown error.");
      }
    }
  };

  const openEdit = (region: EditableRegion, index: number) => {
    setEditTarget({ region, index });
    setDrawerOpen(true);
  };

  const openAdd = () => {
    setEditTarget(null);
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
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* ── Top bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-on-surface-variant font-sans">
            <span className="font-semibold text-on-surface">
              {regions.length}
            </span>{" "}
            region{regions.length !== 1 ? "s" : ""} · layout positions are fixed
            by order
          </p>
          {regions.length > 4 && (
            <p className="text-xs text-on-tertiary-fixed-variant font-sans flex items-center gap-1">
              <span className="material-symbols-outlined text-sm shrink-0">info</span>
              Regions beyond position 4 appear as narrow cards.
            </p>
          )}
        </div>
        <button
          onClick={openAdd}
          className="bg-primary text-on-primary px-5 py-2.5 rounded text-xs font-semibold font-sans flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shrink-0 shadow-sm"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add Region
        </button>
      </div>

      {/* ── Live Bento Preview ── */}
      <div className="bg-surface border border-outline-variant rounded p-4 md:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-4 font-sans">
          Live Bento Layout — Destinations Page
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-3">
          {/* Row 1 */}
          {regions[0] && (
            <div
              className="col-span-4 sm:col-span-8 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer"
              style={{ height: 140 }}
              onClick={() => openEdit(regions[0], 0)}
            >
              {regions[0].hero_image && (
                <img
                  src={regions[0].hero_image}
                  alt={regions[0].name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wider font-sans">
                  {regions[0].badge}
                </p>
                <p className="text-sm font-semibold text-white font-serif">
                  {regions[0].name}
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface-variant">
                Wide (8/12)
              </div>
              <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>{" "}
                  Edit
                </span>
              </div>
            </div>
          )}
          {regions[1] && (
            <div
              className="col-span-4 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer"
              style={{ height: 140 }}
              onClick={() => openEdit(regions[1], 1)}
            >
              {regions[1].hero_image && (
                <img
                  src={regions[1].hero_image}
                  alt={regions[1].name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wider font-sans">
                  {regions[1].badge}
                </p>
                <p className="text-sm font-semibold text-white font-serif">
                  {regions[1].name}
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface-variant">
                Narrow (4/12)
              </div>
              <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>{" "}
                  Edit
                </span>
              </div>
            </div>
          )}

          {/* Row 2 */}
          {regions[2] && (
            <div
              className="col-span-4 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer"
              style={{ height: 140 }}
              onClick={() => openEdit(regions[2], 2)}
            >
              {regions[2].hero_image && (
                <img
                  src={regions[2].hero_image}
                  alt={regions[2].name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wider font-sans">
                  {regions[2].badge}
                </p>
                <p className="text-sm font-semibold text-white font-serif">
                  {regions[2].name}
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface-variant">
                Narrow (4/12)
              </div>
              <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>{" "}
                  Edit
                </span>
              </div>
            </div>
          )}
          {regions[3] && (
            <div
              className="col-span-4 sm:col-span-8 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer"
              style={{ height: 140 }}
              onClick={() => openEdit(regions[3], 3)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                <div className="overflow-hidden">
                  {regions[3].hero_image && (
                    <img
                      src={regions[3].hero_image}
                      alt={regions[3].name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="bg-surface-container-high p-4 flex flex-col justify-center">
                  <p className="text-[9px] font-semibold text-outline uppercase tracking-wider font-sans">
                    {regions[3].badge}
                  </p>
                  <p className="text-sm font-semibold text-primary font-serif mt-1">
                    {regions[3].name}
                  </p>
                  <p className="text-[10px] text-on-surface-variant font-sans mt-1 line-clamp-1 sm:line-clamp-2">
                    {regions[3].card_description}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface-variant">
                Wide Split (8/12)
              </div>
              <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>{" "}
                  Edit
                </span>
              </div>
            </div>
          )}
          {/* Overflow regions (5th+) — rendered as narrow cards */}
          {regions.slice(4).map((region, i) => (
            <div
              key={region.slug}
              className="col-span-4 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer"
              style={{ height: 140 }}
              onClick={() => openEdit(region, i + 4)}
            >
              {region.hero_image ? (
                <img
                  src={region.hero_image}
                  alt={region.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-container">
                  <span className="material-symbols-outlined text-outline-variant">
                    image
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wider font-sans">
                  {region.badge}
                </p>
                <p className="text-sm font-semibold text-white font-serif">
                  {region.name}
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-tertiary-fixed-variant">
                Overflow #{i + 5}
              </div>
              <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>{" "}
                  Edit
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-outline font-sans mt-3 text-center">
          Click any card to edit · Positions 1–4 have fixed layouts · Extra
          regions appear as narrow cards
        </p>
      </div>

      {/* ── Region cards list ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {regions.map((region, index) => {
          const layout = getBentoLayout(index);
          return (
            <div
              key={region.slug}
              className="bg-surface border border-outline-variant rounded overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-36 bg-surface-container overflow-hidden">
                {region.hero_image ? (
                  <img
                    src={region.hero_image}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">
                      image
                    </span>
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-surface/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface">
                  Position {index + 1} · {toBentoLabel(layout)}
                </div>
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(region, index)}
                    className="w-7 h-7 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ region, index })}
                    className="w-7 h-7 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-base font-semibold text-primary">
                      {region.name}
                    </h3>
                    <p className="text-xs text-secondary font-sans">
                      {region.tagline}
                    </p>
                  </div>
                  <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-semibold font-sans text-on-surface-variant shrink-0">
                    {region.badge}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-sans line-clamp-2 leading-relaxed">
                  {region.card_description}
                </p>
                <div className="pt-2 border-t border-outline-variant grid grid-cols-3 gap-2">
                  {[
                    { icon: "terrain", val: region.elevation || "—" },
                    { icon: "speed", val: region.difficulty || "—" },
                    {
                      icon: "calendar_month",
                      val: region.best_season || "—",
                    },
                  ].map((s) => (
                    <div
                      key={s.icon}
                      className="flex items-center gap-1 text-[10px] text-on-surface-variant font-sans"
                    >
                      <span className="material-symbols-outlined text-sm text-secondary">
                        {s.icon}
                      </span>
                      <span className="truncate">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-4 flex gap-2">
                <button
                  onClick={() => openEdit(region, index)}
                  className="flex-1 border border-primary text-primary rounded px-3 py-2 text-xs font-semibold font-sans hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget({ region, index })}
                  className="flex-1 border border-outline-variant text-on-surface-variant rounded px-3 py-2 text-xs font-semibold font-sans hover:border-error hover:text-error transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Drawer ── */}
      {drawerOpen && (
        <RegionDrawer
          initial={editTarget?.region ?? null}
          allRegions={regions}
          position={editTarget?.index ?? regions.length}
          onSave={handleSave}
          onClose={() => {
            setDrawerOpen(false);
            setEditTarget(null);
          }}
        />
      )}

      {/* ── Delete confirm ── */}
      {deleteTarget && (
        <DeleteDialog
          region={deleteTarget.region}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-xl text-sm font-sans font-semibold flex items-center gap-2 z-50">
          <span className="material-symbols-outlined text-base">
            check_circle
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}
