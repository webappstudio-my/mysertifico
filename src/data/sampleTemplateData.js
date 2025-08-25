// Mock images - adjust paths as needed
import sampleLogo from '../assets/images/logos/logo.png';
import sampleSignature from '../assets/images/logos/signature.png';
import sampleQrCode from '../assets/images/logos/qr-code.png';

// Sample template data
export const templatesData = [
    {
        id: 1,
        template_code: 'CLLC-GOLD-001',
        style: 'Classic',
        orientation: 'Landscape',
        alignment: 'Center',
        theme_color: 'Gold',
        imageUrl: '/src/images/templates/cllc-gold-001.svg',
        content: [] // Content can be populated or fetched as needed
    },
    {
        id: 2,
        template_code: 'MDLC-PURPLE-003',
        style: 'Modern',
        orientation: 'Landscape',
        alignment: 'Center',
        theme_color: 'Purple',
        imageUrl: '/src/images/templates/mdlc-purple-003.svg',
        content: []
    },
    {
        id: 3,
        template_code: 'CLPC-GREEN-006',
        style: 'Classic',
        orientation: 'Portrait',
        alignment: 'Center',
        theme_color: 'Green',
        imageUrl: '/src/images/templates/clpc-green-006.svg',
        content: []
    },
    {
        id: 4,
        template_code: 'MDPC-RED-005',
        style: 'Modern',
        orientation: 'Portrait',
        alignment: 'Center',
        theme_color: 'Red',
        imageUrl: '/src/images/templates/mdpl-red-005.svg',
        content: []
    },
];

// Sample elements data for certificate preview
export const elementsData = [
    { element_id: "logo", type: "image", content: sampleLogo, position_x: 561, position_y: 90, width: 100, height: 100, alignment: "Centre" },
    { element_id: "organization_name", type: "text", content: "{OrganizationName}", position_x: 561, position_y: 190, font_family: "Montserrat", font_size: 20, font_weight: "500", color: "#111827", alignment: "Centre" },
    { element_id: "certificate_title", type: "text", content: "CERTIFICATE TITLE", position_x: 561, position_y: 270, font_family: "EB Garamond", font_size: 60, font_weight: "bold", color: "#92400e", alignment: "Centre" },
    { element_id: "recipient_name", type: "text", content: "{RecipientName}", position_x: 561, position_y: 410, font_family: "EB Garamond", font_size: 24, font_weight: "bold", color: "#000000", alignment: "Centre" },
    { element_id: "signature_image", type: "image", content: sampleSignature, position_x: 300, position_y: 560, width: 180, height: 70 },
    { element_id: "qr_code", type: "image", content: sampleQrCode, position_x: 820, position_y: 590, width: 100, height: 100 }
];
