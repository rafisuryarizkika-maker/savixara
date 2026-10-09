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
      window.location.href =
        `${window.location.pathname}#help`;
    }

    return;
  }

  if (onNotify) {
    onNotify(`${item} akan segera tersedia.`);
  }
};
export default Footer;
