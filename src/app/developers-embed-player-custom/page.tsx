import CarouselHorizon from '@/components/CarouselHorizon';
import HeadInfo from '@/components/HeadInfo';
import ScrollAttention from '@/components/ScrollAttention';
import CarouselTikTok from '@/components/CarouselTikTok';
import ViewportSection from '@/components/ViewportSection';
import styles from './DevelopersEmbedPlayerCustom.module.scss';

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
        <div className={styles.developersEmbedPlayerCustom}>
          <HeadInfo
            href={'https://developers.tiktok.com/doc/embed-player'}
            label={'TikTok for developers | Embed Player'}
            description={'デフォルトの再生ボタンの上に円形の要素を被せて隠せば独自のボタン配置\n要素が見えたら指定の動画を再生\n再生中以外の動画をクリックしたらそれだけ再生'}
          />
          <CarouselTikTok postIds={list} />
          {/* <CarouselHorizon>
          </CarouselHorizon> */}
        </div>
      </ViewportSection>
    </>
  );
}
