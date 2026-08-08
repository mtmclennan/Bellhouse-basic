'use client';

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
  return (
    <div
      className={`${classes.wrapper} ${
        tone === 'dark' ? classes.wrapperDark : ''
      } ${
        size === 'compact' ? classes.wrapperCompact : ''
      }`}
      role="group"
      aria-label={label}
    >
      <span className={classes.label}>{label}</span>
      <div className={classes.row}>
        <button
          type="button"
          className={`${classes.optionButton} ${
            value === 'metric' ? classes.optionButtonActive : ''
          }`}
          onClick={() => onChange('metric')}
          aria-pressed={value === 'metric'}
        >
          {metricLabel}
        </button>
        <button
          type="button"
          className={`${classes.optionButton} ${
            value === 'imperial' ? classes.optionButtonActive : ''
          }`}
          onClick={() => onChange('imperial')}
          aria-pressed={value === 'imperial'}
        >
          {imperialLabel}
        </button>
      </div>
    </div>
  );
}
