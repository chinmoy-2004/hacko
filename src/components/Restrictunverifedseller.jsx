import { useState } from 'react';
import { X, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RestrictsellerModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleclick = () => {
        setIsOpen(false);
        navigate('/ecochain-ai', { replace: true });

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

            {/* Modal container */}
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
                <div className="relative inline-block transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                    {/* Close button */}
                    <button
                        onClick={handleclick}
                        className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Modal content */}
                    <div className="bg-white px-6 py-5 sm:p-8">
                        <div className="flex flex-col items-center">
                            {/* Icon */}
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                                <ShieldCheck className="h-8 w-8 text-indigo-600" />
                            </div>

                            {/* Title */}
                            <h3 className="mt-4 text-2xl font-bold text-gray-900">
                                Verification Required
                            </h3>

                            {/* Description */}
                            <div className="mt-3 text-center text-gray-500">
                                <p>
                                    To access all seller features, please verify your seller account first.
                                </p>
                                <p className="mt-2">
                                    This helps us maintain a trusted marketplace for all users.
                                </p>
                            </div>

                            {/* Button */}
                            <div className="mt-8 w-full">
                                <Link
                                    to="/ecosense-ai"
                                    className="flex w-full items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 px-6 py-3 text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Verify on EcoChain AI
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>

                            {/* Footnote
              <p className="mt-4 text-sm text-gray-400">
                Verification typically takes 1-2 business days
              </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestrictsellerModal;