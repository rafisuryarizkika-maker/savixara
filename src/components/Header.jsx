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
      {/* ================= HEADER ================= */}

      <header className="navbar">

        {/* LOGO */}
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

        {/* DESKTOP NAVIGATION */}
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

        {/* NAVIGATION ACTIONS */}
        <div className="nav-actions">

          {/* SEARCH */}
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

          {/* LANGUAGE / CURRENCY */}
          <button
            className="locale"
            onClick={() =>
              notify('Mata uang saat ini: IDR')
            }
            aria-label="Bahasa dan mata uang"
          >
            <span className="flag">
              🇮🇩
            </span>

            <span>
              ID / IDR
            </span>

            <span className="locale-arrow">
              ⌄
            </span>
          </button>

          {/* CART */}
          <button
            className="cart-btn"
            onClick={() =>
              notify('Keranjang masih kosong.')
            }
            aria-label="Keranjang"
          >
            <ShoppingCart size={19} />
          </button>

          {/* LOGIN */}
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

          {/* MOBILE MENU */}
          <button
            className="menu-btn"
            onClick={() => setDrawer(true)}
            aria-label="Buka menu"
          >
            <Menu size={22} />
          </button>

        </div>

      </header>

      {/* ================= MOBILE DRAWER ================= */}

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

            {/* DRAWER HEADER */}
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

            {/* BERANDA */}
            <a
              href="#"
              onClick={closeDrawer}
            >
              <span>
                Beranda
              </span>

              <ChevronRight size={17} />
            </a>

            {/* TOP UP GAMES */}
            <a
              href="#games"
              onClick={closeDrawer}
            >
              <span>
                Top Up Games
              </span>

              <ChevronRight size={17} />
            </a>

            {/* LAYANAN GAMING */}
            <a
              href="#services"
              onClick={closeDrawer}
            >
              <span>
                Layanan Gaming
              </span>

              <ChevronRight size={17} />
            </a>

            {/* VOUCHER */}
            <a
              href="#voucher"
              onClick={closeDrawer}
            >
              <span>
                Voucher
              </span>

              <ChevronRight size={17} />
            </a>

            {/* PROMO */}
            <a
              href="#promo"
              onClick={closeDrawer}
            >
              <span>
                Promo
              </span>

              <ChevronRight size={17} />
            </a>

            {/* CEK TRANSAKSI */}
            <a
              href="#transaction"
              onClick={closeDrawer}
            >
              <span>
                Cek Transaksi
              </span>

              <ChevronRight size={17} />
            </a>

            {/* LEADERBOARD */}
            <a
              href="#leaderboard"
              onClick={closeDrawer}
            >
              <span>
                Leaderboard
              </span>

              <ChevronRight size={17} />
            </a>

            {/* ARTIKEL */}
            <a
              href="#articles"
              onClick={closeDrawer}
            >
              <span>
                Artikel
              </span>

              <ChevronRight size={17} />
            </a>

            {/* KALKULATOR */}
            <a
              href="#calculator"
              onClick={closeDrawer}
            >
              <span>
                Kalkulator
              </span>

              <ChevronRight size={17} />
            </a>

            {/* PUSAT BANTUAN */}
            <a
              href="#help"
              onClick={closeDrawer}
            >
              <span>
                Pusat Bantuan
              </span>

              <ChevronRight size={17} />
            </a>

            {/* LOGIN / REGISTER */}
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
  )
