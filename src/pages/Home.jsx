
import React, { useEffect, useMemo, useState } from 'react';

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
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import { supabase } from '../supabase';

/* =========================================================
   DATA CADANGAN
   Digunakan jika database belum dapat diakses.
========================================================= */

const fallbackGames = [
  {
    name: 'Mobile Legends',
    publisher: 'Moonton',
    tag: 'MLBB',
    tone: 'mlbb',
    slug: 'mobile-legends',
cover: '/images/games/mobile-legends.png',
category: 'MOBA',
    status: true
  },
  {
    name: 'Free Fire',
    publisher: 'Garena',
    tag: 'FF',
    tone: 'ff',
    slug: 'free-fire',
    cover: '/images/games/free-fire.png',
    category: 'Battle Royale',
    status: true
  },
  {
    name: 'PUBG Mobile',
    publisher: 'Tencent Games',
    tag: 'PUBG',
    tone: 'pubg',
    slug: 'pubg-mobile',
    cover: '/images/games/pubg-mobile.png',
    category: 'Battle Royale',
    status: true
  },
  {
    name: 'Roblox',
    publisher: 'Roblox Corporation',
    tag: 'RBLX',
    tone: 'roblox',
    slug: 'roblox',
    cover: '/images/games/roblox.png',
    category: 'Adventure',
    status: true
  },
  {
    name: 'Honor of Kings',
    publisher: 'Tencent Games',
    tag: 'HOK',
    tone: 'hok',
    slug: 'honor-of-kings',
    cover: '/images/games/honor-of-kings.png',
    category: 'MOBA',
    status: true
  },
  {
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    tag: 'GEN',
    tone: 'genshin',
    slug: 'genshin-impact',
    cover: '/images/games/genshin-impact.png',
    category: 'RPG',
    status: true
  }
];

const fallbackMobileLegendsProducts = [
  { id: 'ml-5', name: '5 Diamonds', selling_price: 1500 },
  { id: 'ml-12', name: '12 Diamonds', selling_price: 3500 },
  { id: 'ml-19', name: '19 Diamonds', selling_price: 5500 },
  { id: 'ml-28', name: '28 Diamonds', selling_price: 8000 },
  { id: 'ml-36', name: '36 Diamonds', selling_price: 10000 },
  { id: 'ml-44', name: '44 Diamonds', selling_price: 12000 },
  { id: 'ml-59', name: '59 Diamonds', selling_price: 16000 },
  { id: 'ml-85', name: '85 Diamonds', selling_price: 23000 },
  { id: 'ml-170', name: '170 Diamonds', selling_price: 45000 },
  { id: 'ml-240', name: '240 Diamonds', selling_price: 62000 },
  { id: 'ml-296', name: '296 Diamonds', selling_price: 76000 },
  { id: 'ml-408', name: '408 Diamonds', selling_price: 105000 },
  { id: 'ml-568', name: '568 Diamonds', selling_price: 145000 },
  { id: 'ml-875', name: '875 Diamonds', selling_price: 220000 }
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

const features = [
  {
    title: 'Proses Cepat',
    text: 'Pesanan diproses setelah pembayaran terverifikasi.',
    icon: Zap
  },
  {
    title: 'Harga Kompetitif',
    text: 'Informasi harga produk tersedia dengan jelas.',
    icon: WalletCards
  },
  {
    title: 'Transaksi Aman',
    text: 'Data pesanan dikelola dengan memperhatikan keamanan.',
    icon: ShieldCheck
  },
  {
    title: 'Customer Support',
    text: 'Pusat bantuan untuk pertanyaan seputar layanan.',
    icon: Headphones
  }
];

/* =========================================================
   HELPER
========================================================= */

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

const createSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getProductPrice = (product) => {
  const promo = Number(product?.promo_price);

  if (promo > 0) {
    return promo;
  }

  return Number(product?.selling_price) || 0;
};

const getProductName = (product) =>
  product?.name || product?.amount || 'Produk Game';

const getTone = (game) => {
  const slug = game?.slug || createSlug(game?.name);

  const tones = {
    'mobile-legends': 'mlbb',
    'free-fire': 'ff',
    'pubg-mobile': 'pubg',
    roblox: 'roblox',
    'honor-of-kings': 'hok',
    'genshin-impact': 'genshin'
  };

  return tones[slug] || '';
};

/* =========================================================
   HOME
========================================================= */

function Home() {
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');

  const [games, setGames] = useState(fallbackGames);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [databaseAvailable, setDatabaseAvailable] = useState(false);

  const [selectedGame, setSelectedGame] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');

  const [toastTimer, setToastTimer] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  

  /* =======================================================
     TOAST
  ======================================================= */

  const notify = (message) => {
    setToast(message);

    if (toastTimer) {
      window.clearTimeout(toastTimer);
    }

    const timer = window.setTimeout(() => {
      setToast('');
      setToastTimer(null);
    }, 2800);

    setToastTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (toastTimer) {
        window.clearTimeout(toastTimer);
      }
    };
  }, [toastTimer]);

  /* =======================================================
     AMBIL GAME DARI SUPABASE
  ======================================================= */

  const loadGames = async () => {
    setGamesLoading(true);

    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('status', true)
        .order('sort_order', { ascending: true });

      if (error) {
        throw error;
      }

      if (Array.isArray(data) && data.length > 0) {
        const normalizedGames = data.map((game) => ({
          ...game,
          slug: game.slug || createSlug(game.name),
          tag: game.tag || game.name,
          tone: getTone(game)
        }));

        setGames(normalizedGames);
        setDatabaseAvailable(true);
      } else {
        setGames(fallbackGames);
        setDatabaseAvailable(false);
      }
    } catch (error) {
      console.error('Gagal memuat game:', error);
      setGames(fallbackGames);
      setDatabaseAvailable(false);
    } finally {
      setGamesLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  /* =======================================================
     PENCARIAN GAME
  ======================================================= */

  const filteredGames = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return games;
    }

    return games.filter((game) =>
      [
        game.name,
        game.publisher,
        game.tag,
        game.category
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    );
  }, [games, query]);

  /* =======================================================
     SCROLL
  ======================================================= */

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  /* =======================================================
     BUKA GAME
  ======================================================= */

  const openGame = async (game) => {
    if (!game) return;

    setSelectedGame(game);
    setSelectedProduct(null);
    setProducts([]);
    setUserId('');
    setServerId('');
    setProductsLoading(true);

    const slug = game.slug || createSlug(game.name);

    window.history.replaceState(
      null,
      '',
      `#topup/${slug}`
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    try {
      if (!game.id) {
        throw new Error('Game belum memiliki ID database.');
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('game_id', game.id)
        .order('selling_price', { ascending: true });

      if (error) {
        throw error;
      }

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Gagal memuat produk:', error);

      if (slug === 'mobile-legends') {
        setProducts(fallbackMobileLegendsProducts);
      } else {
        setProducts([]);
      }

      notify(
        'Data produk database belum dapat dimuat. Periksa koneksi dan kebijakan RLS.'
      );
    } finally {
      setProductsLoading(false);
    }
  };

  /* =======================================================
     KEMBALI KE BERANDA
  ======================================================= */

  const closeCatalog = () => {
    setSelectedGame(null);
    setSelectedProduct(null);
    setProducts([]);
    setUserId('');
    setServerId('');

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
     CHECKOUT SEMENTARA
     Belum membuat pesanan atau memproses pembayaran.
  ======================================================= */

  const handleContinue = () => {
    if (!userId.trim()) {
      notify('Silakan masukkan User ID terlebih dahulu.');
      return;
    }

    if (
      selectedGame?.slug === 'mobile-legends' &&
      !serverId.trim()
    ) {
      notify('Silakan masukkan Server ID terlebih dahulu.');
      return;
    }

    if (!selectedProduct) {
      notify('Silakan pilih nominal produk terlebih dahulu.');
      return;
    }

    notify(
      'Pilihan produk sudah siap. Sistem checkout dan pembayaran belum diaktifkan.'
    );
  };

  /* =======================================================
     KATALOG TOP UP
  ======================================================= */

  if (selectedGame) {
    const isMobileLegends =
      (selectedGame.slug || createSlug(selectedGame.name)) ===
      'mobile-legends';

    return (
      <div className="app">
        <Header />

        <main>
          <section className="section topup-page">
            <button
              type="button"
              className="outline-btn"
              onClick={closeCatalog}
            >
              <ArrowLeft size={17} />
              Kembali
            </button>

            <div className="topup-header">
              <div className="section-kicker">
                <Gamepad2 size={18} />
                TOP UP GAME
              </div>

              <h1>Top Up {selectedGame.name}</h1>

              <p>
                Pilih produk, masukkan data pemain,
                lalu lanjutkan ke tahap berikutnya.
              </p>
            </div>

            <div className="topup-layout">
              <div className="topup-products">
                <div className="topup-card">
                  <div className="topup-card-head">
                    <div>
                      <span className="topup-label">
                        {selectedGame.name.toUpperCase()}
                      </span>

                      <h2>Pilih Produk</h2>

                      <p>
                        Pilih nominal yang sesuai dengan kebutuhanmu.
                      </p>
                    </div>

                    <Gamepad2 size={28} />
                  </div>

                  {productsLoading ? (
                    <div className="empty-state">
                      <RefreshCw size={24} />
                      <p>Memuat produk dari database...</p>
                    </div>
                  ) : products.length > 0 ? (
                    <div className="product-grid">
                      {products.map((product) => {
                        const price = getProductPrice(product);
                        const active =
                          selectedProduct?.id === product.id;

                        return (
                          <button
                            key={product.id}
                            type="button"
                            className={`product-option ${
                              active ? 'active' : ''
                            }`}
                            onClick={() =>
                              setSelectedProduct({
                                ...product,
                                amount: getProductName(product),
                                price
                              })
                            }
                          >
                            <div>
                              <strong>
                                {getProductName(product)}
                              </strong>

                              <small>
                                {product.description ||
                                  'Produk top up game'}
                              </small>
                            </div>

                            <span>{formatRupiah(price)}</span>

                            {active && (
                              <CheckCircle2 size={18} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <Gamepad2 size={30} />
                      <h3>Produk belum tersedia</h3>
                      <p>
                        Tambahkan produk untuk game ini melalui
                        tabel products di Supabase.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="topup-sidebar">
                <div className="topup-card">
                  <div className="topup-card-head">
                    <div>
                      <span className="topup-label">
                        DATA AKUN
                      </span>

                      <h2>Detail Pemain</h2>
                    </div>

                    <ShieldCheck size={26} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="user-id">User ID</label>

                    <input
                      id="user-id"
                      type="text"
                      value={userId}
                      onChange={(event) =>
                        setUserId(event.target.value)
                      }
                      placeholder="Masukkan User ID"
                      autoComplete="off"
                    />
                  </div>

                  {isMobileLegends && (
                    <div className="form-group">
                      <label htmlFor="server-id">
                        Server ID
                      </label>

                      <input
                        id="server-id"
                        type="text"
                        value={serverId}
                        onChange={(event) =>
                          setServerId(event.target.value)
                        }
                        placeholder="Masukkan Server ID"
                        autoComplete="off"
                      />
                    </div>
                  )}

                  <div className="account-note">
                    <ShieldCheck size={17} />

                    <span>
                      Jangan berikan password akun game kamu.
                    </span>
                  </div>
                </div>

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
                    <span>Produk</span>

                    <strong>
                      {selectedProduct
                        ? selectedProduct.amount
                        : '-'}
                    </strong>
                  </div>

                  <div className="summary-row">
                    <span>Harga</span>

                    <strong>
                      {selectedProduct
                        ? formatRupiah(
                            selectedProduct.price ??
                              getProductPrice(selectedProduct)
                          )
                        : '-'}
                    </strong>
                  </div>

                  <div className="summary-total">
                    <span>Total</span>

                    <strong>
                      {selectedProduct
                        ? formatRupiah(
                            selectedProduct.price ??
                              getProductPrice(selectedProduct)
                          )
                        : 'Rp0'}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="checkout-btn"
                    onClick={handleContinue}
                    disabled={
                      productsLoading || products.length === 0
                    }
                  >
                    Lanjutkan
                    <ArrowRight size={18} />
                  </button>

                  <p className="checkout-disclaimer">
                    Pembayaran belum terhubung. Tombol ini belum
                    membuat transaksi sungguhan.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  /* =========================================================
     BERANDA
  ========================================================= */

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
              Top up game, voucher, dan layanan gaming
              dalam satu tempat. Pilih game favoritmu
              dan lihat katalog produk SAVIXARA.
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
                aria-label="Cari game"
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
                  <small>Informasi pesanan jelas</small>
                </span>
              </div>

              <div>
                <WalletCards size={18} />
                <span>
                  <b>Harga Kompetitif</b>
                  <small>Harga dari katalog</small>
                </span>
              </div>

              <div>
                <ShieldCheck size={18} />
                <span>
                  <b>Transaksi Aman</b>
                  <small>Utamakan keamanan</small>
                </span>
              </div>

              <div>
                <Headphones size={18} />
                <span>
                  <b>Customer Support</b>
                  <small>Pusat bantuan</small>
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

            <div className="hero-chip chip-1">TOP UP</div>
            <div className="hero-chip chip-2">
              FAST • SECURE
            </div>
          </div>
        </section>

        {/* GAME POPULER */}

        <section className="section" id="games">
          <div className="section-head">
            <div>
              <div className="section-kicker">
                <Gamepad2 size={18} />
                PILIH GAME FAVORITMU
              </div>

              <h2>Game Populer</h2>

              <p>
                Pilih game untuk melihat produk top up yang tersedia.
              </p>
            </div>

            <button
              type="button"
              className="text-link"
              onClick={() => {
                setQuery('');
                scrollToSection('games');
              }}
            >
              Lihat Semua
              <ArrowRight size={17} />
            </button>
          </div>

          {gamesLoading ? (
            <div className="empty-state">
              <RefreshCw size={24} />
              <p>Memuat katalog game...</p>
            </div>
          ) : (
            <>
              {databaseAvailable && (
                <p className="catalog-note">
                  <CheckCircle2 size={15} />
                  Katalog game dimuat dari database.
                </p>
              )}

              <div className="game-grid">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id || game.slug}
                    game={{
                      ...game,
                      tone: game.tone || getTone(game),
                      icon: game.icon_url || null,
                      cover: game.cover_url || null
                    }}
                    onClick={() => openGame(game)}
                  />
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="empty-state">
                  <Search size={28} />
                  <h3>Game tidak ditemukan</h3>
                  <p>
                    Coba kata kunci lain atau hapus pencarian.
                  </p>

                  <button
                    type="button"
                    className="outline-btn"
                    onClick={() => setQuery('')}
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </>
          )}

          <button
            type="button"
            className="outline-btn refresh-catalog"
            onClick={loadGames}
            disabled={gamesLoading}
          >
            <RefreshCw size={16} />
            Muat Ulang Katalog
          </button>
        </section>

        {/* KEUNGGULAN */}

        <section className="section features-section" id="features">
          <div className="section-head">
            <div>
              <div className="section-kicker">
                <ShieldCheck size={18} />
                KENAPA SAVIXARA
              </div>

              <h2>Pengalaman Gaming Lebih Praktis</h2>

              <p>
                Kami ingin membuat proses memilih produk lebih mudah
                dan informatif.
              </p>
            </div>
          </div>

          <div className="feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  className="feature-card"
                  key={feature.title}
                >
                  <div className="feature-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROMO */}

        <section className="section" id="promo">
          <div className="section-head">
            <div>
              <div className="section-kicker">
                <Sparkles size={18} />
                PENAWARAN
              </div>

              <h2>Promo Pilihan</h2>

              <p>
                Nantinya promo dapat dikelola melalui database
                dan panel admin.
              </p>
            </div>
          </div>

          <div className="promo-grid">
            {promos.map((promo) => (
              <div
                className={`promo-card ${promo.tone}`}
                key={promo.title}
              >
                <span className="promo-label">
                  SAVIXARA SPECIAL
                </span>

                <h3>{promo.title}</h3>
                <p>{promo.text}</p>

                <button
                  type="button"
                  onClick={() => {
                    setQuery(promo.title.replace('Promo ', ''));
                    scrollToSection('games');
                  }}
                >
                  Cari Game
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* LAYANAN GAMING */}

        <section className="section" id="services">
          <div className="section-head">
            <div>
              <div className="section-kicker">
                <Trophy size={18} />
                LAYANAN GAMING
              </div>

              <h2>Lebih dari Sekadar Top Up</h2>

              <p>
                Pilihan layanan gaming yang direncanakan untuk SAVIXARA.
              </p>
            </div>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <div
                className={`service-card ${service.tone}`}
                key={service.name}
              >
                <div className="service-icon">
                  <Gamepad2 size={25} />
                </div>

                <h3>{service.name}</h3>
                <p>{service.sub}</p>

                <button
                  type="button"
                  onClick={() =>
                    notify(
                      'Layanan ini belum tersedia untuk pemesanan.'
                    )
                  }
                >
                  Pelajari Layanan
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* INFO */}

        <section className="section info-section" id="info">
          <div className="section-head">
            <div>
              <div className="section-kicker">
                <BookOpen size={18} />
                INFORMASI
              </div>

              <h2>Informasi SAVIXARA</h2>

              <p>
                Informasi layanan akan disediakan secara bertahap.
              </p>
            </div>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <ShieldCheck size={25} />
              <h3>Keamanan Transaksi</h3>
              <p>
                Informasi keamanan dan perlindungan data pengguna.
              </p>
              <button
                type="button"
                onClick={() =>
                  notify('Halaman keamanan sedang dipersiapkan.')
                }
              >
                Selengkapnya
                <ArrowRight size={16} />
              </button>
            </article>

            <article className="info-card">
              <ReceiptText size={25} />
              <h3>Cek Transaksi</h3>
              <p>
                Fitur untuk memeriksa status pesanan akan disiapkan.
              </p>
              <button
                type="button"
                onClick={() =>
                  notify('Fitur cek transaksi belum diaktifkan.')
                }
              >
                Cek Status
                <ArrowRight size={16} />
              </button>
            </article>

            <article className="info-card">
              <BookOpen size={25} />
              <h3>Panduan Top Up</h3>
              <p>
                Panduan memilih produk dan memasukkan data pemain.
              </p>
              <button
                type="button"
                onClick={() =>
                  notify('Panduan top up sedang dipersiapkan.')
                }
              >
                Baca Panduan
                <ArrowRight size={16} />
              </button>
            </article>
          </div>
        </section>

        {/* FAQ SAVIXARA */}
<section className="section faq-section" id="help">
  <div className="faq-content">
    <div className="section-kicker">
      <HelpCircle size={18} />
      PUSAT BANTUAN
    </div>

    <h2>Pertanyaan yang Sering Diajukan</h2>

    <p className="faq-intro">
      Temukan informasi dasar tentang top up dan layanan SAVIXARA.
    </p>

    <div className="faq-list">
  {[
    {
      question: 'Bagaimana cara melakukan top up?',
      answer: 'Pilih game dan nominal produk, lalu masukkan User ID serta data pemain yang diminta. Saat ini sistem checkout dan pembayaran SAVIXARA belum aktif.'
    },
    {
      question: 'Di mana saya menemukan User ID dan Server ID?',
      answer: 'Data tersebut biasanya tersedia di profil dalam game. Pastikan datanya sesuai dengan akun tujuan dan jangan pernah memberikan password akun game kepada siapa pun.'
    },
    {
      question: 'Metode pembayaran apa yang tersedia?',
      answer: 'Metode pembayaran SAVIXARA masih dalam persiapan. Jangan melakukan transfer berdasarkan instruksi yang belum terverifikasi.'
    },
    {
      question: 'Bagaimana cara mengecek status transaksi?',
      answer: 'Fitur pengecekan transaksi belum diaktifkan. Tombol Lanjutkan saat ini belum membuat pesanan sungguhan.'
    },
    {
      question: 'Bagaimana jika ingin mengajukan refund?',
      answer: 'Kebijakan refund resmi akan diumumkan ketika sistem transaksi SAVIXARA sudah tersedia.'
    },
    {
      question: 'Bagaimana cara menghubungi Customer Service?',
      answer: 'Kontak resmi Customer Service SAVIXARA masih disiapkan dan akan ditampilkan setelah kanal bantuan resmi tersedia.'
    }
  ].map((faq, index) => (
    <div className="faq-item" key={faq.question}>
      <button
        type="button"
        className="faq-question"
        aria-expanded={openFaq === index}
        onClick={() =>
          setOpenFaq(openFaq === index ? null : index)
        }
      >
        <span>{faq.question}</span>
        <span className="faq-icon">
          {openFaq === index ? '−' : '+'}
        </span>
      </button>

      {openFaq === index && (
        <p className="faq-answer">{faq.answer}</p>
      )}
    </div>
  ))}
</div>
  </div>
</section>
      </main>

      <Footer onNotify={notify} />

      {/* FLOATING WHATSAPP */}

      
<a
  className="float-wa"
  href="https://wa.me/6285795191215"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp Customer Service"
>
  <MessageCircle size={24} />
</a>
      
      {/* TOAST */}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Home;
      
