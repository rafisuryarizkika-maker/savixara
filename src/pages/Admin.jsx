
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function Admin({ onBack }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [games, setGames] = useState([]);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSavingId, setProductSavingId] = useState(null);
  const [providerTesting, setProviderTesting] = useState(false);
  const [providerMessage, setProviderMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    publisher: '',
    category: '',
    cover_url: '',
    icon_url: '',
    description: '',
    sort_order: 0,
    status: true,
  });

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        if (active) {
          setMessage('Silakan login terlebih dahulu.');
          setLoading(false);
        }
        return;
      }

      const { data: isAdmin, error: adminError } =
        await supabase.rpc('is_admin');

      if (adminError || isAdmin !== true) {
        if (active) {
          setMessage('Akses ditolak. Akun admin diperlukan.');
          setLoading(false);
        }
        return;
      }

      if (active) {
  setAuthorized(true);
  await loadGames(active);
  await loadProducts(active);
  setLoading(false);
}
      
    }

    async function loadGames(isActive = true) {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!isActive) return;

      if (error) {
        setMessage('Gagal memuat game: ' + error.message);
        return;
      }

      setGames(data || []);
    }
    
async function loadProducts(isActive = true) {
  setProductsLoading(true);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (!isActive) return;

  if (error) {
    setMessage('Gagal memuat produk: ' + error.message);
    setProductsLoading(false);
    return;
  }

  setProducts(data || []);
  setProductsLoading(false);
}
    

    checkAdmin();

    return () => {
      active = false;
    };
  }, []);

  

async function testMelostoreConnection() {
  setProviderTesting(true);
  setProviderMessage('Sedang memeriksa koneksi Melostore...');

  try {
    const {
      data: sessionData,
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session?.access_token) {
      setProviderMessage(
        'Sesi login tidak ditemukan. Silakan keluar lalu login kembali.'
      );
      return;
    }

    const { data, error } = await supabase.functions.invoke(
      'melostore-profile',
      {
        body: {},
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`
        }
      }
    );

    if (error) {
      setProviderMessage(
        'Tes gagal: ' + (error.message || 'Permintaan fungsi gagal.')
      );
      return;
    }

    if (data?.ok) {
      setProviderMessage(
        data.message || 'Koneksi Melostore berhasil.'
      );
    } else {
      setProviderMessage(
        data?.message || 'Koneksi belum berhasil. Periksa Logs di Supabase.'
      );
    }
  } catch (error) {
    setProviderMessage(
      'Tes gagal dijalankan: ' +
      (error?.message || 'Kesalahan tidak diketahui.')
    );
  } finally {
    setProviderTesting(false);
  }
}
  

async function saveProduct(product) {
  setMessage('');

  const costPrice = Number(product.cost_price);
  const sellingPrice = Number(product.selling_price);
  const promoPrice =
    product.promo_price === '' || product.promo_price == null
      ? null
      : Number(product.promo_price);

  if (
  !Number.isFinite(costPrice) ||
  !Number.isFinite(sellingPrice) ||
  costPrice < 0 ||
  sellingPrice < 0
) {
    setMessage('Harga modal dan harga jual harus valid.');
    return;
  }

  if (
  promoPrice !== null &&
  (!Number.isFinite(promoPrice) || promoPrice < 0)
) {
    setMessage('Harga promo harus valid atau dikosongkan.');
    return;
  }

  setProductSavingId(product.id);

  const { error } = await supabase
    .from('products')
    .update({
      cost_price: costPrice,
      selling_price: sellingPrice,
      promo_price: promoPrice,
    })
    .eq('id', product.id);

  setProductSavingId(null);

  if (error) {
    setMessage('Gagal menyimpan harga: ' + error.message);
    return;
  }

  setMessage('Harga produk berhasil diperbarui.');
  await loadProducts();
}
  

  function updateForm(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'sort_order'
            ? Number(value)
            : value,
    }));
  }

  async function saveGame(event) {
    event.preventDefault();
    setMessage('');

    if (!form.name.trim()) {
      setMessage('Nama game wajib diisi.');
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      name: form.name.trim(),
      slug: form.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
      publisher: form.publisher.trim() || null,
      category: form.category.trim() || null,
      cover_url: form.cover_url.trim() || null,
      icon_url: form.icon_url.trim() || null,
      description: form.description.trim() || null,
    };

    const { error } = await supabase
      .from('games')
      .insert(payload);

    setSaving(false);

    if (error) {
      setMessage('Game gagal ditambahkan: ' + error.message);
      return;
    }

    setMessage('Game berhasil ditambahkan.');
    setForm({
      name: '',
      publisher: '',
      category: '',
      cover_url: '',
      icon_url: '',
      description: '',
      sort_order: 0,
      status: true,
    });

    const { data } = await supabase
      .from('games')
      .select('*')
      .order('sort_order', { ascending: true });

    setGames(data || []);
  }

  async function toggleGame(game) {
    setMessage('');

    const { error } = await supabase
      .from('games')
      .update({ status: !game.status })
      .eq('id', game.id);

    if (error) {
      setMessage('Status gagal diubah: ' + error.message);
      return;
    }

    setGames((previous) =>
      previous.map((item) =>
        item.id === game.id
          ? { ...item, status: !game.status }
          : item
      )
    );
  }

  async function deleteGame(game) {
    const confirmed = window.confirm(
      `Hapus game "${game.name}"?`
    );

    if (!confirmed) return;

    setMessage('');

    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', game.id);

    if (error) {
      setMessage('Game gagal dihapus: ' + error.message);
      return;
    }

    setGames((previous) =>
      previous.filter((item) => item.id !== game.id)
    );
    setMessage('Game berhasil dihapus.');
  }

  if (loading) {
    return <main className="admin-page"><p>Memeriksa akses admin...</p></main>;
  }

  if (!authorized) {
    return (
      <main className="admin-page">
        <button onClick={onBack}>← Kembali</button>
        <h1>Akses Admin</h1>
        <p>{message}</p>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <button onClick={onBack}>← Kembali ke SAVIXARA</button>

      <header className="admin-heading">
        <p className="admin-eyebrow">SAVIXARA CONTROL CENTER</p>
        <h1>Panel Admin</h1>
        <p>Kelola katalog game dari satu tempat.</p>
      </header>

      {message && (
        <p className="admin-message" role="status">
          {message}
        </p>
      )}

      <section className="admin-panel">
        <h2>Koneksi Provider</h2>
        <p>Periksa apakah SAVIXARA dapat menghubungi akun Melostore.</p>
        <button
          type="button"
          onClick={testMelostoreConnection}
          disabled={providerTesting}
        >
          {providerTesting ? 'Memeriksa koneksi...' : 'Tes Koneksi Melostore'}
        </button>
        {providerMessage && (
          <p className="admin-message" role="status">
            {providerMessage}
          </p>
        )}
      </section>

      <section className="admin-panel">
        <h2>Tambah Game</h2>

        <form onSubmit={saveGame} className="admin-form">
          <label>
            Nama game *
            <input
              name="name"
              value={form.name}
              onChange={updateForm}
              required
            />
          </label>

          <label>
            Publisher
            <input
              name="publisher"
              value={form.publisher}
              onChange={updateForm}
            />
          </label>

          <label>
            Kategori
            <input
              name="category"
              value={form.category}
              onChange={updateForm}
              placeholder="Contoh: MOBA"
            />
          </label>

          <label>
            URL gambar cover
            <input
              name="cover_url"
              type="url"
              value={form.cover_url}
              onChange={updateForm}
              placeholder="https://..."
            />
          </label>

          <label>
            URL ikon game
            <input
              name="icon_url"
              type="url"
              value={form.icon_url}
              onChange={updateForm}
              placeholder="https://..."
            />
          </label>

          <label>
            Deskripsi
            <textarea
              name="description"
              value={form.description}
              onChange={updateForm}
              rows={3}
            />
          </label>

          <label>
            Urutan tampil
            <input
              name="sort_order"
              type="number"
              value={form.sort_order}
              onChange={updateForm}
            />
          </label>

          <label className="admin-checkbox">
            <input
              name="status"
              type="checkbox"
              checked={form.status}
              onChange={updateForm}
            />
            Game aktif
          </label>

          <button type="submit" disabled={saving}>
            {saving ? 'Menyimpan...' : 'Tambah Game'}
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <h2>Daftar Game ({games.length})</h2>

        {games.map((game) => (
          <article className="admin-game" key={game.id}>
            <div>
              <strong>{game.name}</strong>
              <p>{game.category || 'Tanpa kategori'}</p>
              <small>
                Status: {game.status ? 'Aktif' : 'Nonaktif'}
              </small>
            </div>

            <div className="admin-game-actions">
              <button
                type="button"
                onClick={() => toggleGame(game)}
              >
                {game.status ? 'Nonaktifkan' : 'Aktifkan'}
              </button>

              <button
                type="button"
                onClick={() => deleteGame(game)}
              >
                Hapus
              </button>
            </div>
          </article>
        ))}
      </section>
      
      <section className="admin-panel">
        <h2>Pengaturan Harga Produk ({products.length})</h2>

        {productsLoading ? (
          <p>Memuat produk...</p>
        ) : products.length === 0 ? (
          <p>Belum ada produk di tabel products.</p>
        ) : (
          products.map((product) => (
            <article className="admin-game" key={product.id}>
              <div>
                <strong>{product.name || product.title || 'Produk'}</strong>
                <p>{product.category || 'Tanpa kategori'}</p>
              </div>

              <form
                className="admin-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  saveProduct(product);
                }}
              >
                <label>
                  Harga Modal (Rp)
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={product.cost_price ?? ''}
                    onChange={(event) =>
                      setProducts((previous) =>
                        previous.map((item) =>
                          item.id === product.id
                            ? { ...item, cost_price: event.target.value }
                            : item
                        )
                      )
                    }
                    required
                  />
                </label>

                <label>
                  Harga Jual (Rp)
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={product.selling_price ?? ''}
                    onChange={(event) =>
                      setProducts((previous) =>
                        previous.map((item) =>
                          item.id === product.id
                            ? { ...item, selling_price: event.target.value }
                            : item
                        )
                      )
                    }
                    required
                  />
                </label>

                <label>
                  Harga Promo (Rp, opsional)
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={product.promo_price ?? ''}
                    onChange={(event) =>
                      setProducts((previous) =>
                        previous.map((item) =>
                          item.id === product.id
                            ? { ...item, promo_price: event.target.value }
                            : item
                        )
                      )
                    }
                    placeholder="Kosongkan jika tidak promo"
                  />
                </label>

                <button
                  type="submit"
                  disabled={productSavingId === product.id}
                >
                  {productSavingId === product.id
                    ? 'Menyimpan...'
                    : 'Simpan Harga'}
                </button>
              </form>
            </article>
          ))
        )}
      </section>
                              
    </main>
  );
        }

    
