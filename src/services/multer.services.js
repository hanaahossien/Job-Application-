import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


  function fileFilter (req, file, cb) {

    
    cb(null, false)
  
    cb(null, true)
  
    cb(new Error('I don\'t have a clue!'))
  
  }
  
  const upload = multer({ storage: storage })