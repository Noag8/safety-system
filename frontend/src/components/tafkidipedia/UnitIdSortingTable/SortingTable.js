import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from './GlobalFilter'
import axios from 'axios'
import style from 'components/Table.css'
import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";

const SortingTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);

  const [data, setData] = useState([])

  function init() {
    getUnitDetails();
  }

  const getUnitDetails = async () => {
    try {
      await axios.get(`http://localhost:8000/api/unitId`)
        .then(response => {
          setData(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    catch {

    }
  }

  useEffect(() => {
    // init();
    setPageSize(5);
  }, []);

  useEffect(() => {
    init()
  }, [props.refresh]);

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
  } = useTable({
    columns, data, initialState: { pageIndex: 0 },
  },
    useGlobalFilter, useFilters, useSortBy, usePagination);

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-responsive" style={{ overflow: 'auto' }}>
        <table {...getTableProps()}>
          <thead style={{ backgroundColor: '#4fff64' }}>
            <tr>
            <th colSpan="1">שם היחידה</th>
            <th colSpan="1">מיקום היחידה</th>
            <th colSpan="1">מבנה היחידה</th>
            <th colSpan="1">אמצעי היחידה</th>
            <th colSpan="1">עיסוק מרכזי</th>
            <th colSpan="1">עץ מבנה יחידה</th>
            <th colSpan="1">עץ מבנה טנ"א</th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map(cell => {
                        if (cell.column.id == "name") {
                          return <td>{cell.value.unit.name}</td>
                        }
                        if (cell.column.id == "location") {
                          return <td>{cell.value.unit.location}</td>
                        }
                        if (cell.column.id == "unitStructure") {
                          return <td> {cell.value.unitStructure} </td>
                        }
                        if (cell.column.id == "unitMeans") {
                          return <td> {cell.value.unitMeans} </td>
                        }
                        if (cell.column.id == "mainOccupation") {
                          return <td> {cell.value.mainOccupation} </td>
                        }
                        if (cell.column.id == "unitStructureTree") {
                          return <td> {cell.value.unitStructureTree} </td>
                        }
                        if (cell.column.id == "TeneStructureTree") {
                          return <td> {cell.value.TeneStructureTree} </td>
                        }
                      })
                    }
                    {/* {console.log(row)} */}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="pagination">

          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}

          <span>
            עמוד{' '}
            <strong>
              {pageIndex + 1} מתוך {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | חפש עמוד:{' '}
            <input

              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px', borderRadius: '10px' }}
            />
          </span>{' '}
          <select
            style={{ borderRadius: '10px' }}
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 15, 20, 25].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
export default withRouter(SortingTable);;