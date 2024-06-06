import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface TermsModalProps {
  show: boolean;
  onHide: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ show, onHide, onAccept }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Умови оформлення кредиту</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Дякуємо за вибір нашого банку для оформлення кредиту. Перед тим, як
          продовжити, будь ласка, ознайомтесь з умовами надання кредиту:
        </p>
        <ul>
          <li>
            <strong>Процентна ставка:</strong> Процентна ставка по кредиту
            складає 8% річних.
          </li>
          <li>
            <strong>Термін кредиту:</strong> Кредит може бути оформлений на
            термін від 1 до 30 років.
          </li>
          <li>
            <strong>Мінімальна сума кредиту:</strong> Мінімальна сума кредиту
            становить 1000 євро.
          </li>
          <li>
            <strong>Максимальна сума кредиту:</strong> Максимальна сума кредиту
            становить 100 000 євро.
          </li>
          <li>
            <strong>Щомісячний платіж:</strong> Щомісячний платіж розраховується
            на основі суми кредиту, терміну кредиту та процентної ставки.
          </li>
          <li>
            <strong>Пеня за прострочення платежу:</strong> У разі прострочення
            платежу стягується пеня у розмірі 0.1% від суми простроченого
            платежу за кожен день прострочення.
          </li>
          <li>
            <strong>Дострокове погашення:</strong> Ви можете здійснити дострокове
            погашення кредиту без додаткових комісій.
          </li>
          <li>
            <strong>Страхування:</strong> Для оформлення кредиту необхідно
            мати дійсну страховку на випадок непередбачених обставин.
          </li>
          <li>
            <strong>Документи:</strong> Для оформлення кредиту необхідно
            надати паспорт та ідентифікаційний код.
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

export default TermsModal;
