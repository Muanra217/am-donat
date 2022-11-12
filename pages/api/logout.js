import cookie from "cookie";

const handler = async (req, res) => {
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                'token', process.env.TOKEN, {
                    expires: new Date(0),
                    path: '/'
                }
            ),
        ]);
    
       return res.status(200).json({
           success: 'Successfully logged out'
       });
}

export default handler;