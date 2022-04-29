import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Favorites = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = location.state;
  const displayDetails = (data) => {
    navigate(`/bank-details/${data.ifsc}`, {
      state: {
        ifsc: data.ifsc,
        bank_name: data.bank_name,
        branch: data.branch,
        address: data.address,
        bank_id: data.bank_id,
        city: data.city,
        district: data.district,
        state: data.state,
      },
    });
  };
  return (
    <div className="main">
      <div className="filters">
        <div className="title">Favorites Banks</div>
      </div>
      {favorites?.length ? (
        <table>
          <thead>
            <tr>
              <th>Bank</th>
              <th>IFSC</th>
              <th>Branch</th>
              <th>Bank ID</th>
              <th className="address-cell">Address</th>
            </tr>
          </thead>
          <tbody>
            {favorites?.map((data) => {
              return (
                <tr key={data.ifsc}>
                  <td>{data.bank_name} </td>
                  <td onClick={() => displayDetails(data)} className="fsc-code">
                    {" "}
                    {data.ifsc}
                  </td>

                  <td>{data.branch}</td>
                  <td>{data.bank_id}</td>
                  <td className="address-cell">{data.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="no-favourits">No favourite items</div>
      )}

      <div className="pagination"></div>
    </div>
  );
};

export default Favorites;
