import { SplitContentBlock } from '@/components/blocks/SplitContentBlock'

/** Contenido fijo (front) para Ingeniería en Software — misma UI que splitContent del CMS. */
const perfilIngresoBlock = {
  blockType: 'splitContent' as const,
  eyebrow: '',
  heading: 'PERFIL DE INGRESO',
  body:
    'Dirigido a personas innovadoras con pasión por la tecnología, formación en ingeniería, nuevas tecnologías y habilidades del futuro.\n\nEl/la estudiante de Hybridge:',
  bulletPoints: [
    { text: 'Busca la forma más flexible y disruptiva de estudiar Ingeniería.' },
    { text: 'Es curioso/a y busca aprender de la manera más innovadora posible.' },
    { text: 'Entiende que las cosas han cambiado y que los retos del futuro demandan una educación diferente.' },
    { text: 'Está interesado/a en dominar el mundo de la tecnología.' },
    { text: 'Cuenta con certificado de bachillerato.' },
    { text: 'Cuenta con lo necesario para hacer un programa en línea.' },
  ],
  buttons: [],
  image: null,
  imageUrl: null,
  imagePosition: 'left' as const,
  backgroundColor: 'cream' as const,
}

type Props = { locale: string }

export function PerfilIngresoSection({ locale }: Props) {
  return <SplitContentBlock block={perfilIngresoBlock} locale={locale} />
}
