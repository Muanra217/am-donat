import cookie from "cookie";

const handler = async (req, res) => {
    if(req.method === "POST"){
        const {username, password} = req.body;
        if(username === process.env.ADM_USERNAME && password === process.env.ADM_PASSWORD){
            res.setHeader("Set-Cookie", cookie.serialize("token", process.env.TOKEN, {
                // httpOnly: true,
                // secure: process.env.NODE_ENV !== "development",
                maxAge: 3600,
                sameSite: "strict",
                path: "/"
            }));
            res.status(200).json({message: "Success"});
        } else {
            res.status(400).json("wrong credentials!")
        }
    }
}

export default handler;