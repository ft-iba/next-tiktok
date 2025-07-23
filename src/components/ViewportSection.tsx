import styles from './ViewportSection.module.scss';

interface ViewportSectionProps {
  children: React.ReactNode;
}

function ViewportSection({ children }: ViewportSectionProps) {
  return (
    <div className={styles.viewportSection}>
      {children}
    </div>
  )
}

export default ViewportSection