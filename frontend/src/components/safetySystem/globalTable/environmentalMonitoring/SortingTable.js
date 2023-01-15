import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import Button from "reactstrap/lib/Button";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import PropagateLoader from "react-spinners/PropagateLoader";import { GlobalFilter } from "./GlobalFilter";
import axios from "axios";
import { FaFileDownload } from 'react-icons/fa';
import style from "components/Table.css";
import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";
import { isAuthenticated } from "auth";

const SortingTable = (props) => {
  const user = isAuthenticated();
  const columns = useMemo(() => COLUMNS, []);

  const [data, setData] = useState([]);

  async function init() {
    if (props.userData.user != undefined) {
      if (props.userData.user.role == "0") {
        getDetails();
      }
      if (props.userData.user.role == "1") {
        getUnitDetailsByGdod();
      }
      if (props.userData.user.role == "2") {
        getUnitDetailsByHativa();
      }
      if (props.userData.user.role == "3") {
        getUnitDetailsByOgda();
      }
      if (props.userData.user.role == "4") {
        getUnitDetailsByPikod();
      }
    }
  }

  const getUnitDetailsByGdod = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/environmentalMonitoring`)
        .then((response) => {
          let tempData = [];
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].gdod == props.userData.user.gdod) {
              tempData.push(response.data[i]);
            }
          }
          setData(tempData);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch { }
  };

  const getUnitDetailsByHativa = async () => {
    let tempgdodbyhativa;
    await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: props.userData.user.hativa })
      .then((response) => {
        tempgdodbyhativa = response.data;
        console.log(tempgdodbyhativa)
      })
      .catch((error) => {
        console.log(error);
      });

    await axios.get(`http://localhost:8000/api/environmentalMonitoring`)
      .then((response) => {
        console.log(response.data)
        let tempData = [];
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < tempgdodbyhativa.length; j++) {
            if (response.data[i].gdod == tempgdodbyhativa[j]._id) {
              tempData.push(response.data[i]);
            }
          }
        }
        setData(tempData);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getUnitDetailsByOgda = async () => {
    let tempgdodsbyogda = [];
    await axios.post(`http://localhost:8000/api/hativa/hativasbyogdaid`, { ogda: props.userData.user.ogda })
      .then(async (response1) => {
        for (let i = 0; i < response1.data.length; i++) {
          await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: response1.data[i]._id })
            .then((response2) => {
              for (let j = 0; j < response2.data.length; j++) {
                tempgdodsbyogda.push(response2.data[j])
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await axios.get(`http://localhost:8000/api/environmentalMonitoring`)
      .then((response) => {
        // console.log(response.data)
        let tempData = [];
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < tempgdodsbyogda.length; j++) {
            if (response.data[i].gdod == tempgdodsbyogda[j]._id) {
              tempData.push(response.data[i]);
            }
          }
        }
        setData(tempData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUnitDetailsByPikod = async () => {
    let tempgdodsbypikod = [];

    await axios.post(`http://localhost:8000/api/ogda/ogdasbypikodid`, { pikod: props.userData.user.pikod })
      .then(async (response1) => {
        for (let i = 0; i < response1.data.length; i++) {
          await axios.post(`http://localhost:8000/api/hativa/hativasbyogdaid`, { ogda: response1.data[i]._id })
            .then(async (response2) => {
              for (let j = 0; j < response2.data.length; j++) {
                await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: response2.data[j]._id })
                  .then(async (response3) => {
                    for (let k = 0; k < response3.data.length; k++) {
                      tempgdodsbypikod.push(response3.data[k])
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  })
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await axios.get(`http://localhost:8000/api/environmentalMonitoring`)
      .then((response) => {
        // console.log(response.data)
        let tempData = [];
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < tempgdodsbypikod.length; j++) {
            if (response.data[i].gdod == tempgdodsbypikod[j]._id) {
              tempData.push(response.data[i]);
            }
          }
        }
        setData(tempData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDetails = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/environmentalMonitoring`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch { }
  };

  const Delete = (data) => {
    const tempData = data;
    // tempData.deletedAt = new Date();
    axios.post("http://localhost:8000/api/environmentalMonitoringDelete", tempData).then((response) => {
      axios.delete(`http://localhost:8000/api/environmentalMonitoring/${tempData}`).then((response) => {
        init();
      })
        .catch((error) => {
          console.log(error);
        });
    }).catch((error) => {
      console.log(error);
    });
  };

  const sendMail = () => {
    axios
      .put("http://localhost:8000/api/sendMail")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    init();
    setPageSize(15);
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    data.length == 0 ?
      <div style={{ width: '50%', marginTop: '30%' }}>
        <PropagateLoader color={'#00dc7f'} loading={true} size={25} />
      </div>
      :
      <>
        <div style={{ float: 'right', paddingBottom: '5px' }}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn-green"
            table="table-to-xls"
            filename="קובץ - ניטורים סביבתיים"
            sheet="קובץ - ניטורים סביבתיים"
            buttonText="הורד כקובץ אקסל"
            style={{ float: 'right' }}
          />
        </div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="table-responsive" style={{ overflow: "auto" }}>
          <table {...getTableProps()} id="table-to-xls">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th>
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {" "}
                      {column.render("Header")}{" "}
                    </div>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                    <div>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "⬆️"
                        : ""}
                    </div>
                  </th>
                ))}
                <th>ערוך</th>
                {props.userData.user.role == "0" ? <th>מחק</th> : null}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    if (cell.column.id == "harmfulCauses") {
                      return <td>{cell.value}</td>;
                    }
                    if (cell.column.id == "locationInUnit") {
                      return <td>{cell.value}</td>;
                    }
                    if (cell.column.id == "lastMonitoringDate") {
                      return (
                        <td>
                          {cell.value
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                      );
                    }
                    if (cell.column.id == "nextMonitoringDate") {
                      return (
                        <td>
                          {cell.value
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                      );
                    }
                    if (cell.column.id == "executionStatus") {
                      return <td>{cell.value}</td>;
                    }
                    if (cell.column.id == "surveyDate") {
                      return (
                        <td>
                          {cell.value
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                      );
                    }
                    if (cell.column.id == "_id") {
                      return <td><a href={"http://localhost:8000/api/downloadFile?collec=environmentalMonitoring&id=" + cell.value.toString()} target="_blank"><FaFileDownload /></a></td>;
                    }
                    // return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                  {/* {console.log(row)} */}
                  <td role="cell">
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <Link
                        to={`/GlobalEnvironmentalMonitoringForm/${row.original._id}`}
                      >
                        <button className="btn btn-edit">ערוך</button>
                      </Link>
                    </div>
                  </td>
                  {props.userData.user.role == "0" ? <td role="cell">
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => Delete(row.original._id)}
                      >
                        מחק
                      </button>
                    </div>
                  </td> : null}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <span>
            עמוד{" "}
            <strong>
              {pageIndex + 1} מתוך {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | חפש עמוד:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px", borderRadius: "10px" }}
            />
          </span>{" "}
          <select
            style={{ borderRadius: "10px" }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
export default withRouter(SortingTable);
