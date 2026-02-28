import { supabase } from "../lib/supabaseClient";

export async function GET() {
    const { data: settingsRow } = await supabase
        .from("settings")
        .select("config")
        .single();

    const config = settingsRow?.config;
    const adSenseRaw = config?.googleAdSenseId || "";

    // Se o usuário já tiver o formato completo `google.com, pub-1234, DIRECT, f0...`
    // Vamos usar direto. Se não existir, retornamos vazio para não quebrar.

    return new Response(adSenseRaw, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, s-maxage=31536000",
        },
    });
}
