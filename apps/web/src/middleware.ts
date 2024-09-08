import { type NextRequest, NextResponse } from 'next/server';
import urlJoin from 'url-join';
import { getSubDomains } from './actions/blog';

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  const [subDomain] = hostname.split('.');
  const subDomains = await getSubDomains();

  if (subDomains.includes(subDomain)) {
    return NextResponse.rewrite(new URL(`/${urlJoin(subDomain, url.pathname)}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
