import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://nolasco:ntsROTHDYEoC6ZBV@nolasco26916136.b3l6mqr.mongodb.net/?retryWrites=true&w=majority', {
	serverSelectionTimeoutMS: 60000
});

const db=mongoose.connection;

db.once('open', ()=>{
    console.log('¡La base de datos ha sido conectada correctamente!');
});

db.once('error', ()=>{
    console.error('¡Ha ocurrido un error al establecer la conexión con la base de datos!');
});

export default db;