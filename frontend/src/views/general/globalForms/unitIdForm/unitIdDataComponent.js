import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

import { singleFileUpload } from "../../../../data/api";
// reactstrap components
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
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { produce } from "immer";
import { generate } from "shortid";
import { toast } from "react-toastify";
import { isAuthenticated } from "auth";
import Select from 'components/general/Select/AnimatedSelect'

const UnitIdDataComponent = ({ match }) => {
  const user = isAuthenticated();

  const [state, setState] = useState({});
  //units
  const [gdods, setGdods] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  const [pikods, setPikods] = useState([]);

  async function init() {
    if (match.params.id != "0") {
      loadDatas();
    }
    loadPikods();
  }

  const loadPikods = async () => {
    await axios.get("http://localhost:8000/api/pikod",)
      .then(response => {
        setPikods(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const loadOgdas = async (pikodid) => {
    let temppikodogdas = [];
    await axios.post("http://localhost:8000/api/ogda/ogdasbypikodid", { pikod: pikodid })
      .then(response => {
        for (let j = 0; j < response.data.length; j++)
          temppikodogdas.push(response.data[j])
      })
      .catch((error) => {
        console.log(error);
      })
    setOgdas(temppikodogdas);
  }

  const loadHativas = async (ogdaid) => {
    let tempogdahativas = [];
    await axios.post("http://localhost:8000/api/hativa/hativasbyogdaid", { ogda: ogdaid })
      .then(response => {
        for (let j = 0; j < response.data.length; j++)
          tempogdahativas.push(response.data[j])
      })
      .catch((error) => {
        console.log(error);
      })
    setHativas(tempogdahativas);
  }

  const loadGdods = async (hativaid) => {
    let temphativasgdods = [];
    await axios.post("http://localhost:8000/api/gdod/gdodsbyhativaid", { hativa: hativaid })
      .then(response => {
        for (let j = 0; j < response.data.length; j++)
          temphativasgdods.push(response.data[j])
      })
      .catch((error) => {
        console.log(error);
      })
    setGdods(temphativasgdods);
  }

  const loadDatas = () => {
    axios
      .get(`http://localhost:8000/api/unitId/${match.params.id}`)
      .then((response) => {
        let tempdatas = response.data;
        setState(tempdatas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  }

  function handleChange2(selectedOption, name) {
    if (!(selectedOption.value == "בחר"))
      setState({ ...state, [name]: selectedOption.value });
    else {
      let tempstate = { ...state };
      delete tempstate[name];
      setState(tempstate);
    }
  }

  const clickSubmit = async (event) => {
    CheckFormData();
  };

  const CheckFormData = () => {
    let flag = true;
    let error = "";

    if (((state.name == undefined) || (state.name == ""))) {
      error += "חסר שדה שם יחידה, "
      flag = false;
    }
    if (((state.location == undefined) || (state.location == ""))) {
      error += "חסר שדה מיקום יחידה, "
      flag = false;
    }
    if (((state.unitStructure == undefined) || (state.unitStructure == ""))) {
      error += "חסר שדה מבנה היחידה, "
      flag = false;
    }
    if (((state.unitMeans == undefined) || (state.unitMeans == ""))) {
      error += "חסר שדה פירוט האמצעים ביחידה, "
      flag = false;
    }
    if (((state.mainOccupation == undefined) || (state.mainOccupation == ""))) {
      error += "חסר שדה עיסוק מרכזי, "
      flag = false;
    }
    if (((state.unitStructureTree == undefined) || (state.unitStructureTree == ""))) {
      error += "חסר שדה עץ מבנה יחידה, "
      flag = false;
    }
    if (((state.teneStructureTree == undefined) || (state.teneStructureTree == ""))) {
      error += "חסר שדה עץ מבנה מחלקת טנ''א, "
      flag = false;
    }
    if (user.user.role == "1"){
      state.gdod = user.user.gdod
    }
    else if (((state.gdod == undefined) || (state.gdod == ""))) {
      error += "חסר שדה גדוד , "
      flag = false;
    }

    if (singleFile==""){
      error += "נא להוסיף קובץ"
      flag = false;
    }
    if (singleFile2==""){
      error += "נא להוסיף קובץ"
      flag = false;
    }
    if (flag == true) {
      SubmitData();
      toast.success("הטופס עודכן בהצלחה");
      history.goBack()
    }
    else {
      toast.error(error)
    }
  }

  const UploadFile = async (id) => {
    const formData = new FormData();
    const collec = "unitId";
    formData.append("file", singleFile);
    await singleFileUpload(formData, collec, id);
    console.log("First File:" + singleFile);
  };


  const UploadFile2 = async (id) => {
    const formData = new FormData();
    const collec = "unitId";
    formData.append("file", singleFile2);
    await singleFileUpload(formData, collec, "2_" + id);
    console.log("Second File:" + singleFile2);
  };

  async function SubmitData() {
    let tempData;
    if (match.params.id == "0") {
      let result = await axios.post(
        "http://localhost:8000/api/unitId",
        state
      );
      tempData = result.data;
    } else {
      let tempWithDeleteId = state;
      delete tempWithDeleteId._id;
      let result = await axios.put(
        `http://localhost:8000/api/unitId/${match.params.id}`,
        tempWithDeleteId
      );
      tempData = result.data;
    }
    if (singleFile !== "") {
      await UploadFile(tempData._id);
      await UploadFile2(tempData._id);
    }



    // console.log("post")
    // let result = await axios.post("http://localhost:8000/api/unitId", unit);
    // tempUnitData = result.data;
  }

  useEffect(() => {
    setOgdas([]);
    loadOgdas(state.pikod);
  }, [state.pikod]);

  useEffect(() => {
    setHativas([]);
    loadHativas(state.ogda);
  }, [state.ogda]);

  useEffect(() => {
    setGdods([]);
    loadGdods(state.hativa);
  }, [state.hativa]);

  useEffect(() => {
    init();
  }, []);

  const [singleFile, setSingleFile] = useState("");
  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const [singleFile2, setSingleFile2] = useState("");
  const SingleFileChange2 = (e) => {
    setSingleFile2(e.target.files[0]);
  };

  return (
    <Card>
      <CardHeader style={{ direction: "rtl" }}>
        <CardTitle
          tag="h3"
          style={{ direction: "rtl", textAlign: "center", fontWeight: "bold" }}
        >
          טופס תעודת זהות יחידה
        </CardTitle>
        {/*headline*/}
      </CardHeader>
      <CardBody style={{ direction: "rtl" }}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                שם יחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                מיקום היחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="location"
                  value={state.location}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                מבנה היחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="unitStructure"
                  value={state.unitStructure}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                פירוט האמצעים ביחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="unitMeans"
                  value={state.unitMeans}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                עיסוק מרכזי
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="mainOccupation"
                  value={state.mainOccupation}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                עץ מבנה יחידה
              </div>
              {/* <FormGroup dir="rtl"> */}
              <Input
                type="file"
                name="unitStructureTree"
                value={state.unitStructureTree}
                onChange={(e) => SingleFileChange(e)}
              ></Input>
              {/* </FormGroup> */}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                עץ מבנה מחלקת טנ"א
              </div>
              {/* <FormGroup dir="rtl"> */}
              <Input
                type="file"
                name="teneStructureTree"
                value={state.teneStructureTree}
                onChange={(e) => SingleFileChange2(e)}
              ></Input>
              {/* </FormGroup> */}
            </Col>
          </Row>
          <Row style={{ paddingTop: '10px' }}>
            {((user.user.role == "0")) ?
              <>
                {(!(state.ogda)) ?
                  <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                    <h6>פיקוד</h6>
                    <Select data={pikods} handleChange2={handleChange2} name={'pikod'} val={state.pikod ? state.pikod : undefined} />
                  </Col> :
                  <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                    <h6>פיקוד</h6>
                    <Select data={pikods} handleChange2={handleChange2} name={'pikod'} val={state.pikod ? state.pikod : undefined} isDisabled={true} />
                  </Col>}
              </> : null}

            {((user.user.role == "0") || (user.user.role == "4")) ?
              <>
                {((state.pikod) && !(state.hativa)) ?
                  <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                    <h6>אוגדה</h6>
                    <Select data={ogdas} handleChange2={handleChange2} name={'ogda'} val={state.ogda ? state.ogda : undefined} />
                  </Col> :
                  <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                    <h6>אוגדה</h6>
                    <Select data={ogdas} handleChange2={handleChange2} name={'ogda'} val={state.ogda ? state.ogda : undefined} isDisabled={true} />
                  </Col>}
              </> : null}

            {((user.user.role == "0") || (user.user.role == "4") || (user.user.role == "3")) ?
              <>
                {((state.ogda) && !(state.gdod)) ?
                  <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                    <h6>חטיבה</h6>
                    <Select data={hativas} handleChange2={handleChange2} name={'hativa'} val={state.hativa ? state.hativa : undefined} />
                  </Col> :
                  <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                    <h6>חטיבה</h6>
                    <Select data={hativas} handleChange2={handleChange2} name={'hativa'} val={state.hativa ? state.hativa : undefined} isDisabled={true} />
                  </Col>}
              </> : null}

            {((user.user.role == "0") || (user.user.role == "4") || (user.user.role == "3") || (user.user.role == "2")) ?
              <>
                {((state.hativa)) ?
                  <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                    <h6>גדוד</h6>
                    <Select data={gdods} handleChange2={handleChange2} name={'gdod'} val={state.gdod ? state.gdod : undefined} />
                  </Col> :
                  <Col style={{ justifyContent: 'right', alignContent: 'right', textAlign: 'right' }}>
                    <h6>גדוד</h6>
                    <Select data={gdods} handleChange2={handleChange2} name={'gdod'} val={state.gdod ? state.gdod : undefined} isDisabled={true} />
                  </Col>}
              </> : null}
          </Row>
          <hr style={{ borderTop: "1px solid darkGray" }} />
          <Row>
            <Col xs={12} md={4}></Col>
            <Col xs={12} md={4}>
              <Button
                type="primary"
                className="btn btn-info"
                style={{ width: "100%" }}
                onClick={() => clickSubmit()}
              >
                הוסף נתונים
              </Button>
            </Col>
            <Col xs={12} md={4}></Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  );
};
export default withRouter(UnitIdDataComponent);
