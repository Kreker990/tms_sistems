import { Button, Table, Whisper, Tooltip, DateRangePicker, IconButton } from 'rsuite';
import { useState } from 'react';
import AddEdit from '../edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDriver } from '../../../redux/action/getDriver';
import DelPopup from '../../../components/DelPopup';
import { MdDeleteOutline, MdEdit, MdOutlineAdd } from "react-icons/md";
import styles from './index.module.css';
import { customLocale, handleDateRangeChange, predefinedRanges } from '../../../components/DateR';
import { getPdfFile } from '../../../redux/action';
import FileDownload from '@rsuite/icons/FileDownload';

const { Column, HeaderCell, Cell } = Table;

export const List = ({ data }) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [driverInfo, setDriverInfo] = useState(false)
  const [driverMore, setDriverMore] = useState({})
  const [delOpen, setDelOpen] = useState(false);
  const [driverData, setData] = useState(null);
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
    dispatch(deleteDriver(id));
    setDelOpen(false);
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
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
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const knowDriverMore = (data) => {
    setDriverMore(data)
    setDriverInfo(true);
  }
  return (
    <>
      {
        !driverInfo ? <>
          <div className='flex justify-between items-center'>
            <h5 className='table-title'>Водители</h5>
            {authorized.role === "admin" && <Button onClick={() => {
              setData(null);
              handleOpen();
            }} className='createButton' appearance="primary" endIcon={<MdOutlineAdd color='#fff' size={20} />}>
              Добавить
            </Button>}
          </div>
          <div>
            <Table
              height={100 + (data.length * 40)}
              className='mt-[20px]'
              data={getData()}
              sortColumn={sortColumn}
              sortType={sortType}
              onSortColumn={handleSortColumn}
              loading={loading}
              minwidth={500}
              style={{ width: '100%', maxHeight: '450px' }}
              locale={{
                emptyMessage: 'Данные не найдены',
              }}
              rowClassName={() => 'clickable-row'}
              onRowClick={knowDriverMore}
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
                <HeaderCell>Номер машины</HeaderCell>
                <Cell dataKey="carNumber" />
              </Column>

              <Column flexGrow={1} sortable>
                <HeaderCell>Контакт</HeaderCell>
                <Cell dataKey="contact" />
              </Column>

              <Column flexGrow={1} sortable>
                <HeaderCell>Электронная почта</HeaderCell>
                <Cell dataKey="mail" />
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
            open && <AddEdit handleClose={handleClose} open={open} data={driverData} />
          }
          {
            delOpen && <DelPopup handleDelete={() => hadnleDelete(driverData.id)} handleClose={() => setDelOpen(false)} open={delOpen} text={`Водителя ${driverData.name}`} />
          }
        </>
          : <>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-4'>
                <h5 className='table-title'>{driverMore.name} (заказы)</h5>
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
                    onClick={() => getPdfFile(handleDateRangeChange(driverMore.orders, dateRange))}
                    style={{ marginRight: '16px' }}
                  />
                </Whisper>
                <Button onClick={() => {
                  setData(null);
                  setDriverInfo(false)
                }} className='createButton' appearance="primary">
                  Назад к таблице водителей
                </Button>
              </div>
            </div>
            <div>
              <Table
                height={100 + (data.length * 40)}
                className='mt-[20px]'
                data={handleDateRangeChange(driverMore.orders, dateRange)}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
                minwidth={500}
                autoHeight
                style={{ width: '100%', maxHeight: '450px' }}
                locale={{
                  emptyMessage: 'нету заказов',
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
                  <HeaderCell>Менеджер</HeaderCell>
                  <Cell dataKey="staff.name" />
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
                  <Cell>
                    {rowData => (
                      <div>{rowData.price.toFixed(2)}</div>
                    )}
                  </Cell>
                </Column>
                <Column flexGrow={1} >
                  <HeaderCell>Оплата</HeaderCell>
                  <Cell>
                    {rowData => (
                      <div>{(rowData.price * 0.80).toFixed(2)}</div>
                    )}
                  </Cell>
                </Column>
              </Table>
              <div className={styles.totalSum}>Общая оплата: {handleDateRangeChange(driverMore.orders, dateRange)?.reduce((sum, item) => sum + (item.price * 0.80), 0).toFixed(2)}</div>
            </div>
          </>
      }
    </>
  );
};
