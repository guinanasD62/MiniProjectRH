import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'debounce';
import Loan from './LoanModal';
import '../css/table.css';
import UserSkeleton from '../feature/skeletonUser';
//import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading before fetching
      try {
        const response = await axios.get('http://localhost:3000/auth/users', {
          params: { search: searchTerm, page: currentPage, limit: pageSize }
        });
        setUsers(response.data.users);
        setTotalUsers(response.data.total);
        setLoading(false); // Stop loading after fetching
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false); // Stop loading if there is an error
      }
    };

    fetchUsers();
  }, [searchTerm, currentPage, pageSize]);

  const debouncedSearchTerm = useCallback(debounce((searchValue) => {
    setSearchTerm(searchValue);
  }, 500), []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchTerm(event.target.value);
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
// react loading skeleton
  if (loading) {
    return <UserSkeleton count={pageSize} />;
  }


  return (
    <><div className="container mt-5">
      {/* <Skeleton /> */}
      <h1>Users</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Username, Firstname, Lastname, or Email"
          onChange={handleSearchChange} />
        <div className="mt-3">
          <label htmlFor="pageSize">Items per page:</label>
          <select
            id="pageSize"
            className="form-control"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{ width: "auto", display: "inline-block", marginLeft: "10px" }}
          >
            {[5, 8, 10, 15].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div><div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className="user-actions">
                  <button className="btn btn-primary" onClick={() => setSelectedUserId(user._id)}>Edit Loan</button>
                  <button className="btn btn-success" onClick={() => setSelectedUserId(user._id)}>Add Loan</button>
                  <button className="btn btn-danger" onClick={() => setUsers(users.filter(u => u._id !== user._id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => handlePageChange(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {selectedUserId && (
        <div className={`modal fade show`} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Loan Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedUserId(null)}></button>
              </div>
              <div className="modal-body">
                <Loan userId={selectedUserId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Users;
