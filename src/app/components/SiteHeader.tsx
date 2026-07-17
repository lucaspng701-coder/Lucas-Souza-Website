import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Lucas Souza, home">
        LUCAS<span>®</span>SOUZA
      </Link>
      <nav className="top-nav" aria-label="Primary navigation">
        <Link href="/work">Works</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
