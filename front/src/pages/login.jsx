import { useEffect } from "react"


const Login = ()=>
{
    const Rest_api_key= process.env.REACT_APP_REST_API //REST API KEY
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    useEffect( () => {
        console.log( Rest_api_key , redirect_uri ) ;
    } ,[] ) ;
    
    return(
    <>
    <div className="min-h-screen w-[640px] flex flex-col mx-auto justify-center">
    <button onClick={handleLogin} className="border-2">카카오 로그인</button>
    </div>
    </>
    )
}
export default Login ;