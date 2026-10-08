import React, { useMemo, useState } from 'react';
import {
  Search,
  Gamepad2,
  ShieldCheck,
  Zap,
  Headphones,
  WalletCards,
  Sparkles,
  ArrowRight,
  ReceiptText,
  Trophy,
  BookOpen,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import FeatureCard from '../components/FeatureCard';
import PromoCard from '../components/PromoCard';
import ServiceCard from '../components/ServiceCard';

const games = [
  {
    name: 'Mobile Legends',
    publisher: 'Moonton',
    tag: 'MLBB',
    tone: 'mlbb'
  },
  {
    name: 'Free Fire',
    publisher: 'Garena',
    tag: 'FF',
    tone: 'ff'
  },
  {
    name: 'PUBG Mobile',
    publisher: 'Tencent Games',
    tag: 'PUBG',
    tone: 'pubg'
  },
  {
    name: 'Roblox',
    publisher: 'Roblox Corporation',
    tag: 'RBLX',
    tone: 'roblox'
  },
  {
    name: 'Honor of Kings',
    publisher: 'Tencent Games',
    tag: 'HOK',
    tone: 'hok'
  },
  {
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    tag: 'GEN',
    tone: 'genshin'
  }
];

const services = [
  {
    name: 'WDP Mobile Legends',
    sub: 'Weekly Diamond Pass',
    tone: 'wdp'
  },
  {
    name: 'Joki Rank Mobile Legends',
    sub: 'Layanan push rank',
    tone: 'joki'
  },
  {
    name: 'Mabar Push Mobile Legends',
    sub: 'Main bareng pro player',
    tone: 'mabar'
  }
];

const promos = [
  {
    title: 'Promo MLBB',
    text: 'Diskon khusus produk pilihan',
    tone: 'promo1'
  },
  {
    title: 'Weekly Diamond Pass',
    text: 'Harga spesial minggu ini',
    tone: 'promo2'
  },
  {
    title: 'Roblox',
    text: 'Penawaran cashback pilihan',
    tone: 'promo3'
  },
  {
    title: 'Free Fire',
    text: 'Bonus untuk produk tertentu',
    tone: 'promo4'
  }
];

function Home() {
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');

  const filteredGames = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return games;
    }

    return games.filter((game) =>
      `${game.name} ${game.publisher} ${game.tag}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [query]);

  const notify = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast('');
    }, 2600);
  };

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
  };

  return (
    <div className="app">

      <Header />

      <main>

        {/* HERO */}

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
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Cari game, layanan, atau voucher..."
                aria-label="Cari game, layanan, atau voucher"
              />

              <button
                type="button"
                onClick={() => scrollToSection('games')}
                aria-label="Cari"
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

              <div className="character-core">
                S
              </div>

            </div>

            <div className="hero-chip chip-1">
              TOP UP
            </div>

            <div className="hero-chip chip-2">
              FAST • SECURE
            </div>

          </div>

        </section>


        {/* GAME POPULER */}

        <section
          className="section"
          id="games"
        >

          <div className="section-head">

            <div>

              <div className="section-kicker">
                <Gamepad2 size={18} />
                GAME POPULER
              </div>

              <h2>
                Game favorit para gamer
              </h2>

              <p>
                Pilih game dan temukan produk top up
                yang kamu butuhkan.
              </p>

            </div>

            <button
              className="outline-btn"
              type="button"
              onClick={() =>
                notify('Katalog semua game akan segera tersedia.')
              }
            >
              Lihat Semua
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="game-grid">

            {filteredGames.map((game) => (
              <GameCard
                key={game.name}
                game={game}
                onClick={() =>
                  notify(
                    `${game.name} dipilih. Halaman top up akan dihubungkan ke katalog produk.`
                  )
                }
              />
            ))}

          </div>

          {filteredGames.length === 0 && (
            <div className="empty">
              Game tidak ditemukan.
              Coba kata kunci lain.
            </div>
          )}

        </section>


        {/* FEATURE */}

        <section className="section feature-section">

          <div className="feature-grid">

            <FeatureCard
              title="TOP UP GAME"
              text="Proses cepat dan mudah"
              cta="Top Up Sekarang"
              tone="blue"
              onClick={() =>
                scrollToSection('games')
              }
            />

            <FeatureCard
              title="LAYANAN GAMING"
              text="WDP, Joki Rank, Mabar Push"
              cta="Lihat Layanan"
              tone="purple"
              onClick={() =>
                scrollToSection('services')
              }
            />

            <FeatureCard
              title="VOUCHER"
              text="Game Voucher & Gift Card"
              cta="Lihat Voucher"
              tone="cyan"
              onClick={() =>
                notify(
                  'Katalog voucher akan segera dihubungkan.'
                )
              }
            />

          </div>

        </section>


        {/* PROMO */}

        <section
          className="section"
          id="promo"
        >

          <div className="section-head">

            <div>

              <div className="section-kicker">
                <Sparkles size={18} />
                PROMO SPESIAL
              </div>

              <h2>
                Penawaran terbaik untuk kamu
              </h2>

              <p>
                Promo dapat dikelola langsung
                dari Admin Panel nantinya.
              </p>

            </div>

            <button
              className="outline-btn"
              type="button"
              onClick={() =>
                notify(
                  'Semua promo akan tersedia setelah modul promo aktif.'
                )
              }
            >
              Semua Promo
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="promo-grid">

            {promos.map((promo) => (
              <PromoCard
                key={promo.title}
                promo={promo}
                onClick={() =>
                  notify(
                    `${promo.title} dipilih.`
                  )
                }
              />
            ))}

          </div>

        </section>


        {/* SERVICES */}

        <section
          className="section"
          id="services"
        >

          <div className="section-head">

            <div>

              <div className="section-kicker">
                <Headphones size={18} />
                LAYANAN GAMING
              </div>

              <h2>
                Tingkatkan pengalaman bermainmu
              </h2>

              <p>
                Layanan gaming pilihan dengan alur
                yang berbeda sesuai kebutuhan.
              </p>

            </div>

            <button
              className="outline-btn"
              type="button"
              onClick={() =>
                notify(
                  'Semua layanan akan tersedia setelah modul layanan aktif.'
                )
              }
            >
              Semua Layanan
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="service-grid">

            {services.map((service) => (
              <ServiceCard
                key={service.name}
                service={service}
                onClick={() =>
                  notify(
                    `${service.name} dipilih.`
                  )
                }
              />
            ))}

          </div>

        </section>


        {/* INFO */}

        <section
          className="section info-section"
          id="articles"
        >

          <div className="info-card">

            <BookOpen size={22} />

            <h3>
              Artikel & Berita Game
            </h3>

            <p>
              Tempat untuk panduan top up,
              tips gaming, informasi promo,
              dan berita pilihan.
            </p>

            <button
              type="button"
              onClick={() =>
                notify(
                  'Halaman artikel akan dihubungkan ke CMS.'
                )
              }
            >
              Baca Artikel
              <ArrowRight size={16} />
            </button>

          </div>


          <div className="info-card">

            <ReceiptText size={22} />

            <h3>
              Cek Transaksi
            </h3>

            <p>
              Masukkan Order ID untuk melihat
              status pembayaran dan proses top up.
            </p>

            <button
              type="button"
              onClick={() =>
                notify(
                  'Fitur cek transaksi akan dihubungkan ke backend.'
                )
              }
            >
              Cek Transaksi
              <ArrowRight size={16} />
            </button>

          </div>


          <div className="info-card">

            <Trophy size={22} />

            <h3>
              Leaderboard
            </h3>

            <p>
              Sistem loyalty dan leaderboard akan
              dikembangkan setelah modul akun aktif.
            </p>

            <button
              type="button"
              onClick={() =>
                notify(
                  'Leaderboard akan dihubungkan ke backend.'
                )
              }
            >
              Lihat Leaderboard
              <ArrowRight size={16} />
            </button>

          </div>

        </section>


        {/* FAQ */}

        <section className="faq section">

          <div className="section-kicker">
            <HelpCircle size={18} />
            BANTUAN
          </div>

          <h2>
            Punya pertanyaan?
          </h2>

          <p>
            FAQ, cara top up, pembayaran, refund,
            dan Customer Service akan tersedia
            dalam pusat bantuan SAVIXARA.
          </p>

          <div className="faq-actions">

            <button
              type="button"
              onClick={() =>
                notify(
                  'Pusat bantuan akan segera tersedia.'
                )
              }
            >
              Buka Pusat Bantuan
            </button>

            <button
              className="whatsapp"
              type="button"
              onClick={() =>
                notify(
                  'WhatsApp Customer Service akan dihubungkan setelah nomor bisnis tersedia.'
                )
              }
            >
              <MessageCircle size={18} />
              Chat WhatsApp
            </button>

          </div>

        </section>

      </main>


      <Footer />


      {/* FLOATING WHATSAPP */}

      <button
        className="float-wa"
        type="button"
        onClick={() =>
          notify(
            'WhatsApp Customer Service akan dihubungkan setelah nomor bisnis tersedia.'
          )
        }
        aria-label="WhatsApp Customer Service"
      >
        <MessageCircle size={24} />
      </button>


      {/* TOAST */}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
}

export default Home;
