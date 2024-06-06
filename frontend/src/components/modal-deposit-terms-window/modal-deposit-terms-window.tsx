import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DepositTermsModalProps {
  show: boolean;
  onHide: () => void;
  onAccept: () => void;
}

const DepositTermsModal: React.FC<DepositTermsModalProps> = ({ show, onHide, onAccept }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Умови відкриття депозиту</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Дякуємо за вибір нашого банку для відкриття депозиту. Перед тим, як
          продовжити, будь ласка, ознайомтесь з умовами відкриття депозиту:
        </p>
        <ul>
          <li>
            <strong>Процентна ставка:</strong> Процентна ставка по депозиту
            складає 15% річних.
          </li>
          <li>
            <strong>Мінімальна сума депозиту:</strong> Мінімальна сума депозиту
            становить 1 000 євро.
          </li>
          <li>
            <strong>Максимальний термін депозиту:</strong> Депозит може бути
            відкритий на термін до 60 місяців.
          </li>
          <li>
            <strong>Податок:</strong> Проценти по депозиту оподатковуються за
            ставкою 12.07%.
          </li>
          <li>
            <strong>Дострокове закриття:</strong> Дострокове закриття депозиту
            можливе з утриманням штрафних санкцій.
          </li>
          <li>
            <strong>Періодичність нарахування відсотків:</strong> Відсотки по
            депозиту нараховуються щомісяця.
          </li>
          <li>
            <strong>Поповнення:</strong> Можливість поповнення депозиту
            обговорюється індивідуально.
          </li>
          <li>
            <strong>Виплата відсотків:</strong> Відсотки виплачуються в кінці
            терміну депозиту або щомісяця, за вибором клієнта.
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Відхилити
        </Button>
        <Button variant="primary" onClick={onAccept}>
          Прийняти умови
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepositTermsModal;
