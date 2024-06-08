import { Link } from "react-router-dom";
export function CheckEmail() {
  return (
    <div className="w-2/3 mt-28 flex flex-col items-start justify-center ml-40">
      <h2 className="text-white text-3xl font-bold mb-4">
        Check your mail
      </h2>
      <p className="text-sm font-normal text-gray-400 mb-4">
        We've sent you to pratham@123.com with a link to activate your account
      </p>
      <div className="flex gap-4">
       <div className="flex items-center gap-2">
       <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="">
         
         Open Gmail
       </a>
       <img src="/img/gmail-logo.png" alt="Gmail Logo" className="w-5 h-5 mr-2" />
       </div>
        <div className="flex items-center gap-2">
        <a href="https://outlook.live.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
         Open Outlook
        </a>
        <img src="/img/outlook-logo.png" alt="Outlook Logo" className="w-5 h-5 mr-2" />
        </div>
      </div>
       <div className="mt-40">
        <h3 className="text-white font-medium mb-3">Didn't get an email? Check your spam folder!</h3>
        <Link className="text-primaryGreen underline"> Re-enter your email and try again</Link>
       </div>
    </div>
  );
}

export default CheckEmail;
