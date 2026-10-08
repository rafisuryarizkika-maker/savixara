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
  ArrowLeft,
  ReceiptText,
  Trophy,
  BookOpen,
  HelpCircle,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import FeatureCard from '../components/FeatureCard';
import PromoCard from '../components/PromoCard';
import ServiceCard from '../components/ServiceCard';


/* =========================================================
   DATA GAME
========================================================= */

const games = [
  {
    name: 'Mobile Legends',
    publisher: 'Moonton',
    tag: 'MLBB',
    tone: 'mlbb',
    slug: 'mobile-legends'
  },
  {
    name: 'Free Fire',
    publisher: 'Garena',
    tag: 'FF',
    tone: 'ff',
    slug: 'free-fire'
  },
  {
    name: 'PUBG Mobile',
    publisher: 'Tencent Games',
    tag: 'PUBG',
    tone: 'pubg',
    slug: 'pubg-mobile'
  },
  {
    name: 'Roblox',
    publisher: 'Roblox Corporation',
    tag: 'RBLX',
    tone: 'roblox',
    slug: 'roblox'
  },
  {
    name: 'Honor of Kings',
    publisher: 'Tencent Games',
    tag: 'HOK',
    tone: 'hok',
    slug: 'honor-of-kings'
  },
  {
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    tag: 'GEN',
    tone: 'genshin',
    slug: 'genshin-impact'
  }
];


/* =========================================================
   PRODUK MOBILE LEGENDS
========================================================= */

const mobileLegendsProducts = [
  {
    id: 'ml-5',
    amount: '5 Diamonds',
    price: 1500
  },
  {
    id: 'ml-12',
    amount: '12 Diamonds',
    price: 3500
  },
  {
    id: 'ml-19',
    amount: '19 Diamonds',
    price: 5500
  },
  {
    id: 'ml-28',
    amount: '28 Diamonds',
    price: 8000
  },
  {
    id: 'ml-36',
    amount: '36 Diamonds',
    price: 10000
  },
  {
    id: 'ml-44',
    amount: '44 Diamonds',
    price: 12000
  },
  {
    id: 'ml-59',
    amount: '59 Diamonds',
    price: 16000
  },
  {
    id: 'ml-85',
    amount: '85 Diamonds',
    price: 23000
  },
  {
    id: 'ml-170',
    amount: '170 Diamonds',
    price: 45000
  },
  {
    id: 'ml-240',
    amount: '240 Diamonds',
    price: 62000
  },
  {
    id: 'ml-296',
    amount: '296 Diamonds',
    price: 76000
  },
  {
    id: 'ml-408',
    amount: '408 Diamonds',
    price: 105000
  },
  {
    id: 'ml-568',
    amount: '568 Diamonds',
    price: 145000
  },
  {
    id: 'ml-875',
    amount: '875 Diamonds',
    price: 220000
  }
];


/* =========================================================
   LAYANAN
========================================================= */

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


/* =========================================================
   PROMO
========================================================= */

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


/* =========================================================
   FORMAT RUPIAH
========================================================= */

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
};


/* =========================================================
   HOME
========================================================= */

function Home() {

  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');

  const [selectedGame, setSelectedGame] = useState(null);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');


  /* =======================================================
     SEARCH GAME
  ======================================================= */

  const filteredGames = useMemo(() => {

    const keyword =
      query.trim().toLowerCase();

    if (!keyword) {
      return games;
    }

    return games.filter((game) =>
      `${game.name} ${game.publisher} ${game.tag}`
        .toLowerCase()
        .includes(keyword)
    );

  }, [query]);


  /* =======================================================
     TOAST
  ======================================================= */

  const notify = (message) => {

    setToast(message);

    window.setTimeout(() => {
      setToast('');
    }, 2600);

  };


  /* =======================================================
     SCROLL
  ======================================================= */

  const scrollToSection = (id) => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

  };


  /* =======================================================
     BUKA KATALOG GAME
  ======================================================= */

  const openGame = (game) => {

    if (!game) return;

    setSelectedGame(game);
    setSelectedProduct(null);

    setUserId('');
    setServerId('');

    window.history.replaceState(
      null,
      '',
      `#topup/${game.slug || game.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')}`
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  };


  /* =======================================================
     KEMBALI KE HOME
  ======================================================= */

  const closeCatalog = () => {

    setSelectedGame(null);
    setSelectedProduct(null);

    window.history.replaceState(
      null,
      '',
      window.location.pathname
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  };


  /* =======================================================
     LANJUT CHECKOUT
  ======================================================= */

  const handleContinue = () => {

    if (!userId.trim()) {

      notify(
        'Silakan masukkan User ID terlebih dahulu.'
      );

      return;
    }

    if (!serverId.trim()) {

      notify(
        'Silakan masukkan Server ID terlebih dahulu.'
      );

      return;
    }

    if (!selectedProduct) {

      notify(
        'Silakan pilih nominal Diamond terlebih dahulu.'
      );

      return;
    }

    notify(
      `Pesanan ${selectedProduct.amount} siap diproses.`
    );

  };


  /* =======================================================
     KATALOG TOP UP
  ======================================================= */

  if (selectedGame) {

    const isMobileLegends =
      selectedGame.slug === 'mobile-legends';

    return (
      <div className="app">

        <Header />

        <main>

          <section className="section topup-page">

            {/* BACK */}

            <button
              type="button"
              className="outline-btn"
              onClick={closeCatalog}
            >
              <ArrowLeft size={17} />
              Kembali
            </button>


            {/* HEADER KATALOG */}

            <div className="topup-header">

              <div className="section-kicker">
                <Gamepad2 size={18} />
                TOP UP GAME
              </div>

              <h1>
                Top Up {selectedGame.name}
              </h1>

              <p>
                Pilih produk yang kamu inginkan,
                masukkan data akun, lalu lanjutkan
                ke proses pembayaran.
              </p>

            </div>


            {!isMobileLegends ? (

              <div className="info-card">

                <Gamepad2 size={32} />

                <h3>
                  Katalog {selectedGame.name}
                </h3>

                <p>
                  Produk top up game ini sedang
                  dipersiapkan dan akan segera tersedia
                  di SAVIXARA.
                </p>

                <button
                  type="button"
                  onClick={closeCatalog}
                >
                  Kembali ke Game
                  <ArrowLeft size={16} />
                </button>

              </div>

            ) : (

              <div className="topup-layout">

                {/* =================================================
                   KOLOM PRODUK
                ================================================== */}

                <div className="topup-products">

                  <div className="topup-card">

                    <div className="topup-card-head">

                      <div>

                        <span className="topup-label">
                          MOBILE LEGENDS
                        </span>

                        <h2>
                          Pilih Nominal
                        </h2>

                        <p>
                          Diamond akan diproses
                          ke akun Mobile Legends kamu.
                        </p>

                      </div>

                      <Gamepad2 size={28} />

                    </div>


                    <div className="product-grid">

                      {mobileLegendsProducts.map(
                        (product) => {

                          const active =
                            selectedProduct?.id ===
                            product.id;

                          return (
                            <button
                              key={product.id}
                              type="button"
                              className={
                                `product-option ${
                                  active
                                    ? 'active'
                                    : ''
                                }`
                              }
                              onClick={() =>
                                setSelectedProduct(
                                  product
                                )
                              }
                            >

                              <div>

                                <strong>
                                  {product.amount}
                                </strong>

                                <small>
                                  Instant Delivery
                                </small>

                              </div>

                              <span>
                                {formatRupiah(
                                  product.price
                                )}
                              </span>

                              {active && (
                                <CheckCircle2
                                  size={18}
                                />
                              )}

                            </button>
                          );

                        }
                      )}

                    </div>

                  </div>

                </div>


                {/* =================================================
                   CHECKOUT SIDEBAR
                ================================================== */}

                <div className="topup-sidebar">

                  <div className="topup-card">

                    <div className="topup-card-head">

                      <div>

                        <span className="topup-label">
                          DATA AKUN
                        </span>

                        <h2>
                          Detail Pemain
                        </h2>

                      </div>

                      <ShieldCheck size={26} />

                    </div>


                    <div className="form-group">

                      <label htmlFor="user-id">
                        User ID
                      </label>

                      <input
                        id="user-id"
                        type="text"
                        value={userId}
                        onChange={(event) =>
                          setUserId(
                            event.target.value
                          )
                        }
                        placeholder="Masukkan User ID"
                      />

                    </div>


                    <div className="form-group">

                      <label htmlFor="server-id">
                        Server ID
                      </label>

                      <input
                        id="server-id"
                        type="text"
                        value={serverId}
                        onChange={(event) =>
                          setServerId(
                            event.target.value
                          )
                        }
                        placeholder="Masukkan Server ID"
                      />

                    </div>


                    <div className="account-note">

                      <ShieldCheck size={17} />

                      <span>
                        Jangan berikan password
                        akun game kamu.
                      </span>

                    </div>

                  </div>


                  {/* RINGKASAN */}

                  <div className="topup-card summary-card">

                    <span className="topup-label">
                      RINGKASAN PESANAN
                    </span>

                    <h3>
                      {selectedProduct
                        ? selectedProduct.amount
                        : 'Belum memilih produk'}
                    </h3>


                    <div className="summary-row">

                      <span>
                        Produk
                      </span>

                      <strong>
                        {selectedProduct
                          ? selectedProduct.amount
                          : '-'}
                      </strong>

                    </div>


                    <div className="summary-row">

                      <span>
                        Harga
                      </span>

                      <strong>
                        {selectedProduct
                          ? formatRupiah(
                              selectedProduct.price
                            )
                          : '-'}
                      </strong>

                    </div>


                    <div className="summary-total">

                      <span>
                        Total
                      </span>

                      <strong>
                        {selectedProduct
                          ? formatRupiah(
                              selectedProduct.price
                            )
                          : 'Rp0'}
                      </strong>

                    </div>


                    <button
                      type="button"
                      className="checkout-btn"
                      onClick={handleContinue}
                    >
                      Lanjutkan
                      <ArrowRight size={18} />
                    </button>

                  </div>

                </div>

              </div>

            )}

          </section>

        </main>

        <Footer />

        {toast && (
          <div className="toast">
            {toast}
          </div>
        )}

      </div>
    );
  }


  /* =========================================================
     HOME NORMAL
  ========================================================== */

  return (
    <div className="app">

      <Header />

      <main>

        {/* =====================================================
           HERO
        ====================================================== */}

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

              Top up game, voucher, dan layanan gaming
              dalam satu tempat.
              Proses cepat, aman, dan terpercaya.

            </p>


            {/* SEARCH */}

            <div className="search-box">

              <Search size={20} />

              <input
                id="search"
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(
                    event.target.value
                  )
                }
                placeholder="Cari game, layanan, atau voucher..."
                aria-label="Cari game, layanan, atau voucher"
              />

              <button
                type="button"
                onClick={() =>
                  scrollToSection('games')
                }
                aria-label="Cari"
              >

                <Search size={18} />

              </button>

            </div>


            {/* TRUST */}

            <div className="trust-row">

              <div>

                <Zap size={18} />

                <span>

                  <b>
                    Proses Cepat
                  </b>

                  <small>
                    Hitungan detik
                  </small>

                </span>

              </div>


              <div>

                <WalletCards size={18} />

                <span>

                  <b>
                    Harga Kompetitif
                  </b>

                  <small>
                    Selalu diperbarui
                  </small>

                </span>

              </div>


              <div>

                <ShieldCheck size={18} />

                <span>

                  <b>
                    Transaksi Aman
                  </b>

                  <small>
                    Data terlindungi
                  </small>

                </span>

              </div>


              <div>

                <Headphones size={18} />

                <span>

                  <b>
                    Customer Support
                  </b>

                  <small>
                    Siap membantu
                  </small>

                </span>

              </div>

            </div>

          </div>


          {/* HERO ART */}

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


        {/* =====================================================
           GAME POPULER
        ====================================================== */}

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
                notify(
                  'Katalog semua game akan segera tersedia.'
                )
              }
            >

              Lihat Semua

              <ArrowRight size={16} />

            </button>

          </div>


          <div className="game-grid">

            {filteredGames.map(
              (game) => (

                <GameCard
                  key={game.name}
                  game={game}
                  onClick={openGame}
                />

              )
            )}

          </div>


          {filteredGames.length === 0 && (

            <div className="empty">

              Game tidak ditemukan.

              <br />

              Coba kata kunci lain.

            </div>

          )}

        </section>


        {/* =====================================================
           FEATURE
        ====================================================== */}

        <section
          className="section feature-section"
        >

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


        {/* =====================================================
           PROMO
        ====================================================== */}

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

            {promos.map(
              (promo) => (

                <PromoCard
                  key={promo.title}
                  promo={promo}
                  onClick={() =>
                    notify(
                      `${promo.title} dipilih.`
                    )
                  }
                />

              )
            )}

          </div>

        </section>


        {/* =====================================================
           SERVICES
        ====================================================== */}

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

            {services.map(
              (service) => (

                <ServiceCard
                  key={service.name}
                  service={service}
                  onClick={() =>
                    notify(
                      `${service.name} dipilih.`
                    )
                  }
                />

              )
            )}

          </div>

        </section>


        {/* =====================================================
           INFO
        ====================================================== */}

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


        {/* =====================================================
           FAQ
        ====================================================== */}

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


      {/* =====================================================
         FLOATING WHATSAPP
      ====================================================== */}

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


      {/* =====================================================
         TOAST
      ====================================================== */}

      {toast && (

        <div className="toast">
          {toast}
        </div>

      )}

    </div>
  );
}


export default Home;
          

                
