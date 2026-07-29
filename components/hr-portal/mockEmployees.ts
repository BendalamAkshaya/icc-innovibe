import { EmployeeRecord } from './EmployeeRecordsSystem';

export const initialEmployees: EmployeeRecord[] = [
  {
    id: 'emp_01',
    name: 'Kiran Gopi',
    role: 'Senior EV Diagnostics Engineer',
    department: 'Engineering',
    location: 'Kakinada Main Hub',
    joiningDate: '2023-01-12',
    employmentStatus: 'Active',
    manager: 'Ananya Sharma (CTO)',
    profileCompletion: 92,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    personalInfo: {
      dob: '1995-05-14',
      gender: 'Male',
      bloodGroup: 'A+',
      nationality: 'Indian',
      maritalStatus: 'Married',
      marriageDate: '2021-02-14',
      personalEmail: 'kiran.gopi.personal@gmail.com',
      officialEmail: 'kiran.g@innovibemobility.com',
      mobile: '+91 91234 56789',
      alternateNumber: '+91 98765 43219',
      currentAddress: 'Flat 402, Sai Enclave, Kakinada, AP - 533001',
      permanentAddress: 'Door No. 4-22-1, Main Road, Kakinada, AP - 533001',
      aadhaar: '4567 8901 2345',
      pan: 'ABCDE1234F',
      passport: 'Z1234567',
      drivingLicense: 'AP05 2015 1234567',
      voterId: 'AP/05/123/456789',
      pfNumber: 'AP/KKD/1234567/000/0001',
      esicNumber: '51-00-123456-000-0001',
      uanNumber: '100123456789'
    },
    familyInfo: {
      father: { name: 'Gopi Krishna', dob: '1968-08-12', occupation: 'Retired Teacher', phone: '+91 91234 56780', email: 'gopi.krishna@gmail.com', address: 'Door No. 4-22-1, Main Road, Kakinada, AP' },
      mother: { name: 'Saraswathi Gopi', dob: '1972-04-10', occupation: 'Homemaker', phone: '+91 91234 56781' },
      spouse: { name: 'Rama Devi', dob: '1997-11-20', marriageDate: '2021-02-14', occupation: 'Software Engineer', phone: '+91 98765 12345' },
      siblings: [
        { name: 'Ravi Gopi', dob: '1999-09-18', occupation: 'Student', phone: '+91 98888 77777' }
      ],
      children: [
        { name: 'Aarav Gopi', dob: '2023-06-15', gender: 'Male', school: 'Kidzee Kakinada', bloodGroup: 'A+' }
      ]
    },
    education: {
      ssc: { degree: 'SSC', institution: 'ZP High School', boardUniversity: 'State Board AP', passingYear: '2010', percentageCgpa: '8.8 GPA', certificateName: 'SSC_Memo.pdf' },
      intermediate: { degree: 'Intermediate', institution: 'Aditya Junior College', boardUniversity: 'Board of Intermediate AP', passingYear: '2012', percentageCgpa: '92%', certificateName: 'Inter_Memo.pdf' },
      ug: { degree: 'B.Tech (Automobile)', institution: 'JNTU Kakinada', boardUniversity: 'JNTUK', passingYear: '2016', percentageCgpa: '7.8 CGPA', certificateName: 'Degree_Certificate.pdf' },
      certifications: [
        { degree: 'EV Diagnostics Expert', institution: 'Automotive Skill Development Council', boardUniversity: 'ASDC', passingYear: '2019', percentageCgpa: 'A Grade', certificateName: 'ASDC_EV_Diag.pdf' }
      ]
    },
    previousEmployment: [
      {
        companyName: 'Ather Energy',
        employeeId: 'ATH-2049',
        designation: 'Diagnostics Engineer',
        department: 'Service Engineering',
        manager: 'Harish Kumar',
        joiningDate: '2019-12-01',
        relievingDate: '2022-12-31',
        experience: '3 Years 1 Month',
        salary: '₹6.5 LPA',
        reasonForLeaving: 'Career Growth and Relocation to hometown Kakinada',
        documents: {
          offerLetter: 'Ather_Offer_Letter.pdf',
          experienceLetter: 'Ather_Exp_Letter.pdf',
          relievingLetter: 'Ather_Relieving_Letter.pdf'
        }
      }
    ],
    documents: [
      { id: 'doc_1', name: 'Aadhaar_Card_Kiran.pdf', category: 'Identity Verification', uploadDate: '2023-01-12', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2023-01-13', status: 'Verified', fileSize: '1.2 MB' },
      { id: 'doc_2', name: 'PAN_Card_Kiran.pdf', category: 'Identity Verification', uploadDate: '2023-01-12', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2023-01-13', status: 'Verified', fileSize: '850 KB' },
      { id: 'doc_3', name: 'Degree_Certificate_Kiran.pdf', category: 'Education Documents', uploadDate: '2023-01-12', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2023-01-14', status: 'Verified', fileSize: '2.4 MB' },
      { id: 'doc_4', name: 'Signed_NDA_Kiran.pdf', category: 'NDA & Confidentiality', uploadDate: '2023-01-15', uploadedBy: 'Kiran Gopi', verifiedBy: 'Pooja Reddy', verificationDate: '2023-01-16', status: 'Verified', fileSize: '4.1 MB' },
      { id: 'doc_5', name: 'Form16_FY2025.pdf', category: 'Tax Documents', uploadDate: '2025-05-20', uploadedBy: 'Kiran Gopi', status: 'Pending Verification', fileSize: '3.1 MB' },
      { id: 'doc_6', name: 'Cancelled_Cheque_Kiran.pdf', category: 'Banking Documents', uploadDate: '2023-01-12', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2023-01-13', status: 'Verified', fileSize: '980 KB' },
      { id: 'doc_7', name: 'Insurance_Card_Kiran.pdf', category: 'Medical & Insurance', uploadDate: '2024-02-01', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '1.5 MB' }
    ],
    payroll: {
      currentSalary: '₹75,000 / Month',
      ctc: '₹9.0 LPA',
      previousSalary: '₹60,000 / Month',
      salaryHistory: [
        { date: '2025-04-01', amount: '₹75,000', type: 'Increment' },
        { date: '2024-04-01', amount: '₹68,000', type: 'Increment' },
        { date: '2023-01-12', amount: '₹60,000', type: 'Joining' }
      ],
      incrementHistory: [
        { date: '2025-04-01', percentage: '10.3%', oldSalary: '₹68,000', newSalary: '₹75,000' },
        { date: '2024-04-01', percentage: '13.3%', oldSalary: '₹60,000', newSalary: '₹68,000' }
      ],
      bonusHistory: [
        { date: '2025-10-25', amount: '₹15,000', type: 'Diwali Performance Bonus' },
        { date: '2024-10-15', amount: '₹10,000', type: 'Festival Bonus' }
      ]
    },
    references: [
      { name: 'Dr. C. V. Raman', company: 'JNTU Kakinada', designation: 'Professor & HOD', phone: '+91 94401 23456', email: 'cvraman@jntuk.edu.in', relationship: 'Academic Advisor / B.Tech Guide', referenceNumber: 'REF_094' }
    ],
    bankDetails: {
      accountHolder: 'Kiran Gopi',
      bankName: 'HDFC Bank',
      branch: 'Kakinada Main Branch',
      accountNumber: '50100234567890',
      ifsc: 'HDFC0000123',
      upi: 'kirangopi@okhdfc',
      cancelledChequeName: 'Cancelled_Cheque_Kiran.pdf'
    },
    medicalDetails: {
      bloodGroup: 'A+',
      allergies: 'Dust, Peanuts',
      medicalConditions: 'Mild Hypertension',
      insuranceProvider: 'Star Health & Allied Insurance',
      insuranceNumber: 'SH-2026-90483',
      policyUrl: '#',
      nomineeName: 'Rama Devi (Spouse)'
    },
    emergencyContacts: {
      primary: { name: 'Rama Devi', relation: 'Spouse', phone: '+91 98765 12345', address: 'Flat 402, Sai Enclave, Kakinada, AP - 533001' },
      secondary: { name: 'Saraswathi Gopi', relation: 'Mother', phone: '+91 91234 56781', address: 'Door No. 4-22-1, Main Road, Kakinada, AP - 533001' }
    },
    timeline: [
      { date: '2023-01-12', event: 'Joined InnoVibe', details: 'Inducted as EV Diagnostics Specialist by Meera Deshmukh.', type: 'status' },
      { date: '2023-01-12', event: 'Uploaded Aadhaar & PAN Card', details: 'Added to document repository during onboarding.', type: 'upload' },
      { date: '2023-01-13', event: 'Identity Documents Verified', details: 'Verified by Pooja Reddy.', type: 'verify' },
      { date: '2025-04-01', event: 'Annual CTC Increment Processed', details: 'Promoted to Senior EV Diagnostics Engineer with 10.3% raise.', type: 'status' }
    ],
    hrNotes: {
      internalNotes: 'Consistent high performer. Crucial for Kakinada Hub operations. Handles telemetry debugging and alerts.',
      performanceNotes: 'Rated 4.8/5 in annual appraisal. Highly technical and dependable.',
      warnings: 'No warning logs.',
      promotionRecommendations: 'Recommended for Team Lead diagnostics position in the upcoming cycle.',
      salaryDiscussion: 'Negotiated hike. Satisfied with current package and regional bonus payouts.',
      confidentialRemarks: 'Strong candidate for leadership expansion in Vijayawada Center.'
    }
  },
  {
    id: 'emp_02',
    name: 'Srinivas Rao',
    role: 'Senior EV Field Technician',
    department: 'Operations',
    location: 'Kakinada Main Hub',
    joiningDate: '2022-06-01',
    employmentStatus: 'Active',
    manager: 'Vikram Singh (Service Manager)',
    profileCompletion: 85,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    personalInfo: {
      dob: '1992-09-22',
      gender: 'Male',
      bloodGroup: 'O+',
      nationality: 'Indian',
      maritalStatus: 'Married',
      marriageDate: '2018-05-18',
      personalEmail: 'srinivas.rao92@gmail.com',
      officialEmail: 'srinivas.r@innovibemobility.com',
      mobile: '+91 98111 22334',
      alternateNumber: '+91 98111 22335',
      currentAddress: '3-102, Ramaraopeta, Kakinada, AP - 533003',
      permanentAddress: '3-102, Ramaraopeta, Kakinada, AP - 533003',
      aadhaar: '9876 5432 1098',
      pan: 'FGHJK5678L',
      passport: 'X9876543',
      drivingLicense: 'AP05 2012 9876543',
      voterId: 'AP/05/124/987654',
      pfNumber: 'AP/KKD/1234567/000/0002',
      esicNumber: '51-00-123456-000-0002',
      uanNumber: '100987654321'
    },
    familyInfo: {
      father: { name: 'Venkateswara Rao', dob: '1962-02-15', occupation: 'Farmer', phone: '+91 98111 00001' },
      mother: { name: 'Laxmi Rao', dob: '1968-12-05', occupation: 'Homemaker', phone: '+91 98111 00002' },
      spouse: { name: 'Satyavathi Rao', dob: '1995-07-28', marriageDate: '2018-05-18', occupation: 'Teacher', phone: '+91 98111 22335' },
      siblings: [],
      children: [
        { name: 'Kavya Rao', dob: '2020-10-12', gender: 'Female', school: 'Aditya Public School', bloodGroup: 'O+' }
      ]
    },
    education: {
      ssc: { degree: 'SSC', institution: 'Govt High School Kakinada', boardUniversity: 'State Board AP', passingYear: '2008', percentageCgpa: '8.2 GPA', certificateName: 'SSC_Srinivas.pdf' },
      diploma: { degree: 'Diploma (Electrical)', institution: 'Andhra Polytechnic College', boardUniversity: 'SBTET AP', passingYear: '2011', percentageCgpa: '76%', certificateName: 'Diploma_Srinivas.pdf' },
      certifications: [
        { degree: 'Ather Master Certification', institution: 'Ather Academy Bangalore', boardUniversity: 'Ather Training', passingYear: '2021', percentageCgpa: 'Certified', certificateName: 'Ather_Master_Cert.pdf' }
      ]
    },
    previousEmployment: [
      {
        companyName: 'Hero MotoCorp Agency',
        employeeId: 'HM-1102',
        designation: 'Senior Mechanic',
        department: 'Service',
        manager: 'Nagesh Garu',
        joiningDate: '2016-04-01',
        relievingDate: '2022-05-15',
        experience: '6 Years 1 Month',
        salary: '₹3.5 LPA',
        reasonForLeaving: 'Upgrade to Electric Vehicle service segments',
        documents: {
          experienceLetter: 'Hero_Exp_Letter.pdf'
        }
      }
    ],
    documents: [
      { id: 'doc_8', name: 'Aadhaar_Srinivas.pdf', category: 'Identity Verification', uploadDate: '2022-06-01', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2022-06-02', status: 'Verified', fileSize: '1.1 MB' },
      { id: 'doc_9', name: 'PAN_Srinivas.pdf', category: 'Identity Verification', uploadDate: '2022-06-01', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '900 KB' },
      { id: 'doc_10', name: 'Ather_Certification.pdf', category: 'Education Documents', uploadDate: '2022-06-01', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '1.8 MB' },
      { id: 'doc_10_rejected', name: 'Form16_2024_Srinivas.pdf', category: 'Tax Documents', uploadDate: '2025-05-10', uploadedBy: 'Srinivas Rao', status: 'Rejected', remarks: 'Illegible scan, please re-upload clear copy.', fileSize: '2.2 MB' },
      { id: 'doc_10_bank', name: 'Cancelled_Cheque_Srinivas.pdf', category: 'Banking Documents', uploadDate: '2022-06-01', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2022-06-03', status: 'Verified', fileSize: '950 KB' },
      { id: 'doc_10_expired', name: 'Driving_License_Expired_Srinivas.pdf', category: 'Identity Verification', uploadDate: '2022-06-01', uploadedBy: 'Meera Deshmukh', status: 'Expired', expiryDate: '2026-01-15', remarks: 'Driving License has expired. Please upload renewed license.', fileSize: '1.5 MB' },
      { id: 'doc_10_missing', name: 'Employment_Agreement.pdf', category: 'Contracts & Legal', uploadDate: '2022-06-01', uploadedBy: 'System Auto-Request', status: 'Missing', remarks: 'Required document not yet uploaded by HR.', fileSize: '0 KB' }
    ],
    payroll: {
      currentSalary: '₹45,000 / Month',
      ctc: '₹5.4 LPA',
      salaryHistory: [
        { date: '2024-06-01', amount: '₹45,000', type: 'Increment' },
        { date: '2022-06-01', amount: '₹38,000', type: 'Joining' }
      ],
      incrementHistory: [
        { date: '2024-06-01', percentage: '18.4%', oldSalary: '₹38,000', newSalary: '₹45,000' }
      ],
      bonusHistory: []
    },
    references: [
      { name: 'Nagesh K', company: 'Hero MotoCorp Agency', designation: 'Service Manager', phone: '+91 99000 11223', email: 'nagesh.hm@gmail.com', relationship: 'Former Manager', referenceNumber: 'REF_102' }
    ],
    bankDetails: {
      accountHolder: 'Srinivas Rao',
      bankName: 'State Bank of India',
      branch: 'Ramaraopeta Branch',
      accountNumber: '30495867493',
      ifsc: 'SBIN0003456',
      upi: 'srinivassbi@oksbi'
    },
    medicalDetails: {
      bloodGroup: 'O+',
      allergies: 'None',
      medicalConditions: 'None',
      insuranceProvider: 'Star Health',
      insuranceNumber: 'SH-2026-11204',
      nomineeName: 'Satyavathi Rao (Spouse)'
    },
    emergencyContacts: {
      primary: { name: 'Satyavathi Rao', relation: 'Spouse', phone: '+91 98111 22335', address: '3-102, Ramaraopeta, Kakinada, AP - 533003' },
      secondary: { name: 'Laxmi Rao', relation: 'Mother', phone: '+91 98111 00002', address: '3-102, Ramaraopeta, Kakinada, AP - 533003' }
    },
    timeline: [
      { date: '2022-06-01', event: 'Hired at InnoVibe', details: 'Joined as Senior EV Field Technician.', type: 'status' }
    ],
    hrNotes: {
      internalNotes: 'Excellent customer rating compliance. High ratings on WhatsApp CSAT loop.',
      performanceNotes: 'Reliable on-field technician. Awarded best CSAT in 2024.',
      warnings: 'None.',
      confidentialRemarks: 'High retention priority due to local technician shortage.',
      promotionRecommendations: 'None.',
      salaryDiscussion: 'Satisfied.'
    }
  },
  {
    id: 'emp_03',
    name: 'Meera Deshmukh',
    role: 'HR Talent Partner',
    department: 'Human Resources',
    location: 'Kakinada Main Hub',
    joiningDate: '2024-08-15',
    employmentStatus: 'Active',
    manager: 'Pooja Reddy (HR Head)',
    profileCompletion: 78,
    avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=150',
    personalInfo: {
      dob: '1998-07-15',
      gender: 'Female',
      bloodGroup: 'B+',
      nationality: 'Indian',
      maritalStatus: 'Single',
      personalEmail: 'meera.desh98@gmail.com',
      officialEmail: 'meera.d@innovibemobility.com',
      mobile: '+91 88776 65544',
      alternateNumber: '+91 88776 65540',
      currentAddress: 'Flat 501, Dwaraka Residency, Kakinada, AP - 533002',
      permanentAddress: 'Door No. 12-4-2, Shivaji Nagar, Nagpur, MH - 440010',
      aadhaar: '3210 9876 5432',
      pan: 'JKLMN1234P',
      passport: 'Y9876123',
      drivingLicense: 'MH31 2018 0001234',
      voterId: 'MH/31/110/123456',
      pfNumber: 'AP/KKD/1234567/000/0003',
      esicNumber: '51-00-123456-000-0003',
      uanNumber: '100887766554'
    },
    familyInfo: {
      father: { name: 'Dilip Deshmukh', dob: '1965-03-24', occupation: 'Bank Manager', phone: '+91 88776 65540' },
      mother: { name: 'Anjali Deshmukh', dob: '1970-11-12', occupation: 'Teacher', phone: '+91 88776 65541' },
      siblings: [
        { name: 'Sameer Deshmukh', dob: '2001-05-18', occupation: 'MBA Student', phone: '+91 99999 88888' }
      ],
      children: []
    },
    education: {
      ssc: { degree: 'SSC', institution: "St. John's Nagpur", boardUniversity: 'CBSE', passingYear: '2014', percentageCgpa: '9.4 CGPA', certificateName: 'SSC_Meera.pdf' },
      intermediate: { degree: 'Intermediate', institution: 'Nagpur Junior College', boardUniversity: 'State Board MH', passingYear: '2016', percentageCgpa: '88%', certificateName: 'Inter_Meera.pdf' },
      ug: { degree: 'BBA (HR)', institution: 'Symbiosis Pune', boardUniversity: 'Symbiosis International', passingYear: '2019', percentageCgpa: '3.4/4 CGPA', certificateName: 'BBA_Meera.pdf' },
      pg: { degree: 'MBA (HR)', institution: 'NMIMS Mumbai', boardUniversity: 'NMIMS', passingYear: '2021', percentageCgpa: '7.4 CGPA', certificateName: 'MBA_Meera_Cert.pdf' },
      certifications: []
    },
    previousEmployment: [
      {
        companyName: 'Tech Mahindra',
        employeeId: 'TM-90833',
        designation: 'HR Executive',
        department: 'Talent Acquisition',
        manager: 'Sunita Joshi',
        joiningDate: '2021-06-01',
        relievingDate: '2024-07-31',
        experience: '3 Years 2 Months',
        salary: '₹4.8 LPA',
        reasonForLeaving: 'FTE recruiting shift to core mobility startup',
        documents: {
          offerLetter: 'TM_Offer.pdf',
          experienceLetter: 'TM_Exp.pdf',
          relievingLetter: 'TM_Relieving.pdf'
        }
      }
    ],
    documents: [
      { id: 'doc_11', name: 'Aadhaar_Meera.pdf', category: 'Identity Verification', uploadDate: '2024-08-15', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2024-08-16', status: 'Verified', fileSize: '1.3 MB' },
      { id: 'doc_12', name: 'PAN_Meera.pdf', category: 'Identity Verification', uploadDate: '2024-08-15', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '1.0 MB' },
      { id: 'doc_13', name: 'MBA_Degree_Meera.pdf', category: 'Education Documents', uploadDate: '2024-08-15', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '2.8 MB' },
      { id: 'doc_13_pending', name: 'Form16_FY2025_Meera.pdf', category: 'Tax Documents', uploadDate: '2025-05-20', uploadedBy: 'Meera Deshmukh', status: 'Pending Verification', fileSize: '1.9 MB' },
      { id: 'doc_13_bank', name: 'Cancelled_Cheque_Meera.pdf', category: 'Banking Documents', uploadDate: '2024-08-15', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2024-08-17', status: 'Verified', fileSize: '1.1 MB' },
      { id: 'doc_13_rejected', name: 'Passport_Meera.pdf', category: 'Identity Verification', uploadDate: '2024-08-15', uploadedBy: 'Meera Deshmukh', status: 'Rejected', remarks: 'Corner of photo page is cut off in scan.', fileSize: '3.4 MB' }
    ],
    payroll: {
      currentSalary: '₹48,000 / Month',
      ctc: '₹5.8 LPA',
      salaryHistory: [
        { date: '2024-08-15', amount: '₹48,000', type: 'Joining' }
      ],
      incrementHistory: [],
      bonusHistory: []
    },
    references: [
      { name: 'Sunita Joshi', company: 'Tech Mahindra', designation: 'HR Lead', phone: '+91 98222 33445', email: 'sunita.j@techm.com', relationship: 'Former Manager', referenceNumber: 'REF_99' }
    ],
    bankDetails: {
      accountHolder: 'Meera Deshmukh',
      bankName: 'ICICI Bank',
      branch: 'Kakinada Nagar Branch',
      accountNumber: '001201948576',
      ifsc: 'ICIC0000012',
      upi: 'meeradesh@okicici'
    },
    medicalDetails: {
      bloodGroup: 'B+',
      allergies: 'Gluten',
      medicalConditions: 'None',
      insuranceProvider: 'Star Health',
      insuranceNumber: 'SH-2026-99042',
      nomineeName: 'Dilip Deshmukh (Father)'
    },
    emergencyContacts: {
      primary: { name: 'Dilip Deshmukh', relation: 'Father', phone: '+91 88776 65540', address: 'Door No. 12-4-2, Shivaji Nagar, Nagpur, MH - 440010' },
      secondary: { name: 'Sameer Deshmukh', relation: 'Brother', phone: '+91 99999 88888', address: 'Door No. 12-4-2, Shivaji Nagar, Nagpur, MH - 440010' }
    },
    timeline: [
      { date: '2024-08-15', event: 'Joined InnoVibe', details: 'Joined Kakinada office as HR Talent Partner.', type: 'status' }
    ],
    hrNotes: {
      internalNotes: 'Manages candidate sourcing pipeline effectively. Excellent communication skills.',
      performanceNotes: 'Fast onboarding cycle manager.',
      warnings: 'None.',
      confidentialRemarks: 'Strong cultural fit. Handles employee relationship tasks smoothly.',
      promotionRecommendations: 'None.',
      salaryDiscussion: 'Standard package.'
    }
  },
  {
    id: 'emp_04',
    name: 'Amit Patel',
    role: 'Telematics Intern',
    department: 'Technology',
    location: 'Kakinada Main Hub',
    joiningDate: '2026-06-01',
    employmentStatus: 'Active',
    manager: 'Ananya Sharma (CTO)',
    profileCompletion: 68,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    personalInfo: {
      dob: '2004-03-12',
      gender: 'Male',
      bloodGroup: 'AB+',
      nationality: 'Indian',
      maritalStatus: 'Single',
      personalEmail: 'amit.patel04@gmail.com',
      officialEmail: 'amit.p@innovibemobility.com',
      mobile: '+91 76543 21098',
      alternateNumber: '+91 76543 21090',
      currentAddress: 'PG Hostel, Kakinada, AP - 533003',
      permanentAddress: '404, Dev Villa, Anand, Gujarat - 388001',
      aadhaar: '1234 5678 9012',
      pan: 'ABCDE5678G',
      passport: 'W5678901',
      drivingLicense: 'GJ23 2022 0005432',
      voterId: 'GJ/23/102/543210',
      pfNumber: 'N/A',
      esicNumber: 'N/A',
      uanNumber: 'N/A'
    },
    familyInfo: {
      father: { name: 'Harish Patel', dob: '1970-05-18', occupation: 'Business Owner', phone: '+91 76543 21090' },
      mother: { name: 'Daksha Patel', dob: '1975-09-12', occupation: 'Homemaker', phone: '+91 76543 21091' },
      siblings: [],
      children: []
    },
    education: {
      ssc: { degree: 'SSC', institution: 'Anand High School', boardUniversity: 'GSEB', passingYear: '2019', percentageCgpa: '9.2 CGPA', certificateName: 'SSC_Amit.pdf' },
      intermediate: { degree: 'Intermediate', institution: 'Anand Science College', boardUniversity: 'GSEB', passingYear: '2021', percentageCgpa: '89%', certificateName: 'Inter_Amit.pdf' },
      ug: { degree: 'B.Tech (IoT & Computer Eng)', institution: 'Dharmsinh Desai University', boardUniversity: 'DDU Nadiad', passingYear: '2025', percentageCgpa: '8.4 CGPA', certificateName: 'UG_Degree_Amit.pdf' },
      certifications: []
    },
    previousEmployment: [],
    documents: [
      { id: 'doc_14', name: 'Aadhaar_Amit.pdf', category: 'Identity Verification', uploadDate: '2026-06-01', uploadedBy: 'Meera Deshmukh', status: 'Pending Verification', fileSize: '1.2 MB' },
      { id: 'doc_15', name: 'PAN_Amit.pdf', category: 'Identity Verification', uploadDate: '2026-06-01', uploadedBy: 'Meera Deshmukh', status: 'Pending Verification', fileSize: '800 KB' },
      { id: 'doc_16', name: 'Internship_Agreement_Amit.pdf', category: 'Contracts & Legal', uploadDate: '2026-06-01', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '2.1 MB' },
      { id: 'doc_16_missing', name: 'Degree_or_Final_Sem_Marksheet.pdf', category: 'Education Documents', uploadDate: '2026-06-01', uploadedBy: 'System Auto-Request', status: 'Missing', remarks: 'Pending course completion certificate.', fileSize: '0 KB' },
      { id: 'doc_16_bank', name: 'Bank_Statement_Amit.pdf', category: 'Banking Documents', uploadDate: '2026-06-10', uploadedBy: 'Amit Patel', status: 'Pending Verification', fileSize: '1.4 MB' }
    ],
    payroll: {
      currentSalary: '₹17,000 / Month',
      ctc: '₹2.0 LPA Stipend',
      salaryHistory: [
        { date: '2026-06-01', amount: '₹17,000', type: 'Stipend' }
      ],
      incrementHistory: [],
      bonusHistory: []
    },
    references: [
      { name: 'Dr. J. D. Patel', company: 'DDU', designation: 'Professor', phone: '+91 94260 12345', email: 'jdpatel@ddu.ac.in', relationship: 'Academic Professor', referenceNumber: 'REF_88' }
    ],
    bankDetails: {
      accountHolder: 'Amit Patel',
      bankName: 'Bank of Baroda',
      branch: 'Kakinada Beach Road',
      accountNumber: '1234010000987',
      ifsc: 'BARB0KAKINA',
      upi: 'amitpatel@okbaroda'
    },
    medicalDetails: {
      bloodGroup: 'AB+',
      allergies: 'None',
      medicalConditions: 'None',
      insuranceProvider: 'Star Health (Corporate Group)',
      insuranceNumber: 'SH-2026-88043',
      nomineeName: 'Harish Patel (Father)'
    },
    emergencyContacts: {
      primary: { name: 'Harish Patel', relation: 'Father', phone: '+91 76543 21090', address: '404, Dev Villa, Anand, Gujarat - 388001' },
      secondary: { name: 'Daksha Patel', relation: 'Mother', phone: '+91 76543 21091', address: '404, Dev Villa, Anand, Gujarat - 388001' }
    },
    timeline: [
      { date: '2026-06-01', event: 'Internship Started', details: 'Assigned to IoT Gateway telemetry team under CTO.', type: 'status' }
    ],
    hrNotes: {
      internalNotes: 'Quick learner. Coding skills in Python and IoT gateway mapping are useful.',
      performanceNotes: 'Assigned OTA testing task. Rated 8/10 by team.',
      warnings: 'None.',
      confidentialRemarks: 'Performance will be evaluated for full-time conversion in August.',
      promotionRecommendations: 'None.',
      salaryDiscussion: 'Stipend fixed.'
    }
  },
  {
    id: 'emp_05',
    name: 'Suresh Kumar',
    role: 'EV Field Mechanic',
    department: 'Operations',
    location: 'Rajahmundry Center',
    joiningDate: '2025-02-10',
    employmentStatus: 'On Leave',
    manager: 'Vikram Singh (Service Manager)',
    profileCompletion: 80,
    avatar: 'https://images.unsplash.com/photo-1542343633-ce7a6826af14?auto=format&fit=crop&q=80&w=150',
    personalInfo: {
      dob: '1997-04-18',
      gender: 'Male',
      bloodGroup: 'O-',
      nationality: 'Indian',
      maritalStatus: 'Single',
      personalEmail: 'suresh.k97@gmail.com',
      officialEmail: 'suresh.k@innovibemobility.com',
      mobile: '+91 99887 76655',
      alternateNumber: '+91 99887 76650',
      currentAddress: '4-44, Lalacheruvu, Rajahmundry, AP - 533106',
      permanentAddress: '1-20, Ganti Road, Ravulapalem, AP - 533238',
      aadhaar: '7654 3210 9876',
      pan: 'MNBVC1234Q',
      passport: 'V1234987',
      drivingLicense: 'AP06 2017 0004321',
      voterId: 'AP/06/110/432109',
      pfNumber: 'AP/KKD/1234567/000/0005',
      esicNumber: '51-00-123456-000-0005',
      uanNumber: '100776655443'
    },
    familyInfo: {
      father: { name: 'Appa Rao', dob: '1963-04-10', occupation: 'Agriculture', phone: '+91 99887 00001' },
      mother: { name: 'Ganga Devi', dob: '1969-08-25', occupation: 'Homemaker', phone: '+91 99887 76650' },
      siblings: [
        { name: 'Durga Rao', dob: '1999-12-14', occupation: 'Technician', phone: '+91 99887 00003' }
      ],
      children: []
    },
    education: {
      ssc: { degree: 'SSC', institution: 'ZPH School Ravulapalem', boardUniversity: 'State Board AP', passingYear: '2013', percentageCgpa: '7.8 GPA', certificateName: 'SSC_Suresh.pdf' },
      diploma: { degree: 'Diploma (Electrical)', institution: 'Andhra Polytechnic College', boardUniversity: 'SBTET AP', passingYear: '2011', percentageCgpa: '76%', certificateName: 'Diploma_Suresh.pdf' },
      certifications: []
    },
    previousEmployment: [
      {
        companyName: 'Local TVS Auto Works',
        designation: 'Auto Mechanic',
        joiningDate: '2018-01-01',
        relievingDate: '2024-12-31',
        experience: '7 Years',
        salary: '₹2.2 LPA',
        reasonForLeaving: 'Upgrade to electric vehicle operations',
        documents: {}
      }
    ],
    documents: [
      { id: 'doc_17', name: 'Aadhaar_Suresh.pdf', category: 'Identity Verification', uploadDate: '2025-02-10', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '1.2 MB' },
      { id: 'doc_18', name: 'PAN_Suresh.pdf', category: 'Identity Verification', uploadDate: '2025-02-10', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '700 KB' },
      { id: 'doc_19', name: 'ITI_Certificate_Suresh.pdf', category: 'Education Documents', uploadDate: '2025-02-10', uploadedBy: 'Meera Deshmukh', status: 'Verified', fileSize: '2.1 MB' },
      { id: 'doc_19_expired', name: 'Medical_Fitness_Cert_2025.pdf', category: 'Medical & Insurance', uploadDate: '2025-02-10', uploadedBy: 'Meera Deshmukh', status: 'Expired', expiryDate: '2026-02-10', remarks: 'Annual medical check-up report has expired.', fileSize: '1.8 MB' },
      { id: 'doc_19_contract', name: 'Field_Operator_NDA.pdf', category: 'Contracts & Legal', uploadDate: '2025-02-10', uploadedBy: 'Meera Deshmukh', verifiedBy: 'Pooja Reddy', verificationDate: '2025-02-11', status: 'Verified', fileSize: '2.5 MB' },
      { id: 'doc_19_rejected', name: 'Passbook_First_Page_Suresh.pdf', category: 'Banking Documents', uploadDate: '2025-02-10', uploadedBy: 'Meera Deshmukh', status: 'Rejected', remarks: 'Account number is not clearly visible.', fileSize: '950 KB' }
    ],
    payroll: {
      currentSalary: '₹28,000 / Month',
      ctc: '₹3.4 LPA',
      salaryHistory: [
        { date: '2025-02-10', amount: '₹28,000', type: 'Joining' }
      ],
      incrementHistory: [],
      bonusHistory: []
    },
    references: [
      { name: 'V. Rambabu', company: 'TVS Auto Garage', designation: 'Owner', phone: '+91 99480 99887', email: 'rambabu.tvs@gmail.com', relationship: 'Former Employer', referenceNumber: 'REF_90' }
    ],
    bankDetails: {
      accountHolder: 'Suresh Kumar',
      bankName: 'Axis Bank',
      branch: 'Lalacheruvu Branch',
      accountNumber: '915010020304050',
      ifsc: 'UTIB0000045',
      upi: 'sureshkaxis@okaxis'
    },
    medicalDetails: {
      bloodGroup: 'O-',
      allergies: 'Pollen',
      medicalConditions: 'None',
      insuranceProvider: 'Star Health (Corporate Group)',
      insuranceNumber: 'SH-2026-90455',
      nomineeName: 'Ganga Devi (Mother)'
    },
    emergencyContacts: {
      primary: { name: 'Ganga Devi', relation: 'Mother', phone: '+91 99887 76650', address: '1-20, Ganti Road, Ravulapalem, AP - 533238' },
      secondary: { name: 'Durga Rao', relation: 'Brother', phone: '+91 99887 00003', address: '1-20, Ganti Road, Ravulapalem, AP - 533238' }
    },
    timeline: [
      { date: '2025-02-10', event: 'Joined InnoVibe', details: 'Joined Rajahmundry Service Hub as EV Field Mechanic.', type: 'status' }
    ],
    hrNotes: {
      internalNotes: 'Specializes in mechanical components, brakes calibration, suspension. Dependable physical mechanic.',
      performanceNotes: 'Reliable. Works closely under Vikram Singh.',
      warnings: 'None.',
      confidentialRemarks: 'Regular attendance but currently on medical leave due to dental surgery recovery.',
      promotionRecommendations: 'None.',
      salaryDiscussion: 'Stated requirement of hike in the next review.'
    }
  }
];
