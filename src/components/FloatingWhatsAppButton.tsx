'use client'

type Props = {
  href: string
  ariaLabel?: string
}

export function FloatingWhatsAppButton({ href, ariaLabel = 'WhatsApp' }: Props) {
  return (
    <>
      <a
        className="hb-wa-float"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        data-track-id="whatsapp-float"
      >
        <span className="hb-wa-float__icon" aria-hidden="true">
          <span className="hb-wa-float__iconShake">
            <svg width="33" height="33" viewBox="0 0 24 24" fill="#fff" style={{ display: 'block' }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.857L.057 23.88l6.171-1.617A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.88 0-3.63-.527-5.124-1.442l-.357-.213-3.706.971.99-3.615-.234-.372A9.78 9.78 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z" />
            </svg>
          </span>
          <span className="hb-wa-float__notifDot" />
        </span>
      </a>

      <style>{`
        .hb-wa-float {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 50;
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          display: grid;
          place-items: center;
          background: #25D366;
          color: #ffffff;
          box-shadow: 0 12px 26px rgba(0,0,0,0.28);
          border: 1px solid rgba(255,255,255,0.18);
          transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;
          text-decoration: none;
        }
        .hb-wa-float:hover {
          transform: translateY(-2px);
          filter: brightness(1.03);
          box-shadow: 0 16px 34px rgba(0,0,0,0.32);
        }
        .hb-wa-float:active {
          transform: translateY(0);
        }
        .hb-wa-float:focus-visible {
          outline: 3px solid rgba(37, 211, 102, 0.35);
          outline-offset: 4px;
        }
        .hb-wa-float__icon {
          position: relative;
          display: grid;
          place-items: center;
          width: 56px;
          height: 56px;
        }
        .hb-wa-float__iconShake {
          display: grid;
          place-items: center;
          transform-origin: 50% 60%;
          animation: hb-wa-float-shake 2.4s ease-in-out infinite;
        }
        .hb-wa-float__notifDot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #ff3b30;
          border: 2px solid #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
          pointer-events: none;
          transform-origin: center;
          animation: hb-wa-float-badge 2.4s ease-in-out infinite;
        }

        @keyframes hb-wa-float-shake {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          2% { transform: translate3d(-1px, 0, 0) rotate(-4deg); }
          4% { transform: translate3d(1px, 0, 0) rotate(4deg); }
          6% { transform: translate3d(-1px, 0, 0) rotate(-3deg); }
          8% { transform: translate3d(1px, 0, 0) rotate(3deg); }
          10% { transform: translate3d(-1px, 0, 0) rotate(-4deg); }
          12% { transform: translate3d(1px, 0, 0) rotate(4deg); }
          14% { transform: translate3d(0, 0, 0) rotate(0deg); }
          14.001%, 48% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, 0, 0) rotate(0deg); }
          52% { transform: translate3d(-1px, 0, 0) rotate(-4deg); }
          54% { transform: translate3d(1px, 0, 0) rotate(4deg); }
          56% { transform: translate3d(-1px, 0, 0) rotate(-3deg); }
          58% { transform: translate3d(1px, 0, 0) rotate(3deg); }
          60% { transform: translate3d(-1px, 0, 0) rotate(-4deg); }
          62% { transform: translate3d(1px, 0, 0) rotate(4deg); }
          64% { transform: translate3d(0, 0, 0) rotate(0deg); }
          64.001%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
        @keyframes hb-wa-float-badge {
          0% { opacity: 0; transform: scale(0.35); }
          1% { opacity: 1; transform: scale(1); }
          13% { opacity: 1; transform: scale(1); }
          14% { opacity: 0; transform: scale(0.35); }
          14.001%, 49% { opacity: 0; transform: scale(0.35); }
          50% { opacity: 0; transform: scale(0.35); }
          51% { opacity: 1; transform: scale(1); }
          63% { opacity: 1; transform: scale(1); }
          64% { opacity: 0; transform: scale(0.35); }
          64.001%, 100% { opacity: 0; transform: scale(0.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hb-wa-float__iconShake,
          .hb-wa-float__notifDot {
            animation: none;
          }
          .hb-wa-float__notifDot {
            opacity: 0.85;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}

