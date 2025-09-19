import React from 'react';
import logo from '../../assets/images/logos/logo.png';

const InvoicePreview = React.forwardRef(({ invoiceData }, ref) => {
    const {
        id,
        company,
        billTo,
        details,
        items,
        totals
    } = invoiceData;

    return (
        // The ref from the parent component is attached here
        <div id="invoice-content" ref={ref} className="a4-container bg-white shadow-lg text-invoice-dark mx-auto">
            <div className="p-[16mm]">
                {/* Invoice Header */}
                <header className="flex justify-between items-start pb-8 border-b">
                    <div>
                        <img src={logo} alt="MyWall Logo" className="h-16 w-16 mb-4" />
                        <h1 className="text-4xl font-bold font-poppins text-invoice-dark">INVOICE</h1>
                        <p className="text-invoice-medium">{id}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-semibold">{company.name}</h2>
                        <p className="text-sm text-invoice-medium">{company.address1}</p>
                        <p className="text-sm text-invoice-medium">{company.address2}</p>
                        <p className="text-sm text-invoice-medium">{company.address3}</p>
                        <p className="text-sm text-invoice-medium mt-2">{company.email}</p>
                    </div>
                </header>

                {/* Billing Details */}
                <section className="flex justify-between items-start mt-8">
                    <div>
                        <h3 className="font-semibold text-invoice-medium uppercase tracking-wider text-sm">Bill To</h3>
                        <p className="font-bold text-lg mt-1">{billTo.name}</p>
                        <p className="text-invoice-medium text-sm">{billTo.address1}</p>
                        <p className="text-invoice-medium text-sm">{billTo.address2}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="font-semibold text-invoice-medium uppercase tracking-wider text-sm">Details</h3>
                        <p className="text-invoice-dark text-sm mt-1"><span className="font-semibold">Date of Issue:</span> {details.issueDate}</p>
                        <p className="text-invoice-dark text-sm"><span className="font-semibold">Due Date:</span> {details.dueDate}</p>
                    </div>
                </section>

                {/* Invoice Table */}
                <section className="mt-10">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-invoice-light">
                                <th className="p-3 text-sm font-semibold uppercase tracking-wider">Description</th>
                                <th className="p-3 text-sm font-semibold uppercase tracking-wider text-center">Qty</th>
                                <th className="p-3 text-sm font-semibold uppercase tracking-wider text-right">Unit Price</th>
                                <th className="p-3 text-sm font-semibold uppercase tracking-wider text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-3">{item.description}</td>
                                    <td className="p-3 text-center">{item.qty}</td>
                                    <td className="p-3 text-right">{item.unitPrice.toFixed(2)}</td>
                                    <td className="p-3 text-right">{item.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Totals */}
                <section className="flex justify-end mt-8">
                    <div className="w-full max-w-xs space-y-3">
                        <div className="flex justify-between text-invoice-medium">
                            <span>Subtotal</span>
                            <span>RM {totals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-invoice-medium">
                            <span>SST ({totals.taxRate}%)</span>
                            <span>RM {totals.taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-invoice-dark font-bold text-xl border-t pt-3">
                            <span>Grand Total</span>
                            <span>RM {totals.grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </section>

                {/* Footer Notes */}
                <footer className="mt-16 pt-8 border-t">
                    <h4 className="font-semibold text-invoice-medium mb-2">Notes</h4>
                    <p className="text-xs text-gray-500">Thank you for your business. Please make the payment by the due date. This is a computer-generated invoice and no signature is required.</p>
                </footer>
            </div>
        </div>
    );
});

export default InvoicePreview;