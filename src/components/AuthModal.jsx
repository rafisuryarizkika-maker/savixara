import React, { useState } from 'react';
import { supabase } from '../supabase';
import {
  X,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export default function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [mfaStep, setMfaStep] = useState('');
  const [factorId, setFactorId] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');

  async function finishLogin() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      throw error || new Error('Sesi login tidak valid.');
    }
    setMessage('Login berhasil.');
    onSuccess?.(data.user);
    onClose?.();
  }

  async function startAdminMfa() {
    const { data: adminResult, error: adminError } =
      await supabase.rpc('is_admin');

    if (adminError) {
      throw new Error('Tidak dapat memeriksa status admin. Coba lagi.');
    }

    if (adminResult !== true) {
      await finishLogin();
      return;
    }

    const { data: assurance, error: assuranceError } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (assuranceError) throw assuranceError;
    if (assurance?.currentLevel === 'aal2') {
      await finishLogin();
      return;
    }

    const { data: factorsData, error: factorsError } =
      await supabase.auth.mfa.listFactors();
    if (factorsError) throw factorsError;

    const verifiedFactor = (factorsData?.totp || []).find(
      (factor) => factor.status === 'verified'
    );

    if (verifiedFactor) {
      const { data: challenge, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId: verifiedFactor.id });
      if (challengeError) throw challengeError;

      setFactorId(verifiedFactor.id);
      setChallengeId(challenge.id);
      setMfaStep('verify');
      setMessage('Akses admin memerlukan kode dari aplikasi autentikator.');
      return;
    }

    const unverifiedFactors = (factorsData?.all || []).filter(
      (factor) =>
        factor.factor_type === 'totp' && factor.status !== 'verified'
    );

    for (const factor of unverifiedFactors) {
      const { error: unenrollError } = await supabase.auth.mfa.unenroll({
        factorId: factor.id,
      });
      if (unenrollError) {
        throw new Error(
          'Pendaftaran MFA sebelumnya belum selesai. Gagal membersihkan ' +
          'faktor lama; hubungi administrator.'
        );
      }
    }

    const { data: enrollment, error: enrollmentError } =
      await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'SAVIXARA Admin Authenticator',
      });
    if (enrollmentError) throw enrollmentError;

    setFactorId(enrollment.id);
    setQrCode(enrollment.totp?.qr_code || '');
    setSecret(enrollment.totp?.secret || '');
    setMfaStep('enroll');
    setMessage(
      'Admin wajib menyiapkan MFA. Pindai QR menggunakan aplikasi ' +
      'autentikator, lalu masukkan kode 6 digit.'
    );
  }

  async function verifyMfa() {
    if (!/^\d{6}$/.test(mfaCode)) {
      setMessage('Masukkan kode autentikator yang terdiri dari 6 digit.');
      return;
    }

    let currentChallengeId = challengeId;
    if (mfaStep === 'enroll') {
      const { data: challenge, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId });
      if (challengeError) throw challengeError;
      currentChallengeId = challenge.id;
    }

    const { error: verifyError } =
      await supabase.auth.mfa.challengeAndVerify({
        factorId,
        challengeId: currentChallengeId,
        code: mfaCode,
      });
    if (verifyError) {
      throw new Error(
        'Kode MFA tidak valid atau kedaluwarsa. Periksa kode dan coba lagi.'
      );
    }

    const { data: assurance, error: assuranceError } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (assuranceError) throw assuranceError;
    if (assurance?.currentLevel !== 'aal2') {
      throw new Error('Verifikasi belum mencapai AAL2. Coba lagi.');
    }

    setMfaStep('');
    setMfaCode('');
    setChallengeId('');
    setQrCode('');
    setSecret('');
    await finishLogin();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (mfaStep) {
      setLoading(true);
      try {
        await verifyMfa();
      } catch (error) {
        setMessage(error?.message || 'Verifikasi MFA gagal.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!email.trim() || !password) {
      setMessage('Email dan kata sandi wajib diisi.');
      return;
    }
    if (mode === 'register' && password.length < 8) {
      setMessage('Kata sandi minimal 8 karakter.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        await startAdminMfa();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo:
              `${window.location.origin}${import.meta.env.BASE_URL}`,
          },
        });
        if (error) throw error;

        if (data.session && data.user) {
          setMessage('Pendaftaran berhasil.');
          onSuccess?.(data.user);
          onClose?.();
        } else {
          setMessage(
            'Pendaftaran berhasil. Periksa email untuk verifikasi akun.'
          );
        }
      }
    } catch (error) {
      setMessage(error?.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setMode((previous) => previous === 'login' ? 'register' : 'login');
    setMessage('');
    setPassword('');
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Login SAVIXARA"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="auth-close"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X size={22} />
        </button>

        <div className="auth-brand">SAVIXARA</div>
        <h2>
          {mfaStep
            ? 'Verifikasi Keamanan Admin'
            : mode === 'login'
              ? 'Selamat datang kembali!'
              : 'Buat akun baru'}
        </h2>
        <p className="auth-description">
          {mfaStep
            ? 'Selesaikan verifikasi dua langkah untuk melanjutkan.'
            : mode === 'login'
              ? 'Login untuk melanjutkan pengalaman gaming kamu.'
              : 'Daftar untuk mulai menggunakan akun SAVIXARA.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!mfaStep ? (
            <>
              <label htmlFor="auth-email">Email</label>
              <div className="auth-input-wrap">
                <Mail size={18} />
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <label htmlFor="auth-password">Kata sandi</label>
              <div className="auth-input-wrap">
                <LockKeyhole size={18} />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={mode === 'register' ? 8 : 1}
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <ShieldCheck size={18} />{' '}
                {mfaStep === 'enroll'
                  ? 'Pindai QR dengan aplikasi autentikator.'
                  : 'Masukkan kode dari aplikasi autentikator.'}
              </p>

              {mfaStep === 'enroll' && qrCode && (
                <img
                  src={qrCode}
                  alt="QR code pengaturan MFA"
                  style={{
                    display: 'block',
                    maxWidth: '220px',
                    width: '100%',
                    margin: '12px auto',
                  }}
                />
              )}

              {mfaStep === 'enroll' && secret && (
                <p style={{ overflowWrap: 'anywhere' }}>
                  Jika QR tidak bisa dipindai, masukkan kunci manual:
                  <strong> {secret}</strong>
                </p>
              )}

              <label htmlFor="auth-mfa-code">Kode autentikator (6 digit)</label>
              <input
                id="auth-mfa-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={mfaCode}
                onChange={(event) =>
                  setMfaCode(event.target.value.replace(/\D/g, '').slice(0, 6))
                }
                required
              />
            </>
          )}

          {message && (
            <p className="auth-message" role="status">{message}</p>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? 'Memproses...'
              : mfaStep
                ? 'Verifikasi dan lanjutkan'
                : mode === 'login'
                  ? 'Masuk'
                  : 'Daftar sekarang'}
          </button>
        </form>

        {!mfaStep && (
          <p className="auth-switch">
            {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
            <button type="button" onClick={switchMode} disabled={loading}>
              {mode === 'login' ? 'Daftar' : 'Login'}
            </button>
          </p>
        )}
      </section>
    </div>
  );
  }
      
