import React, { useState } from 'react';

const AccountInfoPanel: React.FC<AccountInfoProps> = ({ balance, account_number }) => {
    const [showModal, setShowModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleDeposit = () => {

    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Баланс рахунку</h5>
                <p className="card-text">
                    <strong>Поточний баланс:</strong> {balance}
                </p>
                <p className="card-text">
                    <strong>Номер рахунку:</strong> {account_number}
                </p>
                <button className="btn btn-success" onClick={handleClick}>Поповнити рахунок</button>
            </div>
            {showModal && (
                <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                        <h5 className="modal-title">Поповнення балансу</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={handleModalClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                            <div className="modal-body">
                                <div className="form-group mb-4">
                                    <label htmlFor="depositAmount">Сума:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="depositAmount"
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="paymentMethod">Спосіб оплати:</label>
                                    <select
                                        className="form-control"
                                        id="paymentMethod"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="">Оберіть спосіб оплати</option>
                                        <option value="card">Кредитна / дебетова картка</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="bankTransfer">Банківський переказ</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary" onClick={handleDeposit}>Поповнити</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountInfoPanel;
