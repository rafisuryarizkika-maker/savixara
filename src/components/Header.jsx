import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';

const logoUrl = `${import.meta.env.BASE_URL}assets/logo/savixara-horizontal.svg`;

export default function Header() {
  const [drawer, setDrawer] = useState(false);

  const notify = (message) => {
    window.dispatchEvent(
      new CustomEvent('savixara-toast', {
        detail: message
      })
    );
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <>
      <header className="navbar">

        <a
          className="brand"
          href="#"
          aria-label="SAVIXARA"
        >
          <img
            src={logoUrl}
            alt="SAVIXARA"
          />
        </a>

        <nav className="desktop-nav">

          <a href="#games">
            Top Up Games
            <span>⌄</span>
          </a>

          <a href="#services">
            Layanan Gaming
          </a>

          <a href="#voucher">
            Voucher
          </a>

          <a href="#promo">
            Promo
          </a>

          <a href="#articles">
            Artikel
          </a>

        </nav>

        <div className="nav-actions">

          <button
            className="icon-btn"
            onClick={() =>
              document
                .getElementById('search')
                ?.focus()
            }
            aria-label="Cari"
          >
            <Search size={19} />
          </button>

          <button
            className="locale"
            onClick={() =>
              notify('Mata uang saat ini: IDR')
            }
            aria-label="Bahasa dan mata uang"
          >
            <span className="flag">🇮🇩</span>
            <span>ID / IDR</span>
            <span className="locale-arrow">⌄</span>
          </button>

          <button
            className="cart-btn"
            onClick={() =>
              notify('Keranjang masih kosong.')
            }
            aria-label="Keranjang"
          >
            <ShoppingCart size={19} />
          </button>

          <button
            className="login-btn"
            onClick={() =>
              notify(
                'Halaman login akan dihubungkan ke backend.'
              )
            }
          >
            Masuk
          </button>

          <button
            className="menu-btn"
            onClick={() => setDrawer(true)}
            aria-label="Buka menu"
          >
            <Menu size={22} />
          </button>

        </div>

      </header>

      {drawer && (
        <div
          className="drawer-overlay"
          onClick={closeDrawer}
        >

          <aside
            className="drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="drawer-head">

              <img
                src={logoUrl}
                alt="SAVIXARA"
              />

              <button
                className="icon-btn"
                onClick={closeDrawer}
                aria-label="Tutup menu"
              >
                <X size={21} />
              </button>

            </div>

            <a
              href="#"
              onClick={closeDrawer}
            >
              Beranda
              <ChevronRight size={17} />
            </a>

            <a
              href="#games"
              onClick={closeDrawer}
            >
              Top Up Games
              <ChevronRight size={17} />
            </a>

            <a
              href="#services"
              onClick={closeDrawer}
            >
              Layanan Gaming
              <ChevronRight size={17} />
            </a>

            <a
              href="#voucher"
              onClick={closeDrawer}
            >
              Voucher
              <ChevronRight size={17} />
            </a>

            <a
              href="#promo"
              onClick={closeDrawer}
            >
              Promo
              <ChevronRight size={17} />
            </a>

            <a
              href="#transaction"
              onClick={closeDrawer}
            >
              Cek Transaksi
              <ChevronRight size={17} />
            </a>

            <a
              href="#leaderboard"
              onClick={closeDrawer}
            >
              Leaderboard
              <ChevronRight size={17} />
            </a>

            <a
              href="#articles"
              onClick={closeDrawer}
            >
              Artikel
              <ChevronRight size={17} />
            </a>

            <a
              href="#calculator"
              onClick={closeDrawer}
            >
              Kalkulator
              <ChevronRight size={17} />
            </a>

            <a
              href="#help"
              onClick={closeDrawer}
            >
              Pusat Bantuan
              <ChevronRight size={17} />
            </a>

            <button
              className="drawer-login"
              onClick={() =>
                notify(
                  'Halaman login akan dihubungkan ke backend.'
                )
              }
            >
              Masuk / Daftar
            </button>

          </aside>

        </div>
      )}
    </>
  );
            }
