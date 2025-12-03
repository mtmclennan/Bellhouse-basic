'use client';

import React from 'react';
import styles from './Reviews.module.scss';
import { Star } from '@phosphor-icons/react/dist/ssr';

interface Review {
  name: string;
  rating: number;
  text: string;
  source: string;
}

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>What Our Customers Say</h2>
        <p className={styles.subtext}>
          Real feedback from homeowners, builders, and contractors we’ve worked
          with.
        </p>

        <div className={styles.grid}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.stars}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={20} color="#ffc302" weight="fill" />
                ))}
              </div>

              <p className={styles.text}>{review.text}</p>

              <div className={styles.footer}>
                <span className={styles.name}>{review.name}</span>
                <span className={styles.source}>via {review.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
