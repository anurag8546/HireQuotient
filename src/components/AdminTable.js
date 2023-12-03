// components/AdminTable.js
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import api from '../utils/Api';
import './admin.css';
const AdminTable = () => {



    const [data, setData] = useState([]); // hold the fetched data from API
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedItems, setSelectedItems] = useState([]); // The check boxes which are clicked
    const [selectAll, setSelectAll] = useState(false); // Clicking the heading checkox will select all the check boxes   
    useEffect(() => {
        api.getData().then((response) => setData(response));
        console.log(data);
    }, []);

    useEffect(() => {
        const savedData = localStorage.getItem('data');
        if (savedData) {
          setData(JSON.parse(savedData));
        }
      }, []);
      
      useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
      }, [data]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    // console.log(currentItems);
    const [editId, setEditId] = useState(null); // State to hold the id of the item currently being edited
    const [editItem, setEditItem] = useState({});
    const handleEdit = (item) => {
        setEditId(item.id);
        setEditItem(item);
    }
      
    const handleSelect = (id) => {
       
        if(selectedItems.includes(id)){
            setSelectedItems(selectedItems.filter(item => item !== id));

        }else{
            setSelectedItems([...selectedItems, id]);
        }
    }

    const handleDeleteSelected = (selectedItems) => {
        const newData = data.filter(item => !selectedItems.includes(item.id));
        setData(newData);
        setSelectedItems([]);
        setSelectAll(false);
    }
      const handleSave = (id) => {
        setEditId(null);
        const newData = data.map(item => item.id === id ? editItem : item);
        setData(newData);
      }
    const handleChange = (e, field) => {
        setEditItem({ ...editItem, [field]: e.target.value });
    }



    const HandleDelete = (id) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      }

      const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if(!selectAll)
        setSelectedItems(currentItems.map(item => item.id));
      else{
        setSelectedItems([]);
      }
      }

    return (
        <div>
           
           <div>
            <SearchBar data={data} setData={setData} />


            <div style={{display: 'flex', listStyleType: 'none', justifyContent:'right'}}>
            <button
            onClick={() => {handleDeleteSelected(selectedItems)}}
            >Delete Selected</button>
            </div>
            </div>
            <table>
                <thead>
                    <tr>

                        <th><input type="checkbox" 
                        checked={selectAll}
                        onChange={handleSelectAll}
                        /></th>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {currentItems.map((item, index) => (
                        <tr key={index}
                        style={{backgroundColor: selectedItems.includes(item.id) ? 'grey' : 'white'}}
                        >
                            <td><input type="checkbox" 
                            checked={selectedItems.includes(item.id)}
                            onChange={() => {handleSelect(item.id)}}

                            /></td>
                            <td>{item.id}</td>
                            <td>{editId === item.id ? <input Value={item.email} onChange={(e) => handleChange(e, 'email')}/> : item.email}</td>
                            <td>{editId === item.id ? <input Value={item.name} onChange={(e) => handleChange(e, 'name')} /> : item.name}</td>
                            <td>{editId === item.id ? <input Value={item.role} onChange={(e) => handleChange(e, 'role')} /> : item.role}</td>
                            <td>
                            {editId === item.id ? (
        <button onClick={() => handleSave(item.id)}>Save</button>
      ) : (
        <button onClick={() => handleEdit(item)}>Edit</button>
      )}
                                {
                                    <button onClick={()=> HandleDelete(item.id)}>Delete</button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={data.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />


        </div>
    );
};

export default AdminTable;
