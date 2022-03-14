import React, { useEffect, useState, useMemo, useRef } from "react";
import Axios from "axios";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import CertificationIcon from "@material-ui/icons/VerifiedUser";
// import ScienceIcon from "@mui/icons-material/Science";
// import CertificationIcon from "@material-ui/icons/WorkspacePremium";
import certificationsManagementsIcon from "assets/img/quality-control.png";
// @material-ui/icons
// import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
// import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import Certifications from "views/Certifications/Certifications.js";
import Page from "react-page-loading";

// import { bugs, website, server } from "variables/general.js";

// import {
//     dailySalesChart,
//     emailsSubscriptionChart,
//     completedTasksChart
// } from "variables/charts.js";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Link } from "react-router-dom";
import { Check, Eco, People } from "@material-ui/icons";
import moment from "moment";
import UserCard from "components/general/DashboardCards/UserCard/UserCard";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(dashboardStyle);

export default function Home() {
  const [validCerts, setValidCerts] = useState("");
  const [expiredCerts, setExpiredCerts] = useState("");
  const [isExpiredCerts, setIsExpiredCerts] = useState("");
  const [isAlertCerts, setIsAlertCerts] = useState("");

  const [validSuper, setValidSuper] = useState("");
  const [expiredSuper, setExpiredSuper] = useState("");
  const [isExpiredSuper, setIsExpiredSuper] = useState("");
  const [isAlertSuper, setIsAlertSuper] = useState("");

  const [validEquip, setValidEquip] = useState("");
  const [expiredEquip, setExpiredEquip] = useState("");
  const [isExpiredEquip, setIsExpiredEquip] = useState("");
  const [isAlertEquip, setIsAlertEquip] = useState("");

  const [validEnviorment, setValidEnviorment] = useState("");
  const [expiredEnviorment, setExpiredEnviorment] = useState("");
  const [isExpiredEnviorment, setIsExpiredEnviorment] = useState("");
  const [isAlertEnviorment, setIsAlertEnviorment] = useState("");

  const certsLoad = () => {
    Axios.get("http://localhost:8000/api/certificationsManagement").then(
      (response) => {
        // console.log(response.data);
        // console.log(response.data[0].certificationValidity);
        var valid = 0;
        var expired = 0;
        var isExpired = false;
        var isAlert = false;
        var today = new Date();
        for (var i = 0; i < response.data.length; i++) {
          if (Date.parse(response.data[i].certificationValidity) > today)
            valid++;
          else {
            expired++;
            isExpired = true;
          }
          if (
            moment(response.data[i].certificationValidity).diff(
              moment(today),
              "days"
            ) < 14
          ) {
            isAlert = true;
          }
        }
        // console.log(valid);
        // console.log(isAlert);
        setIsAlertCerts(isAlert);
        setExpiredCerts(expired);
        setValidCerts(valid);
        setIsExpiredCerts(isExpired);
        // console.log("test")
      }
    );
  }

  const superLoad = async () => {
    await Axios.get("http://localhost:8000/api/occupationalSupervision").then(
      (response) => {
        console.log(response.data);
        console.log(response.data[0].nextTestDate);
        var valid = 0;
        var expired = 0;
        var isExpired = false;
        var isAlert = false;
        var today = new Date();
        for (var i = 0; i < response.data.length; i++) {
          if (Date.parse(response.data[i].nextTestDate) > today)
            valid++;
          else {
            expired++;
            isExpired = true;
          }
          if (
            moment(response.data[i].nextTestDate).diff(
              moment(today),
              "days"
            ) < 14
          ) {
            isAlert = true;
          }
        }      
        // console.log(valid);
        // console.log(isAlert);

         setValidSuper(valid);
         setExpiredSuper(expired);
         setIsExpiredSuper(isExpired);
        setIsAlertSuper(isAlert);
        console.log(validSuper);
        console.log(expiredSuper);
        console.log("test")
      }
    );
  }

  const equipLoad = () => {
    Axios.get("http://localhost:8000/api/equipmentAndMaterialsPeriodicInspections").then(
      (response) => {
        console.log(response.data);
        console.log(response.data[0].nextTestDate);
        var valid = 0;
        var expired = 0;
        var isExpired = false;
        var isAlert = false;
        var today = new Date();
        for (var i = 0; i < response.data.length; i++) {
          if (Date.parse(response.data[i].nextTestDate) > today)
            valid++;
          else {
            expired++;
            isExpired = true;
          }
          if (
            moment(response.data[i].nextTestDate).diff(
              moment(today),
              "days"
            ) < 14
          ) {
            isAlert = true;
          }
        }      
        // console.log(valid);
        // console.log(isAlert);

        setValidEquip(valid);
        setExpiredEquip(expired);
        setIsExpiredEquip(isExpired);
        setIsAlertEquip(isAlert);
        console.log(validEquip);
        console.log(expiredEquip);
        console.log("test")
      }
    );
  }

const enviormentLoad = () => {
    Axios.get("http://localhost:8000/api/environmentalMonitoring").then(
      (response) => {
        console.log(response.data);
        console.log(response.data[0].nextMonitoringDate);
        var valid = 0;
        var expired = 0;
        var isExpired = false;
        var isAlert = false;
        var today = new Date();
        for (var i = 0; i < response.data.length; i++) {
          if (Date.parse(response.data[i].nextMonitoringDate) > today)
            valid++;
          else {
            expired++;
            isExpired = true;
          }
          if (
            moment(response.data[i].nextMonitoringDate).diff(
              moment(today),
              "days"
            ) < 14
          ) {
            isAlert = true;
          }
        }      
        // console.log(valid);
        // console.log(isAlert);

        setValidEnviorment(valid);
        setExpiredEnviorment(expired);
        setIsExpiredEnviorment(isExpired);
        setIsAlertEnviorment(isAlert);
        console.log(validEnviorment);
        console.log(expiredEnviorment);
        console.log("test")
      }
    );
  }



  useEffect(() => {
    certsLoad();
    superLoad();
    equipLoad();
    enviormentLoad();
  },[]);


  const classes = useStyles();

  return (
    <Page loader={"resize-spin"} color={"#A9A9A9"} size={4}>
      <div>
        <Container>
          <UserCard />
        </Container>

        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"certificationsManagements"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <CertificationIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    ניהול הסמכות
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    {validCerts}/{validCerts + expiredCerts}{" "}
                    <small> בתוקף</small>
                  </h3>
                </CardHeader>
                {isExpiredCerts ? (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Warning />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        שים לב! חלק מההסמכות הן פגות תוקף
                      </a>
                    </div>
                  </CardFooter>
                ) : (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Check />
                      לא נדרשת פעולה מיידית
                    </div>
                  </CardFooter>
                )}

                {isAlertCerts ? (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <DateRange />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        הסמכות מסוימות יפוגו בשבועיים הקרובים
                      </a>
                    </div>
                  </CardFooter>
                ) : (
                  <></>
                )}
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"occupationalSupervision"}>
            <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <CertificationIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                   פיקוח תעסוקתי
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    {validSuper}/{validSuper + expiredSuper}{" "}
                    <small> בתוקף</small>
                  </h3>
                </CardHeader>
                {isExpiredSuper ? (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Warning />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        שים לב! חלק מההסמכות הן פגות תוקף
                      </a>
                    </div>
                  </CardFooter>
                ) : (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Check />
                      לא נדרשת פעולה מיידית
                    </div>
                  </CardFooter>
                )}

                {isAlertSuper ? (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <DateRange />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        הסמכות מסוימות יפוגו בשבועיים הקרובים
                      </a>
                    </div>
                  </CardFooter>
                ) : (
                  <></>
                )}
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"equipmentAndMaterialsPeriodicInspections"}>
            <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <CertificationIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                   בדיקות תקופתיות לציוד וחומרים
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    {validEquip}/{validEquip + expiredEquip}{" "}
                    <small> בתוקף</small>
                  </h3>
                </CardHeader>
                {isExpiredEquip ? (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Warning />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        שים לב! חלק מההסמכות הן פגות תוקף
                      </a>
                    </div>
                  </CardFooter>
                ) : (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Check />
                      לא נדרשת פעולה מיידית
                    </div>
                  </CardFooter>
                )}

                {isAlertEquip ? (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <DateRange />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        הסמכות מסוימות יפוגו בשבועיים הקרובים
                      </a>
                    </div>
                  </CardFooter>
                ) : (
                  <></>
                )}
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"environmentalMonitoring"}>
            <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <CertificationIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    ניטורים סביבתיים
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    {validEnviorment}/{validEnviorment + expiredEnviorment}{" "}
                    <small> בתוקף</small>
                  </h3>
                </CardHeader>
                {isExpiredEnviorment ? (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Warning />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        שים לב! חלק מההסמכות הן פגות תוקף
                      </a>
                    </div>
                  </CardFooter>
                ) : (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Check />
                      לא נדרשת פעולה מיידית
                    </div>
                  </CardFooter>
                )}

                {isAlertEnviorment ? (
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <DateRange />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        הסמכות מסוימות יפוגו בשבועיים הקרובים
                      </a>
                    </div>
                  </CardFooter>
                ) : (
                  <></>
                )}
              </Card>
            </Link>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={2} sm={6} md={3}>
            <Link to={"unitId"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    תעודת זהות יחידה
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"safetyOfficersQualification"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    כשירות ממונים על הבטיחות
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"trainingProgram"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    תכנית הדרכות
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"machinesAndEquipmentPeriodicInspections"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    בדיקות תקופתיות למכונות וציוד
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"riskManagementMonitoring"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    מעקב ניהול סיכונים
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"monthlySafetyCommitteesMonitoring"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    מעקב וועדות בטיחות חודשיות
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"hazardsMonitoring"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    מעקב סקר מפגעים
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"homsManagementMonitoring"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    מעקב ניהול חומ"ס
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"personalProtectiveEquipmentMonitoring"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    מעקב ציוד מגן אישי
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"groundingTests"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    בדיקות הארקות חשמל ומבנים
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Link to={"reviewsDocumentation"}>
              <Card style={{ color: "#000", height: "13rem" }}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <VerifiedUserIcon />
                  </CardIcon>
                  <h3
                    style={{ color: "white" }}
                    className={classes.cardCategory}
                  >
                    תיעוד ביקורות
                  </h3>
                  <h3 style={{ color: "white" }} className={classes.cardTitle}>
                    100%
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Check />
                    לא נדרשת פעולה מיידית
                  </div>
                </CardFooter>
              </Card>
            </Link>
          </GridItem>
        </GridContainer>
        {/*  <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={dailySalesChart.data}
                                type="Line"
                                options={dailySalesChart.options}
                                listener={dailySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Daily Sales</h4>
                            <p className={classes.cardCategory}>
                                <span className={classes.successText}>
                                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated 4 minutes ago
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                            <p className={classes.cardCategory}>Last Campaign Performance</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> campaign sent 2 days ago
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={completedTasksChart.data}
                                type="Line"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Completed Tasks</h4>
                            <p className={classes.cardCategory}>Last Campaign Performance</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> campaign sent 2 days ago
              </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomTabs
                        title="Tasks:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Bugs",
                                tabIcon: BugReport,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0, 3]}
                                        tasksIndexes={[0, 1, 2, 3]}
                                        tasks={bugs}
                                    />
                                )
                            },
                            {
                                tabName: "Website",
                                tabIcon: Code,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[0]}
                                        tasksIndexes={[0, 1]}
                                        tasks={website}
                                    />
                                )
                            },
                            {
                                tabName: "Server",
                                tabIcon: Cloud,
                                tabContent: (
                                    <Tasks
                                        checkedIndexes={[1]}
                                        tasksIndexes={[0, 1, 2]}
                                        tasks={server}
                                    />
                                )
                            }
                        ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                            <p className={classes.cardCategoryWhite}>
                                New employees on 15th September, 2016
              </p>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>*/}
      </div>
    </Page>
  );
}

// "@material-ui/data-grid": "*",
