import multer from "multer";
export const filesExtensions = {
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    pdf: [ 'application/pdf'],
    excel :['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
};
const uploadFile = (fileExtensions = [])=>{
    const storage  = multer.diskStorage({});
    function fileFilter (req, file, cb) {
        if(fileExtensions.includes(file.mimetype)){
          cb(null,true);
        }else{
        cb("invalid format" , false);
        }
    }
    const upload = multer({fileFilter,storage});
    return upload;
}
export default uploadFile;


