/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Panel, Container, Content, IconButton, DateRangePicker, Tooltip, Whisper } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import { getOrdersDriver } from '../../redux/action/getOrderByIdDriver';
import styles from './index.module.css';
import { customLocale, handleDateRangeChange, predefinedRanges } from '../../components/DateR';
import FileDownload from '@rsuite/icons/FileDownload';
import { getPdfFile } from '../../redux/action';

const { Column, HeaderCell, Cell } = Table;

export default function DriverOrders() {
  const [orderDetail, setOrderDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersDriver(localStorage.getItem('token')));
  }, []);

  const driverData = useSelector(s => s.driversOrders);
  const [dateRange, setDateRange] = useState([null, null]);
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
    <Container className='container-center'>
      <Content className='content-white'>
        {
          !orderDetail ? <div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-4'>
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
                    onClick={() => getPdfFile(handleDateRangeChange(driverData.orders, dateRange))}
                    style={{ marginRight: '16px' }}
                  />
                </Whisper>
              </div>
            </div>
            <Table
              height={100 + (driverData.orders?.length * 40)}
              className='mt-[20px]'
              data={handleDateRangeChange(driverData.orders, dateRange)}
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
                <Cell dataKey="price" />
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
            </Table>
            <div className={styles.totalSum}>Общая оплата: {handleDateRangeChange(driverData.orders, dateRange)?.reduce((sum, item) => sum + (item.price * 0.80), 0).toFixed(2)}</div>
          </div>
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
                    onClick={() => getPdfFile(handleDateRangeChange([orderDetail], dateRange))}
                    style={{ position: 'absolute', top: 10, right: 50 }}
                  />
                </Whisper>
                <p><strong>ID:</strong> {orderDetail.id}</p>
                <p><strong>Статус заказа:</strong> {orderDetail.statusorder.value}</p>
                <p><strong>Водитель:</strong> {driverData.name}, 0{driverData.contact}</p>
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
                <p><strong>Цена:</strong> {(orderDetail.price).toFixed(2)}</p>
                <p><strong>Оплата:</strong> {(orderDetail.price / 100 * 80).toFixed(2)}</p>
              </Panel>
            )
        }
      </Content>
    </Container>
  );
}
