import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

type Phase = { label: string; duration: number };

const PHASES: Phase[] = [
  { label: "Conectando a los servidores de rastreo…", duration: 6000 },
  { label: "Cruzando registros públicos y redes sociales…", duration: 10000 },
  { label: "Escaneando apps de citas (Tinder, Bumble, Hinge, Badoo)…", duration: 14000 },
  { label: "Identificando cuentas ocultas y perfiles falsos…", duration: 10000 },
  { label: "Analizando últimos inicios de sesión y fotos de perfil…", duration: 8000 },
  { label: "Compilando el informe final…", duration: 7000 },
];

const TOTAL_MS = PHASES.reduce((a, p) => a + p.duration, 0);

function Index() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<"form" | "loading" | "reveal">("form");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    console.log('onFile called', { files: e.target.files });
    if (!f) return;
    try {
      // Prefer object URL for immediate preview
      const objectUrl = URL.createObjectURL(f);
      setFoto(objectUrl);
      // Also read as data URL in background (optional)
      const r = new FileReader();
      r.onload = () => {
        console.log('FileReader loaded', { resultLength: (r.result as string)?.length });
      };
      r.readAsDataURL(f);
    } catch (err) {
      console.error('Error reading file', err);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;
    setStage("loading");
    setPhaseIdx(0);
    setProgress(0);
  };

  useEffect(() => {
    if (stage !== "loading") return;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / TOTAL_MS) * 100);
      setProgress(pct);
      let acc = 0;
      for (let i = 0; i < PHASES.length; i++) {
        acc += PHASES[i].duration;
        if (elapsed < acc) {
          setPhaseIdx(i);
          break;
        }
      }
      if (elapsed >= TOTAL_MS) {
        clearInterval(tick);
        setStage("reveal");
      }
    }, 200);
    return () => clearInterval(tick);
  }, [stage]);

  const reset = () => {
    setStage("form");
    setPhaseIdx(0);
    setProgress(0);
    // Revoke any object URLs to avoid memory leaks
    setFoto(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1420", color: "#f2f4f7", fontFamily: "Arial, Helvetica, sans-serif", overflowX: "hidden" }}>
      {/* Nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#0f1420", borderBottom: "1px solid #232a3a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <div style={{ width: 32, height: 32, background: "#3ddc84", color: "#0f1420", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>D</div>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>
              DISCOVER <span style={{ color: "#3ddc84" }}>AI</span>
            </span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
            <a
              href="#como-funciona"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ color: "#a7b0c0", padding: "8px 12px", textDecoration: "none" }}
            >
              Cómo funciona
            </a>
            <a
              href="#comecar"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("comecar")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{ background: "#3ddc84", color: "#0f1420", padding: "8px 14px", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}
            >
              Comenzar ahora
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px 48px", textAlign: "center" }}>
        {stage === "form" && (
          <>
        <div style={{ display: "inline-block", padding: "6px 12px", border: "1px solid #232a3a", borderRadius: 999, fontSize: 12, color: "#a7b0c0", marginBottom: 20 }}>
          🟢 Rastreo en tiempo real
        </div>

        <h1 style={{ fontSize: 34, lineHeight: 1.15, margin: 0, fontWeight: 800 }}>
          ¿Sobre Quién <span style={{ color: "#3ddc84" }}>Quieres Saber?</span>
        </h1>

        <p style={{ marginTop: 18, color: "#a7b0c0", fontSize: 15, lineHeight: 1.55, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          Dinos el nombre y apellido, nacionalidad y ciudad de quien quieres rastrear —
          nosotros nos encargamos de informarte todo lo que hace: las apps de citas
          que usa, cuentas falsas si las hubiera y las últimas veces que estuvo en línea.
        </p>

        <form
          onSubmit={onSubmit}
          id="comecar"
          style={{ marginTop: 28, background: "#151b28", border: "1px solid #232a3a", borderRadius: 14, padding: 16, textAlign: "left", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
            <label
              htmlFor="file-input"
              style={{
                width: 112,
                height: 112,
                border: foto ? "2px solid #232a3a" : "2px dashed #3ddc84",
                borderRadius: 12,
                background: "#0f1420",
                color: "#a7b0c0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {foto ? (
                <>
                  <img src={foto} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setFoto(null);
                    }}
                    style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: 999, background: "rgba(0,0,0,0.7)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, zIndex: 3, pointerEvents: 'auto' }}
                  >
                    ✕
                  </span>
                </>
              ) : (
                <div style={{ textAlign: "center", fontSize: 11 }}>
                  📷<br />Foto del<br />objetivo *
                </div>
              )}
              <input
                id="file-input"
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onFile}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
              />
            </label>

            <div style={{ flex: "1 1 240px", minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nombre y apellido (ej: Juan Pérez)"
                style={inputStyle}
              />
              <input
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Ciudad"
                style={inputStyle}
              />
              <input
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                placeholder="País / Nacionalidad"
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={!nome.trim() || !foto}
                style={{
                  marginTop: 4,
                  background: "#3ddc84",
                  color: "#0f1420",
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: !nome.trim() || !foto ? "not-allowed" : "pointer",
                  opacity: !nome.trim() || !foto ? 0.5 : 1,
                }}
              >
                Iniciar rastreo →
              </button>
              {!foto && (
                <p style={{ margin: 0, fontSize: 11, color: "#a7b0c0" }}>
                  📸 La fotografía del objetivo es obligatoria para mejorar la precisión.
                </p>
              )}
            </div>
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #232a3a", display: "flex", flexWrap: "wrap", gap: 6, fontSize: 12, color: "#a7b0c0" }}>
            <Chip>❤️ Apps de citas</Chip>
            <Chip>🙈 Cuentas falsas</Chip>
            <Chip>⏱️ Última actividad</Chip>
            <Chip>🌐 Redes sociales</Chip>
          </div>
        </form>

        <p style={{ marginTop: 20, fontSize: 12, color: "#a7b0c0" }}>
          🔒 Consultas anónimas y encriptadas · Sin notificar al objetivo
        </p>
          </>
        )}

        {stage === "loading" && (
          <LoadingStage nome={nome} foto={foto} phaseIdx={phaseIdx} progress={progress} />
        )}

        {stage === "reveal" && (
          <RevealStage nome={nome} cidade={cidade} pais={pais} foto={foto} onReset={reset} />
        )}
      </main>

      {/* Features */}
      {stage === "form" && (
      <section id="recursos" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 48px" }}>
        <div style={gridStyle}>
          <Feature emoji="❤️" title="Apps de citas" desc="Tinder, Bumble, Hinge, Badoo, Grindr y más de 20 plataformas." />
          <Feature emoji="🙈" title="Cuentas ocultas" desc="Detectamos perfiles con nombres alterados, correos secundarios y fotos reutilizadas." />
          <Feature emoji="⏱️" title="Línea de tiempo" desc="Últimos inicios de sesión, cambios de foto y nuevos matches registrados por hora." />
          <Feature emoji="🌐" title="Cobertura global" desc="Filtrado por ciudad y nacionalidad para reducir falsos positivos." />
          <Feature emoji="🛡️" title="Totalmente anónimo" desc="El objetivo nunca lo sabe. No queda ningún registro en las plataformas." />
          <Feature emoji="✨" title="Informe instantáneo" desc="Recibe un informe con evidencias, enlaces y capturas en minutos." />
        </div>
      </section>
      )}

      {stage === "form" && (
      <section id="como-funciona" style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, margin: "0 0 12px", fontWeight: 800 }}>
          3 pasos para saber <span style={{ color: "#3ddc84" }}>todo</span>
        </h2>
        <p style={{ color: "#a7b0c0", fontSize: 14, maxWidth: 560, margin: "0 auto 24px" }}>
          Nuestra IA cruza más de 40 fuentes públicas, apps de citas y redes sociales
          para construir un perfil completo en minutos.
        </p>
        <div style={gridStyle}>
          <Step n="01" title="Danos el objetivo" desc="Nombre completo, ciudad, país y una fotografía. La IA usa la foto para reconocimiento facial." />
          <Step n="02" title="La IA rastrea" desc="En 60–70 segundos escaneamos Tinder, Bumble, Hinge, Badoo, Instagram, Facebook y más." />
          <Step n="03" title="Recibes el informe" desc="Apps activas, últimos inicios de sesión, fotos, cuentas ocultas y actividad reciente." />
        </div>
        <div style={{ marginTop: 28 }}>
          <a
            href="#comecar"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("comecar")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{ display: "inline-block", background: "#3ddc84", color: "#0f1420", padding: "12px 20px", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}
          >
            Comenzar ahora →
          </a>
        </div>
      </section>
      )}

      <footer style={{ borderTop: "1px solid #232a3a", padding: "24px 16px", textAlign: "center", fontSize: 12, color: "#a7b0c0" }}>
        © {new Date().getFullYear()} Discover AI · Uso únicamente para fines legítimos y legales.
      </footer>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "#0f1420",
  border: "1px solid #232a3a",
  color: "#f2f4f7",
  padding: "12px 14px",
  borderRadius: 10,
  fontSize: 15,
  outline: "none",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
};

function LoadingStage({
  nome,
  foto,
  phaseIdx,
  progress,
}: {
  nome: string;
  foto: string | null;
  phaseIdx: number;
  progress: number;
}) {
  return (
    <div style={{ maxWidth: 640, margin: "24px auto 0", textAlign: "left" }}>
      <div style={{ display: "flex", gap: 12, background: "#151b28", border: "1px solid #232a3a", borderRadius: 12, padding: 16, alignItems: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", background: "#0f1420", flexShrink: 0, border: "1px solid #232a3a" }}>
          {foto ? <img src={foto} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ textAlign: "center", lineHeight: "60px" }}>📷</div>}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 11, color: "#3ddc84", textTransform: "uppercase", letterSpacing: 1 }}>Rastreo en curso</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4, wordBreak: "break-word" }}>
            Recopilando datos de <span style={{ color: "#3ddc84" }}>{nome}</span>…
          </div>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#a7b0c0" }}>
            Esto puede tardar entre 60 y 70 segundos. No cierres esta ventana.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 14, height: 8, width: "100%", background: "#232a3a", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "#3ddc84", transition: "width 0.3s" }} />
      </div>
      <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12, color: "#a7b0c0" }}>
        <span style={{ minWidth: 0, wordBreak: "break-word" }}>⏳ {PHASES[phaseIdx].label}</span>
        <span style={{ flexShrink: 0 }}>{Math.round(progress)}%</span>
      </div>

      <ul style={{ marginTop: 20, padding: 0, listStyle: "none" }}>
        {PHASES.map((p, i) => {
          const done = i < phaseIdx;
          const active = i === phaseIdx;
          return (
            <li
              key={p.label}
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 12px",
                marginBottom: 6,
                border: active ? "1px solid #3ddc84" : "1px solid #232a3a",
                borderRadius: 10,
                background: active ? "rgba(61,220,132,0.08)" : "#151b28",
                color: done ? "#a7b0c0" : active ? "#f2f4f7" : "#6b7280",
                fontSize: 13,
              }}
            >
              <span style={{ flexShrink: 0 }}>{done ? "✅" : active ? "⏳" : "⚪"}</span>
              <span style={{ wordBreak: "break-word" }}>{p.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RevealStage({
  nome,
  cidade,
  pais,
  foto,
  onReset,
}: {
  nome: string;
  cidade: string;
  pais: string;
  foto: string | null;
  onReset: () => void;
}) {
  return (
    <div style={{ maxWidth: 640, margin: "24px auto 0", textAlign: "left" }}>
      <div style={{ border: "1px solid #3ddc84", background: "rgba(61,220,132,0.06)", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 11, color: "#3ddc84", textTransform: "uppercase", letterSpacing: 1 }}>✅ Análisis completado</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: "6px 0 4px", wordBreak: "break-word" }}>
          Encontramos actividad reciente de <span style={{ color: "#3ddc84" }}>{nome}</span>
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: "#a7b0c0" }}>
          {[cidade, pais].filter(Boolean).join(", ") || "Ubicación detectada"} · 7 perfiles coincidentes
        </p>
      </div>

      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <RevealCard emoji="❤️" title="Cuenta activa detectada en" blur="Tinder, Bumble y 2 apps más" />
        <RevealCard emoji="⏱️" title="Actividad frecuente en" blur="Badoo — visto en línea hace 3h" />
        <RevealCard emoji="📸" title="Foto de perfil actual" blurImage={foto} />
        <RevealCard emoji="🙈" title="Cuenta oculta encontrada en" blur="@juan_secreto_92 · Instagram" />
        <RevealCard emoji="💬" title="Últimas conversaciones registradas" blur="12 matches en las últimas 48h" />
      </div>

      <div style={{ marginTop: 20, background: "#151b28", border: "1px solid #3ddc84", borderRadius: 12, padding: 18 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#3ddc84", color: "#0f1420", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>🔒</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, wordBreak: "break-word" }}>
              Desbloquea todo sobre {nome.split(" ")[0] || "esta persona"}
            </h3>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#a7b0c0" }}>
              Fotos, nombres de usuario, apps, últimos inicios de sesión, cuentas falsas y
              conversaciones — informe completo entregado en segundos.
            </p>
            <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", fontSize: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>✅ Todas las cuentas en apps de citas</li>
              <li>✅ Fotos de perfil sin censura</li>
              <li>✅ Cuentas falsas y usuarios secundarios</li>
              <li>✅ Línea de tiempo de actividad</li>
            </ul>

            <a
              href="https://pay.hotmart.com/L106693797F"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 18, display: "block", background: "#3ddc84", color: "#0f1420", padding: "14px 16px", borderRadius: 10, fontWeight: 800, fontSize: 15, textAlign: "center", textDecoration: "none" }}
            >
              Desbloquear informe completo · 8,90 USD
            </a>
            <p style={{ marginTop: 8, textAlign: "center", fontSize: 11, color: "#a7b0c0" }}>
              Pago único · 100% anónimo · Sin renovación automática
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        style={{ marginTop: 14, width: "100%", background: "transparent", border: "none", color: "#a7b0c0", fontSize: 12, cursor: "pointer" }}
      >
        ← Rastrear otra persona
      </button>
    </div>
  );
}

function RevealCard({
  emoji,
  title,
  blur,
  blurImage,
}: {
  emoji: string;
  title: string;
  blur?: string;
  blurImage?: string | null;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: "#151b28", border: "1px solid #232a3a", borderRadius: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(61,220,132,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>{emoji}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12, color: "#a7b0c0" }}>{title}</div>
        {blurImage !== undefined ? (
          <div style={{ marginTop: 4, width: 96, height: 44, overflow: "hidden", borderRadius: 6, border: "1px solid #232a3a", background: "#0f1420" }}>
            {blurImage ? (
              <img src={blurImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(10px)" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#3ddc84,#6b7280)", filter: "blur(10px)" }} />
            )}
          </div>
        ) : (
          <div style={{ marginTop: 2, fontWeight: 700, filter: "blur(5px)", userSelect: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {blur}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0, color: "#a7b0c0", fontSize: 14 }}>🔒</div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-block", padding: "4px 10px", border: "1px solid #232a3a", borderRadius: 999, background: "#0f1420" }}>
      {children}
    </span>
  );
}

function Feature({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <div style={{ background: "#151b28", border: "1px solid #232a3a", borderRadius: 12, padding: 20, textAlign: "left" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(61,220,132,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>{emoji}</div>
      <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 14, color: "#a7b0c0" }}>{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div style={{ background: "#151b28", border: "1px solid #232a3a", borderRadius: 12, padding: 20, textAlign: "left" }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: "rgba(61,220,132,0.6)", marginBottom: 10 }}>{n}</div>
      <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 14, color: "#a7b0c0" }}>{desc}</p>
    </div>
  );
}
