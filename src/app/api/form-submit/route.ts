import { getPayloadClient } from '@/lib/payload'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      formSlug,
      sourceUrl,
      program,
      prepaYear,
      firstName,
      lastName,
      email,
      phone,
      age,
      state,
      howDidYouHear,
      message,
      privacyAccepted,
      whatsappConsent,
    } = body

    const isTodosPorProgramas = formSlug === 'todos-por-programas'

    if (
      !formSlug ||
      !sourceUrl ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      age == null ||
      !state ||
      !howDidYouHear ||
      !message ||
      !privacyAccepted ||
      (isTodosPorProgramas && (!program || !prepaYear))
    ) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
    }

    if (!whatsappConsent) {
      return NextResponse.json({ error: 'Debes aceptar el contacto por WhatsApp.' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    const forms = await payload.find({ collection: 'forms', where: { slug: { equals: formSlug } }, limit: 1 })
    const form = forms.docs[0]
    if (!form) {
      return NextResponse.json({ error: 'Formulario no encontrado.' }, { status: 400 })
    }

    await payload.create({
      collection: 'form-submissions',
      data: {
        form: form.id,
        sourceUrl: String(sourceUrl).trim(),
        program: program ? String(program).trim() : undefined,
        prepaYear: prepaYear ? String(prepaYear).trim() : undefined,
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        email: String(email).trim(),
        phone: String(phone).trim(),
        age: Number(age),
        state: String(state).trim(),
        howDidYouHear: String(howDidYouHear).trim(),
        message: String(message).trim(),
        privacyAccepted: Boolean(privacyAccepted),
        whatsappConsent: Boolean(whatsappConsent),
      },
    })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    console.error('form-submit error', e)
    return NextResponse.json({ error: e?.message || 'Error al enviar.' }, { status: 500 })
  }
}
