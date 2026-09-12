import fs from 'fs';
import path from 'path';

export function generateStaticParams() {
  return [
    { slug: ['neozen-portfolio-framer-template'] },
    { slug: ['reelio-photography-film-studio-framer-template'] },
    { slug: ['licensing'] },
    { slug: ['sign-up'] },
    { slug: ['forgot-password'] },
    { slug: ['404'] },
    { slug: ['legal', 'privacy-policy'] },
    { slug: ['legal', 'cookie-policy'] },
  ];
}

export default async function SubPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  await params;
  const subpagePath = path.join(process.cwd(), 'data', 'subpage.html');
  const subpageHtml = fs.readFileSync(subpagePath, 'utf8');

  return (
    <div
      id="cohesion-subpage-root"
      suppressHydrationWarning={true}
      style={{ display: 'contents' }}
      dangerouslySetInnerHTML={{ __html: subpageHtml }}
    />
  );
}
