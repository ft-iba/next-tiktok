import HeadInfo from '@/components/HeadInfo';
import ScrollAttention from '@/components/ScrollAttention';
import TikTokThumbnails from '@/components/TikTokThumbnails';
import ViewportSection from '@/components/ViewportSection';
import styles from './OEmbedThumbDevelopersEmbedPlayerCustom.module.scss';

// const list = [
//   '7525697034704194823',
//   '7525696863836622088',
//   '7525696374466301192',
//   '7522812685919079700',
// ];

export default function Page() {
  return (
    <>
      <ViewportSection>
        <ScrollAttention />
      </ViewportSection>
      <ViewportSection>
        <div className={styles.oEmbedThumbDevelopersEmbedPlayerCustom}>
          <HeadInfo
            href={'https://developers.tiktok.com/doc/embed-videos'}
            label={'TikTok for developers | Embed Player'}
            description={'Safariで待機画面が黒表示になるため、画像を取得して配置。\n親コンポーネントのカルーセルが見えたり動画領域クリックなりで動画埋め込みして再生開始させる\n動画クリックで一時停止・再生のトグル\n同時に複数再生させない\n独自再生アイコン配置'}
          />
          <TikTokThumbnails />
        </div>
      </ViewportSection>
      <ViewportSection>
        <ScrollAttention />
      </ViewportSection>
    </>
  );
}
