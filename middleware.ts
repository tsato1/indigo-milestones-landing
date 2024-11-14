import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Matches paths except those with file extensions and "_next" assets
    "/",                           // Matches the root path
    "/(api|trpc)(.*)",             // Matches API and trpc paths
    "/(en|ja)/:path*",             // Matches internationalized paths for "en" and "ja"
  ],
};
