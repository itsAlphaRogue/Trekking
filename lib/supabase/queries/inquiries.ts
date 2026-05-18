"use server";

import { createClient } from "@/lib/supabase/server";

export type InquiryStatus = "New" | "Contacted" | "Converted" | "Closed";

export interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  trek: string | null;
  message: string;
  status: InquiryStatus;
  internal_notes: string | null;
}

export async function submitInquiry(data: {
  name: string;
  email: string;
  phone: string;
  trek: string;
  message: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("inquiries").insert([
    {
      name: data.name,
      email: data.email,
      phone: data.phone,
      trek: data.trek,
      message: data.message,
    },
  ]);

  if (error) {
    console.error("submitInquiry error:", error.message);
    throw new Error(error.message);
  }
}

/**
 * Fetch all inquiries for the admin dashboard.
 */
export async function adminGetInquiries(): Promise<Inquiry[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("adminGetInquiries error:", error.message);
    return [];
  }

  return (data as Inquiry[]) ?? [];
}

/**
 * Update an inquiry (status or internal notes).
 */
export async function adminUpdateInquiry(
  id: string,
  updates: Partial<Pick<Inquiry, "status" | "internal_notes">>
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("inquiries")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("adminUpdateInquiry error:", error.message);
    throw new Error(error.message);
  }
}

/**
 * Delete an inquiry.
 */
export async function adminDeleteInquiry(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("inquiries").delete().eq("id", id);

  if (error) {
    console.error("adminDeleteInquiry error:", error.message);
    throw new Error(error.message);
  }
}
