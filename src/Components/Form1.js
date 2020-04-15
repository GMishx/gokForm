import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { isEmpty, getStates, getDistrict } from "../helpers";

export default function AddressForm(props) {
  const { data } = props;
  console.log(props);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Category
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={data.type.value}
              onChange={(event) =>
                props.handleInputChange("type", event.target.value)
              }
            >
              <MenuItem value={0}>RELIEF CAMPS/SHELTER (Dist wise)</MenuItem>
              <MenuItem value={1}>EMPLOYERS WHOSE LABOUR IS IN-SITU</MenuItem>
              <MenuItem value={2}>
                LOCALITIES WHERE MIGRANT WORKERS ARE CLUSTERED
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="state">State</InputLabel>
            <Select
              labelId="state"
              id="state"
              value={data.state.value}
              disabled
              onChange={(event) =>
                props.handleInputChange("state", event.target.value)
              }
            >
              {getStates().map((s, i) => {
                return (
                  <MenuItem value={s} key={s + i}>
                    {s}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="district">District</InputLabel>
            <Select
              error={isEmpty(data.district.value) && data.district.focused}
              labelId="district"
              id="district"
              value={data.district.value}
              onChange={(event) =>
                props.handleInputChange("district", event.target.value)
              }
            >
              {getDistrict(data.state.value).map((s, i) => {
                return (
                  <MenuItem value={s} key={s + i}>
                    {s}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        {data.type.value === 0 && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="campName"
                name="campName"
                label="Relief Camp/Shelter"
                fullWidth
                onChange={(event) =>
                  props.handleInputChange("campName", event.target.value)
                }
                value={data.campName.value}
                onFocus={() => props.setFocus("campName")}
                error={data.campName.focused && isEmpty(data.campName.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl style={{ minWidth: "100%" }}>
                <InputLabel id="runBy">Run by</InputLabel>
                <Select
                  labelId="Run By"
                  id="runBy"
                  value={data.runBy.value}
                  onChange={(event) =>
                    props.handleInputChange("runBy", event.target.value)
                  }
                >
                  <MenuItem value={"Govt"}>Govt</MenuItem>
                  <MenuItem value={"NGO"}>NGO</MenuItem>
                  <MenuItem value={"Corporate"}>Corporate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {data.type.value === 1 && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="employerName"
              name="employerName"
              label="Name of the Employer/Firm"
              multiline
              fullWidth
              onChange={(event) =>
                props.handleInputChange("employerName", event.target.value)
              }
              value={data.employerName.value}
              onFocus={() => props.setFocus("employerName")}
              error={
                data.employerName.focused && isEmpty(data.employerName.value)
              }
            />
          </Grid>
        )}
        {data.type.value === 1 && (
          <Grid item xs={12} sm={6}>
            <FormControl style={{ minWidth: "100%" }}>
              <InputLabel id="runBy">sector</InputLabel>
              <Select
                labelId="sector"
                id="sector"
                value={data.sector.value}
                onChange={(event) =>
                  props.handleInputChange("sector", event.target.value)
                }
              >
                <MenuItem value={"Building and Construction"}>
                  Building and Construction
                </MenuItem>
                <MenuItem value={"Hotels, Food Service and catering"}>
                  Hotels, Food Service and catering
                </MenuItem>
                <MenuItem value={"Mining and Quarrying"}>
                  Mining and Quarrying
                </MenuItem>
                <MenuItem value={"Transportation and Storage"}>
                  Transportation and Storage
                </MenuItem>
                <MenuItem value={"IT and Communication"}>
                  IT and Communication
                </MenuItem>
                <MenuItem value={"Wholesale and Retail"}>
                  Wholesale and Retail
                </MenuItem>
                <MenuItem value={"Manufacturing"}>Manufacturing</MenuItem>
                <MenuItem value={"Agriculture and Allied Activities"}>
                  Agriculture and Allied Activities
                </MenuItem>
                <MenuItem value={"Water Supply, Sewerage and Waste Management"}>
                  Water Supply, Sewerage and Waste Management
                </MenuItem>
                <MenuItem value={"E-Commerce"}>E-Commerce</MenuItem>
                <MenuItem value={"House Hold And Domestic"}>
                  House Hold And Domestic
                </MenuItem>
                <MenuItem value={"Others (Specify)"}>Others (Specify)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        {data.type.value === 1 && data.sector.value === "Others (Specify)" && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="otherSector"
              name="otherSector"
              label="other Sector"
              multiline
              fullWidth
              onChange={(event) =>
                props.handleInputChange("otherSector", event.target.value)
              }
              value={data.otherSector.value}
              onFocus={() => props.setFocus("otherSector")}
              error={
                data.otherSector.focused && isEmpty(data.otherSector.value)
              }
            />
          </Grid>
        )}
        {(data.type.value === 0 || data.type.value === 1) && (
          <Grid item xs={12}>
            <TextField
              required
              id="facilities"
              name="facilities"
              label="Facilities Provided"
              multiline
              fullWidth
              onChange={(event) =>
                props.handleInputChange("facilities", event.target.value)
              }
              value={data.facilities.value}
              onFocus={() => props.setFocus("facilities")}
              error={data.facilities.focused && isEmpty(data.facilities.value)}
            />
          </Grid>
        )}

        {data.type.value === 2 && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="locality"
                name="locality"
                label="Locality"
                fullWidth
                onChange={(event) =>
                  props.handleInputChange("locality", event.target.value)
                }
                value={data.locality.value}
                onFocus={() => props.setFocus("locality")}
                error={data.locality.focused && isEmpty(data.locality.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                onChange={(event) =>
                  props.handleInputChange("address", event.target.value)
                }
                value={data.address.value}
                onFocus={() => props.setFocus("address")}
                error={data.address.focused && isEmpty(data.address.value)}
              />
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
}
