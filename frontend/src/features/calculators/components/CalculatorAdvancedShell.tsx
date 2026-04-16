'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import type { PropsWithChildren } from 'react';
import type { CalculatorAdvancedShellModel } from '../hooks/calculatorController.types';
import classes from './CalculatorForm.module.scss';

type CalculatorAdvancedShellProps = PropsWithChildren<{
  shell: CalculatorAdvancedShellModel;
}>;

export function CalculatorAdvancedShell({
  shell,
  children,
}: CalculatorAdvancedShellProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={classes.advancedSection}>
          <div className={classes.advancedTriggerRow}>
            <DisclosureButton className={classes.advancedTrigger}>
              <div className={classes.advancedTriggerCopy}>
                <span className={classes.fieldGroupLabel}>{shell.title}</span>
                <p className={classes.advancedTriggerNote}>{shell.note}</p>
              </div>
              <CaretDown
                size={18}
                weight="bold"
                className={`${classes.advancedTriggerIcon} ${
                  open ? classes.advancedTriggerIconOpen : ''
                }`}
              />
            </DisclosureButton>

            <label className={classes.advancedSwitch}>
              <input
                type="checkbox"
                checked={shell.toggle.enabled}
                onChange={(e) => shell.toggle.onChange(e.target.checked)}
              />
              <span>{shell.toggle.label}</span>
            </label>
          </div>

          <DisclosurePanel className={classes.advancedPanel}>
            {children}
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
