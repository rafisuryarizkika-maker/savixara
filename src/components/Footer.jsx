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

const WHATSAPP_NUMBER = "6285795191215";
function Footer({ onNotify }) {
  const handleClick = (item) => {
    if (item === 'Top Up Games') {
  window.location.href = `${window.location.pathname}#games`;
  return;
    }
    
if (item === 'Beranda') {
  window.location.href = window.location.pathname;
  return;
}
    
if (item === 'Voucher') {
  if (onNotify) {
    onNotify('Katalog voucher sedang disiapkan.');
  }
  return;
}

if (item === 'Layanan Gaming') {
  document.getElementById('services')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  return;
}
    
  const faqIndex = {
    'Cara Top Up': 0,
    'Cara Pembayaran': 2,
    'Refund': 4,
  };

  const isFaqLink =
    item === 'FAQ' ||
    item === 'Pusat Bantuan' ||
    Object.prototype.hasOwnProperty.call(faqIndex, item);
    
if (item === 'Hubungi Kami') {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}`,
    '_blank',
    'noopener,noreferrer'
  );
  return;
}

  if (isFaqLink) {
    const section = document.getElementById('help');

    if (!section) {
      window.location.href =
        `${window.location.pathname}#help`;
      return;
    }

    const index = faqIndex[item];

    if (index === undefined) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    const buttons =
      section.querySelectorAll('.faq-question');

    const details =
      section.querySelectorAll('details.faq-item');

    if (buttons[index]) {
      if (
        buttons[index].getAttribute('aria-expanded') !== 'true'
      ) {
        buttons[index].click();
      }

      buttons[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (details[index]) {
      details[index].open = true;

      details[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
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

            
<a
  href="https://instagram.com/savixara"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram SAVIXARA"
>
  <Instagram size={18} />
</a>
            

            
<a
  href="https://tiktok.com/@savixara"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="TikTok SAVIXARA"
>
  <Music2 size={18} />
</a>
            

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
