const AccountInfoPanel: React.FC<AccountInfoProps> = ({ balance }) => {
  return (
      <div className="card">
          <div className="card-body">
              <h5 className="card-title">Баланс рахунку</h5>
              <p className="card-text">
                  <strong>Поточний баланс:</strong> {balance}
              </p>
              <button className="btn btn-success">Поповнити рахунок</button>
          </div>
      </div>
  );
};

export default AccountInfoPanel;