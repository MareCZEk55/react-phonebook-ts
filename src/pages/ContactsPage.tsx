import { useState, useEffect } from "react";
import "./ContactsPage.css";
import axios, { AxiosResponse } from 'axios';

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
    const URL = "http://localhost:3000/getphonebook"
    return axios.get(URL);
  }

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchText, setSearchText] = useState("");

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
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search by Name or Phone Number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("jmeno")}>Name</th>
              <th onClick={() => handleSort("telefon")}>Phone</th>
              <th onClick={() => handleSort("typ_zarizeni")}>Device Type</th>
              <th onClick={() => handleSort("ip_zarizeni")}>IP Device</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.telefon}>
                <td>{contact.jmeno}</td>
                <td>{contact.telefon}</td>
                <td>{contact.typ_zarizeni}</td>
                <td>{contact.ip_zarizeni}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default ContactsPage;