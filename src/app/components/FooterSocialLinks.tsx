import { SocialIconLinks } from "./SocialIconLinks";

export function FooterSocialLinks({ dark = false }: { dark?: boolean }) {
  return (
    <nav
      className={dark ? "footer-social-links footer-social-links--dark" : "footer-social-links"}
      aria-label="Social links in footer"
    >
      <span className="footer-social-label">Follow me</span>
      <div className="footer-social-icons">
        <SocialIconLinks />
      </div>
    </nav>
  );
}
