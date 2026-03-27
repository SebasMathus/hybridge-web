'use client'

import { useState } from 'react'
import { ESTADOS, COMO_TE_ENTERASTE } from '@/lib/form-options'
import Link from 'next/link'

const PROGRAM_OPTIONS = [
  { label: 'Preparatoria', value: 'preparatoria' },
  { label: 'Ingeniería en Software', value: 'ingenieria-en-software' },
  { label: 'Ingeniería en Inteligencia Artificial', value: 'ingenieria-en-inteligencia-artificial' },
  { label: 'Ingeniería en Videojuegos', value: 'ingenieria-en-videojuegos' },
  { label: 'Licenciatura en Administración e Innovación', value: 'licenciatura-en-administracion-e-innovacion' },
  { label: 'Licenciatura en Mercadotecnia', value: 'licenciatura-en-mercadotecnia' },
] as const

const PREPA_YEAR_OPTIONS = (() => {
  const years = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => String(2026 - i))
  return ['Aun no termino', ...years, 'Previo a 1990'] as const
})()

type Props = {
  locale?: string
  /** Ancla para CTAs que enlazan al formulario (p. ej. landings de alianza). */
  sectionAnchorId?: string
}

const initial = {
  program: '',
  prepaYear: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  state: '',
  howDidYouHear: '',
  message: '',
  privacyAccepted: false,
  whatsappConsent: false,
}

export function TodosPorProgramasForm({ locale = 'es', sectionAnchorId }: Props) {
  const [data, setData] = useState(initial)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSlug: 'todos-por-programas',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          ...data,
          age: Number(data.age) || undefined,
        }),
      })

      const json = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(json.error || 'Error al enviar')
        return
      }

      setStatus('success')
      setData(initial)
    } catch {
      setStatus('error')
      setErrorMsg('Error de conexión')
    }
  }

  const formId = 'form-todos-por-programas'
  const sectionId = sectionAnchorId?.trim() || formId
  const creamBg = 'var(--color-hb-bg-alt)'

  if (status === 'success') {
    return (
      <section id={sectionId} className="section-pad" style={{ background: creamBg }}>
        <div className="container-hb" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.75rem', color: 'var(--color-hb-text)', marginBottom: '4px' }}>
            ¡Inscríbete ya!
          </h2>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.1rem', color: 'var(--color-hb-text)', marginBottom: '16px' }}>
            Todos por programas
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-hb-text)', fontWeight: 400 }}>
            Gracias. Nos pondremos en contacto contigo pronto.
          </p>
        </div>
      </section>
    )
  }

  const inputStyle = { width: '100%', padding: '12px 14px', border: '1px solid var(--color-hb-border)', borderRadius: '8px', fontSize: '1rem', background: '#fff' }

  return (
    <section id={sectionId} className="section-pad" style={{ background: creamBg }}>
      <div className="container-hb" style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.75rem', color: 'var(--color-hb-text)', marginBottom: '4px' }}>
            ¡Inscríbete ya!
          </h2>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.1rem', color: 'var(--color-hb-text)' }}>Todos por programas</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="program" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
              Programa
            </label>
            <select id="program" name="program" required value={data.program} onChange={handleChange} style={inputStyle}>
              <option value="">Selecciona el programa</option>
              {PROGRAM_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="prepaYear" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
              ¿En qué año terminaste la prepa?
            </label>
            <select id="prepaYear" name="prepaYear" required value={data.prepaYear} onChange={handleChange} style={inputStyle}>
              <option value="">Selecciona una opción</option>
              {PREPA_YEAR_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label htmlFor="firstName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
                Nombre
              </label>
              <input id="firstName" name="firstName" type="text" required value={data.firstName} onChange={handleChange} placeholder="Ej. María" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="lastName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
                Apellido
              </label>
              <input id="lastName" name="lastName" type="text" required value={data.lastName} onChange={handleChange} placeholder="Ej. García" style={inputStyle} />
            </div>
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
              Correo
            </label>
            <input id="email" name="email" type="email" required value={data.email} onChange={handleChange} placeholder="ejemplo@correo.com" style={inputStyle} />
          </div>

          <div>
            <label htmlFor="phone" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
              Teléfono
            </label>
            <input id="phone" name="phone" type="tel" required value={data.phone} onChange={handleChange} placeholder="Ej. 55 1234 5678" style={inputStyle} />
          </div>

          <div>
            <label htmlFor="age" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
              Edad
            </label>
            <select id="age" name="age" required value={data.age} onChange={handleChange} style={inputStyle}>
              <option value="">Selecciona tu edad</option>
              {Array.from({ length: 52 }, (_, i) => 14 + i).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
              <option value={66}>+65 años</option>
            </select>
          </div>

          <div>
            <label htmlFor="state" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
              Estado
            </label>
            <select id="state" name="state" required value={data.state} onChange={handleChange} style={inputStyle}>
              <option value="">Selecciona tu estado</option>
              {ESTADOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="howDidYouHear" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
              Como te enteraste de hybridge
            </label>
            <select id="howDidYouHear" name="howDidYouHear" required value={data.howDidYouHear} onChange={handleChange} style={inputStyle}>
              <option value="">Selecciona una opción</option>
              {COMO_TE_ENTERASTE.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '6px' }}>
              Cuéntanos por qué te interesa ingresar a este programa (mín. 80 caracteres)
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={80}
              value={data.message}
              onChange={handleChange}
              placeholder="Escribe aquí por qué te interesa este programa (mínimo 80 caracteres)…"
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' as const }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" name="privacyAccepted" required checked={data.privacyAccepted} onChange={handleChange} style={{ marginTop: '4px' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--color-hb-text)' }}>
                He leído <Link href={`/${locale}/aviso-de-privacidad`} style={{ color: 'var(--color-hb-text)', textDecoration: 'underline' }}>aviso de privacidad</Link>
              </span>
            </label>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" name="whatsappConsent" required checked={data.whatsappConsent} onChange={handleChange} style={{ marginTop: '4px' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--color-hb-text)' }}>Acepto que hybridge me contacte por whatsapp</span>
            </label>
          </div>

          {errorMsg && <p style={{ color: '#b91c1c', fontSize: '0.9rem' }}>{errorMsg}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '14px 28px',
              background: 'var(--color-hb-black)',
              color: '#fff',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              borderRadius: '9999px',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
            }}
          >
            {status === 'loading' ? 'Enviando…' : 'Enviar'}
          </button>
        </form>
      </div>
    </section>
  )
}

