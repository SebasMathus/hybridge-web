import React from 'react'
import type { FacultyTeamMember } from './FacultyTeamGrid'

export function FacultyMemberProfile({ member }: { member: FacultyTeamMember }) {
  const avatarUrl = member.avatarUrl || '/Logo_blanco.png'
  const workplaceLogoUrl = member.workplaceLogoUrl || '/Logo_blanco.png'

  return (
    <section className="section-pad hb-faculty-profile" style={{ background: 'transparent' }}>
      <div className="container-hb">
        <div className="hb-li-profile">
          <div className="hb-li-cover" aria-hidden="true">
            <img className="hb-li-coverLogo" src="/Logo_blanco.png" alt="" />
            <div className="hb-li-bell">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2Zm6-6V11c0-3.1-1.6-5.6-4.5-6.3V3c0-.8-.7-1.5-1.5-1.5S10.5 2.2 10.5 3v1.7C7.6 5.4 6 7.9 6 11v5l-1.8 1.8c-.2.2-.2.5-.1.8.1.3.4.4.7.4h14.4c.3 0 .6-.1.7-.4.1-.3.1-.6-.1-.8L18 16Z" />
              </svg>
            </div>

            <div className="hb-li-avatarWrap">
              <img className="hb-li-avatar" src={avatarUrl} alt={member.name} />
            </div>
          </div>

          <div className="hb-li-mainCard">
            <div className="hb-li-topRow">
              <div className="hb-li-left">
                <div className="hb-li-nameRow">
                  <h1 className="hb-li-name">{member.name}</h1>
                  <span className="hb-li-muted">1er</span>
                </div>

                <div className="hb-li-title">{member.specialization || 'Especialidad por confirmar'}</div>

                <div className="hb-li-contactLine">
                  {member.formation ? member.formation : 'Formación por definir'} ·{' '}
                  <a className="hb-li-contactLink" href={member.linkedInUrl || '#'} target="_blank" rel="noreferrer">
                    Información de contacto
                  </a>
                </div>

                <div className="hb-li-mutuals">Más de 500 contactos</div>

                <div className="hb-li-mutualRow">
                  <div className="hb-li-mutualAvatars" aria-hidden="true">
                    <img className="hb-li-miniAvatar" src="/Logo_blanco.png" alt="" />
                    <img className="hb-li-miniAvatar" src={avatarUrl} alt="" />
                  </div>
                  <div className="hb-li-mutualText">
                    Gerardo Mathus, Daniela Anaya y 114 contactos en común más
                  </div>
                </div>
              </div>

              <div className="hb-li-right">
                <div className="hb-li-companyStack">
                  <div className="hb-li-companyCard">
                    <div className="hb-li-companyLogoWrap">
                      <img className="hb-li-companyLogo" src={workplaceLogoUrl} alt="Logo" />
                    </div>
                    <div className="hb-li-companyText">
                      <div className="hb-li-companyName">Hybridge Education</div>
                      <div className="hb-li-companySub">Equipo Docente</div>
                    </div>
                  </div>

                  <div className="hb-li-companyCard hb-li-companyCard--muted">
                    <div className="hb-li-companyLogoWrap">
                      <img className="hb-li-companyLogo" src={workplaceLogoUrl} alt="Logo" />
                    </div>
                    <div className="hb-li-companyText">
                      <div className="hb-li-companyName">LSE</div>
                      <div className="hb-li-companySub">Economics and Political...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hb-li-actionsRow">
              {member.linkedInUrl ? (
                <a className="hb-li-btnPrimary" href={member.linkedInUrl} target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 8 }}>
                    <path d="M3 11.5V12l18-9-9 18h-.5l-2-7.5L3 11.5Zm6.3 1.8 1.4 4.7 3.9-7.6-5.3 2.9Z" />
                  </svg>
                  Enviar mensaje
                </a>
              ) : (
                <button type="button" className="hb-li-btnPrimary" disabled aria-disabled="true" title="LinkedIn por definir">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 8 }}>
                    <path d="M3 11.5V12l18-9-9 18h-.5l-2-7.5L3 11.5Zm6.3 1.8 1.4 4.7 3.9-7.6-5.3 2.9Z" />
                  </svg>
                  Enviar mensaje
                </button>
              )}

              <button type="button" className="hb-li-btnOutline">
                Ver en Recruiter
              </button>

              <button type="button" className="hb-li-btnMore">
                Más
              </button>
            </div>

            <div className="hb-li-card hb-li-cardHighlights">
              <div className="hb-li-cardTitle">Datos destacados</div>

              <div className="hb-li-highlightRow">
                <div className="hb-li-highlightIcon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 19h16v2H4v-2Zm7-15 5.5 3.2c.6.3.6 1.2 0 1.5L11 11l-5.5 3.2c-.6.3-1.3-.1-1.3-.8V9.4c0-.7.7-1.1 1.3-.8L11 11l0-7Z" />
                  </svg>
                </div>

                <div className="hb-li-highlightText">
                  <div className="hb-li-highlightTitle">Trabajáis en Nexia</div>
                  <div className="hb-li-highlightSub">{member.name} empezó en Nexia 8 meses antes que tú</div>
                </div>
              </div>

              <div className="hb-li-highlightBtnRow">
                <button type="button" className="hb-li-btnSmall">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 8 }}>
                    <path d="M3 11.5V12l18-9-9 18h-.5l-2-7.5L3 11.5Zm6.3 1.8 1.4 4.7 3.9-7.6-5.3 2.9Z" />
                  </svg>
                  Enviar mensaje
                </button>
              </div>
            </div>

            <div className="hb-li-card hb-li-cardAbout">
              <div className="hb-li-cardTitle">Acerca de</div>
              <div className="hb-li-aboutText">
                {member.description ||
                  "Por definir. Puedes llenar la descripción en el admin para que aquí se muestre el texto del perfil."}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hb-li-profile{
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
        }

        .hb-li-cover{
          height: 140px;
          position: relative;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
          overflow: hidden;
          background: linear-gradient(90deg, rgba(0,0,0,0.85), rgba(30,30,30,0.6)),
            radial-gradient(circle at 20% 20%, rgba(226,248,151,0.18), transparent 35%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08), transparent 45%);
        }

        .hb-li-coverLogo{
          height: 28px;
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.95;
        }

        .hb-li-bell{
          position: absolute;
          top: 18px;
          right: 16px;
          color: #ffffff;
          opacity: 0.85;
          background: rgba(0,0,0,0.15);
          border-radius: 999px;
          padding: 10px;
        }

        .hb-li-avatarWrap{
          width: 108px;
          height: 108px;
          border-radius: 999px;
          overflow: hidden;
          position: absolute;
          left: 22px;
          bottom: -54px;
          border: 4px solid #fff;
          background: #fff;
          z-index: 2;
        }

        .hb-li-avatar{
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hb-li-mainCard{
          background: #fff;
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 68px 18px 18px;
        }

        .hb-li-topRow{
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 18px;
          align-items: start;
        }

        .hb-li-left{
          padding-left: 0;
        }

        .hb-li-nameRow{
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .hb-li-name{
          font-size: 26px;
          margin: 0;
          color: #111;
          font-weight: 800;
          font-family: var(--font-display);
        }

        .hb-li-muted{
          color: rgba(0,0,0,0.55);
          font-size: 12px;
          font-weight: 700;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 999px;
          padding: 3px 10px;
          white-space: nowrap;
        }

        .hb-li-title{
          margin-top: 4px;
          color: rgba(0,0,0,0.7);
          font-weight: 600;
          font-size: 14px;
        }

        .hb-li-contactLine{
          margin-top: 10px;
          color: rgba(0,0,0,0.65);
          font-size: 13px;
          line-height: 1.5;
        }

        .hb-li-contactLink{
          color: #0a66c2;
          text-decoration: none;
          font-weight: 700;
        }

        .hb-li-mutuals{
          margin-top: 6px;
          color: #0a66c2;
          font-weight: 700;
          font-size: 13px;
        }

        .hb-li-mutualRow{
          margin-top: 10px;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .hb-li-mutualAvatars{
          display: flex;
          align-items: center;
        }

        .hb-li-miniAvatar{
          width: 26px;
          height: 26px;
          border-radius: 999px;
          object-fit: cover;
          border: 2px solid #fff;
          margin-left: -8px;
          background: #fff;
        }

        .hb-li-mutualText{
          color: rgba(0,0,0,0.6);
          font-size: 13px;
          line-height: 1.3;
        }

        .hb-li-companyStack{
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hb-li-companyCard{
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hb-li-companyCard--muted{
          opacity: 0.92;
        }

        .hb-li-companyLogoWrap{
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          background: rgba(0,0,0,0.06);
          border-radius: 12px;
          overflow: hidden;
        }

        .hb-li-companyLogo{
          width: 34px;
          height: 34px;
          object-fit: contain;
          display: block;
          filter: brightness(0);
          opacity: 0.9;
        }

        .hb-li-companyText{
          min-width: 0;
        }

        .hb-li-companyName{
          font-weight: 800;
          color: rgba(0,0,0,0.75);
          font-size: 14px;
        }

        .hb-li-companySub{
          color: rgba(0,0,0,0.55);
          font-size: 12px;
          font-weight: 600;
          line-height: 1.2;
          margin-top: 3px;
          max-width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hb-li-actionsRow{
          margin-top: 14px;
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .hb-li-btnPrimary{
          background: #1b6fdc;
          color: #fff;
          border: 1px solid #1b6fdc;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
        }

        .hb-li-btnPrimary:disabled{
          opacity: 0.6;
          cursor: not-allowed;
        }

        .hb-li-btnOutline{
          background: #fff;
          color: #0a66c2;
          border: 1px solid rgba(10,102,194,0.35);
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
        }

        .hb-li-btnMore{
          background: #fff;
          color: rgba(0,0,0,0.65);
          border: 1px solid rgba(0,0,0,0.2);
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
        }

        .hb-li-card{
          margin-top: 14px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 16px 18px;
          background: #fff;
        }

        .hb-li-cardTitle{
          font-weight: 900;
          color: #111;
          font-size: 16px;
        }

        .hb-li-highlightRow{
          margin-top: 14px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .hb-li-highlightIcon{
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(0,0,0,0.06);
          display: grid;
          place-items: center;
          color: #2f2f2f;
        }

        .hb-li-highlightTitle{
          font-weight: 900;
          color: #111;
        }

        .hb-li-highlightSub{
          color: rgba(0,0,0,0.55);
          font-weight: 600;
          font-size: 13px;
          margin-top: 2px;
        }

        .hb-li-highlightBtnRow{
          margin-top: 12px;
        }

        .hb-li-btnSmall{
          background: #fff;
          border: 1px solid rgba(0,0,0,0.2);
          border-radius: 999px;
          padding: 8px 12px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          color: #111;
        }

        .hb-li-aboutText{
          margin-top: 12px;
          color: rgba(0,0,0,0.65);
          line-height: 1.6;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .hb-li-topRow{ grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

