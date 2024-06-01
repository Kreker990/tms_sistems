import { Button, Table, Whisper, Tooltip, IconButton, DateRangePicker } from 'rsuite';
import { useState } from 'react';
import AddEdit from '../edit';
import { useDispatch, useSelector } from 'react-redux';
import DelPopup from '../../../components/DelPopup';
import { MdDeleteOutline, MdEdit, MdOutlineAdd } from "react-icons/md";
import { deleteStaff } from '../../../redux/action/staff';
import styles from './index.module.css';
import { customLocale, handleDateRangeChange, predefinedRanges } from '../../../components/DateR';
import FileDownload from '@rsuite/icons/FileDownload';
import { getPdfFile } from '../../../redux/action';

const { Column, HeaderCell, Cell } = Table;

export const List = ({ data }) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [managerInfo, setManagerInfo] = useState(false)
  const [managerMore, setManagerMore] = useState({})
  const [comBData, setData] = useState(null);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const authorized = useSelector(s => s.authorized);

  const handleRangeChange = (range) => {
    if (range) {
      setDateRange(range);
    } else {
      setDateRange([null, null])
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const hadnleDelete = (id) => {
    dispatch(deleteStaff(id));
    setDelOpen(false);
  };

  const getData = () => {
    let filteredData = data
    if (authorized.role !== 'admin') {
      filteredData = data.filter(order => order.role === 'manager');
    }
    if (sortColumn && sortType) {
      return filteredData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filteredData;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const knowManagerMore = (data) => {
    setManagerMore(data)
    setManagerInfo(true);
  }
  return (
    <>
      {
        !managerInfo ? <>
          <div className='flex justify-between items-center'>
            <h5 className='table-title'>Персонал</h5>
            {authorized.role === "admin" && <Button onClick={() => {
              setData(null);
              handleOpen();
            }} className='createButton' appearance="primary" endIcon={<MdOutlineAdd color='#fff' size={20} />}>
              Добавить
            </Button>}
          </div>
          <div>
            <Table
              height={100 + (data?.length * 40)}
              className='mt-[20px]'
              data={getData()}
              sortColumn={sortColumn}
              sortType={sortType}
              onSortColumn={handleSortColumn}
              loading={loading}
              minwidth={500}
              style={{ width: '100%', maxHeight: '450px' }}
              locale={{
                emptyMessage: 'Нету пользователей',
              }}
              rowClassName={() => 'clickable-row'}
              onRowClick={knowManagerMore}
            >
              <Column width={70} align="center" fixed sortable>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column flexGrow={1} fixed sortable>
                <HeaderCell>ФИО</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column flexGrow={1} sortable>
                <HeaderCell>Электронная почта</HeaderCell>
                <Cell dataKey="mail" />
              </Column>

              <Column flexGrow={1} sortable>
                <HeaderCell>Контакт</HeaderCell>
                <Cell dataKey="contact" />
              </Column>

              <Column flexGrow={1} sortable>
                <HeaderCell>Роль</HeaderCell>
                <Cell dataKey="role" />
              </Column>
              {
                authorized.role === "admin" && <Column fixed="right" width={100}>
                  <HeaderCell className='text-center'>Действия</HeaderCell>

                  <Cell style={{ padding: '6px' }}>
                    {rowData => (
                      <div className='flex justify-between items-center'>
                        <Whisper
                          trigger="hover"
                          placement="top"
                          speaker={<Tooltip>Редактировать</Tooltip>}
                        >
                          <Button className='withoutButton' appearance="default" onClick={(event) => {
                            event.stopPropagation();
                            setData(rowData);
                            handleOpen();
                          }}>
                            <MdEdit color='#1caf68' size={20} />
                          </Button>
                        </Whisper>
                        <Whisper
                          trigger="hover"
                          placement="top"
                          speaker={<Tooltip>Удалить</Tooltip>}
                        >
                          <Button className='withoutButton' appearance="default" onClick={(event) => {
                            event.stopPropagation();
                            setData(rowData);
                            setDelOpen(true);
                          }}>
                            <MdDeleteOutline color='rgb(210 54 54)' size={20} />
                          </Button>
                        </Whisper>
                      </div>
                    )}
                  </Cell>
                </Column>
              }
            </Table>
          </div>
          {
            open && <AddEdit handleClose={handleClose} open={open} data={comBData} />
          }
          {
            delOpen && <DelPopup handleDelete={() => hadnleDelete(comBData.id)} handleClose={() => setDelOpen(false)} open={delOpen} text={`Точку доставки ${comBData.name}`} />
          }
        </> :
          <>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-4'>
                <h5 className='table-title'>{managerMore?.name || managerMore.mail} ({managerMore.role})</h5>
                <DateRangePicker
                  locale={customLocale}
                  ranges={predefinedRanges}
                  onChange={handleRangeChange}
                />
              </div>
              <div>
                <Whisper
                  trigger="hover"
                  placement="top"
                  speaker={<Tooltip>Скачать PDF</Tooltip>}
                >
                  <IconButton
                    icon={<FileDownload />}
                    onClick={() => getPdfFile(handleDateRangeChange(managerMore.orders, dateRange))}
                    style={{ marginRight: '16px' }}
                  />
                </Whisper>
                <Button onClick={() => {
                  setManagerInfo(false)
                }} className='createButton' appearance="primary" >
                  Назад к списку персонала
                </Button>
              </div>
            </div>
            <div>
              <Table
                height={100 + (data?.length * 40)}
                className='mt-[20px]'
                data={handleDateRangeChange(managerMore.orders, dateRange)}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
                minwidth={500}
                style={{ width: '100%', maxHeight: '450px' }}
                locale={{
                  emptyMessage: 'Нету заказов',
                }}
              >
                <Column width={70} align="center" fixed sortable>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column flexGrow={1} fixed >
                  <HeaderCell>Точка доставки A</HeaderCell>
                  <Cell>
                    {rowData => (
                      <div className={styles.scrollable_cell}>
                        <div>{rowData.a.name}/{rowData.a.address}</div>
                      </div>
                    )}
                  </Cell>
                </Column>

                <Column flexGrow={1} >
                  <HeaderCell>Точка доставки B</HeaderCell>
                  <Cell>
                    {rowData => (
                      <div className={styles.scrollable_cell}>
                        <div>{rowData.b.name}/{rowData.b.address}</div>
                      </div>
                    )}
                  </Cell>
                </Column>

                <Column flexGrow={1} >
                  <HeaderCell>Статус</HeaderCell>
                  <Cell dataKey="statusorder.value" />
                </Column>

                <Column flexGrow={1} >
                  <HeaderCell>Водитель</HeaderCell>
                  <Cell dataKey="driver.name" />
                </Column>

                <Column flexGrow={1} >
                  <HeaderCell>Комментарий</HeaderCell>
                  <Cell dataKey="comment" />
                </Column>
                <Column flexGrow={1} >
                  <HeaderCell>время</HeaderCell>
                  <Cell>
                    {rowData => (
                      <div className={styles.scrollable_cell}>
                        <div>{rowData.timeStart} \ {rowData.timeEnd}</div>
                      </div>
                    )}
                  </Cell>
                </Column>
                <Column flexGrow={1} >
                  <HeaderCell>Цена</HeaderCell>
                  <Cell dataKey="price" />
                </Column>
              </Table>
              <div className={styles.totalSum}>Общая оплата: {handleDateRangeChange(managerMore.orders, dateRange).reduce((sum, item) => sum + item.price, 0).toFixed(2)}</div>
            </div>
          </>
      }
    </>
  );
};
