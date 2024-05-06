import '../css/skeleton.css';

const UserSkeleton = ({ count = 5 }) => {
  return (
    <><div className="table-responsive">
      <div className='container'>
    <div className="skeleton skeleton-btn"></div>
    <div className="skeleton skeleton-title"></div>
    <div className="skeleton skeleton-btn"></div>
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

          {Array.from({ length: count }).map((_, index) => (
            <tr key={index}>
              <td><div className="skeleton skeleton-text"></div></td>
              <td><div className="skeleton skeleton-text"></div></td>
              <td><div className="skeleton skeleton-text"></div></td>
              <td><div className="skeleton skeleton-text"></div></td>
              <td>
                <div className="skeleton skeleton-btn"></div>
                <div className="skeleton skeleton-btn"></div>
                <div className="skeleton skeleton-btn"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </>
  );
};

export default UserSkeleton;
