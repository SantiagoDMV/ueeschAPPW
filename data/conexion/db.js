// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "eduinclusivaec.com",
  port: 3306,
  user: "eduinclu7_ueeschApp",
  password: "Ueesch2024App",
  database: "eduinclu7_ueesch_app",
  waitForConnections: true,
  //connectionLimit: 10,
  //queueLimit: 0
});
 module.exports = pool;

// import { PrismaClient } from "@prisma/client";

// class conexionPrisma{
//     constructor(){
//         if(!conexionPrisma.instance){
//         conexionPrisma.instance = new PrismaClient();
//         console.log("instancia creada conexion prisma");
//         }
//     }

//     getInstance(){
//         return conexionPrisma.instance;
//     }
// }

// export default conexionPrisma;
