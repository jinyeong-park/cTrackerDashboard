import React from 'react';
import './styles/Table.css';

function Table({ countries }) {

  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <string>{cases}</string>
            </td>
        </tr>
      ))}
    </div>

  );
}

export default Table;