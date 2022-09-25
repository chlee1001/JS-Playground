import React from 'react';
import { CSSTransition } from 'react-transition-group';

import styled from 'styled-components';

import Portal from '@components/Portal';

import styles from './modal.module.css';

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  max-width: 456px;
  position: relative;
  width: 100%;
`;

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  selector?: string;
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose, selector }) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enterActive: styles.ModalEnterActive,
        enterDone: styles.ModalEnterDone,
        exitActive: styles.ModalExitActive,
        exitDone: styles.ModalExitDone,
      }}
      unmountOnExit
    >
      <Portal selector={selector}>
        <Overlay>
          <Dim onClick={onClose} />
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
