"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  adminGetProfile,
  adminUpdateProfile,
  adminUpdatePassword,
} from "@/lib/supabase/queries/admin";
import {
  getSettings,
  updateSettings,
  type Settings,
} from "@/lib/supabase/queries/settings";
import { uploadImage } from "@/lib/supabase/storage";

type Tab = "profile" | "website" | "heroes" | "security";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Profile state
  const [profile, setProfile] = useState<{
    full_name: string;
    role_label: string;
    avatar_url: string;
  }>({
    full_name: "",
    role_label: "",
    avatar_url: "",
  });

  // Website Settings state
  const [settings, setSettings] = useState<Settings>({
    id: 1,
    company_name: "",
    email: "",
    phone: "",
    facebook_url: "",
    instagram_url: "",
    youtube_url: "",
    tiktok_url: "",
    default_currency: "USD",
    home_hero_image: "",
    contact_hero_image: "",
    destinations_hero_image: "",
    why_trek_image: "",
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, settingsData] = await Promise.all([
          adminGetProfile(),
          getSettings(),
        ]);

        setProfile({
          full_name: profileData.full_name || "",
          role_label: profileData.role_label || "",
          avatar_url: profileData.avatar_url || "",
        });

        setSettings(settingsData);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await adminUpdateProfile(profile);
      setMessage({ type: "success", text: "Profile updated successfully." });
      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSettingsUpdate = async (
    e?: React.FormEvent,
    newSettings?: Partial<Settings>,
  ) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload = newSettings ? { ...settings, ...newSettings } : settings;
      await updateSettings(payload);
      if (newSettings) setSettings((prev) => ({ ...prev, ...newSettings }));
      setMessage({
        type: "success",
        text: "Settings updated successfully.",
      });
      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update settings",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      await adminUpdatePassword(passwords.current, passwords.new);
      setPasswords({ current: "", new: "", confirm: "" });
      setMessage({ type: "success", text: "Password updated successfully." });
      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update password",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    setMessage(null);
    try {
      const url = await uploadImage(
        file,
        "trek-images",
        `profiles/${Date.now()}-${file.name}`,
      );
      setProfile((prev) => ({ ...prev, avatar_url: url }));
      await adminUpdateProfile({ ...profile, avatar_url: url });
      setMessage({ type: "success", text: "Avatar updated successfully." });
      router.refresh();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to upload avatar." });
    } finally {
      setSaving(false);
    }
  };

  const handleHeroImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Settings,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    setMessage(null);
    try {
      // eslint-disable-next-line react-hooks/purity
      const timestamp = Date.now();
      const url = await uploadImage(
        file,
        "trek-images",
        `site/${field}-${timestamp}-${file.name}`,
      );
      await handleSettingsUpdate(undefined, { [field]: url });
    } catch (err) {
      setMessage({
        type: "error",
        text: `Failed to upload ${field.replace(/_/g, " ")}.`,
      });
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "profile", label: "Profile", icon: "person" },
    { key: "website", label: "Website", icon: "language" },
    { key: "heroes", label: "Hero Images", icon: "image" },
    { key: "security", label: "Security", icon: "lock" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="material-symbols-outlined animate-spin text-primary text-3xl">
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 pb-10">
      {/* Tab nav */}
      <div className="flex gap-1 bg-surface-container-low p-1 rounded-lg w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTab(t.key);
              setMessage(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold font-sans transition-colors ${
              tab === t.key
                ? "bg-surface text-primary shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded text-sm font-sans flex items-center gap-3 ${
            message.type === "success"
              ? "bg-primary-container text-on-primary-container"
              : "bg-error-container text-on-error-container"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {message.type === "success" ? "check_circle" : "error"}
          </span>
          {message.text}
        </div>
      )}

      {tab === "profile" && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="px-8 py-5 border-b border-outline-variant">
            <h3 className="font-serif text-lg font-semibold text-primary">
              Profile Settings
            </h3>
            <p className="text-xs text-on-surface-variant font-sans mt-1">
              Update your personal information and contact details.
            </p>
          </div>
          <form onSubmit={handleProfileUpdate} className="p-8 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-surface-container-highest overflow-hidden">
                <img
                  alt="Admin"
                  className="w-full h-full object-cover"
                  src={profile.avatar_url || "/default.png"}
                />
              </div>
              <div>
                <label className="cursor-pointer text-xs font-semibold text-primary border border-primary rounded px-4 py-2 font-sans hover:bg-primary hover:text-on-primary transition-colors inline-block">
                  Change Photo
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={saving}
                  />
                </label>
                <p className="text-[11px] text-outline font-sans mt-2">
                  JPG, PNG up to 2MB
                </p>
              </div>
            </div>
            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Full Name
                </label>
                <input
                  value={profile.full_name}
                  onChange={(e) =>
                    setProfile({ ...profile, full_name: e.target.value })
                  }
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Role Label
                </label>
                <input
                  value={profile.role_label}
                  onChange={(e) =>
                    setProfile({ ...profile, role_label: e.target.value })
                  }
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary px-6 py-2.5 rounded text-xs font-semibold font-sans hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {tab === "website" && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="px-8 py-5 border-b border-outline-variant">
            <h3 className="font-serif text-lg font-semibold text-primary">
              Website Settings
            </h3>
            <p className="text-xs text-on-surface-variant font-sans mt-1">
              Global information used across the website.
            </p>
          </div>
          <form onSubmit={handleSettingsUpdate} className="p-8 space-y-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-primary border-b border-outline-variant pb-2">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Company Name
                  </label>
                  <input
                    value={settings.company_name}
                    onChange={(e) =>
                      setSettings({ ...settings, company_name: e.target.value })
                    }
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Default Currency
                  </label>
                  <input
                    value={settings.default_currency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        default_currency: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Public Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Public Phone
                  </label>
                  <input
                    value={settings.phone}
                    onChange={(e) =>
                      setSettings({ ...settings, phone: e.target.value })
                    }
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-primary border-b border-outline-variant pb-2">
                Social Media Links
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Facebook URL
                  </label>
                  <input
                    value={settings.facebook_url ?? ""}
                    onChange={(e) =>
                      setSettings({ ...settings, facebook_url: e.target.value })
                    }
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    Instagram URL
                  </label>
                  <input
                    value={settings.instagram_url ?? ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        instagram_url: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    YouTube URL
                  </label>
                  <input
                    value={settings.youtube_url ?? ""}
                    onChange={(e) =>
                      setSettings({ ...settings, youtube_url: e.target.value })
                    }
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                    TikTok URL
                  </label>
                  <input
                    value={settings.tiktok_url ?? ""}
                    onChange={(e) =>
                      setSettings({ ...settings, tiktok_url: e.target.value })
                    }
                    className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary px-6 py-2.5 rounded text-xs font-semibold font-sans hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Website Settings"}
            </button>
          </form>
        </div>
      )}

      {tab === "heroes" && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="px-8 py-5 border-b border-outline-variant">
            <h3 className="font-serif text-lg font-semibold text-primary">
              Hero Images
            </h3>
            <p className="text-xs text-on-surface-variant font-sans mt-1">
              Manage the large hero images used on the main pages of your
              website.
            </p>
          </div>
          <div className="p-8 space-y-8">
            {[
              {
                label: "Home Page Hero",
                field: "home_hero_image" as keyof Settings,
              },
              {
                label: "Why Trek With Us Image",
                field: "why_trek_image" as keyof Settings,
              },
              {
                label: "Destinations Page Hero",
                field: "destinations_hero_image" as keyof Settings,
              },
              {
                label: "Contact Page Hero",
                field: "contact_hero_image" as keyof Settings,
              },
            ].map((item) => (
              <div key={item.field} className="space-y-4">
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">
                  {item.label}
                </label>
                <div className="relative group rounded-lg overflow-hidden border border-outline-variant bg-surface-container-lowest aspect-video max-w-2xl">
                  {settings[item.field] ? (
                    <img
                      src={settings[item.field] as string}
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline-variant">
                      <span className="material-symbols-outlined text-4xl">
                        image
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-surface text-primary px-4 py-2 rounded text-xs font-semibold font-sans hover:bg-primary-container transition-colors">
                      {saving ? "Uploading..." : "Change Image"}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleHeroImageChange(e, item.field)}
                        disabled={saving}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-[10px] text-outline font-sans">
                  Recommended: 1920x1080px (16:9 ratio).
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="space-y-6">
          <div className="bg-surface border border-outline-variant rounded overflow-hidden">
            <div className="px-8 py-5 border-b border-outline-variant">
              <h3 className="font-serif text-lg font-semibold text-primary">
                Change Password
              </h3>
            </div>
            <form onSubmit={handlePasswordUpdate} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-on-primary px-6 py-2.5 rounded text-xs font-semibold font-sans hover:bg-primary-container transition-colors disabled:opacity-50"
              >
                {saving ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
