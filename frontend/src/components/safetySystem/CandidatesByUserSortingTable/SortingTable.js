import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from './GlobalFilter'
import axios from 'axios'
import style from 'components/Table.css'
import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";
import people from "assets/img/people.png";

const SortingTable = ({ match }) => {
  const columns = useMemo(() => COLUMNS, []);

  const [data, setData] = useState([])

  function init() {
    getCandidatesByUser();
  }

  const getCandidatesByUser = async () => {
    try {
      await axios.get(`http://localhost:8000/api/candidate/candidatesbyuser/${match.params.userid}`)
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
    init();
    setPageSize(5);
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
  } = useTable({
    columns, data, initialState: { pageIndex: 0 },
  },
    useGlobalFilter, useFilters, useSortBy, usePagination);

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-responsive" style={{ overflow: 'auto' }}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th  >
                    <div {...column.getHeaderProps(column.getSortByToggleProps())}> {column.render('Header')} </div>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                    <div>
                      {column.isSorted ? (column.isSortedDesc ? '🔽' : '⬆️') : ''}
                    </div>
                  </th>
                ))}
                <th>תפקידים במחזור</th>
                <th>ערוך העדפות</th>
              </tr>
            ))}

          </thead>
          <tbody {...getTableBodyProps()}>
            {
              page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map(cell => {
                        if ((cell.column.id != "createdAt") && (cell.column.id != "updatedAt")) {
                          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        }
                        else {
                          if (cell.column.id == "createdAt") {
                            return <td>{cell.value.slice(0, 10)}</td>
                          }
                          if (cell.column.id == "updatedAt") {
                            return <td>{cell.value.slice(0, 10)}</td>
                          }
                        }
                      })
                    }
                    {/* {console.log(row)} */}
                    <td style={{ textAlign: "center" }}>
                      <Link to={`/jobsbymahzor/${row.original.mahzor._id}`}>
                        <button
                          className="btn"
                          style={{ padding: "0.5rem", background:"#04ab64"}}
                        >
                         לצפייה בתפקידים
                        </button>
                      </Link>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Link to={`/candidatepreferenceform/${row.original.mahzor._id}/${row.original._id}`}>
                        <button
                          className="btn"
                          style={{ padding: "0.5rem", background:"#04ab64"}}
                        >
                          <img
                            src={editpic}
                            alt="bookmark"
                            style={{ height: "2rem" }}
                          />
                        </button>
                      </Link>
                    </td>
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