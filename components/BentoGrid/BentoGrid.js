import React from 'react';
import styles from './BentoGrid.module.scss';

const BentoGrid = ({ children }) => {
    return <div className={styles.bentoGrid}>{children}</div>;
};

const BentoItem = ({ children, width = 1, height = 1 }) => {
    return (
        <div className={`${styles.bentoItem} ${styles[`width-${width}`]} ${styles[`height-${height}`]}`}>
            {children}
        </div>
    );
};

export { BentoGrid, BentoItem };