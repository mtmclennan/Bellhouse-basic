'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useRef, type PropsWithChildren } from 'react';
import type { CalculatorAdvancedShellModel } from '../hooks/calculatorController.types';
import classes from './CalculatorForm.module.scss';

type CalculatorAdvancedShellProps = PropsWithChildren<{
  shell: CalculatorAdvancedShellModel;
}>;

type AdvancedOpenTrackerProps = {
  open: boolean;
  onOpen?: () => void;
};

/** Fires onOpen only on the closed -> open transition, never on close. */
function AdvancedOpenTracker({ open, onOpen }: AdvancedOpenTrackerProps) {
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      onOpen?.();
    }

    wasOpenRef.current = open;
  }, [open, onOpen]);

  return null;
}

export function CalculatorAdvancedShell({
  shell,
  children,
}: CalculatorAdvancedShellProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={classes.advancedSection}>
          <AdvancedOpenTracker open={open} onOpen={shell.onOpen} />
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
