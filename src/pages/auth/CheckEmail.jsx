import { Link } from "react-router-dom";
export function CheckEmail({ email }) {
  return (
    <div className=" flex flex-col items-start my-20  mx-20 bg-secondaryBlack min-h-screen ">
      <h2 className="text-white text-3xl font-bold mb-4">
        Check your mail
      </h2>
      <p className="text-sm font-normal text-gray-400 mb-4 w-[70%]">
        {`We've sent you an email at `}
        <span className="text-gray-200">{email}</span>
        {` with a link to activate your account`}
      </p>
      <div className="flex gap-8 mt-10">
        <div className="flex items-center gap-2">
          <img src="/img/Gmail.png" alt="Gmail Logo" className="w-10 h-8 mr-2" />
          <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
            Open Gmail
          </a>
        </div>
        <div className="flex items-center gap-2">
          <img src="/img/Outlook.png" alt="Outlook Logo" className="w-10 h-8 mr-2" />
          <a href="https://outlook.live.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
            Open Outlook
          </a>
        </div>
      </div>
      <div className="mt-40">
        <h3 className="text-white text-xl font-medium mb-3">Didn't get an email? Check your spam folder!</h3>
        <Link className="text-primaryGreen underline" to="/auth/sign-up"> Re-enter your email and try again</Link>
      </div>
    </div>
  );
}

export default CheckEmail;
