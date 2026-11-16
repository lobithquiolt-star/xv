import { useRef, useState } from "react";
import quinceaneraSilhouette from "./assets/quinceanera-silhouette.png";
import music from "./assets/music.mp3";

function QuinceaneraSilhouette({ className = "" }: { className?: string }) {
  return (
    <img
      src={quinceaneraSilhouette}
      className={className}
      alt="Quinceañera de perfil con vestido rojo y una mariposa sobre la mano"
    />
  );
}

function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`h-7 w-24 text-[#a20f26] ${flip ? "rotate-180" : ""}`}
      viewBox="0 0 100 28"
      aria-hidden="true"
    >
      <path
        d="M2 15c18 0 18-11 32-11 10 0 13 7 16 11 3-4 6-11 16-11 14 0 14 11 32 11M23 16c7 0 12 3 12 9M77 16c-7 0-12 3-12 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="50" cy="15" r="2.5" fill="currentColor" />
    </svg>
  );
}

function DetailIcon({ type }: { type: "church" | "glass" | "gift" | "dress" | "music" }) {
  const paths = {
    church: (
      <>
        <path d="M12 3v5M9.5 5.5h5M5 21V11l7-4 7 4v10M9 21v-6h6v6" />
        <path d="M3 21h18" />
      </>
    ),
    glass: (
      <>
        <path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3ZM12 14v7M8 21h8" />
        <path d="M8 7h8" />
      </>
    ),
    gift: (
      <>
        <path d="M4 10h16v11H4zM3 6h18v4H3zM12 6v15" />
        <path d="M12 6c-1-4-6-4-6-1 0 2 3 2 6 1Zm0 0c1-4 6-4 6-1 0 2-3 2-6 1Z" />
      </>
    ),
    dress: (
      <>
        <path d="M10 3h4l1 5c3 4 5 8 6 13H3c1-5 3-9 6-13l1-5Z" />
        <path d="M8 10h8" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V5l10-2v13" />
        <path d="M9 9l10-2" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </>
    ),
  };
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function handleOpenInvitation() {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }

  function toggleMusic() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }

  return (
    <main className="min-h-screen bg-[#f4eee4] text-[#352a26]">
      {/* Elemento de audio oculto */}
      <audio ref={audioRef} src={music} loop preload="auto" />

      <section
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#78091b] px-6 transition-all duration-1000 ${
          opened ? "pointer-events-none -translate-y-full opacity-0" : ""
        }`}
        aria-hidden={opened}
      >
        <div className="art-nouveau-pattern absolute inset-0 opacity-20" />

        <div className="relative w-full max-w-sm text-center">
          <p className="mb-12 text-[24px] font-semibold tracking-[0.5em] text-[#ebc8ad] uppercase">
            Una Invitación Especial
          </p>
          <button
            type="button"
            onClick={handleOpenInvitation}
            className="group relative mx-auto block w-full cursor-pointer py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e7cbb3]"
            aria-label="Abrir invitación"
          >
            <div className="relative mx-auto aspect-[1.5/1] w-full max-w-[340px] overflow-hidden rounded-sm bg-[#f3e5d2] shadow-[0_28px_70px_rgba(28,0,5,.4)]">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.6),transparent_50%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[78%] bg-[#ead6bc] [clip-path:polygon(0_100%,0_0,50%_58%,100%_0,100%_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[78%] bg-[#f8ebda] [clip-path:polygon(0_100%,0_0,50%_70%,100%_0,100%_100%)]" />
              <div className="absolute left-1/2 top-[53%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d9909b] bg-[#9e1026] text-[#f5d8be] shadow-lg transition-transform duration-500 group-hover:scale-105">
                <span className="font-display text-2xl italic">MH</span>
              </div>
            </div>
            <span className="mt-10 inline-flex items-center gap-3 text-xs tracking-[0.28em] text-white uppercase">
              <span className="h-px w-7 bg-[#d5ad91]" />
              Toca para abrir
              <span className="h-px w-7 bg-[#d5ad91]" />
            </span>
          </button>
        </div>
      </section>

      <div
        className={`transition-opacity delay-300 duration-1000 ${opened ? "opacity-100" : "opacity-0"}`}
      >
        <header className="art-nouveau-paper relative min-h-[760px] overflow-hidden px-6 pb-16 pt-12 text-center">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#b9162f]/8 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-md">
            <p className="text-[22px] font-semibold tracking-[0.5em] text-[#9e1026] uppercase">
              Mis XV años
            </p>
            <Flourish />
            <h1 className="mt-4 font-display text-[4.2rem] leading-[0.78] text-[#861024]">
              Miranda
              <span className="mt-3 block text-[3.4rem] italic text-[#b48b70]">Haniel</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[280px] font-serif italic leading-relaxed text-[#6c5b53]">
              “Hay momentos en la vida que son especiales por sí solos, pero compartirlos con
              quienes amo los hace inolvidables.”
            </p>
            <div className="relative mx-auto mt-8 h-[300px] w-[220px]">
              <div className="absolute left-1/2 top-8 h-52 w-52 -translate-x-1/2 rounded-full border border-[#c8af9b]" />
              <div className="absolute left-1/2 top-14 h-44 w-44 -translate-x-1/2 rounded-full border border-[#9e1026]/30" />
              <QuinceaneraSilhouette className="absolute bottom-0 left-1/2 w-[270px] max-w-none -translate-x-1/2 object-contain drop-shadow-[0_16px_18px_rgba(106,0,18,.18)]" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#b79b88]" />
              <time className="text-[15px] font-semibold tracking-[0.24em] text-[#781022] uppercase">
                26·Diciembre·2026
              </time>
              <span className="h-px w-12 bg-[#b79b88]" />
            </div>
          </div>
        </header>

        <section className="art-nouveau-pattern relative overflow-hidden bg-[#6f0b1c] px-7 py-16 text-center text-[#fff9f1]">
          <div className="relative z-10">
            <p className="mx-auto max-w-sm font-serif text-lg italic leading-relaxed text-[#f4d9c7]">
              Con la bendición de Dios y el amor de mi familia
            </p>
            <div className="mx-auto mt-10 grid max-w-sm gap-9">
              <div>
                <p className="text-[15px] font-bold tracking-[0.38em] text-[#FFE500] uppercase">Mis padres</p>
                <p className="mt-3 font-serif text-[25px] leading-relaxed">
                  Jhonatan Díaz López
                  <span className="block font-display text-lg italic text-[#efc7ae]">&</span>
                  Lolys Trejo Montiel
                </p>
              </div>
              <div className="mx-auto h-px w-16 bg-[#d6a18f]/50" />
              <div>
                <p className="text-[15px] font-bold tracking-[0.38em] text-[#FFE500] uppercase">
                  Mis padrinos
                </p>
                <p className="mt-3 font-serif text-[25px] leading-relaxed">
                  Roberto Rodríguez Rivero
                  <span className="block font-display text-lg italic text-[#efc7ae]">&</span>
                  Dulce María Bonilla López
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="art-nouveau-paper relative overflow-hidden px-6 py-16">
          <div className="mx-auto max-w-md text-center">
            <p className="text-[20px] font-semibold tracking-[0.45em] text-[#a20f26] uppercase">
              Itinerario
            </p>
            <h2 className="mt-3 font-display text-4xl italic text-[#3d302a]">Acompáñame</h2>

            <div className="mt-10 grid gap-5 text-left">
              <article className="rounded-t-[4rem] border border-[#d7c3b2] bg-[#fbf8f3] px-7 pb-8 pt-10 text-center shadow-[0_10px_40px_rgba(68,36,24,.06)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#8d1023] text-white">
                  <DetailIcon type="church" />
                </div>
                <p className="mt-5 text-[10px] tracking-[0.35em] text-[#a20f26] uppercase">
                  Ceremonia religiosa
                </p>
                <h3 className="mt-3 font-display text-3xl italic">5:00 P.M.</h3>
                <p className="mt-3 font-serif text-lg">Parroquia de Libres</p>
                <p className="mt-1 text-xs tracking-[0.15em] text-[#806f67] uppercase">
                  Libres, Puebla
                </p>
              </article>

              <article className="border border-[#d7c3b2] bg-[#fbf8f3] px-7 pb-9 pt-8 text-center shadow-[0_10px_40px_rgba(68,36,24,.06)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#8d1023] text-white">
                  <DetailIcon type="glass" />
                </div>
                <p className="mt-5 text-[10px] tracking-[0.35em] text-[#a20f26] uppercase">
                  Recepción
                </p>
                <h3 className="mt-3 font-display text-3xl italic">6:00 P.M.</h3>
                <p className="mt-3 font-serif text-lg">Salón Social Los Agaves</p>
              </article>

              <article className="rounded-b-[4rem] border border-[#d7c3b2] bg-[#fbf8f3] px-7 pb-10 pt-8 text-center shadow-[0_10px_40px_rgba(68,36,24,.06)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#8d1023] text-white">
                  <DetailIcon type="music" />
                </div>
                <p className="mt-5 text-[10px] tracking-[0.35em] text-[#a20f26] uppercase">Vals</p>
                <h3 className="mt-3 font-display text-3xl italic">8:30 P.M.</h3>
                <p className="mt-3 font-serif text-lg italic">Un momento para recordar</p>
              </article>
            </div>
          </div>
        </section>

        <section className="art-nouveau-pattern relative overflow-hidden bg-[#e9ddd0] px-6 py-16">
          <div className="relative z-10 mx-auto grid max-w-md gap-5">
            <article className="border border-[#bda595] bg-[#f8f3ed]/95 p-7 text-center">
              <div className="mx-auto text-[#9b1025]">
                <DetailIcon type="dress" />
              </div>
              <h2 className="mt-4 font-display text-3xl italic">Código de color</h2>
              <p className="mt-3 font-serif leading-relaxed text-[#6e5d54]">
                Te pedimos evitar el color{" "}
                <strong className="font-normal text-[#a20f26]">rojo</strong>, pues estará reservado
                para la quinceañera.
              </p>
            </article>
            <article className="border border-[#bda595] bg-[#f8f3ed]/95 p-7 text-center">
              <div className="mx-auto text-[#9b1025]">
                <DetailIcon type="gift" />
              </div>
              <h2 className="mt-4 font-display text-3xl italic">Mi mejor regalo</h2>
              <p className="mt-3 font-serif leading-relaxed text-[#6e5d54]">
                Es tu presencia, pero si deseas llevarme un detalle, agradeceré que sea en efectivo.
              </p>
            </article>
          </div>
        </section>

        <section className="art-nouveau-paper relative overflow-hidden px-6 py-16">
          <div className="relative z-10 mx-auto max-w-md text-center">
            <Flourish flip />
            <p className="mt-4 text-[10px] font-semibold tracking-[0.4em] text-[#a20f26] uppercase">
              R.S.V.P.
            </p>
            <h2 className="mt-3 font-display text-4xl italic">
              Confirma tu asistencia Y Número de Acompañantes
            </h2>
            <p className="mx-auto mt-3 max-w-xs font-serif italic text-[#75635a]">
              Porque tu presencia es muy especial para nosotros y mereces que te atendamosde lo mejor, por eso te pedimos nos  confirmes tu asistencia y la de tus acompañantes.
            </p>

            <button
              type="button"
              onClick={() => window.open("https://wa.me/5212761091098", "_blank")}
              className="mt-6 w-full cursor-pointer bg-[#8d1023] px-6 py-4 text-xs font-semibold tracking-[0.28em] text-white uppercase shadow-[0_10px_25px_rgba(106,10,30,.2)] transition hover:bg-[#6f0b1c]"
            >
              Confirmar asistencia
            </button>
          </div>
        </section>

        <footer className="bg-[#620817] px-6 py-12 text-center text-[#f9e9dc]">
          <p className="font-display text-3xl italic">Miranda Haniel</p>
          <p className="mt-3 text-[9px] tracking-[0.4em] text-[#d9ad9f] uppercase">
            26 · 12 · 2026
          </p>
        </footer>
      </div>

      {/* Botón flotante de música */}
      {opened && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#e7cbb3]/60 bg-[#8d1023] text-[#f5d8be] shadow-[0_10px_25px_rgba(68,10,20,0.35)] transition-transform duration-300 hover:scale-105 hover:bg-[#6f0b1c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e7cbb3]"
        >
          {isPlaying && (
            <span className="absolute inset-0 animate-ping rounded-full bg-[#a20f26] opacity-30" />
          )}
          {isPlaying ? (
            /* Icono de Pausa */
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            /* Icono de Play */
            <svg
              className="ml-0.5 h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14Z" />
            </svg>
          )}
        </button>
      )}
    </main>
  );
}
