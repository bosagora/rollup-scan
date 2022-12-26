import React, { useEffect, useState } from "react";
import "./Header.scss";
import {
  Collapse,
  Container,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown,
} from "reactstrap";
import { AiOutlineGlobal } from "react-icons/ai";
import Logo from "assets/images/the9_logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import menuDefine from "../../global/routes/menuDefine";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import github from "assets/images/github.svg";
import { headerClassUpdater } from "../../store/header/thunks";
import { RouterPathEnum } from "../../global/routes/RouterPathEnum";
import { pageChange } from "../../store/pagination/thunks";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  const { t } = useTranslation();
  const location = useLocation();
  const networkName = process.env.REACT_APP_CHAIN_NAME;

  const [headerLanding, setHeaderLanding] = useState("newclass");
  const headerClass = useSelector((state: any) => state.header.headerClass);

  useEffect(() => {
    const listenScrollEvent = () => {
      if (window.location.pathname === "/" && window.scrollY < 30) {
        setHeaderLanding("newclass");
      } else {
        setHeaderLanding("newclass2");
      }
    };

    const resize = () => {
      setHideNav(window.innerWidth <= 991);
    };

    window.addEventListener("scroll", listenScrollEvent);
    window.addEventListener("resize", resize);
    resize();

    if (window.location.pathname !== "/") {
      dispatch(headerClassUpdater("newclass2", "layout-generic"));
    }

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    updateHeaderColor(location.pathname);
  }, [location, location.pathname]);

  const updateHeaderColor = (route: string) => {
    setActiveTab(route);
    if (hideNav) {
      toggle();
    }
    if (route === RouterPathEnum.BLOCKS) dispatch(pageChange(1));
    if (route === "/") {
      dispatch(headerClassUpdater("newclass", "layout-home"));
    } else {
      dispatch(headerClassUpdater("newclass2", "layout-general"));
    }
  };

  const getActive = (path: string) => {
    let cls = "nav-link nav-links";
    if (activeTab === path) {
      cls += " nav-lin";
    } else if (path.includes("details") && activeTab.includes("details")) {
      cls += " nav-lin";
    }
    return cls;
  };

  return (
    <>
      <div className="Desktop-Header">
        <Navbar
          expand="lg"
          fixed="top"
          className={
            window.location.pathname === "/" ? headerLanding : headerClass
          }
        >
          <Container fluid="xl">
            <div className="navbar-brand">
              <Link to="/">
                <img
                  src={Logo}
                  alt="BOASCAN by Bosagora"
                  width="100%"
                  height="40px"
                />
              </Link>
            </div>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                {menuDefine.map((route, index) => {
                  return (
                    route.menubar && (
                      <NavItem key={index}>
                        <NavLink
                          to={route.path}
                          className={getActive(route.path)}
                          onClick={() => updateHeaderColor(route.path)}
                        >
                          <>
                            {t(route.name)}
                            <span className="bbr" />
                          </>
                        </NavLink>
                      </NavItem>
                    )
                  );
                })}
              </Nav>

              <div className="navbar-utils">
                <UncontrolledDropdown className="dropdown-net">
                  <DropdownToggle nav caret>
                    <AiOutlineGlobal className="fa-globe" />
                    {networkName}
                  </DropdownToggle>
                </UncontrolledDropdown>
                <a
                  href="https://github.com/bosagora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github"
                  title="GitHub"
                >
                  <ReactSVG src={github} className="socialicon" />
                </a>
              </div>
            </Collapse>
          </Container>
        </Navbar>
      </div>
      {/*
      <div className="Mobile-Header">
        <Navbar
          expand="lg"
          fixed="top"
          className={
            window.location.pathname === "/" ? headerLanding : headerClass
          }
        >
          <Container fluid="xl">
            <div className="navbar-brand">
              <Link to="/" onClick={() => updateHeaderColor("/")}>
                <img
                  src={Logo}
                  alt="The9 Rollup Explorer"
                  width="100%"
                  height="40px"
                />
              </Link>
            </div>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                <NavItem key={1}>
                  <NavLink
                    to="/"
                    className="nav-link nav-links"
                    onClick={() => updateHeaderColor("/")}
                  >
                    "Dashboard
                    <span className="bbr" />
                  </NavLink>
                </NavItem>

                {menuDefine.map((route, index) => {
                  return (
                    route.menubar && (
                      <NavItem key={index}>
                        <NavLink
                          to={route.path}
                          className="nav-link nav-links"
                          onClick={() => updateHeaderColor(route.path)}
                        >
                          {t(route.name)}
                          <span className="bbr" />
                        </NavLink>
                      </NavItem>
                    )
                  );
                })}
              </Nav>
              <div className="navbar-utils">
                <UncontrolledDropdown className="dropdown-net">
                  <DropdownToggle nav caret>
                    <AiOutlineGlobal className="fa-globe" />
                    {"Agora mainnet"}
                  </DropdownToggle>
                </UncontrolledDropdown>
                <a
                  href="https://github.com/bosagora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github"
                  title="GitHub"
                >
                  <ReactSVG src={github} className="socialicon" />
                </a>
              </div>
            </Collapse>
          </Container>
        </Navbar>
      </div>*/}
    </>
  );
};

export default React.memo(Header);
