import HeadInfo from '@/components/HeadInfo';
import ScrollAttention from '@/components/ScrollAttention';
import TikTokThumbnailsV2 from '@/components/TikTokThumbnailsV2';
import ViewportSection from '@/components/ViewportSection';
import styles from './OEmbedThumbDevelopersEmbedPlayerCustomV2.module.scss';

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
        <div className={styles.oEmbedThumbDevelopersEmbedPlayerCustomV2}>
          <HeadInfo
            href={'https://developers.tiktok.com/doc/embed-videos'}
            label={'TikTok for developers | Embed Player'}
            description={'Safariで待機画面が黒表示になるため、画像を取得して配置。\n親コンポーネントのカルーセルが見えたり動画領域クリックなりで動画埋め込みして再生開始させる\n同時に複数再生させない\n独自再生アイコン配置'}
          />
          <TikTokThumbnailsV2 />
        </div>
      </ViewportSection>
      <ViewportSection>
        <ScrollAttention />
      </ViewportSection>
    </>
  );
}
