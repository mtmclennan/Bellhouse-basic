'use client';

import { Switch } from '@headlessui/react';
import classes from './MetricImperialSwitch.module.scss';

type MetricImperialValue = 'metric' | 'imperial';

type MetricImperialSwitchProps = {
  label: string;
  value: MetricImperialValue;
  onChange: (value: MetricImperialValue) => void;
  metricLabel?: string;
  imperialLabel?: string;
  tone?: 'light' | 'dark';
  size?: 'default' | 'compact';
};

export function MetricImperialSwitch({
  label,
  value,
  onChange,
  metricLabel = 'Metric',
  imperialLabel = 'Imperial',
  tone = 'light',
  size = 'default',
}: MetricImperialSwitchProps) {
  const isImperial = value === 'imperial';

  return (
    <div
      className={`${classes.wrapper} ${
        tone === 'dark' ? classes.wrapperDark : ''
      } ${
        size === 'compact' ? classes.wrapperCompact : ''
      }`}
    >
      <span className={classes.label}>{label}</span>
      <div className={classes.row}>
        <span
          className={`${classes.optionLabel} ${
            !isImperial ? classes.optionLabelActive : ''
          }`}
        >
          {metricLabel}
        </span>
        <Switch
          checked={isImperial}
          onChange={(checked) => onChange(checked ? 'imperial' : 'metric')}
          className={classes.switch}
          aria-label={label}
        >
          <span className={classes.thumb} />
        </Switch>
        <span
          className={`${classes.optionLabel} ${
            isImperial ? classes.optionLabelActive : ''
          }`}
        >
          {imperialLabel}
        </span>
      </div>
    </div>
  );
}
