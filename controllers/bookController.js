const books = require("../models/bookModel");


//add book

exports.addBookController = async(req,res)=>{
    

    console.log("inside book controller");
    console.log(req.body);
    console.log(req.files);
    const {title,author,noofpages ,imageurl, price, dprice, Abstract, publisher,language,isbn, category} = req.body
    console.log(title,noofpages, author,imageurl, price, dprice, Abstract, publisher,language,isbn, category);

    uploadedImage = []

    req.files.map((item)=>{
        uploadedImage.push(item.filename)
    })

    console.log(uploadedImage);

    const email = req.payload
    console.log(email);

    try{
        const existingUser = await books.findOne({title, userMail:email})
        if(existingUser){
            res.status(401).json("you already added this book!!!")
        }else{
            const newBook = new books({title,noofpages, author,imageurl, price, dprice, Abstract, publisher,language,isbn, category, uploadedImg: uploadedImage, userMail : email})
            console.log(newBook);
            
            await newBook.save()
            res.status(200).json(newBook)
        }

    }catch(err){
    res.status(500).json(err)

    }   
}


//to get home books
exports.getHomeBooksController = async(req,res)=>{
    try{
        const allHomebooks = await  books.find().sort({_id:-1}).limit(4)
        res.status(200).json(allHomebooks)
    }catch(err){
        res.status(500).json(err)
    }
}


//to get all books
exports.getAllBooksController = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);
    const email = req.payload

    try{
        const query = {
            title:{
                $regex:searchKey, $options:'i'
            },
            
             userMail:{$ne:email}
            
        }
        const allbooks = await  books.find(query)
        res.status(200).json(allbooks)
    }catch(err){
        res.status(500).json(err)
    }
}

//to get a particular books

exports.getABookController = async(req,res)=>{
    const {id} = req.params
    console.log(id);
    
    try{
        const book = await  books.findOne({_id:id})
        res.status(200).json(book)
    }catch(err){
        console.log(err);        
        res.status(500).json(err)
    }
}


//.....................admin......................
exports.getAllBooksAdminController = async(req,res)=>{
    

    try{
        const allbooks = await  books.find()
        res.status(200).json(allbooks)
    }catch(err){
        res.status(500).json(err)
    }
}


//aprove book
exports.approveBookController = async(req,res)=>{
       const {_id,title,author,noofpages ,imageurl, price, dprice, Abstract, publisher,language,isbn, category,status,brought,userMail,uploadedImg} = req.body

    
console.log(_id,title,author,noofpages ,imageurl, price, dprice, Abstract, publisher,language,isbn, category,status,brought,userMail,uploadedImg);


    try{
        const existingBook = await  books.findByIdAndUpdate({_id},{_id,title,author,noofpages ,imageurl, price, dprice, Abstract, publisher,language,isbn, category,status:"approved",brought,userMail,uploadedImg},{new:true})
        res.status(200).json(existingBook)
    }catch(err){
        res.status(500).json(err)
    }
}