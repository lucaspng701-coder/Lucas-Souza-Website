import {
  FaBehance,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function SocialDock() {
  return (
    <aside className="social-dock" aria-label="Social links">
      <span className="social-dock-label">Follow</span>
      <a href="https://www.linkedin.com/in/lucas-souza-82a595137/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
      <a href="https://www.instagram.com/_lucas.png/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
      <a href="https://x.com/insomni4_jpg" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
      <a href="https://www.behance.net/lucas_png" target="_blank" rel="noreferrer" aria-label="Behance"><FaBehance /></a>
      <span className="social-dock-rule" aria-hidden="true" />
      <a href="https://wa.me/5548999009117" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
    </aside>
  );
}
