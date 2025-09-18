import React, { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';
import Toast from './Toast';

const SignaturePadComponent = ({ role, onSignatureSave }) => {
    const canvasRef = useRef(null);
    const signaturePadRef = useRef(null);
    const containerRef = useRef(null);
    const [penColor, setPenColor] = useState('#000000');
    const [penThickness, setPenThickness] = useState(2.0);
    const [signaturePreview, setSignaturePreview] = useState(null);
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

        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = container.offsetWidth * ratio;
        canvas.height = container.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        
        if (signaturePadRef.current) {
            const data = signaturePadRef.current.toData();
            signaturePadRef.current.clear();
            signaturePadRef.current.fromData(data);
        }
    };

    const manageSignaturePadState = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (role === 'Signatory') {
            if (!signaturePadRef.current) {
                signaturePadRef.current = new SignaturePad(canvas, {
                    penColor: penColor,
                    minWidth: penThickness,
                    maxWidth: penThickness,
                });
                resizeCanvas();
                window.addEventListener("resize", resizeCanvas);
            }
            signaturePadRef.current.on();
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
            signaturePadRef.current.minWidth = penThickness;
            signaturePadRef.current.maxWidth = penThickness;
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
            {/* Signature Toolbar */}
            {isSignatoryRole && (
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="pen-color" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Pen Color:
                            </label>
                            <input
                                id="pen-color"
                                type="color"
                                value={penColor}
                                onChange={(e) => setPenColor(e.target.value)}
                                className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="pen-thickness" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Thickness:
                            </label>
                            <input
                                id="pen-thickness"
                                type="range"
                                min="1"
                                max="10"
                                step="0.1"
                                value={penThickness}
                                onChange={(e) => setPenThickness(parseFloat(e.target.value))}
                                className="w-20"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[2rem]">
                                {penThickness.toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Signature Pad Container */}
            <div 
                ref={containerRef}
                className="relative w-full h-64 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full rounded-lg"
                    style={{ touchAction: 'none' }}
                />
                
                {/* Disabled Overlay */}
                {!isSignatoryRole && (
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center rounded-lg">
                        <p className="text-white text-lg font-semibold">
                            Signature pad disabled - Role must be 'Signatory'
                        </p>
                    </div>
                )}
            </div>

            {/* Signature Controls */}
            {isSignatoryRole && (
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={clearSignature}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Clear Signature
                    </button>
                    <button
                        onClick={saveSignature}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Save Signature
                    </button>
                </div>
            )}

            {/* Signature Preview */}
            {signaturePreview && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Signature Preview:</h3>
                    <img 
                        src={signaturePreview} 
                        alt="Signature Preview" 
                        className="max-w-full h-auto border border-gray-300 dark:border-gray-600 rounded"
                    />
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