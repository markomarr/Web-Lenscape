import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-6 py-24 sm:px-8">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Data tidak ditemukan
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        Halaman atau proyek yang kamu cari mungkin sudah dipindahkan atau
        tidak tersedia.
      </p>
      <LinkButton href="/" variant="primary" className="mt-8">
        Kembali ke Home
      </LinkButton>
    </div>
  );
}
