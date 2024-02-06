import { ObtenerInformacionDirecta } from "../../../servicios/cookies/manejoCookies"

export default function cookieSession(req, res) {
    if (req.method === "POST") {
        const { UserCookie } = req.body;
        let user;
        if(!UserCookie){
            const {UserCookie} = req.cookies;
            user = ObtenerInformacionDirecta(UserCookie);
        }else{
            user = ObtenerInformacionDirecta(UserCookie);
        }
        
        return res.status(200).json(user)
    } else if (req.method === "GET") {
        const { solicitar } = req.query;
        if (!solicitar) 
        return res.status(404).json({ mensaje: "Parámetro inválido o faltante" })

            const { UserCookie } = req.cookies;
            const user = ObtenerInformacionDirecta(UserCookie);
            if (!user)
                return res.status(404).json({ mensaje: "Error al intentar obtener el valor solicitado" })

            switch (solicitar) {
                case "id": return res.status(200).json(user.id)
                case "imagen": return res.status(200).json(user.imagen)
                case "rol": return res.status(200).json(user.rol)
            }
        
    }
}
