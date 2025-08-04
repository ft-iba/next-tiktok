import Link from 'next/link';
import styles from './page.module.scss';

interface Toc {
  path: string;
  label: string;
}

const tocList: Toc[] = [
  {
    path: 'tiktok-embeds',
    label: 'TikTok Embeds',
  },
  {
    path: 'developers-embed-player',
    label: 'TikTok for developers | Embed Player',
  },
  {
    path: 'developers-embed-player-custom',
    label: 'TikTok for developers | Embed Player - jsカスタマイズ',
  },
  {
    path: 'oembed-thumb-developers-embed-player-custom',
    label: 'oembed でサムネイル取得 - TikTok for developers | Embed Player - jsカスタマイズ',
  },
  {
    path: 'oembed-thumb-developers-embed-player-custom-v2',
    label: 'oembed でサムネイル取得 - TikTok for developers | Embed Player - jsカスタマイズ V2',
  },
]

export default function Home() {
  return (
    <div className={styles.home}>
      <ul className={styles.list}>
        {tocList.map(({ path, label }) => {
          return (
            <li
              className={styles.item}
              key={path}
            >
              <Link
                className={styles.link}
                href={`/${path}`}
              >{ label}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
