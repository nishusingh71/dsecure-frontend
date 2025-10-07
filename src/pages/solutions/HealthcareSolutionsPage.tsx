import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  CheckIcon, 
  HeartIcon, 
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  ArrowRightIcon,
  HoverIcon,
  BriefcaseIcon
} from '@/components/FlatIcons'

export default function HealthcareSolutionsPage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/solutions/healthcare" />
        <title>
          Healthcare Data Security Solutions | HIPAA Compliant Data Erasure
        </title>
        <meta
          name="description"
          content="HIPAA compliant data security solutions for healthcare organizations. Secure patient data protection and medical device sanitization with audit trails."
        />
        <meta
          name="keywords"
          content="healthcare data security, HIPAA compliance, patient data protection, medical device erasure, healthcare IT security, PHI protection"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <HealthcareSolutionsContent />
    </>
  );
}

function HealthcareSolutionsContent() {
  const healthcareSolutions = [
    {
      title: 'Medical Device Sanitization',
      description: 'Secure erasure for medical devices, workstations, and diagnostic equipment',
      icon: <GearIcon className="w-6 h-6" filled={true} />,
      features: [
        'FDA-approved device compatibility',
        'Medical equipment-specific protocols',
        'Diagnostic system data removal',
        'DICOM image sanitization'
      ]
    },
    {
      title: 'Patient Data Protection',
      description: 'Comprehensive PHI and patient record sanitization across all systems',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />,
      features: [
        'PHI identification and classification',
        'EHR system integration',
        'Database sanitization',
        'Backup system erasure'
      ]
    },
    {
      title: 'Healthcare Network Security',
      description: 'End-to-end network security for hospital and clinic environments',
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />,
      features: [
        'Hospital network sanitization',
        'Clinic management system erasure',
        'Telemedicine platform security',
        'IoT medical device protection'
      ]
    }
  ]

  const hipaaCompliance = [
    {
      requirement: 'Administrative Safeguards',
      description: 'Policies and procedures for data access and workforce training',
      dsecureFeatures: [
        'Role-based access controls',
        'Audit trail generation',
        'Staff training documentation',
        'Policy template library'
      ]
    },
    {
      requirement: 'Physical Safeguards',
      description: 'Physical access controls and workstation security',
      dsecureFeatures: [
        'Workstation sanitization',
        'Media disposal protocols',
        'Physical audit trails',
        'Device inventory tracking'
      ]
    },
    {
      requirement: 'Technical Safeguards',
      description: 'Technical controls for PHI access and transmission',
      dsecureFeatures: [
        'Encryption verification',
        'Access control validation',
        'Audit log analysis',
        'Integrity monitoring'
      ]
    }
  ]

  const medicalDeviceTypes = [
    { category: 'Diagnostic Equipment', devices: ['MRI workstations', 'CT scan computers', 'X-ray systems', 'Ultrasound devices'] },
    { category: 'Patient Monitoring', devices: ['Bedside monitors', 'Telemetry systems', 'ICU equipment', 'Ventilator controls'] },
    { category: 'Administrative Systems', devices: ['Nurse stations', 'Pharmacy systems', 'Laboratory computers', 'EHR workstations'] },
    { category: 'Mobile Devices', devices: ['Medical tablets', 'Nursing smartphones', 'Portable diagnostic tools', 'Handheld scanners'] }
  ]

  const complianceStandards = [
    { name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act', focus: 'Patient data privacy and security' },
    { name: 'HITECH', description: 'Health Information Technology for Economic and Clinical Health', focus: 'Electronic health record security' },
    { name: 'FDA 21 CFR Part 11', description: 'Electronic records and signatures in healthcare', focus: 'Data integrity and authenticity' },
    { name: 'ISO 27799', description: 'Health informatics security management', focus: 'Healthcare-specific security controls' }
  ]

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 w-full overflow-hidden">
      {/* Hero Section */}
      <section>
        <div className="container-responsive py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl text-white mb-6">
                    <HeartIcon className="w-8 h-8" filled={true} />
                  </div>
                </Reveal>
                <Reveal delayMs={10}>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    Healthcare Data Security Solutions
                  </h1>
                </Reveal>
                <Reveal delayMs={20}>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    HIPAA compliant data security solutions designed specifically for healthcare organizations. 
                    Protect patient data with comprehensive sanitization for medical devices, EHR systems, 
                    and healthcare infrastructure.
                  </p>
                </Reveal>
                <Reveal delayMs={30}>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Link to="/contact" className="btn-primary">
                      Get Healthcare Demo
                    </Link>
                    <Link to="/pricing" className="btn-secondary">
                      View Healthcare Pricing
                    </Link>
                  </div>
                </Reveal>
              </div>
              
              <div>
                <Reveal delayMs={40}>
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Healthcare Compliance</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">HIPAA Security Rule compliance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">PHI sanitization protocols</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Medical device compatibility</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Audit trail documentation</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Solutions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Specialized Healthcare Solutions
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Purpose-built solutions for healthcare environments requiring the highest levels of data protection.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {healthcareSolutions.map((solution, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                      {solution.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{solution.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-6">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HIPAA Compliance */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                HIPAA Security Rule Compliance
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our solutions address all three categories of HIPAA Security Rule safeguards.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hipaaCompliance.map((safeguard, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-full">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{safeguard.requirement}</h3>
                  <p className="text-slate-600 mb-4">{safeguard.description}</p>
                  <h4 className="font-semibold text-slate-900 mb-2">DSecure Features:</h4>
                  <ul className="space-y-2">
                    {safeguard.dsecureFeatures.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Device Types */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Supported Medical Device Categories
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive support for all types of medical and healthcare IT equipment.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {medicalDeviceTypes.map((category, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{category.category}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {category.devices.map((device, deviceIndex) => (
                      <div key={deviceIndex} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" filled={true} />
                        <span className="text-sm text-slate-700">{device}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Healthcare Compliance Standards
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Meet all major healthcare industry compliance and regulatory requirements.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceStandards.map((standard, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600 font-bold flex-shrink-0">
                      {standard.name.split(' ')[0].substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{standard.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">{standard.description}</p>
                      <p className="text-sm text-slate-700 font-medium">Focus: {standard.focus}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Protect Your Patients' Data Today
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Ensure HIPAA compliance and protect sensitive patient information with our 
                specialized healthcare data security solutions.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Get Healthcare Consultation
                </Link>
                <Link to="/solutions" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View All Solutions
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
