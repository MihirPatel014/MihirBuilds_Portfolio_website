import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, ChevronDown, Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useWebHaptics } from 'web-haptics/react';

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const COUNTRY_DATA = [
  { name: "Afghanistan", code: "AF", phone: "93" },
  { name: "Aland Islands", code: "AX", phone: "358" },
  { name: "Albania", code: "AL", phone: "355" },
  { name: "Algeria", code: "DZ", phone: "213" },
  { name: "American Samoa", code: "AS", phone: "1684" },
  { name: "Andorra", code: "AD", phone: "376" },
  { name: "Angola", code: "AO", phone: "244" },
  { name: "Anguilla", code: "AI", phone: "1264" },
  { name: "Antarctica", code: "AQ", phone: "672" },
  { name: "Antigua and Barbuda", code: "AG", phone: "1268" },
  { name: "Argentina", code: "AR", phone: "54" },
  { name: "Armenia", code: "AM", phone: "374" },
  { name: "Aruba", code: "AW", phone: "297" },
  { name: "Australia", code: "AU", phone: "61" },
  { name: "Austria", code: "AT", phone: "43" },
  { name: "Azerbaijan", code: "AZ", phone: "994" },
  { name: "Bahamas", code: "BS", phone: "1242" },
  { name: "Bahrain", code: "BH", phone: "973" },
  { name: "Bangladesh", code: "BD", phone: "880" },
  { name: "Barbados", code: "BB", phone: "1246" },
  { name: "Belarus", code: "BY", phone: "375" },
  { name: "Belgium", code: "BE", phone: "32" },
  { name: "Belize", code: "BZ", phone: "501" },
  { name: "Benin", code: "BJ", phone: "229" },
  { name: "Bermuda", code: "BM", phone: "1441" },
  { name: "Bhutan", code: "BT", phone: "975" },
  { name: "Bolivia", code: "BO", phone: "591" },
  { name: "Bonaire, Sint Eustatius and Saba", code: "BQ", phone: "599" },
  { name: "Bosnia and Herzegovina", code: "BA", phone: "387" },
  { name: "Botswana", code: "BW", phone: "267" },
  { name: "Bouvet Island", code: "BV", phone: "55" },
  { name: "Brazil", code: "BR", phone: "55" },
  { name: "British Indian Ocean Territory", code: "IO", phone: "246" },
  { name: "Brunei Darussalam", code: "BN", phone: "673" },
  { name: "Bulgaria", code: "BG", phone: "359" },
  { name: "Burkina Faso", code: "BF", phone: "226" },
  { name: "Burundi", code: "BI", phone: "257" },
  { name: "Cambodia", code: "KH", phone: "855" },
  { name: "Cameroon", code: "CM", phone: "237" },
  { name: "Canada", code: "CA", phone: "1" },
  { name: "Cape Verde", code: "CV", phone: "238" },
  { name: "Cayman Islands", code: "KY", phone: "1345" },
  { name: "Central African Republic", code: "CF", phone: "236" },
  { name: "Chad", code: "TD", phone: "235" },
  { name: "Chile", code: "CL", phone: "56" },
  { name: "China", code: "CN", phone: "86" },
  { name: "Christmas Island", code: "CX", phone: "61" },
  { name: "Cocos (Keeling) Islands", code: "CC", phone: "672" },
  { name: "Colombia", code: "CO", phone: "57" },
  { name: "Comoros", code: "KM", phone: "269" },
  { name: "Congo", code: "CG", phone: "242" },
  { name: "Congo, Democratic Republic of the Congo", code: "CD", phone: "242" },
  { name: "Cook Islands", code: "CK", phone: "682" },
  { name: "Costa Rica", code: "CR", phone: "506" },
  { name: "Cote D'Ivoire", code: "CI", phone: "225" },
  { name: "Croatia", code: "HR", phone: "385" },
  { name: "Cuba", code: "CU", phone: "53" },
  { name: "Curacao", code: "CW", phone: "599" },
  { name: "Cyprus", code: "CY", phone: "357" },
  { name: "Czech Republic", code: "CZ", phone: "420" },
  { name: "Denmark", code: "DK", phone: "45" },
  { name: "Djibouti", code: "DJ", phone: "253" },
  { name: "Dominica", code: "DM", phone: "1767" },
  { name: "Dominican Republic", code: "DO", phone: "1809" },
  { name: "Ecuador", code: "EC", phone: "593" },
  { name: "Egypt", code: "EG", phone: "20" },
  { name: "El Salvador", code: "SV", phone: "503" },
  { name: "Equatorial Guinea", code: "GQ", phone: "240" },
  { name: "Eritrea", code: "ER", phone: "291" },
  { name: "Estonia", code: "EE", phone: "372" },
  { name: "Ethiopia", code: "ET", phone: "251" },
  { name: "Falkland Islands (Malvinas)", code: "FK", phone: "500" },
  { name: "Faroe Islands", code: "FO", phone: "298" },
  { name: "Fiji", code: "FJ", phone: "679" },
  { name: "Finland", code: "FI", phone: "358" },
  { name: "France", code: "FR", phone: "33" },
  { name: "French Guiana", code: "GF", phone: "594" },
  { name: "French Polynesia", code: "PF", phone: "689" },
  { name: "French Southern Territories", code: "TF", phone: "262" },
  { name: "Gabon", code: "GA", phone: "241" },
  { name: "Gambia", code: "GM", phone: "220" },
  { name: "Georgia", code: "GE", phone: "995" },
  { name: "Germany", code: "DE", phone: "49" },
  { name: "Ghana", code: "GH", phone: "233" },
  { name: "Gibraltar", code: "GI", phone: "350" },
  { name: "Greece", code: "GR", phone: "30" },
  { name: "Greenland", code: "GL", phone: "299" },
  { name: "Grenada", code: "GD", phone: "1473" },
  { name: "Guadeloupe", code: "GP", phone: "590" },
  { name: "Guam", code: "GU", phone: "1671" },
  { name: "Guatemala", code: "GT", phone: "502" },
  { name: "Guernsey", code: "GG", phone: "44" },
  { name: "Guinea", code: "GN", phone: "224" },
  { name: "Guinea-Bissau", code: "GW", phone: "245" },
  { name: "Guyana", code: "GY", phone: "592" },
  { name: "Haiti", code: "HT", phone: "509" },
  { name: "Heard Island and McDonald Islands", code: "HM", phone: "0" },
  { name: "Holy See (Vatican City State)", code: "VA", phone: "39" },
  { name: "Honduras", code: "HN", phone: "504" },
  { name: "Hong Kong", code: "HK", phone: "852" },
  { name: "Hungary", code: "HU", phone: "36" },
  { name: "Iceland", code: "IS", phone: "354" },
  { name: "India", code: "IN", phone: "91" },
  { name: "Indonesia", code: "ID", phone: "62" },
  { name: "Iran, Islamic Republic of", code: "IR", phone: "98" },
  { name: "Iraq", code: "IQ", phone: "964" },
  { name: "Ireland", code: "IE", phone: "353" },
  { name: "Isle of Man", code: "IM", phone: "44" },
  { name: "Israel", code: "IL", phone: "972" },
  { name: "Italy", code: "IT", phone: "39" },
  { name: "Jamaica", code: "JM", phone: "1876" },
  { name: "Japan", code: "JP", phone: "81" },
  { name: "Jersey", code: "JE", phone: "44" },
  { name: "Jordan", code: "JO", phone: "962" },
  { name: "Kazakhstan", code: "KZ", phone: "7" },
  { name: "Kenya", code: "KE", phone: "254" },
  { name: "Kiribati", code: "KI", phone: "686" },
  { name: "Korea, Democratic People's Republic of", code: "KP", phone: "850" },
  { name: "Korea, Republic of", code: "KR", phone: "82" },
  { name: "Kosovo", code: "XK", phone: "383" },
  { name: "Kuwait", code: "KW", phone: "965" },
  { name: "Kyrgyzstan", code: "KG", phone: "996" },
  { name: "Lao People's Democratic Republic", code: "LA", phone: "856" },
  { name: "Latvia", code: "LV", phone: "371" },
  { name: "Lebanon", code: "LB", phone: "961" },
  { name: "Lesotho", code: "LS", phone: "266" },
  { name: "Liberia", code: "LR", phone: "231" },
  { name: "Libyan Arab Jamahiriya", code: "LY", phone: "218" },
  { name: "Liechtenstein", code: "LI", phone: "423" },
  { name: "Lithuania", code: "LT", phone: "370" },
  { name: "Luxembourg", code: "LU", phone: "352" },
  { name: "Macao", code: "MO", phone: "853" },
  { name: "Macedonia, the Former Yugoslav Republic of", code: "MK", phone: "389" },
  { name: "Madagascar", code: "MG", phone: "261" },
  { name: "Malawi", code: "MW", phone: "265" },
  { name: "Malaysia", code: "MY", phone: "60" },
  { name: "Maldives", code: "MV", phone: "960" },
  { name: "Mali", code: "ML", phone: "223" },
  { name: "Malta", code: "MT", phone: "356" },
  { name: "Marshall Islands", code: "MH", phone: "692" },
  { name: "Martinique", code: "MQ", phone: "596" },
  { name: "Mauritania", code: "MR", phone: "222" },
  { name: "Mauritius", code: "MU", phone: "230" },
  { name: "Mayotte", code: "YT", phone: "262" },
  { name: "Mexico", code: "MX", phone: "52" },
  { name: "Micronesia, Federated States of", code: "FM", phone: "691" },
  { name: "Moldova, Republic of", code: "MD", phone: "373" },
  { name: "Monaco", code: "MC", phone: "377" },
  { name: "Mongolia", code: "MN", phone: "976" },
  { name: "Montenegro", code: "ME", phone: "382" },
  { name: "Montserrat", code: "MS", phone: "1664" },
  { name: "Morocco", code: "MA", phone: "212" },
  { name: "Mozambique", code: "MZ", phone: "258" },
  { name: "Myanmar", code: "MM", phone: "95" },
  { name: "Namibia", code: "NA", phone: "264" },
  { name: "Nauru", code: "NR", phone: "674" },
  { name: "Nepal", code: "NP", phone: "977" },
  { name: "Netherlands", code: "NL", phone: "31" },
  { name: "Netherlands Antilles", code: "AN", phone: "599" },
  { name: "New Caledonia", code: "NC", phone: "687" },
  { name: "New Zealand", code: "NZ", phone: "64" },
  { name: "Nicaragua", code: "NI", phone: "505" },
  { name: "Niger", code: "NE", phone: "227" },
  { name: "Nigeria", code: "NG", phone: "234" },
  { name: "Niue", code: "NU", phone: "683" },
  { name: "Norfolk Island", code: "NF", phone: "672" },
  { name: "Northern Mariana Islands", code: "MP", phone: "1670" },
  { name: "Norway", code: "NO", phone: "47" },
  { name: "Oman", code: "OM", phone: "968" },
  { name: "Pakistan", code: "PK", phone: "92" },
  { name: "Palau", code: "PW", phone: "680" },
  { name: "Palestinian Territory, Occupied", code: "PS", phone: "970" },
  { name: "Panama", code: "PA", phone: "507" },
  { name: "Papua New Guinea", code: "PG", phone: "675" },
  { name: "Paraguay", code: "PY", phone: "595" },
  { name: "Peru", code: "PE", phone: "51" },
  { name: "Philippines", code: "PH", phone: "63" },
  { name: "Pitcairn", code: "PN", phone: "64" },
  { name: "Poland", code: "PL", phone: "48" },
  { name: "Portugal", code: "PT", phone: "351" },
  { name: "Puerto Rico", code: "PR", phone: "1787" },
  { name: "Qatar", code: "QA", phone: "974" },
  { name: "Reunion", code: "RE", phone: "262" },
  { name: "Romania", code: "RO", phone: "40" },
  { name: "Russian Federation", code: "RU", phone: "7" },
  { name: "Rwanda", code: "RW", phone: "250" },
  { name: "Saint Barthelemy", code: "BL", phone: "590" },
  { name: "Saint Helena", code: "SH", phone: "290" },
  { name: "Saint Kitts and Nevis", code: "KN", phone: "1869" },
  { name: "Saint Lucia", code: "LC", phone: "1758" },
  { name: "Saint Martin", code: "MF", phone: "590" },
  { name: "Saint Pierre and Miquelon", code: "PM", phone: "508" },
  { name: "Saint Vincent and the Grenadines", code: "VC", phone: "1784" },
  { name: "Samoa", code: "WS", phone: "684" },
  { name: "San Marino", code: "SM", phone: "378" },
  { name: "Sao Tome and Principe", code: "ST", phone: "239" },
  { name: "Saudi Arabia", code: "SA", phone: "966" },
  { name: "Senegal", code: "SN", phone: "221" },
  { name: "Serbia", code: "RS", phone: "381" },
  { name: "Serbia and Montenegro", code: "CS", phone: "381" },
  { name: "Seychelles", code: "SC", phone: "248" },
  { name: "Sierra Leone", code: "SL", phone: "232" },
  { name: "Singapore", code: "SG", phone: "65" },
  { name: "St Martin", code: "SX", phone: "721" },
  { name: "Slovakia", code: "SK", phone: "421" },
  { name: "Slovenia", code: "SI", phone: "386" },
  { name: "Solomon Islands", code: "SB", phone: "677" },
  { name: "Somalia", code: "SO", phone: "252" },
  { name: "South Africa", code: "ZA", phone: "27" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS", phone: "500" },
  { name: "South Sudan", code: "SS", phone: "211" },
  { name: "Spain", code: "ES", phone: "34" },
  { name: "Sri Lanka", code: "LK", phone: "94" },
  { name: "Sudan", code: "SD", phone: "249" },
  { name: "Suriname", code: "SR", phone: "597" },
  { name: "Svalbard and Jan Mayen", code: "SJ", phone: "47" },
  { name: "Swaziland", code: "SZ", phone: "268" },
  { name: "Sweden", code: "SE", phone: "46" },
  { name: "Switzerland", code: "CH", phone: "41" },
  { name: "Syrian Arab Republic", code: "SY", phone: "963" },
  { name: "Taiwan, Province of China", code: "TW", phone: "886" },
  { name: "Tajikistan", code: "TJ", phone: "992" },
  { name: "Tanzania, United Republic of", code: "TZ", phone: "255" },
  { name: "Thailand", code: "TH", phone: "66" },
  { name: "Timor-Leste", code: "TL", phone: "670" },
  { name: "Togo", code: "TG", phone: "228" },
  { name: "Tokelau", code: "TK", phone: "690" },
  { name: "Tonga", code: "TO", phone: "676" },
  { name: "Trinidad and Tobago", code: "TT", phone: "1868" },
  { name: "Tunisia", code: "TN", phone: "216" },
  { name: "Turkey", code: "TR", phone: "90" },
  { name: "Turkmenistan", code: "TM", phone: "7370" },
  { name: "Turks and Caicos Islands", code: "TC", phone: "1649" },
  { name: "Tuvalu", code: "TV", phone: "688" },
  { name: "Uganda", code: "UG", phone: "256" },
  { name: "Ukraine", code: "UA", phone: "380" },
  { name: "United Arab Emirates", code: "AE", phone: "971" },
  { name: "United Kingdom", code: "GB", phone: "44" },
  { name: "United States", code: "US", phone: "1" },
  { name: "United States Minor Outlying Islands", code: "UM", phone: "1" },
  { name: "Uruguay", code: "UY", phone: "598" },
  { name: "Uzbekistan", code: "UZ", phone: "998" },
  { name: "Vanuatu", code: "VU", phone: "678" },
  { name: "Venezuela", code: "VE", phone: "58" },
  { name: "Viet Nam", code: "VN", phone: "84" },
  { name: "Virgin Islands, British", code: "VG", phone: "1284" },
  { name: "Virgin Islands, U.s.", code: "VI", phone: "1340" },
  { name: "Wallis and Futuna", code: "WF", phone: "681" },
  { name: "Western Sahara", code: "EH", phone: "212" },
  { name: "Yemen", code: "YE", phone: "967" },
  { name: "Zambia", code: "ZM", phone: "260" },
  { name: "Zimbabwe", code: "ZW", phone: "263" }
].map(item => ({
  code: `+${item.phone}`,
  country: item.code,
  name: item.name,
  flag: getFlagEmoji(item.code)
}));

export function Contact() {
  const { trigger } = useWebHaptics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    countryCode: '+1',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Replace this URL with your Google Apps Script Web App URL after deployment
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0hfbB0WzyVEHOLH0W-7MQ2OIhl1miKQ-Mhx3FasGDDK65ncG9Mn1H5TuR47HC9rKu/exec?spreadsheetId=1RBVPqNyEBHBQRIplCV0mlsVkQcTWqsEfPd2_--vYMbQ&sheetId=0&version=1';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!SCRIPT_URL) {
        // Fallback for demo if URL is not yet provided
        console.log('No SCRIPT_URL provided. Mocking submission:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitted(true);
        trigger('success');
      } else {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          // Using URL-encoded form data to map each field to a separate column
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            // Combine country code and phone number
            phone: `${formData.countryCode}${formData.phone}`,
            service: formData.service,
            message: formData.message,
          }).toString(),
        });

        // With mode: 'no-cors', we cannot read the response, 
        // but if we reach this line, the request was sent successfully.
        setSubmitted(true);
        trigger('success');
      }

      if (submitted) {
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', company: '', phone: '', countryCode: '+1', service: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      trigger('error');
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCountries = COUNTRY_DATA.filter(c =>
    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    c.code.includes(countrySearchQuery)
  );

  const selectedCountry = COUNTRY_DATA.find(c => c.code === formData.countryCode) || COUNTRY_DATA[252];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
              Let's Transform
              <span className="block mt-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] bg-clip-text text-transparent">
                Your Business Together
              </span>
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed">
              Get in touch with our automation experts. We'll help you identify opportunities,
              design the perfect solution, and get you up and running quickly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-[#0F172A] mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] mb-1">Email Us</h3>
                    <p className="text-gray-600">contact@mihirbuilds.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>


                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Work With Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Free consultation and automation audit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Custom solutions tailored to your needs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Ongoing support and optimization</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white rounded-2xl p-5 md:p-8 shadow-xl border border-gray-100 overflow-hidden">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-2">
                  Book Your Free Demo
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
                    <p className="text-green-700">
                      We've received your message and will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#0F172A] mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-[#0F172A] mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all"
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#0F172A] mb-2">
                          Phone Number
                        </label>
                        <div className="relative flex space-x-1 md:space-x-2" ref={dropdownRef}>
                          {/* Custom Country Code Dropdown */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setIsDropdownOpen(!isDropdownOpen);
                                trigger('nudge');
                              }}
                              className="w-20 md:w-24 px-2 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all bg-white flex items-center justify-between"
                            >
                              <span className="flex items-center space-x-1">
                                <span className="text-base md:text-lg">{selectedCountry.flag}</span>
                                <span className="text-xs md:text-sm font-medium">{selectedCountry.code}</span>
                              </span>
                              <motion.span
                                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                className="inline-block"
                              >
                                <ChevronDown size={16} className="text-gray-400" />
                              </motion.span>
                            </button>

                            {isDropdownOpen && (
                              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5">
                                <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center space-x-2">
                                  <Search size={14} className="text-gray-400" />
                                  <input
                                    type="text"
                                    placeholder="Search country..."
                                    value={countrySearchQuery}
                                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                                    autoFocus
                                  />
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                  {filteredCountries.length > 0 ? (
                                    filteredCountries.map((item) => (
                                      <button
                                        key={`${item.country}-${item.code}-${item.name}`}
                                        type="button"
                                        onClick={() => {
                                          setFormData(prev => ({ ...prev, countryCode: item.code }));
                                          setIsDropdownOpen(false);
                                          setCountrySearchQuery('');
                                          trigger('nudge');
                                        }}
                                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 text-left"
                                      >
                                        <div className="flex items-center space-x-3">
                                          <span className="text-xl">{item.flag}</span>
                                          <span className="text-sm text-gray-700 font-medium truncate max-w-[120px]">{item.name}</span>
                                        </div>
                                        <span className="text-xs font-bold text-blue-600">{item.code}</span>
                                      </button>
                                    ))
                                  ) : (
                                    <div className="px-4 py-3 text-sm text-gray-500 text-center italic">
                                      No countries found
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="flex-1 min-w-0 px-3 md:px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all"
                            placeholder="555-123-4567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-[#0F172A] mb-2">
                        Service Interested In *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all"
                      >
                        <option value="">Select a service...</option>
                        <option value="whatsapp">WhatsApp Automation</option>
                        <option value="email">Email Automation</option>
                        <option value="workflow">Custom Workflow Automation</option>
                        <option value="all">All Services</option>
                        <option value="consultation">General Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#0F172A] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your automation needs..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <MessageSquare size={20} className="mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly can we get started?",
                answer: "Most clients are up and running within 1-2 weeks. We'll schedule an initial consultation, design your automation workflows, and implement them quickly."
              },
              {
                question: "Do you offer a free trial?",
                answer: "Yes! We offer a free consultation and automation audit to identify opportunities. We also provide a 30-day money-back guarantee on all our services."
              },
              {
                question: "What if I need help after implementation?",
                answer: "We provide ongoing support and optimization. Our team is available via email, phone, and chat to help you get the most out of your automation."
              },
              {
                question: "Can you integrate with my existing tools?",
                answer: "Absolutely! We integrate with 1000+ popular business tools including CRMs, email platforms, project management software, and more."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
