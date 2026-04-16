import type { CSSProperties } from 'react';
import Link from 'next/link';
import { calculatorConfigs } from '../config/calculators';
import {
  calculatorResourceCards,
  type CalculatorResourceCard,
} from '../config/resourceCards';
import classes from './CalculatorResourceCardGrid.module.scss';

type CalculatorResourceCardGridProps = {
  cards?: readonly CalculatorResourceCard[];
};

export function CalculatorResourceCardGrid({
  cards = calculatorResourceCards,
}: CalculatorResourceCardGridProps) {
  return (
    <div className={classes.cardGrid}>
      {cards.map((card) => {
        const cardStyle = {
          ['--card-image' as const]: `url("${card.imageSrc}")`,
        } as CSSProperties;

        return (
          <article className={classes.card} key={card.slug} style={cardStyle}>
            <div className={classes.cardHeader}>
              <span className={classes.cardIcon}>{card.icon}</span>
              <span className={classes.cardMeta}>{card.meta}</span>
            </div>
            <h3>{calculatorConfigs[card.slug].title}</h3>
            <p className={classes.cardLead}>{card.blurb}</p>
            <div className={classes.cardDetails}>
              <p className={classes.cardDetail}>
                <span className={classes.detailLabel}>Estimates:</span>{' '}
                {card.whatItEstimates}
              </p>
              <p className={classes.cardDetail}>
                <span className={classes.detailLabel}>Best for:</span>{' '}
                {card.whoItsFor}
              </p>
            </div>
            <div
              className={classes.outputList}
              aria-label={`${calculatorConfigs[card.slug].title} outputs`}
            >
              {card.outputs.map((output) => (
                <span className={classes.outputChip} key={output}>
                  {output}
                </span>
              ))}
            </div>
            <div className={classes.cardActions}>
              <Link className={classes.cardPrimaryLink} href={card.href}>
                Open Calculator
              </Link>
              <Link className={classes.cardSecondaryLink} href={card.serviceHref}>
                {card.serviceLabel}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
