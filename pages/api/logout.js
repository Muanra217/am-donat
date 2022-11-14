import cookie from "cookie";

const handler = async (req, res) => {
    if(req.method === "POST"){
            res.setHeader("Set-Cookie", cookie.serialize("token", "", {
                // httpOnly: true,
                // secure: process.env.NODE_ENV !== "development",
                maxAge: 0,
                sameSite: "strict",
                path: "/"
            }));
            res.status(200).json({message: "Success logout"});
    }


    //     res.setHeader('Set-Cookie', [
    //         cookie.serialize(
    //             'token', process.env.TOKEN, {
    //                 expires: new Date(0),
    //                 path: '/'
    //             }
    //         ),
    //     ]);
    
    //    return res.status(200).json({
    //        success: 'Successfully logged out'
    //    });
}

export default handler;