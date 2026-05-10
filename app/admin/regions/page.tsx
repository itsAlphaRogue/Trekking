"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadImage, regionImagePath, deleteImage } from "@/lib/supabase/storage";

// ─── Types ────────────────────────────────────────────────────────────────────
type TabName = "content" | "images" | "stats" | "specialties";

interface RegionRow {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  card_description: string | null;
  hero_image: string | null;
  hero_label: string | null;
  specialty_image: string | null;
  badge: string | null;
  elevation: string | null;
  difficulty: string | null;
  best_season: string | null;
  sort_order: number;
  is_published: boolean;
}

interface SpecialtyRow {
  id: string;
  region_id: string;
  number: string;
  title: string;
  description: string | null;
  sort_order: number;
}

// Form types — maps to what the drawer edits
interface RegionForm {
  slug: string;
  name: string;
  tagline: string;
  heroLabel: string;
  heroImage: string;
  description: string;
  specialtyImage: string;
  badge: string;
  cardDescription: string;
  elevation: string;
  difficulty: string;
  bestSeason: string;
  isPublished: boolean;
}

function dbToForm(r: RegionRow): RegionForm {
  return {
    slug: r.slug,
    name: r.name,
    tagline: r.tagline ?? "",
    heroLabel: r.hero_label ?? "",
    heroImage: r.hero_image ?? "",
    description: r.description ?? "",
    specialtyImage: r.specialty_image ?? "",
    badge: r.badge ?? "",
    cardDescription: r.card_description ?? "",
    elevation: r.elevation ?? "",
    difficulty: r.difficulty ?? "",
    bestSeason: r.best_season ?? "",
    isPublished: r.is_published,
  };
}

function formToDb(form: RegionForm): Partial<RegionRow> {
  return {
    slug: form.slug,
    name: form.name,
    tagline: form.tagline || null,
    hero_label: form.heroLabel || null,
    hero_image: form.heroImage || null,
    description: form.description || null,
    specialty_image: form.specialtyImage || null,
    badge: form.badge || null,
    card_description: form.cardDescription || null,
    elevation: form.elevation || null,
    difficulty: form.difficulty || null,
    best_season: form.bestSeason || null,
  };
}

const BENTO_LAYOUTS_FIXED = ["large", "small", "small", "large-split"] as const;
type BentoLayout = "large" | "small" | "large-split";

function getBentoLayout(index: number): BentoLayout {
  return (BENTO_LAYOUTS_FIXED[index] as BentoLayout) ?? "small";
}

function toBentoLabel(layout: BentoLayout): string {
  switch (layout) {
    case "large": return "Wide card (8/12 cols)";
    case "small": return "Narrow card (4/12 cols)";
    case "large-split": return "Wide split card (8/12 cols)";
  }
}

// ─── Image Uploader ────────────────────────────────────────────────────────────

function ImageUploader({
  label,
  value,
  onChange,
  slug,
  imageType,
  maxMb = 8,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  slug: string;
  imageType: "hero" | "specialty";
  maxMb?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!ACCEPTED.includes(file.type)) { setError("Only JPG, PNG, or WebP files are accepted."); return; }
      if (file.size > maxMb * 1024 * 1024) { setError(`File must be under ${maxMb}MB.`); return; }
      setUploading(true);
      try {
        const path = regionImagePath(slug, file, imageType);
        const publicUrl = await uploadImage(file, "region-images", path);
        onChange(publicUrl);
      } catch (err: any) {
        setError(err.message ?? "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange, slug, imageType, maxMb, ACCEPTED],
  );

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) processFile(f); };
  const clear = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value) { try { await deleteImage(value, "region-images"); } catch {} }
    onChange("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">{label}</label>
      {value ? (
        <div className="relative rounded overflow-hidden bg-surface-container group">
          <img src={value} alt={label} className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-inverse-surface/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center gap-2 bg-surface text-on-surface px-3 py-1.5 rounded text-xs font-semibold font-sans hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-sm">swap_horiz</span>Replace
            </button>
            <button type="button" onClick={clear} className="flex items-center gap-2 bg-error text-on-error px-3 py-1.5 rounded text-xs font-semibold font-sans hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-sm">delete</span>Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button" onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
          disabled={uploading}
          className={`w-full border-2 border-dashed rounded flex flex-col items-center justify-center py-7 gap-2 cursor-pointer transition-colors ${dragOver ? "border-primary bg-primary-fixed/20" : "border-outline-variant bg-surface-container-low hover:border-primary hover:bg-surface-container"} ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <span className={`material-symbols-outlined text-2xl ${dragOver ? "text-primary" : "text-outline"}`}>{uploading ? "hourglass_top" : dragOver ? "file_download" : "cloud_upload"}</span>
          <p className="text-xs font-semibold text-on-surface font-sans">{uploading ? "Uploading…" : dragOver ? "Drop to upload" : "Drag & drop or click"}</p>
          <p className="text-[10px] text-outline font-sans">JPG, PNG, WebP · Max {maxMb}MB</p>
        </button>
      )}
      <input ref={inputRef} type="file" accept={ACCEPTED.join(",")} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
      {error && <p className="text-xs text-error mt-1 font-sans flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span>{error}</p>}
    </div>
  );
}

// ─── Bento Preview ────────────────────────────────────────────────────────────

function BentoPreview({ regions, highlightSlug }: { regions: RegionForm[]; highlightSlug: string }) {
  const cardBase = "relative overflow-hidden bg-surface-container-high transition-all";
  const highlight = "ring-2 ring-primary";

  const Img = ({ r, cls }: { r: RegionForm; cls: string }) => (
    <div className={`${cls} overflow-hidden`}>
      {r.heroImage ? <img src={r.heroImage} alt={r.name} className="w-full h-full object-cover" /> : (
        <div className="w-full h-full bg-surface-container-highest flex items-center justify-center"><span className="material-symbols-outlined text-outline-variant">image</span></div>
      )}
    </div>
  );

  const Badge = ({ r }: { r: RegionForm }) => (
    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
      <p className="text-[9px] font-semibold text-white font-sans truncate">{r.name}</p>
      <p className="text-[8px] text-white/70 font-sans truncate">{r.badge}</p>
    </div>
  );

  const [r0, r1, r2, r3] = regions;
  const overflow = regions.slice(4);

  return (
    <div className="bg-surface-container-low rounded p-3 border border-outline-variant">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-3 font-sans">Bento Preview — Destinations Page</p>
      <div className="grid grid-cols-12 gap-1">
        {r0 && (<div className={`col-span-8 h-16 ${cardBase} ${r0.slug === highlightSlug ? highlight : ""}`}><Img r={r0} cls="w-full h-full" /><Badge r={r0} /></div>)}
        {r1 && (<div className={`col-span-4 h-16 ${cardBase} ${r1.slug === highlightSlug ? highlight : ""}`}><Img r={r1} cls="w-full h-full" /><Badge r={r1} /></div>)}
        {r2 && (<div className={`col-span-4 h-16 ${cardBase} ${r2.slug === highlightSlug ? highlight : ""}`}><Img r={r2} cls="w-full h-full" /><Badge r={r2} /></div>)}
        {r3 && (
          <div className={`col-span-8 h-16 ${cardBase} ${r3.slug === highlightSlug ? highlight : ""}`}>
            <div className="grid grid-cols-2 h-full">
              <Img r={r3} cls="h-full" />
              <div className="bg-surface-container-highest flex items-center justify-center p-1"><p className="text-[8px] font-semibold text-primary font-sans text-center truncate">{r3.name}</p></div>
            </div>
          </div>
        )}
        {overflow.map((r, i) => (
          <div key={r.slug} className={`col-span-4 h-16 ${cardBase} ${r.slug === highlightSlug ? highlight : ""}`}>
            <Img r={r} cls="w-full h-full" /><Badge r={r} />
            <div className="absolute top-1 right-1 bg-surface-container/80 rounded text-[7px] font-semibold font-sans px-1 text-on-tertiary-fixed-variant">+{i + 5}</div>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-outline font-sans mt-2 text-center">Blue outline = region being edited · Extra regions appear as narrow cards</p>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteDialog({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-surface rounded-lg border border-outline-variant shadow-xl p-8 max-w-sm w-full">
        <div className="w-12 h-12 bg-error-container rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-error">delete_forever</span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-on-surface text-center mb-2">Delete Region?</h3>
        <p className="text-sm text-on-surface-variant text-center font-sans mb-2">
          <span className="font-semibold text-on-surface">{name}</span> will be removed from the destinations page and its bento card position will be vacant.
        </p>
        <p className="text-xs text-error text-center font-sans mb-6">All trek packages linked to this region will lose their region reference.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-outline-variant text-on-surface-variant rounded px-4 py-2.5 text-sm font-semibold font-sans hover:bg-surface-container transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 bg-error text-on-error rounded px-4 py-2.5 text-sm font-semibold font-sans hover:opacity-90 transition-opacity">Delete Region</button>
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
  initial: RegionForm | null;
  allRegions: RegionForm[];
  position: number;
  onSave: (data: RegionForm) => Promise<void>;
  onClose: () => void;
}) {
  const isEdit = !!initial;
  const supabase = createClient();

  const emptyForm = (): RegionForm => ({
    slug: "", name: "", tagline: "", heroLabel: "", heroImage: "", description: "",
    specialtyImage: "", badge: "", cardDescription: "",
    elevation: "", difficulty: "", bestSeason: "",
    isPublished: true,
  });

  const [form, setForm] = useState<RegionForm>(initial ?? emptyForm());
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [tab, setTab] = useState<TabName>("content");
  const [saving, setSaving] = useState(false);

  // Specialties state
  const [specialties, setSpecialties] = useState<SpecialtyRow[]>([]);
  const [specLoading, setSpecLoading] = useState(false);
  const [regionId, setRegionId] = useState<string | null>(null);

  // Load specialties when editing
  useEffect(() => {
    if (!isEdit) return;
    async function loadSpecialties() {
      setSpecLoading(true);
      const { data: region } = await supabase
        .from("regions")
        .select("id")
        .eq("slug", initial!.slug)
        .single();
      if (region) {
        setRegionId(region.id);
        const { data: specs } = await supabase
          .from("region_specialties")
          .select("*")
          .eq("region_id", region.id)
          .order("sort_order", { ascending: true });
        if (specs) setSpecialties(specs as SpecialtyRow[]);
      }
      setSpecLoading(false);
    }
    loadSpecialties();
  }, [initial?.slug, isEdit]);

  const set = <K extends keyof RegionForm>(key: K, val: RegionForm[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const autoSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.tagline.trim()) e.tagline = "Tagline is required";
    if (!form.badge.trim()) e.badge = "Badge label is required";
    if (!form.cardDescription.trim()) e.cardDescription = "Card description is required";
    if (!form.description.trim()) e.description = "Full description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  const previewRegions = allRegions.map((r, i) => (i === position ? form : r));
  if (!isEdit) previewRegions[position] = form;
  const bentoLayout = BENTO_LAYOUTS_FIXED[position] ?? "small";

  // ─── Specialty helpers ───
  const addSpecialty = async () => {
    if (!regionId) return;
    const spec: Partial<SpecialtyRow> = {
      region_id: regionId,
      number: String(specialties.length + 1).padStart(2, "0"),
      title: "",
      description: null,
      sort_order: specialties.length,
    };
    const { data, error } = await supabase.from("region_specialties").insert(spec).select().single();
    if (!error && data) setSpecialties((prev) => [...prev, data as SpecialtyRow]);
  };

  const updateSpecialty = async (idx: number, updates: Partial<SpecialtyRow>) => {
    const spec = specialties[idx];
    if (spec.id) await supabase.from("region_specialties").update(updates).eq("id", spec.id);
    setSpecialties((prev) => prev.map((s, i) => (i === idx ? { ...s, ...updates } : s)));
  };

  const deleteSpecialty = async (idx: number) => {
    const spec = specialties[idx];
    if (spec.id) await supabase.from("region_specialties").delete().eq("id", spec.id);
    setSpecialties((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-xl bg-surface h-full flex flex-col shadow-2xl overflow-hidden">
        <div className="px-8 py-5 border-b border-outline-variant flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif text-xl font-semibold text-primary">{isEdit ? "Edit Region" : "Add New Region"}</h2>
            <p className="text-xs text-on-surface-variant font-sans mt-0.5 flex items-center gap-2">
              <span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-semibold font-sans">{toBentoLabel(bentoLayout)}</span>
              {isEdit ? `Editing position ${position + 1}` : "Will be added at end"}
            </p>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-outline-variant shrink-0 overflow-x-auto">
          {(["content", "images", "stats", "specialties"] as TabName[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              disabled={t === "specialties" && !isEdit}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widest font-sans transition-colors whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed ${
                tab === t ? "border-b-2 border-primary text-primary" : "text-on-surface-variant hover:text-primary"}`}>
              {t === "content" ? "Content" : t === "images" ? "Images" : t === "stats" ? "Stats" : "Specialties"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* ── CONTENT TAB ── */}
          {tab === "content" && (
            <>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Region Name *</label>
                <input value={form.name}
                  onChange={(e) => { set("name", e.target.value); if (!isEdit) set("slug", autoSlug(e.target.value)); }}
                  placeholder="e.g. Everest Region"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${errors.name ? "border-error" : "border-secondary focus:border-primary"}`} />
                {errors.name && <p className="text-xs text-error mt-1 font-sans">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">URL Slug *</label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-outline font-sans shrink-0">/destinations/</span>
                    <input value={form.slug}
                      onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      placeholder="everest"
                      className={`flex-1 bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors min-w-0 ${errors.slug ? "border-error" : "border-secondary focus:border-primary"}`} />
                  </div>
                  {errors.slug && <p className="text-xs text-error mt-1 font-sans">{errors.slug}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Hero Label</label>
                  <input value={form.heroLabel} onChange={(e) => set("heroLabel", e.target.value)}
                    placeholder="e.g. Nepal Sanctuary"
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Tagline * <span className="normal-case text-outline">(shown in hero)</span></label>
                <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)}
                  placeholder="e.g. Heart of the Himalayas"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${errors.tagline ? "border-error" : "border-secondary focus:border-primary"}`} />
                {errors.tagline && <p className="text-xs text-error mt-1 font-sans">{errors.tagline}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Bento Badge Label * <span className="normal-case text-outline">(shown on card)</span></label>
                <input value={form.badge} onChange={(e) => set("badge", e.target.value)}
                  placeholder="e.g. Iconic"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${errors.badge ? "border-error" : "border-secondary focus:border-primary"}`} />
                {errors.badge && <p className="text-xs text-error mt-1 font-sans">{errors.badge}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Short Card Description * <span className="normal-case text-outline">(shown on bento card, ~100 chars)</span></label>
                <textarea rows={2} value={form.cardDescription} onChange={(e) => set("cardDescription", e.target.value)}
                  placeholder="A concise description for the destinations grid…"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors resize-none ${errors.cardDescription ? "border-error" : "border-secondary focus:border-primary"}`} />
                <p className="text-[10px] text-outline font-sans mt-1">{form.cardDescription.length} chars</p>
                {errors.cardDescription && <p className="text-xs text-error mt-1 font-sans">{errors.cardDescription}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Full Description *</label>
                <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                  placeholder="The full description shown on the region detail page…"
                  className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors resize-none ${errors.description ? "border-error" : "border-secondary focus:border-primary"}`} />
                {errors.description && <p className="text-xs text-error mt-1 font-sans">{errors.description}</p>}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => set("isPublished", e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                <span className="text-sm font-sans text-on-surface">Published</span>
              </label>

              <BentoPreview regions={previewRegions} highlightSlug={form.slug} />
            </>
          )}

          {/* ── IMAGES TAB ── */}
          {tab === "images" && (
            <>
              <div className="bg-surface-container-low rounded p-4 border border-outline-variant text-xs text-on-surface-variant font-sans space-y-1">
                <p><span className="font-semibold text-on-surface">Hero Image</span> — full-bleed background on the region detail page (1920×1080px)</p>
                <p><span className="font-semibold text-on-surface">Specialty Image</span> — shown in the "Regional Specialties" section (portrait 4:5)</p>
              </div>
              <ImageUploader label="Hero Image" value={form.heroImage} onChange={(url) => set("heroImage", url)} slug={form.slug || "new-region"} imageType="hero" />
              <ImageUploader label="Specialty / Interior Image" value={form.specialtyImage} onChange={(url) => set("specialtyImage", url)} slug={form.slug || "new-region"} imageType="specialty" />
              <BentoPreview regions={previewRegions} highlightSlug={form.slug} />
            </>
          )}

          {/* ── STATS TAB ── */}
          {tab === "stats" && (
            <>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Average Elevation</label>
                <input value={form.elevation} onChange={(e) => set("elevation", e.target.value)}
                  placeholder="e.g. 4,000m+"
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Difficulty Range</label>
                <input value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}
                  placeholder="e.g. Moderate to Challenging"
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Best Season</label>
                <input value={form.bestSeason} onChange={(e) => set("bestSeason", e.target.value)}
                  placeholder="e.g. Mar–May & Oct–Nov"
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div className="bg-surface-container-low rounded p-4 border border-outline-variant">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-3 font-sans">Stats Bar Preview</p>
                <div className="grid grid-cols-3 gap-3">
                  {[{ icon: "terrain", label: "Avg Elevation", value: form.elevation || "—" },
                    { icon: "speed", label: "Difficulty", value: form.difficulty || "—" },
                    { icon: "calendar_month", label: "Best Season", value: form.bestSeason || "—" }].map((s) => (
                    <div key={s.label} className="bg-surface rounded p-3 border-b-2 border-secondary">
                      <span className="material-symbols-outlined text-secondary text-lg block mb-1">{s.icon}</span>
                      <p className="text-[9px] uppercase tracking-widest text-outline font-sans">{s.label}</p>
                      <p className="text-xs font-semibold text-primary font-serif mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── SPECIALTIES TAB ── */}
          {tab === "specialties" && (
            <>
              {!isEdit && (
                <div className="bg-surface-container-low rounded p-6 border border-outline-variant text-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-3 block">save</span>
                  <p className="text-sm text-on-surface-variant font-sans">Save the region first to manage specialties.</p>
                </div>
              )}

              {isEdit && specLoading && (
                <div className="flex items-center justify-center py-12">
                  <span className="material-symbols-outlined text-3xl text-outline-variant animate-spin">progress_activity</span>
                </div>
              )}

              {isEdit && !specLoading && (
                <div className="space-y-4">
                  {specialties.map((spec, idx) => (
                    <div key={spec.id || idx} className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary font-sans">Specialty {idx + 1}</span>
                        <button onClick={() => deleteSpecialty(idx)} className="text-on-surface-variant hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <input value={spec.number} onChange={(e) => updateSpecialty(idx, { number: e.target.value })}
                          placeholder="01"
                          className="col-span-1 bg-surface border-b border-outline-variant px-0 py-2 text-xs font-sans focus:outline-none focus:border-primary transition-colors" />
                        <input value={spec.title} onChange={(e) => updateSpecialty(idx, { title: e.target.value })}
                          placeholder="Specialty title…"
                          className="col-span-3 bg-surface border-b border-outline-variant px-0 py-2 text-xs font-sans focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <textarea rows={2} value={spec.description ?? ""}
                        onChange={(e) => updateSpecialty(idx, { description: e.target.value || null })}
                        placeholder="Specialty description…"
                        className="w-full bg-surface border-b border-outline-variant px-0 py-2 text-xs font-sans focus:outline-none focus:border-primary transition-colors resize-none" />
                    </div>
                  ))}

                  <button onClick={addSpecialty}
                    className="w-full border-2 border-dashed border-outline-variant rounded p-4 text-xs font-semibold text-on-surface-variant font-sans hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-base">add</span>Add Specialty
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-8 py-5 border-t border-outline-variant flex gap-3 shrink-0">
          <button onClick={onClose} className="flex-1 border border-outline-variant text-on-surface-variant rounded px-4 py-3 text-sm font-semibold font-sans hover:bg-surface-container transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 bg-primary text-on-primary rounded px-4 py-3 text-sm font-semibold font-sans hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
            <span className="material-symbols-outlined text-base">{saving ? "hourglass_top" : isEdit ? "save" : "add_circle"}</span>
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Region"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminRegionsPage() {
  const supabase = createClient();

  const [regions, setRegions] = useState<RegionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<{ region: RegionForm; index: number } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ region: RegionForm; index: number; dbId: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetchRegions = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("regions")
      .select("*")
      .order("sort_order", { ascending: true });
    if (err) setError(err.message);
    else setRegions((data as RegionRow[]) ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { fetchRegions(); }, [fetchRegions]);

  const regionForms = regions.map(dbToForm);

  const handleSave = async (data: RegionForm) => {
    const supabaseLocal = createClient();
    const payload = formToDb(data);

    let saved: RegionRow | null = null;

    if (editTarget !== null) {
      const dbId = regions[editTarget.index]?.id;
      const { data: updated, error: err } = await supabaseLocal
        .from("regions")
        .update({ ...payload, sort_order: editTarget.index })
        .eq("id", dbId)
        .select()
        .single();
      if (err) { showToast(`Error: ${err.message}`); return; }
      saved = updated as RegionRow;
    } else {
      const { data: inserted, error: err } = await supabaseLocal
        .from("regions")
        .insert({ ...payload, sort_order: regions.length })
        .select()
        .single();
      if (err) { showToast(`Error: ${err.message}`); return; }
      saved = inserted as RegionRow;
    }

    showToast(`"${data.name}" ${editTarget !== null ? "updated" : "added"} successfully`);
    setDrawerOpen(false);
    setEditTarget(null);
    await fetchRegions(); // Re-fetch to get the correct sort_order and ID
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const supabaseLocal = createClient();
    // Clean up images
    const reg = regions[deleteTarget.index];
    if (reg?.hero_image) { try { await deleteImage(reg.hero_image, "region-images"); } catch {} }
    if (reg?.specialty_image) { try { await deleteImage(reg.specialty_image, "region-images"); } catch {} }

    const { error: err } = await supabaseLocal.from("regions").delete().eq("id", deleteTarget.dbId);
    if (err) { showToast(`Error: ${err.message}`); return; }

    showToast(`"${deleteTarget.region.name}" deleted`);
    setDeleteTarget(null);
    await fetchRegions();
  };

  const openEdit = (region: RegionForm, index: number) => {
    setEditTarget({ region, index });
    setDrawerOpen(true);
  };

  const openAdd = () => { setEditTarget(null); setDrawerOpen(true); };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-on-surface-variant font-sans">
            <span className="font-semibold text-on-surface">{regions.length}</span> region{regions.length !== 1 ? "s" : ""} · layout positions are fixed by order
          </p>
          {regions.length > 4 && (
            <p className="text-xs text-on-tertiary-fixed-variant font-sans flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">info</span>
              Regions beyond position 4 appear as narrow cards at the bottom.
            </p>
          )}
        </div>
        <button onClick={openAdd} className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors shrink-0">
          <span className="material-symbols-outlined text-base">add</span>Add Region
        </button>
      </div>

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
          <p className="font-serif text-xl text-primary">Failed to load regions</p>
          <p className="text-sm text-on-surface-variant font-sans">{error}</p>
          <button onClick={fetchRegions} className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans">Retry</button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && regions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 gap-4 bg-surface border border-outline-variant rounded">
          <span className="material-symbols-outlined text-6xl text-outline-variant">travel_explore</span>
          <p className="font-serif text-xl text-primary">No regions yet</p>
          <p className="text-sm text-on-surface-variant font-sans">Add your first trekking region to populate the destinations page.</p>
          <button onClick={openAdd} className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 mt-2">
            <span className="material-symbols-outlined text-base">add</span>Add First Region
          </button>
        </div>
      )}

      {!loading && regions.length > 0 && (
        <>
          {/* Live Bento Preview */}
          <div className="bg-surface border border-outline-variant rounded p-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-4 font-sans">Live Bento Layout — Destinations Page</p>
            <div className="grid grid-cols-12 gap-3">
              {regionForms[0] && (
                <div className="col-span-8 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer" style={{ height: 140 }}
                  onClick={() => openEdit(regionForms[0], 0)}>
                  {regionForms[0].heroImage && <img src={regionForms[0].heroImage} alt={regionForms[0].name} className="w-full h-full object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wider font-sans">{regionForms[0].badge}</p>
                    <p className="text-sm font-semibold text-white font-serif">{regionForms[0].name}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface-variant">Wide (8/12)</div>
                  <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </span>
                  </div>
                </div>
              )}
              {regionForms[1] && (
                <div className="col-span-4 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer" style={{ height: 140 }}
                  onClick={() => openEdit(regionForms[1], 1)}>
                  {regionForms[1].heroImage && <img src={regionForms[1].heroImage} alt={regionForms[1].name} className="w-full h-full object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wider font-sans">{regionForms[1].badge}</p>
                    <p className="text-sm font-semibold text-white font-serif">{regionForms[1].name}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface-variant">Narrow (4/12)</div>
                  <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </span>
                  </div>
                </div>
              )}
              {regionForms[2] && (
                <div className="col-span-4 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer" style={{ height: 140 }}
                  onClick={() => openEdit(regionForms[2], 2)}>
                  {regionForms[2].heroImage && <img src={regionForms[2].heroImage} alt={regionForms[2].name} className="w-full h-full object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wider font-sans">{regionForms[2].badge}</p>
                    <p className="text-sm font-semibold text-white font-serif">{regionForms[2].name}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface-variant">Narrow (4/12)</div>
                  <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </span>
                  </div>
                </div>
              )}
              {regionForms[3] && (
                <div className="col-span-8 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer" style={{ height: 140 }}
                  onClick={() => openEdit(regionForms[3], 3)}>
                  <div className="grid grid-cols-2 h-full">
                    <div className="overflow-hidden">
                      {regionForms[3].heroImage && <img src={regionForms[3].heroImage} alt={regionForms[3].name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="bg-surface-container-high p-4 flex flex-col justify-center">
                      <p className="text-[9px] font-semibold text-outline uppercase tracking-wider font-sans">{regionForms[3].badge}</p>
                      <p className="text-sm font-semibold text-primary font-serif mt-1">{regionForms[3].name}</p>
                      <p className="text-[10px] text-on-surface-variant font-sans mt-1 line-clamp-2">{regionForms[3].cardDescription}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface-variant">Wide Split (8/12)</div>
                  <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </span>
                  </div>
                </div>
              )}
              {regionForms.slice(4).map((region, i) => (
                <div key={region.slug} className="col-span-4 relative overflow-hidden bg-surface-container-high rounded group cursor-pointer" style={{ height: 140 }}
                  onClick={() => openEdit(region, i + 4)}>
                  {region.heroImage ? <img src={region.heroImage} alt={region.name} className="w-full h-full object-cover" /> : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-container"><span className="material-symbols-outlined text-outline-variant">image</span></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <p className="text-[9px] font-semibold text-white/60 uppercase tracking-wider font-sans">{region.badge}</p>
                    <p className="text-sm font-semibold text-white font-serif">{region.name}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-surface-container/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-tertiary-fixed-variant">Overflow #{i + 5}</div>
                  <div className="absolute inset-0 ring-2 ring-primary opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-surface/90 rounded px-3 py-1.5 text-xs font-semibold font-sans text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-outline font-sans mt-3 text-center">Click any card to edit · Positions 1–4 have fixed layouts · Extra regions appear as narrow cards</p>
          </div>

          {/* Region cards list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {regionForms.map((region, index) => {
              const layout = getBentoLayout(index);
              return (
                <div key={region.slug || index} className="bg-surface border border-outline-variant rounded overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                  <div className="relative h-36 bg-surface-container overflow-hidden">
                    {region.heroImage ? (
                      <img src={region.heroImage} alt={region.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-outline-variant">image</span></div>
                    )}
                    <div className="absolute top-2 left-2 bg-surface/90 rounded text-[9px] font-semibold font-sans px-2 py-0.5 text-on-surface">Position {index + 1} · {toBentoLabel(layout)}</div>
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(region, index)} className="w-7 h-7 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button onClick={() => setDeleteTarget({ region, index, dbId: regions[index]?.id })} className="w-7 h-7 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-5 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-base font-semibold text-primary">{region.name}</h3>
                        <p className="text-xs text-secondary font-sans">{region.tagline}</p>
                      </div>
                      <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-semibold font-sans text-on-surface-variant shrink-0">{region.badge}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-sans line-clamp-2 leading-relaxed">{region.cardDescription}</p>
                    <div className="pt-2 border-t border-outline-variant grid grid-cols-3 gap-2">
                      {[{ icon: "terrain", val: region.elevation || "—" }, { icon: "speed", val: region.difficulty || "—" }, { icon: "calendar_month", val: region.bestSeason || "—" }].map((s) => (
                        <div key={s.icon} className="flex items-center gap-1 text-[10px] text-on-surface-variant font-sans">
                          <span className="material-symbols-outlined text-sm text-secondary">{s.icon}</span>
                          <span className="truncate">{s.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 pb-4 flex gap-2">
                    <button onClick={() => openEdit(region, index)} className="flex-1 border border-primary text-primary rounded px-3 py-2 text-xs font-semibold font-sans hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </button>
                    <button onClick={() => setDeleteTarget({ region, index, dbId: regions[index]?.id })} className="flex-1 border border-outline-variant text-on-surface-variant rounded px-3 py-2 text-xs font-semibold font-sans hover:border-error hover:text-error transition-colors flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">delete</span>Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {drawerOpen && (
        <RegionDrawer
          initial={editTarget?.region ?? null}
          allRegions={regionForms}
          position={editTarget?.index ?? regions.length}
          onSave={handleSave}
          onClose={() => { setDrawerOpen(false); setEditTarget(null); }}
        />
      )}

      {deleteTarget && (
        <DeleteDialog name={deleteTarget.region.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-xl text-sm font-sans font-semibold flex items-center gap-2 z-50">
          <span className="material-symbols-outlined text-base">check_circle</span>
          {toast}
        </div>
      )}
    </div>
  );
}