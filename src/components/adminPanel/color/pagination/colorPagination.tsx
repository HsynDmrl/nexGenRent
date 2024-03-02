import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface AdminColorPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const AdminColorPagination: React.FC<AdminColorPaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Pagination className="justify-content-center mb-5">
      <Pagination.First onClick={() => paginate(1)} />
      <Pagination.Prev onClick={() => paginate(currentPage - 1 > 0 ? currentPage - 1 : 1)} />
      {Array.from({ length: pageCount }, (_, index) => (
        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => paginate(currentPage + 1 <= pageCount ? currentPage + 1 : pageCount)} />
      <Pagination.Last onClick={() => paginate(pageCount)} />
    </Pagination>
  );
};

export default AdminColorPagination;
