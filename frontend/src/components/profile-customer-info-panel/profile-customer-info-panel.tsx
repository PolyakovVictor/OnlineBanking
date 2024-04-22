import React, { useState } from 'react';

const CustomerInfoPanel: React.FC<ProfileCustomerInfoPanel> = ({
  first_name,
  last_name,
  email,
  phone_number,
}) => {
  return (
    <>
    <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Особиста інформація</h5>
            <p className="card-text">
              <strong>Ім'я:</strong> {first_name} + {last_name}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {email}
            </p>
            <p className="card-text">
              <strong>Телефон:</strong> {phone_number}
            </p>
            <button className="btn btn-primary">Змінити інформацію</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerInfoPanel;