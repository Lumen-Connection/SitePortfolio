import { NextRequest, NextResponse } from 'next/server'

type AppKey = 'lumen-music' | 'lumen-chat'

type AppConfig = {
  owner: string
  repo: string
  pickAsset: (assetNames: string[]) => string | undefined
}

const APPS: Record<AppKey, AppConfig> = {
  'lumen-music': {
    owner: 'Lumen-Connection',
    repo: 'lumen-music',
    pickAsset: (names) =>
      names.find((n) => /setup.*\.exe$/i.test(n)) ??
      names.find((n) => /\.exe$/i.test(n)) ??
      names.find((n) => /\.zip$/i.test(n)),
  },
  'lumen-chat': {
    owner: 'Lumen-Connection',
    repo: 'lumenchat',
    pickAsset: (names) =>
      names.find((n) => /setup.*\.exe$/i.test(n)) ??
      names.find((n) => /\.exe$/i.test(n)) ??
      names.find((n) => /\.7z$/i.test(n)) ??
      names.find((n) => /\.zip$/i.test(n)),
  },
}

export const revalidate = 600

type GithubAsset = { name: string; browser_download_url: string }

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ app: string }> },
) {
  const { app } = await context.params
  const config = APPS[app as AppKey]

  if (!config) {
    return NextResponse.json({ error: 'Unknown app' }, { status: 404 })
  }

  const releasesPage = `https://github.com/${config.owner}/${config.repo}/releases/latest`

  try {
    const githubHeaders: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'lumen-connection-site',
    }
    const token = process.env.GITHUB_TOKEN
    if (token) {
      ;(githubHeaders as Record<string, string>).Authorization = `Bearer ${token}`
    }

    const res = await fetch(
      `https://api.github.com/repos/${config.owner}/${config.repo}/releases/latest`,
      {
        headers: githubHeaders,
        next: { revalidate: 600 },
      },
    )

    if (!res.ok) {
      return NextResponse.redirect(releasesPage, 302)
    }

    const data = (await res.json()) as { assets?: GithubAsset[] }
    const assets = data.assets ?? []
    const assetNames = assets.map((a) => a.name)
    const targetName = config.pickAsset(assetNames)

    if (!targetName) {
      return NextResponse.redirect(releasesPage, 302)
    }

    const asset = assets.find((a) => a.name === targetName)
    if (!asset?.browser_download_url) {
      return NextResponse.redirect(releasesPage, 302)
    }

    return NextResponse.redirect(asset.browser_download_url, 302)
  } catch {
    return NextResponse.redirect(releasesPage, 302)
  }
}
