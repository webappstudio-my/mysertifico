import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BoSidebar from '../../components/bo/BoSidebar';
import BoNavbar from '../../components/bo/BoNavbar';

// Mock images
const sampleLogo = '/src/images/logos-badges/sample-logo.svg';
const sampleSignature = '/src/images/signatures/sample-signature.svg';
const sampleQrCode = '/src/images/qrcodes/sample-qrcode.svg';

// Custom hook to get window size
const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return { width: size[0], height: size[1] };
};

// Component to show on mobile screens
const MobileRestriction = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-center p-4">
            <i className="ri-computer-line text-6xl text-teal-500 mb-4"></i>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Editor Not Available on Mobile</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                The template editor is designed for a larger screen. Please switch to a desktop or tablet in landscape mode to use this feature.
            </p>
            <button
                onClick={() => navigate('/bo/templates')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
                <i className="ri-arrow-left-line"></i>
                <span>Go Back to Templates</span>
            </button>
        </div>
    );
};


const CreateTemplate = () => {
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentZoom, setCurrentZoom] = useState(1.0);
    const [selectedElement, setSelectedElement] = useState(null);
    const [currentElements, setCurrentElements] = useState([]);
    const [templateSettings, setTemplateSettings] = useState(null);
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(true);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const DPI = 96;
    const CM_TO_PX = DPI / 2.54;
    const MARGIN_PX = 1.8 * CM_TO_PX;

    const [guidelines, setGuidelines] = useState({
        top: MARGIN_PX,
        bottom: 794 - MARGIN_PX,
        left: MARGIN_PX,
        right: 1123 - MARGIN_PX,
    });

    const certificateContainerRef = useRef(null);
    const canvasAreaRef = useRef(null);

    const ZOOM_STEP = 0.1;
    const MAX_ZOOM = 1.8;
    const MIN_ZOOM = 0.2;
    const availableFonts = ['Montserrat', 'EB Garamond', 'Inter', 'Poppins'];

    // --- Effects ---

    useEffect(() => {
        if (templateSettings) {
            initializeEditor();
        }
    }, [templateSettings]);

    useEffect(() => {
        const fit = () => fitCanvasToScreen();
        if (templateSettings) {
            fit();
            window.addEventListener('resize', fit);
        }
        return () => window.removeEventListener('resize', fit);
    }, [templateSettings]);

    useEffect(() => {
        if (certificateContainerRef.current) {
            const container = certificateContainerRef.current;
            setGuidelines({
                top: MARGIN_PX,
                bottom: container.clientHeight - MARGIN_PX,
                left: MARGIN_PX,
                right: container.clientWidth - MARGIN_PX,
            });
        }
    }, [templateSettings?.orientation]);


    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    // --- Core Editor Functions ---
    const initializeEditor = () => {
        renderDefaultElements();
        setTimeout(() => {
            fitCanvasToScreen();
        }, 0);
    };

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
            { "element_id": "signature_image", "type": "image", "content": sampleSignature, "position_x": 300, "position_y": 680, "width": 200, "height": 90, "visible": true, "aspect_ratio": 90 / 200 },
            { "element_id": "signatory_name", "type": "text", "content": "{Signatory_Name}", "position_x": 300, "position_y": 780, "font_family": "Montserrat", "font_size": 16, "font_weight": "500", "color": "#000000", "visible": true },
            { "element_id": "signatory_position", "type": "text", "content": "{Signatory_Position}", "position_x": 300, "position_y": 800, "font_family": "Montserrat", "font_size": 16, "font_weight": "normal", "color": "#374151", "visible": true },
            { "element_id": "signed_date", "type": "text", "content": "{SignedDate}", "position_x": 561, "position_y": 880, "font_family": "Montserrat", "font_size": 14, "font_weight": "normal", "color": "#374151", "visible": true },
            { "element_id": "qr_code", "type": "image", "content": sampleQrCode, "position_x": 800, "position_y": 680, "width": 120, "height": 120, "visible": true, "aspect_ratio": 1 }
        ];
        setCurrentElements(defaultElements.map(el => ({ ...el, alignment: 'Centre' })));
    };

    const updateZoom = (newZoom) => {
        const clampedZoom = Math.max(MIN_ZOOM, Math.min(newZoom, MAX_ZOOM));
        setCurrentZoom(clampedZoom);
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
            updateZoom(Math.min(scaleX, scaleY) * 0.9);
        }
    };

    const handleRotate = () => {
        setTemplateSettings(prev => ({
            ...prev,
            orientation: prev.orientation === 'Landscape' ? 'Portrait' : 'Landscape'
        }));
        setTimeout(fitCanvasToScreen, 0);
    };

    const handleElementSelect = (element) => {
        setSelectedElement(element);
        setIsInspectorOpen(true);
    };

    const handleUpdateElement = (updatedData) => {
        setCurrentElements(prev => prev.map(el =>
            el.element_id === updatedData.element_id ? updatedData : el
        ));
        setSelectedElement(updatedData);
    };

    const handleCanvasClick = (e) => {
        if (e.target.id === 'elements-layer') {
            setSelectedElement(null);
            setIsInspectorOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (width < 1024) {
        return <MobileRestriction />;
    }

    return (
        <div className="min-h-screen bg-bo-bg-light dark:bg-bo-bg-dark transition-colors duration-300">
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
                <EditorToolbar
                    onRotate={handleRotate}
                    currentZoom={currentZoom}
                    onZoomChange={updateZoom}
                    onSave={() => setIsSaveModalOpen(true)}
                    onChangeTemplate={() => setIsSetupModalOpen(true)}
                    ZOOM_STEP={ZOOM_STEP}
                />
                <div className="flex-grow flex relative overflow-hidden" style={{ height: 'calc(100vh - 144px)' }}>
                    <div id="canvas-area" ref={canvasAreaRef} className="flex-grow flex items-start justify-center px-8 pt-4 pb-8 overflow-auto">
                        <div
                            id="certificate-container"
                            ref={certificateContainerRef}
                            className={templateSettings ? templateSettings.orientation.toLowerCase() : 'landscape'}
                            style={{ transform: `scale(${currentZoom})` }}
                        >
                            <div id="blanko-layer" className="canvas-layer" style={{ backgroundImage: `url(${templateSettings?.blankoUrl || ''})` }}></div>
                            <div id="grid-layer" className="canvas-layer"></div>
                            <GuidelineLayer guidelines={guidelines} setGuidelines={setGuidelines} zoom={currentZoom} containerRef={certificateContainerRef} />
                            <div id="elements-layer" className="canvas-layer" onClick={handleCanvasClick}>
                                {templateSettings && currentElements.map(element => (
                                    <CertificateElement
                                        key={element.element_id}
                                        element={element}
                                        zoom={currentZoom}
                                        containerRef={certificateContainerRef}
                                        onSelect={handleElementSelect}
                                        onUpdate={handleUpdateElement}
                                        isSelected={selectedElement?.element_id === element.element_id}
                                        templateSettings={templateSettings}
                                        guidelines={guidelines}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <InspectorPanel
                        isOpen={isInspectorOpen}
                        onClose={() => setIsInspectorOpen(false)}
                        element={selectedElement}
                        onUpdate={handleUpdateElement}
                        availableFonts={availableFonts}
                        containerRef={certificateContainerRef}
                    />
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
                        setIsSaveModalOpen(false);
                        setToastMessage('Template saved successfully!');
                        setTimeout(() => navigate('/bo/templates'), 1500);
                    }}
                />
            )}
            {toastMessage && (
                <div id="toast" className="fixed top-24 right-6 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

// --- Child Components ---

const CertificateElement = ({ element, zoom, containerRef, onSelect, onUpdate, isSelected, templateSettings, guidelines }) => {
    const elRef = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(element);

        let moved = false;
        const initialX = e.clientX;
        const initialY = e.clientY;
        const el = elRef.current;
        const offsetX = el.offsetLeft;
        const offsetY = el.offsetTop;

        const onMouseMove = (moveEvent) => {
            if (!moved && (Math.abs(moveEvent.clientX - initialX) > 2 || Math.abs(moveEvent.clientY - initialY) > 2)) {
                moved = true;
                el.style.transform = 'none';
            }

            if (moved) {
                const dx = (moveEvent.clientX - initialX) / zoom;
                const dy = (moveEvent.clientY - initialY) / zoom;

                let newX = offsetX + dx;
                let newY = offsetY + dy;

                newX = Math.max(guidelines.left, Math.min(newX, guidelines.right - el.offsetWidth));
                newY = Math.max(guidelines.top, Math.min(newY, guidelines.bottom - el.offsetHeight));

                el.style.left = `${newX}px`;
                el.style.top = `${newY}px`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            if (moved) {
                onUpdate({
                    ...element,
                    position_x: el.offsetLeft,
                    position_y: el.offsetTop,
                    alignment: 'Manual',
                });
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });
    };

    const getPositionStyles = () => {
        if (!containerRef.current || !templateSettings) return {};

        const currentHeight = containerRef.current.clientHeight;
        const baseHeight = templateSettings.orientation === 'Landscape' ? 794 : 1123;
        const heightScaleRatio = currentHeight / baseHeight;

        const baseStyles = {
            top: `${element.position_y * heightScaleRatio}px`,
            left: `${element.position_x}px`,
            display: element.visible === false ? 'none' : 'block',
        };

        if (element.alignment !== 'Manual') {
            const alignment = (element.alignment || templateSettings.alignment).toLowerCase();

            baseStyles.left = '50%';
            baseStyles.transform = 'translateX(-50%)';

            if (alignment === 'left') {
                baseStyles.left = `${guidelines.left}px`;
                baseStyles.transform = 'translateX(0)';
            } else if (alignment === 'right') {
                baseStyles.left = `${guidelines.right}px`;
                baseStyles.transform = 'translateX(-100%)';
            }
        } else {
            baseStyles.transform = 'none';
        }

        return baseStyles;
    };

    const commonProps = {
        ref: elRef,
        className: `certificate-element ${isSelected ? 'selected' : ''}`,
        onMouseDown: handleMouseDown,
        style: getPositionStyles()
    };

    if (element.type === 'text') {
        return (
            <div {...commonProps} style={{ ...commonProps.style, fontFamily: `'${element.font_family}', sans-serif`, fontSize: `${element.font_size}px`, fontWeight: element.font_weight, color: element.color, whiteSpace: 'nowrap' }}>
                {element.content}
            </div>
        );
    }

    if (element.type === 'image') {
        return (
            <div {...commonProps} style={{ ...commonProps.style, width: `${element.width}px`, height: `${element.height}px` }}>
                <img src={element.content} alt={element.element_id} style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
            </div>
        );
    }

    return null;
};

const GuidelineLayer = ({ guidelines, setGuidelines, zoom, containerRef }) => {

    const createDragHandler = (side) => (e) => {
        e.preventDefault();
        const containerRect = containerRef.current.getBoundingClientRect();

        const onMouseMove = (moveEvent) => {
            setGuidelines(prev => {
                const newGuidelines = { ...prev };
                if (side === 'top' || side === 'bottom') {
                    const newY = (moveEvent.clientY - containerRect.top) / zoom;
                    if (side === 'top' && newY < prev.bottom - 20 && newY > 0) newGuidelines.top = newY;
                    if (side === 'bottom' && newY > prev.top + 20 && newY < containerRect.height / zoom) newGuidelines.bottom = newY;
                } else {
                    const newX = (moveEvent.clientX - containerRect.left) / zoom;
                    if (side === 'left' && newX < prev.right - 20 && newX > 0) newGuidelines.left = newX;
                    if (side === 'right' && newX > prev.left + 20 && newX < containerRect.width / zoom) newGuidelines.right = newX;
                }
                return newGuidelines;
            });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });
    };

    return (
        <div id="guideline-layer" className="canvas-layer">
            <div className="guideline horizontal" style={{ top: guidelines.top }} onMouseDown={createDragHandler('top')} />
            <div className="guideline horizontal" style={{ top: guidelines.bottom }} onMouseDown={createDragHandler('bottom')} />
            <div className="guideline vertical" style={{ left: guidelines.left }} onMouseDown={createDragHandler('left')} />
            <div className="guideline vertical" style={{ left: guidelines.right }} onMouseDown={createDragHandler('right')} />
        </div>
    );
};


const EditorToolbar = ({ onRotate, currentZoom, onZoomChange, onSave, onChangeTemplate, ZOOM_STEP }) => (
    <div id="editor-toolbar" className="sticky top-[80px] z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 text-black dark:text-white">
                <button onClick={onRotate} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" title="Rotate Canvas"><i className="ri-clockwise-2-line text-xl"></i></button>
                <button onClick={() => onZoomChange(currentZoom - ZOOM_STEP)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" title="Zoom Out"><i className="ri-zoom-out-line text-xl"></i></button>
                <span className="text-sm font-semibold w-12 text-center">{Math.round(currentZoom * 100)}%</span>
                <button onClick={() => onZoomChange(currentZoom + ZOOM_STEP)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" title="Zoom In"><i className="ri-zoom-in-line text-xl"></i></button>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={onChangeTemplate} type="button" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2"><i className="ri-upload-2-line"></i><span>Change Template</span></button>
                <button onClick={onSave} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2"><i className="ri-save-line"></i><span>Save</span></button>
            </div>
        </div>
    </div>
);

const InspectorPanel = ({ isOpen, onClose, element, onUpdate, availableFonts, containerRef }) => {
    if (!element) return (
        <aside className={`fixed right-0 w-80 text-gray-900 dark:text-white bg-white dark:bg-slate-800 border-l p-6 z-20 top-[144px] h-[calc(100vh-144px)] transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Inspector</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl">&times;</button>
            </div>
            <p className="text-gray-500">Select an element to inspect its properties.</p>
        </aside>
    );

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        const key = id.replace('inspector-', '').replace(/-/g, '_');
        let updatedValue = type === 'checkbox' ? checked : value;

        if (type === 'range' || id === 'inspector-width') {
            updatedValue = parseFloat(value);
        }

        const newData = { ...element, [key]: updatedValue };

        if (key === 'width') {
            newData.height = updatedValue * element.aspect_ratio;
        }

        onUpdate(newData);
    };

    const handleAlignmentChange = (newAlign) => {
        onUpdate({ ...element, alignment: newAlign.charAt(0).toUpperCase() + newAlign.slice(1) });
    };

    const handleWeightChange = (newWeight) => {
        onUpdate({ ...element, font_weight: newWeight });
    };

    const isVariable = element.content?.startsWith('{') && element.content?.endsWith('}');

    return (
        <aside className={`fixed right-0 w-80 text-gray-900 dark:text-white bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto z-20 top-[144px] h-[calc(100vh-144px)] transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Inspector</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl">&times;</button>
            </div>
            <div className="space-y-6">
                {element.type === 'image' && (
                    <div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="inspector-width">Width</label>
                            <span className="text-sm dark:text-gray-300">{Math.round(element.width)}px</span>
                        </div>
                        <input type="range" id="inspector-width" min="20" max={containerRef.current?.clientWidth || 1123} value={element.width} onChange={handleChange} />
                    </div>
                )}
                {element.type === 'text' && (
                    <>
                        <div>
                            <label htmlFor="inspector-content">Content</label>
                            <textarea id="inspector-content" rows="3" value={element.content} onChange={handleChange} disabled={isVariable} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-800" />
                            {isVariable && <p className="text-xs text-gray-400 mt-1">This is a variable field.</p>}
                        </div>
                        <div>
                            <label htmlFor="inspector-font_family">Font Family</label>
                            <select id="inspector-font_family" value={element.font_family} onChange={handleChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                {availableFonts.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="inspector-font_size">Font Size</label>
                                <span className="text-sm dark:text-gray-300">{element.font_size}px</span>
                            </div>
                            <input type="range" id="inspector-font_size" min="8" max="150" value={element.font_size} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Font Weight</label>
                            <div className="segmented-control">
                                <button onClick={() => handleWeightChange('normal')} className={element.font_weight === 'normal' ? 'active' : ''}>Normal</button>
                                <button onClick={() => handleWeightChange('500')} className={element.font_weight === '500' ? 'active' : ''}>Medium</button>
                                <button onClick={() => handleWeightChange('bold')} className={element.font_weight === 'bold' ? 'active' : ''}>Bold</button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="inspector-color">Color</label>
                            <input type="color" id="inspector-color" value={element.color} onChange={handleChange} className="w-full h-10 p-1" />
                        </div>
                    </>
                )}
                <div>
                    <label>Alignment</label>
                    <div className="flex gap-2 mt-1">
                        <button onClick={() => handleAlignmentChange('left')} className="p-2 border rounded"><i className="ri-align-left"></i></button>
                        <button onClick={() => handleAlignmentChange('Centre')} className="p-2 border rounded"><i className="ri-align-center"></i></button>
                        <button onClick={() => handleAlignmentChange('right')} className="p-2 border rounded"><i className="ri-align-right"></i></button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="inspector-visible" className="mb-0">Visible</label>
                    <div className="toggle-switch-container">
                        <input type="checkbox" id="inspector-visible" className="sr-only" checked={element.visible !== false} onChange={handleChange} />
                        <label htmlFor="inspector-visible" className="toggle-switch"><div className="toggle-thumb"></div></label>
                    </div>
                </div>
            </div>
        </aside>
    );
};

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
                                    <select id="style" value={settings.style} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700">
                                        <option value="">Select Style</option>
                                        <option value="Classic">Classic</option>
                                        <option value="Modern">Modern</option>
                                    </select>
                                    <select id="orientation" value={settings.orientation} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700">
                                        <option value="Landscape">Landscape</option>
                                        <option value="Portrait">Portrait</option>
                                    </select>
                                    <select id="alignment" value={settings.alignment} onChange={handleChange} className="mt-1 block w-full px-4 py-2.5 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 bg-white dark:bg-gray-700">
                                        <option value="Left">Left</option>
                                        <option value="Centre">Centre</option>
                                        <option value="Right">Right</option>
                                    </select>
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
    const sequence = '001';

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

const Styles = () => (
    <style>{`
        #canvas-area { background-color: #e2e8f0; }
        .dark #canvas-area { background-color: #0f172a; }
        #certificate-container { position: relative; background-color: white; box-shadow: 0 10px 25px rgba(0,0,0,0.1); transform-origin: center center; }
        .landscape { width: 1123px; height: 794px; }
        .portrait { width: 794px; height: 1123px; }
        .canvas-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        #blanko-layer, #grid-layer { pointer-events: none; }
        #guideline-layer { pointer-events: auto; }
        #blanko-layer { background-size: cover; background-position: center; }
        #grid-layer { background-image: linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px); background-size: 10px 10px; }
        .guideline { position: absolute; background-color: rgba(255, 0, 0, 0.5); z-index: 10; }
        .guideline:hover { background-color: rgba(255, 0, 0, 1); }
        .guideline.horizontal { width: 100%; height: 2px; cursor: ns-resize; }
        .guideline.vertical { height: 100%; width: 2px; cursor: ew-resize; }
        .certificate-element { position: absolute; cursor: move; padding: 2px; border: 1px solid transparent; }
        .certificate-element.selected { border-color: #3b82f6; outline: 2px solid #3b82f6; z-index: 20; }
        .segmented-control { display: flex; border: 1px solid #9ca3af; border-radius: 0.375rem; overflow: hidden; }
        .dark .segmented-control { border-color: #6b7280; }
        .segmented-control button { flex-grow: 1; padding: 0.25rem 0.5rem; background-color: transparent; border: none; color: #6b7280; cursor: pointer; }
        .dark .segmented-control button { color: #d1d5db; }
        .segmented-control button:not(:last-child) { border-right: 1px solid #9ca3af; }
        .dark .segmented-control button:not(:last-child) { border-right-color: #6b7280; }
        .segmented-control button.active { background-color: #0d9488; color: white; }
        .toggle-switch-container { display: flex; align-items: center; }
        .toggle-switch { position: relative; display: inline-block; width: 44px; height: 24px; background-color: #d1d5db; border-radius: 9999px; cursor: pointer; flex-shrink: 0; }
        .dark .toggle-switch { background-color: #4b5563; }
        .toggle-switch-container input:checked + .toggle-switch { background-color: #0d9488; }
        .toggle-thumb { position: absolute; left: 2px; top: 2px; width: 20px; height: 20px; background-color: white; border-radius: 9999px; transition: transform 0.2s; }
        .toggle-switch-container input:checked + .toggle-switch .toggle-thumb { transform: translateX(20px); }
    `}</style>
);

export default CreateTemplate;
