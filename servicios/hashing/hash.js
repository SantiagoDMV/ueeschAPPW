import bcrypt from 'bcryptjs'


  export const hashing = async (passw) => {
  
    const passwHash = await bcrypt.hash(passw,8)
    return passwHash
  }

  export const comparar = async (passw,passwHash)=>{
    try {
      
      const respuesta = await bcrypt.compare(passw,passwHash)  
      
      return respuesta
    } catch (error) {
      console.log(error)
    }
  }

