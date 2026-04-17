import Link from "next/link";

type BottomActionBarProps = {
  activeRoute: "home" | "session" | "result" | "notes";
};

const navItems = [
  { href: "/", label: "Home", route: "home" },
  { href: "/session", label: "Session", route: "session" },
  { href: "/result", label: "Result", route: "result" },
  { href: "/notes", label: "Notes", route: "notes" },
] as const;

export function BottomActionBar({ activeRoute }: BottomActionBarProps) {
  return (
    <nav className="sticky bottom-0 border-t border-border/80 bg-panel-strong/95 px-3 py-3 backdrop-blur">
      <ul className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const isActive = item.route === activeRoute;

          return (
            <li key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex min-h-12 items-center justify-center rounded-xl border px-2 text-sm font-semibold tracking-[0.14em] uppercase transition",
                  isActive
                    ? "border-accent bg-accent/15 text-accent-strong"
                    : "border-border bg-panel text-foreground/80 hover:border-foreground/30 hover:text-foreground",
                ].join(" ")}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
