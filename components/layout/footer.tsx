import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/service", label: "Service" },
  { href: "/work", label: "Work" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-medium tracking-tight">
            Lenscape
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Dokumentasi wedding, prewedding, dan product yang fokus pada
            momen, bukan sekadar pose. Berbasis di Indonesia, terbuka untuk
            kerja sama lintas kota.
          </p>
        </div>

        <nav aria-label="Tautan footer" className="flex flex-col gap-2 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-muted">
          <p className="text-foreground">Kontak</p>
          <a
            href="mailto:halo@lenscape.id"
            className="transition-colors hover:text-foreground"
          >
            halo@lenscape.id
          </a>
          <a
            href="https://instagram.com"
            className="transition-colors hover:text-foreground"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-border/70 px-6 py-6 text-center text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} Lenscape. Konten & data pada situs ini
        adalah dummy untuk keperluan pengembangan.
      </div>
    </footer>
  );
}
