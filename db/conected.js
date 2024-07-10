import mongoose from 'mongoose';



export const conectedDb = async () => {

    await mongoose.connect(process.env.CONNECTION_DB_URI)
        .then(() => console.log('Connected!')).catch((er) => { console.log(er) })
}
