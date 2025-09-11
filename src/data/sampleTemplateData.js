// Mock images - adjust paths as needed
import sampleLogo from '../assets/images/logos/logo.png';
import sampleSignature from '../assets/images/logos/signature.png';
import sampleQrCode from '../assets/images/logos/qr-code.png';
import cpblk003 from '../assets/images/templates/cpblk003.svg';
import mlgold002 from '../assets/images/templates/ml-gold-002.svg';


// Mock Recipient Database
export const recipientDatabase = {
  "900101105555": {
    name: "Siti Nurhaliza binti Tarudin",
    certificates: [
      {
        id: 'cert-001',
        name: "Sijil Tamat Sekolah Kohort 2021 - 2025",
        issuedDate: "25/12/2025",
        status: "Published",
        template_code: 'CPBLK-003',
        image: cpblk003,  
        data: {
          Organization_Name: "SMK Puchong Perdana",
          Address_row1: "Jalan Perdana 2/1, Taman Puchong Perdana",
          Address_row2: "47100 Puchong, Selangor",
          Certificate_Title: "SIJIL TAMAT SEKOLAH",
          Certificate_Body: "Dengan ini disahkan bahawa",
          Recipient_Name: "Siti Nurhaliza binti Tarudin",
          Event_Description: "telah menamatkan pengajian Tingkatan 5 dengan jayanya.",
          Event_Date: "25 Disember 2025",
          Signature_Image: sampleSignature,
          Signatory_Name: "En. Ahmad Kamal",
          Signatory_Position: "Pengetua Sekolah",
          Signed_Date: "25/12/2025",
          QR_Code: "https://des.mysertifico.com/verify.html?id=graduasi-2025-900101105555"
        }
      },
      {
        id: 'cert-002',
        name: "Anugerah Pelajar Cemerlang SPM 2025",
        issuedDate: "15/03/2026",
        status: "Published",
        template_code: 'CLLL-RED-004',
        image: mlgold002, 
        data: {
          Organization_Name: "SMK Puchong Perdana",
          Address_row1: "Jalan Perdana 2/1, Taman Puchong Perdana",
          Address_row2: "47100 Puchong, Selangor",
          Certificate_Title: "ANUGERAH CEMERLANG",
          Certificate_Body: "Dianugerahkan kepada",
          Recipient_Name: "Siti Nurhaliza binti Tarudin",
          Event_Description: "di atas pencapaian cemerlang 9A+ dalam Sijil Pelajaran Malaysia 2025.",
          Event_Date: "15 Mac 2026",
          Signature_Image: sampleSignature,
          Signatory_Name: "En. Ahmad Kamal",
          Signatory_Position: "Pengetua Sekolah",
          Signed_Date: "15/03/2026",
          QR_Code: "https://des.mysertifico.com/verify.html?id=spm-2025-900101105555"
        }
      }
    ]
  },
  "051120081234": {
    name: "Lee Chong Wei",
    certificates: [
      {
        id: 'cert-003',
        name: "Sijil Kehadiran Penuh 2024",
        issuedDate: "10/12/2024",
        status: "Published",
        template_code: 'CPBLK-003',
        image: cpblk003, 
        data: {
          Organization_Name: "SMK Puchong Perdana",
          Address_row1: "Jalan Perdana 2/1, Taman Puchong Perdana",
          Address_row2: "47100 Puchong, Selangor",
          Certificate_Title: "SIJIL KEHADIRAN PENUH",
          Certificate_Body: "Dengan sukacitanya dimaklumkan bahawa",
          Recipient_Name: "Lee Chong Wei",
          Event_Description: "telah mencapai kehadiran 100% bagi sesi persekolahan tahun 2024.",
          Event_Date: "10 Disember 2024",
          Signature_Image: sampleSignature,
          Signatory_Name: "En. Ahmad Kamal",
          Signatory_Position: "Pengetua Sekolah",
          Signed_Date: "10/12/2024",
          QR_Code: "https://des.mysertifico.com/verify.html?id=penuh-2024-051120081234"
        }
      }
    ]
  }
};


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
 


export const elementsByTemplate = {
// portrait
  "CPBLK-003": {
    base_w: 842,   
    base_h: 1191,
    elements: [
      // Header 
      { element_id: "Organization_Name", type: "text", position_x: 120,  position_y: 230, font_family: "Montserrat", font_size: 18, font_weight: "600", color: "#0f172a", alignment: "left" },
      { element_id: "Address_row1",      type: "text", position_x: 120,  position_y: 255, font_family: "Montserrat", font_size: 14, font_weight: "400", color: "#334155", alignment: "left" },
      { element_id: "Address_row2",      type: "text", position_x: 120,  position_y: 280, font_family: "Montserrat", font_size: 14, font_weight: "400", color: "#334155", alignment: "left" },

      // Title 
      { element_id: "Certificate_Title", type: "text", position_x: 325, position_y: 370, font_family: "EB Garamond", font_size: 36, font_weight: "700", color: "#b6822a", alignment: "center" },

      // Body block 
      { element_id: "Certificate_Body",  type: "text", position_x: 120,  position_y: 450, font_family: "Montserrat", font_size: 14, font_weight: "400", color: "#475569", alignment: "left" },
      { element_id: "Recipient_Name",    type: "text", position_x: 120,  position_y: 490, font_family: "Montserrat", font_size: 18, font_weight: "700", color: "#0f172a", alignment: "left" },
      { element_id: "Event_Description", type: "text", position_x: 120,  position_y: 520, font_family: "Montserrat", font_size: 14, font_weight: "400", color: "#475569", alignment: "left" },
      { element_id: "Event_Date",        type: "text", position_x: 120,  position_y: 545, font_family: "Montserrat", font_size: 14, font_weight: "700", color: "#0f172a", alignment: "left" },

      // Signature + QR 
      { element_id: "Signature_Image",   type: "image", position_x: 175,  position_y: 730, width: 250, height: 70 },
      { element_id: "Signatory_Name",    type: "text",  position_x: 120,  position_y: 805, font_family: "Montserrat", font_size: 14, font_weight: "600", color: "#0f172a", alignment: "left" },
      { element_id: "Signatory_Position",type: "text",  position_x: 120,  position_y: 830, font_family: "Montserrat", font_size: 12, font_weight: "400", color: "#475569", alignment: "left" },
      { element_id: "Signed_Date",       type: "text",  position_x: 120,  position_y: 870, font_family: "Montserrat", font_size: 12, font_weight: "400", color: "#64748b", alignment: "left" },
      { element_id: "QR_Code",           type: "qrcode",position_x: 600, position_y: 790, width: 120, height: 120 }
    ]
  },
// landscape
  "CLLL-RED-004": {
    base_w: 1191,  // A4 landscape baseline
    base_h: 842,
    elements: [
      // Header 
      { element_id: "Organization_Name",  type: "text", position_x: 180, position_y: 220, font_family: "Montserrat", font_size: 18, font_weight: "600", color: "#0f172a", alignment: "left" },
      { element_id: "Address_row1",       type: "text", position_x: 180, position_y: 248, font_family: "Montserrat", font_size: 14, font_weight: "400", color: "#334155", alignment: "left" },
      { element_id: "Address_row2",       type: "text", position_x: 180, position_y: 270, font_family: "Montserrat", font_size: 14, font_weight: "400", color: "#334155", alignment: "left" },

      // Title
      { element_id: "Certificate_Title",  type: "text", position_x: 405, position_y: 330, font_family: "EB Garamond", font_size: 36, font_weight: "700", color: "#b6822a", alignment: "center" },

      // Body block 
      { element_id: "Certificate_Body",   type: "text", position_x: 180, position_y: 400, font_family: "Montserrat", font_size: 14, font_weight: "400", color: "#475569", alignment: "left" },
      { element_id: "Recipient_Name",     type: "text", position_x: 180, position_y: 435, font_family: "Montserrat", font_size: 18, font_weight: "700", color: "#0f172a", alignment: "left" },
      { element_id: "Event_Description",  type: "text", position_x: 180, position_y: 465, font_family: "Montserrat", font_size: 14, font_weight: "400", color: "#475569", alignment: "left" },
      { element_id: "Event_Date",         type: "text", position_x: 180, position_y: 490, font_family: "Montserrat", font_size: 14, font_weight: "700", color: "#0f172a", alignment: "left" },

      // Signature + QR
      { element_id: "Signature_Image",    type: "image", position_x: 230, position_y: 580, width: 250, height: 65 },
      { element_id: "Signatory_Name",     type: "text",  position_x: 180, position_y: 640, font_family: "Montserrat", font_size: 14, font_weight: "600", color: "#0f172a", alignment: "left" },
      { element_id: "Signatory_Position", type: "text",  position_x: 180, position_y: 660, font_family: "Montserrat", font_size: 12, font_weight: "400", color: "#475569", alignment: "left" },
      { element_id: "Signed_Date",        type: "text",  position_x: 180, position_y: 700, font_family: "Montserrat", font_size: 12, font_weight: "400", color: "#64748b", alignment: "left" },
      { element_id: "QR_Code",            type: "qrcode",position_x: 940, position_y: 590, width: 140, height: 140 }
    ]
  },
};