import mongoose from "mongoose";

let connected = false;

const connectDB = async () =>{
    mongoose.set('strictQuery', true);

    //If the db is already connected, no need to connect again
    if(connected){
        console.log('Database is connected');
        return;
    }
    else{
        try {
            await mongoose.connect(process.env.MONGO_URI);
            connected = true;
        } catch (error) {
            console.log(error);
        }   
    }
}

export default connectDB;