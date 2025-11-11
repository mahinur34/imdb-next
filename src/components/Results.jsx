import Image from "next/image";

export default function Results({ results = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {results.map((m) => {
        const src = m?.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "/placeholder.png";
        return (
          <article key={m.id}>
            <Image
              src={src}
              alt={m?.title || m?.name || "Poster"}
              width={500}
              height={300}
              loading="lazy"
            />
            <h3>{m?.title || m?.name}</h3>
          </article>
        );
      })}
    </div>
  );
}
