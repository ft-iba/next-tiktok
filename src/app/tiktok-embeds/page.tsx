import CarouselHorizon from '@/components/CarouselHorizon';
import HeadInfo from '@/components/HeadInfo';
import ScrollAttention from '@/components/ScrollAttention';
import TikTokEmbeds from '@/components/TikTokEmbeds';
import ViewportSection from '@/components/ViewportSection';
import styles from './TiktokEmbeds.module.scss';

const list = [
  'https://www.tiktok.com/@mynavi_corporate/video/7525697034704194823',
  'https://www.tiktok.com/@mynavi_corporate/video/7525696863836622088',
  'https://www.tiktok.com/@mynavi_corporate/video/7525696374466301192',
  'https://www.tiktok.com/@mynavi_corporate/video/7522812685919079700',
];

export default function Home() {
  return (
    <>
      <ViewportSection>
        <ScrollAttention />
      </ViewportSection>
      <ViewportSection>
        <div className={styles.tiktokEmbeds}>
          <HeadInfo
            href={'https://www.tiktok.com/embed'}
            label={'TikTok Embeds'}
            description={'見えたら読み込み完了後に再生開始される\n表示領域によって再生開始される・されないがある'}
          />
          <CarouselHorizon>
            <TikTokEmbeds tiktokUrls={list} />
          </CarouselHorizon>
        </div>
      </ViewportSection>
    </>
  );
}
