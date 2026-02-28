import { supabase } from "../lib/supabaseClient";

export async function GET() {
    const { data: posts } = await supabase
        .from("posts")
        .select("slug, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://eband.com.br/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://eband.com.br/categorias</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    ${posts
            ?.map(
                (post: any) => `
    <url>
        <loc>https://eband.com.br/artigo/${post.slug}</loc>
        <lastmod>${new Date(post.published_at).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    `,
            )
            .join("") || ""
        }
</urlset>`;

    return new Response(sitemap, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
        },
    });
}
