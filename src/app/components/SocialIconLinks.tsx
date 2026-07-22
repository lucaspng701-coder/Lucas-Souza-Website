import { Fragment } from "react";
import {
  FaBehance,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { href: "https://www.linkedin.com/in/lucas-souza-82a595137/", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://www.instagram.com/_lucas.png/", label: "Instagram", Icon: FaInstagram },
  { href: "https://x.com/insomni4_jpg", label: "X", Icon: FaXTwitter },
  { href: "https://www.behance.net/lucas_png", label: "Behance", Icon: FaBehance },
  { href: "https://wa.me/5548999009117", label: "WhatsApp", Icon: FaWhatsapp },
] as const;

export function SocialIconLinks({ withDivider = false }: { withDivider?: boolean }) {
  return socialLinks.map(({ href, label, Icon }, index) => (
    <Fragment key={label}>
      {withDivider && index === socialLinks.length - 1 ? (
        <span className="social-dock-rule" aria-hidden="true" />
      ) : null}
      <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
        <Icon />
      </a>
    </Fragment>
  ));
}
