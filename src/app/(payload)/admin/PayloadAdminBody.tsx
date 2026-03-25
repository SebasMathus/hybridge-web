/**
 * Contenido del admin de Payload sin envolver en <html>/<body>:
 * el root `app/layout.tsx` ya define el documento. Evita HTML anidado que rompe el sitio y el panel.
 * Lógica alineada con @payloadcms/next/dist/layouts/Root/index.js (Payload 3.79.x).
 */
import { rtlLanguages } from '@payloadcms/translations'
import { ProgressBar, RootProvider } from '@payloadcms/ui'
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig'
import { cookies as nextCookies } from 'next/headers'
import { applyLocaleFiltering } from 'payload/shared'
import type { ImportMap, SanitizedConfig, ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'
import { getNavPrefs } from '@payloadcms-next-internals/elements/Nav/getNavPrefs.js'
import { NestProviders } from '@payloadcms-next-internals/layouts/Root/NestProviders.js'
import { checkDependencies } from '@payloadcms-next-internals/layouts/Root/checkDependencies.js'
import { initReq } from '@payloadcms-next-internals/utilities/initReq.js'
import { getRequestTheme } from '@payloadcms-next-internals/utilities/getRequestTheme.js'
import { SyncAdminDocument } from './SyncAdminDocument'

type Props = {
  children: ReactNode
  config: Promise<SanitizedConfig> | SanitizedConfig
  importMap: ImportMap
  serverFunction: ServerFunctionClient
}

export async function PayloadAdminBody({ children, config: configPromise, importMap, serverFunction }: Props) {
  checkDependencies()
  const {
    cookies,
    headers,
    languageCode,
    permissions,
    req,
    req: {
      payload: { config },
    },
  } = await initReq({
    configPromise,
    importMap,
    key: 'RootLayout',
  })

  const theme = getRequestTheme({ config, cookies, headers })
  const dir = (rtlLanguages as readonly string[]).includes(languageCode) ? 'RTL' : 'LTR'
  const languageOptions = Object.entries(config.i18n.supportedLanguages || {}).reduce(
    (acc, [language, languageConfig]) => {
      if (Object.keys(config.i18n.supportedLanguages).includes(language)) {
        acc.push({
          label: (languageConfig as { translations: { general: { thisLanguage: string } } }).translations
            .general.thisLanguage,
          value: language,
        })
      }
      return acc
    },
    [] as { label: string; value: string }[],
  )

  async function switchLanguageServerAction(lang: string) {
    'use server'
    const jar = await nextCookies()
    jar.set({
      name: `${config.cookiePrefix || 'payload'}-lng`,
      path: '/',
      value: lang,
    })
  }

  const navPrefs = await getNavPrefs(req)
  const clientConfig = getClientConfig({
    config,
    i18n: req.i18n,
    importMap,
    user: req.user,
  } as Parameters<typeof getClientConfig>[0])
  await applyLocaleFiltering({ clientConfig, config, req })

  const suppress = config?.admin?.suppressHydrationWarning ?? false

  return (
    <div
      data-theme={theme}
      dir={dir}
      lang={languageCode}
      suppressHydrationWarning={suppress}
      style={{ minHeight: '100%' }}
    >
      <SyncAdminDocument theme={theme} lang={languageCode} dir={dir} />
      <style>{`@layer payload-default, payload;`}</style>
      {/* Tipos estrictos de RootProvider vs null del request; runtime coincide con RootLayout de Payload. */}
      <RootProvider
        config={clientConfig}
        dateFNSKey={req.i18n.dateFNSKey}
        fallbackLang={config.i18n.fallbackLanguage}
        isNavOpen={navPrefs?.open ?? true}
        languageCode={languageCode}
        languageOptions={languageOptions as never}
        locale={req.locale ?? undefined}
        permissions={(req.user ? permissions : null) as never}
        serverFunction={serverFunction}
        switchLanguageServerAction={switchLanguageServerAction}
        theme={theme}
        translations={req.i18n.translations}
        user={req.user ?? null}
      >
        <ProgressBar />
        {Array.isArray(config.admin?.components?.providers) && config.admin!.components!.providers!.length > 0 ? (
          <NestProviders
            importMap={req.payload.importMap}
            providers={config.admin!.components!.providers!}
            serverProps={{
              i18n: req.i18n,
              payload: req.payload,
              permissions,
              user: req.user === null ? undefined : req.user,
            }}
          >
            {children}
          </NestProviders>
        ) : (
          children
        )}
      </RootProvider>
      <div id="portal" />
    </div>
  )
}
