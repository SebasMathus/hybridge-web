import { EnrollmentForm } from '@/components/EnrollmentForm'

type Props = { block: any; locale: string }

export const FormBlockComponent = ({ block, locale }: Props) => {
  const form = block.form
  if (!form) return null
  const formData = typeof form === 'object' ? form : null
  if (!formData?.slug) return null

  return (
    <EnrollmentForm
      formSlug={formData.slug}
      title={formData.title || 'Formulario de inscripción'}
      showWhatsAppConsent={Boolean(formData.showWhatsAppConsent)}
      successMessage={formData.successMessage || 'Gracias. Nos pondremos en contacto contigo pronto.'}
      locale={locale}
    />
  )
}
