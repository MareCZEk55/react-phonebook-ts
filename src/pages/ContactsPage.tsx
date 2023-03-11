import { useState, useEffect } from "react";
import "./ContactsPage.css";
import axios, { AxiosResponse } from "axios";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

type Contact = {
  id: number;
  jmeno: string;
  telefon: string;
  typ_zarizeni: string;
  ip_zarizeni: number;
  changeBorder: string;
};

const getContacts: any = () => {
  const URL = "http://localhost:3000/app1/getphonebook";
  return axios.get(URL);
};

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState<
    "jmeno" | "telefon" | "typ_zarizeni" | "ip_zarizeni"
  >("jmeno");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRow, setSelectedRow] = useState({});

  const [selectedName, setSelectedName] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedIP, setSelectedIP] = useState(-1);
  const [disableSaveButton, setDisableSaveButton] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getContacts();
      setContacts(result.data);
    };
    fetchData();
  }, []);

  // Filter contacts by name or phone number
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.jmeno.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.telefon.includes(searchText)
  );

  const handleSortColumnClick = (
    column: "jmeno" | "telefon" | "typ_zarizeni" | "ip_zarizeni"
  ) => {
    setSortOrder(
      sortColumn === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortColumn(column);
  };

  const handleSelectRowClick = (row: Contact) => {
    let prevValue: Contact = {
      id: 0,
      jmeno: "",
      telefon: "",
      typ_zarizeni: "",
      ip_zarizeni: 0,
      changeBorder: ""
    };

    setSelectedRow((prev: Contact) => {
     prevValue = prev;
      return row;
    });

    setSelectedName(row.jmeno);
    setSelectedPhone(row.telefon);
    setSelectedType(row.typ_zarizeni);
    setSelectedIP(row.ip_zarizeni);
    setDisableSaveButton(false);

    prevValue.changeBorder= "";
    row.changeBorder = "selected-row"
  }

  const handleCancelButtonClick = () =>{
    (selectedRow as Contact).changeBorder = ""
    
    setSelectedRow({});

    setSelectedName("");
    setSelectedPhone("");
    setSelectedType("");
    setSelectedIP(-1);
    setDisableSaveButton(true);
  }

  const handleSaveButtonClick = () => {
    console.log(selectedName);
    console.log(selectedIP);
  }

  const sortedContacts = filteredContacts.sort((a, b) => {
    if (sortColumn === "jmeno") {
      return sortOrder === "asc"
        ? a.jmeno.localeCompare(b.jmeno)
        : b.jmeno.localeCompare(a.jmeno);
    } else if (sortColumn === "telefon") {
      return sortOrder === "asc"
        ? a.telefon.localeCompare(b.telefon)
        : b.telefon.localeCompare(a.telefon);
    } else if (sortColumn === "typ_zarizeni") {
      return sortOrder === "asc"
        ? a.typ_zarizeni.localeCompare(b.typ_zarizeni)
        : b.typ_zarizeni.localeCompare(a.typ_zarizeni);
    } else {
      return sortOrder === "asc"
        ? a.ip_zarizeni - b.ip_zarizeni
        : b.ip_zarizeni - a.ip_zarizeni;
    }
  });

  const renderArrow = (columnName: string) => {
    if (columnName !== sortColumn) return null;
    if (sortOrder === "asc")
      return <ArrowDropDown style={{ verticalAlign: "middle" }} />;
    return <ArrowDropUp style={{ verticalAlign: "middle" }} />;
  };

  return (
    <div
      style={{
        display: "flex",
        clear: "both",
        content: "",
        maxHeight: "90vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          paddingLeft: "10px",
          paddingRight: "5px",
          maxHeight: "90vh",
          overflow: "hidden",
          flex: "50%",
        }}
      >
        <TextField
          label="Hledat"
          variant="outlined"
          value={searchText}
          size="small"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 20, marginTop: 15 }}
          inputProps={{ style: {marginTop:"5px"}}}
        />
        {filteredContacts.length === 0 ? (
          <Typography variant="h6" align="center" style={{ marginTop: "40px" }}>
            Žádný kontakt nenalezen
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader sx={{cursor:"pointer", borderCollapse: "collapse"}}>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => handleSortColumnClick("jmeno")}>
                    Jmeno {renderArrow("jmeno")}
                  </TableCell>
                  <TableCell onClick={() => handleSortColumnClick("telefon")}>
                    Telefon {renderArrow("telefon")}
                  </TableCell>
                  <TableCell
                    onClick={() => handleSortColumnClick("typ_zarizeni")}
                  >
                    Typ zařízení {renderArrow("typ_zarizeni")}
                  </TableCell>
                  <TableCell
                    onClick={() => handleSortColumnClick("ip_zarizeni")}
                  >
                    IP zařízení {renderArrow("ip_zarizeni")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedContacts.map((contact) => (
                  <TableRow key={contact.id} onClick={() => handleSelectRowClick(contact)}
                   className={contact.changeBorder}>
                    <TableCell>{contact.jmeno}</TableCell>
                    <TableCell>{contact.telefon}</TableCell>
                    <TableCell>{contact.typ_zarizeni}</TableCell>
                    <TableCell>{contact.ip_zarizeni === 1 ? "Ano" : "Ne"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingRight: "10px",
          paddingLeft: "5px",
          paddingTop: "20px",
          maxHeight: "90vh",
          overflow: "hidden",
          flex: "50%",
        }}
      >
        <div id="inputFieldsPhone">
          <Grid container columnSpacing={2}>
            <Grid container direction="column" item xs={4} alignContent="center">
              <Grid item container direction="column" justifyContent="center" style={{height:"50px"}}>
                Jméno
              </Grid>
              <Grid item container direction="column" justifyContent="center"  style={{height:"50px"}}>
                Telefon
              </Grid>
              <Grid item container direction="column" justifyContent="center" style={{height:"50px"}}>
                Typ zařízení
              </Grid>
              <Grid item container direction="column" justifyContent="center" style={{height:"50px"}}>
                IP zažízení
              </Grid>
            </Grid>
            <Grid container direction="column" item xs={4} alignContent="center">
              <Grid item container direction="column" justifyContent="center" style={{height:"50px"}}>
                <TextField size="small" variant="outlined" margin="dense" value={selectedName} onChange={(e) => {setSelectedName(e.target.value)}}
                  InputProps={{ style: {height:"40px"} }} inputProps={{ style: {marginTop:"0px"}}}/>
              </Grid>
              <Grid item container direction="column" justifyContent="center" style={{height:"50px"}}>
              <TextField size="small" variant="outlined" margin="dense" value={selectedPhone}
              InputProps={{ style: {height:"40px"} }} inputProps={{ style: {marginTop:"0px"}}}/>
              </Grid>
              <Grid item container direction="column" justifyContent="center" style={{height:"50px"}}>
              <TextField size="small" variant="outlined" margin="dense" value={selectedType}
              InputProps={{ style: {height:"40px"} }} inputProps={{ style: {marginTop:"0px"}}}/>
              </Grid>
              <Grid item container direction="column" justifyContent="center" style={{height:"50px"}}>
              <FormControl variant="outlined">
              <Select value={selectedIP} size="small" onChange={(e) => setSelectedIP(e.target.value as number)}>
                <MenuItem value={1}>Ano</MenuItem>
                <MenuItem value={0}>Ne</MenuItem>
                <MenuItem disabled value={-1} style={{ display: "none" }}></MenuItem>
              </Select>
              </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div id="buttonsFieldsPhone" style={{ paddingTop: "15px" }}>
          <Button variant="contained" onClick={() => handleSaveButtonClick()} 
          disabled={disableSaveButton}
          sx={{marginRight: "15px"}}>Uložit</Button>
          <Button variant="contained" onClick={() => handleCancelButtonClick()} disabled={disableSaveButton}>Zrušit</Button>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
