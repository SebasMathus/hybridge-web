import React from 'react'

type ProgramKey = 'preparatoria' | 'ingenieria-en-software'

type FacultyPerson = {
  slug: string
  name: string
  title: string
  expertise: string
  workplaceLogoUrl?: string
  avatarUrl?: string
}

const HYBRIDGE_LOGO = '/Logo_blanco.png'

const DEFAULT_TITLE = 'Docente'
const DEFAULT_EXPERTISE = 'Especialidad por confirmar'

const PREPA_ALL: FacultyPerson[] = [
  {
    slug: 'nora-smith',
    name: 'Nora Smith',
    title: 'Directora de Preparatoria',
    expertise: 'Inglés',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/Imagenhy-nora-smith-bk-24.jpg',
  },
  {
    slug: 'vania-banuelos',
    name: 'Vania Bañuelos',
    title: 'Coordinadora Académica',
    expertise: 'Humanidades',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-vania-banuelos-ft-24.png',
  },
  {
    slug: 'marcela-valadez',
    name: 'Marcela Valadez',
    title: 'Mentora',
    expertise: 'Humanidades',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-marcela-villegas-ft-ft24.jpg',
  },
  {
    slug: 'david-llanes',
    name: 'David Llanes',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2023/08/Imagen-David.jpg',
  },
  {
    slug: 'ximena-pinacho',
    name: 'Ximena Pinacho',
    title: 'Mentora',
    expertise: 'Ciencias',
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2025/02/ximena_pinacho.png',
  },
  {
    slug: 'gabriel-arrechea',
    name: 'Gabriel Arrechea',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2023/09/Gabriel-Arrechea-hy.jpg',
  },
  {
    slug: 'gabriel-andrade',
    name: 'Gabriel Andrade',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2023/09/Gabriel-Andrade-hy.jpg',
  },
  {
    slug: 'diego-preza',
    name: 'Diego Preza',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-diego-preza.png',
  },
  {
    slug: 'raul-baltazar',
    name: 'Raúl Baltazar',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-raul-baltazar.png',
  },
  {
    slug: 'jesus-melgar',
    name: 'Jesús Melgar',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-jesus-melgar.png',
  },
  {
    slug: 'jimena-fuentes',
    name: 'Jimena Fuentes',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-jimena-fuentes.png',
  },
  {
    slug: 'sofia-ardura',
    name: 'Sofía Ardura',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/10/hy-sofia-ardura.png',
  },
  {
    slug: 'alvaro-toledo',
    name: 'Álvaro Toledo',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/09/Alvaro.jpg',
  },
]

const SW_ALL: FacultyPerson[] = [
  {
    slug: 'pedro-balbuena',
    name: 'Pedro Balbuena',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-pedro-ft-24.jpg',
  },
  {
    slug: 'sahori-solana',
    name: 'Sahori Solana',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-sahori-ft-24.jpg',
  },
  {
    slug: 'alberto-preciado',
    name: 'Alberto Preciado',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-alberto-ft-24.jpg',
  },
  {
    slug: 'sebastian-mathus',
    name: 'Sebastián Mathus',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-sebastian-mathus-ft-24.jpg',
  },
  {
    slug: 'martin-mathus',
    name: 'Martín Mathus',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-martin-mathus-ft-24.jpg',
  },
  {
    slug: 'fernanda-arriaga',
    name: 'Fernanda Arriaga',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-fernanda-ft-24.jpg',
  },
  {
    slug: 'daniela-anaya',
    name: 'Daniela Anaya',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-daniela-ft-24.jpg',
  },
  {
    slug: 'jose-esteva',
    name: 'José Esteva',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-jose-ft-24.jpg',
  },
  {
    slug: 'gerardo-mathus',
    name: 'Gerardo Mathus',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ing-gerardo-mathus-ft-24.jpg',
  },
  {
    slug: 'ivan-martinez',
    name: 'Iván Martínez',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-ivan-martinez-ft-24.jpg',
  },
  {
    slug: 'maria-fernanda-mariscal',
    name: 'María Fernanda Mariscal',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2023/08/Imagenmaria.jpg',
  },
  {
    slug: 'maria-ayala',
    name: 'María Ayala',
    title: DEFAULT_TITLE,
    expertise: DEFAULT_EXPERTISE,
    avatarUrl: 'https://hybridge.education/wp-content/uploads/2024/02/hy-7-ft-24.jpg',
  },
]

export function FacultyTeamSection({ program }: { program: ProgramKey }) {
  const people = program === 'preparatoria' ? PREPA_ALL : SW_ALL
  const sectionId = program === 'preparatoria' ? 'equipo-docente-prepa' : 'equipo-docente-sw'

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

        <div id={sectionId} className="hb-faculty-team__allWrap" style={{ scrollMarginTop: '90px' }}>
          <div className="hb-faculty-team__allHeader" style={{ textAlign: 'center', marginBottom: '18px' }}>
            <p style={{ color: 'var(--color-hb-text)', fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>TODO EL PERSONAL</p>
          </div>

          <div className="hb-faculty-team__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '18px' }}>
            {people.map((p) => (
            <a key={p.slug} className="hb-faculty-card" href={`#${sectionId}`} aria-label={`Ver ${p.name}`}>
              <div className="hb-faculty-card__media">
                <img className="hb-faculty-card__avatar" src={p.avatarUrl || HYBRIDGE_LOGO} alt={p.name} />
                <div className="hb-faculty-card__overlay" aria-hidden="true">
                  <div className="hb-faculty-card__overlayInner">
                    <div className="hb-faculty-card__row">
                      <div style={{ color: '#fff', fontWeight: 900 }}>{p.name}</div>
                    </div>
                    <div className="hb-faculty-card__meta" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      <div style={{ marginTop: 6, color: '#fff', fontWeight: 400 }}>{p.expertise}</div>
                      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={p.workplaceLogoUrl || HYBRIDGE_LOGO} alt="" className="hb-faculty-card__workLogo" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
          </div>
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

        .hb-faculty-card:hover .hb-faculty-card__overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .hb-faculty-card__overlay--static {
          opacity: 1;
          transform: translateY(0);
          background: rgba(0,0,0,0.55);
        }

        .hb-faculty-card__overlayInner {
          width: 100%;
          text-align: center;
        }

        .hb-faculty-card__workLogo {
          width: 54px;
          height: 54px;
          display: block;
          margin: 0 auto;
          object-fit: contain;
          filter: brightness(2);
        }

        @media (max-width: 768px) {
          .hb-faculty-team__grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </section>
  )
}

