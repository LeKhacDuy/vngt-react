'use client';
import { useState } from 'react';

const SURVEY_URL = '/api/survey'; // Internal proxy → avoids cross-origin issues

type RV = 1 | 2 | 3 | 4 | 5 | null;

interface F {
  name: string; email: string; phone: string; date: string;
  vq: RV; ac: RV; s1c: string;
  sot: RV; fq: RV; sa: RV; sf: RV;
  gk: RV; ga: RV;
  os: RV; wr: boolean | null; wrt: boolean | null; sug: string;
}

const INIT: F = {
  name: '', email: '', phone: '', date: '',
  vq: null, ac: null, s1c: '',
  sot: null, fq: null, sa: null, sf: null,
  gk: null, ga: null,
  os: null, wr: null, wrt: null, sug: '',
};

const TRACKED: Array<keyof F> = [
  'vq', 'ac', 's1c', 'sot', 'fq', 'sa', 'sf', 'gk', 'ga', 'os', 'wr', 'wrt', 'sug',
];

const STAR_LABELS: Record<number, string> = {
  1: 'Rất không hài lòng',
  2: 'Không hài lòng',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Rất hài lòng',
};

function Stars({ value, onChange }: { value: RV; onChange: (v: RV) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? value ?? 0;
  return (
    <div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} type="button"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(n as RV)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 2,
              fontSize: 32, lineHeight: 1,
              color: active >= n ? '#D4A017' : '#CBD5E0',
              transform: active >= n ? 'scale(1.15)' : 'scale(1)',
              transition: 'all .15s',
              textShadow: active >= n ? '0 2px 8px rgba(212,160,23,0.4)' : 'none',
            }}
          >★</button>
        ))}
        {active > 0 && (
          <span style={{ fontSize: 13, color: '#D4A017', fontWeight: 600, marginLeft: 8 }}>
            {STAR_LABELS[active]}
          </span>
        )}
      </div>
    </div>
  );
}

function YN({ value, onChange, yes = 'Có', no = 'Chưa chắc' }: {
  value: boolean | null; onChange: (v: boolean) => void; yes?: string; no?: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
      {[{ v: true, label: `👍 ${yes}` }, { v: false, label: `🤔 ${no}` }].map(({ v, label }) => (
        <button key={String(v)} type="button" onClick={() => onChange(v)}
          style={{
            flex: 1, padding: '13px 20px', borderRadius: 8, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 600, transition: 'all .2s',
            border: `2px solid ${value === v ? (v ? '#00b894' : '#E53E3E') : '#E2E8F0'}`,
            background: value === v ? (v ? '#F0FFF8' : '#FFF5F5') : '#F8FAFC',
            color: value === v ? (v ? '#00b894' : '#E53E3E') : '#718096',
          }}
        >{label}</button>
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '48px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#E2E8F0)' }} />
      <span style={{ color: '#D4A017', fontSize: 18 }}>◆</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#E2E8F0,transparent)' }} />
    </div>
  );
}

function SectionBadge({ num, en, vi }: { num: string; en: string; vi: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#1A202C,#2D3748)',
          color: '#D4A017', fontSize: 12, fontWeight: 700, letterSpacing: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{num}</div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A202C', margin: 0, letterSpacing: 1 }}>{en}</h2>
          <p style={{ fontSize: 11, color: '#A0AEC0', letterSpacing: 2, margin: '2px 0 0', textTransform: 'uppercase' }}>{vi}</p>
        </div>
      </div>
      <div style={{ height: 2, background: 'linear-gradient(90deg,#D4A017,transparent)', borderRadius: 2, marginTop: 12 }} />
    </div>
  );
}

function Q({ num, label, children }: { num: number; label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32, padding: '20px 24px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #EDF2F7' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
        <span style={{
          minWidth: 24, height: 24, borderRadius: 6, background: '#1A202C',
          color: '#D4A017', fontSize: 11, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{num}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#2D3748', lineHeight: 1.5 }}>{label}</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#CBD5E0', flexShrink: 0 }}>Tuỳ chọn</span>
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px', borderRadius: 8,
  border: '2px solid #E2E8F0', background: '#fff',
  fontSize: 15, fontFamily: 'inherit', color: '#1A202C', outline: 'none',
  transition: 'border-color .2s', boxSizing: 'border-box',
};

const taStyle: React.CSSProperties = {
  ...inputStyle, resize: 'vertical', minHeight: 90, lineHeight: 1.6,
};

export default function SurveyPage() {
  const [f, setF] = useState<F>(INIT);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState('');

  const set = <K extends keyof F>(k: K, v: F[K]) => setF(p => ({ ...p, [k]: v }));

  const answered = TRACKED.filter(k => {
    const v = f[k];
    if (v === null || v === undefined) return false;
    if (typeof v === 'string') return v.trim().length > 0;
    return true;
  }).length;
  const pct = Math.round((answered / TRACKED.length) * 100);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 4500); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const p: Record<string, unknown> = { website: 'commercial' };
    if (f.name) p.customer_name = f.name;
    if (f.email) p.customer_email = f.email;
    if (f.phone) p.customer_phone = f.phone;
    if (f.date) p.travel_date = f.date;
    const s1: Record<string, unknown> = {};
    if (f.vq) s1.vehicle_quality = f.vq;
    if (f.ac) s1.accommodation = f.ac;
    if (f.s1c) s1.comment = f.s1c;
    if (Object.keys(s1).length) p.section_1 = s1;
    const s2: Record<string, unknown> = {};
    if (f.sot) s2.schedule_on_time = f.sot;
    if (f.fq) s2.food_quality = f.fq;
    if (f.sa) s2.staff_attitude = f.sa;
    if (f.sf) s2.safety = f.sf;
    if (Object.keys(s2).length) p.section_2 = s2;
    const s3: Record<string, unknown> = {};
    if (f.gk) s3.guide_knowledge = f.gk;
    if (f.ga) s3.guide_attitude = f.ga;
    if (Object.keys(s3).length) p.section_3 = s3;
    const s4: Record<string, unknown> = {};
    if (f.os) s4.overall_satisfaction = f.os;
    if (f.wr !== null) s4.would_recommend = f.wr;
    if (f.wrt !== null) s4.would_return = f.wrt;
    if (f.sug) s4.suggestion = f.sug;
    if (Object.keys(s4).length) p.section_4 = s4;
    try {
      const res = await fetch(SURVEY_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      });
      const d = await res.json();
      if (res.ok && d.status === 'success') {
        setDone(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showToast(d.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch {
      showToast('Không thể kết nối. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  /* SUCCESS */
  if (done) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0F2027,#203A43,#2C5364)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ textAlign: 'center', maxWidth: 480, animation: 'fadeIn .6s ease' }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Cảm ơn bạn!</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: 36 }}>
          Phản hồi của bạn đã được ghi nhận thành công.<br />
          Chúng tôi trân trọng từng ý kiến đóng góp!
        </p>
        <a href="/" style={{
          display: 'inline-block', padding: '14px 40px', borderRadius: 50,
          background: 'linear-gradient(135deg,#D4A017,#f0c040)', color: '#1A202C',
          fontWeight: 700, fontSize: 14, textDecoration: 'none', letterSpacing: 1,
        }}>🏠 Về trang chủ</a>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: "'Inter','Manrope',sans-serif" }}>
      <style>{`
        *{box-sizing:border-box}
        button:hover{opacity:.9}
        input:focus{border-color:#D4A017 !important;box-shadow:0 0 0 3px rgba(212,160,23,.15) !important}
        textarea:focus{border-color:#D4A017 !important;box-shadow:0 0 0 3px rgba(212,160,23,.15) !important}
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

        /* ── MOBILE ── */
        @media(max-width:640px){
          .sv-nav{padding:0 16px !important;height:56px !important}
          .sv-nav-label{display:none !important}
          .sv-hero{padding:40px 16px 52px !important}
          .sv-hero h1{font-size:26px !important}
          .sv-stats{gap:16px !important;flex-wrap:wrap !important}
          .sv-progress{padding:10px 16px !important}
          .sv-form-wrap{padding:28px 16px 80px !important}
          .sv-card{padding:20px 16px !important;border-radius:12px !important}
          .sv-info-grid{grid-template-columns:1fr !important}
          .sv-divider{margin:28px 0 !important}
          .sv-section-badge{margin-bottom:24px !important}
          .sv-section-badge h2{font-size:16px !important}
          .sv-q{padding:14px 14px !important;margin-bottom:20px !important}
          .sv-q-label{font-size:13px !important}
          .sv-stars button{font-size:28px !important;padding:4px !important}
          .sv-yn{flex-direction:column !important}
          .sv-yn button{padding:13px 16px !important;font-size:13px !important}
          .sv-submit-box{padding:32px 20px !important;border-radius:14px !important}
          .sv-submit-box h3{font-size:20px !important}
          .sv-submit-btn{padding:14px 32px !important;font-size:14px !important;width:100% !important}
          .sv-footer-bar{flex-direction:column !important;gap:6px !important;text-align:center !important}
        }
      `}</style>

      {/* TOP NAV — standalone, elegant */}
      <div className="sv-nav" style={{ background: '#1A202C', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4A017' }} />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>VNGROUP</span>
          <span style={{ color: '#D4A017', fontWeight: 300, fontSize: 16, letterSpacing: 1 }}>TOURIST</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="sv-nav-label" style={{ color: 'rgba(255,255,255,.4)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' }}>Khảo Sát Khách Hàng</span>
          <div style={{ padding: '6px 16px', borderRadius: 20, background: '#D4A017', color: '#1A202C', fontSize: 12, fontWeight: 700 }}>
            {pct}%
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="sv-hero" style={{ background: 'linear-gradient(135deg,#1A202C 0%,#2D3748 100%)', padding: '64px 32px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%,rgba(212,160,23,.12),transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: 4, color: '#D4A017', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Customer Experience Survey</p>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            Khảo sát trải nghiệm<br />
            <span style={{ color: '#D4A017' }}>chuyến đi của bạn</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', lineHeight: 1.8, marginBottom: 36 }}>
            Mỗi phản hồi của bạn giúp chúng tôi hoàn thiện hơn trong từng hành trình tiếp theo. Tất cả câu hỏi đều tùy chọn.
          </p>
          {/* stats */}
          <div className="sv-stats" style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[['⏱', '3–5 phút'], ['✅', '13 câu hỏi'], ['🔒', 'Bảo mật']].map(([ic, lb]) => (
              <div key={lb} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, fontWeight: 500 }}>{lb}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="sv-progress" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '14px 32px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, height: 6, background: '#EDF2F7', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#D4A017,#f0c040)', borderRadius: 99, transition: 'width .5s ease' }} />
          </div>
          <span style={{ fontSize: 12, color: '#718096', fontWeight: 600, whiteSpace: 'nowrap' }}>{answered}/{TRACKED.length} câu đã trả lời</span>
        </div>
      </div>

      {/* FORM */}
      <div className="sv-form-wrap" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px 100px' }}>
        <form onSubmit={submit}>

          {/* INFO */}
          <div className="sv-card" style={{ background: '#fff', borderRadius: 16, padding: '32px 32px', marginBottom: 24, boxShadow: '0 2px 16px rgba(0,0,0,.06)', border: '1px solid #EDF2F7', animation: 'fadeIn .5s ease' }}>
            <SectionBadge num="00" en="PERSONAL INFORMATION" vi="Thông tin cá nhân · Tùy chọn" />
            <div className="sv-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { k: 'name', label: 'Họ và tên', type: 'text', ph: 'Nguyễn Văn A' },
                { k: 'phone', label: 'Số điện thoại', type: 'tel', ph: '0901 234 567' },
                { k: 'email', label: 'Email', type: 'email', ph: 'email@gmail.com' },
                { k: 'date', label: 'Ngày đi tour', type: 'date', ph: '' },
              ].map(({ k, label, type, ph }) => (
                <div key={k}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4A5568', marginBottom: 8, letterSpacing: .5, textTransform: 'uppercase' }}>{label}</label>
                  <input type={type} value={f[k as keyof F] as string}
                    onChange={e => set(k as keyof F, e.target.value as never)}
                    placeholder={ph} style={inputStyle} />
                </div>
              ))}
            </div>
          </div>

          <div className="sv-divider" style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '48px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#E2E8F0)' }} />
            <span style={{ color: '#D4A017', fontSize: 18 }}>◆</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#E2E8F0,transparent)' }} />
          </div>
          <div className="sv-card" style={{ background: '#fff', borderRadius: 16, padding: '32px 32px', marginBottom: 24, boxShadow: '0 2px 16px rgba(0,0,0,.06)', border: '1px solid #EDF2F7' }}>
            <SectionBadge num="01" en="FACILITIES & VEHICLE" vi="Cơ sở vật chất & Phương tiện" />
            <Q num={1} label="Phương tiện di chuyển — Transportation Quality">
              <Stars value={f.vq} onChange={v => set('vq', v)} />
            </Q>
            <Q num={2} label="Nơi lưu trú / Điểm dừng chân — Accommodation">
              <Stars value={f.ac} onChange={v => set('ac', v)} />
            </Q>
            <Q num={3} label="Góp ý về cơ sở vật chất — Additional Comments">
              <textarea value={f.s1c} onChange={e => set('s1c', e.target.value)}
                placeholder="Chia sẻ thêm cảm nhận..." style={taStyle} />
            </Q>
          </div>

          <div className="sv-divider" style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '48px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#E2E8F0)' }} />
            <span style={{ color: '#D4A017', fontSize: 18 }}>◆</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#E2E8F0,transparent)' }} />
          </div>
          <div className="sv-card" style={{ background: '#fff', borderRadius: 16, padding: '32px 32px', marginBottom: 24, boxShadow: '0 2px 16px rgba(0,0,0,.06)', border: '1px solid #EDF2F7' }}>
            <SectionBadge num="02" en="STAFF & OPERATION" vi="Nhân sự & Vận hành" />
            {([
              ['sot', 4, 'Đúng giờ lịch trình — Schedule Punctuality'],
              ['fq', 5, 'Chất lượng ăn uống — Food & Dining Quality'],
              ['sa', 6, 'Thái độ nhân viên — Staff Attitude'],
              ['sf', 7, 'Mức độ an toàn — Safety Standards'],
            ] as [keyof F, number, string][]).map(([k, n, label]) => (
              <Q key={k} num={n} label={label}>
                <Stars value={f[k] as RV} onChange={v => set(k, v as never)} />
              </Q>
            ))}
          </div>

          <div className="sv-divider" style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '48px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#E2E8F0)' }} />
            <span style={{ color: '#D4A017', fontSize: 18 }}>◆</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#E2E8F0,transparent)' }} />
          </div>
          <div className="sv-card" style={{ background: '#fff', borderRadius: 16, padding: '32px 32px', marginBottom: 24, boxShadow: '0 2px 16px rgba(0,0,0,.06)', border: '1px solid #EDF2F7' }}>
            <SectionBadge num="03" en="TOUR GUIDE" vi="Hướng dẫn viên" />
            <Q num={8} label="Kiến thức & Nội dung thuyết minh — Knowledge & Commentary">
              <Stars value={f.gk} onChange={v => set('gk', v)} />
            </Q>
            <Q num={9} label="Thái độ & Sự nhiệt tình — Attitude & Enthusiasm">
              <Stars value={f.ga} onChange={v => set('ga', v)} />
            </Q>
          </div>

          <div className="sv-divider" style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '48px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#E2E8F0)' }} />
            <span style={{ color: '#D4A017', fontSize: 18 }}>◆</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#E2E8F0,transparent)' }} />
          </div>
          <div className="sv-card" style={{ background: '#fff', borderRadius: 16, padding: '32px 32px', marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,.06)', border: '1px solid #EDF2F7' }}>
            <SectionBadge num="04" en="RECOMMENDATION" vi="Đề xuất & Tổng thể" />
            <Q num={10} label="Mức độ hài lòng tổng thể — Overall Satisfaction">
              <Stars value={f.os} onChange={v => set('os', v)} />
            </Q>
            <Q num={11} label="Bạn có giới thiệu VNGROUP TOURIST cho bạn bè không?">
              <YN value={f.wr} onChange={v => set('wr', v)} yes="Có, chắc chắn rồi!" no="Chưa chắc" />
            </Q>
            <Q num={12} label="Bạn có muốn đặt tour cùng chúng tôi lần sau không?">
              <YN value={f.wrt} onChange={v => set('wrt', v)} yes="Có, nhất định!" no="Chưa chắc" />
            </Q>
            <Q num={13} label="Góp ý / Đề xuất cải thiện — Suggestions for Improvement">
              <textarea value={f.sug} onChange={e => set('sug', e.target.value)}
                placeholder="Chia sẻ những điều bạn muốn chúng tôi cải thiện hoặc bổ sung..." style={{ ...taStyle, minHeight: 120 }} />
            </Q>
          </div>

          {/* SUBMIT */}
          <div style={{ background: 'linear-gradient(135deg,#1A202C,#2D3748)', borderRadius: 20, padding: '48px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%,rgba(212,160,23,.12),transparent 60%)', pointerEvents: 'none' }} />
            <h3 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 8, position: 'relative' }}>Hoàn tất khảo sát 🎊</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginBottom: 32, position: 'relative' }}>Cảm ơn bạn đã dành thời gian! Mỗi phản hồi đều rất quý giá.</p>
            <button className="sv-submit-btn" type="submit" disabled={loading}
              style={{
                padding: '16px 56px', borderRadius: 50, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? '#555' : 'linear-gradient(135deg,#D4A017,#f0c040)',
                color: '#1A202C', fontSize: 15, fontWeight: 800, letterSpacing: .5,
                fontFamily: 'inherit', transition: 'all .3s', position: 'relative',
                boxShadow: loading ? 'none' : '0 8px 32px rgba(212,160,23,.4)',
              }}>
              {loading ? '⏳ Đang gửi...' : '🚀 Gửi phản hồi ngay'}
            </button>
          </div>

        </form>

        {/* FOOTER */}
        <div className="sv-footer-bar" style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontWeight: 800, color: '#1A202C', fontSize: 14 }}>VNGROUP TOURIST</p>
            <p style={{ color: '#A0AEC0', fontSize: 12, marginTop: 2 }}>93/8 Phạm Văn Hai, Tân Bình, TP.HCM</p>
          </div>
          <p style={{ color: '#A0AEC0', fontSize: 12 }}>info@vngrouptourist.com</p>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', background: '#E53E3E', color: '#fff', padding: '14px 28px', borderRadius: 50, fontSize: 13, fontWeight: 600, zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,.2)' }}>
          ❌ {toast}
        </div>
      )}
    </div>
  );
}
