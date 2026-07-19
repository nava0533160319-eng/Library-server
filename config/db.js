import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        await connect('mongodb://localhost:27017/Library-Server');
        console.log('mongo connected succesfully');
    } catch (error) {
        console.log(error);
        exit(1);// סגירת השרת עם סטטוס של שגיאה
    }
};