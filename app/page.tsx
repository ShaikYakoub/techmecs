import fs from 'fs';
import path from 'path';

export default function HomePage() {
  const homePath = path.join(process.cwd(), 'data', 'home.html');
  const homeHtml = fs.readFileSync(homePath, 'utf8');

  return (
    <div
      id="cohesion-page-root"
      suppressHydrationWarning={true}
      style={{ display: 'contents' }}
      dangerouslySetInnerHTML={{ __html: homeHtml }}
    />
  );
}
