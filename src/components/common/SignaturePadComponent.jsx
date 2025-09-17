import React, { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';
import Toast from './Toast';

const SignaturePadComponent = ({ role, onSignatureSave }) => {
    const canvasRef = useRef(null);
    const signaturePadRef = useRef(null);
    const containerRef = useRef(null);
    const [penColor, setPenColor] = useState('#000000');
    const [penThickness, setPenThickness] = useState(2.0);
    const [savedSignaturePreview, setSignaturePreview] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const closeToast = () => {
        setToast(null);
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Get container dimensions
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Set canvas internal dimensions
        canvas.width = containerWidth;
        canvas.height = containerHeight;

        // Ensure canvas display size matches internal size
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = containerHeight + 'px';

        // Re-initialize signature pad if it exists
        if (signaturePadRef.current) {
            const data = signaturePadRef.current.toData();
            signaturePadRef.current.clear();
            signaturePadRef.current.fromData(data);
        }
    };

    const manageSignaturePadState = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const selectedRole = role;
        if (selectedRole === 'Signatory') {
            if (!signaturePadRef.current) {
                // Delay initialization to ensure proper canvas sizing
                setTimeout(() => {
                    resizeCanvas();
                    signaturePadRef.current = new SignaturePad(canvas, {
                        penColor: penColor,
                        minWidth: parseFloat(penThickness),
                        maxWidth: parseFloat(penThickness),
                    });
                    window.addEventListener("resize", resizeCanvas);
                }, 100);
            } else {
                signaturePadRef.current.penColor = penColor;
                signaturePadRef.current.minWidth = parseFloat(penThickness);
                signaturePadRef.current.maxWidth = parseFloat(penThickness);
            }
            if (signaturePadRef.current) {
                signaturePadRef.current.on();
            }
        } else {
            if (signaturePadRef.current) {
                signaturePadRef.current.off();
            }
        }
    };

    useEffect(() => {
        manageSignaturePadState();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [role]);

    useEffect(() => {
        if (signaturePadRef.current) {
            signaturePadRef.current.penColor = penColor;
        }
    }, [penColor]);

    useEffect(() => {
        if (signaturePadRef.current) {
            signaturePadRef.current.minWidth = parseFloat(penThickness);
            signaturePadRef.current.maxWidth = parseFloat(penThickness);
        }
    }, [penThickness]);

    const clearSignature = () => {
        if (signaturePadRef.current) {
            signaturePadRef.current.clear();
        }
    };

    const saveSignature = () => {
        if (!signaturePadRef.current || signaturePadRef.current.isEmpty()) {
            showToast("Please provide a signature first.", "error");
            return;
        }

        const dataURL = signaturePadRef.current.toDataURL('image/png');
        setSignaturePreview(dataURL);
        console.log("Signature Data:", dataURL);
        showToast('Signature saved successfully!');

        if (onSignatureSave) {
            onSignatureSave(dataURL);
        }
    };

    const isSignatoryRole = role === 'Signatory';

    return (
        <div className="w-full">
            {/* Header with Toolbar */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Your Signature</h3>
                {isSignatoryRole && (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <i className="ri-palette-line text-gray-600 dark:text-gray-400"></i>
                            <input
                                id="pen-color"
                                type="color"
                                value={penColor}
                                onChange={(e) => setPenColor(e.target.value)}
                                className="w-8 h-8 p-1 rounded-md cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="ri-pencil-ruler-2-line text-gray-600 dark:text-gray-400"></i>
                            <input
                                id="pen-thickness"
                                type="range"
                                min="1"
                                max="10"
                                step="0.1"
                                value={penThickness}
                                onChange={(e) => setPenThickness(parseFloat(e.target.value))}
                                className="w-24 cursor-pointer"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[2rem]">
                                {penThickness.toFixed(1)}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Line Separator */}
            <hr className="border-gray-200 dark:border-gray-700 mb-6 -mx-6" />

            {/* Signature Pad Container */}
            <div
                ref={containerRef}
                className="relative w-full max-w-xl mx-auto h-[250px] border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-gray-700"
                style={{ minWidth: '280px' }}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full rounded-lg cursor-crosshair"
                    style={{ touchAction: 'none' }}
                />

                {/* Disabled Overlay */}
                {!isSignatoryRole && (
                    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-700 bg-opacity-50 flex items-center justify-center rounded-lg">
                        <p className="flex flex-col items-center text-center text-gray-600 dark:text-gray-300 px-4 font-semibold">
                            <i class="ri-lock-line text-2xl mb-0"></i>
                            This feature is only available for the 'Signatory' role.
                        </p>
                    </div>
                )}
            </div>

            {/* Signature Controls */}
            {isSignatoryRole && (
                <div className="w-full max-w-xl mx-auto flex justify-end gap-3 mt-4">
                    <button
                        onClick={clearSignature}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={saveSignature}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Save Signature
                    </button>
                </div>
            )}

            {/* Signature Preview */}
            {savedSignaturePreview && (
                <div className="w-full max-w-xl mx-auto mt-4">
                    <h3 className="text-sm mb-2 font-medium text-gray-900 dark:text-gray-100">Saved Signature:</h3>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <img
                            src={savedSignaturePreview}
                            alt="Signature Preview"
                            className="max-w-full h-auto border border-gray-300 dark:border-gray-600 rounded"
                        />
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}
        </div>
    );
};

export default SignaturePadComponent;