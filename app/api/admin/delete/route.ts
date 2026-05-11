import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin_client";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Verify Authentication \u0026 Role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Parse Body
    const { publicUrl, bucket } = await request.json();

    if (!publicUrl || !bucket) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 3. Extract path from URL
    const marker = `/object/public/${bucket}/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) {
       return NextResponse.json({ error: "Invalid public URL" }, { status: 400 });
    }
    const path = publicUrl.slice(idx + marker.length);

    // 4. Delete using Service Role Client
    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase.storage.from(bucket).remove([path]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
