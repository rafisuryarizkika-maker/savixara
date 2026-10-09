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
/* SAVIXARA - Footer premium dan responsif */
.footer {
  background: #080A12;
  color: #F8FAFC;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  padding: 42px 24px 20px;
}

.footer-top {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) repeat(4, minmax(0, 1fr));
  gap: 30px 24px;
  align-items: start;
}

.footer-brand,
.footer-col,
.footer-social {
  min-width: 0;
}

.footer-brand img {
  display: block;
  width: 150px;
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
}

.footer-brand p,
.footer-social p {
  color: #94A3B8;
  font-size: 13px;
  line-height: 1.8;
}

.footer-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin-top: 20px;
}

.footer-trust > div {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #CBD5E1;
  font-size: 12px;
}

.footer-trust svg {
  color: #00D9FF;
  flex-shrink: 0;
}

.footer-col h4,
.footer-social h4 {
  margin: 0 0 15px;
  color: #F8FAFC;
  font-size: 14px;
  font-weight: 700;
}

.footer-col button {
  display: block;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 11px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #94A3B8;
  font: inherit;
  font-size: 12px;
  line-height: 1.7;
  text-align: left;
  overflow-wrap: anywhere;
  cursor: pointer;
}

.footer-col button:hover {
  color: #00D9FF;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 16px 0;
}

.social-links button {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  background: #111522;
  color: #00D9FF;
}

.social-links button:hover {
  border-color: #00D9FF;
  background: rgba(0, 217, 255, 0.08);
}

.footer-help {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 13px;
  border: 1px solid rgba(0, 217, 255, 0.25);
  border-radius: 10px;
  background: rgba(0, 217, 255, 0.06);
  color: #00D9FF;
  font-size: 12px;
  font-weight: 600;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 20px;
  margin-top: 32px;
  padding-top: 18px;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  color: #64748B;
  font-size: 11px;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px 20px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .footer {
    padding: 32px 20px 18px;
  }

  .footer-top {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 18px;
  }

  .footer-brand,
  .footer-social {
    grid-column: 1 / -1;
  }

  .footer-brand img {
    width: 140px;
  }

  .footer-trust {
    gap: 10px 14px;
  }

  .footer-col h4,
  .footer-social h4 {
    font-size: 13px;
  }

  .footer-col button {
    font-size: 12px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 26px;
  }
}
