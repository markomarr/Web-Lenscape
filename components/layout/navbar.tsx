"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/service", label: "Service" },
  { href: "/work", label: "Work" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="font-display text-2xl font-medium tracking-tight text-foreground"
        >
          Lenscape
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-9 md:flex"
        >
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative pb-1 text-sm tracking-wide transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
        >
          <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
          <svg
            aria-hidden="true"
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
          >
            {open ? (
              <path
                d="M1 1l16 12M17 1L1 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M0 1h18M0 7h18M0 13h18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigasi utama (mobile)"
          className="border-t border-border/70 bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2 sm:px-8">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block py-3 text-base ${
                      active ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
