import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const Bank = () => {
  const navigate = useNavigate();
  const [rowPerPage, setRowPerPage] = useState("10");
  const [bankDetailsData, setBankDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownCategory, setDropdownCategory] = useState("");
  const [dropdownCity, setDropDownCity] = useState('BANGLORE');
  const serachRef = useRef("");
  const [bankDetailsCopyData, setBankDetailsCopyData] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("fav-Item")) || []
  );
  const [currentpageNo, setCurrentPageNo] = useState(1);

  const totalNoPages = Math.ceil(bankDetailsData.length / rowPerPage);
  const paginationToValue = totalNoPages < currentpageNo * rowPerPage ? totalNoPages : currentpageNo * rowPerPage;

  const handleNext = () => {
    if (paginationToValue < totalNoPages) {
      setCurrentPageNo((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentpageNo > 1) {
      setCurrentPageNo((prev) => prev - 1);
    }
  };


  const updateData = (query) => {
    if (!query) {
      setBankDetailsData(bankDetailsCopyData);
    } else {
      switch (dropdownCategory) {
        case "ifsc":
          setBankDetailsData(
            bankDetailsCopyData.filter((x) =>
              x.ifsc.toLowerCase().includes(query.toLowerCase())
            )
          );
          break;
        case "branch":
          setBankDetailsData(
            bankDetailsCopyData.filter((x) =>
              x.branch.toLowerCase().includes(query.toLowerCase())
            )
          );
          break;
        case "bank_name":
          setBankDetailsData(
            bankDetailsCopyData.filter((x) =>
              x.bank_name.toLowerCase().includes(query.toLowerCase())
            )
          );
          break;
        default:
          setBankDetailsData(
            bankDetailsCopyData.filter((x) =>
              Object.values(x)
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase())
            )
          );
          break;
      }

    }
  }

  let timeoutId;
  const searchData = (e) => {
    const query = e.target.value;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(()=> {
       updateData(query);
    }, 500);
  };

  useEffect(() => {
    const bankDetilsApi = () => {
      setIsLoading(true)
      fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${dropdownCity}`)
        .then((res) => res.json())
        .then((res) => {
          if (Array.isArray(res)) {
            setBankDetailsData(res);
            setBankDetailsCopyData(res);
          }
        })
        .catch((error) => console.log("API Failed", error))
        .finally(() => {
          setIsLoading(false);
        })
    };
    bankDetilsApi();
  }, [dropdownCity]);

  const handleDropdownCities = (e) => {
    setDropDownCity(e.target.value);
  };

  const handleDropdownCategory = (e) => {
    setDropdownCategory(e.target.value);
    setBankDetailsData(bankDetailsCopyData);
    if(serachRef){
      serachRef.current.value = '';
    }
  };

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

  const favoritesIfscList = favorites.map((x) => x.ifsc);
  const addfav = (data) => {
    if (favoritesIfscList.includes(data.ifsc)) {
      setFavorites((preState) =>
        preState.filter((item) => item.ifsc !== data.ifsc)
      );
    } else {
      setFavorites((prev) => {
        return [...prev, data];
      });
    }
  };

  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem("fav-Item", JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <div className="main">
      <div className="filters">
        <div className="title">All Banks</div>
        <div>
          <form action="#">
            <select
              name="cities"
              id="city"
              className="dropdown"
              value={dropdownCity}
              onChange={handleDropdownCities}
            >
              <option value={null}>Select the Cities</option>
              <option value="MUMBAI">MUMBAI</option>
              <option value="DELHI">DELHI</option>
              <option value="LUCKNOW">LUCKNOW</option>
              <option value="PATNA">PATNA</option>
              <option value="BANGLORE">BANGLORE</option>
            </select>
            <select
              name="category"
              id="cate"
              className="dropdown"
              value={dropdownCategory}
              onChange={handleDropdownCategory}
            >
              <option value={null}>Select the Category</option>
              <option value="ifsc">IFSC</option>
              <option value="branch">branch</option>
              <option value="bank_name">bank name</option>
            </select>
            <input
              ref={serachRef}
              type="text"
              placeholder="Search.."
              name="search"
              onChange={searchData}
            />
          </form>
        </div>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
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
            {bankDetailsData
              .slice(
                currentpageNo * rowPerPage - rowPerPage,
                currentpageNo * rowPerPage
              )
              ?.map((data) => {
                return (
                  <tr key={data.ifsc}>
                    <td>
                      {data.bank_name}
                      <div>
                        {favoritesIfscList.includes(data.ifsc) ? (
                          <IoIosHeart
                            onClick={() => addfav(data)}
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        ) : (
                          <IoIosHeartEmpty
                            onClick={() => addfav(data)}
                            style={{ color: "black", cursor: "pointer" }}
                          />
                        )}
                      </div>
                    </td>
                    <td
                      onClick={() => displayDetails(data)}
                      className="fsc-code"
                    >
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
      )}
      {isLoading ? null :
        <div className="pagination">
          <div>
            Row Per Page :{"  "}
            <select
              value={rowPerPage}
              onChange={(e) => setRowPerPage(e.target.value)}
            >
              <option value={"10"}>10</option>
              <option value={"20"}>20</option>
              <option value={"30"}>30</option>
              <option value={"40"}>40</option>
            </select>
          </div>
          <div>
            <span className={`pagination-btn ${currentpageNo === 1 ? 'disabled' : ''}`} onClick={handlePrevious}>&#60;</span>
            <span>
              {" "}
              {currentpageNo * rowPerPage - (rowPerPage - 1)} -{" "}
              {paginationToValue} of {totalNoPages}
            </span>
            <span className={`pagination-btn ${paginationToValue >= totalNoPages ? 'disabled' : ''}`} onClick={handleNext}>&#62;</span>
          </div>
        </div>}
    </div>
  );
};

export default Bank;
