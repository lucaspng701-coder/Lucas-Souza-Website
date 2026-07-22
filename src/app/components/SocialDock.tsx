import { SocialIconLinks } from "./SocialIconLinks";

export function SocialDock() {
  return (
    <aside className="social-dock" aria-label="Social links">
      <span className="social-dock-label">Follow</span>
      <SocialIconLinks withDivider />
    </aside>
  );
}
