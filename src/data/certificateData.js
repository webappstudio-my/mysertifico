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

export const studentCertificates = [
    { id: 'cert001', title: 'Graduation Certificate 2025', issuer: 'SMK Saujana Utama', date: '15 Jun 2024', source: 'mysertifico', verified: true, image: '../../src/images/templates/mdlc-purple-003.svg' },
    { id: 'cert002', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '22 Feb 2024', source: 'mysertifico', verified: true, image: '../../src/images/templates/mdpl-green-001.svg' },
    { id: 'cert003', title: 'Certified Digital Marketer', issuer: 'Google', date: '10 Jan 2024', source: 'external', verified: false, image: '../../src/images/templates/mdpc-gold-002.svg' },
    { id: 'cert004', title: 'Project Management Professional', issuer: 'PMI', date: '05 Nov 2023', source: 'mysertifico', verified: true, image: '../../src/images/templates/cllr-black-006.svg' },
    { id: 'cert005', title: 'Advanced Python Programming', issuer: 'Coursera', date: '20 Sep 2023', source: 'external', verified: false, image: '../../src/images/templates/clpc-brown-023.svg' },
    { id: 'cert006', title: 'Leadership Training Workshop', issuer: 'Dale Carnegie', date: '15 Aug 2023', source: 'mysertifico', verified: true, image: '../../src/images/templates/mdlc-blue-003.svg' },
    { id: 'cert007', title: 'First Aid Certification', issuer: 'Red Crescent Society', date: '30 Jul 2023', source: 'external', verified: true, image: '../../src/images/templates/mdlc-black-006.svg' },
    { id: 'cert008', title: 'Scrum Master Certified', issuer: 'Scrum Alliance', date: '18 Jun 2023', source: 'mysertifico', verified: true, image: '../../src/images/templates/mdpc-red-005.svg' },
    { id: 'cert009', title: 'Data Science Bootcamp', issuer: 'General Assembly', date: '25 May 2023', source: 'external', verified: false, image: '../../src/images/templates/mdlc-gold-004.svg' },
];