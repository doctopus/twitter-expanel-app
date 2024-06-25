import React from 'react';
import styles from './BentoGrid.module.scss';

const BentoGrid = ({ children, columns = 5, rows = 5 }) => {
    return (
        <div
            className={styles.bentoGrid}
            style={{
                '--grid-columns': columns,
                '--grid-rows': rows
            }}
        >
            {children}
        </div>
    );
};

const BentoItem = ({ children, width = 1, height = 1 }) => {
    return (
        <div
            className={styles.bentoItem}
            style={{
                gridColumn: `span ${width}`,
                gridRow: `span ${height}`
            }}
        >
            {children}
        </div>
    );
};

export { BentoGrid, BentoItem };