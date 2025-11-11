// src/app/page.js (veya page.tsx)
import Results from "@/components/Results";

const API_KEY = process.env.API_KEY;

export const revalidate = 0; // anlık sonuç istiyorsan; yoksa kaldır

export default async function Home({ searchParams }) {
  // searchParams'ı await et
  const params = (await searchParams) ?? {};
  const genre = params.genre ?? "fetchTrending";

  const endpoint =
    genre === "fetchTopRated" ? "/movie/top_rated" : "/trending/all/week";

  const res = await fetch(
    `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=en-US&page=1`,
    {
      // Not: next.revalidate saniye cinsinden çalışır (ms değil!)
      // Dinamik istersen "cache: 'no-store'" kullan veya üstte revalidate=0 bırak
      next: { revalidate: 600 }, // 10 dakika, istersen ayarla
    }
  );

  if (!res.ok) {
    // hata handling'i önce yap
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const results = data?.results ?? [];

  return (
    <div>
      <Results results={results} />
    </div>
  );
}
