import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Alert,
    Spinner,
    Label,
    Col,
    Dropdown
} from "reactstrap";

import { ThemeContext, themes } from "contexts/ThemeContext";

import setting from "assets/img/setting.png";

import logoutlogo from "assets/img/logout.png";

import ToggleDarkModeButton from './ToggleDarkModeButton'

import { signout } from "auth/index";

import history from "../../../../history";

function UserProfileDropdownMenu(props) {

    const logout = (event) => {
        event.preventDefault();
        signout().then((response) => {
          history.push(`/signin`);
        });
      };

    const [color, setcolor] = useState("transparent");

    return (
        <>
            <ThemeContext.Consumer>
                {({ changeTheme, theme }) => (
                    theme == "white-content" ?
                        setcolor("black")
                        : setcolor("white")
                )}
            </ThemeContext.Consumer>
            <Dropdown isOpen={props.dropDownIsOpen}>
                <ul className="dropdown-menu show" style={{ background: props.bgcolor, paddingRight: '10px' }}>
                    {/* <li style={{ textAlign: 'right', paddingBottom: '10px' }}>
                        <NavLink to="/dashboard" style={{ margin: '0px' }}>
                            <Row style={{ direction: "rtl" }}>
                                <Col xs={12} md={3} style={{ paddingLeft: "0px", textAlign: 'center' }}>
                                    <img src={setting} style={{ height: "14px" }}></img>
                                </Col>
                                <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                                    <h5 style={{ color: color, marginTop: '1px' }}>
                                        הגדרות
                                    </h5>
                                </Col>
                            </Row>
                        </NavLink>
                    </li> */}
                    <li onClick ={logout} style={{ textAlign: 'right', paddingBottom: '10px' }}>
                           <a href = "#"> <Row style={{ direction: "rtl" }}>
                                <Col xs={12} md={3} style={{ paddingLeft: "0px", textAlign: 'center' }}>
                                    <img src={logoutlogo} style={{ height: "14px" }}></img>
                                </Col>
                                <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                                    <h5 style={{ color: color, marginTop: '1px' }}>
                                        התנתק
                                    </h5>
                                </Col>
                            </Row>
                            </a>
                    </li>
                    <li style={{ direction: 'ltr' }}>
                        <ToggleDarkModeButton />
                    </li>
                </ul>
            </Dropdown>
        </>
    );
}

export default UserProfileDropdownMenu;
