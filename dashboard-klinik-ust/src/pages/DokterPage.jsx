import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pasienDummy, riwayatKunjunganDummy } from "../data/pasien";

/* ──────────────────────────── ICONS ──────────────────────────────────── */
const IcLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);
const IcUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
  </svg>
);
const IcClipboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  </svg>
);
const IcPill = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25M2.25 9H21.75M2.25 9a.75.75 0 00-.75.75v.75h21V9.75A.75.75 0 0021.75 9M2.25 9l2.25-6h15l2.25 6" />
  </svg>
);
const IcPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);
const IcCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);
const IcHistory = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IcPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const IcTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);
const IcCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

/* ──────────────────────────── STATUS BADGE ───────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = status === "Dipanggil"
    ? "bg-blue-100 text-blue-700"
    : "bg-amber-100 text-amber-700";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s}`}>{status}</span>
  );
};

/* ──────────────────────────── SIDEBAR ────────────────────────────────── */
const Sidebar = ({ user, onLogout }) => (
  <aside className="w-56 bg-gradient-to-b from-slate-900 to-blue-950 flex flex-col flex-shrink-0 shadow-xl">
    {/* Brand */}
    <div className="px-5 py-5 border-b border-white/10">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <rect x="9" y="2" width="6" height="20" rx="1" fill="white" />
            <rect x="2" y="9" width="20" height="6" rx="1" fill="white" fillOpacity="0.7" />
          </svg>
        </div>
        <div>
          <p className="text-white font-bold text-sm">Klinik UST</p>
          <p className="text-blue-400 text-xs">Sistem Informasi</p>
        </div>
      </div>
    </div>
    {/* User */}
    <div className="px-4 py-4 mx-3 mt-4 bg-white/5 rounded-xl border border-white/10">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {user.username?.[0]?.toUpperCase() ?? "D"}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">{user.username}</p>
          <p className="text-emerald-300 text-xs">Dokter</p>
        </div>
      </div>
    </div>
    {/* Nav */}
    <nav className="flex-1 px-3 mt-5 space-y-1">
      <p className="text-blue-400/60 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Menu</p>
      <span className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-600/30 text-white text-sm font-medium border border-emerald-500/30">
        <IcClipboard />
        Pemeriksaan
      </span>
    </nav>
    {/* Logout */}
    <div className="p-4 border-t border-white/10">
      <button id="btn-logout-dokter" onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 text-sm font-medium transition-all">
        <IcLogout />Keluar
      </button>
    </div>
  </aside>
);

/* ──────────────────────────── PATIENT LIST ITEM ─────────────────────── */
const PatientItem = ({ p, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3.5 border-b border-slate-100 transition-colors ${
      isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-slate-50 border-l-4 border-l-transparent"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
        p.jenis_kelamin === "Perempuan" ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
      }`}>
        {p.nomor_antrian}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold truncate ${isSelected ? "text-blue-700" : "text-slate-700"}`}>
          {p.nama}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-400">{p.jam_daftar}</span>
          <StatusBadge status={p.status_antrian} />
        </div>
      </div>
    </div>
  </button>
);

/* ──────────────────────────── RIWAYAT KUNJUNGAN ─────────────────────── */
const RiwayatPanel = ({ pasienId }) => {
  const riwayat = riwayatKunjunganDummy[pasienId] ?? [];
  if (riwayat.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <IcHistory />
        <p className="mt-2 text-sm">Belum ada riwayat kunjungan</p>
      </div>
    );
  }
  return (
    <div className="space-y-4 p-5">
      {riwayat.map((r, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              {new Date(r.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium text-slate-500">Keluhan:</span> <span className="text-slate-700">{r.keluhan}</span></div>
            <div><span className="font-medium text-slate-500">Diagnosis:</span> <span className="text-slate-700">{r.diagnosis}</span></div>
            {r.catatan && <div><span className="font-medium text-slate-500">Catatan:</span> <span className="text-slate-700">{r.catatan}</span></div>}
            {r.resep?.length > 0 && (
              <div>
                <span className="font-medium text-slate-500">Resep:</span>
                <ul className="mt-1 space-y-1 pl-3">
                  {r.resep.map((ob, j) => (
                    <li key={j} className="text-slate-700">
                      <span className="font-medium text-emerald-700">{ob.nama_obat}</span>
                      <span className="text-slate-400"> — {ob.dosis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ──────────────────────────── MAIN PAGE ─────────────────────────────── */
export default function DokterPage() {
  const navigate = useNavigate();
  const userRaw = localStorage.getItem("klinik_user");
  const user    = userRaw ? JSON.parse(userRaw) : { role: "Dokter", username: "dokter" };

  // Filter hanya pasien dengan status "Menunggu" atau "Dipanggil"
  const antrian = pasienDummy.filter(p => p.status_antrian === "Menunggu" || p.status_antrian === "Dipanggil");

  // Hitung umur dari tanggal lahir
  const hitungUmur = (tgl) => Math.floor((Date.now() - new Date(tgl).getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const [selectedId, setSelectedId]     = useState(antrian[0]?.id ?? null);
  const [activeTab, setActiveTab]       = useState("periksa"); // "periksa" | "resep" | "riwayat"
  const [saved, setSaved]               = useState({});         // { [id]: true } jika sudah disimpan
  const [examData, setExamData]         = useState({});         // { [id]: { keluhan, diagnosis, catatan } }
  const [resepData, setResepData]       = useState({});         // { [id]: [{nama_obat, dosis}] }
  const [obatForm, setObatForm]         = useState({ nama_obat: "", dosis: "" });

  const pasien = antrian.find(p => p.id === selectedId) ?? null;

  // Helpers
  const getExam  = (id) => examData[id]  ?? { keluhan: "", diagnosis: "", catatan: "" };
  const getResep = (id) => resepData[id] ?? [];

  const updateExam = (field, val) =>
    setExamData(prev => ({ ...prev, [selectedId]: { ...getExam(selectedId), [field]: val } }));

  const handleSaveExam = () => {
    setSaved(prev => ({ ...prev, [selectedId]: true }));
    setActiveTab("resep");
  };

  const handleAddObat = () => {
    if (!obatForm.nama_obat.trim()) return;
    setResepData(prev => ({
      ...prev,
      [selectedId]: [...getResep(selectedId), { ...obatForm }],
    }));
    setObatForm({ nama_obat: "", dosis: "" });
  };

  const handleRemoveObat = (idx) =>
    setResepData(prev => ({
      ...prev,
      [selectedId]: getResep(selectedId).filter((_, i) => i !== idx),
    }));

  const handleLogout = () => {
    localStorage.removeItem("klinik_user");
    navigate("/");
  };

  const exam  = selectedId ? getExam(selectedId)  : null;
  const resep = selectedId ? getResep(selectedId) : [];
  const isSaved = saved[selectedId] ?? false;

  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  /* Tab button helper */
  const TabBtn = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
        activeTab === id
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-slate-500 hover:text-slate-700"
      }`}
    >
      {icon}{label}
    </button>
  );

  /* Textarea helper */
  const Textarea = ({ label, field, rows = 3, disabled = false }) => (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
      <textarea
        rows={rows}
        disabled={disabled}
        value={exam?.[field] ?? ""}
        onChange={e => updateExam(field, e.target.value)}
        placeholder={disabled ? "—" : `Masukkan ${label.toLowerCase()}...`}
        className={`w-full px-4 py-3 border-2 rounded-xl text-sm text-slate-700 placeholder-slate-300 resize-none focus:outline-none transition-all ${
          disabled
            ? "bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed"
            : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white"
        }`}
      />
    </div>
  );

  return (
    <div className="h-screen flex bg-slate-100 overflow-hidden">
      <Sidebar user={user} onLogout={handleLogout} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div>
            <h1 className="font-bold text-slate-700 text-lg">Dashboard Dokter</h1>
            <p className="text-slate-400 text-xs capitalize">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-xs font-bold border border-blue-200">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {antrian.filter(p => p.status_antrian === "Dipanggil").length} Dipanggil
            </span>
            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-2 rounded-xl text-xs font-bold border border-amber-200">
              <span className="w-2 h-2 bg-amber-400 rounded-full" />
              {antrian.filter(p => p.status_antrian === "Menunggu").length} Menunggu
            </span>
            <button id="btn-logout-dokter-top" onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-red-100 text-red-500 hover:bg-red-50 text-sm font-semibold transition-all duration-200">
              <IcLogout />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Two-column layout */}
        <div className="flex-1 flex overflow-hidden">

          {/* ── LEFT: Daftar Antrian ───────────────────────────────── */}
          <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
            <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Antrian Aktif</p>
              <p className="text-xs text-slate-400 mt-0.5">{antrian.length} pasien</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {antrian.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
                  <IcUser />
                  <p className="mt-2 text-sm">Tidak ada pasien aktif</p>
                </div>
              ) : (
                antrian.map(p => (
                  <PatientItem
                    key={p.id}
                    p={p}
                    isSelected={p.id === selectedId}
                    onClick={() => { setSelectedId(p.id); setActiveTab("periksa"); }}
                  />
                ))
              )}
            </div>
          </aside>

          {/* ── RIGHT: Detail Pemeriksaan ─────────────────────────── */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {!pasien ? (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <IcClipboard />
                  <p className="mt-2 text-sm">Pilih pasien dari daftar antrian</p>
                </div>
              </div>
            ) : (
              <>
                {/* Patient header */}
                <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                      pasien.jenis_kelamin === "Perempuan" ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {pasien.nama.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-bold text-slate-800 text-base">{pasien.nama}</h2>
                        <StatusBadge status={pasien.status_antrian} />
                        {isSaved && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <IcCheck />Tersimpan
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <IcUser />
                          {pasien.jenis_kelamin} · {hitungUmur(pasien.tanggal_lahir)} thn
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <IcCalendar />
                          {new Date(pasien.tanggal_lahir).toLocaleDateString("id-ID")}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <IcPhone />
                          {pasien.no_kontak}
                        </span>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg font-medium">
                          Antrian #{pasien.nomor_antrian} · {pasien.jam_daftar}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-0 mt-4 border-b border-slate-100 -mb-4">
                    <TabBtn id="periksa" label="Pemeriksaan" icon={<IcClipboard />} />
                    <TabBtn id="resep"   label={`Resep (${resep.length})`} icon={<IcPill />} />
                    <TabBtn id="riwayat" label={`Riwayat (${(riwayatKunjunganDummy[selectedId] ?? []).length})`} icon={<IcHistory />} />
                  </div>
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-y-auto bg-slate-50">

                  {/* ── TAB: Pemeriksaan ─────────────────────────── */}
                  {activeTab === "periksa" && (
                    <div className="p-6 space-y-5 max-w-2xl">
                      {/* Info Pasien (read-only) */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-600 mb-4">Informasi Pasien</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "Nama Lengkap",  value: pasien.nama },
                            { label: "Jenis Kelamin", value: pasien.jenis_kelamin },
                            { label: "Tanggal Lahir", value: new Date(pasien.tanggal_lahir).toLocaleDateString("id-ID") },
                            { label: "Usia",          value: `${hitungUmur(pasien.tanggal_lahir)} tahun` },
                            { label: "No. Kontak",    value: pasien.no_kontak },
                            { label: "No. Antrian",   value: `#${pasien.nomor_antrian} (${pasien.jam_daftar})` },
                          ].map(({ label, value }) => (
                            <div key={label} className="bg-slate-50 rounded-xl px-3.5 py-2.5">
                              <p className="text-xs text-slate-400 font-medium">{label}</p>
                              <p className="text-sm text-slate-700 font-semibold mt-0.5">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Input Pemeriksaan */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-600">Hasil Pemeriksaan</h3>
                      <Textarea label="Keluhan Pasien"       field="keluhan"   rows={3} disabled={isSaved} />
                      <Textarea label="Diagnosis"            field="diagnosis" rows={3} disabled={isSaved} />
                      <Textarea label="Catatan Tambahan"     field="catatan"   rows={2} disabled={isSaved} />

                      {!isSaved ? (
                        <button
                          id="btn-simpan-periksa"
                          onClick={handleSaveExam}
                          disabled={!exam?.keluhan?.trim() || !exam?.diagnosis?.trim()}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 ${
                            !exam?.keluhan?.trim() || !exam?.diagnosis?.trim()
                              ? "bg-slate-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:-translate-y-0.5"
                          }`}
                        >
                          <IcCheck />
                          Simpan Pemeriksaan
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                            <IcCheck />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-emerald-700">Pemeriksaan telah disimpan</p>
                            <p className="text-xs text-emerald-500">Lanjutkan ke tab Resep untuk menulis resep</p>
                          </div>
                          <button onClick={() => setSaved(p => ({ ...p, [selectedId]: false }))}
                            className="text-xs font-semibold text-blue-500 hover:text-blue-700 underline">Edit</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── TAB: Resep ───────────────────────────────── */}
                  {activeTab === "resep" && (
                    <div className="p-6 max-w-2xl space-y-5">
                      {!isSaved && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-700 text-sm">
                          Simpan hasil pemeriksaan terlebih dahulu sebelum menulis resep.
                        </div>
                      )}

                      {/* Form tambah obat */}
                      <div className={`bg-white rounded-xl border border-slate-200 p-5 space-y-4 ${!isSaved ? "opacity-50 pointer-events-none" : ""}`}>
                        <h3 className="font-semibold text-slate-700 text-sm">Tambah Obat ke Resep</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Nama Obat</label>
                            <input
                              id="input-nama-obat"
                              type="text"
                              value={obatForm.nama_obat}
                              onChange={e => setObatForm(f => ({ ...f, nama_obat: e.target.value }))}
                              placeholder="Paracetamol 500mg"
                              className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Dosis / Aturan Pakai</label>
                            <input
                              id="input-dosis-obat"
                              type="text"
                              value={obatForm.dosis}
                              onChange={e => setObatForm(f => ({ ...f, dosis: e.target.value }))}
                              placeholder="3x1 setelah makan"
                              className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                          </div>
                        </div>
                        <button
                          id="btn-tambah-obat"
                          onClick={handleAddObat}
                          disabled={!obatForm.nama_obat.trim()}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            !obatForm.nama_obat.trim()
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md"
                          }`}
                        >
                          <IcPlus />Tambah Obat ke Resep
                        </button>
                      </div>

                      {/* Daftar resep */}
                      {resep.length > 0 && (
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Daftar Resep — {resep.length} Obat
                            </p>
                          </div>
                          <ul className="divide-y divide-slate-100">
                            {resep.map((ob, i) => (
                              <li key={i} className="flex items-center justify-between px-5 py-3.5">
                                <div>
                                  <p className="text-sm font-semibold text-slate-700">{ob.nama_obat}</p>
                                  <p className="text-xs text-slate-400 mt-0.5">{ob.dosis || <em>Tanpa aturan pakai</em>}</p>
                                </div>
                                <button onClick={() => handleRemoveObat(i)}
                                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                                  <IcTrash />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {resep.length === 0 && isSaved && (
                        <p className="text-sm text-slate-400 text-center py-6">Belum ada obat ditambahkan ke resep.</p>
                      )}
                    </div>
                  )}

                  {/* ── TAB: Riwayat ─────────────────────────────── */}
                  {activeTab === "riwayat" && <RiwayatPanel pasienId={selectedId} />}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
