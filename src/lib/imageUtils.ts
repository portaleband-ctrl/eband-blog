/**
 * Extensão manual para otimizar URLs de serviços de imagem conhecidos
 * quando o motor nativo do Astro/Sharp não consegue processar (ex: Cloudflare s/ Sharp)
 */
export function optimizeRemoteImage(url: string, width: number = 800, quality: number = 80): string {
    if (!url) return url;

    try {
        const urlObj = new URL(url);

        // Otimização Unsplash
        if (urlObj.hostname.includes('unsplash.com')) {
            // Remover parâmetros de largura/qualidade existentes e adicionar os nossos
            urlObj.searchParams.set('w', width.toString());
            urlObj.searchParams.set('q', quality.toString());
            urlObj.searchParams.set('fm', 'webp');
            urlObj.searchParams.set('fit', 'crop');
            return urlObj.toString();
        }

        // Otimização Amazon (m.media-amazon.com)
        // Exemplo: https://m.media-amazon.com/images/I/71..._AC_SL1500_.jpg
        if (urlObj.hostname.includes('media-amazon.com')) {
            // A Amazon usa padrões na URL para redimensionar, mas é complexo manipular via regex de forma genérica.
            // Por enquanto, apenas retornamos. Mas se o usuário usar o componente Image, o Astro deveria lidar.
        }

        return url;
    } catch (e) {
        return url;
    }
}
