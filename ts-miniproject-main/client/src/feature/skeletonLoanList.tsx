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
            <th>Loan Amount	</th>
            <th>Loan Type</th>
            <th>Document Available</th>
            <th>PDF File</th>
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
