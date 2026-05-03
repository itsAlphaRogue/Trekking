"use client";

import { useState, useRef, useCallback } from "react";
import { allTreks, TrekListing, Difficulty } from "@/lib/trekListings";

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "grid" | "list";

const DIFFICULTIES: Difficulty[] = ["Easy", "Moderate", "Strenuous", "Challenging", "Remote"];

const REGIONS = [
  { value: "everest",   label: "Everest Region" },
  { value: "annapurna", label: "Annapurna Region" },
  { value: "langtang",  label: "Langtang Valley" },
  { value: "manaslu",   label: "Manaslu Region" },
];

const diffBadge: Record<Difficulty, string> = {
  Easy:        "bg-secondary-container text-on-secondary-fixed-variant",
  Moderate:    "bg-primary-fixed text-on-primary-fixed-variant",
  Strenuous:   "bg-primary text-on-primary",
  Challenging: "bg-tertiary-container text-on-tertiary-container",
  Remote:      "bg-tertiary-fixed text-on-tertiary-fixed-variant",
};

const emptyForm = (): Omit<TrekListing, "id"> => ({
  slug: "",
  title: "",
  description: "",
  region: "everest",
  regionLabel: "Everest Region",
  duration: 7,
  difficulty: "Moderate",
  priceFrom: 1000,
  image: "",
});

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

function DeleteDialog({
  trip,
  onConfirm,
  onCancel,
}: {
  trip: TrekListing;
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
        <h3 className="font-serif text-xl font-semibold text-on-surface text-center mb-2">
          Delete Package?
        </h3>
        <p className="text-sm text-on-surface-variant text-center font-sans mb-6">
          <span className="font-semibold text-on-surface">{trip.title}</span> will be permanently
          removed from the public trips page. This cannot be undone.
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
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_MB = 5;
  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      if (!ACCEPTED.includes(file.type)) {
        setError("Only JPG, PNG, or WebP files are accepted.");
        return;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`File must be under ${MAX_MB}MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        // TODO (Supabase): replace the line above with:
        // const { data, error } = await supabase.storage
        //   .from("trek-images")
        //   .upload(`treks/${Date.now()}-${file.name}`, file, { upsert: true });
        // if (data) {
        //   const { data: { publicUrl } } = supabase.storage
        //     .from("trek-images").getPublicUrl(data.path);
        //   onChange(publicUrl);
        // }
      };
      reader.readAsDataURL(file);
    },
    [onChange]
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

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
        Cover Image *
      </label>

      {value ? (
        /* ── Preview state ── */
        <div className="relative rounded overflow-hidden bg-surface-container group">
          <img
            src={value}
            alt="Cover preview"
            className="w-full h-48 object-cover"
          />
          {/* Overlay on hover */}
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
          {/* File name badge */}
          <div className="absolute bottom-2 left-2 bg-inverse-surface/70 text-inverse-on-surface text-[10px] font-sans px-2 py-1 rounded">
            Image uploaded
          </div>
        </div>
      ) : (
        /* ── Drop zone state ── */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded transition-colors flex flex-col items-center justify-center py-10 gap-3 cursor-pointer ${
            dragOver
              ? "border-primary bg-primary-fixed/20"
              : "border-outline-variant bg-surface-container-low hover:border-primary hover:bg-surface-container"
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            dragOver ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"
          }`}>
            <span className="material-symbols-outlined text-2xl">
              {dragOver ? "file_download" : "cloud_upload"}
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-on-surface font-sans">
              {dragOver ? "Drop to upload" : "Drag & drop or click to upload"}
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
}: {
  initial: TrekListing | null;
  onSave: (data: Omit<TrekListing, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<TrekListing, "id">>(
    initial
      ? { slug: initial.slug, title: initial.title, description: initial.description,
          region: initial.region, regionLabel: initial.regionLabel, duration: initial.duration,
          difficulty: initial.difficulty, priceFrom: initial.priceFrom, image: initial.image }
      : emptyForm()
  );
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim())       e.title       = "Title is required";
    if (!form.slug.trim())        e.slug        = "Slug is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.duration < 1)        e.duration    = "Must be at least 1 day";
    if (form.priceFrom < 1)       e.priceFrom   = "Must be a positive amount";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    // Sync regionLabel with region
    const regionLabel = REGIONS.find((r) => r.value === form.region)?.label ?? form.regionLabel;
    onSave({ ...form, regionLabel });
  };

  const isEdit = !!initial;

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

        {/* Form body — scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

          {/* Title */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
              Package Title *
            </label>
            <input
              value={form.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (!isEdit) set("slug", autoSlug(e.target.value));
              }}
              placeholder="e.g. Everest Base Camp Trek"
              className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                errors.title ? "border-error text-error" : "border-secondary focus:border-primary"
              }`}
            />
            {errors.title && <p className="text-xs text-error mt-1 font-sans">{errors.title}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-on-surface-variant font-sans shrink-0">/treks/</span>
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="everest-base-camp"
                className={`flex-1 bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                  errors.slug ? "border-error" : "border-secondary focus:border-primary"
                }`}
              />
            </div>
            {errors.slug && <p className="text-xs text-error mt-1 font-sans">{errors.slug}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
              Short Description *
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="A brief summary shown on the treks listing page…"
              className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors resize-none ${
                errors.description ? "border-error" : "border-secondary focus:border-primary"
              }`}
            />
            {errors.description && <p className="text-xs text-error mt-1 font-sans">{errors.description}</p>}
          </div>

          {/* Region + Difficulty */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                Region *
              </label>
              <div className="relative">
                <select
                  value={form.region}
                  onChange={(e) => set("region", e.target.value)}
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  {REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none text-sm">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                Difficulty *
              </label>
              <div className="relative">
                <select
                  value={form.difficulty}
                  onChange={(e) => set("difficulty", e.target.value as Difficulty)}
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none text-sm">expand_more</span>
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
                onChange={(e) => set("duration", Number(e.target.value))}
                className={`w-full bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                  errors.duration ? "border-error" : "border-secondary focus:border-primary"
                }`}
              />
              {errors.duration && <p className="text-xs text-error mt-1 font-sans">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                Price From (USD) *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-on-surface-variant font-sans">$</span>
                <input
                  type="number"
                  min={1}
                  value={form.priceFrom}
                  onChange={(e) => set("priceFrom", Number(e.target.value))}
                  className={`flex-1 bg-surface-container-lowest border-b px-0 py-3 text-sm font-sans focus:outline-none transition-colors ${
                    errors.priceFrom ? "border-error" : "border-secondary focus:border-primary"
                  }`}
                />
              </div>
              {errors.priceFrom && <p className="text-xs text-error mt-1 font-sans">{errors.priceFrom}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <ImageUploader
            value={form.image}
            onChange={(url) => set("image", url)}
          />

          {/* Live preview badge */}
          <div className="bg-surface-container-low rounded p-4 border border-outline-variant">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-3 font-sans">
              Card Preview
            </p>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {form.difficulty && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold font-sans ${diffBadge[form.difficulty]}`}>
                      {form.difficulty.toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="font-serif text-sm font-semibold text-primary leading-tight">
                  {form.title || "Package Title"}
                </p>
                <p className="text-xs text-on-surface-variant font-sans mt-1 line-clamp-2">
                  {form.description || "Short description will appear here…"}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-outline font-sans">{form.duration} days</p>
                <p className="text-sm font-semibold text-primary font-sans">
                  ${form.priceFrom.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
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
            className="flex-1 bg-primary text-on-primary rounded px-4 py-3 text-sm font-semibold font-sans hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">
              {isEdit ? "save" : "add_circle"}
            </span>
            {isEdit ? "Save Changes" : "Add Package"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminPackagesPage() {
  const [trips, setTrips] = useState<TrekListing[]>(
    allTreks.map((t, i) => ({ ...t, id: String(i + 1) }))
  );
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TrekListing | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TrekListing | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Filter
  const filtered = trips.filter((t) => {
    const q = search.toLowerCase();
    const matchQ =
      !q || t.title.toLowerCase().includes(q) || t.regionLabel.toLowerCase().includes(q);
    const matchR = regionFilter === "all" || t.region === regionFilter;
    const matchD = diffFilter === "all" || t.difficulty === diffFilter;
    return matchQ && matchR && matchD;
  });

  const handleSave = (data: Omit<TrekListing, "id">) => {
    if (editTarget) {
      setTrips((prev) =>
        prev.map((t) => (t.id === editTarget.id ? { ...data, id: editTarget.id } : t))
      );
      showToast(`"${data.title}" updated successfully`);
    } else {
      const newId = String(Date.now());
      setTrips((prev) => [{ ...data, id: newId }, ...prev]);
      showToast(`"${data.title}" added successfully`);
    }
    setDrawerOpen(false);
    setEditTarget(null);
  };

  const handleDelete = (trip: TrekListing) => {
    setTrips((prev) => prev.filter((t) => t.id !== trip.id));
    setDeleteTarget(null);
    showToast(`"${trip.title}" deleted`);
  };

  const openAdd = () => {
    setEditTarget(null);
    setDrawerOpen(true);
  };

  const openEdit = (trip: TrekListing) => {
    setEditTarget(trip);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6 pb-10">

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-wrap flex-1">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
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
            {REGIONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
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
              <option key={d} value={d}>{d}</option>
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
        Showing <span className="font-semibold text-on-surface">{filtered.length}</span> of{" "}
        {trips.length} packages
      </p>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
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

      {/* ── LIST VIEW ── */}
      {viewMode === "list" && filtered.length > 0 && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  {["Package", "Region", "Difficulty", "Duration", "Price From", ""].map((h) => (
                    <th key={h} className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-outline font-sans whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filtered.map((trip) => (
                  <tr key={trip.id} className="hover:bg-surface-container-lowest transition-colors group">
                    {/* Package */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 rounded overflow-hidden bg-surface-container shrink-0">
                          {trip.image ? (
                            <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-outline text-sm">image</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface font-sans">{trip.title}</p>
                          <p className="text-xs text-outline font-sans">/treks/{trip.slug}</p>
                        </div>
                      </div>
                    </td>
                    {/* Region */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface-variant font-sans">{trip.regionLabel}</span>
                    </td>
                    {/* Difficulty */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-semibold font-sans ${diffBadge[trip.difficulty]}`}>
                        {trip.difficulty}
                      </span>
                    </td>
                    {/* Duration */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface font-sans">{trip.duration} days</span>
                    </td>
                    {/* Price */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-on-surface font-sans">
                        ${trip.priceFrom.toLocaleString()}
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
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(trip)}
                          className="p-1.5 rounded border border-outline-variant text-on-surface-variant hover:border-error hover:text-error transition-colors"
                          title="Delete"
                        >
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

      {/* ── GRID VIEW ── */}
      {viewMode === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((trip) => (
            <div key={trip.id} className="bg-surface border border-outline-variant rounded overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
              {/* Image */}
              <div className="relative h-44 bg-surface-container overflow-hidden">
                {trip.image ? (
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold font-sans ${diffBadge[trip.difficulty]}`}>
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
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(trip)}
                    className="w-8 h-8 bg-surface rounded shadow flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="font-serif text-base font-semibold text-primary leading-tight">{trip.title}</h3>
                  <p className="text-xs text-secondary font-sans mt-0.5">{trip.regionLabel}</p>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed flex-1 line-clamp-2">
                  {trip.description}
                </p>
                <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-outline font-sans">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {trip.duration} days
                  </div>
                  <span className="text-sm font-semibold text-primary font-sans">
                    from ${trip.priceFrom.toLocaleString()}
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
                  <span className="material-symbols-outlined text-sm">delete</span>
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
          onClose={() => { setDrawerOpen(false); setEditTarget(null); }}
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
          <span className="material-symbols-outlined text-base">check_circle</span>
          {toast}
        </div>
      )}
    </div>
  );
}
