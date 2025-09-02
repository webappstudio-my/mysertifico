import React, { useState, useMemo } from 'react';
import Sidebar from '../../../components/mysertifico/Sidebar';
import DashboardNavbar from '../../../components/mysertifico/DashboardNavbar';

const packages = [
    { name: 'Starter Pack', tokens: 100, price: 50, discount: 0 },
    { name: 'Pro Pack', tokens: 500, price: 225, discount: 10 },
    { name: 'Business Pack', tokens: 1000, price: 400, discount: 20 },
    { name: 'Enterprise Pack', tokens: 5000, price: 1750, discount: 30 }
];

const paymentMethods = [
    { id: 'fpx', name: 'Online Banking (FPX)', icon: 'ri-bank-line' },
    { id: 'card', name: 'Credit / Debit Card', icon: 'ri-mastercard-line' },
    { id: 'qr', name: 'DuitNow QR', icon: 'ri-qr-code-line' }
];

const banks = [
    { name: 'Maybank2u', imgSrc: 'https://placehold.co/120x60/ffffff/000000?text=Maybank2u' },
    { name: 'CIMB Clicks', imgSrc: 'https://placehold.co/120x60/ffffff/000000?text=CIMB+Clicks' },
    { name: 'Public Bank', imgSrc: 'https://placehold.co/120x60/ffffff/000000?text=Public+Bank' },
    { name: 'RHB Now', imgSrc: 'https://placehold.co/120x60/ffffff/000000?text=RHB+Now' },
    { name: 'Hong Leong', imgSrc: 'https://placehold.co/120x60/ffffff/000000?text=Hong+Leong' },
    { name: 'AmBank', imgSrc: 'https://placehold.co/120x60/ffffff/000000?text=AmBank' }
];

const TopUpToken = ({ theme, onThemeToggle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
        setSelectedPaymentMethod(null); // Reset payment method when package changes
    };

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                id="main-content"
                className={`flex-grow transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : ''}`}
            >
                <DashboardNavbar onSidebarToggle={toggleSidebar} theme={theme} onThemeToggle={onThemeToggle} />
                <main className="p-6 sm:p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-start gap-8">
                            <div className="w-full lg:w-3/5 space-y-8">
                                <TokenBalance />
                                <PackageSelection onSelect={handlePackageSelect} selectedPackage={selectedPackage} />
                            </div>
                            <div className="w-full lg:w-2/5">
                                <CheckoutFlow
                                    selectedPackage={selectedPackage}
                                    selectedPaymentMethod={selectedPaymentMethod}
                                    onPaymentMethodSelect={setSelectedPaymentMethod}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const TokenBalance = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Current Balance</h2>
        <div className="flex items-center gap-4">
            <i className="ri-copper-coin-line text-4xl text-accent"></i>
            <div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">1,250</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tokens Available</p>
            </div>
        </div>
    </div>
);

const PackageSelection = ({ onSelect, selectedPackage }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">1. Select a Top-up Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map(pkg => (
                <div
                    key={pkg.name}
                    className={`package-card border-2 rounded-lg p-4 cursor-pointer hover:border-primary dark:hover:border-primary transition-colors ${selectedPackage?.name === pkg.name ? 'border-primary dark:border-primary ring-2 ring-primary/50' : 'border-gray-200 dark:border-gray-700'}`}
                    onClick={() => onSelect(pkg)}
                >
                    <h3 className="font-bold text-gray-800 dark:text-white">{pkg.name}</h3>
                    <p className="text-2xl font-bold text-primary my-1">{pkg.tokens.toLocaleString()} <span className="text-base font-medium">Tokens</span></p>
                    <p className="font-semibold text-gray-600 dark:text-gray-300">
                        MYR {pkg.price.toFixed(2)}
                        {pkg.discount > 0 && <span className="text-sm text-green-500 font-normal ml-2">(Save {pkg.discount}%)</span>}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

const CheckoutFlow = ({ selectedPackage, selectedPaymentMethod, onPaymentMethodSelect }) => {
    const summary = useMemo(() => {
        if (!selectedPackage) return null;

        const TOKEN_BASE_RATE = 0.50;
        const subtotal = selectedPackage.tokens * TOKEN_BASE_RATE;
        const discount = subtotal - selectedPackage.price;
        const sst = selectedPackage.price * 0.06;
        const grandTotal = selectedPackage.price + sst;

        return { ...selectedPackage, subtotal, discount, sst, grandTotal };
    }, [selectedPackage]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md sticky top-24 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-4">Checkout</h2>

            {!summary ? <EmptyCart /> : <OrderSummary summary={summary} />}

            {summary && (
                <PaymentMethodSelection
                    selectedMethod={selectedPaymentMethod}
                    onSelect={onPaymentMethodSelect}
                />
            )}

            {summary && selectedPaymentMethod && <PaymentDetails method={selectedPaymentMethod} />}

            {summary && selectedPaymentMethod && (
                <div className="pt-4 border-t dark:border-gray-700">
                    <button className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Pay Now
                    </button>
                </div>
            )}
        </div>
    );
};

const EmptyCart = () => (
    <div className="text-center py-6">
        <i className="ri-shopping-cart-2-line text-4xl text-gray-400 dark:text-gray-500"></i>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a package to view summary.</p>
    </div>
);

const OrderSummary = ({ summary }) => (
    <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">Order Summary</h3>
        <SummaryRow label="Package:" value={summary.name} />
        <SummaryRow label="Tokens:" value={summary.tokens.toLocaleString()} />
        <hr className="dark:border-gray-700 !my-2" />
        <SummaryRow label="Subtotal:" value={`MYR ${summary.subtotal.toFixed(2)}`} />
        <SummaryRow label="Discount:" value={`- MYR ${summary.discount.toFixed(2)}`} valueClass="text-green-500" />
        <SummaryRow label="SST (6%):" value={`MYR ${summary.sst.toFixed(2)}`} />
        <div className="flex justify-between items-center text-lg pt-2 border-t dark:border-gray-600 mt-2">
            <span className="font-bold text-gray-700 dark:text-gray-200">Grand Total:</span>
            <span className="font-bold text-primary">{`MYR ${summary.grandTotal.toFixed(2)}`}</span>
        </div>
    </div>
);

const SummaryRow = ({ label, value, valueClass = 'text-gray-800 dark:text-white' }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 dark:text-gray-300">{label}</span>
        <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
);

const PaymentMethodSelection = ({ selectedMethod, onSelect }) => (
    <div className="pt-4 border-t dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">2. Select Payment Method</h3>
        <div className="space-y-2">
            {paymentMethods.map(method => (
                <div
                    key={method.id}
                    className={`payment-method-card border-2 rounded-lg p-3 cursor-pointer flex items-center gap-3 hover:border-primary dark:hover:border-primary transition-colors ${selectedMethod === method.id ? 'border-primary dark:border-primary ring-2 ring-primary/50' : 'border-gray-200 dark:border-gray-700'}`}
                    onClick={() => onSelect(method.id)}
                >
                    <i className={`${method.icon} text-xl text-primary`}></i>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{method.name}</span>
                </div>
            ))}
        </div>
    </div>
);

const PaymentDetails = ({ method }) => {
    return (
        <div className="mt-4 pt-4 border-t dark:border-gray-700">
            {method === 'fpx' && <FpxDetails />}
            {method === 'card' && <CardDetails />}
            {method === 'qr' && <QrDetails />}
        </div>
    );
};

const FpxDetails = () => (
    <div>
        <h4 className="font-semibold text-gray-800 dark:text-white mb-3 text-sm">Select Bank</h4>
        <div className="grid grid-cols-2 gap-3">
            {banks.map(bank => (
                <img key={bank.name} src={bank.imgSrc} alt={bank.name} className="h-14 w-full object-contain border rounded-lg p-2 cursor-pointer hover:border-primary" />
            ))}
        </div>
    </div>
);

const CardDetails = () => (
    <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Enter Card Details</h4>
        <div>
            <label htmlFor="card_number" className="block text-xs font-medium text-gray-600 dark:text-gray-300">Card Number</label>
            <input type="text" id="card_number" placeholder="0000 0000 0000 0000" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
            <label htmlFor="card_name" className="block text-xs font-medium text-gray-600 dark:text-gray-300">Name on Card</label>
            <input type="text" id="card_name" placeholder="Full Name" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div className="flex gap-3">
            <div className="w-1/2">
                <label htmlFor="card_expiry" className="block text-xs font-medium text-gray-600 dark:text-gray-300">Expiry Date</label>
                <input type="text" id="card_expiry" placeholder="MM/YY" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="w-1/2">
                <label htmlFor="card_cvc" className="block text-xs font-medium text-gray-600 dark:text-gray-300">CVC</label>
                <input type="text" id="card_cvc" placeholder="123" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2 dark:bg-gray-700 dark:border-gray-600" />
            </div>
        </div>
    </div>
);

const QrDetails = () => (
    <div className="text-center">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm">Scan to Pay</h4>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MySertifico-Payment-Demo" alt="DuitNow QR Code" className="mx-auto rounded-lg" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Use your banking or e-wallet app to scan.</p>
    </div>
);

export default TopUpToken;
