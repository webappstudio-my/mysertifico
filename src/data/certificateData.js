// A simple array of certificate objects
export const certificates = [
    {
        id: 'cert002',
        title: 'AWS Certified Cloud Practitioner',
        category: 'technology',
        source: 'mysertifico',
        owner: 'parent',
        ownerName: 'Aliyah Zawaton binti Muhammad',
        issuer: 'Amazon Web Services',
        date: '22 Feb 2024',
        image: '/images/templates/mdpr-blue-003.svg',
    },
    {
        id: 'cert004',
        title: 'Project Management Professional',
        category: 'management',
        source: 'mysertifico',
        owner: 'parent',
        ownerName: 'Aliyah Zawaton binti Muhammad',
        issuer: 'PMI',
        date: '05 Nov 2023',
        image: '/images/templates/mdlc-blue-003.svg',
    },
    {
        id: 'cert001',
        title: 'Graduation Certificate 2025',
        category: 'academic',
        source: 'mysertifico',
        owner: 'ali',
        ownerName: 'Ali bin Ahmad',
        issuer: 'SMK Saujana Utama',
        date: '15 Jun 2024',
        image: '/images/templates/mdpc-gold-002.svg',
    },
    {
        id: 'cert-ali-02',
        title: 'Introduction to Python',
        category: 'technology',
        source: 'external',
        owner: 'ali',
        ownerName: 'Ali bin Ahmad',
        issuer: 'CodeAcademy',
        date: '20 May 2024',
        image: '/images/templates/mdpl-green-001.svg',
    },
    {
        id: 'cert-siti-01',
        title: 'Digital Art & Design',
        category: 'design',
        source: 'mysertifico',
        owner: 'siti',
        ownerName: 'Siti binti Ahmad',
        issuer: 'Creative School',
        date: '01 Jul 2024',
        image: '/images/templates/cllr-black-006.svg',
    },
];

// Options for filter dropdowns
export const personFilterOptions = [
    { value: 'all', label: 'All Certificates' },
    { value: 'parent', label: 'My Certificates' },
    { value: 'ali', label: 'Ali bin Ahmad' },
    { value: 'siti', label: 'Siti binti Ahmad' },
];

export const categoryFilterOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'academic', label: 'Academic' },
    { value: 'technology', label: 'Technology' },
    { value: 'management', label: 'Management' },
    { value: 'design', label: 'Design' },
    // Add other categories as needed
];