
class GlobalService {
   
async pagination(data,defaultPageSize,pageNumber){

;
    const count = data.countDocuments();
    const totalDocuments = await count.exec();
    const totalPages = Math.ceil(totalDocuments / defaultPageSize);

 
      const meta = {
        total: totalDocuments,
        pages: totalPages,
        page: pageNumber,
      };

     return meta 
}
}

module.exports = GlobalService;
