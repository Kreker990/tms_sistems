import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Sidebar, Sidenav, Navbar, Nav } from 'rsuite';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import AdminIcon from '@rsuite/icons/Admin';
import BarChartIcon from '@rsuite/icons/BarChart';
import MemberIcon from '@rsuite/icons/Member';
import LocationIcon from '@rsuite/icons/Location';
import { List } from '@rsuite/icons';
import SettingHorizontalIcon from '@rsuite/icons/SettingHorizontal';

import 'rsuite/dist/rsuite.min.css';
import './App.css';

import Admin from './pages/Admin/Admin';
import AuthModal from './components/AuthModal/AuthModal';
import Staff from './pages/Staff/Staff';
import ComA from './pages/ComA/ComA';
import Drivers from './pages/Drivers/Drivers';
import StatusOrder from './pages/StatusOrder/StatusOrder';
import Header from './components/Header/Header';
import icon from './assets/icon.png';
import { checkAuth } from './redux/action';
import { authorizedUpdate } from './redux/action/authorized';
import Orders from './pages/Orders/Orders';
import { getOrders } from './redux/action/order';
import DriverOrders from './pages/DriverOrders/DriverOrders';

const headerStyles = {
  fontSize: 16,
  height: 56,
  background: 'black',
  color: 'white',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const authorized = useSelector(state => state.authorized);
  const [load, setLoad] = useState(false);
  const location = useLocation();
  const [expand, setExpand] = useState(true);

  const navigate = useNavigate();
  function handleActive(url) {
    navigate(url);
  }
  const succes = (role) => {
    setLoad(true);
    dispatch(authorizedUpdate(true, role));
  }
  useEffect(() => {
    if (!load) {
      checkAuth(succes);
    }
    dispatch(getOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authorized.value) {
    return <AuthModal />;
  }

  const renderNavItems = () => {
    if (authorized.role === 'driver') {
      return (
        <>
          <Nav.Item eventKey="/driver/orders" icon={<List />}>
            Мои заказы
          </Nav.Item>
        </>
      );
    }

    return (
      <>
        <Nav.Item eventKey="/" icon={<BarChartIcon />}>
          Главная
        </Nav.Item>
        <Nav.Item eventKey="/drivers" icon={<MemberIcon />}>
          Водители
        </Nav.Item>
        <Nav.Item eventKey="/orders" icon={<List />}>
          Заказы
        </Nav.Item>
        <Nav.Item eventKey="/coma" icon={<LocationIcon />}>
          Точки отправки и получения
        </Nav.Item>
        {authorized.role === 'admin' &&
          <Nav.Item eventKey="/statosorder" icon={<SettingHorizontalIcon />}>
            Статус заказов
          </Nav.Item>
        }
        <Nav.Item eventKey="/staff" icon={<AdminIcon />}>
          Персонал
        </Nav.Item>
      </>
    );
  };

  const renderRoutes = () => {
    if (authorized.role === 'driver') {
      return (
        <Routes>
          <Route path="/driver/orders" element={<DriverOrders />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/coma" element={<ComA />} />
        <Route path="/statosorder" element={<StatusOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    );
  };

  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          className="sidebar"
          style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src={icon} width={56} height={56} />
              <span style={{ marginLeft: '4px', fontWeight: '600' }}>
                Система доставки
              </span>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              <Nav activeKey={location.pathname} onSelect={handleActive}>
                {renderNavItems()}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container>
          <Header />
          <div className="routes">
            {renderRoutes()}
          </div>
        </Container>
      </Container>
    </div>
  );
}
