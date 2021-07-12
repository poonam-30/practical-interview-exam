import axios from "axios";
import { useEffect, useState } from "react";
import {Table,Container,Modal,Button} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {list} from "../redux/action/user";
import ReactPaginate from "react-paginate";

const UserList = () => {

    const userState = useSelector(state=>state);
    const dispatch = useDispatch();

    const [users,setUsers] = useState([]);
    const [data,setData] = useState([]);
    const [user,setUser] = useState(null);
    const [show,setShow] = useState(false);
    const [pageCount,setPageCount] = useState(0);
    const [limit,setLimit] = useState(10);
    const [currentPage,setCurrentPage] = useState(1);
   
    useEffect(async()=>{
        // await dispatch(list);
        // console.log("user",userState);
        await axios.get("https://randomuser.me/api/?results=50").then(res=>{
            console.log("res--",res);
            setUsers(res.data.results);
            setData(res.data.results);
            setPageCount(Math.ceil(res.data.results.length / limit))
         
        }).catch(err=>{
            console.log("error",err);
        });
    },[]);


    const displayModal = (user) => {
        setShow(true);
        setUser(user);
    }

    const closeModal = () => {
        setShow(false);
        setUser(null);
    }

    
    const handleOnChange = (data) => {
        console.log("Data-",data)
         setCurrentPage(data.selected+1);   
    }
    const serach = (e) => {
        console.log("Serach--",e.target.value);
        let list = users;
        var v = e.target.value;
        var res = list.filter(user=> 
                user.name.first.includes(v) || user.name.last.includes(v) || user.email.includes(v)
            ) 
            setData(res);
            setPageCount(Math.ceil(res.length / limit))
            console.log("res=",res);
    }
    
    console.log("users--in component",users,currentPage)
    return  (
        
        <Container>
            <input type="text" onChange={serach} placeholder="Serach..." style={{margin:"10px"}} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Profile</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>City</td>
                        <td>State</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.slice((currentPage -1)*limit,currentPage*limit).map(user=>{
                            return (
                            <tr onClick={()=>displayModal(user)}>
                                <td><img src={user.picture.thumbnail} width="50" height="50" /></td>
                                <td>{user.name.first + " " + user.name.last}</td>
                                <td>{user.email}</td>
                                <td>{user.location.city}</td>
                                <td>{user.location.state}</td>
                            </tr> 
                            )
                        })
                    }
                    
                </tbody>
                <tfoot>
                    <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handleOnChange}
                    pageRangeDisplayed="5"
                    nextLabel="Next"
                    previousLabel="Previous"
                    activeClassName="active"
                    />
                </tfoot>
            </Table>

            {
                user != null && 
            
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <img src={user.picture.large} ></img>
                    <h3>{user.name.first + " " + user.name.last}</h3>   
                    <p>Email: {user.email}</p>
                    
                    <p>Phone: {user.phone}</p>
                    <p>Gender: {user.gender}</p>
                    <p>cell: {user.cell}</p>
                    <p>Age: {user.dob.age}</p>
                    <p>Location: {user.location.city + " " +user.location.state + " " +user.location.postcode}</p>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                    Close
                    </Button>
                </Modal.Footer>
                </Modal>
            }
        </Container>
    
    )
}

export default UserList;