import { BiCheckCircle } from "react-icons/bi";


const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-3xl p-10 max-w-md w-full text-center animate-fade-in-up">
        <BiCheckCircle className="text-green-600 mx-auto mb-4" size={72} />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 text-base mb-6">
          Your order has been placed successfully. We’ll start preparing it
          right away!
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
