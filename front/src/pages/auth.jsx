
const Auth = ()=>
{
   const code = new URL(window.location.href).searchParams.get("code");
    
    return(
    <>
    <div className="min-h-screen w-[640px] flex flex-col mx-auto justify-center">
        {code}
    </div>
    </>
    )
}
export default Auth ;