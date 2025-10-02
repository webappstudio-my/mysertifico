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
    const [activeTab, setActiveTab] = useState('draw');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const fileInputRef = useRef(null);


    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const closeToast = () => {
        setToast(null);
    };

    const resizeCanvas = () => {
        if (activeTab !== 'draw') return;
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const data = signaturePadRef.current ? signaturePadRef.current.toData() : [];
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = container.offsetWidth * ratio;
        canvas.height = container.offsetHeight * ratio;
        canvas.style.width = `${container.offsetWidth}px`;
        canvas.style.height = `${container.offsetHeight}px`;
        canvas.getContext('2d').scale(ratio, ratio);

        if (signaturePadRef.current) {
            signaturePadRef.current.penColor = penColor;
            signaturePadRef.current.minWidth = parseFloat(penThickness);
            signaturePadRef.current.maxWidth = parseFloat(penThickness);
            signaturePadRef.current.fromData(data);
        }
    };

    const manageSignaturePadState = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const selectedRole = role;
        if (selectedRole === 'Signatory') {
            if (signaturePadRef.current) {
                signaturePadRef.current.off();
                window.removeEventListener("resize", resizeCanvas);
            }

            if (activeTab === 'draw') {
                signaturePadRef.current = new SignaturePad(canvas, {
                    penColor: penColor,
                    minWidth: parseFloat(penThickness),
                    maxWidth: parseFloat(penThickness),
                });
                resizeCanvas();
                window.addEventListener("resize", resizeCanvas);
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
            if (signaturePadRef.current) {
                window.removeEventListener("resize", resizeCanvas);
            }
        };
    }, [role, activeTab]);


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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 1 * 1024 * 1024) { // 1MB limit
            showToast('File is too large. Max 1MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target.result);
            setUploadedFileName(file.name);
        };
        reader.readAsDataURL(file);
    };

    const removeUploadedImage = () => {
        setUploadedImage(null);
        setUploadedFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const clearSignature = () => {
        if (activeTab === 'draw' && signaturePadRef.current) {
            signaturePadRef.current.clear();
        } else if (activeTab === 'upload') {
            removeUploadedImage();
        }
    };

    const saveSignature = () => {
        let dataURL = null;

        if (activeTab === 'draw') {
            if (!signaturePadRef.current || signaturePadRef.current.isEmpty()) {
                showToast("Please provide a signature first.", "error");
                return;
            }
            dataURL = signaturePadRef.current.toDataURL('image/png');
        } else {
            if (!uploadedImage) {
                showToast("Please upload an image first.", "error");
                return;
            }
            dataURL = uploadedImage;
        }

        setSignaturePreview(dataURL);
        showToast('Signature saved successfully!');

        if (onSignatureSave) {
            onSignatureSave(dataURL);
        }
    };

    const isSignatoryRole = role === 'Signatory';

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Your Signature</h3>
            </div>

            {isSignatoryRole && (
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6 -mx-6 px-6">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('draw')}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'draw'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                        >
                            <i className="ri-pencil-line mr-1"></i>Draw Signature
                        </button>
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'upload'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                        >
                            <i className="ri-upload-2-line mr-1"></i>Upload Image
                        </button>
                    </nav>
                </div>
            )}

            <div className="relative w-full max-w-3xl mx-auto">
                {activeTab === 'draw' && (
                    <div>
                        <div className="flex items-center justify-end gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <label title="Pen Color" className="cursor-pointer text-gray-600 dark:text-gray-300">
                                    <i className="ri-palette-line"></i>
                                </label>
                                <input
                                    type="color"
                                    value={penColor}
                                    onChange={(e) => setPenColor(e.target.value)}
                                    className="w-8 h-8 p-1 rounded-md cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label title="Pen Thickness" className="cursor-pointer text-gray-600 dark:text-gray-300">
                                    <i className="ri-pencil-ruler-2-line"></i>
                                </label>
                                <input
                                    type="range"
                                    min="1" max="10" step="0.5"
                                    value={penThickness}
                                    onChange={(e) => setPenThickness(parseFloat(e.target.value))}
                                    className="w-24 cursor-pointer"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-center">
                                    {parseFloat(penThickness).toFixed(1)}
                                </span>
                            </div>
                        </div>

                        <div
                            ref={containerRef}
                            className="h-[350px] border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-gray-700"
                        >
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full rounded-lg cursor-crosshair"
                                style={{ touchAction: 'none' }}
                            />
                        </div>

                        {/* The dedicated clear button that was here has been removed as requested. */}
                    </div>
                )}

                {activeTab === 'upload' && (
                    <div className="w-full max-w-xl mx-auto">
                        <label htmlFor="signature-image-upload" className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <i className="ri-upload-cloud-2-line text-4xl text-gray-500 dark:text-gray-400"></i>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (Max. 1MB)</p>
                            </div>
                            <input id="signature-image-upload" ref={fileInputRef} type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileUpload} />
                        </label>
                        {uploadedImage && (
                            <div className="mt-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={uploadedImage} className="h-12 w-auto bg-white dark:bg-gray-100 p-1 rounded" alt="Upload preview" />
                                        <span className="text-sm text-gray-700 dark:text-gray-200">{uploadedFileName}</span>
                                    </div>
                                    <button onClick={removeUploadedImage} type="button" className="text-red-500 hover:text-red-700"><i className="ri-delete-bin-line"></i></button>
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">For best results, use a PNG image with a transparent background.</p>
                    </div>
                )}

                {!isSignatoryRole && (
                    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-700 bg-opacity-80 flex items-center justify-center rounded-lg z-10">
                        <p className="flex flex-col items-center text-center text-gray-600 dark:text-gray-300 px-4 font-semibold">
                            <i className="ri-lock-line text-2xl mb-2"></i>
                            This feature is only available for the 'Signatory' role.
                        </p>
                    </div>
                )}
            </div>

            {/* --- CLEAR BUTTON REVERTED --- */}
            {/* The Clear button is now back in the main controls at the bottom. */}
            {isSignatoryRole && (
                <div className="w-full max-w-3xl mx-auto flex justify-end gap-3 mt-6">
                    <button
                        onClick={clearSignature}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={saveSignature}
                        className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Save Signature
                    </button>
                </div>
            )}

            {savedSignaturePreview && (
                <div className="w-full max-w-3xl mx-auto mt-6">
                    <h3 className="text-sm mb-2 font-medium text-gray-900 dark:text-gray-100">Saved Signature:</h3>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-center border border-gray-200 dark:border-gray-600">
                        <img
                            src={savedSignaturePreview}
                            alt="Signature Preview"
                            className="h-20"
                        />
                    </div>
                </div>
            )}

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