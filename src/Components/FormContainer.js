import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { isEmpty } from "../helpers";
import axios from "axios";

import { GOOGLE_MACRO_URL } from "../config";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://wurkwell.com">
        wurkwell.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

const steps = ["Select Category", "Add Information"];

function getStepContent(step, data, handleInputChange, onFocus) {
  switch (step) {
    case 0:
      return (
        <Form1
          data={data[0]}
          handleInputChange={handleInputChange}
          setFocus={onFocus}
        />
      );
    case 1:
      return (
        <Form2
          data={data[1]}
          handleInputChange={handleInputChange}
          setFocus={onFocus}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

class FormContainer extends Component {
  state = {
    activeStep: 0,
    type: {
      value: 0,
    },
    state: {
      value: "",
      focused: false,
    },
    district: {
      value: "",
      focused: false,
    },
    campName: {
      value: "",
      focused: false,
    },
    runBy: {
      value: "Govt",
      focused: false,
    },
    facilities: {
      value: "",
      focused: false,
    },
    employerName: {
      value: "",
      focused: false,
    },
    sector: {
      value: "Building and Construction",
      focused: false,
    },
    otherSector: {
      value: "",
      focused: false,
    },
    otherOccupation: {
      value: "",
      focused: false,
    },
    locality: {
      value: "",
      focused: false,
    },
    address: {
      value: "",
      focused: false,
    },
    name: {
      value: "",
      focused: false,
    },
    age: {
      value: "",
      focused: false,
    },
    gender: {
      value: "M",
      focused: false,
    },
    occupation: {
      value: "Agriculture",
      focused: false,
    },
    mobile: {
      value: "",
      focused: false,
    },
    lastAddress: {
      value: "",
      focused: false,
    },
    nativeDistrict: {
      value: "",
      focused: false,
    },
    nativeState: {
      value: "",
      focused: false,
    },
    haveBank: {
      value: "N",
      focused: false,
    },
    haveJandhan: {
      value: "N",
      focused: false,
    },
    accNo: {
      value: "",
      focused: false,
    },
    ifsc: {
      value: "",
      focused: false,
    },
    ujjwala: {
      value: "N",
      focused: false,
    },
    aadhaar: {
      value: "",
      focused: false,
    },
    error: false,
    success: false,
  };

  removeError = () => {
    this.setState({
      error: false,
    });
  };

  setError = () => {
    this.setState({
      error: true,
    });
  };

  removeSuccess = () => {
    this.setState({
      success: false,
    });
  };

  setSuccess = () => {
    this.setState({
      success: true,
    });
  };

  handleSubmit = () => {
    console.log("submit");
    const {
      name,
      age,
      gender,
      occupation,
      mobile,
      lastAddress,
      nativeDistrict,
      nativeState,
      haveBank,
      haveJandhan,
      accNo,
      ifsc,
      ujjwala,
      aadhaar,
      otherOccupation,
    } = this.state;
    if (
      isEmpty(name.value) ||
      isEmpty(age.value) ||
      isNaN(age.value) ||
      isEmpty(mobile.value) ||
      !mobile.value.match("^[0-9]{10}$") ||
      isEmpty(lastAddress.value) ||
      isEmpty(nativeDistrict.value) ||
      isEmpty(nativeState.value) ||
      (haveBank === "Y" && (isEmpty(accNo.value) || isEmpty(ifsc.value))) ||
      (occupation === "Others (Specify)" && isEmpty(otherOccupation.value))
    ) {
      this.setState({
        name: {
          ...this.state.name,
          focused: true,
        },
        age: {
          ...this.state.age,
          focused: true,
        },
        mobile: {
          ...this.state.mobile,
          focused: true,
        },
        lastAddress: {
          ...this.state.lastAddress,
          focused: true,
        },
        nativeDistrict: {
          ...this.state.nativeDistrict,
          focused: true,
        },
        nativeState: {
          ...this.state.age,
          focused: true,
        },
        accNo: {
          ...this.state.age,
          focused: true,
        },
        ifsc: {
          ...this.state.ifsc,
          focused: true,
        },
      });
      return;
    }
    var ts = new Date();
    axios
      .get(
        GOOGLE_MACRO_URL,
        {
          date: ts.toLocaleString(),
          type: this.state.type.value,
          state: this.state.state.value,
          district: this.state.district.value,
          campName: this.state.campName.value,
          runBy: this.state.runBy.value,
          facilities: this.state.facilities.value,
          name: this.state.name.value,
          age: this.state.age.value,
          gender: this.state.gender.value,
          occupation: this.state.occupation.value,
          mobile: this.state.mobile.value,
          lastAddress: this.state.lastAddress.value,
          nativeDistrict: this.state.nativeDistrict.value,
          nativeState: this.state.nativeState.value,
          haveBank: this.state.haveBank.value,
          haveJandhan: this.state.haveJandhan.value,
          accNo: this.state.accNo.value,
          ifsc: this.state.ifsc.value,
          ujjwala: this.state.ujjwala.value,
          aadhaar: this.state.aadhaar.value,
          otherOccupation: this.state.otherOccupation.value
        }
      )
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState((prevState) => {
      return {
        activeStep: prevState.activeStep + 1,
      };
    });
  };

  handleNext = () => {
    console.log("next");
    const {
      type,
      state,
      district,
      campName,
      runBy,
      facilities,
      employerName,
      sector,
      locality,
      address,
      otherSector,
    } = this.state;
    if (this.state.activeStep === 1) {
      this.handleSubmit();
      return;
    }
    if (type.value === 0) {
      if (
        isEmpty(state.value) ||
        isEmpty(district.value) ||
        isEmpty(campName.value) ||
        isEmpty(facilities.value)
      ) {
        this.setState({
          state: {
            ...this.state.state,
            focused: true,
          },
          district: {
            ...this.state.district,
            focused: true,
          },
          campName: {
            ...this.state.campName,
            focused: true,
          },
          facilities: {
            ...this.state.facilities,
            focused: true,
          },
        });
        return;
      }
    } else if (type.value === 1) {
      if (
        isEmpty(state.value) ||
        isEmpty(district.value) ||
        isEmpty(employerName.value) ||
        isEmpty(facilities.value) ||
        (sector.value === "Others (Specify)" && isEmpty(otherSector.value))
      ) {
        this.setState({
          state: {
            ...this.state.state,
            focused: true,
          },
          district: {
            ...this.state.district,
            focused: true,
          },
          employerName: {
            ...this.state.employerName,
            focused: true,
          },
          facilities: {
            ...this.state.facilities,
            focused: true,
          },
          otherSector: {
            ...this.state.otherSector,
            focused: true,
          },
        });
        return;
      }
    } else if (type.value === 2) {
      if (
        isEmpty(state.value) ||
        isEmpty(district.value) ||
        isEmpty(locality.value) ||
        isEmpty(address.value)
      ) {
        this.setState({
          state: {
            ...this.state.state,
            focused: true,
          },
          district: {
            ...this.state.district,
            focused: true,
          },
          locality: {
            ...this.state.locality,
            focused: true,
          },
          address: {
            ...this.state.address,
            focused: true,
          },
        });
        return;
      }
    }
    this.setState((prevState) => {
      return {
        activeStep: prevState.activeStep + 1,
      };
    });
  };

  handleBack = () => {
    this.setState((prevState) => {
      return {
        activeStep: prevState.activeStep - 1,
      };
    });
  };

  handleInputChange = (field, val) => {
    this.setState({
      [field]: {
        focused: true,
        value: val,
      },
    });
  };

  setFocus = (field) => {
    this.setState({
      [field]: {
        ...this.state[field],
        focused: true,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const typeMap = [
      "RELIEF CAMPS/SHELTER (Dist wise)",
      "EMPLOYERS WHOSE LABOUR IS IN-SITU",
      "LOCALITIES WHERE MIGRANT WORKERS ARE CLUSTERED",
    ];
    const {
      activeStep,
      state,
      district,
      type,
      campName,
      runBy,
      facilities,
      employerName,
      sector,
      locality,
      address,
      name,
      age,
      gender,
      occupation,
      mobile,
      lastAddress,
      nativeDistrict,
      nativeState,
      haveBank,
      haveJandhan,
      accNo,
      ifsc,
      ujjwala,
      aadhaar,
      otherSector,
      otherOccupation,
      error,
      success,
    } = this.state;
    const Form1Data = {
      state,
      district,
      type,
      campName,
      runBy,
      facilities,
      employerName,
      sector,
      locality,
      address,
      otherSector,
    };
    const form2Data = {
      name,
      age,
      gender,
      occupation,
      mobile,
      lastAddress,
      nativeDistrict,
      nativeState,
      haveBank,
      haveJandhan,
      accNo,
      ifsc,
      ujjwala,
      aadhaar,
      otherOccupation,
    };
    const data = [Form1Data, form2Data];
    return (
      <React.Fragment>
        <CssBaseline />
        {/* <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Company name
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Collapse style={{ marginBottom: 10 }} in={error} className="alert">
          <Alert
            severity={"error"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={this.removeError}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Something Went Wrong
          </Alert>
        </Collapse>
        <Dialog
          open={success}
          onClose={this.removeSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Data Submitted Successfully"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={this.removeSuccess} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Migrant Workers Information
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(
                    activeStep,
                    data,
                    this.handleInputChange,
                    this.setFocus
                  )}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FormContainer);
