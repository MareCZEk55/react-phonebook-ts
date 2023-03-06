import { useState, useEffect } from "react";
import "./ContactsPage.css";
import axios, { AxiosResponse } from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

type Contact = {
    jmeno: string;
    telefon: string;
    typ_zarizeni: string;
    ip_zarizeni: number;
  };

  const dummyData: Contact[] = [
    {
        jmeno: "John Doe",
        telefon: "123-456-7890",
        typ_zarizeni: "Mobile",
        ip_zarizeni: 0,
    },
  ];

  const getContacts: any = () => {
    const URL = "http://localhost:3000/app1/getphonebook"
    return axios.get(URL);
  }

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchText, setSearchText] = useState("");
    const [filteredContacts2, setFilteredContacts2] = useState<Contact[]>([]);
    const [sortBy, setSortBy] = useState('jmeno');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  

    useEffect(() => {
      const fetchData = async () => {
        const result = await getContacts();
        setContacts(result.data);
      };
      fetchData();
    }, [])
    
  
    // Handle sorting event
    const handleSort = (columnName: keyof Contact) => {
      setContacts((prevContacts) =>
        [...prevContacts].sort((a, b) =>
          a[columnName] > b[columnName] ? 1 : -1
        )
      );
    };
  
    // Filter contacts by name or phone number
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.jmeno.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.telefon.includes(searchText)
    );

    const handleSortClick = (field: keyof Contact) => {
      if (field === sortBy) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(field);
        setSortOrder('asc');
      }
    };
  
    const sortedContacts = filteredContacts2.sort((a, b) => {
      const aVal = a[sortBy as keyof Contact];
      const bVal = b[sortBy as keyof Contact];
      if (aVal < bVal) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginLeft: "10px" }}>
        <TextField
          label="Hledat"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '50%', marginBottom: 20, marginTop: 15}}
        />
        <TableContainer component={Paper} style={{ width: '50%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("jmeno")}>Name</TableCell>
              <TableCell onClick={() => handleSort("telefon")}>Phone</TableCell>
              <TableCell onClick={() => handleSort("typ_zarizeni")}>Device Type</TableCell>
              <TableCell onClick={() => handleSort("ip_zarizeni")}>IP Device</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.telefon}>
                <TableCell>{contact.jmeno}</TableCell>
                <TableCell>{contact.telefon}</TableCell>
                <TableCell>{contact.typ_zarizeni}</TableCell>
                <TableCell>{contact.ip_zarizeni}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    );
  };

export default ContactsPage;