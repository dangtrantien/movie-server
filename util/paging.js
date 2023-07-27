'use strict';

// ==================================================

// Function phân chia page
exports.paging = (dataArr, pageNumber) => {
  if (!dataArr) {
    return;
  }

  const pages = [];
  const pageCountList = [0];

  // Tổng số page
  if (dataArr.length > 20) {
    while (pageCountList.length <= Math.round(dataArr.length / 20)) {
      pageCountList.push(pageCountList.length);
    }
  }
  // Data của 1 page và tổng số page
  pageCountList.map((page) => {
    const data = [];

    for (let i = page * 20; i < 20 + page * 20; i++) {
      data.push(dataArr[i]);
    }

    pages.push({
      page: page + 1,
      movieData: data,
    });
  });

  // Trả về data của 1 page nếu ko nhập số page hoặc trả về data của page được nhập
  if (!pageNumber) {
    return {
      results: pages[0].movieData,
      page: 1,
      total_pages: pageCountList.length,
    };
  } else {
    const resultList = pages.filter((value) => value.page === +pageNumber);

    return {
      results: resultList[0].movieData,
      page: pageNumber,
      total_pages: pageCountList.length,
    };
  }
};
