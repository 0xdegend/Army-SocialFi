import { useState, useEffect } from "react";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
interface paginationData {
  data: any;
  itemsPerPage: any;
  setCurrentData: any;
  currentData: any;
}
const Pagination = ({ data, itemsPerPage, setCurrentData }: paginationData) => {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pages, setPages] = useState<any>([]);

  useEffect(() => {
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
  }, [data, itemsPerPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentData(data?.slice(startIndex, endIndex));
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage: any) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage: any) => prevPage + 1);
  };

  const renderPageNumbers = () => {
    let pageNumbers: any[] = [];

    if (pages?.length <= 4) {
      pageNumbers = pages;
    } else if (currentPage <= 4) {
      pageNumbers = [...pages?.slice(0, 3), "...", ...pages?.slice(-1)];
    } else if (currentPage > pages?.length - 4) {
      pageNumbers = [...pages?.slice(0, 3), "...", ...pages?.slice(-2)];
    } else {
      pageNumbers = [
        1,
        "...",
        ...pages?.slice(currentPage - 2, currentPage + 1),
        "...",
        pages?.length,
      ];
    }

    return pageNumbers.map((pageNumber: any) => (
      <button
        key={pageNumber}
        onClick={() => goToPage(pageNumber)}
        disabled={currentPage === pageNumber || pageNumber === "..."}
        className={` hover:border hover:border-[#DFC865] px-2 hover:text-[#DFC865] rounded-[100px] ${
          currentPage === pageNumber ? "border border-[#DFC865]" : ""
        } `}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="w-full flex flex-row font-inconsolata ">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex">
          <button
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            className="flex flex-row items-center text-white"
          >
            <IoIosArrowBack />
            <span className="text-white">Previous</span>
          </button>
        </div>

        <div className="flex gap-4">
       {/* {pages.map((pageNumber: any) => (
          <button
           key={pageNumber}
           onClick={() => goToPage(pageNumber)}
           disabled={currentPage === pageNumber}
           className={`${currentPage === pageNumber ? "border border-customYellow":""} hover:border-[#DFC865] hover:border hover:rounded-[100px] hover:px-2 hover:text-[#fff] `}
          >
            {pageNumber}
          </button>
        ))} */}

       </div>
        <div className="flex gap-8 text-[#8A8577] text-[12px]">
          {renderPageNumbers()}
        </div>

        <div className="flex">
          <button
            disabled={currentPage === pages.length}
            onClick={goToNextPage}
          > 
            <div className="flex flex-row gap-1 items-center border border-[#DFC865] py-1 px-6 rounded-[50px] text-white">
              <p className="text-white ">Next</p>
              <IoIosArrowForward />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
