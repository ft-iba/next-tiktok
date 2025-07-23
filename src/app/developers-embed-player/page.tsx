import CarouselHorizon from '@/components/CarouselHorizon';
import HeadInfo from '@/components/HeadInfo';
import ScrollAttention from '@/components/ScrollAttention';
import TikTokPlayerV1 from '@/components/TikTokPlayerV1';
import ViewportSection from '@/components/ViewportSection';
import styles from './DevelopersEmbedPlayer.module.scss';

const list = [
  '7525697034704194823',
  '7525696863836622088',
  '7525696374466301192',
  '7522812685919079700',
];

export default function Home() {
  return (
    <>
      <ViewportSection>
        <ScrollAttention />
      </ViewportSection>
      <ViewportSection>
        <div className={styles.developersEmbedPlayer}>
          <HeadInfo
            href={'https://developers.tiktok.com/doc/embed-player'}
            label={'TikTok for developers | Embed Player'}
            description={'TikTok Embeds と比べて表示要素が少ない\n自動で再生しない'}
          />
          <CarouselHorizon>
            <TikTokPlayerV1 tiktokIdList={list} />
          </CarouselHorizon>
        </div>
      </ViewportSection>
    </>
  );
}
