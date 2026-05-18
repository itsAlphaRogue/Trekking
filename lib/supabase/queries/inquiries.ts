import { createClient } from "@/lib/supabase/client";

export async function submitInquiry(data: {
  name: string;
  email: string;
  phone: string;
  trek: string;
  message: string;
}) {
  const supabase = createClient();

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
