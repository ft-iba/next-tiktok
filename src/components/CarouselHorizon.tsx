import styles from './CarouselHorizon.module.scss';

interface CarouselHorizonProps {
  children: React.ReactNode;
}

function CarouselHorizon({ children }: CarouselHorizonProps) {
  return (
    <div className={styles.carouselHorizon}>
      <div className={styles.list}>
        {children}
      </div>
    </div>
  )
}

export default CarouselHorizon