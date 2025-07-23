import { convertNewlineToBr } from '@/lib/utils/convertNewlineToBr';
import styles from './HeadInfo.module.scss';

interface HeadInfoProps {
  href: string;
  label: string;
  description?: string;
}

function HeadInfo({
  href,
  label,
  description = undefined
}: HeadInfoProps) {
  return (
    <div className={styles.headInfo}>
      <p className={styles.paragraph}>
        <a
          href={href}
          target='blank'
          className={styles.link}>
            <span className={styles.linkLabel}>{label}</span>
            <span className={styles.linkIcon}></span>
          </a>
      </p>
      {description && (
        <p className={styles.description}>
          {convertNewlineToBr(description)}
        </p>
      )}
    </div>
  )
}

export default HeadInfo