import { PrismaClient } from "@prisma/client";

class conexionPrisma{
    constructor(){
        if(!conexionPrisma.instance){
        conexionPrisma.instance = new PrismaClient();
        console.log("instancia creada conexion prisma");
        }
    }

    getInstance(){
        return conexionPrisma.instance;
    }
}

export default conexionPrisma;
