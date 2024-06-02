// components/orders/List.js
import React, { useState, useEffect } from 'react';
import { Button, Table, IconButton, Panel, DateRangePicker, Whisper, Tooltip } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import AddEditOrder from '../edit/index';
import DelPopup from '../../../components/DelPopup';
import { MdDeleteOutline, MdEdit, MdOutlineAdd } from "react-icons/md";
import { getOrders, deleteOrder } from '../../../redux/action/order';
import styles from './index.module.css';
import { customLocale, handleDateRangeChange, predefinedRanges } from '../../../components/DateR';
import { getPdfFile } from '../../../redux/action';
import FileDownload from '@rsuite/icons/FileDownload';

const { Column, HeaderCell, Cell } = Table;
const PriceCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    {`${rowData[dataKey]} сом`}
  </Cell>
);
export const List = () => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [sortColumn, setSortColumn] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
    setDelOpen(false);
  };

  const getData = () => {
    let filteredOrders = handleDateRangeChange(orders, dateRange);
    if (sortColumn && sortType) {
      return filteredOrders.sort((a, b) => {
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
    return filteredOrders;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  const handleRowClick = (order) => {
    setOrderDetail(order);
  };
  const handleRangeChange = (range) => {
    if (range) {
      setDateRange(range);
    } else {
      setDateRange([null, null])
    }
  };
  return (
    <>
      {!orderDetail ? <>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <h5 className='table-title'>Заказы</h5>
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
                onClick={() => getPdfFile(getData())}
                style={{ marginRight: '16px' }}
              />
            </Whisper>
            <Button onClick={() => {
              setOrderData(null);
              handleOpen();
            }} className='createButton' appearance="primary" endIcon={<MdOutlineAdd color='#fff' size={20} />}>
              Добавить
            </Button>
          </div>
        </div>
        <div>
          <Table
            height={100 + (orders?.length * 40)}
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
            onRowClick={handleRowClick}
          >
            <Column width={70} align="center" fixed sortable>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1} fixed >
              <HeaderCell>Точка отправки</HeaderCell>
              <Cell dataKey="a.name" />
            </Column>

            <Column flexGrow={1} >
              <HeaderCell>Точка получения</HeaderCell>
              <Cell dataKey="b.name" />
            </Column>

            <Column flexGrow={1} >
              <HeaderCell>Водитель</HeaderCell>
              <Cell dataKey="driver.name" />
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
              <HeaderCell>Цена</HeaderCell>
              <PriceCell dataKey="price" />
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
            <Column fixed="right" width={100}>
              <HeaderCell className='text-center'>Действия</HeaderCell>

              <Cell style={{ padding: '6px' }}>
                {rowData => (
                  <div className='flex justify-center items-center'>
                    <Whisper
                      trigger="hover"
                      placement="top"
                      speaker={<Tooltip>Редактировать</Tooltip>}
                    >
                      <Button className='withoutButton' appearance="default" onClick={(event) => {
                        event.stopPropagation();
                        setOrderData(rowData);
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
                        setOrderData(rowData);
                        setDelOpen(true);
                      }}>
                        <MdDeleteOutline color='rgb(210 54 54)' size={20} />
                      </Button>
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>
        </div>
        {open && <AddEditOrder handleClose={handleClose} open={open} data={orderData} />}
        {delOpen && <DelPopup handleDelete={() => handleDelete(orderData.id)} handleClose={() => setDelOpen(false)} open={delOpen} text={`Заказ ${orderData.id}`} />}
      </>
        : (
          <Panel header="Детали заказа" bordered style={{ marginTop: 20, position: 'relative' }}>
            <Whisper
              trigger="hover"
              placement="top"
              speaker={<Tooltip>Закрыть</Tooltip>}
            >
              <IconButton
                icon={<CloseIcon />}
                style={{ position: 'absolute', top: 10, right: 10 }}
                onClick={() => setOrderDetail(null)}
              />
            </Whisper>

            <Whisper
              trigger="hover"
              placement="top"
              speaker={<Tooltip>Скачать PDF</Tooltip>}
            >
              <IconButton
                icon={<FileDownload />}
                style={{ position: 'absolute', top: 10, right: 50 }}
                onClick={() => getPdfFile([orderDetail])}
              />
            </Whisper>
            <p><strong>ID:</strong> {orderDetail.id}</p>
            <p><strong>Статус заказа:</strong> {orderDetail.statusorder.value}</p>
            <p><strong>Водитель:</strong> {orderDetail.driver.name}, 0{orderDetail.driver.contact}</p>
            <p><strong>Точка отправки:</strong></p>
            <p className={styles.leftIndent}>Название: {orderDetail.a.name}</p>
            <p className={styles.leftIndent}>адрес: {orderDetail.a.address}</p>
            <p className={styles.leftIndent}>контакты: {orderDetail.a.contact}</p>
            <p><strong>Точка доставки:</strong></p>
            <p className={styles.leftIndent}>Название: {orderDetail.b.name}</p>
            <p className={styles.leftIndent}>адрес: {orderDetail.b.address}</p>
            <p className={styles.leftIndent}>контакты: {orderDetail.b.contact}</p>
            <p><strong>Менеджер:</strong> {orderDetail.staff.name}, 0{orderDetail.staff.contact}</p>
            <p><strong>Дата загрузки:</strong> {orderDetail.timeStart} <strong>Дата выгрузки:</strong> {orderDetail.timeEnd}</p>
            <p><strong>Комментарий:</strong> {orderDetail.comment}</p>
            <p><strong>Цена:</strong> {(orderDetail.price).toFixed(2)} сом</p>
            <p><strong>Оплата:</strong> {(orderDetail.price / 100 * 80).toFixed(2)} сом</p>
          </Panel>
        )
      }
    </>
  );
};
