'use client'
import React from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/utils'

export type ProgramKey = 'preparatoria' | 'ingenieria-en-software'

export type FacultyTeamMember = {
  id: string
  slug?: string
  name: string
  specialization: string
  avatarUrl?: string
  workplaceLogoUrl?: string
  linkedInUrl?: string
  formation?: string
  subjects?: string[]
  description?: string
  hobbies?: string[]
}

const HYBRIDGE_LOGO = '/Logo_blanco.png'

function normalizeArray(arr: any): string[] {
  if (!arr) return []
  if (Array.isArray(arr)) return arr.map((x) => (typeof x === 'string' ? x : x?.text).filter(Boolean))
  return []
}

export function FacultyTeamGrid({
  members,
  program,
  locale,
}: {
  members: FacultyTeamMember[]
  program: ProgramKey
  locale: Locale
}) {
  return (
    <section className="section-pad hb-faculty-team" style={{ background: 'var(--color-hb-bg)' }}>
      <div className="container-hb">
        <div className="hb-faculty-team__header" style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ color: 'var(--color-hb-text)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '8px' }}>
            NUESTRO EQUIPO DOCENTE
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--color-hb-text)', margin: 0 }}>
            Conoce al equipo que te acompaña
          </h2>
        </div>

        <div className="hb-faculty-team__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '18px' }}>
          {members.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/profesor/${encodeURIComponent(p.slug ?? p.id)}`}
              aria-label={`Ver perfil de ${p.name}`}
              className="hb-faculty-card"
            >
              <div className="hb-faculty-card__media">
                <img className="hb-faculty-card__avatar" src={p.avatarUrl || HYBRIDGE_LOGO} alt={p.name} />
                <div className="hb-faculty-card__overlay" aria-hidden="true">
                  <div className="hb-faculty-card__overlayInner">
                    <div className="hb-faculty-card__name">{p.name}</div>
                    <div className="hb-faculty-card__spec">{p.specialization}</div>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={p.workplaceLogoUrl || HYBRIDGE_LOGO} alt="" className="hb-faculty-card__workLogo" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .hb-faculty-card {
          border: none;
          padding: 0;
          background: transparent;
          cursor: pointer;
          display: block;
          text-decoration: none;
        }

        .hb-faculty-card__media {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(0,0,0,0.15);
          aspect-ratio: 1 / 1;
        }

        .hb-faculty-card__avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.05) contrast(1.02);
        }

        .hb-faculty-card__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 180ms ease, transform 180ms ease;
          display: grid;
          place-items: center;
          padding: 14px;
        }

        .hb-faculty-card:hover .hb-faculty-card__overlay,
        .hb-faculty-card:focus-visible .hb-faculty-card__overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .hb-faculty-card__overlayInner {
          width: 100%;
          text-align: center;
          color: #fff;
        }

        .hb-faculty-card__name {
          font-weight: 900;
          color: #fff;
        }

        .hb-faculty-card__spec {
          margin-top: 6px;
          font-weight: 400;
          color: rgba(255,255,255,0.92);
        }

        .hb-faculty-card__workLogo {
          width: 54px;
          height: 54px;
          display: block;
          margin: 0 auto;
          object-fit: contain;
          filter: brightness(2);
        }

        @media (max-width: 1024px) {
          .hb-faculty-team__grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 768px) {
          .hb-faculty-team__grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }

        .hb-faculty-modalOverlay{
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 18px;
        }

        .hb-faculty-modal{
          width: 100%;
          max-width: 980px;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          color: #fff;
          padding: 18px;
        }

        .hb-faculty-modal__top{
          display: grid;
          grid-template-columns: 120px 1fr 36px;
          gap: 16px;
          align-items: center;
        }

        .hb-faculty-modal__avatarWrap{
          width: 110px;
          height: 110px;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255,255,255,0.06);
        }

        .hb-faculty-modal__avatar{
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hb-faculty-modal__name{
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.4rem;
          line-height: 1.1;
        }

        .hb-faculty-modal__spec{
          margin-top: 6px;
          color: rgba(255,255,255,0.92);
          font-weight: 500;
        }

        .hb-faculty-modal__linkedin{
          margin-top: 10px;
          display: inline-block;
          color: #0d0d0d;
          background: #E2F897;
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 800;
          text-decoration: none;
        }

        .hb-faculty-modal__linkedinPlaceholder{
          margin-top: 10px;
          display: inline-block;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px dashed rgba(226,248,151,0.5);
          color: rgba(255,255,255,0.85);
          font-weight: 700;
        }

        .hb-faculty-modal__close{
          width: 36px;
          height: 36px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.06);
          color: #fff;
          cursor: pointer;
          justify-self: end;
        }

        .hb-faculty-modal__grid{
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .hb-faculty-modal__label{
          font-weight: 900;
          color: rgba(255,255,255,0.9);
          margin-bottom: 8px;
        }

        .hb-faculty-modal__text{
          color: rgba(255,255,255,0.85);
          line-height: 1.6;
          white-space: pre-line;
        }

        .hb-faculty-modal__block{
          margin-top: 10px;
        }

        .hb-faculty-modal__list{
          margin: 0;
          padding-left: 18px;
          color: rgba(255,255,255,0.86);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hb-faculty-modal__top{ grid-template-columns: 88px 1fr 32px; }
          .hb-faculty-modal__avatarWrap{ width: 84px; height: 84px; }
          .hb-faculty-modal__grid{ grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

