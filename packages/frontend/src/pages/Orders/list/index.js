// components/orders/List.js
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import AddEditOrder from '../edit/index';
import DelPopup from '../../../components/DelPopup';
import { MdDeleteOutline, MdEdit, MdOutlineAdd } from "react-icons/md";
import { getOrders, deleteOrder } from '../../../redux/action/order';

const { Column, HeaderCell, Cell } = Table;

export const List = () => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const authorized = useSelector(state => state.authorized);

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
    if (sortColumn && sortType) {
      return orders.sort((a, b) => {
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
    return orders;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <h5 className='table-title'>Заказы</h5>
        {authorized.role === "admin" && <Button onClick={() => {
          setOrderData(null);
          handleOpen();
        }} className='createButton' appearance="primary" endIcon={<MdOutlineAdd color='#fff' size={20} />}>
          Добавить
        </Button>}
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
        >
          <Column width={70} align="center" fixed sortable>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={1} fixed sortable>
            <HeaderCell>Точка доставки A</HeaderCell>
            <Cell dataKey="deliveryPointA" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Точка доставки B</HeaderCell>
            <Cell dataKey="deliveryPointB" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Водитель</HeaderCell>
            <Cell dataKey="driverId" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Статус</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Менеджер</HeaderCell>
            <Cell dataKey="managerId" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Комментарий</HeaderCell>
            <Cell dataKey="comment" />
          </Column>

          {authorized.role === "admin" && <Column fixed="right" width={100}>
            <HeaderCell className='text-center'>Действия</HeaderCell>

            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <div className='flex justify-between items-center'>
                  <Button className='withoutButton' appearance="default" onClick={() => {
                    setOrderData(rowData);
                    handleOpen();
                  }}>
                    <MdEdit color='#1caf68' size={20} />
                  </Button>
                  <Button className='withoutButton' appearance="default" onClick={() => {
                    setOrderData(rowData);
                    setDelOpen(true);
                  }}>
                    <MdDeleteOutline color='rgb(210 54 54)' size={20} />
                  </Button>
                </div>
              )}
            </Cell>
          </Column>}
        </Table>
      </div>
      {open && <AddEditOrder handleClose={handleClose} open={open} data={orderData} />}
      {delOpen && <DelPopup handleDelete={() => handleDelete(orderData.id)} handleClose={() => setDelOpen(false)} open={delOpen} text={`Заказ ${orderData.id}`} />}
    </>
  );
};
