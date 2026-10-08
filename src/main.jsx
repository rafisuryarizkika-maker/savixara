import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search, Menu, X, ChevronRight, Gamepad2, ShieldCheck, Zap, Headphones,
  ShoppingCart, ReceiptText, Trophy, BookOpen, HelpCircle, MessageCircle,
  Sparkles, ArrowRight, WalletCards
} from 'lucide-react';
import './styles.css';

const logoUrl = `${import.meta.env.BASE_URL}assets/logo/savixara-horizontal.svg`;

const games = [
  { name: 'Mobile Legends', publisher: 'Moonton', tag: 'MLBB', tone: 'mlbb' },
  { name: 'Free Fire', publisher: 'Garena', tag: 'FF', tone: 'ff' },
  { name: 'PUBG Mobile', publisher: 'Tencent Games', tag: 'PUBG', tone: 'pubg' },
  { name: 'Roblox', publisher: 'Roblox Corporation', tag: 'RBLX', tone: 'roblox' },
  { name: 'Honor of Kings', publisher: 'Tencent Games', tag: 'HOK', tone: 'hok' },
  { name: 'Genshin Impact', publisher: 'HoYoverse', tag: 'GEN', tone: 'genshin' },
];

const services = [
  { name: 'WDP Mobile Legends', sub: 'Weekly Diamond Pass', tone: 'wdp' },
  { name: 'Joki Rank Mobile Legends', sub: 'Layanan push rank', tone: 'joki' },
  { name: 'Mabar Push Mobile Legends', sub: 'Main bareng pro player', tone: 'mabar' },
];

const promos = [
  { title: 'Promo MLBB', text: 'Diskon khusus produk pilihan', tone: 'promo1' },
  { title: 'Weekly Diamond Pass', text: 'Harga spesial minggu ini', tone: 'promo2' },
  { title: 'Roblox', text: 'Penawaran cashback pilihan', tone: 'promo3' },
  { title: 'Free Fire', text: 'Bonus untuk produk tertentu', tone: 'promo4' },
];

function App() {
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return games;

    return games.filter(g =>
      `${g.name} ${g.publisher}`.toLowerCase().includes(q)
    );
  }, [query]);

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2600);
  };

  return (
    <div className="app">

      <header className="navbar">
        <a className="brand" href="#" aria-label="SAVIXARA">
          <img src={logoUrl} alt="SAVIXARA" />
        </a>

        <nav className="desktop-nav">
          <a href="#games">Top Up Games <span>⌄</span></a>
          <a href="#services">Layanan Gaming</a>
          <a href="#voucher">Voucher</a>
          <a href="#promo">Promo</a>
          <a href="#articles">Artikel</a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => document.getElementById('search')?.focus()}
            aria-label="Cari"
          >
            <Search size={19} />
          </button>

          <button className="locale">
            🇮🇩 <span>ID / IDR</span>⌄
          </button>

          <button
            className="cart-btn"
            onClick={() => notify('Keranjang masih kosong.')}
            aria-label="Keranjang"
          >
            <ShoppingCart size={19} />
          </button>

          <button
            className="login-btn"
            onClick={() => notify('Halaman login akan dihubungkan ke backend.')}
          >
            Masuk
          </button>

          <button
            className="menu-btn"
            onClick={() => setDrawer(true)}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {drawer && (
        <div
          className="drawer-overlay"
          onClick={() => setDrawer(false)}
        >
          <aside
            className="drawer"
            onClick={e => e.stopPropagation()}
          >
            <div className="drawer-head">
              <img src={logoUrl} alt="SAVIXARA" />

              <button
                className="icon-btn"
                onClick={() => setDrawer(false)}
              >
                <X size={21} />
              </button>
            </div>

            {[
              'Beranda',
              'Top Up Games',
              'Layanan Gaming',
              'Voucher',
              'Promo',
              'Cek Transaksi',
              'Leaderboard',
              'Artikel',
              'Kalkulator',
              'Pusat Bantuan'
            ].map((x, i) => (
              <a
                key={x}
                href={
                  i === 0
                    ? '#'
                    : `#${x.toLowerCase().replaceAll(' ', '-')}`
                }
                onClick={() => setDrawer(false)}
              >
                {x}
                <ChevronRight size={17} />
              </a>
            ))}

            <button
              className="drawer-login"
              onClick={() => notify('Login akan dihubungkan ke backend.')}
            >
              Masuk / Daftar
            </button>
          </aside>
        </div>
      )}

      <main>

        <section className="hero">
          <div className="hero-glow glow-a"></div>
          <div className="hero-glow glow-b"></div>

          <div className="hero-copy">

            <div className="eyebrow">
              <Sparkles size={14} />
              PLATFORM GAMING
            </div>

            <h1>
              Top Up Game
              <br />
              Jadi Lebih <span>Mudah</span>
            </h1>

            <p>
              Top up game, voucher, dan layanan gaming dalam satu tempat.
              Proses cepat, aman, dan terpercaya.
            </p>

            <div className="search-box">
              <Search size={20} />

              <input
                id="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari game, layanan, atau voucher..."
              />

              <button
                onClick={() =>
                  document
                    .getElementById('games')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Search size={18} />
              </button>
            </div>

            <div className="trust-row">

              <div>
                <Zap size={18} />
                <span>
                  <b>Proses Cepat</b>
                  <small>Hitungan detik</small>
                </span>
              </div>

              <div>
                <WalletCards size={18} />
                <span>
                  <b>Harga Kompetitif</b>
                  <small>Selalu diperbarui</small>
                </span>
              </div>

              <div>
                <ShieldCheck size={18} />
                <span>
                  <b>Transaksi Aman</b>
                  <small>Data terlindungi</small>
                </span>
              </div>

              <div>
                <Headphones size={18} />
                <span>
                  <b>Customer Support</b>
                  <small>Siap membantu</small>
                </span>
              </div>

            </div>
          </div>

          <div className="hero-art">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>

            <div className="character-placeholder">
              <div className="character-ring"></div>
              <div className="character-core">S</div>
            </div>

            <div className="hero-chip chip-1">
              TOP UP
            </div>

            <div className="hero-chip chip-2">
              FAST • SECURE
            </div>
          </div>
        </section>

        <section className="section" id="games">

          <div className="section-head">

            <div>
              <div className="section-kicker">
                <Gamepad2 size={18} />
                GAME POPULER
              </div>

              <h2>Game favorit para gamer</h2>

              <p>
                Pilih game dan temukan produk top up yang kamu butuhkan.
              </p>
            </div>

            <button className="outline-btn">
              Lihat Semua
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="game-grid">
            {filtered.map(g => (
              <GameCard
                key={g.name}
                game={g}
                onClick={() =>
                  notify(
                    `${g.name} dipilih. Halaman top up akan dihubungkan ke katalog produk.`
                  )
                }
              />
            ))}
          </div>

          {!filtered.length && (
            <div className="empty">
              Game tidak ditemukan. Coba kata kunci lain.
            </div>
          )}

        </section>

        <section className="section feature-section">

          <div className="feature-grid">

            <FeatureCard
              title="TOP UP GAME"
              text="Proses cepat dan mudah"
              cta="Top Up Sekarang"
              tone="blue"
              onClick={() =>
                document
                  .getElementById('games')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            />

            <FeatureCard
              title="LAYANAN GAMING"
              text="WDP, Joki Rank, Mabar Push"
              cta="Lihat Layanan"
              tone="purple"
              onClick={() =>
                document
                  .getElementById('services')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            />

            <FeatureCard
              title="VOUCHER"
              text="Game Voucher & Gift Card"
              cta="Lihat Voucher"
              tone="cyan"
              onClick={() =>
                notify('Katalog voucher akan segera dihubungkan.')
              }
            />

          </div>
        </section>

        <section className="section" id="promo">

          <div className="section-head">

            <div>
              <div className="section-kicker">
                <Sparkles size={18} />
                PROMO SPESIAL
              </div>

              <h2>Penawaran terbaik untuk kamu</h2>

              <p>
                Promo nantinya dapat dikelola langsung dari Admin Panel.
              </p>
            </div>

            <button className="outline-btn">
              Semua Promo
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="promo-grid">
            {promos.map(p => (
              <PromoCard
                key={p.title}
                promo={p}
                onClick={() => notify(`${p.title} dipilih.`)}
              />
            ))}
          </div>

        </section>

        <section className="section" id="services">

          <div className="section-head">

            <div>
              <div className="section-kicker">
                <Headphones size={18} />
                LAYANAN GAMING
              </div>

              <h2>Tingkatkan pengalaman bermainmu</h2>

              <p>
                Layanan gaming pilihan dengan alur yang berbeda sesuai kebutuhan.
              </p>
            </div>

            <button className="outline-btn">
              Semua Layanan
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="service-grid">
            {services.map(s => (
              <ServiceCard
                key={s.name}
                service={s}
                onClick={() => notify(`${s.name} dipilih.`)}
              />
            ))}
          </div>

        </section>

        <section className="section info-section" id="articles">

          <div className="info-card">
            <BookOpen size={22} />

            <h3>Artikel & Berita Game</h3>

            <p>
              Tempat untuk panduan top up, tips gaming, informasi promo,
              dan berita pilihan. Konten nantinya dapat dikelola dari Admin Panel.
            </p>

            <button
              onClick={() =>
                notify('Halaman artikel akan dihubungkan ke CMS.')
              }
            >
              Baca Artikel
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="info-card">
            <ReceiptText size={22} />

            <h3>Cek Transaksi</h3>

            <p>
              Masukkan Order ID untuk melihat status pembayaran
              dan proses top up secara jelas.
            </p>

            <button
              onClick={() =>
                notify('Cek transaksi akan dihubungkan ke backend.')
              }
            >
              Cek Transaksi
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="info-card">
            <Trophy size={22} />

            <h3>Leaderboard</h3>

            <p>
              Sistem loyalty dan leaderboard dapat dikembangkan
              setelah modul akun dan transaksi aktif.
            </p>

            <button
              onClick={() =>
                notify('Leaderboard akan dihubungkan ke backend.')
              }
            >
              Lihat Leaderboard
              <ArrowRight size={16} />
            </button>
          </div>

        </section>

        <section className="faq section">

          <div className="section-kicker">
            <HelpCircle size={18} />
            BANTUAN
          </div>

          <h2>Punya pertanyaan?</h2>

          <p>
            FAQ, cara top up, pembayaran, refund, dan Customer Service
            akan tersedia dalam pusat bantuan SAVIXARA.
          </p>

          <div className="faq-actions">

            <button
              onClick={() =>
                notify('FAQ akan dihubungkan ke halaman bantuan.')
              }
            >
              Buka Pusat Bantuan
            </button>

            <button
              className="whatsapp"
              onClick={() =>
                notify(
                  'WhatsApp CS akan dihubungkan setelah nomor bisnis tersedia.'
                )
              }
            >
              <MessageCircle size={18} />
              Chat WhatsApp
            </button>

          </div>

        </section>

      </main>

      <footer className="footer">

        <div className="footer-top">

          <div className="footer-brand">

            <img src={logoUrl} alt="SAVIXARA" />

            <p>
              SAVIXARA adalah platform gaming untuk kebutuhan top up,
              voucher, dan layanan gaming pilihan dengan pengalaman yang praktis.
            </p>

          </div>

          <FooterCol
            title="Tentang SAVIXARA"
            items={[
              'Tentang Kami',
              'Kenapa SAVIXARA',
              'Keamanan Transaksi',
              'Layanan Game'
            ]}
          />

          <FooterCol
            title="Peta Situs"
            items={[
              'Beranda',
              'Top Up Games',
              'Layanan Gaming',
              'Voucher',
              'Promo',
              'Cek Transaksi',
              'Artikel'
            ]}
          />

          <FooterCol
            title="Dukungan"
            items={[
              'Pusat Bantuan',
              'FAQ',
              'Cara Top Up',
              'Cara Pembayaran',
              'Refund',
              'Hubungi Kami'
            ]}
          />

          <FooterCol
            title="Legalitas"
            items={[
              'Syarat & Ketentuan',
              'Kebijakan Privasi',
              'Kebijakan Refund',
              'Kebijakan Cookie'
            ]}
          />

          <FooterCol
            title="Social Media"
            items={[
              'Instagram',
              'TikTok',
              'YouTube',
              'Discord',
              'WhatsApp'
            ]}
          />

        </div>

        <div className="footer-bottom">
          <span>© 2026 SAVIXARA. All rights reserved.</span>
          <span>Top Up Game Jadi Lebih Mudah.</span>
        </div>

      </footer>

      <button
        className="float-wa"
        onClick={() =>
          notify(
            'WhatsApp CS akan dihubungkan setelah nomor bisnis tersedia.'
          )
        }
        aria-label="WhatsApp Customer Service"
      >
        <MessageCircle size={24} />
      </button>

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
}

function GameCard({ game, onClick }) {
  return (
    <button
      className={`game-card ${game.tone}`}
      onClick={onClick}
    >
      <div className="cover">
        <div className="cover-glow"></div>
        <span>{game.tag}</span>
        <Gamepad2 size={44} />
      </div>

      <div className="game-meta">
        <div>
          <b>{game.name}</b>
          <small>{game.publisher}</small>
        </div>

        <ChevronRight size={18} />
      </div>
    </button>
  );
}

function FeatureCard({
  title,
  text,
  cta,
  tone,
  onClick
}) {
  return (
    <div className={`feature-card ${tone}`}>

      <div className="feature-art">
        <div className="feature-orb"></div>
        <Gamepad2 size={50} />
      </div>

      <div className="feature-copy">
        <b>{title}</b>
        <span>{text}</span>

        <button onClick={onClick}>
          {cta}
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}

function PromoCard({ promo, onClick }) {
  return (
    <button
      className={`promo-card ${promo.tone}`}
      onClick={onClick}
    >
      <div className="promo-art">
        <Sparkles size={40} />
      </div>

      <div>
        <b>{promo.title}</b>
        <span>{promo.text}</span>

        <em>
          Lihat penawaran
          <ArrowRight size={13} />
        </em>
      </div>
    </button>
  );
}

function ServiceCard({ service, onClick }) {
  return (
    <button
      className={`service-card ${service.tone}`}
      onClick={onClick}
    >
      <div className="service-icon">
        <Headphones size={25} />
      </div>

      <div>
        <b>{service.name}</b>
        <span>{service.sub}</span>
      </div>

      <ArrowRight size={18} />
    </button>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="footer-col">
      <h4>{title}</h4>

      {items.map(i => (
        <a href="#" key={i}>
          {i}
        </a>
      ))}
    </div>
  );
}

createRoot(
  document.getElementById('root')
).render(<App />);
