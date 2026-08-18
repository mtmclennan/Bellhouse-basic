'use client';

import ReactDOM from 'react-dom';
import React, { Fragment, useEffect, useRef } from 'react';
import classes from './Modal.module.scss';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Backdrop = ({ onClose }: { onClose: () => void }) => {
  return (
    <div onClick={onClose} className={classes.backdrop}>
      <div className={classes.closeTop}></div>
      <div className={classes.closeBottom}></div>
    </div>
  );
};

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const modalEl = modalRef.current;

    const focusables = modalEl?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusables?.[0] ?? modalEl)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalEl) return;

      const nodes = Array.from(
        modalEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <Fragment>
      <Backdrop onClose={onClose}></Backdrop>
      <div
        className={classes.modal}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={modalRef}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Modal;
