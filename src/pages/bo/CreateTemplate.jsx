import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar'; // Assuming you have these components
import BoNavbar from '../../components/bo/BoNavbar';   // Assuming you have these components

// Mock images - replace with your actual asset imports
const sampleLogo = '/src/images/logos-badges/sample-logo.svg';
const sampleSignature = '/src/images/signatures/sample-signature.svg';
const sampleQrCode = '/src/images/qrcodes/sample-qrcode.svg';


const CreateTemplate = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // --- State Variables ---
    const [currentZoom, setCurrentZoom] = useState(1.0);
    const [selectedElement, setSelectedElement] = useState(null);
    const [currentElements, setCurrentElements] = useState([]);
    const [masterAlignment, setMasterAlignment] = useState('centre');
    const [templateSettings, setTemplateSettings] = useState(null);
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(true);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // --- Refs for DOM Elements ---
    const certificateContainerRef = useRef(null);
    const canvasAreaRef = useRef(null);
    const elementsLayerRef = useRef(null);
    const guidelineTopRef = useRef(null);
    const guidelineBottomRef = useRef(null);
    const guidelineLeftRef = useRef(null);
    const guidelineRightRef = useRef(null);
    const inspectorPanelRef = useRef(null);

    const ZOOM_STEP = 0.1;
    const MAX_ZOOM = 1.8;
    const MIN_ZOOM = 0.2;
    const DPI = 96;
    const CM_TO_PX = DPI / 2.54;
    const MARGIN_PX = 1.8 * CM_TO_PX;
    const GRID_SIZE = 10;
    const availableFonts = ['Montserrat', 'EB Garamond', 'Inter', 'Poppins'];

    // --- Effects ---

    // Effect to initialize the editor once template settings are available
    useEffect(() => {
        if (templateSettings) {
            initializeEditor(templateSettings);
        }
    }, [templateSettings]);

    // Effect for resizing and initial canvas fit
    useEffect(() => {
        const fit = () => fitCanvasToScreen();
        if (templateSettings) {
            fit();
            window.addEventListener('resize', fit);
        }
        return () => window.removeEventListener('resize', fit);
    }, [templateSettings]);

    // Effect to show toast messages
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    // --- Core Editor Functions ---
    const initializeEditor = (settings) => {
        setMasterAlignment(settings.alignment.toLowerCase());
        const container = certificateContainerRef.current;
        if (settings.orientation === 'Portrait') {
            container.classList.remove('landscape');
            container.classList.add('portrait');
        } else {
            container.classList.remove('portrait');
            container.classList.add('landscape');
        }
        container.querySelector('#blanko-layer').style.backgroundImage = `url(${settings.blankoUrl})`;

        // Use timeout to ensure DOM is updated before calculating positions
        setTimeout(() => {
            updateGuidelines();
            renderDefaultElements();
        }, 0);
    };

    const updateZoom = (newZoom) => {
        const clampedZoom = Math.max(MIN_ZOOM, Math.min(newZoom, MAX_ZOOM));
        setCurrentZoom(clampedZoom);
        if (certificateContainerRef.current) {
            certificateContainerRef.current.style.transform = `scale(${clampedZoom})`;
        }
    };

    const fitCanvasToScreen = () => {
        if (!canvasAreaRef.current || !certificateContainerRef.current) return;

        const padding = 64;
        const areaWidth = canvasAreaRef.current.clientWidth - padding;
        const areaHeight = canvasAreaRef.current.clientHeight - padding;

        const certWidth = certificateContainerRef.current.offsetWidth;
        const certHeight = certificateContainerRef.current.offsetHeight;

        if (certWidth > 0 && certHeight > 0) {
            const scaleX = areaWidth / certWidth;
            const scaleY = areaHeight / certHeight;
            const newZoom = Math.min(scaleX, scaleY) * 0.9;
            updateZoom(newZoom);
        }
    };

    const updateGuidelines = () => {
        if (!certificateContainerRef.current) return;
        const container = certificateContainerRef.current;
        guidelineTopRef.current.style.top = `${MARGIN_PX}px`;
        guidelineBottomRef.current.style.top = `${container.clientHeight - MARGIN_PX}px`;
        guidelineLeftRef.current.style.left = `${MARGIN_PX}px`;
        guidelineRightRef.current.style.left = `${container.clientWidth - MARGIN_PX}px`;
    };

    const handleRotate = () => {
        const container = certificateContainerRef.current;
        if (container) {
            container.classList.toggle('landscape');
            container.classList.toggle('portrait');
            // Update template settings state
            setTemplateSettings(prev => ({
                ...prev,
                orientation: container.classList.contains('landscape') ? 'Landscape' : 'Portrait'
            }));
            setTimeout(() => {
                updateGuidelines();
                renderElements(currentElements, masterAlignment);
                fitCanvasToScreen();
            }, 0);
        }
    };

    // --- Element Rendering & Manipulation ---
    const renderDefaultElements = () => {
        const defaultElements = [
            { "element_id": "logo", "type": "image", "content": sampleLogo, "position_x": 561, "position_y": 70, "width": 140, "height": 140, "visible": true, "aspect_ratio": 1 },
            { "element_id": "organization_name", "type": "text", "content": "{Organization_Name}", "position_x": 561, "position_y": 220, "font_family": "Montserrat", "font_size": 20, "font_weight": "500", "color": "#111827", "visible": true },
            { "element_id": "address_1", "type": "text", "content": "{Address_row1}", "position_x": 561, "position_y": 250, "font_family": "Montserrat", "font_size": 14, "font_weight": "normal", "color": "#374151", "visible": true },
            { "element_id": "address_2", "type": "text", "content": "{Address_row2}", "position_x": 561, "position_y": 270, "font_family": "Montserrat", "font_size": 14, "font_weight": "normal", "color": "#374151", "visible": true },
            { "element_id": "certificate_title", "type": "text", "content": "CERTIFICATE OF EXCELLENCE", "position_x": 561, "position_y": 330, "font_family": "EB Garamond", "font_size": 46, "font_weight": "bold", "color": "#111827", "visible": true },
            { "element_id": "certificate_body", "type": "text", "content": "This certificate is proudly presented to", "position_x": 561, "position_y": 430, "font_family": "Montserrat", "font_size": 18, "font_weight": "normal", "color": "#374151", "visible": true },
            { "element_id": "recipient_name", "type": "text", "content": "{Recipient_Name}", "position_x": 561, "position_y": 470, "font_family": "Montserrat", "font_size": 24, "font_weight": "bold", "color": "#000000", "visible": true },
            { "element_id": "event_description", "type": "text", "content": "in recognition of their outstanding achievement in", "position_x": 561, "position_y": 530, "font_family": "Montserrat", "font_size": 18, "font_weight": "normal", "color": "#374151", "visible": true },
            { "element_id": "event_date", "type": "text", "content": "{EventName} on {EventDate}", "position_x": 561, "position_y": 555, "font_family": "Montserrat", "font_size": 18, "font_weight": "500", "color": "#111827", "visible": true },
            { "element_id": "signature_image", "type": "image", "content": sampleSignature, "position_x": 561, "position_y": 680, "width": 200, "height": 90, "visible": true, "aspect_ratio": 90 / 200 },
            { "element_id": "signatory_name", "type": "text", "content": "{Signatory_Name}", "position_x": 561, "position_y": 750, "font_family": "Montserrat", "font_size": 16, "font_weight": "500", "color": "#000000", "visible": true },
            { "element_id": "signatory_position", "type": "text", "content": "{Signatory_Position}", "position_x": 561, "position_y": 770, "font_family": "Montserrat", "font_size": 16, "font_weight": "normal", "color": "#374151", "visible": true },
            { "element_id": "signed_date", "type": "text", "content": "{SignedDate}", "position_x": 561, "position_y": 880, "font_family": "Montserrat", "font_size": 14, "font_weight": "normal", "color": "#374151", "visible": true },
            { "element_id": "qr_code", "type": "image", "content": sampleQrCode, "position_x": 561, "position_y": 950, "width": 160, "height": 160, "visible": true, "aspect_ratio": 1 }
        ];
        const elementsWithAlignment = defaultElements.map(el => ({ ...el, alignment: 'Centre' }));
        setCurrentElements(elementsWithAlignment);
        renderElements(elementsWithAlignment, masterAlignment);
    };

    const renderElements = (elements, alignment) => {
        if (!elementsLayerRef.current || !certificateContainerRef.current) return;

        const elementsLayer = elementsLayerRef.current;
        elementsLayer.innerHTML = ''; // Clear previous elements

        const currentWidth = certificateContainerRef.current.clientWidth;
        const currentHeight = certificateContainerRef.current.clientHeight;
        const baseHeight = 1123;
        const heightScaleRatio = currentHeight / baseHeight;

        elements.forEach(item => {
            const el = document.createElement('div');
            el.className = 'certificate-element';
            el.dataset.id = item.element_id;
            el.style.top = item.alignment === 'Manual' ? `${item.position_y}px` : `${item.position_y * heightScaleRatio}px`;
            el.style.left = item.alignment === 'Manual' ? `${item.position_x}px` : `0px`;
            el.style.display = item.visible === false ? 'none' : 'block';

            if (item.type === 'text') {
                el.innerText = item.content;
                el.style.fontFamily = `'${item.font_family}', sans-serif`;
                el.style.fontWeight = item.font_weight || 'normal';
                el.style.color = item.color;
                el.style.whiteSpace = 'nowrap';
                el.style.fontSize = `${item.font_size}px`;
            } else if (item.type === 'image') {
                el.style.width = `${item.width}px`;
                el.style.height = `${item.height}px`;
                const img = document.createElement('img');
                img.src = item.content;
                el.appendChild(img);
            }

            if (item.alignment !== 'Manual') {
                const effectiveAlignment = item.alignment?.toLowerCase() || alignment;
                if (effectiveAlignment === 'left') {
                    el.style.left = `${guidelineLeftRef.current.offsetLeft}px`;
                    el.style.transform = 'translateX(0)';
                } else if (effectiveAlignment === 'right') {
                    el.style.left = `${guidelineRightRef.current.offsetLeft}px`;
                    el.style.transform = 'translateX(-100%)';
                } else {
                    el.style.left = `${currentWidth / 2}px`;
                    el.style.transform = `translateX(-50%)`;
                }
            } else {
                el.style.transform = 'none';
            }

            elementsLayer.appendChild(el);
            makeElementDraggable(el);
        });
    };

    const makeElementDraggable = (element) => {
        const onMouseDown = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const elementId = element.dataset.id;
            const elementData = currentElements.find(item => item.element_id === elementId);
            setSelectedElement(elementData);
            setIsInspectorOpen(true);

            const initialX = e.clientX;
            const initialY = e.clientY;
            const offsetX = element.offsetLeft;
            const offsetY = element.offsetTop;

            const onMouseMove = (moveEvent) => {
                const newRawX = offsetX + ((moveEvent.clientX - initialX) / currentZoom);
                const newRawY = offsetY + ((moveEvent.clientY - initialY) / currentZoom);

                let snappedX = Math.round(newRawX / GRID_SIZE) * GRID_SIZE;
                let snappedY = Math.round(newRawY / GRID_SIZE) * GRID_SIZE;

                snappedX = Math.max(guidelineLeftRef.current.offsetLeft, Math.min(snappedX, guidelineRightRef.current.offsetLeft - element.offsetWidth));
                snappedY = Math.max(guidelineTopRef.current.offsetTop, Math.min(snappedY, guidelineBottomRef.current.offsetTop - element.offsetHeight));

                element.style.left = `${snappedX}px`;
                element.style.top = `${snappedY}px`;
                element.style.transform = 'none';
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                setCurrentElements(prev => prev.map(item =>
                    item.element_id === elementId
                        ? { ...item, position_x: element.offsetLeft, position_y: element.offsetTop, alignment: 'Manual' }
                        : item
                ));
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp, { once: true });
        };
        element.addEventListener('mousedown', onMouseDown);
    };

    const handleUpdateElement = (updatedData) => {
        setCurrentElements(prev => {
            const newElements = prev.map(el =>
                el.element_id === updatedData.element_id ? updatedData : el
            );
            // Re-render after state update
            setTimeout(() => renderElements(newElements, masterAlignment), 0);
            return newElements;
        });
        setSelectedElement(updatedData);
    };

    const handleCanvasClick = (e) => {
        // If click is on the canvas but not on an element, close inspector
        if (e.target === elementsLayerRef.current) {
            setSelectedElement(null);
            setIsInspectorOpen(false);
        }
    }

    // --- Component JSX ---
    const Styles = () => (
        <style>{`
            /* Canvas Area Styling */
            #canvas-area { background-color: #e2e8f0; }
            .dark #canvas-area { background-color: #0f172a; }

            #certificate-container {
                position: relative;
                background-color: white;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                transition: transform 0.3s ease-in-out;
                transform-origin: center center;
            }

            .landscape { width: 1123px; height: 794px; }
            .portrait { width: 794px; height: 1123px; }

            /* Layers */
            .canvas-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
            #blanko-layer, #grid-layer, #guideline-layer { pointer-events: none; }
            #elements-layer { pointer-events: auto; }
            #guideline-layer > .guideline { pointer-events: auto; }
            #blanko-layer { background-size: cover; background-position: center; background-repeat: no-repeat; }
            #grid-layer { background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px); background-size: 10px 10px; }

            /* Guidelines */
            .guideline { position: absolute; background-color: rgba(255, 0, 0, 0.5); z-index: 10; }
            .guideline:hover { background-color: rgba(255, 0, 0, 1); }
            .guideline.horizontal { width: 100%; height: 2px; cursor: ns-resize; }
            .guideline.vertical { width: 2px; height: 100%; cursor: ew-resize; }

            /* Certificate Elements */
            .certificate-element { position: absolute; cursor: move; padding: 2px; border: 1px solid transparent; transition: border-color 0.2s; }
            .certificate-element.selected { border-color: #3b82f6; outline: 2px solid #3b82f6; z-index: 20; }
            .certificate-element img { width: 100%; height: 100%; pointer-events: none; }

            /* Inspector Panel */
            #inspector-panel { transition: transform 0.3s ease-in-out; }
            #inspector-panel label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500; }
            #inspector-panel input, #inspector-panel select, #inspector-panel textarea { width: 100%; margin-top: 0.25rem; padding: 0.5rem; border-radius: 0.375rem; border: 1px solid #9ca3af; }
            #inspector-panel textarea:disabled { background-color: #e5e7eb; cursor: not-allowed; }
            .dark #inspector-panel textarea:disabled { background-color: #374151; }
            #inspector-panel input[type="range"] { padding: 0; }
            .dark #inspector-panel input, .dark #inspector-panel select, .dark #inspector-panel textarea { background-color: #374151; border-color: #6b7280; }
            input:read-only { background-color: #f3f4f6; cursor: default; }
            .dark input:read-only { background-color: #4b5563; }

            /* Toggle Switch Styles */
            .toggle-switch-container { display: flex; align-items: center; }
            .toggle-switch { position: relative; display: inline-block; width: 44px; height: 24px; background-color: #d1d5db; border-radius: 9999px; transition: background-color 0.2s ease-in-out; cursor: pointer; flex-shrink: 0; }
            .dark .toggle-switch { background-color: #4b5563; }
            .toggle-switch-container input:checked + .toggle-switch { background-color: #0d9488; }
            .toggle-thumb { position: absolute; left: 2px; top: 2px; width: 20px; height: 20px; background-color: white; border-radius: 9999px; transition: transform 0.2s ease-in-out; }
            .toggle-switch-container input:checked + .toggle-switch .toggle-thumb { transform: translateX(20px); }
            
            /* Segmented Control for Font Weight */
            .segmented-control { display: flex; border: 1px solid #9ca3af; border-radius: 0.375rem; overflow: hidden; }
            .dark .segmented-control { border-color: #6b7280; }
            .segmented-control button { flex-grow: 1; padding: 0.25rem 0.5rem; background-color: transparent; border: none; color: #6b7280; cursor: pointer; transition: background-color 0.2s; }
            .dark .segmented-control button { color: #d1d5db; }
            .segmented-control button:not(:last-child) { border-right: 1px solid #9ca3af; }
            .dark .segmented-control button:not(:last-child) { border-right-color: #6b7280; }
            .segmented-control button.active { background-color: #0d9488; color: white; }
            
            #toast { transition: opacity 0.3s, transform 0.3s; }
        `}</style>
    );

    const SetupModal = ({ onSave }) => {
        const [blankoUrl, setBlankoUrl] = useState(null);
        const [fileName, setFileName] = useState('');
        const [fileError, setFileError] = useState('');
        const [fieldsError, setFieldsError] = useState('');
        const [settings, setSettings] = useState({
            style: '',
            orientation: 'Landscape',
            alignment: 'Centre',
            color: ''
        });

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file && file.type === 'image/svg+xml') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setBlankoUrl(event.target.result);
                    setFileName(file.name);
                    setFileError('');
                };
                reader.readAsDataURL(file);
            } else {
                setFileError("Please select a valid SVG file.");
            }
        };

        const handleChange = (e) => {
            setSettings({ ...settings, [e.target.id]: e.target.value });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            let isValid = true;
            if (!blankoUrl) {
                setFileError("Please upload a blanko image.");
                isValid = false;
            }
            if (!settings.style || !settings.orientation || !settings.alignment || !settings.color) {
                setFieldsError("Please fill all fields.");
                isValid = false;
            } else {
                setFieldsError('');
            }

            if (isValid) {
                onSave({ ...settings, blankoUrl });
            }
        };

        return (
            <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white">Create New Template</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">Step 1: Upload Blanko</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Upload the base image for the certificate.</p>

                                    <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                                        <div className="space-y-1 text-center">
                                            <i className="ri-image-add-line text-5xl text-gray-400"></i>
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label htmlFor="modal-file-upload" className="relative rounded-md font-medium text-teal-600 dark:text-amber-500 cursor-pointer hover:underline">
                                                    <span>Upload a file</span>
                                                    <input id="modal-file-upload" name="file-upload" type="file" className="sr-only" accept="image/svg+xml" onChange={handleFileChange} />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">Only SVG files are allowed</p>
                                        </div>
                                    </div>
                                    {blankoUrl && (
                                        <div className="mt-4 text-center">
                                            <img src={blankoUrl} alt="Image Preview" className="max-h-48 mx-auto rounded-lg shadow-md" />
                                            <p className="mt-2 text-sm text-gray-500">{fileName}</p>
                                        </div>
                                    )}
                                    {fileError && <small className="text-red-500 mt-2">{fileError}</small>}
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">Step 2: Define Properties</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Categorize and format the template.</p>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="style" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Style</label>
                                            <select id="style" value={settings.style} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700">
                                                <option value="">Select Style</option>
                                                <option value="Classic">Classic</option>
                                                <option value="Modern">Modern</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="orientation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Orientation</label>
                                            <select id="orientation" value={settings.orientation} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700">
                                                <option value="Landscape">Landscape</option>
                                                <option value="Portrait">Portrait</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="alignment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Object Alignment</label>
                                            <select id="alignment" value={settings.alignment} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700">
                                                <option value="Left">Left</option>
                                                <option value="Centre">Centre</option>
                                                <option value="Right">Right</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme Color</label>
                                            <select id="color" value={settings.color} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700">
                                                <option value="">Select Color</option>
                                                <option value="GOLD">Gold</option>
                                                <option value="BLUE">Blue</option>
                                                <option value="GREEN">Green</option>
                                                <option value="PURPLE">Purple</option>
                                                <option value="BROWN">Brown</option>
                                                <option value="BLACK">Black</option>
                                            </select>
                                        </div>
                                    </div>
                                    {fieldsError && <small className="text-red-500 mt-2">{fieldsError}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-3">
                            <Link to="/bo/templates" className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</Link>
                            <button type="submit" className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">Save Template</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const SaveModal = ({ settings, onSave, onCancel }) => {
        if (!settings) return null;

        const styleAbbr = settings.style === 'Modern' ? 'md' : 'cl';
        const orientAbbr = settings.orientation === 'Landscape' ? 'l' : 'p';
        const alignAbbr = settings.alignment.charAt(0).toLowerCase();
        const colorCode = settings.color.toLowerCase();
        const sequence = '001'; // This would typically be dynamic

        const fileName = `${styleAbbr}${orientAbbr}${alignAbbr}-${colorCode}-${sequence}`;
        const fileInfo = `${settings.style} . ${settings.orientation} . ${settings.alignment} . ${settings.color}`;

        return (
            <div className="fixed inset-0 bg-black/60 z-[120] flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
                    <div className="p-6">
                        <h3 className="font-poppins font-bold text-lg text-gray-800 dark:text-white mb-4">Save Template</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File Name</label>
                                <p className="mt-1 p-2 break-all rounded-md bg-gray-100 dark:bg-gray-700 font-bold text-teal-600 dark:text-teal-400">{fileName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File Information</label>
                                <p className="mt-1 p-2 break-all rounded-md bg-gray-100 dark:bg-gray-700 font-bold text-teal-600 dark:text-teal-400">{fileInfo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-3">
                        <button type="button" onClick={onCancel} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="button" onClick={onSave} className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors">Confirm & Save</button>
                    </div>
                </div>
            </div>
        );
    };

    const InspectorPanel = ({ element, onUpdate, availableFonts }) => {
        const [data, setData] = useState(element);

        useEffect(() => {
            setData(element);
        }, [element]);

        if (!data) {
            return (
                <div className="space-y-6">
                    <p className="text-gray-500">Select an element to inspect its properties.</p>
                </div>
            );
        }

        const handleChange = (e) => {
            const { id, value, checked } = e.target;
            let newData = { ...data };

            if (id === 'inspector-width') {
                const newWidth = parseFloat(value);
                newData.width = newWidth;
                newData.height = newWidth * data.aspect_ratio;
            } else if (id === 'inspector-visible') {
                newData.visible = checked;
            } else if (id === 'inspector-font-size') {
                newData.font_size = parseInt(value);
            } else {
                newData[id.replace('inspector-', '').replace('-', '_')] = value;
            }

            setData(newData);
            onUpdate(newData);
        };

        const handleAlignmentChange = (newAlign) => {
            const currentWidth = certificateContainerRef.current.clientWidth;
            let newData = { ...data, alignment: newAlign.charAt(0).toUpperCase() + newAlign.slice(1) };

            if (newAlign === 'left') {
                newData.position_x = guidelineLeftRef.current.offsetLeft;
            } else if (newAlign === 'right') {
                newData.position_x = guidelineRightRef.current.offsetLeft;
            } else {
                newData.position_x = currentWidth / 2;
            }
            setData(newData);
            onUpdate(newData);
        };

        const handleWeightChange = (newWeight) => {
            const newData = { ...data, font_weight: newWeight };
            setData(newData);
            onUpdate(newData);
        };

        const isVariable = data.content && data.content.startsWith('{') && data.content.endsWith('}');

        return (
            <div className="space-y-6">
                {data.type === 'image' && (
                    <>
                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="inspector-width">Width</label>
                                <span className="text-sm dark:text-gray-300">{Math.round(data.width)}px</span>
                            </div>
                            <input type="range" id="inspector-width" min="20" max={certificateContainerRef.current?.clientWidth || 1123} value={data.width} onChange={handleChange} />
                        </div>
                    </>
                )}
                {data.type === 'text' && (
                    <>
                        <div>
                            <label htmlFor="inspector-content">Content</label>
                            <textarea id="inspector-content" rows="3" value={data.content} onChange={handleChange} disabled={isVariable} />
                            {isVariable && <p className="text-xs text-gray-400 mt-1">This is a variable field and cannot be edited.</p>}
                        </div>
                        <div>
                            <label htmlFor="inspector-font-family">Font Family</label>
                            <select id="inspector-font_family" value={data.font_family} onChange={handleChange}>
                                {availableFonts.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="inspector-font-size">Font Size</label>
                                <span className="text-sm dark:text-gray-300">{data.font_size}px</span>
                            </div>
                            <input type="range" id="inspector-font-size" min="8" max="150" value={data.font_size} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Font Weight</label>
                            <div className="segmented-control">
                                <button onClick={() => handleWeightChange('normal')} className={data.font_weight === 'normal' ? 'active' : ''}>Normal</button>
                                <button onClick={() => handleWeightChange('500')} className={data.font_weight === '500' ? 'active' : ''}>Medium</button>
                                <button onClick={() => handleWeightChange('bold')} className={data.font_weight === 'bold' ? 'active' : ''}>Bold</button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="inspector-color">Color</label>
                            <input type="color" id="inspector-color" value={data.color} onChange={handleChange} className="p-1 h-10" />
                        </div>
                    </>
                )}
                {/* Common properties */}
                <div>
                    <label>Alignment</label>
                    <div className="flex gap-2 mt-1">
                        <button onClick={() => handleAlignmentChange('left')} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"><i className="ri-align-left"></i></button>
                        <button onClick={() => handleAlignmentChange('centre')} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"><i className="ri-align-center"></i></button>
                        <button onClick={() => handleAlignmentChange('right')} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"><i className="ri-align-right"></i></button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="inspector-visible" className="mb-0">Visible</label>
                    <div className="toggle-switch-container">
                        <input type="checkbox" id="inspector-visible" className="sr-only" checked={data.visible !== false} onChange={handleChange} />
                        <label htmlFor="inspector-visible" className="toggle-switch"><div className="toggle-thumb"></div></label>
                    </div>
                </div>
            </div>
        );
    };

    // Toggle sidebar for all screen sizes
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Styles />
            <BoSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    id="sidebar-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <BoNavbar
                    onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    headerTitle="Create Template"
                />

                <div id="editor-toolbar" className="sticky top-[80px] z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-2">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-2 text-black dark:text-white">
                            <button onClick={handleRotate} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" title="Rotate Canvas">
                                <i className="ri-clockwise-2-line text-xl"></i>
                            </button>
                            <button onClick={() => updateZoom(currentZoom - ZOOM_STEP)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" title="Zoom Out">
                                <i className="ri-zoom-out-line text-xl"></i>
                            </button>
                            <span className="text-sm font-semibold w-12 text-center">{Math.round(currentZoom * 100)}%</span>
                            <button onClick={() => updateZoom(currentZoom + ZOOM_STEP)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" title="Zoom In">
                                <i className="ri-zoom-in-line text-xl"></i>
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setIsSetupModalOpen(true)} type="button" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer">
                                <i className="ri-upload-2-line"></i>
                                <span>Change Template</span>
                            </button>
                            <button onClick={() => setIsSaveModalOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-colors">
                                <i className="ri-save-line"></i>
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-grow flex relative overflow-hidden" style={{ height: 'calc(100vh - 144px)' }}>
                    <div id="canvas-area" ref={canvasAreaRef} className="flex-grow flex items-start justify-center px-8 pt-4 pb-8 overflow-auto">
                        {templateSettings && (
                            <div id="certificate-container" ref={certificateContainerRef}>
                                <div id="blanko-layer" className="canvas-layer"></div>
                                <div id="grid-layer" className="canvas-layer"></div>
                                <div id="elements-layer" ref={elementsLayerRef} className="canvas-layer" onClick={handleCanvasClick}></div>
                                <div id="guideline-layer" className="canvas-layer">
                                    <div ref={guidelineTopRef} className="guideline horizontal"></div>
                                    <div ref={guidelineBottomRef} className="guideline horizontal"></div>
                                    <div ref={guidelineLeftRef} className="guideline vertical"></div>
                                    <div ref={guidelineRightRef} className="guideline vertical"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <aside id="inspector-panel" ref={inspectorPanelRef} className={`fixed right-0 w-80 text-gray-900 dark:text-white bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto z-20 top-[144px] h-[calc(100vh-144px)] ${isInspectorOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Inspector</h3>
                            <button onClick={() => setIsInspectorOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl leading-none">&times;</button>
                        </div>
                        <InspectorPanel
                            element={selectedElement}
                            onUpdate={handleUpdateElement}
                            onClose={() => setIsInspectorOpen(false)}
                            availableFonts={availableFonts}
                        />
                    </aside>
                </div>
            </div>

            {isSetupModalOpen && (
                <SetupModal onSave={(settings) => {
                    setTemplateSettings(settings);
                    setIsSetupModalOpen(false);
                    setToastMessage('Template created successfully!');
                }} />
            )}

            {isSaveModalOpen && (
                <SaveModal
                    settings={templateSettings}
                    onCancel={() => setIsSaveModalOpen(false)}
                    onSave={() => {
                        // Add save logic here
                        setIsSaveModalOpen(false);
                        setToastMessage('Template saved successfully!');
                        // Potentially navigate away after save
                        setTimeout(() => navigate('/bo/templates'), 1500);
                    }}
                />
            )}

            {toastMessage && (
                <div id="toast" className="fixed top-24 right-6 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md opacity-100 transform translate-y-0">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default CreateTemplate;
