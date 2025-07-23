import styles from './TikTokPlayerV1.module.scss';

interface TikTokPlayerV1Props {
  tiktokIdList: string[];
  control?: boolean;
}

function TikTokPlayerV1({ tiktokIdList, control = true }: TikTokPlayerV1Props) {
  const parameter = control ? '' : '?controls=0&progress_bar=0&play_button=0&volume_control=0&fullscreen_button=0&timestamp=0&rel=0&native_context_menu=0&closed_caption=0'
  return (
    <>
      {tiktokIdList.map((id) => {
        return (
          <div
            className={styles.tikTokPlayerV1}
            key={id}
          >
            <iframe
              src={`https://www.tiktok.com/player/v1/${id}${parameter}`}></iframe>
          </div>
        )
      })}
    </>
  )
}

export default TikTokPlayerV1