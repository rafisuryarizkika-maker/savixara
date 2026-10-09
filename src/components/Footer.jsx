import React from 'react';
import {
  ArrowRight,
  Instagram,
  MessageCircle,
  Youtube,
  Music2,
  Gamepad2,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

const logoUrl = `${import.meta.env.BASE_URL}assets/logo/savixara-horizontal.svg`;

const footerColumns = [
  {
    title: 'Tentang SAVIXARA',
    items: [
      'Tentang Kami',
      'Kenapa SAVIXARA',
      'Keamanan Transaksi',
      'Layanan Game'
    ]
  },
  {
    title: 'Peta Situs',
    items: [
      'Beranda',
      'Top Up Games',
      'Layanan Gaming',
      'Voucher',
      'Promo',
      'Cek Transaksi',
      'Artikel'
    ]
  },
  {
    title: 'Dukungan',
    items: [
      'Pusat Bantuan',
      'FAQ',
      'Cara Top Up',
      'Cara Pembayaran',
      'Refund',
      'Hubungi Kami'
    ]
  },
  {
    title: 'Legalitas',
    items: [
      'Syarat & Ketentuan',
      'Kebijakan Privasi',
      'Kebijakan Refund',
      'Kebijakan Cookie'
    ]
  }
];

function Footer({ onNotify }) {
  const handleClick = (item) => {
  if (item === 'FAQ' || item === 'Pusat Bantuan') {
    const target = document.getElementById('help');

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      window.location.hash = 'help';
    }

    return;
  }

  if (onNotify) {
    onNotify(`${item} akan segera tersedia.`);
  }
};

  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">

          <a href="#" aria-label="SAVIXARA">
            <img
              src={logoUrl}
              alt="SAVIXARA"
            />
          </a>

          <p>
            SAVIXARA adalah platform gaming untuk kebutuhan
            top up, voucher, dan layanan gaming pilihan
            dengan pengalaman yang praktis, cepat, dan aman.
          </p>

          <div className="footer-trust">

            <div>
              <ShieldCheck size={17} />
              <span>
                Transaksi Aman
              </span>
            </div>

            <div>
              <Gamepad2 size={17} />
              <span>
                Banyak Game
              </span>
            </div>

            <div>
              <HelpCircle size={17} />
              <span>
                Bantuan CS
              </span>
            </div>

          </div>

        </div>

        {footerColumns.map((column) => (
          <div
            className="footer-col"
            key={column.title}
          >

            <h4>{column.title}</h4>

            {column.items.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => handleClick(item)}
              >
                {item}
              </button>
            ))}

          </div>
        ))}

        <div className="footer-col footer-social">

          <h4>Ikuti SAVIXARA</h4>

          <p>
            Dapatkan informasi promo, update game,
            dan berita terbaru dari SAVIXARA.
          </p>

          <div className="social-links">

            <button
              type="button"
              aria-label="Instagram"
              onClick={() => handleClick('Instagram')}
            >
              <Instagram size={18} />
            </button>

            <button
              type="button"
              aria-label="TikTok"
              onClick={() => handleClick('TikTok')}
            >
              <Music2 size={18} />
            </button>

            <button
              type="button"
              aria-label="YouTube"
              onClick={() => handleClick('YouTube')}
            >
              <Youtube size={18} />
            </button>

            <button
              type="button"
              aria-label="WhatsApp"
              onClick={() => handleClick('WhatsApp')}
            >
              <MessageCircle size={18} />
            </button>

          </div>

          <button
            type="button"
            className="footer-help"
            onClick={() => handleClick('Pusat Bantuan')}
          >
            Pusat Bantuan
            <ArrowRight size={15} />
          </button>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © 2026 SAVIXARA. All rights reserved.
        </span>

        <span>
          Top Up Game Jadi Lebih Mudah.
        </span>

      </div>

    </footer>
  );
}

export default Footer;
